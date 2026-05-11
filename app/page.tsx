"use client";

import Image from "next/image";
import {
  Github,
  Linkedin,
  Server,
  Network,
  Terminal,
  ShieldCheck,
  Code2
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

type Project = {
  title: string;
  stack: string;
  description: string;
};

type Lab = {
  title: string;
  description: string;
  tags: string[];
};

type StackGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

const typingText =
  "Étudiant IPSSI — Infrastructure & Cybersécurité, en recherche d'alternance.";

const stackGroups: StackGroup[] = [
  {
    title: "Virtualisation",
    icon: Server,
    items: ["VMware / ESXi", "Proxmox VE", "UTM (macOS)"]
  },
  {
    title: "Réseau",
    icon: Network,
    items: ["Cisco Packet Tracer", "GNS3", "WireGuard VPN"]
  },
  {
    title: "Systèmes",
    icon: Terminal,
    items: ["Linux (Debian, Kali)", "Active Directory", "Docker / Compose"]
  },
  {
    title: "Sécurité",
    icon: ShieldCheck,
    items: ["nmap, Hydra", "Burp Suite, Metasploit", "Lynis, hardening GRUB"]
  },
  {
    title: "Langages",
    icon: Code2,
    items: ["Bash / Shell", "Lua (DeSmuME)", "C# (Unity, débutant)"]
  }
];

const labs: Lab[] = [
  {
    title: "Pentest Kali → Debian",
    description:
      "Brute-force SSH avec Hydra, audit système Lynis, puis durcissement complet (GRUB, services, comptes).",
    tags: ["Pentest", "Hardening"]
  },
  {
    title: "Guide de durcissement Debian",
    description:
      "Rédaction d'un guide complet : politiques mots de passe, SSH, sysctl, GRUB protégé, audit récurrent.",
    tags: ["Linux", "Doc technique"]
  },
  {
    title: "Pentest OWASP Juice Shop & DVWA",
    description:
      "Exploitation SQLi, XSS, command injection et file inclusion via Burp Suite. Présentation orale d'un groupe SQLi avec démo live.",
    tags: ["Web", "OWASP"]
  },
  {
    title: "Lab Proxmox auto-hébergé",
    description:
      "Cluster Proxmox perso : VPN WireGuard, récupération credentials via GRUB, réparation VM (initramfs, qm stop), serveur Minecraft sous screen.",
    tags: ["Proxmox", "VPN"]
  }
];

const projects: Project[] = [
  {
    title: "HomeLab Zero-Trust",
    stack: "Proxmox / WireGuard",
    description:
      "Cluster Proxmox auto-hébergé avec segmentation VLAN, accès distant via WireGuard, reverse-proxy mutualisé et VMs isolées par usage."
  },
  {
    title: "AD-Lab Detection",
    stack: "Active Directory",
    description:
      "Lab Active Directory complet (DC, clients Win10) avec scénarios d'attaque (Kerberoasting, AS-REP) et détection via Sysmon + journalisation centralisée."
  },
  {
    title: "HardenScript Debian",
    stack: "Bash / Lynis",
    description:
      "Script Bash idempotent de durcissement Debian : SSH, sysctl, GRUB, politique de mots de passe, audit Lynis automatisé avec rapport."
  },
  {
    title: "PhishCatch",
    stack: "Docker / Python",
    description:
      "Honeypot SSH conteneurisé qui logge les tentatives, géolocalise les IP et expose un dashboard temps réel — déployable en une commande."
  },
  {
    title: "NetMap Auditor",
    stack: "Python / nmap",
    description:
      "Outil d'audit réseau interne : découverte d'hôtes, fingerprinting services, détection de configs faibles et export Markdown lisible."
  },
  {
    title: "JuiceShop Writeup",
    stack: "OWASP / Burp",
    description:
      "Writeup détaillé de l'exploitation d'OWASP Juice Shop : SQLi, XSS, IDOR, file inclusion — démarche, payloads et remédiations."
  }
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/0001Samy",
    icon: Github
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samy-b-7b820518b/",
    icon: Linkedin
  }
];

