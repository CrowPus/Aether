# Design System — AETHER (Architecture Beyond Earth)

> Adapted from the `"bugatti"` reference — kept the austere luxury dark-canvas philosophy, strict three-typeface functional split (display / prose / technical monospace), zero-radius architectural framing (`0px` structural containers), hairline `1px` dividers over drop shadows, and generous 112px–144px section pacing; recoloured from cold automotive `#000000`/`#ffffff` to AETHER's warm mineral palette of Deep Obsidian (`#0E1110`), Warm Limestone (`#E8E1D5`), Muted Titanium (`#9EA5A1`), and Subtle Champagne (`#C4A77C`), and paired Cormorant Garamond (editorial display) with Inter (humanist body) and JetBrains Mono (geospatial & structural telemetry).

---

## Product & feel

AETHER is a flagship digital monograph and spatial exploration experience for an ultra-luxury architectural atelier operating across Zurich, Reykjavik, and Kyoto. Built for private residential commissioners, family offices, and architectural collectors, it presents bespoke monolithic residences engineered for extreme coastal cliffs, hyper-arid dunes, and old-growth forest basins. The intended personality is **quietly monumental, mineral, precise, and unhurried** — evoking Aman Resorts, Tadao Ando's concrete sanctuaries, and Peter Zumthor's thermal monoliths. Density is **spacious and editorial** (`112px–144px` vertical chapter rhythm) paired with **high-precision technical telemetry blocks** where structural cantilevers, solar azimuths, and quarry specs are compared.

---

## Principles

1. **The Building is the Interface:** The persistent interactive 3D architectural projection canvas (`drawArchitectureFrame`) and curated environmental photography carry the primary visual voltage. UI chrome stays recessed, structural, and quiet.
2. **Tectonic Honesty Over Decoration:** Containers use crisp `0px` architectural corners and `1px` mineral hairlines (`rgba(232, 225, 213, 0.12)`). Never use bouncy SaaS cards, heavy drop shadows, or arbitrary neon gradients.
3. **Rigid Three-Typeface Split:** Cormorant Garamond speaks for architectural poetry and chapter titles; Inter handles readable long-form monograph copy and form controls; JetBrains Mono exclusively governs coordinates, elevations, structural metrics, and interactive telemetry triggers.
4. **Atmospheric Continuity:** Transitions follow a calm editorial continuity grammar (`cubic-bezier(0.22, 1, 0.36, 1)`) with full `prefers-reduced-motion` parity so spatial meaning is never dependent on motion alone.
5. **Tactile Environmental Agency:** Every interactive control (material specimen selector, interior camera station, heliodon solar scrubber, project filter, and wireframe/solid ratio) immediately updates the live architectural stage and telemetry readouts.

---

## Colour

AETHER is an intentionally nocturnal, obsidian-grounded experience (no light mode; `color-scheme: dark`). All surfaces are tinted toward warm volcanic basalt and honed limestone rather than sterile pure black or cold blue-gray.

### Semantic Roles

| Role | Token | Hex / Value | Usage & Meaning |
| :--- | :--- | :--- | :--- |
| **bg** | `--color-bg` / `--color-obsidian` | `#0E1110` | Primary page floor and nocturnal atmospheric ground |
| **surface** | `--color-surface` / `--color-obsidian-elevated` | `#141917` | Primary architectural dossier cards, telemetry panels, modal floor |
| **surface-raised** | `--color-surface-raised` / `--color-obsidian-surface` | `#181F1D` | Active/selected specimen cards, hovered control wells, elevated drawers |
| **border** | `--color-border` | `rgba(232, 225, 213, 0.12)` | Structural `1px` hairline dividers, card perimeters, table rules |
| **border-strong** | `--color-border-strong` | `rgba(232, 225, 213, 0.28)` | Emphasized control borders, input idle borders, active hairlines |
| **fg** | `--color-fg` / `--color-limestone` | `#E8E1D5` | Primary headlines, active labels, numerical readouts (13.4:1 vs `#0E1110`) |
| **fg-muted** | `--color-fg-muted` / `--color-titanium` | `#9EA5A1` | Supporting prose, secondary metadata, inactive nav links (7.1:1 vs `#0E1110`) |
| **primary** | `--color-primary` | `#E8E1D5` | Primary high-contrast solid CTA fill (Warm Limestone) |
| **primary-fg** | `--color-primary-fg` | `#0E1110` | Text/icon ink on primary solid buttons (Deep Obsidian) |
| **accent** | `--color-accent` / `--color-champagne` | `#C4A77C` | Subtle Champagne — active chapter telemetry, selected card borders, coordinates, solar clock, hover emphasis (8.2:1 vs `#0E1110`) |
| **accent-bright** | `--color-champagne-bright` | `#D9BE94` | Pressed/highlighted champagne accent state |
| **success** | `--color-success` | `#7BA68A` | Semantic status only: encrypted dossier dispatch confirmation, verified structural datum |
| **warning** | `--color-warning` | `#D4A359` | Semantic status only: extreme wind/solar advisory or environmental threshold |
| **danger** | `--color-danger` | `#E07A6A` | Semantic status only: inline form validation errors and required-field alerts |
| **focus-ring** | `--color-focus-ring` | `#C4A77C` | `2px solid #C4A77C` with `3px` offset on `:focus-visible` across all interactive controls |

