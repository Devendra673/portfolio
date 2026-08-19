"use client";

import { motion } from "framer-motion";
import { siteConfig, socialLinks } from "@/lib/data";

const Contact = () => {
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Have a project in
            <br />
            mind?{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-gradient transition-opacity hover:opacity-80"
            >
              Let&apos;s talk.
            </a>
          </h2>
        </motion.div>

        {/* Details grid */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-14 grid gap-8 border-t border-border pt-10 sm:grid-cols-3"
        >
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
              Email
            </dt>
            <dd className="mt-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-underline text-sm text-foreground"
              >
                {siteConfig.email}
              </a>
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
              Based in
            </dt>
            <dd className="mt-2 text-sm text-foreground">
              {siteConfig.location}
            </dd>
          </div>

          <div>
            <dt className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
              Availability
            </dt>
            <dd className="mt-2 text-sm text-foreground">
              {siteConfig.availability}
            </dd>
          </div>
        </motion.dl>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          viewport={{ once: true }}
          className="mt-10 flex gap-6"
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
