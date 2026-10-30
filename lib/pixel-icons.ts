/**
 * Pixel art icon paths — 32×32px / 40×40px retro assets
 * Governance rules: lib/pixel-art-governance.md
 * Usage: imageRendering: "pixelated" on <Image> elements
 */
export const pixelIcons = {
  // Core Algorithm & Architecture
  brain: "/images/pixel/cleaned/brain.webp",
  cpu: "/images/pixel/cleaned/cpu.webp",
  layers: "/images/pixel/cleaned/layers.webp",
  network: "/images/pixel/cleaned/network.webp",
  architecture: "/images/pixel/cleaned/architecture.webp",
  algorithms: "/images/pixel/cleaned/algorithms.webp",
  // Gear / Mechanism Matrix — dynamic routing, HexaCore infrastructure (per governance doc)
  gear: "/images/pixel/cleaned/gear.webp",

  // Genome & Identity
  genome: "/images/pixel/cleaned/genome.webp",
  jitna: "/images/pixel/cleaned/jitna.webp",
  // Scroll / Constitution — SignedAI, governance, FDIA constraint modeling (per governance doc)
  scroll: "/images/pixel/cleaned/scroll.webp",

  // Data & Evidence
  database: "/images/pixel/cleaned/database.webp",
  evidence: "/images/pixel/cleaned/evidence.webp",
  chart: "/images/pixel/cleaned/chart.webp",
  document: "/images/pixel/cleaned/document.webp",
  formula: "/images/pixel/cleaned/formula.webp",
  // Chart / Vector Node — delta memory engine, retrieval pathways (per governance doc)
  vectorNode: "/images/pixel/cleaned/vector-node.webp",

  // Navigation & Goals
  map: "/images/pixel/cleaned/map.webp",
  flag: "/images/pixel/cleaned/flag.webp",
  rocket: "/images/pixel/cleaned/rocket.webp",
  target: "/images/pixel/cleaned/target.webp",

  // Branding
  shield: "/images/pixel/cleaned/shield.webp",
  heart: "/images/pixel/cleaned/heart.webp",
} as const

export type PixelIconKey = keyof typeof pixelIcons