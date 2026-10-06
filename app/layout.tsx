import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Polices auto-hébergées par Next.js : aucune requête vers Google côté visiteur.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb" });

export const metadata: Metadata = {
  title: "Samy Badoud — Technicien systèmes & réseaux",
  description:
    "Portfolio de Samy Badoud, étudiant en Bachelor à l'IPSSI Paris. Réseaux Cisco, virtualisation, sécurité. Recherche d'alternance en Île-de-France.",
  openGraph: {
    title: "Samy Badoud — Technicien systèmes & réseaux",
    description: "Réseaux, virtualisation, sécurité. Recherche d'alternance.",
    locale: "fr_FR",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