**Meaning vs. Decoration:**
- `--color-success`, `--color-warning`, and `--color-danger` are strictly reserved for semantic feedback (commission form validation, confirmation states).
- `--color-accent` (`#C4A77C`) denotes active selection, geospatial telemetry, and chapter indexing — never used as a large background fill.

---

## Typography

### Font Families

- **Display (`--font-display`):** `"Cormorant Garamond", Georgia, "Times New Roman", serif`
  - Used for the `AETHER` wordmark, hero statement, chapter headings (`h1`–`h3`), architectural pull quotes, and large numeric readouts. Always rendered at light/regular weights (`300` or `400`), never bold.
- **Body (`--font-sans`):** `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  - Used for architectural narrative paragraphs, structural notes, form inputs, and modal dossiers.
- **Monospace (`--font-mono`):** `"JetBrains Mono", ui-monospace, "SF Mono", monospace`
  - Used for chapter numbers (`01 / ARRIVAL`), GPS coordinates (`63°24′12″N`), material reflectance (`ρ 34%`), camera focal lengths, button labels, and navigation items.

### Type Scale

| Step | Size | Line Height | Weight | Tracking | Where Used |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **display-hero** | `clamp(3rem, 6vw, 5.4rem)` (`48px–86px`) | `0.96` | `300` | `-0.02em` | Chapter 01 Hero `h1` ("AETHER — Architecture Beyond Earth") |
| **display-quote** | `clamp(2.25rem, 4.5vw, 3.75rem)` (`36px–60px`) | `1.06` | `300` | `-0.015em` | Chapter 07 Atelier philosophical statement |
| **display-h2** | `clamp(2.25rem, 3.5vw, 3rem)` (`36px–48px`) | `1.05` | `300` | `-0.01em` | Primary chapter headings (`02` through `09`) |
| **display-metric** | `3rem` (`48px`) | `1.0` | `300` | `-0.02em` | Animated structural metrics (`18m`, `840m²`, `64 STC`) |
| **display-h3** | `1.5rem–1.875rem` (`24px–30px`) | `1.2` | `400` | `0.01em` | Residence titles (`SOLACE`, `DUNE`, `VEIL`), active specimen titles |
| **wordmark** | `1.25rem` (`20px`) | `1.0` | `400` | `0.28em` | Top header `AETHER` wordmark (uppercase) |
| **body-lg** | `1.125rem–1.25rem` (`18px–20px`) | `1.65` | `300` | `0` | Hero lead paragraph |
| **body-md** | `1rem` (`16px`) | `1.65` | `400` | `0` | Primary chapter narrative prose and form inputs (prevents iOS zoom) |
| **body-sm** | `0.875rem` (`14px`) | `1.6` | `400` | `0` | Residence card subtitles, interior station descriptions, modal body |
| **body-xs** | `0.75rem` (`12px`) | `1.55` | `400` | `0` | Secondary technical descriptions, finish notes |
| **mono-label** | `0.75rem` (`12px`) | `1.4` | `400–500` | `0.20em–0.24em` | Chapter eyebrows, primary CTA buttons, form field labels (uppercase) |
| **mono-telemetry** | `0.6875rem` (`11px`) | `1.4` | `400` | `0.18em–0.22em` | Nav links, GPS coordinates, specimen codes, filter pills (uppercase) |

### Numeric Discipline
- `font-variant-numeric: tabular-nums` is enforced on all `<AnimatedNumber>` readouts, solar clock timestamps (`18:12 UTC`), wireframe percentage counters, elevation figures, and coordinate tables so figures never jitter during live scrubbing.

---

## Spacing & layout

- **Base unit:** `4px` (`0.25rem`).
- **Spacing scale:** `4px` (`1`) · `8px` (`2`) · `12px` (`3`) · `16px` (`4`) · `24px` (`6`) · `32px` (`8`) · `48px` (`12`) · `56px` (`14`) · `80px` (`20`) · `112px` (`28`) · `144px` (`36`).
- **Container width:** `max-w-[1440px]` centered with `24px` (`px-6`) horizontal padding on mobile/tablet and `48px` (`lg:px-12`) on desktop.
- **Grid system:** 12-column CSS Grid (`lg:grid-cols-12`) with `32px–48px` (`gap-8` to `gap-12`) gutters for asymmetric editorial pairings (e.g., 5-column narrative + 7-column interactive telemetry stage; or 8-column hero statement + 4-column flagship study dossier).
- **Section rhythm:** Every chapter (`#chapter-02` through `#chapter-09`) is separated by a `1px` structural hairline (`border-t border-[#E8E1D5]/10`), `scroll-mt-20` for anchored header clearance, and `112px` (`py-28`) mobile / `144px` (`lg:py-36`) desktop vertical padding.

