"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { experience } from "@/lib/data";

const Experience = () => {
  return (
    <section id="experience" className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-16 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          Experience
        </motion.p>

        <div className="space-y-4">
          {experience.map((job, i) => (
            <motion.article
              key={`${job.company}-${job.role}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="neon-card group rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm sm:p-8"
            >
              {/* Header */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {job.company}
                  </p>
                </div>
                <span className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                  {job.period}
                </span>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {job.summary}
              </p>

              <ul className="mt-5 space-y-2">
                {job.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground"
                  >
                    <ArrowRight
                      size={13}
                      aria-hidden
                      className="mt-1 shrink-0 text-primary/60"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-border/60 pt-5">
                {job.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors duration-300 group-hover:border-primary/30 group-hover:text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
