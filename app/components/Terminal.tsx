"use client";

import { useEffect, useState } from "react";

// Petit terminal animé du hero : chaque ligne s'affiche à la suite.
const lines = [
  { cmd: "whoami", out: "samy.badoud — technicien systèmes & réseaux" },
  { cmd: "cat formation.txt", out: "Bachelor IPSSI Paris · 2ᵉ année" },
  { cmd: "ls competences/", out: "reseau/  systemes/  securite/  web/" },
  { cmd: "./recherche --alternance", out: "[OK] disponible · rythme 3 sem. / 1 sem." }
];

export default function Terminal() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    // Respecte le réglage système « réduire les animations ».
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(lines.length);
      return;
    }
    const timer = window.setInterval(() => {
      setShown((n) => {
        if (n >= lines.length) {
          window.clearInterval(timer);
          return n;
        }
        return n + 1;
      });
    }, 650);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">bash — 80×24</span>
      </div>
      <div
        className="min-h-[220px] space-y-3 p-5 font-mono text-[13px] leading-relaxed sm:text-sm"
        aria-label="Présentation sous forme de terminal"
      >
        {lines.slice(0, shown).map((line) => (
          <div key={line.cmd} className="animate-[fadein_.3s_ease]">
            <p>
              <span className="text-accent">$</span> {line.cmd}
            </p>
            <p className="text-muted">{line.out}</p>
          </div>
        ))}
        <p>
          <span className="text-accent">$</span>{" "}
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />
        </p>
      </div>
    </div>
  );
}
