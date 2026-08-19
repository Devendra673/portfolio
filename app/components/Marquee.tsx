"use client";

import { motion } from "framer-motion";
import { marqueeItems } from "@/lib/data";

const Marquee = () => {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-border py-5"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex w-max"
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap px-6 text-sm font-medium text-muted-foreground/40"
          >
            {item}
            <span className="ml-6 text-accent/40">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
