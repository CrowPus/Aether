import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, letting a later Tailwind utility beat an earlier one.
 *
 * `cn("px-2", cond && "px-4")` gives `px-4` rather than both — which plain
 * string concatenation cannot do, because CSS order decides the winner and the
 * order of the class attribute does not.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type RouteId =
  | "home"
  | "projects"
  | "project-detail"
  | "atelier"
  | "process"
  | "journal"
  | "commissions"
  | "legal";

export interface ProjectSpec {
  slug: "solace" | "dune" | "veil";
  code: string;
  title: string;
  subtitle: string;
  typology: "Coastal" | "Desert" | "Forest";
  location: string;
  coordinates: string;
  elevation: string;
  areaSqm: number;
  cantileverM: number;
  completionYear: number;
  climateZone: string;
  heroImage: string;
  accentHex: string;
  atmosphereGrade: string;
  leadArchitectNote: string;
  narrative: string;
  structuralSystem: string;
  materialsUsed: string[];
  materials: string[];
  acousticRating: string;
  solarGainIndex: string;
  solarOrientation: string;
  blueprintPoints: string;
}

export const PROJECTS: ProjectSpec[] = [
  {
    slug: "solace",
    code: "AE—01",
    title: "SOLACE",
    subtitle: "A residence suspended above an Atlantic basalt cliff.",
    typology: "Coastal",
    location: "Reynisfjara Coast, North Atlantic",
    coordinates: "63°24′12″N  19°02′45″W",
    elevation: "+74m ASL",
    areaSqm: 1420,
    cantileverM: 18,
    completionYear: 2026,
    climateZone: "Sub-polar Oceanic",
    heroImage: "/assets/solace-cliff.png",
    accentHex: "#C4A77C",
    atmosphereGrade: "from-[#0E1110]/90 via-[#151D21]/65 to-[#0E1110]",
    leadArchitectNote:
      "Anchored 22 meters into post-glacial basalt through post-tensioned titanium tendons, allowing the primary living datum to project weightlessly over the North Atlantic swell.",
    narrative:
      "Conceived not as an object placed upon the headland, but as a horizontal geological stratum extended into salt air. Triple-laminated low-iron acoustic glazing dissolves the boundary between storm surge and hearth.",
    structuralSystem: "Post-tensioned basalt-anchored steel & honed travertine shear core",
    materialsUsed: ["Honed Jura Limestone", "Blackened Marine Steel", "Low-Iron Acoustic Glass", "Volcanic Basalt"],
    materials: ["Honed Jura Limestone", "Blackened Marine Steel", "Low-Iron Acoustic Glass", "Volcanic Basalt"],
    acousticRating: "STC 64 storm-rated envelope",
    solarGainIndex: "SHGC 0.28 dynamic electrochromic",
    solarOrientation: "242° WSW ·SHGC 0.28 Electrochromic",
    blueprintPoints: "M12,72 L188,72 L188,40 L72,40 L72,22 L195,22",
  },
  {
    slug: "dune",
    code: "AE—02",
    title: "DUNE",
    subtitle: "A sculptural desert retreat carved for thermal silence.",
    typology: "Desert",
    location: "Rub' al Khali Escarpment",
    coordinates: "22°15′08″N  50°41′19″E",
    elevation: "+310m ASL",
    areaSqm: 1890,
    cantileverM: 14,
    completionYear: 2026,
    climateZone: "Hyper-Arid Erg",
    heroImage: "/assets/dune-desert.png",
    accentHex: "#D9BE94",
    atmosphereGrade: "from-[#0E1110]/90 via-[#241C14]/65 to-[#0E1110]",
    leadArchitectNote:
      "Aerodynamic champagne-titanium louvers deflect prevailing shamal sand-winds while funneling nocturnal desert air across a subterranean limestone thermal labyrinth.",
    narrative:
      "Compacted local silica and rammed earth walls 900mm thick delay daytime solar transmission by twelve hours, releasing gentle radiant warmth as the desert sky drops toward freezing.",
    structuralSystem: "Monolithic rammed-earth thermal mass with anodized titanium wind-vanes",
    materialsUsed: ["Compacted Desert Silica", "Anodized Champagne Titanium", "Rammed Travertine", "Black Slate Water Basin"],
    materials: ["Compacted Desert Silica", "Anodized Champagne Titanium", "Rammed Travertine", "Black Slate Water Basin"],
    acousticRating: "18 dBA interior noise floor",
    solarGainIndex: "Passive 12-hour thermal lag",
    solarOrientation: "168° SSE · Passive 12-Hour Thermal Lag",
    blueprintPoints: "M10,76 Q95,18 190,62 L190,76 Z",
  },
  {
    slug: "veil",
    code: "AE—03",
    title: "VEIL",
    subtitle: "A minimalist forest sanctuary suspended above black water.",
    typology: "Forest",
    location: "Yakushima Old-Growth Cedar Basin",
    coordinates: "30°20′37″N  130°30′14″E",
    elevation: "+640m ASL",
    areaSqm: 980,
    cantileverM: 11,
    completionYear: 2025,
    climateZone: "Temperate Montane Rainforest",
    heroImage: "/assets/veil-forest.png",
    accentHex: "#9EA5A1",
    atmosphereGrade: "from-[#0E1110]/90 via-[#131C19]/65 to-[#0E1110]",
    leadArchitectNote:
      "Supported on four micro-piled titanium columns so root networks and hydrological flow underneath the black mirror pond remain completely undisturbed.",
    narrative:
      "Yakisugi charred cedar fascia absorbs forest mist while slender structural mullions frame ancient cryptomeria trunks like a continuous horizontal handscroll.",
    structuralSystem: "Zero-excavation micro-pile titanium colonnade & charred timber roof plane",
    materialsUsed: ["Yakisugi Charred Cedar", "Bead-Blasted Titanium", "Ultra-Clear Low-Iron Glass", "Honed Hinoki Cypress"],
    materials: ["Yakisugi Charred Cedar", "Bead-Blasted Titanium", "Ultra-Clear Low-Iron Glass", "Honed Hinoki Cypress"],
    acousticRating: "Natural hydro-acoustic reflections",
    solarGainIndex: "Diffused canopy luminance 320 lux",
    solarOrientation: "115° ESE · Diffused Canopy 320 Lux",
    blueprintPoints: "M24,34 L176,34 M42,34 L42,76 M158,34 L158,76 M16,76 L184,76",
  },
];

