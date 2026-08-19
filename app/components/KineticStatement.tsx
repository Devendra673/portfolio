"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { kineticStatement } from "@/lib/data";

/**
 * Full-bleed statement that breaks the page's centred column.
 *
 * The two lines translate horizontally in opposite directions as the section
 * passes through the viewport, so the block feels like it's moving past you
 * rather than sitting still. Text overflows the container deliberately.
 */
const KineticStatement = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Opposing drift. Ranges are in percent so they scale with viewport width.
  const xLeft = useTransform(scrollYProgress, [0, 1], ["4%", "-8%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const captionOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.4, 0.7, 0.9],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      aria-labelledby="statement-heading"
      className="relative overflow-hidden border-y border-border py-24 sm:py-32"
    >
      {/* Accessible heading; the animated lines below are presentational */}
      <h2 id="statement-heading" className="sr-only">
        {kineticStatement.lines.join(" ")}
      </h2>

      <div className="flex flex-col gap-1 sm:gap-2">
        {/* Sized so each line very nearly fills the viewport width: large
            enough to feel oversized, without clipping most of the words. */}
        <motion.p
          aria-hidden
          style={{ x: xLeft }}
          className="whitespace-nowrap text-[10vw] font-bold leading-[0.95] tracking-tighter text-foreground/90 sm:text-[8.5vw]"
        >
          {kineticStatement.lines[0]}
        </motion.p>

        <motion.p
          aria-hidden
          style={{ x: xRight }}
          className="text-gradient whitespace-nowrap text-[10vw] font-bold leading-[0.95] tracking-tighter sm:text-[8.5vw]"
        >
          {kineticStatement.lines[1]}
        </motion.p>
      </div>

      <motion.p
        style={{ opacity: captionOpacity }}
        className="mx-auto mt-10 max-w-md px-6 text-center text-sm leading-relaxed text-muted-foreground"
      >
        {kineticStatement.caption}
      </motion.p>
    </section>
  );
};

export default KineticStatement;