export default function Page() {
  const navRef = useRef<HTMLElement>(null);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(typingText.slice(0, index));

      if (index >= typingText.length) {
        window.clearInterval(timer);
      }
    }, 35);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".js-hero", {
        y: 28,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out"
      });

      gsap.utils.toArray<HTMLElement>(".js-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            y: 36,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          navRef.current?.classList.toggle("nav-scrolled", self.scroll() > 60);
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_25%,rgba(79,172,254,0.18),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(0,242,254,0.14),transparent_42%),linear-gradient(180deg,#0b0f19,#0e1322)]" />

      <nav
        ref={navRef}
        className="fixed top-0 z-40 w-full border-b border-white/10 bg-[#0b0f19]/80 px-6 py-4 backdrop-blur-xl transition-all duration-300 md:px-14"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="font-(family-name:--font-outfit) text-2xl font-bold tracking-tight">
            Samy<span className="text-cyan-300">.sec</span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a className="hover:text-white" href="#about">
              À propos
            </a>
            <a className="hover:text-white" href="#stack">
              Stack
            </a>
            <a className="hover:text-white" href="#labs">
              Labs
            </a>
            <a className="hover:text-white" href="#projects">
              Projets
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-14">
        <header className="js-hero flex min-h-[80vh] items-center justify-center text-center">
          <div className="max-w-3xl">
            <div className="mx-auto mb-8 h-36 w-36 rounded-full bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 p-[3px] shadow-[0_0_35px_rgba(0,242,254,0.35)]">
              <div className="h-full w-full overflow-hidden rounded-full border border-white/20 bg-slate-900">
                <Image
                  src="/profile_avatar.png"
                  alt="Photo de profil de Samy"
                  width={144}
                  height={144}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>

            <h1 className="font-(family-name:--font-outfit) text-4xl font-extrabold leading-tight md:text-6xl">
              Salut, moi c&apos;est{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                BADOUD Samy
              </span>
            </h1>

            <p className="mt-4 min-h-8 text-lg text-slate-300 md:text-2xl">
              {typedText}
              <span className="cursor ms-1 inline-block text-cyan-300">|</span>
            </p>

            <p className="mt-3 text-sm text-slate-400">
              Île-de-France &amp; Provence-Côte d&apos;Azur · disponible en alternance
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#projects"
                className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 px-7 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(56,189,248,0.35)]"
              >
                Voir mes projets
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/20 bg-white/5 px-7 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-300/70"
              >
                Me contacter
              </a>
            </div>
          </div>
        </header>

        <section id="about" className="js-reveal py-14">
          <h2 className="font-(family-name:--font-outfit) text-center text-4xl font-bold">
            À <span className="text-cyan-300">propos</span>
          </h2>
          <div className="glass-panel mx-auto mt-8 max-w-3xl p-8 text-slate-300 md:p-12">
            <p>
              Étudiant en Bachelor Informatique &amp; Développement à{" "}
              <span className="text-white">IPSSI Paris</span>, je me spécialise
              en <span className="text-white">infrastructure sécurisée</span> et{" "}
              <span className="text-white">cybersécurité</span>.
            </p>
            <p className="mt-4">
              Mon terrain de jeu : labos Proxmox, hardening Linux, pentest
              d&apos;environnements vulnérables (Juice Shop, DVWA), VPN
              WireGuard et Active Directory. Une expérience préalable en{" "}
              <span className="text-white">support IT</span> m&apos;a appris à
              diagnostiquer vite et à communiquer clairement.
            </p>
            <p className="mt-4">
              Je cherche une{" "}
              <span className="text-white">alternance en architecture infra</span>{" "}
              ou administration systèmes, idéalement avec une dimension
              sécurité.
            </p>
          </div>
        </section>

        <section id="stack" className="py-14">
          <h2 className="js-reveal font-(family-name:--font-outfit) text-center text-4xl font-bold">
            Ma <span className="text-cyan-300">stack</span>
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stackGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className="js-reveal glass-panel p-6 transition hover:-translate-y-1 hover:border-cyan-300/30"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-2 text-cyan-200">
                      <Icon size={18} />
                    </span>
                    <h3 className="font-(family-name:--font-outfit) text-lg font-semibold">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-cyan-300">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section id="labs" className="py-14">
          <h2 className="js-reveal font-(family-name:--font-outfit) text-center text-4xl font-bold">
            Mes <span className="text-cyan-300">labs</span>
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {labs.map((lab) => (
              <article
                key={lab.title}
                className="js-reveal glass-panel relative overflow-hidden p-7 transition hover:-translate-y-1 hover:border-cyan-300/30"
              >
                <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-300 to-blue-500" />
                <h3 className="font-(family-name:--font-outfit) text-xl font-semibold">
                  {lab.title}
                </h3>
                <p className="mt-3 text-slate-300">{lab.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {lab.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="py-14">
          <h2 className="js-reveal font-(family-name:--font-outfit) text-center text-4xl font-bold">
            Mes <span className="text-cyan-300">projets</span>
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="js-reveal glass-panel flex h-full flex-col p-7 transition hover:-translate-y-2 hover:border-cyan-300/30 hover:shadow-[0_20px_45px_rgba(14,165,233,0.22)]"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="font-(family-name:--font-outfit) text-2xl font-semibold">
                    {project.title}
                  </h3>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                    {project.stack}
                  </span>
                </div>
                <p className="flex-1 text-slate-300">{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="py-14">
          <h2 className="js-reveal font-(family-name:--font-outfit) text-center text-4xl font-bold">
            Me <span className="text-cyan-300">contacter</span>
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <aside className="js-reveal glass-panel p-7 lg:col-span-1">
              <p className="mb-5 text-slate-300">
                Disponible pour échanger autour d&apos;une alternance ou
                d&apos;un projet infra / sécu.
              </p>
              <ul className="space-y-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:translate-x-1 hover:border-cyan-300/50"
                      >
                        <Icon size={20} className="text-cyan-300" />
                        <span>{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <form
              className="js-reveal glass-panel space-y-5 p-7 lg:col-span-2"
              onSubmit={(event) => {
                event.preventDefault();
                window.alert("Message envoyé !");
              }}
            >
              <label className="block text-sm text-slate-300">
                Nom
                <input
                  type="text"
                  required
                  placeholder="Ton nom"
                  className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-white outline-none ring-cyan-300/40 transition placeholder:text-slate-500 focus:ring-2"
                />
              </label>

              <label className="block text-sm text-slate-300">
                Email
                <input
                  type="email"
                  required
                  placeholder="Ton email"
                  className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-white outline-none ring-cyan-300/40 transition placeholder:text-slate-500 focus:ring-2"
                />
              </label>

              <label className="block text-sm text-slate-300">
                Message
                <textarea
                  required
                  rows={4}
                  placeholder="Salut Samy, j'aimerais te parler de..."
                  className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 text-white outline-none ring-cyan-300/40 transition placeholder:text-slate-500 focus:ring-2"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 px-7 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(56,189,248,0.35)]"
              >
                Envoyer
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/20 px-6 py-10 text-center text-sm text-slate-400">
        © 2026 BADOUD Samy — Tous droits réservés.
      </footer>
    </>
  );
}
