"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  useHasFinePointer,
  usePrefersReducedMotion,
} from "@/lib/useMediaQuery";

/**
 * Custom cursor ring.
 *
 * Only renders on devices with a fine pointer and no reduced-motion preference,
 * so touch users and motion-sensitive visitors keep the native cursor. The
 * native cursor is never hidden — this sits alongside it as an accent, which
 * avoids the usability problems of replacing it outright.
 *
 * Any element can opt into the enlarged state with a data-cursor attribute.
 */
const CursorRing = () => {
  const finePointer = useHasFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, [role="button"], [role="option"], input, summary, [data-cursor]'
      );
      setHovering(Boolean(interactive));
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = hovering ? 42 : 22;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[350] rounded-full border"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        borderColor: hovering ? "var(--accent)" : "var(--primary)",
      }}
      animate={{
        width: size,
        height: size,
        opacity: pressed ? 0.45 : hovering ? 0.9 : 0.5,
        scale: pressed ? 0.85 : 1,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    />
  );
};

export default CursorRing;
