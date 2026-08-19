"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";

/**
 * Brief intro overlay shown once per browser session.
 *
 * Deliberately short and skippable — click, tap or press any key to dismiss.
 * Skipped entirely when the visitor prefers reduced motion, and never blocks
 * content since the page underneath is already rendered.
 */

const SESSION_KEY = "boot-shown";
const DURATION_MS = 1900;

const BootSequence = () => {
  // Starts false so server and client agree; the effect decides whether to show.
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const dismiss = useCallback(() => setVisible(false), []);

  useEffect(() => {
    let frame = 0;

    // The decision runs inside a frame callback rather than the effect body:
    // it keeps state updates out of the synchronous effect pass, and defers
    // the overlay until after first paint so content is never blocked.
    frame = requestAnimationFrame(() => {
      let alreadyShown = false;
      try {
        alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        // Storage blocked (private mode) — treat as already shown so the intro
        // never replays on every navigation.
        alreadyShown = true;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (alreadyShown || prefersReducedMotion) return;

      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* non-fatal */
      }

      setVisible(true);

      const start = performance.now();
      const tick = (now: number) => {
        const pct = Math.min((now - start) / DURATION_MS, 1);
        setProgress(pct);
        if (pct < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setVisible(false);
        }
      };

      frame = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  // Dismiss on any interaction while the overlay is up
  useEffect(() => {
    if (!visible) return;
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  const letters = siteConfig.name.split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // Decorative: the real page content is already behind this
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={dismiss}
          className="fixed inset-0 z-[400] flex cursor-pointer flex-col items-center justify-center bg-background"
        >
          {/* Name assembling letter by letter */}
          <div className="flex items-baseline font-mono text-4xl font-bold tracking-tight sm:text-5xl">
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.1 + i * 0.055,
                  duration: 0.35,
                  ease: "easeOut",
                }}
                className="text-gradient"
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="ml-1 inline-block h-[1em] w-[3px] bg-accent"
            />
          </div>

          {/* Progress line */}
          <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-border sm:w-52">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              style={{
                width: `${progress * 100}%`,
                transition: "width 80ms linear",
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60"
          >
            press any key to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
