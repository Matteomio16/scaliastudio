"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 h-14 flex items-center justify-between page-pad backdrop-blur-xl transition-colors duration-300 ${
          scrolled
            ? "bg-[rgba(8,10,16,0.72)] border-b border-dark-outline"
            : "bg-surface/70"
        }`}
        aria-label="Main"
      >
        <a href="#" className="flex items-center">
          <Image
            src="/SCALIA_logo.png"
            alt="Scalia"
            width={140}
            height={38}
            className={`h-9 w-auto transition-[filter] duration-300 ${
              scrolled ? "invert brightness-0" : ""
            }`}
            priority
          />
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[0.8125rem] transition-colors hover:text-accent-blue-glow ${
                scrolled ? "text-dark-on-variant" : "text-on-surface-variant"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="md:hidden flex flex-col gap-1.5 w-6"
        >
          <span
            className={`h-px w-full transition-colors ${
              scrolled ? "bg-dark-on" : "bg-on-surface"
            }`}
          />
          <span
            className={`h-px w-full transition-colors ${
              scrolled ? "bg-dark-on" : "bg-on-surface"
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-150 bg-dark-bg text-dark-on flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-label="Navigation"
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute top-5 right-6 text-3xl"
            >
              &#215;
            </button>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="display-md hover:text-accent-blue-glow transition-colors"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
