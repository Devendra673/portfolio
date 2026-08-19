"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const Skills = () => {
  return (
    <section id="skills" className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-16 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          Stack
        </motion.p>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skillGroup, i) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="neon-card group rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm"
            >
              <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-primary">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2.5">
                {skillGroup.items.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
