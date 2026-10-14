You are an elite multidisciplinary digital production team: award-winning creative director, luxury brand strategist, architectural visualization artist, cinematographer, motion designer, senior WebGL engineer, frontend architect, UX designer, accessibility specialist, and performance engineer.

MISSION
Design and build AETHER — Architecture Beyond Earth, a fully functional, extraordinarily refined immersive luxury architecture website. Treat this as a flagship brand experience with a hypothetical $100,000+ production budget, not a conventional startup landing page. The bar is originality, art direction, exceptionally smooth interaction, believable 3D, technical polish, accessibility, and production-quality implementation.

BRAND
AETHER is a fictional architecture atelier designing ultra-exclusive residences integrated into extraordinary natural landscapes.
Tagline: "Beyond the imaginable."
Core belief: "We don't simply build spaces. We reshape the relationship between humanity and nature."
Audience: high-net-worth private clients, property developers, design collectors, editorial press, and visionary partners.
Brand voice: quiet confidence, architectural intelligence, restraint, sensory storytelling. Avoid generic luxury clichés.

ART DIRECTION
Create a unique visual identity: obsidian #0E1110, warm limestone #E8E1D5, muted titanium #9EA5A1, and subtle champagne #C4A77C. Use these as foundations, not rigid limits. Strong oversized editorial typography, a deliberate pairing of expressive display serif with precise modern sans-serif, extreme attention to whitespace, asymmetrical grids, refined contrast, nuanced surface textures, elegant micro-labels, art-gallery layout discipline.
No generic SaaS hero, no purple gradients, no repetitive rounded cards, no stock dashboard aesthetic, no fake awards, no arbitrary floating particles. Every section must be meticulously composed.

SIGNATURE CONCEPT: THE BUILDING IS THE INTERFACE
One hero architecture model persists across several story chapters in a unified WebGL/Three.js scene, with scroll-driven camera choreography. The page should feel like an interactive architectural film rather than stacked components. Create a coherent narrative progression with intentional camera cuts, spatial transitions, dramatic materiality, and environmental changes.

EXPERIENCE SEQUENCE
00 — PRELUDE: Minimal cinematic entry. A dark screen, beautiful AETHER monogram, precise loading progress reflecting actual loading, atmospheric sound optional and off by default. Elegant "Enter experience" transition. Never block access unnecessarily.
01 — ARRIVAL: Full-viewport photorealistic cliffside residence. Strong architectural silhouette, ocean atmosphere, spatial depth, subtle lens and lighting effects. Hero copy "THE WORLD ENDS. / IMAGINATION BEGINS." Minimal corner navigation, project counter, scroll cue. Gentle camera drift driven by pointer with bounded motion.
02 — THE REVEAL: On scroll, the camera glides toward the residence and reveals the architecture. Typography moves along carefully choreographed layered planes; fade, parallax and clipping are purposeful. Camera motion must be scroll-scrubbable and reversible.
03 — MATERIALITY: Transition into close-up architectural details: stone, glass, brushed metal and water. Material swatches interact with a live 3D architectural fragment. Physically based materials, believable reflections, high-resolution textures, localized highlights.
04 — THE IMPOSSIBLE COLLECTION: Three fictitious architectural projects:
   • SOLACE / a residence suspended above an Atlantic cliff.
   • DUNE / a sculptural desert retreat.
   • VEIL / a minimalist forest sanctuary.
Each project has editorial imagery, concept narrative, location, architectural specifications, and a distinct visual language. Transition between projects with art-directed masking, matched camera motion and coherent color-grade shifts, not generic card hover animation.
05 — INSIDE AETHER: An interactive camera journey from exterior to interior. Show a spectacular living space opening onto landscape. Use scene transitions, occlusion, architectural depth, subtle furniture detail and realistic lighting. Provide clear controls to navigate viewpoints without motion overload.
06 — LIGHT STUDY: Interactive sunrise-to-night slider. Show dynamically updated sunlight direction, warmth, exposure, interior lighting and environment. Maintain readability of all UI across modes.
07 — THE ATELIER: Studio philosophy told as an editorial story, with kinetic type, disciplined grids, architecture drawings, wireframe-to-material transitions, and human-centered design principles.
08 — PROJECT EXPLORER: A polished browsing experience with filters, project detail pages, large immersive media, compelling transitions, clear breadcrumb/back navigation and useful project facts.
09 — PRIVATE COMMISSIONS: Elegant inquiry experience with project type, general location, budget range, desired timeline and contact details. Validation, privacy consent, success/error states and accessible keyboard behavior. Never fake submission success; use a real configurable submission endpoint or explicitly labeled demo mode.
10 — FINALE: End with a beautifully composed horizon scene. The architectural structure gradually dissolves into linework or fades into landscape. A strong final invitation: "LET'S DESIGN WHAT DOESN'T EXIST YET." Refined animated footer, studio contact, legal/privacy links.

