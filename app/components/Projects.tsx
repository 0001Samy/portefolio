"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { categoryLabels, projects, type Category } from "../data";

type Filter = Category | "all";

const filters: Filter[] = ["all", "reseau", "systeme", "securite", "web"];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrer les projets">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === f
                ? "border-accent bg-accent text-bg"
                : "border-line text-muted hover:border-accent/60 hover:text-fg"
            }`}
          >
            {f === "all" ? "Tous" : categoryLabels[f]}
          </button>
        ))}
      </div>

      <div className="grid items-start gap-5 md:grid-cols-2">
        {visible.map((project) => {
          const isOpen = openId === project.id;
          return (
            <article
              key={project.id}
              className="flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/50"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-accent">
                  {categoryLabels[project.category]}
                </span>
                <span className="text-right text-xs text-muted">{project.context}</span>
              </div>

              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-muted">{project.summary}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md bg-bg px-2 py-1 font-mono text-xs text-fg/80"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : project.id)}
                aria-expanded={isOpen}
                aria-controls={`details-${project.id}`}
                className="mt-5 flex items-center gap-1.5 self-start text-sm font-medium text-accent hover:underline"
              >
                {isOpen ? "Masquer la démarche" : "Voir la démarche"}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div id={`details-${project.id}`} className="mt-4 border-t border-line pt-4">
                  <ol className="space-y-2 text-sm">
                    {project.steps.map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="font-mono text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-fg/90">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-4 rounded-lg bg-bg p-3 text-sm text-muted">
                    <span className="font-semibold text-fg">Ce que j&apos;en retiens : </span>
                    {project.learned}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
