"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Download, MapPin, ArrowUp, Clock } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

const GithubMark = ({ size = 18 }: { size?: number }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinMark = ({ size = 18 }: { size?: number }) => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/** Local time in Bangalore, so a visitor knows whether it's a sensible hour. */
const useLocalTime = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());

    // First write happens in a frame callback so state is never set
    // synchronously during the effect pass.
    const raf = requestAnimationFrame(() => setTime(format()));
    const interval = window.setInterval(() => setTime(format()), 30_000);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(interval);
    };
  }, []);

  return time;
};

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const localTime = useLocalTime();

  const copyEmail = () => {
    navigator.clipboard
      ?.writeText(siteConfig.email)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {
        /* clipboard blocked — the mailto link below still works */
      });
  };

  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label mb-16 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          Contact
        </motion.p>

        {/* Primary card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="neon-card relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 backdrop-blur-sm sm:p-12"
        >
          {/* Accent hairline */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"
          />

          {/* Availability */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-background/50 px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              {siteConfig.availability}
            </span>
          </div>

          <h2 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Have a project in mind?{" "}
            <span className="text-gradient">Let&apos;s talk.</span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            I&apos;m looking for a role where I can build AI systems end to end.
            Happy to walk through the architecture of anything here, including
            the projects whose repositories are private.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn-neon inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium"
            >
              Send an email
            </a>

            <button
              onClick={copyEmail}
              aria-live="polite"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              {copied ? (
                <>
                  <Check size={15} aria-hidden className="text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={15} aria-hidden />
                  Copy address
                </>
              )}
            </button>

            <a
              href={siteConfig.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <Download size={15} aria-hidden />
              Résumé
            </a>
          </div>

          {/* Email in monospace, selectable */}
          <p className="mt-7 select-all font-mono text-xs text-muted-foreground">
            {siteConfig.email}
          </p>
        </motion.div>

        {/* Meta row */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-4 grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-border bg-card/30 p-5 backdrop-blur-sm">
            <dt className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
              <MapPin size={11} aria-hidden />
              Based in
            </dt>
            <dd className="mt-2.5 text-sm text-foreground">
              {siteConfig.location}
            </dd>
          </div>

          <div className="rounded-2xl border border-border bg-card/30 p-5 backdrop-blur-sm">
            <dt className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
              <Clock size={11} aria-hidden />
              Local time
            </dt>
            <dd className="mt-2.5 font-mono text-sm text-foreground">
              {/* Renders after mount to avoid a server/client mismatch */}
              {localTime ?? "—"}
              <span className="ml-1.5 text-muted-foreground">IST</span>
            </dd>
          </div>

          <div className="rounded-2xl border border-border bg-card/30 p-5 backdrop-blur-sm">
            <dt className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
              Response time
            </dt>
            <dd className="mt-2.5 text-sm text-foreground">
              Usually within a day
            </dd>
          </div>
        </motion.dl>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-4 grid gap-4 sm:grid-cols-2"
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex items-center gap-4 rounded-2xl border border-border bg-card/30 p-5 backdrop-blur-sm",
                "transition-colors duration-300 hover:border-primary/40"
              )}
            >
              <span className="text-muted-foreground transition-colors group-hover:text-primary">
                {link.icon === "github" ? <GithubMark /> : <LinkedinMark />}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium text-foreground">
                  {link.name}
                </span>
                <span className="block font-mono text-[11px] text-muted-foreground">
                  {link.handle}
                </span>
              </span>
              <span
                aria-hidden
                className="text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              >
                ↗
              </span>
            </a>
          ))}
        </motion.div>

        {/* Back to top */}
        <div className="mt-12 flex justify-center">
          <a
            href="#main"
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 transition-colors hover:text-foreground"
          >
            <ArrowUp
              size={12}
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Back to top
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
