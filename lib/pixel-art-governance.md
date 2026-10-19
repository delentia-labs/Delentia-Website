# Delentia Labs — Pixel Art Visual Governance

## 1. Intent & Purpose
Pixel art assets within the RCT Ecosystem serve as symbolic representations of our constitutional alignment roots. They are deliberately low-fidelity to natively contrast with the high-fidelity enterprise 10-layer architecture, signifying the human intent at the core of the heavy compute.

## 2. Usage Rules & Conventions
- **Constraint:** Pixel art must be strictly contained within `40x40px` or `32x32px` boundaries (e.g. `w-8 h-8` with Tailwind).
- **Allowed placements:** 
  1. Section conceptual cards (e.g., Deep Dive preview cards).
  2. Roadmap timeline or version markers.
  3. Section headings via `<SectionHeading pixelIcon={...} />`.
- **Prohibited placements:** 
  1. Primary Hero immersive backgrounds.
  2. Overlapping inside dense CTA buttons (keep buttons clean).
  3. Tiled or repeated patterns that dilute the singular focus of the icon.
- **Colorization:** Keep original pixel art color palettes to maintain character, but slight thematic filters (`brightness-0 invert` or opacity shifts) are allowed in dark mode *only* if legibility heavily suffers. Otherwise, the retro colors should pop against the dark backgrounds.

## 3. Required Asset Pipeline
To complete the thematic consistency across all system modules, the following pixel assets are required to be created and integrated into `lib/pixel-icons.ts`:
1. **Gear/Mechanism Matrix** — to represent dynamic routing, algorithms, and model infrastructure.
2. **Scroll / Constitution** — to represent Signed AI, governance, constraint modeling, and FDIA principles.
3. **Chart / Vector Node** — to represent the delta memory engine and retrieval pathways.
