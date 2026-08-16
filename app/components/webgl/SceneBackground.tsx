"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Three.js is pulled in only on the client, and only once we've decided the
// device should render it — it stays out of the initial bundle entirely.
const ParticleField = dynamic(() => import("./ParticleField"), {
  ssr: false,
});

type Tier = "off" | "reduced" | "full";

const detectTier = (): Tier => {
  if (typeof window === "undefined") return "off";

  // Honour the OS-level motion preference above everything else
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "reduced";
  }

  // Bail out if WebGL isn't actually available
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return "off";
  } catch {
    return "off";
  }

  // Low core count is a reasonable proxy for a weak GPU
  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores <= 4) return "reduced";

  return "full";
};

const SceneBackground = () => {
  const [tier, setTier] = useState<Tier>("off");
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef(0);

  useEffect(() => {
    // Defer past first paint so the scene never blocks content rendering
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => {
          setTier(detectTier());
          setMounted(true);
        })
      : window.setTimeout(() => {
          setTier(detectTier());
          setMounted(true);
        }, 200);

    return () => {
      if (window.cancelIdleCallback && typeof id === "number") {
        window.cancelIdleCallback(id);
      } else {
        clearTimeout(id as number);
      }
    };
  }, []);

  // Track normalised scroll progress in a ref — no re-renders per frame
  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pause rendering when the tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      setMounted(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (!mounted || tier === "off") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    >
      <ParticleField
        count={tier === "reduced" ? 1200 : 4000}
        motion={tier === "reduced" ? 0 : 1}
        scrollRef={scrollRef}
      />
    </div>
  );
};

export default SceneBackground;