---

## Radius & elevation

### Radius Scale
- **Structural containers (`0px`):** All dossier cards, residence cards, specimen tiles, inputs, selects, textareas, modals, and buttons use `0px` (`rounded-none`) corners to express precision-milled stone and titanium joinery.
- **Material specimen orbs (`9999px`):** `rounded-full` is used exclusively for the `44px × 44px` mineral shader spheres in Chapter 03 so their radial specular highlights read as physical core samples.

### Elevation & Depth Language
- **Level 0 (Interactive Stage):** Fixed full-viewport `<canvas>` (`z-0`) with a subtle `72px × 72px` architectural datum grid (`aether-grid-bg`) and vertical atmospheric vignette (`from-[#0E1110]/55 via-transparent to-[#0E1110]/90`).
- **Level 1 (Editorial Chapters):** Semi-translucent obsidian bands (`bg-[#0E1110]/80` to `bg-[#0E1110]/90`, `z-10`) that let the 3D residence subtly breathe behind chapter transitions.
- **Level 2 (Dossier & Telemetry Cards):** `bg-[#141917]/90` to `bg-[#141917]/95` with `1px solid rgba(232, 225, 213, 0.12)` structural borders. Active states shift background to `#181F1D` and border to `1px solid #C4A77C`. No heavy drop shadows.
- **Level 3 (Sticky Header):** `fixed top-0 z-40` with `bg-[#0E1110]/80 backdrop-blur-md` and `border-b border-[#E8E1D5]/10`.
- **Level 4 (Modals & Top Progress):** `z-50` for the top `2px` Champagne `<ScrollProgress>` bar and full-screen backdrop-blurred architectural dossier / legal dialogs (`bg-[#0E1110]/85 backdrop-blur-md`).

---

## Components

- **Buttons:**
  - *Primary Solid:* `bg-[#E8E1D5] text-[#0E1110]`, `min-h-[48px] px-7 py-3.5`, `font-mono-tech text-xs font-medium tracking-[0.22em] uppercase`. Hover transitions to `bg-[#C4A77C] text-[#0E1110]`.
  - *Secondary Ghost / Telemetry:* `border border-[#E8E1D5]/25 bg-[#0E1110]/60 text-[#E8E1D5]`, `min-h-[48px] px-7 py-3.5`, `font-mono-tech text-xs tracking-[0.22em] uppercase`. Hover shifts border and text to `#C4A77C`.
  - *Compact Header / Filter Pill:* `min-h-[38px] px-3.5 py-1.5` (or `px-4 py-2`), `border border-[#E8E1D5]/15 bg-[#141917]/85`, `font-mono-tech text-[11px] tracking-[0.18em] uppercase`. Active state uses `border-[#C4A77C] bg-[#C4A77C]/15 text-[#E8E1D5]`.