export interface MaterialSwatch {
  id: "limestone" | "obsidian-glass" | "titanium" | "basalt-water";
  code: string;
  name: string;
  origin: string;
  density: string;
  reflectance: number;
  roughness: number;
  hexPrimary: string;
  hexSecondary: string;
  hexSpecular: string;
  finishNote: string;
  architecturalRole: string;
}

export const MATERIALS: MaterialSwatch[] = [
  {
    id: "limestone",
    code: "MAT—01",
    name: "Honed Jura Limestone",
    origin: "Bavarian Solnhofen Quarry · 48.8°N",
    density: "2,610 kg/m³",
    reflectance: 0.34,
    roughness: 0.72,
    hexPrimary: "#E8E1D5",
    hexSecondary: "#B8AEA0",
    hexSpecular: "#F5F0E6",
    finishNote: "Open-pore mineral bush-hammered & diamond-honed to 220 grit for warm grazing shadow.",
    architecturalRole: "Primary thermal shear walls, monolithic cantilevered soffits, and interior hearth plinths.",
  },
  {
    id: "obsidian-glass",
    code: "MAT—02",
    name: "Low-Iron Structural Glass",
    origin: "Saint-Gobain Architectural Kiln · 5.4m Jumbo Span",
    density: "2,500 kg/m³",
    reflectance: 0.88,
    roughness: 0.08,
    hexPrimary: "#1D282C",
    hexSecondary: "#0E1417",
    hexSpecular: "#C4A77C",
    finishNote: "Triple-silver magnetron solar coating with argon-filled acoustic cavity and zero green edge tint.",
    architecturalRole: "Frameless 6.2-meter structural curtain walls engineered for 210 km/h coastal wind loads.",
  },
  {
    id: "titanium",
    code: "MAT—03",
    name: "Brushed Champagne Titanium",
    origin: "Grade-5 Annealed Architectural Plate",
    density: "4,430 kg/m³",
    reflectance: 0.68,
    roughness: 0.28,
    hexPrimary: "#C4A77C",
    hexSecondary: "#857152",
    hexSpecular: "#EFE2CC",
    finishNote: "Directional micro-brushed passivation layer completely impervious to marine salt corrosion.",
    architecturalRole: "Tensioned knife-edge fascia profiles, solar louvers, and concealed seismic reveal joints.",
  },
  {
    id: "basalt-water",
    code: "MAT—04",
    name: "split Volcanic Basalt & Still Water",
    origin: "North Atlantic Columnar Basalt",
    density: "2,920 kg/m³",
    reflectance: 0.92,
    roughness: 0.14,
    hexPrimary: "#141A19",
    hexSecondary: "#090C0B",
    hexSpecular: "#9EA5A1",
    finishNote: "Cleft black basalt submerged beneath a 14mm laminar weir sheet to mirror sky state.",
    architecturalRole: "Perimeter horizon basins that merge architectural datum lines directly into ocean and sky.",
  },
];

