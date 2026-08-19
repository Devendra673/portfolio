"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, roles } from "@/lib/data";

const scrambleChars = "!@#$%^&*<>/[]{}";

const useTextScramble = (text: string) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) =>
            i < iteration
              ? char
              : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
          )
          .join("")
      );
      iteration += 0.5;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return displayText;
};

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const scrambledName = useTextScramble(siteConfig.name);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-6">
      {/* Neon haze — distant city light bleeding into a night sky */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-accent/[0.06] blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Open to work
          </span>
        </motion.div>

        {/* Name - scramble effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className="font-mono text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            {/* Real name for screen readers, scrambled version shown visually */}
            <span className="sr-only">{siteConfig.name}</span>
            <span aria-hidden className="text-gradient">
              {scrambledName}
            </span>
          </h1>
        </motion.div>

        {/* Role switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 h-8 overflow-hidden sm:h-10"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-medium text-primary sm:text-xl"
            >
              {`// ${roles[roleIndex]}`}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          {siteConfig.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex items-center gap-6"
        >
          <a
            href="#contact"
            className="btn-neon rounded-full px-7 py-3 text-sm font-medium"
          >
            Get in touch
          </a>
          <a
            href={siteConfig.resumeUrl}
            download
            className="rounded-full border border-border px-7 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/5"
          >
            Resume ↓
          </a>
          <a
            href="#projects"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See my work →
          </a>
        </motion.div>

      </div>

      {/* Scroll hint — anchored to the section, not the content column */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/40">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-muted-foreground/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