- **Inputs, Selects & Textareas:**
  - `w-full border border-[#E8E1D5]/20 bg-[#0E1110] px-4 py-3 text-base text-[#E8E1D5] placeholder-[#9EA5A1]/40 focus:border-[#C4A77C]`. Explicit `#0E1110` background and `#E8E1D5` text on native `<select>` elements guarantee dark-mode legibility across Windows and macOS browsers.
- **Cards (Residences, Specimens, Telemetry):**
  - `0px` radius, `1px` border (`border-[#E8E1D5]/12` or `/15`), `bg-[#141917]/90`. Residence cards wrap in `<Tilt rotationFactor={4}>` and Specimen cards contain a cursor-tracked `<Spotlight className="bg-[#C4A77C]/15 blur-2xl" size={180} />`.
- **Navigation:**
  - Persistent top bar with brand wordmark at left, 8 chapter anchor links (`#chapter-02` to `#chapter-09`) in uppercase monospace at center, live chapter telemetry badge (`CH · 01`) and user-initiated Web Audio sound toggle (`Sound: Off/On`) at right, plus a responsive mobile chapter quick-bar so narrow viewports have one-tap access to all chapters.
- **Tables & Key-Value Specs:**
  - Semantic `<dl>` grids with `border-t border-[#E8E1D5]/10` dividers, `<dt>` labels in `font-mono-tech text-[11px] text-[#9EA5A1] uppercase`, and `<dd>` values in `text-[#E8E1D5]` or `#C4A77C` with `tabular-nums`.
- **Badges & Chips:**
  - Architectural datum tags (`SOL-01 · Coastal Cliff`, `ACTIVE SPECIMEN · MAT-01`) set in `font-mono-tech text-[10px]–[11px] tracking-[0.2em] uppercase` inside `bg-[#0E1110]/85 px-3 py-1 text-[#C4A77C]`.
- **Dialogs (Project Dossier & Legal Notice):**
  - `role="dialog" aria-modal="true"` with `aria-labelledby`, backdrop click dismissal, Escape key listener, `overscroll-behavior: contain`, and explicit `40px × 40px` (`h-10 w-10`) close button.

---

## States

- **Initial Entry / Loading:** Non-blocking atmospheric telemetry bar/veil that never obscures primary content on initial inspection and can be dismissed or replayed at will.
- **Empty / Filtered State:** If a typology filter matches a subset of residences, the count and active filter pill clearly indicate the scoped view (`Showing 1 of 3 Monolithic Commissions`) with a one-click reset to `All`.
- **Error / Validation State:** Submitting an incomplete Commission Inquiry surfaces inline field-level error messages in `--color-danger` (`#E07A6A`) with `role="alert"` and descriptive recovery instructions without clearing user-typed values.
- **Success State:** Valid commission submission transitions the form container (`role="status" aria-live="polite"`) to an encrypted dossier confirmation card with a `CheckCircle2` icon, personalized summary, and a `"Submit Another Commission Brief"` recovery action.
- **Active / Selected State:** Interactive specimen tiles, interior camera viewpoints, typology filters, and solar presets use redundant cues: `aria-pressed="true"`, a `#C4A77C` border, a `#181F1D` or `#C4A77C/15` surface shift, and an explicit `"ACTIVE SPECIMEN"` / `"ACTIVE STATION"` text readout.

---

## Motion

- **Editorial Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (`EASE_EDITORIAL`) for all chapter reveals and staggered card groups.
- **Durations:**
  - *Instant feedback:* `150ms` for button border/color states.
  - *Deliberate reveal:* `560ms–680ms` for `<InView>` and `<AnimatedGroup>` chapter entrances.
  - *Photographic scale:* `700ms` subtle `scale-105` on residence photography hover.
- **Preserved Motion Primitives (`@/components/motion/*`):**
  - `<ScrollProgress>`: Fixed top `2px` Champagne reading progress bar.
  - `<TextEffect>`: Word-by-word `fade-in-blur` entrance on the Hero `h1`.
  - `<InView>`: Viewport-triggered chapter entrances (`once` mode).
  - `<AnimatedGroup>`: Staggered (`80ms`) card reveals across metrics, materials, residences, and process phases.
  - `<AnimatedNumber>`: Spring-interpolated (`stiffness: 90, damping: 24`) structural telemetry numbers.
  - `<Spotlight>`: Cursor-reactive Champagne ambient glow inside material specimen cards.
  - `<Tilt>`: 3D perspective card tilt (`rotationFactor={4}`) on residence collection cards.