export interface InteriorViewpoint {
  id: "cantilever" | "sanctuary" | "hearth" | "oculus";
  code: string;
  label: string;
  elevationLabel: string;
  cameraAzimuth: number;
  cameraPitch: number;
  cameraZoom: number;
  focalLength: string;
  illuminance: string;
  description: string;
}

export const VIEWPOINTS: InteriorViewpoint[] = [
  {
    id: "cantilever",
    code: "VP—01",
    label: "Exterior Cantilever Datum",
    elevationLabel: "EL +74.0m · West Approach",
    cameraAzimuth: -0.45,
    cameraPitch: 0.18,
    cameraZoom: 1.0,
    focalLength: "24mm Tilt-Shift",
    illuminance: "420 lx Twilight",
    description:
      "Full structural profile floating 18 meters clear of the basalt cliff edge, with warm interior travertine planes glowing against North Atlantic mist.",
  },
  {
    id: "sanctuary",
    code: "VP—02",
    label: "Double-Height Living Sanctuary",
    elevationLabel: "EL +74.6m · Primary Salon",
    cameraAzimuth: 0.15,
    cameraPitch: 0.06,
    cameraZoom: 1.38,
    focalLength: "35mm Architectural",
    illuminance: "280 lx Warm Indirect",
    description:
      "Six-meter frameless glass corner retracts into the basalt plinth, uniting the sunken smoked-oak salon with the horizon reflection basin.",
  },
  {
    id: "hearth",
    code: "VP—03",
    label: "Monolithic Limestone Hearth",
    elevationLabel: "EL +74.2m · Thermal Core",
    cameraAzimuth: 0.62,
    cameraPitch: 0.12,
    cameraZoom: 1.52,
    focalLength: "50mm Normal",
    illuminance: "190 lx Amber Grazing",
    description:
      "A 9-meter monolithic block of Bavarian Jura limestone anchors the residence, housing a linear bio-ethanol flame recessed into cleft basalt.",
  },
  {
    id: "oculus",
    code: "VP—04",
    label: "Zenithal Sky Gallery",
    elevationLabel: "EL +78.4m · Upper Mezzanine",
    cameraAzimuth: -0.18,
    cameraPitch: 0.34,
    cameraZoom: 1.24,
    focalLength: "28mm Wide",
    illuminance: "510 lx Zenithal",
    description:
      "Cantilevered mezzanine gallery where an overhead structural glass slot casts a razor-sharp solar dial across honed limestone walls.",
  },
];

