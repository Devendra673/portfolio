"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";

const Education = () => {
  return (
    <section id="education" className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          Education
        </motion.p>

        <div className="space-y-3">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {edu.institution} — {edu.location}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {edu.score && (
                    <span className="whitespace-nowrap font-mono text-xs text-foreground">
                      {edu.score}
                    </span>
                  )}
                  <span className="whitespace-nowrap text-sm font-mono text-muted-foreground">
                    {edu.period}
                  </span>
                  {edu.status && (
                    <span className="whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {edu.status}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