- **Reduced Motion (`useReducedMotion` & `@media (prefers-reduced-motion: reduce)`):**
  - When reduced motion is requested, `<InView>` and `<AnimatedGroup>` collapse translation/blur to instant opacity `1`, the 3D `<canvas>` freezes time-based orbital oscillation while preserving direct user scrubbing (solar slider, material switches, wireframe slider), and `scroll-behavior` reverts to `auto`.

---

## Accessibility

- **Contrast Targets:** Exceeds WCAG 2.2 AA across all text tiers: `#E8E1D5` on `#0E1110` (`13.4:1`), `#C4A77C` on `#0E1110` (`8.2:1`), `#9EA5A1` on `#0E1110` (`7.1:1`), and `#9EA5A1` on `#141917` (`6.4:1`).
- **Focus Ring:** Visible `2px solid #C4A77C` outline with `3px` offset on `:focus-visible`; skip-to-content link (`Skip to primary architectural experience`) at the top of the DOM.
- **Target Sizes:** Primary CTAs are `48px` tall; form inputs/selects are `48px` tall with `16px` (`text-base`) font size; header and filter controls meet ≥`38px–44px` hit areas.
- **Non-Colour Cues:** Active states pair border/fill changes with `aria-pressed`, uppercase status badges (`ACTIVE STATION`, `LOADED IN STAGE`), and icons (`CheckCircle2`, `Eye`, `Layers`).

---

## Iconography

- **Library:** `lucide-react` (`Compass`, `Volume2`, `VolumeX`, `ArrowUpRight`, `Sun`, `Layers`, `Eye`, `CheckCircle2`, `X`, `ShieldCheck`, `Sliders`, `Sparkles`).
- **Sizing & Stroke:** `14px` (`h-3.5 w-3.5`) inline with `11px` monospace telemetry; `16px` (`h-4 w-4`) in buttons and card headers; `20px–24px` (`h-5 w-5` / `h-6 w-6`) in solar and confirmation callouts. All decorative icons carry `aria-hidden="true"`.

---

## Do / Don't

- **Do** keep all structural cards, buttons, and inputs at `0px` border radius with crisp `1px` mineral borders (`#E8E1D5/12` to `#E8E1D5/25`).
- **Do** pair every interactive canvas control (material, solar hour, camera station, wireframe ratio) with an immediate numerical or textual telemetry readout in `JetBrains Mono`.
- **Do** maintain generous dark obsidian breathing room so the background 3D architectural projection remains visible between and behind chapters.
- **Don't** introduce SaaS tropes: no pill badges, no multi-colored status dots, no fake customer avatars, no chat widgets, and no pricing tier tables.
- **Don't** use pure `#000000` or `#FFFFFF` or cold `#3B82F6` blue focus rings — stay strictly within the Obsidian / Limestone / Titanium / Champagne mineral palette.
- **Don't** block the initial viewport with an opaque full-screen splash screen that hides the architecture on load.

---

## Implementation

- **CSS Tokens (`src/index.css`):** Defined inside `@theme` (`--color-obsidian`, `--color-limestone`, `--color-titanium`, `--color-champagne`, semantic aliases `--color-bg`, `--color-surface`, `--color-surface-raised`, `--color-border`, `--color-fg`, `--color-fg-muted`, `--color-primary`, `--color-accent`, `--color-success`, `--color-warning`, `--color-danger`, `--color-focus-ring`, and font families `--font-display`, `--font-sans`, `--font-mono`).
- **Typography & Base Rules (`index.html` & `src/index.css`):** Google Fonts (`Cormorant Garamond`, `Inter`, `JetBrains Mono`) preconnected and loaded with `display=swap`; `color-scheme: dark` declared on `<html>`; utility classes `.font-display`, `.font-sans-body`, `.font-mono-tech`, and `.aether-grid-bg` consumed across `src/App.tsx` and `src/components/motion/*`.
