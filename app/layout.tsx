import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit"
});

export const metadata: Metadata = {
  title: "BADOUD Samy — Infrastructure & Cybersécurité",
  description:
    "Portfolio de BADOUD Samy, étudiant IPSSI spécialisé en infrastructure et cybersécurité. En recherche d'alternance en Île-de-France."
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#0b0f19] text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}

