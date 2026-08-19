"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Download,
  Mail,
  Copy,
  Check,
  SunMoon,
  CornerDownLeft,
} from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

/* Brand marks aren't in lucide-react, so they're inlined. */
const GithubMark = () => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinMark = () => (
  <svg
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/**
 * Keyboard-first navigation. Cmd+K on macOS, Ctrl+K elsewhere.
 *
 * Actions cover section jumps plus the things a recruiter actually wants:
 * the resume, the email address, and the profile links.
 */

type Action = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Actions" | "Links";
  icon: React.ReactNode;
  run: () => void;
  /** Keeps the palette open after running (used for copy-to-clipboard). */
  keepOpen?: boolean;
};

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const actions = useMemo<Action[]>(() => {
    const nav: Action[] = navLinks.map((link) => ({
      id: `nav-${link.href}`,
      label: link.label,
      hint: "Jump to section",
      group: "Navigate",
      icon: <ArrowRight size={15} aria-hidden />,
      run: () => {
        document
          .querySelector(link.href)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    }));

    const acts: Action[] = [
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF, one page",
        group: "Actions",
        icon: <Download size={15} aria-hidden />,
        run: () => {
          const a = document.createElement("a");
          a.href = siteConfig.resumeUrl;
          a.download = "";
          a.click();
        },
      },
      {
        id: "email",
        label: "Send an email",
        hint: siteConfig.email,
        group: "Actions",
        icon: <Mail size={15} aria-hidden />,
        run: () => {
          window.location.href = `mailto:${siteConfig.email}`;
        },
      },
      {
        id: "copy-email",
        label: copied ? "Email copied" : "Copy email address",
        hint: siteConfig.email,
        group: "Actions",
        icon: copied ? (
          <Check size={15} aria-hidden />
        ) : (
          <Copy size={15} aria-hidden />
        ),
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(siteConfig.email).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          });
        },
      },
      {
        id: "theme",
        label: "Toggle light / dark",
        group: "Actions",
        icon: <SunMoon size={15} aria-hidden />,
        keepOpen: true,
        run: () => {
          const isDark = document.documentElement.classList.toggle("dark");
          try {
            localStorage.setItem("theme", isDark ? "dark" : "light");
          } catch {
            /* storage unavailable, theme still applies for this session */
          }
        },
      },
    ];

    const links: Action[] = [
      {
        id: "github",
        label: "GitHub",
        hint: "github.com/Devendra673",
        group: "Links",
        icon: <GithubMark />,
        run: () => window.open(siteConfig.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "Profile",
        group: "Links",
        icon: <LinkedinMark />,
        run: () => window.open(siteConfig.linkedin, "_blank", "noopener"),
      },
    ];

    return [...nav, ...acts, ...links];
  }, [copied]);

  /** Simple subsequence match, so "dr" finds "Download resume". */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;

    return actions.filter((action) => {
      const haystack = `${action.label} ${action.hint ?? ""}`.toLowerCase();
      let cursor = 0;
      for (const char of q) {
        if (char === " ") continue;
        cursor = haystack.indexOf(char, cursor);
        if (cursor === -1) return false;
        cursor += 1;
      }
      return true;
    });
  }, [actions, query]);

  /** Global shortcut, plus Escape to dismiss. */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isToggle = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isToggle) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  /** Lock page scroll and focus the input while open. */
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus after the entry animation starts so it doesn't jump
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(id);
    };
  }, [open]);

  /** Keep the highlighted row in view. */
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`[data-index="${selected}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selected, open]);

  const runAction = useCallback(
    (action: Action) => {
      action.run();
      if (!action.keepOpen) close();
    },
    [close]
  );

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(
        (i) => (i - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1)
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const action = filtered[selected];
      if (action) runAction(action);
    }
  };

  let lastGroup = "";

  return (
    <>
      {/* Discoverability affordance — most visitors won't guess the shortcut */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2.5 text-xs text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/40 hover:text-foreground md:flex"
      >
        <Search size={13} aria-hidden />
        <span>Search</span>
        <kbd className="ml-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
            className="fixed inset-0 z-[300] flex items-start justify-center bg-background/70 p-4 pt-[12vh] backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              {/* Input */}
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search
                  size={16}
                  aria-hidden
                  className="shrink-0 text-muted-foreground"
                />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(0);
                  }}
                  onKeyDown={onListKeyDown}
                  placeholder="Search sections and actions…"
                  aria-label="Search sections and actions"
                  className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                />
                <kbd className="hidden shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
                  esc
                </kbd>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                role="listbox"
                aria-label="Results"
                className="max-h-[52vh] overflow-y-auto p-2"
              >
                {filtered.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No matches
                  </p>
                )}

                {filtered.map((action, index) => {
                  const showHeader = action.group !== lastGroup;
                  lastGroup = action.group;
                  const isSelected = index === selected;

                  return (
                    <div key={action.id}>
                      {showHeader && (
                        <p className="px-3 pb-1 pt-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
                          {action.group}
                        </p>
                      )}
                      <div
                        data-index={index}
                        role="option"
                        aria-selected={isSelected}
                        tabIndex={-1}
                        onMouseEnter={() => setSelected(index)}
                        onClick={() => runAction(action)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                          isSelected
                            ? "bg-primary/10 text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "shrink-0",
                            isSelected ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          {action.icon}
                        </span>
                        <span className="flex-1 truncate">{action.label}</span>
                        {action.hint && (
                          <span className="hidden truncate text-[11px] text-muted-foreground/60 sm:block">
                            {action.hint}
                          </span>
                        )}
                        {isSelected && (
                          <CornerDownLeft
                            size={13}
                            aria-hidden
                            className="shrink-0 text-muted-foreground/70"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[10px] text-muted-foreground/60">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
