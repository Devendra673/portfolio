"use client";

import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const scaleX = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      scaleX.set(totalHeight > 0 ? window.scrollY / totalHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scaleX]);

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-primary"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
