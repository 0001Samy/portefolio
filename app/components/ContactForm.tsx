"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "mt-2 w-full rounded-lg border border-line bg-bg px-4 py-3 text-fg outline-none transition placeholder:text-muted/60 focus:border-accent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Erreur d'envoi");
      }
      setStatus("success");
      form.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur d'envoi");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-line bg-surface p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm text-muted">
          Nom
          <input name="name" required maxLength={200} autoComplete="name" className={inputClass} />
        </label>
        <label className="block text-sm text-muted">
          Email
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputClass} />
        </label>
      </div>

      <label className="block text-sm text-muted">
        Message
        <textarea
          name="message"
          required
          rows={5}
          maxLength={2000}
          placeholder="Bonjour Samy, notre entreprise recherche un alternant…"
          className={inputClass}
        />
      </label>

      {/* Piège à robots : champ invisible pour un humain. S'il est rempli, c'est un bot. */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div aria-live="polite">
        {status === "success" && (
          <p className="text-sm text-accent">Message envoyé, je vous réponds rapidement.</p>
        )}
        {status === "error" && <p className="text-sm text-red-400">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-bg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={16} />
        {status === "loading" ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
