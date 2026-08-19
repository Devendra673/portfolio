"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Deterministic pseudo-random in [0, 1) derived from an integer seed.
 *
 * Using this instead of Math.random() keeps particle generation a pure
 * function of the index, so the layout is stable across re-renders and
 * identical between runs — easier to reason about and to debug.
 */
const seededRandom = (seed: number) => {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * GPU-driven particle field.
 *
 * Positions are computed once on the CPU and animated entirely in the vertex
 * shader, so per-frame JS work stays near zero regardless of particle count.
 * Glow comes from additive blending on soft radial sprites rather than a
 * post-processing bloom pass — visually close, dramatically cheaper.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uSize;
  uniform float uMotion;

  attribute float aScale;
  attribute float aSpeed;
  attribute float aReveal;

  varying float vAlpha;
  varying float vEnergy;

  void main() {
    vec3 p = position;

    // Energy ramps up as the page scrolls: quiet and open at the top,
    // busier further down. Mirrors moving from a village to a city.
    float energy = 0.35 + uScroll * 0.65;

    // Gentle vertical drift, unique per particle, faster as energy rises
    float t = uTime * (0.6 + energy * 0.8);
    p.y += sin(t * aSpeed + p.x * 0.5) * 0.35 * uMotion;
    p.x += cos(t * aSpeed * 0.7 + p.z * 0.5) * 0.25 * uMotion;

    // Parallax: particles nearer the camera react more to the pointer
    float depth = (p.z + 12.0) / 24.0;
    p.xy += uPointer * depth * 1.6 * uMotion;

    // Scroll pushes the field back and down for a sense of travel
    p.z += uScroll * 6.0;
    p.y -= uScroll * 2.0;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Perspective-correct sizing
    gl_PointSize = uSize * aScale * (18.0 / -mvPosition.z);

    // Fade particles as they approach the camera or drift far away
    float distanceFade = smoothstep(0.0, 6.0, -mvPosition.z);
    float farFade = 1.0 - smoothstep(26.0, 38.0, -mvPosition.z);

    // Each particle has its own reveal threshold, so the field fills in
    // progressively rather than all at once.
    float revealed = smoothstep(aReveal - 0.25, aReveal, energy);

    vAlpha = distanceFade * farFade * revealed;
    vEnergy = energy;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying float vAlpha;
  varying float vEnergy;

  void main() {
    // Soft radial falloff -> round, glowing point
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    // Tighter falloff keeps small points crisp instead of washing them out
    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    glow = pow(glow, 1.5);

    // Violet at the core, shifting toward pink at the edges and with energy
    float hueShift = smoothstep(0.0, 0.5, d) * 0.6 + vEnergy * 0.4;
    vec3 color = mix(uColorA, uColorB, clamp(hueShift, 0.0, 1.0));

    gl_FragColor = vec4(color, glow * vAlpha);
  }
`;

interface FieldProps {
  count: number;
  motion: number;
  scrollRef: React.RefObject<number>;
}

const Field = ({ count, motion, scrollRef }: FieldProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const smoothedPointer = useRef(new THREE.Vector2(0, 0));
  const smoothedScroll = useRef(0);
  const { size } = useThree();

  // Geometry attributes are generated once and never re-allocated
  const { positions, scales, speeds, reveals } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const reveals = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (seededRandom(i * 4) - 0.5) * 46;
      positions[i * 3 + 1] = (seededRandom(i * 4 + 1) - 0.5) * 30;
      positions[i * 3 + 2] = seededRandom(i * 4 + 2) * -28;

      scales[i] = seededRandom(i * 4 + 3) * 0.55 + 0.12;
      speeds[i] = seededRandom(i * 7 + 11) * 0.5 + 0.15;
      // Reveal threshold: lower values are visible from the start, higher
      // values only appear once scroll energy builds.
      reveals[i] = seededRandom(i * 13 + 29);
    }

    return { positions, scales, speeds, reveals };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 9 },
      uMotion: { value: motion },
      // Neon Dusk: violet core shifting to hot pink
      uColorA: { value: new THREE.Color("#a855f7") },
      uColorB: { value: new THREE.Color("#ec4899") },
    }),
    [motion]
  );

  // Pointer tracking is attached to the window so it works over DOM content
  useEffect(() => {
    const target = pointer.current;
    const handleMove = (e: PointerEvent) => {
      target.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;

    // Clamp delta so a backgrounded tab doesn't cause a jump on return
    const dt = Math.min(delta, 0.05);

    mat.uniforms.uTime.value += dt * motion;

    // Ease pointer and scroll for weight rather than snapping
    smoothedPointer.current.lerp(pointer.current, 1 - Math.pow(0.001, dt));
    mat.uniforms.uPointer.value.copy(smoothedPointer.current);

    const target = scrollRef.current ?? 0;
    smoothedScroll.current += (target - smoothedScroll.current) * (1 - Math.pow(0.005, dt));
    mat.uniforms.uScroll.value = smoothedScroll.current;

    // Keep point size consistent across viewport sizes
    mat.uniforms.uSize.value =
      9 * Math.min(state.viewport.dpr, 2) * (size.width < 640 ? 0.75 : 1);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-aReveal" args={[reveals, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

interface ParticleFieldProps {
  count?: number;
  motion?: number;
  scrollRef: React.RefObject<number>;
}

const ParticleField = ({
  count = 4000,
  motion = 1,
  scrollRef,
}: ParticleFieldProps) => {
  return (
    <Canvas
      // Decorative layer — never exposed to assistive tech
      aria-hidden
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ pointerEvents: "none" }}
    >
      <Field count={count} motion={motion} scrollRef={scrollRef} />
    </Canvas>
  );
};

export default ParticleField;
