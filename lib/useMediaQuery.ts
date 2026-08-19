"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query.
 *
 * Uses useSyncExternalStore rather than useState + useEffect: matchMedia is an
 * external store, so this is the pattern React expects. It also avoids setting
 * state during an effect, and gives a defined server snapshot so there's no
 * hydration mismatch.
 */
export const useMediaQuery = (query: string): boolean =>
  useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    // On the server, assume the query does not match
    () => false
  );

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useHasFinePointer = () => useMediaQuery("(pointer: fine)");
