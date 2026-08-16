"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { about, timeline } from "@/lib/data";

const words = about.statement.split(" ");

const Word = ({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
};

const About = () => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.6"],
  });

  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          About
        </motion.p>

        {/* Scroll-driven word reveal */}
        <p
          ref={containerRef}
          className="mb-20 max-w-3xl text-2xl font-light leading-relaxed text-foreground sm:text-3xl md:text-4xl"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={`${word}-${i}`} range={[start, end]} progress={scrollYProgress}>
                {word}
              </Word>
            );
          })}
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-border sm:left-4" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group relative pl-10 sm:pl-12"
              >
                {/* Dot */}
                <span className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-border bg-background transition-colors group-hover:border-primary group-hover:bg-primary/20 sm:left-2.5" />

                <span className="font-mono text-xs text-primary">
                  {item.year}
                </span>
                <h4 className="mt-1 text-base font-semibold text-foreground">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
