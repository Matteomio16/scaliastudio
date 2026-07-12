"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Project } from "@/lib/projects";

export default function ProjectPanel({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-200 bg-black/40 backdrop-blur-sm flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="h-full w-full max-w-xl bg-dark-surface text-dark-on overflow-y-auto border-l border-dark-outline"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* accent hairline at the top edge */}
            <div className="h-1 w-full" style={{ background: project.accent }} />

            <div className="p-8 md:p-12">
              <div className="flex items-start justify-between gap-6 mb-7">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ background: project.accent }}
                  />
                  <span className="label-sm" style={{ color: project.accent }}>
                    {project.category}
                  </span>
                </div>
                <button
                  aria-label="Close panel"
                  onClick={onClose}
                  className="-mt-1 -mr-1 flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-dark-on-variant hover:text-white hover:bg-white/5 transition-colors"
                >
                  &#215;
                </button>
              </div>

              <h2 className="display-md text-white text-balance">{project.name}</h2>
              <p className="body-lg text-dark-on-variant mt-3">{project.role}</p>

              {project.tagline && (
                <p
                  className="label-sm mt-4"
                  style={{ color: project.accent }}
                >
                  {project.tagline}
                </p>
              )}

              {project.description && (
                <div className="mt-8 space-y-4 body-lg text-dark-on-variant">
                  {project.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}

              {project.outcomes && (
                <div className="mt-9">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-6 bg-accent-blue" />
                    <span className="label-sm text-accent-blue-glow">Outcomes</span>
                  </div>
                  <ul className="space-y-3">
                    {project.outcomes.map((o, i) => (
                      <li key={i} className="flex gap-3 body-lg text-dark-on-variant">
                        <span
                          className="mt-2.5 h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ background: project.accent }}
                        />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.tech && (
                <div className="mt-9">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-px w-6 bg-accent-blue" />
                    <span className="label-sm text-accent-blue-glow">Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.split("·").map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-dark-outline bg-dark-surface-high px-3 py-1.5 text-[0.8125rem] text-dark-on-variant"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(project.link || project.link2) && (
                <div className="mt-10 flex flex-col gap-3">
                  {project.link && (
                    <a
                      className="group inline-flex items-center justify-between gap-3 rounded-xl px-5 py-3.5 bg-accent-blue text-white text-[0.8125rem] font-medium hover:brightness-110 transition"
                      href={project.link}
                      target={project.link.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      <span>{project.linkText}</span>
                      <span className="transition-transform group-hover:translate-x-0.5">
                        &#8594;
                      </span>
                    </a>
                  )}
                  {project.link2 && (
                    <a
                      className="group inline-flex items-center justify-between gap-3 rounded-xl px-5 py-3.5 border border-dark-outline text-dark-on text-[0.8125rem] font-medium hover:border-accent-blue-glow transition-colors"
                      href={project.link2}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{project.link2Text}</span>
                      <span className="transition-transform group-hover:translate-x-0.5">
                        &#8594;
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
