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
            className="h-full w-full max-w-xl bg-dark-surface text-dark-on overflow-y-auto p-8 md:p-12 border-l border-dark-outline"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between mb-6">
              <span
                className="label-sm"
                style={{ color: project.accent }}
              >
                {project.category}
              </span>
              <button
                aria-label="Close panel"
                onClick={onClose}
                className="text-2xl leading-none text-dark-on-variant hover:text-accent-blue-glow transition-colors"
              >
                &#215;
              </button>
            </div>

            <h2 className="display-md mb-2 text-white">{project.name}</h2>
            <span className="label-sm text-dark-on-variant block mb-7">
              {project.role}
            </span>

            {project.description?.map((p, i) => (
              <p key={i} className="body-lg mb-4 text-dark-on-variant">
                {p}
              </p>
            ))}

            {project.outcomes && (
              <>
                <span className="label-sm block mt-6 mb-3 text-accent-blue-glow">
                  Outcomes
                </span>
                <ul className="space-y-2 mb-6">
                  {project.outcomes.map((o, i) => (
                    <li
                      key={i}
                      className="body-lg text-dark-on-variant pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-accent-blue"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {project.tech && (
              <p className="label-sm text-dark-on-variant leading-loose tracking-wide mb-6">
                {project.tech}
              </p>
            )}

            <div className="flex flex-wrap gap-6">
              {project.link && (
                <a
                  className="label-sm text-accent-blue-glow hover:underline"
                  href={project.link}
                  target={project.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {project.linkText}
                </a>
              )}
              {project.link2 && (
                <a
                  className="label-sm text-accent-blue-glow hover:underline"
                  href={project.link2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.link2Text}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
