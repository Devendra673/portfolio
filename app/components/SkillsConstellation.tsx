"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  skillNodes,
  skillEdges,
  skillGroupMeta,
  skillLevelMeta,
  type SkillGroup,
  type SkillLevel,
} from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Skills rendered as an interactive constellation.
 *
 * Nodes are grouped into radial clusters by discipline, and edges reflect how
 * the tools actually combine in my projects (Python -> FastAPI -> RAG -> FAISS).
 * Hovering a node dims everything except its direct connections.
 *
 * The SVG is decorative: a plain, grouped list of the same skills is rendered
 * visually hidden so assistive tech and search engines get real content.
 */

const VIEW_W = 900;
const VIEW_H = 520;

/** Cluster centres, laid out to spread the disciplines across the canvas. */
const CLUSTER_CENTRES: Record<SkillGroup, { x: number; y: number }> = {
  language: { x: 180, y: 150 },
  frontend: { x: 720, y: 130 },
  backend: { x: 250, y: 400 },
  ai: { x: 560, y: 320 },
  infra: { x: 800, y: 420 },
};

/** Node radius by proficiency — core skills read as larger, brighter points. */
const LEVEL_RADIUS: Record<SkillLevel, number> = {
  core: 7,
  strong: 5,
  familiar: 3.5,
};

const LEVEL_OPACITY: Record<SkillLevel, number> = {
  core: 1,
  strong: 0.75,
  familiar: 0.5,
};

interface PositionedNode {
  id: string;
  label: string;
  group: SkillGroup;
  level: SkillLevel;
  x: number;
  y: number;
}

