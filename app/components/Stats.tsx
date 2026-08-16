"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats } from "@/lib/data";

const AnimatedCounter = ({
  value,
  inView,
}: {
  value: number;
  inView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let current = 0;
    const duration = 1200;
    // With reduced motion, the first tick jumps straight to the final value.
    const increment = prefersReducedMotion ? value : value / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return <span aria-hidden>{count}</span>;
};

const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="border-y border-border px-6 py-14">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-center"
          >
            <dd className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="sr-only">{stat.value}</span>
              <AnimatedCounter value={stat.value} inView={inView} />
            </dd>
            <dt className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </dt>
          </motion.div>
        ))}
      </dl>
    </div>
  );
};

export default Stats;
