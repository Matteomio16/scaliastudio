"use client";

import { motion } from "framer-motion";

export default function StudioIntro() {
  return (
    <section className="page-pad pt-40 md:pt-48 pb-16">
      <motion.p
        initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="display-md text-white max-w-4xl"
      >
        We spotted problems. We built the fix.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="body-lg text-dark-on-variant mt-5 max-w-xl"
      >
        An independent studio crafting digital permanence through high-speed
        iteration.
      </motion.p>
    </section>
  );
}
