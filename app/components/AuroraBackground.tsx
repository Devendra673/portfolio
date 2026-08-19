"use client";

/**
 * Neon Dusk background.
 *
 * Three layers, all CSS-driven so there's no per-frame JS and no WebGL:
 *   1. Aurora — large soft light pools drifting on long offset cycles.
 *   2. Light bars — abstract vertical gradients along the bottom edge with a
 *      slow brightness flicker.
 *   3. Grid — a faint perspective grid for structure.
 *
 * Every layer is decorative and hidden from assistive tech. Motion is
 * disabled by the global prefers-reduced-motion rule in globals.css.
 */

// Deterministic bar widths/heights so server and client render identically
const bars = Array.from({ length: 28 }, (_, i) => {
  const seed = (i * 2654435761) % 1000;
  return {
    height: 18 + (seed % 60),
    opacity: 0.05 + ((seed >> 3) % 22) / 100,
    delay: (seed % 40) / 10,
  };
});

const AuroraBackground = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Aurora light pools */}
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />

      {/* Perspective grid */}
      <div className="bg-grid absolute inset-0" />

      {/* Vertical light bars */}
      <div className="absolute bottom-0 left-0 right-0 flex h-[22vh] items-end justify-between gap-[0.35vw] px-[2vw]">
        {bars.map((bar, i) => (
          <span
            key={i}
            className="light-bar flex-1 rounded-t-[2px]"
            style={{
              height: `${bar.height}%`,
              opacity: bar.opacity,
              animationDelay: `${bar.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette so content stays readable over the brighter areas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_100%)]" />
    </div>
  );
};

export default AuroraBackground;