export const CHAPTERS = [
  { id: "chapter-01", num: "01", label: "Arrival" },
  { id: "chapter-02", num: "02", label: "The Reveal" },
  { id: "chapter-03", num: "03", label: "Materiality" },
  { id: "chapter-04", num: "04", label: "Collection" },
  { id: "chapter-05", num: "05", label: "Inside Aether" },
  { id: "chapter-06", num: "06", label: "Light Study" },
  { id: "chapter-07", num: "07", label: "The Atelier" },
  { id: "chapter-08", num: "08", label: "Explorer" },
  { id: "chapter-09", num: "09", label: "Commissions" },
  { id: "chapter-10", num: "10", label: "Finale" },
] as const;

export const JOURNAL_ENTRIES = [
  {
    id: "JRN—09",
    date: "SPRING 2025",
    category: "TECTONICS",
    title: "Post-Tensioned Silence: Anchoring 18-Meter Cantilevers in Fractured Basalt",
    readTime: "7 MIN READ",
    excerpt:
      "How marine geotechnical coring and titanium rock anchors eliminate visible bracing along high-velocity oceanic cliffs.",
  },
  {
    id: "JRN—08",
    date: "WINTER 2025",
    category: "MATERIALITY",
    title: "Thermal Lag as Luxury: 900mm Rammed Silica Walls in the Empty Quarter",
    readTime: "6 MIN READ",
    excerpt:
      "Replacing mechanical HVAC loads with twelve-hour phase-delayed monolithic earth geometry and subterranean water cooling.",
  },
  {
    id: "JRN—07",
    date: "AUTUMN 2024",
    category: "LIGHT",
    title: "Grazing Incidence: Designing for Sub-Polar Twilight & 11-Degree Solar Altitudes",
    readTime: "9 MIN READ",
    excerpt:
      "Why northern coastal architecture demands bush-hammered mineral surfaces that catch low-angle horizon light rather than overhead sun.",
  },
];

export interface SceneRenderState {
  scrollProgress: number;
  pointerX: number;
  pointerY: number;
  solarHour: number; // 5 to 22
  activeMaterial: MaterialSwatch;
  activeViewpoint: InteriorViewpoint;
  activeProject: ProjectSpec;
  wireframeRatio: number; // 0 to 1
  timeSec: number;
}

/**
 * Real-time 3D perspective architectural projection & physically-inspired lighting renderer
 * for the persistent AETHER cliffside residence ("THE BUILDING IS THE INTERFACE").
 */
