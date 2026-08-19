"use client";

import {
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "./useMediaQuery";

/**
 * Maps scroll velocity to a small skew angle, giving cards a sense of physical
 * weight as the page moves. Returns a flat 0 when the visitor prefers reduced
 * motion.
 *
 * The spring keeps the value from snapping, so cards settle rather than
 * flicking back to neutral the instant scrolling stops.
 */
export const useScrollSkew = (maxDegrees = 2.5): MotionValue<number> => {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const reducedMotion = usePrefersReducedMotion();

  const smoothed = useSpring(velocity, {
    stiffness: 220,
    damping: 42,
    mass: 0.4,
  });

  const limit = reducedMotion ? 0 : maxDegrees;

  // The input range roughly covers a brisk scroll; clamping stops fast flicks
  // from producing an absurd angle.
  return useTransform(smoothed, [-2500, 0, 2500], [-limit, 0, limit], {
    clamp: true,
  });
};
