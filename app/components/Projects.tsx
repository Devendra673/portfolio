"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import ProjectPreview from "./ProjectPreview";

const Projects = () => {
  return (
    <section id="projects" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Selected Work
          </p>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">
            Four systems spanning document intelligence, IoT telemetry, speech
            processing and secure retrieval. Two are open source; the others are
            private, and I&apos;m happy to walk through the architecture on
            request.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40"
            >
              {/* Accent bar */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r opacity-40 transition-opacity duration-300 group-hover:opacity-100",
                  project.accent
                )}
              />

              {/* Hover-revealed screenshot */}
              {project.image && (
                <ProjectPreview
                  src={project.image.src}
                  alt={project.image.alt}
                  projectTitle={project.title}
                  accent={project.accent}
                />
              )}

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                {/* Meta row */}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    {project.domain}
                  </span>
                  <span className="whitespace-nowrap rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {project.role}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {project.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="mt-5 space-y-2">
                  {project.highlights.map((item) => (
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

                {/* Engineering note */}
                <div className="mt-5 rounded-xl border border-border/60 bg-muted/40 p-4">
                  <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    Hardest part
                  </p>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    {project.challenge}
                  </p>
                </div>

                {/* Tech */}
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors duration-300 group-hover:border-primary/30 group-hover:text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {(project.sourceUrl || project.liveUrl) && (
                  <div className="mt-5 flex items-center gap-5 border-t border-border/60 pt-4">
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <svg
                          aria-hidden
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        View source
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ExternalLink size={13} aria-hidden />
                        Live demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