export function drawArchitectureFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: SceneRenderState
) {
  const {
    scrollProgress,
    pointerX,
    pointerY,
    solarHour,
    activeMaterial,
    activeViewpoint,
    wireframeRatio,
    timeSec,
  } = state;

  ctx.clearRect(0, 0, width, height);

  // Compute solar elevation & atmosphere palette from solarHour (5.0 = dawn, 13.0 = zenith, 19.5 = dusk, 22.0 = night)
  const dayNorm = Math.max(0, Math.min(1, (solarHour - 5) / 17));
  const sunAltitude = Math.sin(dayNorm * Math.PI); // 0 at horizon, 1 at noon
  const sunAzimuth = (dayNorm - 0.5) * 2.2;

  // Sky gradient shifts with solarHour
  const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.72);
  if (solarHour < 7.5) {
    skyGrad.addColorStop(0, "#0b1014");
    skyGrad.addColorStop(0.55, "#1b242a");
    skyGrad.addColorStop(1, "#6e553e");
  } else if (solarHour < 16.5) {
    skyGrad.addColorStop(0, "#121b22");
    skyGrad.addColorStop(0.6, "#24323b");
    skyGrad.addColorStop(1, "#8d7c68");
  } else if (solarHour < 20) {
    skyGrad.addColorStop(0, "#090c0e");
    skyGrad.addColorStop(0.55, "#192024");
    skyGrad.addColorStop(1, "#7c5836");
  } else {
    skyGrad.addColorStop(0, "#050708");
    skyGrad.addColorStop(0.6, "#0c1012");
    skyGrad.addColorStop(1, "#182024");
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle solar / lunar orb glow
  const sunScreenX = width * (0.5 + sunAzimuth * 0.28 + pointerX * 0.03);
  const sunScreenY = height * (0.58 - sunAltitude * 0.36 + pointerY * 0.02);
  const sunGlow = ctx.createRadialGradient(
    sunScreenX,
    sunScreenY,
    4,
    sunScreenX,
    sunScreenY,
    Math.max(width, height) * 0.42
  );
  const warmAlpha = 0.14 + (1 - Math.abs(dayNorm - 0.72)) * 0.18;
  sunGlow.addColorStop(0, `rgba(217, 190, 148, ${warmAlpha})`);
  sunGlow.addColorStop(0.45, `rgba(196, 167, 124, ${warmAlpha * 0.35})`);
  sunGlow.addColorStop(1, "rgba(14, 17, 16, 0)");
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, width, height);

  // Horizon & North Atlantic ocean plane
  const horizonY = height * (0.62 - pointerY * 0.025);
  const oceanGrad = ctx.createLinearGradient(0, horizonY, 0, height);
  oceanGrad.addColorStop(0, "#0d1316");
  oceanGrad.addColorStop(0.5, "#090d0e");
  oceanGrad.addColorStop(1, "#050707");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, horizonY, width, height - horizonY);

  // Dynamic ocean wave specular lines
  ctx.save();
  ctx.strokeStyle = `rgba(196, 167, 124, ${0.08 + sunAltitude * 0.08})`;
  ctx.lineWidth = 1;
  for (let i = 0; i < 14; i++) {
    const ratio = i / 14;
    const y = horizonY + Math.pow(ratio, 1.55) * (height - horizonY);
    const waveDrift = Math.sin(timeSec * 0.9 + i * 1.3) * 18;
    ctx.beginPath();
    ctx.moveTo(width * 0.08 + waveDrift, y);
    ctx.lineTo(width * 0.65 - waveDrift * 0.6, y);
    ctx.stroke();
  }
  ctx.restore();

  // 3D Camera parameters driven by scroll + viewpoint + pointer
  const camAzimuth =
    activeViewpoint.cameraAzimuth +
    pointerX * 0.16 +
    Math.sin(scrollProgress * Math.PI) * 0.28;
  const camPitch =
    activeViewpoint.cameraPitch + pointerY * 0.08 - scrollProgress * 0.06;
  const zoom =
    activeViewpoint.cameraZoom * (1 + Math.sin(scrollProgress * Math.PI * 0.85) * 0.22);

  const fov = Math.min(width, height) * 0.72 * zoom;
  const centerX = width * 0.56;
  const centerY = height * 0.52;

  const cosA = Math.cos(camAzimuth);
  const sinA = Math.sin(camAzimuth);
  const cosP = Math.cos(camPitch);
  const sinP = Math.sin(camPitch);

  const project3D = (x: number, y: number, z: number): [number, number, number] => {
    const rx = x * cosA - z * sinA;
    const rz = x * sinA + z * cosA;
    const ry = y * cosP - rz * sinP;
    const depth = y * sinP + rz * cosP + 4.8;
    const scale = fov / Math.max(0.8, depth);
    return [centerX + rx * scale, centerY - ry * scale, depth];
  };

  // Draw volcanic basalt cliff mass (right-hand headland)
  const cliffPoly: [number, number, number][] = [
    [-0.1, -0.35, -0.5],
    [2.6, -0.35, -0.8],
    [2.9, -2.2, 0.9],
    [-0.5, -2.2, 0.6],
    [-0.35, -0.95, -0.2],
  ];
  ctx.save();
  ctx.beginPath();
  cliffPoly.forEach(([x, y, z], idx) => {
    const [sx, sy] = project3D(x, y, z);
    if (idx === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  });
  ctx.closePath();
  ctx.fillStyle = "#101413";
  ctx.fill();
  ctx.strokeStyle = "rgba(158, 165, 161, 0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();

  // Architectural rectangular prisms: [xMin, xMax, yMin, yMax, zMin, zMax, role]
  const volumes: Array<{
    bounds: [number, number, number, number, number, number];
    role: "stone" | "glass" | "roof" | "core";
  }> = [
    // Primary cantilevered horizontal slab (lower datum)
    { bounds: [-1.85, 1.45, -0.35, -0.22, -0.55, 0.55], role: "stone" },
    // Main glazed sanctuary volume
    { bounds: [-1.72, 0.95, -0.22, 0.34, -0.48, 0.48], role: "glass" },
    // Knife-edge titanium roof fascia
    { bounds: [-1.92, 1.55, 0.34, 0.43, -0.6, 0.6], role: "roof" },
    // Monolithic limestone vertical shear core anchored into cliff
    { bounds: [0.35, 1.25, -0.75, 0.78, -0.42, 0.42], role: "core" },
    // Upper mezzanine gallery volume
    { bounds: [-0.85, 1.4, 0.43, 0.86, -0.38, 0.38], role: "glass" },
    // Upper mezzanine roof slab
    { bounds: [-0.95, 1.5, 0.86, 0.93, -0.45, 0.45], role: "roof" },
  ];

  const drawBox = (
    [x0, x1, y0, y1, z0, z1]: [number, number, number, number, number, number],
    role: "stone" | "glass" | "roof" | "core"
  ) => {
    const corners: [number, number, number][] = [
      [x0, y0, z0],
      [x1, y0, z0],
      [x1, y1, z0],
      [x0, y1, z0],
      [x0, y0, z1],
      [x1, y0, z1],
      [x1, y1, z1],
      [x0, y1, z1],
    ];
    const pts = corners.map(([x, y, z]) => project3D(x, y, z));

    const faces = [
      [0, 1, 2, 3], // front
      [4, 5, 6, 7], // back
      [0, 4, 7, 3], // left cantilever tip
      [1, 5, 6, 2], // right
      [3, 2, 6, 7], // top
      [0, 1, 5, 4], // soffit
    ];

    faces.forEach((f, fIdx) => {
      ctx.beginPath();
      f.forEach((cIdx, idx) => {
        const [sx, sy] = pts[cIdx];
        if (idx === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.closePath();

      if (wireframeRatio < 0.88) {
        const fillAlpha = Math.max(0.08, 1 - wireframeRatio * 0.92);
        if (role === "glass") {
          // Warm interior architectural glow increases at twilight/night
          const interiorWarmth = 0.28 + (1 - sunAltitude) * 0.42;
          ctx.fillStyle = `rgba(214, 173, 114, ${interiorWarmth * fillAlpha})`;
        } else if (role === "stone" || role === "core") {
          ctx.fillStyle =
            fIdx === 4
              ? activeMaterial.hexSpecular
              : fIdx === 2
              ? activeMaterial.hexPrimary
              : activeMaterial.hexSecondary;
          ctx.globalAlpha = fillAlpha * (0.72 + sunAltitude * 0.25);
        } else {
          ctx.fillStyle = "#1c2220";
          ctx.globalAlpha = fillAlpha * 0.92;
        }
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Crisp architectural linework & wireframe overlay
      ctx.strokeStyle =
        role === "glass"
          ? "rgba(232, 225, 213, 0.36)"
          : `rgba(196, 167, 124, ${0.32 + wireframeRatio * 0.55})`;
      ctx.lineWidth = role === "roof" ? 1.4 : 0.9;
      ctx.stroke();
    });
  };

  volumes.forEach((v) => drawBox(v.bounds, v.role));

  // Architectural datum dimension lines & telemetry overlay
  const [tipX, tipY] = project3D(-1.85, -0.35, -0.55);
  const [anchorX, anchorY] = project3D(0.35, -0.35, -0.55);
  ctx.save();
  ctx.setLineDash([3, 4]);
  ctx.strokeStyle = "rgba(196, 167, 124, 0.45)";
  ctx.beginPath();
  ctx.moveTo(tipX, tipY + 26);
  ctx.lineTo(anchorX, anchorY + 26);
  ctx.stroke();
  ctx.fillStyle = "rgba(232, 225, 213, 0.68)";
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText("CANTILEVER SPAN 18.0m · TITANIUM POST-TENSIONED", tipX, tipY + 40);
  ctx.restore();
}