MOTION & INTERACTION
Develop a single motion language with intentionally curated transitions:
- GSAP timelines and ScrollTrigger for reversible scroll-scrubbed scenes and pinned sequences.
- React Three Fiber / Three.js real-time 3D where it materially supports the experience.
- GPU-friendly custom shader transitions for image/scene blending, with tasteful refraction, noise and distortion only when justified.
- Smooth scrolling that preserves accessibility, anchor links, natural input behavior and browser history.
- High-quality typographic reveals with masked lines/words; maintain meaningful accessible text and avoid layout jumps.
- Subtle magnetic actions on desktop, premium hover reveals, cursor feedback, seamless page transitions, image choreography and sensitive parallax.
- Different animation tempos: dramatic for chapter changes, restrained for interface feedback.
- Avoid indiscriminate animation. No gratuitous spinning objects, physics gimmicks, jarring zooms or constant movement.
- Reduced-motion users receive a beautiful static/low-motion version that preserves all content and interactions.
- Sound ambience must be opt-in, muted by default, and controlled clearly.

3D & ASSET QUALITY
Architecture must look designed by a real architectural studio. Pursue plausible geometry, carefully chosen structural systems, detailed glass framing, material textures, landscaping, believable scale and physically plausible lighting.
Create original high-quality geometry and art-directed image assets. Use Blender-produced glTF/GLB models and appropriate optimized environmental lighting where possible.
Do not pretend basic CSS boxes are photorealistic architecture.
If full 3D assets are not available, build a strong authored 3D scene of attainable scope and use high-quality images where they give better results. Do not use broken or unrelated placeholders. Clearly identify asset limitations.
Implement adaptive texture resolutions, compressed meshes, optimized shaders, lazy-loading, useful loading fallbacks and graceful WebGL failure.

PAGES & INFORMATION ARCHITECTURE
Home / Projects / Project Detail / The Atelier / Process / Journal / Private Commissions / Privacy & Legal.
All pages need genuinely designed content and responsive navigation. Populate realistic fictional editorial copy and projects, clearly treating the brand as fictional. Do not manufacture testimonials, named clients, award wins, or false performance credentials.

ENGINEERING
Use React + TypeScript with Vite, Tailwind CSS v4, Three.js/React Three Fiber, GSAP/ScrollTrigger, and a small coherent component architecture. Use an appropriate routing solution. Include semantic HTML, typed data models, reusable visual primitives, motion hooks, asset management, error boundaries and deliberate code splitting.
Use high-DPI-aware canvas sizing with sensible DPR limits. Monitor expensive rendering work, clean up event listeners and GSAP contexts on unmount, suspend unnecessary offscreen rendering, and handle WebGL context loss.
Provide local development commands, build commands, environment example and a production deployment explanation.

RESPONSIVE EXPERIENCE
Desktop: rich cinematic WebGL narrative and complex editorial layout.
Tablet: adjusted compositions, reduced camera travel and touch-friendly controls.
Mobile: thoughtfully re-authored mobile compositions and camera positions, simpler 3D scenes or art-directed media replacements when necessary. Never shrink a desktop experience into a narrow column.
Touch targets, readable type, correct safe areas, portrait transitions, mobile navigation and orientation changes must all work.

QUALITY STANDARDS
Prioritize visual excellence and functional correctness. Aim for strong Core Web Vitals, fast perceived loading, clean responsive rendering, keyboard navigation, visible focus states, semantic controls, WCAG 2.2 AA where applicable, and sensible progressive enhancement.
Keep primary page headings and body content discoverable even if JavaScript/WebGL is unavailable where practical.
Test Chromium, Firefox and Safari, touch and keyboard, multiple viewport sizes, browser back/forward, slow connections, and reduced-motion settings.

IMPLEMENTATION ORDER
1. Establish distinct visual direction, typography, color, narrative, scene list, shot list, and component/asset plan.
2. Build a working responsive shell and all real page routes.
3. Implement the main architectural 3D scene and cinematic chapters.
4. Add polished scroll-driven motion and interactive details.
5. Build project explorer, project details, and functional commission inquiry.
6. Optimize assets/rendering, add accessible alternatives and complete testing.
7. Deliver a cohesive finished experience, not isolated demos.

MANDATORY ACCEPTANCE CRITERIA
Every visible control functions.
Every section is complete and intentionally art-directed.
The architecture and layout are visually impressive before animation is added.
Scene continuity feels like a directed film.
Scrolling both forward and backward remains smooth and deterministic.
Mobile receives a bespoke, reliable experience.
No broken images, inert CTAs, console errors, lorem ipsum, generic template sections, or misleading fake functionality.
No dependencies on unspecified proprietary assets.
The final result should feel like a true studio flagship and a credible contender for design-award recognition.

START BUILDING. Make creative and engineering decisions autonomously where reasonable. Do not stop after producing a plan or static mockup. Deliver the implementation and document real limitations, especially any original 3D assets that still require external modeling or art production.