const SkillsConstellation = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  /** Deterministic layout: nodes fan out around their cluster centre. */
  const nodes = useMemo<PositionedNode[]>(() => {
    const byGroup = new Map<SkillGroup, typeof skillNodes>();
    skillNodes.forEach((n) => {
      const list = byGroup.get(n.group) ?? [];
      list.push(n);
      byGroup.set(n.group, list);
    });

    const placed: PositionedNode[] = [];

    byGroup.forEach((groupNodes, group) => {
      const centre = CLUSTER_CENTRES[group];
      const count = groupNodes.length;

      groupNodes.forEach((node, i) => {
        // Spread around a circle, with a slight inward pull for core skills so
        // the important ones sit closer to the cluster centre.
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const spread = node.level === "core" ? 58 : node.level === "strong" ? 82 : 98;
        // Alternate radius slightly to avoid a perfect ring
        const jitter = i % 2 === 0 ? 0 : 14;

        placed.push({
          ...node,
          x: centre.x + Math.cos(angle) * (spread + jitter),
          y: centre.y + Math.sin(angle) * (spread + jitter) * 0.72,
        });
      });
    });

    return placed;
  }, []);

  const nodeById = useMemo(
    () => new Map(nodes.map((n) => [n.id, n])),
    [nodes]
  );

  /** Ids directly connected to the hovered node, including itself. */
  const connectedIds = useMemo(() => {
    if (!activeId) return null;
    const set = new Set<string>([activeId]);
    skillEdges.forEach(([a, b]) => {
      if (a === activeId) set.add(b);
      if (b === activeId) set.add(a);
    });
    return set;
  }, [activeId]);

  const isDimmed = (id: string) =>
    connectedIds !== null && !connectedIds.has(id);

  const groupedForA11y = useMemo(() => {
    const map = new Map<SkillGroup, PositionedNode[]>();
    nodes.forEach((n) => {
      const list = map.get(n.group) ?? [];
      list.push(n);
      map.set(n.group, list);
    });
    return map;
  }, [nodes]);

  return (
    <section id="skills" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="section-label text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Stack
          </p>
          <p className="mt-6 max-w-xl text-sm text-muted-foreground">
            How these actually connect in my work. Hover any node to trace its
            path — the links mirror real pipelines, not a wordcloud.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="mb-6 hidden flex-wrap items-center gap-x-6 gap-y-2 sm:flex">
          {(Object.keys(skillLevelMeta) as SkillLevel[]).map((level) => (
            <span
              key={level}
              className="flex items-center gap-2 text-[11px] text-muted-foreground"
            >
              <span
                className="rounded-full bg-primary"
                style={{
                  width: LEVEL_RADIUS[level] * 2,
                  height: LEVEL_RADIUS[level] * 2,
                  opacity: LEVEL_OPACITY[level],
                }}
              />
              {skillLevelMeta[level].label}
              <span className="hidden text-muted-foreground/60 sm:inline">
                — {skillLevelMeta[level].description}
              </span>
            </span>
          ))}
        </div>

        {/* Constellation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="neon-card hidden overflow-hidden rounded-2xl border border-border bg-card/30 backdrop-blur-sm sm:block"
          onMouseLeave={() => setActiveId(null)}
        >
          <svg
            aria-hidden
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="h-auto w-full"
            style={{ touchAction: "pan-y" }}
          >
            {/* Cluster labels */}
            {(Object.keys(CLUSTER_CENTRES) as SkillGroup[]).map((group) => {
              const c = CLUSTER_CENTRES[group];
              return (
                <text
                  key={group}
                  x={c.x}
                  y={c.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground font-mono uppercase"
                  style={{ fontSize: 11, letterSpacing: 2, opacity: 0.35 }}
                >
                  {skillGroupMeta[group].label}
                </text>
              );
            })}

            {/* Edges */}
            <g>
              {skillEdges.map(([a, b], i) => {
                const na = nodeById.get(a);
                const nb = nodeById.get(b);
                if (!na || !nb) return null;

                const active =
                  activeId !== null &&
                  (a === activeId || b === activeId);
                const dim =
                  activeId !== null && !active;

                return (
                  <line
                    key={`${a}-${b}-${i}`}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke={active ? "var(--accent)" : "var(--primary)"}
                    strokeWidth={active ? 1.4 : 0.6}
                    style={{
                      opacity: dim ? 0.04 : active ? 0.75 : 0.16,
                      transition: "opacity 0.3s ease, stroke-width 0.3s ease",
                    }}
                  />
                );
              })}
            </g>

            {/* Nodes */}
            <g>
              {nodes.map((node) => {
                const dim = isDimmed(node.id);
                const isActive = node.id === activeId;
                const r = LEVEL_RADIUS[node.level];

                return (
                  <g
                    key={node.id}
                    style={{
                      opacity: dim ? 0.18 : 1,
                      transition: "opacity 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setActiveId(node.id)}
                  >
                    {/* Generous invisible hit area */}
                    <circle cx={node.x} cy={node.y} r={16} fill="transparent" />

                    {/* Glow behind active node */}
                    {isActive && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r + 7}
                        fill="var(--accent)"
                        style={{ opacity: 0.22 }}
                      />
                    )}

                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isActive ? r + 1.5 : r}
                      fill={isActive ? "var(--accent)" : "var(--primary)"}
                      style={{
                        opacity: LEVEL_OPACITY[node.level],
                        transition: "r 0.25s ease, fill 0.25s ease",
                      }}
                    />

                    <text
                      x={node.x}
                      y={node.y - r - 7}
                      textAnchor="middle"
                      className="fill-foreground font-mono"
                      style={{
                        fontSize: 10.5,
                        opacity: isActive ? 1 : 0.62,
                        transition: "opacity 0.25s ease",
                      }}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </motion.div>

        {/* Real content for assistive tech and crawlers */}
        <div className="sr-only">
          <h3>Technical skills</h3>
          {Array.from(groupedForA11y.entries()).map(([group, items]) => (
            <div key={group}>
              <h4>{skillGroupMeta[group].label}</h4>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    {item.label} — {skillLevelMeta[item.level].label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Visible fallback list on very small screens where the graph is cramped */}
        <div className="mt-8 grid gap-4 sm:hidden">
          {Array.from(groupedForA11y.entries()).map(([group, items]) => (
            <div
              key={group}
              className="rounded-xl border border-border bg-card/40 p-4"
            >
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                {skillGroupMeta[group].label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item.id}
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[11px]",
                      item.level === "core"
                        ? "border-primary/40 text-foreground"
                        : item.level === "strong"
                          ? "border-border text-muted-foreground"
                          : "border-border/60 text-muted-foreground/70"
                    )}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsConstellation;
