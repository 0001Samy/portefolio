import Image from "next/image";
import { Briefcase, Github, GraduationCap, Linkedin, MapPin } from "lucide-react";
import Nav from "./components/Nav";
import Terminal from "./components/Terminal";
import Reveal from "./components/Reveal";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import { profile, skills, timeline } from "./data";

// Composant serveur : le HTML est généré côté serveur, seuls les
// composants marqués "use client" envoient du JavaScript au navigateur.

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <h2 className="mb-10 flex items-baseline gap-3 text-3xl font-bold md:text-4xl">
      <span className="font-mono text-base text-accent">{index}.</span>
      {title}
    </h2>
  );
}

export default function Page() {
  return (
    <>
      <Nav />

      <main id="top" className="mx-auto max-w-6xl px-5 md:px-8">
        {/* HERO */}
        <section className="grid min-h-screen items-center gap-12 pb-16 pt-28 lg:grid-cols-2">
          <div>
            <p className="font-mono text-sm text-accent">Bonjour, je suis</p>
            <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">{profile.name}</h1>
            <p className="mt-3 text-2xl text-muted md:text-3xl">{profile.role}</p>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">
              Étudiant en 2ᵉ année à l&apos;IPSSI Paris. Je conçois, virtualise et
              sécurise des infrastructures — et je cherche une{" "}
              <span className="text-fg">alternance</span> pour le faire en entreprise.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projets"
                className="rounded-lg bg-accent px-6 py-3 font-semibold text-bg transition hover:brightness-110"
              >
                Voir mes projets
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-line px-6 py-3 font-semibold transition hover:border-accent"
              >
                Me contacter
              </a>
            </div>

            <div className="mt-8 flex gap-4 text-muted">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent">
                <Github size={22} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent">
                <Linkedin size={22} />
              </a>
            </div>
          </div>

          <Terminal />
        </section>

        {/* PROFIL */}
        <section id="profil" className="scroll-mt-20 py-20">
          <SectionTitle index="01" title="Profil" />
          <Reveal className="grid gap-10 md:grid-cols-[200px_1fr]">
            <Image
              src="/profile_avatar.png"
              alt="Portrait de Samy Badoud"
              width={200}
              height={200}
              className="h-[200px] w-[200px] rounded-xl border border-line object-cover"
              priority
            />
            <div className="space-y-4 leading-relaxed text-muted">
              <p>
                Mon parcours commence par le <span className="text-fg">terrain</span> :
                trois ans au support informatique de l&apos;<span className="text-fg">OCDE</span>,
                à préparer et dépanner en temps réel les postes, l&apos;audio et la vidéo
                de réunions internationales. J&apos;y ai appris à diagnostiquer vite et à
                rester calme sous pression.
              </p>
              <p>
                Aujourd&apos;hui en <span className="text-fg">Bachelor à l&apos;IPSSI</span>,
                je construis des réseaux Cisco, des infrastructures virtualisées
                ESXi et je teste leur sécurité depuis Kali Linux. En parallèle,
                j&apos;ai réalisé en freelance le site d&apos;un organisme de formation.
              </p>

              <ul className="grid gap-3 pt-2 text-sm sm:grid-cols-3">
                <li className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-accent" /> IPSSI · 2ᵉ année
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-accent" /> {profile.location}
                </li>
                <li className="flex items-center gap-2">
                  <Briefcase size={16} className="text-accent" /> {profile.rhythm}
                </li>
              </ul>

              <ul className="flex flex-wrap gap-2 pt-2">
                {profile.softSkills.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1 text-xs">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* PROJETS */}
        <section id="projets" className="scroll-mt-20 py-20">
          <SectionTitle index="02" title="Projets" />
          <Reveal>
            <Projects />
          </Reveal>
        </section>

        {/* PARCOURS */}
        <section id="parcours" className="scroll-mt-20 py-20">
          <SectionTitle index="03" title="Parcours" />
          <ol className="relative ml-2 border-l border-line">
            {timeline.map((item, i) => (
              <li key={item.title} className="mb-10 ml-8 last:mb-0">
                <span
                  className={`absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg ${
                    item.kind === "pro" ? "bg-accent" : "bg-amber"
                  }`}
                />
                <Reveal delay={i * 60}>
                  <p className="font-mono text-xs text-muted">{item.period}</p>
                  <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-accent">{item.place}</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {item.points.map((p) => (
                      <li key={p}>— {p}</li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex gap-6 text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" /> Expérience
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber" /> Formation
            </span>
          </p>
        </section>

        {/* COMPÉTENCES */}
        <section id="competences" className="scroll-mt-20 py-20">
          <SectionTitle index="04" title="Compétences" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group, i) => (
              <Reveal key={group.title} delay={i * 60} className="rounded-xl border border-line bg-surface p-6">
                <h3 className="font-mono text-sm text-accent">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-md bg-bg px-2.5 py-1 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Langues : {profile.languages.join(" · ")}
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-20 py-20">
          <SectionTitle index="05" title="Contact" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <Reveal className="space-y-4 text-muted">
              <p className="text-lg text-fg">Vous recrutez un alternant systèmes &amp; réseaux ?</p>
              <p>
                Je suis disponible au rythme {profile.rhythm}. Écrivez-moi via le
                formulaire ou sur LinkedIn.
              </p>
              <div className="flex flex-col gap-3 pt-2">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent">
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent">
                  <Github size={18} /> GitHub
                </a>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} Samy Badoud — Next.js · TypeScript · Tailwind CSS
      </footer>
    </>
  );
}
