import { Resend } from "resend";
import { NextResponse } from "next/server";

// Limitation de débit simple : 5 messages max par IP toutes les 10 minutes.
// Stockée en mémoire : suffisant pour un portfolio, se réinitialise au redémarrage.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

// Échappe le HTML pour empêcher toute injection dans l'email reçu (XSS).
function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de messages envoyés. Réessayez plus tard." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot : un humain ne voit pas ce champ. On fait croire au bot que ça a marché.
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 2000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante");
    return NextResponse.json({ error: "Service indisponible." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_TO ?? "badoud5@gmail.com",
    replyTo: email,
    subject: `[Portfolio] Message de ${name.replace(/[\r\n]/g, " ")}`,
    html: `
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `
  });

  if (error) {
    // Détail logué côté serveur uniquement, jamais renvoyé au visiteur.
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Erreur d'envoi. Réessayez plus tard." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
