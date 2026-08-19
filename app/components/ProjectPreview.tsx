"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectPreviewProps {
  src: string;
  alt: string;
  projectTitle: string;
  /** Tailwind gradient classes shown behind the image before it reveals. */
  accent: string;
  /**
   * When the preview sits beside the copy (featured tile), it needs to fill the
   * full height of its grid cell instead of holding a 16:9 box, otherwise the
   * taller text column leaves a gap under the image.
   */
  stretch?: boolean;
}

const ProjectPreview = ({
  src,
  alt,
  projectTitle,
  accent,
  stretch = false,
}: ProjectPreviewProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Enlarge ${projectTitle} screenshot: ${alt}`}
        className={cn(
          "relative block w-full overflow-hidden border-border",
          // Side-by-side: drop the fixed ratio and fill the cell, moving the
          // divider from the bottom edge to the right edge.
          stretch
            ? "aspect-[16/9] border-b lg:aspect-auto lg:h-full lg:min-h-full lg:border-b-0 lg:border-r"
            : "aspect-[16/9] border-b"
        )}
      >
        {/* Accent wash sits behind, visible until the image reveals */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-500 group-hover:opacity-0",
            accent
          )}
        />

        {/* Screenshot: hidden until hover on pointer devices, always shown on touch */}
        <span
          aria-hidden
          className="absolute inset-0 scale-105 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes={
              stretch
                ? "(max-width: 1024px) 100vw, 512px"
                : "(max-width: 768px) 100vw, 420px"
            }
            className="object-cover object-top"
          />
        </span>

        {/* Expand affordance */}
        <span
          aria-hidden
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
        >
          <Expand size={11} />
          View
        </span>
      </button>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${projectTitle} screenshot`}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 p-4 backdrop-blur-md sm:p-8"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-foreground sm:right-6 sm:top-6"
            >
              <X size={18} aria-hidden />
            </button>

            <motion.figure
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-5xl flex-col gap-3"
            >
              <div className="overflow-hidden rounded-xl border border-border bg-muted">
                <Image
                  src={src}
                  alt={alt}
                  width={1920}
                  height={1080}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
              <figcaption className="text-xs text-muted-foreground">
                {projectTitle} — {alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectPreview;
