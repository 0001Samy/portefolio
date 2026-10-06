import type { NextConfig } from "next";

// En-têtes de sécurité HTTP envoyés sur toutes les pages.
const securityHeaders = [
  // Interdit l'affichage du site dans une iframe (anti-clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Empêche le navigateur de deviner le type d'un fichier (MIME sniffing).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Ne transmet que le domaine d'origine aux sites externes.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Force HTTPS pendant 2 ans.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Désactive les API sensibles inutiles ici.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  }
};

export default nextConfig;
