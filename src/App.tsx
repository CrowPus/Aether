import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  Compass,
  Volume2,
  VolumeX,
  ArrowUpRight,
  Sun,
  Layers,
  Eye,
  CheckCircle2,
  X,
  ShieldCheck,
  Sliders,
  Sparkles,
} from "lucide-react";
import { InView } from "@/components/motion/in-view";
import { AnimatedGroup } from "@/components/motion/animated-group";
import { TextEffect } from "@/components/motion/text-effect";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Spotlight } from "@/components/motion/spotlight";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Tilt } from "@/components/motion/tilt";
import {
  PROJECTS,
  MATERIALS,
  VIEWPOINTS,
  CHAPTERS,
  JOURNAL_ENTRIES,
  type ProjectSpec,
  type MaterialSwatch,
  type InteriorViewpoint,
} from "@/lib/utils";

const EASE_EDITORIAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function App() {
  const reduceMotion = useReducedMotion();

  const [entryDismissed, setEntryDismissed] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectSpec>(PROJECTS[0]);
  const [modalProject, setModalProject] = useState<ProjectSpec | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<MaterialSwatch>(MATERIALS[0]);
  const [activeViewpoint, setActiveViewpoint] = useState<InteriorViewpoint>(VIEWPOINTS[0]);
  const [solarHour, setSolarHour] = useState<number>(18.4);
  const [wireframeRatio, setWireframeRatio] = useState<number>(0.12);
  const [typologyFilter, setTypologyFilter] = useState<"All" | "Coastal" | "Desert" | "Forest">("All");
  const [activeChapter, setActiveChapter] = useState<string>("01");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [legalOpen, setLegalOpen] = useState<boolean>(false);

  // Commission Inquiry Form State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientLandscape, setClientLandscape] = useState<"Coastal" | "Desert" | "Forest" | "Alpine">("Coastal");
  const [clientHorizon, setClientHorizon] = useState("2026–2027 Private Commission");
  const [clientNotes, setClientNotes] = useState("");
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; notes?: string }>({});
  const [commissionSubmitted, setCommissionSubmitted] = useState(false);

  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Editorial continuity grammar variants with reduced-motion branch
  const sectionVariants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      };

  const sectionTransition = {
    duration: reduceMotion ? 0 : 0.68,
    ease: EASE_EDITORIAL,
  };

  const groupVariants = {
    container: {
      hidden: { opacity: reduceMotion ? 1 : 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.08,
          delayChildren: reduceMotion ? 0 : 0.06,
        },
      },
    },
    item: reduceMotion
      ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
      : {
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.56, ease: EASE_EDITORIAL },
          },
        },
  };

  // Auto-release atmospheric entry veil after 950ms so content is never blocked
  useEffect(() => {
    const timer = window.setTimeout(() => setEntryDismissed(true), 950);
    return () => window.clearTimeout(timer);
  }, []);

  // Scroll & Chapter telemetry listener
  useEffect(() => {
    const onScroll = () => {
      const docHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.max(0, Math.min(1, window.scrollY / docHeight));
      scrollRef.current = progress;

      const idx = Math.min(
        CHAPTERS.length - 1,
        Math.max(0, Math.floor(progress * CHAPTERS.length))
      );
      setActiveChapter(CHAPTERS[idx].num);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Procedural Web Audio ambient acoustic drone (muted by default, user-initiated)
  const toggleAmbientSound = () => {
    if (soundEnabled) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.25);
      }
      setSoundEnabled(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        const ctx = new AudioCtx();
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.value = 55; // A1 sub-bass architectural resonance
        osc2.type = "triangle";
        osc2.frequency.value = 82.41; // E2 fifth harmonic

        filter.type = "lowpass";
        filter.frequency.value = 180;

        gain.gain.value = 0.025;

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        audioCtxRef.current = ctx;
        gainNodeRef.current = gain;
      } else {
        audioCtxRef.current.resume();
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.setTargetAtTime(0.025, audioCtxRef.current.currentTime, 0.3);
        }
      }
      setSoundEnabled(true);
    } catch {
      setSoundEnabled(false);
    }
  };

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string; notes?: string } = {};
    if (!clientName.trim()) {
      errors.name = "Please provide your name or family office designation.";
    }
    if (!clientEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) {
      errors.email = "Please provide a valid private correspondence email.";
    }
    if (clientNotes.trim().length < 12) {
      errors.notes = "Please share brief site topography, region, or spatial objectives (min 12 chars).";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setCommissionSubmitted(true);
    }
  };

  const filteredProjects =
    typologyFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.typology === typologyFilter);

  const formatSolarClock = (hourVal: number) => {
    const hrs = Math.floor(hourVal);
    const mins = Math.round((hourVal - hrs) * 60);
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")} UTC`;
  };

  return (
    <div
      className="relative min-h-screen bg-[#0E1110] text-[#E8E1D5] selection:bg-[#C4A77C]/30 selection:text-[#E8E1D5]"
      onMouseMove={(e) => {
        pointerRef.current = {
          x: (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2,
          y: (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2,
        };
      }}
    >
      {/* Top Architectural Reading Progress Bar */}
      <ScrollProgress className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-[#C4A77C]" />

      {/* Skip Link for Keyboard Accessibility */}
      <a
        href="#chapter-01"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#C4A77C] focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:text-[#0E1110]"
      >
        Skip to primary architectural experience
      </a>

      {/* CHAPTER 00 — Non-blocking Atmospheric Entry Telemetry Veil */}
      {!entryDismissed && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0E1110]/95 px-6 py-12 backdrop-blur-md transition-opacity duration-500"
        >
          <div className="font-mono-tech text-[11px] tracking-[0.28em] text-[#9EA5A1] uppercase">
            AETHER ATELIER · GEOSPATIAL DATUM INITIALIZED
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="font-display text-4xl font-light tracking-[0.32em] text-[#E8E1D5] sm:text-5xl">
              AETHER
            </span>
            <p className="font-mono-tech text-xs tracking-[0.24em] text-[#C4A77C] uppercase">
              Entering Aether — 63°24′12″N
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEntryDismissed(true)}
            className="border border-[#E8E1D5]/20 px-5 py-2.5 font-mono-tech text-[11px] tracking-[0.22em] text-[#E8E1D5] uppercase transition-colors hover:border-[#C4A77C] hover:text-[#C4A77C]"
          >
            Enter Immediately
          </button>
        </div>
      )}

      {/* Persistent Ambient Looping Architectural Video Backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {reduceMotion ? (
          <img
            src="/media/hero.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none h-full w-full object-cover opacity-80"
          />
        ) : (
          <video
            src="/media/hero.mp4"
            poster="/media/hero.webp"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="pointer-events-none h-full w-full object-cover opacity-80"
          />
        )}
        <div className="aether-grid-bg pointer-events-none absolute inset-0 opacity-35" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0E1110]/60 via-[#0E1110]/35 to-[#0E1110]/90" />
      </div>

      {/* Persistent Architectural Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-[#E8E1D5]/10 bg-[#0E1110]/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
          <a
            href="#chapter-01"
            translate="no"
            className="flex items-center gap-3 text-left group"
          >
            <span className="font-display text-xl font-normal tracking-[0.28em] text-[#E8E1D5]">
              AETHER
            </span>
            <span className="hidden font-mono-tech text-[10px] tracking-[0.2em] text-[#9EA5A1] uppercase sm:inline-block">
              / Architecture Beyond Earth
            </span>
          </a>

          <nav aria-label="Primary Architectural Chapters" className="hidden items-center gap-7 lg:flex">
            {[
              { href: "#chapter-02", label: "Reveal" },
              { href: "#chapter-03", label: "Materiality" },
              { href: "#chapter-04", label: "Residences" },
              { href: "#chapter-05", label: "Interior" },
              { href: "#chapter-06", label: "Light Study" },
              { href: "#chapter-07", label: "Atelier" },
              { href: "#chapter-08", label: "Explorer" },
              { href: "#chapter-09", label: "Commissions" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-1 font-mono-tech text-[11px] tracking-[0.2em] text-[#9EA5A1] uppercase transition-colors hover:text-[#E8E1D5]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 border border-[#E8E1D5]/12 bg-[#141917]/80 px-3 py-1.5 font-mono-tech text-[11px] tracking-[0.18em] text-[#C4A77C] sm:flex">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              <span>CH · {activeChapter}</span>
            </div>

            <button
              type="button"
              onClick={toggleAmbientSound}
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? "Mute ambient architectural sound" : "Enable ambient architectural sound"}
              className="flex min-h-[38px] items-center gap-2 border border-[#E8E1D5]/15 bg-[#141917]/85 px-3.5 py-1.5 font-mono-tech text-[11px] tracking-[0.18em] text-[#E8E1D5] uppercase transition-colors hover:border-[#C4A77C] hover:text-[#C4A77C]"
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5 text-[#C4A77C]" aria-hidden="true" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 text-[#9EA5A1]" aria-hidden="true" />
              )}
              <span>Sound: {soundEnabled ? "On" : "Off"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* CHAPTER 01 — HERO / ARRIVAL */}
        <section
          id="chapter-01"
          className="relative flex min-h-screen items-end pt-28 pb-16 lg:pb-24"
        >
          <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
            <InView variants={sectionVariants} transition={sectionTransition} once>
              <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="mb-6 flex flex-wrap items-center gap-4 font-mono-tech text-xs tracking-[0.22em] text-[#C4A77C] uppercase">
                    <span>01 / ARRIVAL</span>
                    <span className="h-px w-8 bg-[#C4A77C]/50" aria-hidden="true" />
                    <span>63°24′12″N · NORTH ATLANTIC BASALT HEADLAND</span>
                  </div>

                  <TextEffect
                    as="h1"
                    per="word"
                    preset="fade-in-blur"
                    className="font-display text-5xl leading-[0.96] font-light tracking-[-0.02em] text-[#E8E1D5] sm:text-7xl lg:text-[5.4rem]"
                  >
                    AETHER — Architecture Beyond Earth
                  </TextEffect>

                  <p className="mt-6 max-w-2xl text-lg leading-relaxed font-light text-[#E8E1D5]/85 sm:text-xl">
                    Private residences sculpted from light, stone, and silence. Monolithic sanctuaries
                    engineered for extreme coastal cliffs, hyper-arid dunes, and ancient forest basins.
                  </p>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <a
                      href="#chapter-02"
                      className="inline-flex min-h-[48px] items-center gap-3 bg-[#E8E1D5] px-7 py-3.5 font-mono-tech text-xs font-medium tracking-[0.22em] text-[#0E1110] uppercase transition-colors hover:bg-[#C4A77C]"
                    >
                      <span>Explore the Residence</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a
                      href="#chapter-04"
                      className="inline-flex min-h-[48px] items-center gap-3 border border-[#E8E1D5]/25 bg-[#0E1110]/60 px-7 py-3.5 font-mono-tech text-xs tracking-[0.22em] text-[#E8E1D5] uppercase backdrop-blur-sm transition-colors hover:border-[#C4A77C] hover:text-[#C4A77C]"
                    >
                      <span>Enter Experience</span>
                    </a>
                  </div>
                </div>

                {/* Hero Architectural Dossier Card */}
                <div className="lg:col-span-4">
                  <div className="relative overflow-hidden border border-[#E8E1D5]/15 bg-[#141917]/85 p-6 backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-[#E8E1D5]/10 pb-3 font-mono-tech text-[11px] tracking-[0.2em] text-[#9EA5A1] uppercase">
                      <span>FLAGSHIP STUDY · {selectedProject.code}</span>
                      <span className="text-[#C4A77C]">{selectedProject.elevation}</span>
                    </div>
                    <div className="mt-4 overflow-hidden border border-[#E8E1D5]/10">
                      <img
                        src={selectedProject.heroImage}
                        alt={`${selectedProject.title} — ${selectedProject.subtitle}`}
                        width={640}
                        height={420}
                        className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <h2 className="font-display text-2xl font-normal tracking-wide text-[#E8E1D5]">
                        {selectedProject.title}
                      </h2>
                      <span className="font-mono-tech text-xs text-[#C4A77C]">
                        {selectedProject.coordinates}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#9EA5A1]">
                      {selectedProject.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </InView>
          </div>
        </section>

        {/* CHAPTER 02 — ARCHITECTURAL REVEAL */}
        <section
          id="chapter-02"
          className="scroll-mt-20 border-t border-[#E8E1D5]/10 bg-[#0E1110]/80 py-28 backdrop-blur-sm lg:py-36"
        >
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <InView variants={sectionVariants} transition={sectionTransition} once>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="font-mono-tech text-xs tracking-[0.24em] text-[#C4A77C] uppercase">
                    02 / THE ARCHITECTURAL REVEAL
                  </p>
                  <h2 className="mt-4 font-display text-4xl leading-[1.05] font-light text-[#E8E1D5] sm:text-5xl">
                    Built where land ends and atmosphere begins.
                  </h2>
                  <p className="mt-6 text-base leading-relaxed text-[#9EA5A1]">
                    Every structure is shaped by topography, solar geometry, wind vector, and silence.
                    Rather than clearing terrain, AETHER cores deep into parent bedrock so living spaces
                    project effortlessly into open horizon.
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <AnimatedGroup
                    variants={groupVariants}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-3"
                  >
                    <div className="border border-[#E8E1D5]/12 bg-[#141917]/90 p-6">
                      <span className="font-mono-tech text-[11px] tracking-[0.2em] text-[#9EA5A1] uppercase">
                        CANTILEVER PROJECTION
                      </span>
                      <div className="mt-4 flex items-baseline gap-1 font-display text-5xl font-light text-[#E8E1D5]">
                        <AnimatedNumber
                          value={selectedProject.cantileverM}
                          springOptions={{ stiffness: 90, damping: 24 }}
                        />
                        <span className="font-mono-tech text-lg text-[#C4A77C]">m</span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-[#9EA5A1]">
                        Unbraced structural projection anchored via post-tensioned titanium rock tendons.
                      </p>
                    </div>

                    <div className="border border-[#E8E1D5]/12 bg-[#141917]/90 p-6">
                      <span className="font-mono-tech text-[11px] tracking-[0.2em] text-[#9EA5A1] uppercase">
                        CONDITIONED DATUM AREA
                      </span>
                      <div className="mt-4 flex items-baseline gap-1 font-display text-5xl font-light text-[#E8E1D5]">
                        <AnimatedNumber
                          value={selectedProject.areaSqm}
                          springOptions={{ stiffness: 90, damping: 24 }}
                        />
                        <span className="font-mono-tech text-lg text-[#C4A77C]">m²</span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-[#9EA5A1]">
                        Continuous honed limestone floor plates with zero internal structural columns.
                      </p>
                    </div>

                    <div className="border border-[#E8E1D5]/12 bg-[#141917]/90 p-6">
                      <span className="font-mono-tech text-[11px] tracking-[0.2em] text-[#9EA5A1] uppercase">
                        ACOUSTIC ISOLATION
                      </span>
                      <div className="mt-4 flex items-baseline gap-1 font-display text-5xl font-light text-[#E8E1D5]">
                        <AnimatedNumber
                          value={64}
                          springOptions={{ stiffness: 90, damping: 24 }}
                        />
                        <span className="font-mono-tech text-lg text-[#C4A77C]">STC</span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-[#9EA5A1]">
                        Triple-laminated low-iron glazing engineered to hold an 18 dBA interior noise floor.
                      </p>
                    </div>
                  </AnimatedGroup>
                </div>
              </div>
            </InView>
          </div>
        </section>

        {/* CHAPTER 03 — MATERIALITY & LIGHT */}
        <section
          id="chapter-03"
          className="scroll-mt-20 border-t border-[#E8E1D5]/10 bg-[#0E1110]/85 py-28 lg:py-36"
        >
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <InView variants={sectionVariants} transition={sectionTransition} once>
              <div className="flex flex-col justify-between gap-6 border-b border-[#E8E1D5]/10 pb-10 lg:flex-row lg:items-end">
                <div>
                  <p className="font-mono-tech text-xs tracking-[0.24em] text-[#C4A77C] uppercase">
                    03 / TACTILE MATERIALITY & LIGHT
                  </p>
                  <h2 className="mt-3 font-display text-4xl font-light text-[#E8E1D5] sm:text-5xl">
                    Raw mineral honesty under grazing sky light.
                  </h2>
                </div>
                <p className="max-w-md font-mono-tech text-xs leading-relaxed text-[#9EA5A1]">
                  Select any architectural material sample below to update the live 3D structural shader,
                  specular reflectance, and quarry telemetry.
                </p>
              </div>
            </InView>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <AnimatedGroup
                  variants={groupVariants}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  {MATERIALS.map((mat) => {
                    const isSelected = activeMaterial.id === mat.id;
                    return (
                      <button
                        key={mat.id}
                        type="button"
                        onClick={() => setActiveMaterial(mat)}
                        aria-pressed={isSelected}
                        className={`group relative overflow-hidden border p-6 text-left transition-colors ${
                          isSelected
                            ? "border-[#C4A77C] bg-[#181F1D]"
                            : "border-[#E8E1D5]/12 bg-[#141917]/80 hover:border-[#E8E1D5]/35"
                        }`}
                      >
                        <Spotlight className="bg-[#C4A77C]/15 blur-2xl" size={180} />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between font-mono-tech text-[11px] tracking-[0.2em] text-[#9EA5A1]">
                            <span>{mat.code}</span>
                            <span>ρ {Math.round(mat.reflectance * 100)}% REFLECTANCE</span>
                          </div>
                          <div className="mt-5 flex items-center gap-4">
                            <span
                              className="h-11 w-11 shrink-0 rounded-full border border-[#E8E1D5]/25 shadow-inner"
                              style={{
                                background: `radial-gradient(circle at 30% 30%, ${mat.hexSpecular}, ${mat.hexPrimary} 60%, ${mat.hexSecondary})`,
                              }}
                            />
                            <div>
                              <h3 className="font-display text-2xl font-normal text-[#E8E1D5]">
                                {mat.name}
                              </h3>
                              <p className="font-mono-tech text-[11px] text-[#C4A77C]">{mat.origin}</p>
                            </div>
                          </div>
                          <p className="mt-4 text-xs leading-relaxed text-[#9EA5A1]">
                            {mat.finishNote}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </AnimatedGroup>
              </div>

              <div className="lg:col-span-5">
                <InView variants={sectionVariants} transition={sectionTransition} once>
                  <div className="relative h-full border border-[#E8E1D5]/15 bg-[#141917]/95 p-8">
                    <div className="flex items-center justify-between border-b border-[#E8E1D5]/10 pb-4">
                      <span className="font-mono-tech text-xs tracking-[0.2em] text-[#C4A77C] uppercase">
                        ACTIVE SPECIMEN · {activeMaterial.code}
                      </span>
                      <Layers className="h-4 w-4 text-[#C4A77C]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 font-display text-3xl font-light text-[#E8E1D5]">
                      {activeMaterial.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#E8E1D5]/80">
                      {activeMaterial.architecturalRole}
                    </p>
                    <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-[#E8E1D5]/10 pt-6 font-mono-tech text-xs">
                      <div>
                        <dt className="text-[#9EA5A1]">BULK DENSITY</dt>
                        <dd className="mt-1 text-base text-[#E8E1D5]">{activeMaterial.density}</dd>
                      </div>
                      <div>
                        <dt className="text-[#9EA5A1]">MICRO-ROUGHNESS</dt>
                        <dd className="mt-1 text-base text-[#E8E1D5]">Ra {activeMaterial.roughness}</dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-[#9EA5A1]">QUARRY / PROVENANCE</dt>
                        <dd className="mt-1 text-[#C4A77C]">{activeMaterial.origin}</dd>
                      </div>
                    </dl>
                  </div>
                </InView>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 04 — SIGNATURE RESIDENCES COLLECTION */}
        <section
          id="chapter-04"
          className="scroll-mt-20 border-t border-[#E8E1D5]/10 bg-[#0E1110]/90 py-28 lg:py-36"
        >
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <InView variants={sectionVariants} transition={sectionTransition} once>
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                  <p className="font-mono-tech text-xs tracking-[0.24em] text-[#C4A77C] uppercase">
                    04 / SIGNATURE RESIDENCES COLLECTION
                  </p>
                  <h2 className="mt-3 font-display text-4xl font-light text-[#E8E1D5] sm:text-5xl">
                    Three Extreme Geographies. One Tectonic Language.
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-[#9EA5A1]">
                  Each AETHER commission is site-specific and unrepeatable—engineered from geotechnical
                  core samples and twelve-month micro-climate telemetry.
                </p>
              </div>
            </InView>

            <AnimatedGroup
              variants={groupVariants}
              className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3"
            >
              {PROJECTS.map((project) => (
                <Tilt
                  key={project.slug}
                  rotationFactor={4}
                  className="group relative flex flex-col justify-between border border-[#E8E1D5]/15 bg-[#141917]/90 transition-colors hover:border-[#C4A77C]"
                >
                  <div>
                    <div className="relative overflow-hidden border-b border-[#E8E1D5]/10">
                      <img
                        src={project.heroImage}
                        alt={`${project.title} — ${project.subtitle}`}
                        width={640}
                        height={480}
                        loading="lazy"
                        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-[#0E1110]/85 px-3 py-1 font-mono-tech text-[10px] tracking-[0.2em] text-[#C4A77C] uppercase backdrop-blur-sm">
                        {project.code} · {project.typology}
                      </div>
                    </div>

                    <div className="p-7">
                      <div className="font-mono-tech text-[11px] tracking-[0.16em] text-[#9EA5A1]">
                        {project.location} · {project.coordinates}
                      </div>
                      <h3 className="mt-2 font-display text-3xl font-light tracking-wide text-[#E8E1D5]">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#E8E1D5]/85">
                        {project.subtitle}
                      </p>
                      <p className="mt-4 text-xs leading-relaxed text-[#9EA5A1]">
                        {project.leadArchitectNote}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E8E1D5]/10 px-7 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="font-mono-tech text-[11px] tracking-[0.2em] text-[#9EA5A1] uppercase transition-colors hover:text-[#E8E1D5]"
                    >
                      Load in 3D Stage
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalProject(project)}
                      className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] tracking-[0.2em] text-[#C4A77C] uppercase hover:underline"
                    >
                      <span>Inspect Dossier</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </Tilt>
              ))}
            </AnimatedGroup>
          </div>
        </section>

        {/* CHAPTER 05 — INSIDE AETHER (INTERACTIVE INTERIOR VIEWPOINTS) */}
        <section
          id="chapter-05"
          className="scroll-mt-20 border-t border-[#E8E1D5]/10 bg-[#0E1110]/85 py-28 lg:py-36"
        >
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <InView variants={sectionVariants} transition={sectionTransition} once>
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <p className="font-mono-tech text-xs tracking-[0.24em] text-[#C4A77C] uppercase">
                    05 / INSIDE AETHER · SPATIAL CHOREOGRAPHY
                  </p>
                  <h2 className="mt-3 font-display text-4xl font-light text-[#E8E1D5] sm:text-5xl">
                    Interior sanctuaries calibrated to horizon and acoustic stillness.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[#9EA5A1]">
                    Select an architectural camera station to re-orient the 3D spatial projection and
                    inspect interior luminance and acoustic enclosure parameters.
                  </p>

                  <div className="mt-8 space-y-3" role="radiogroup" aria-label="Interior Camera Viewpoints">
                    {VIEWPOINTS.map((vp) => {
                      const active = activeViewpoint.id === vp.id;
                      return (
                        <button
                          key={vp.id}
                          type="button"
                          onClick={() => setActiveViewpoint(vp)}
                          aria-pressed={active}
                          className={`w-full border p-4 text-left transition-colors ${
                            active
                              ? "border-[#C4A77C] bg-[#181F1D]"
                              : "border-[#E8E1D5]/12 bg-[#141917]/75 hover:border-[#E8E1D5]/30"
                          }`}
                        >
                          <div className="flex items-center justify-between font-mono-tech text-[11px] tracking-[0.18em]">
                            <span className="text-[#C4A77C]">{vp.code} · {vp.elevationLabel}</span>
                            <span className="text-[#9EA5A1]">{vp.focalLength} · {vp.illuminance}</span>
                          </div>
                          <div className="mt-1.5 flex items-center justify-between">
                            <span className="font-display text-2xl text-[#E8E1D5]">{vp.label}</span>
                            <Eye className="h-4 w-4 text-[#C4A77C]" aria-hidden="true" />
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-[#9EA5A1]">
                            {vp.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="overflow-hidden border border-[#E8E1D5]/15 bg-[#141917]">
                    <img
                      src="/assets/interior-sanctuary.png"
                      alt="Interior sanctuary of SOLACE residence with double-height honed limestone walls, recessed linear hearth, and twilight Atlantic horizon view"
                      width={760}
                      height={580}
                      loading="lazy"
                      className="h-[420px] w-full object-cover"
                    />
                    <div className="border-t border-[#E8E1D5]/10 p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-xs text-[#C4A77C]">
                        <span>ACTIVE STATION: {activeViewpoint.label.toUpperCase()}</span>
                        <span>{activeViewpoint.illuminance}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#9EA5A1]">
                        {activeViewpoint.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </InView>
          </div>
        </section>

        {/* CHAPTER 06 — INTERACTIVE LIGHT STUDY (SUNRISE TO NIGHT) */}
        <section
          id="chapter-06"
          className="scroll-mt-20 border-t border-[#E8E1D5]/10 bg-[#0E1110]/90 py-28 lg:py-36"
        >
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <InView variants={sectionVariants} transition={sectionTransition} once>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="font-mono-tech text-xs tracking-[0.24em] text-[#C4A77C] uppercase">
                    06 / HELIODON LIGHT STUDY
                  </p>
                  <h2 className="mt-3 font-display text-4xl font-light text-[#E8E1D5] sm:text-5xl">
                    Light is our primary structural material.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[#9EA5A1]">
                    Scrub the solar azimuth timeline from dawn twilight to astral night. Notice how
                    the 3D residence’s interior travertine glow, roof soffit shadow, and reflection pool
                    re-balance across the diurnal cycle.
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <div className="border border-[#E8E1D5]/15 bg-[#141917]/95 p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E1D5]/10 pb-5">
                      <div className="flex items-center gap-3">
                        <Sun className="h-5 w-5 text-[#C4A77C]" aria-hidden="true" />
                        <span className="font-mono-tech text-xs tracking-[0.2em] text-[#E8E1D5] uppercase">
                          SOLAR DIURNAL SCRUBBER
                        </span>
                      </div>
                      <span className="font-mono-tech text-sm text-[#C4A77C]">
                        {formatSolarClock(solarHour)}
                      </span>
                    </div>

                    <div className="mt-8">
                      <label
                        htmlFor="solar-hour-slider"
                        className="flex justify-between font-mono-tech text-[11px] tracking-[0.18em] text-[#9EA5A1] uppercase"
                      >
                        <span>05:00 DAWN</span>
                        <span>13:00 ZENITH</span>
                        <span>18:30 DUSK</span>
                        <span>22:00 NIGHT</span>
                      </label>
                      <input
                        id="solar-hour-slider"
                        name="solar-hour-slider"
                        type="range"
                        min={5}
                        max={22}
                        step={0.1}
                        value={solarHour}
                        onChange={(e) => setSolarHour(parseFloat(e.target.value))}
                        className="mt-4 h-2 w-full cursor-pointer appearance-none bg-[#E8E1D5]/15 accent-[#C4A77C]"
                      />
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { label: "05:45 Sub-Polar Dawn", hour: 5.75 },
                        { label: "13:15 High Meridian", hour: 13.25 },
                        { label: "18:25 Golden Grazing", hour: 18.4 },
                        { label: "21:30 Astral Nocturne", hour: 21.5 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setSolarHour(preset.hour)}
                          className={`border px-3 py-2.5 font-mono-tech text-[11px] tracking-[0.14em] transition-colors ${
                            Math.abs(solarHour - preset.hour) < 0.4
                              ? "border-[#C4A77C] bg-[#C4A77C]/15 text-[#E8E1D5]"
                              : "border-[#E8E1D5]/12 text-[#9EA5A1] hover:border-[#E8E1D5]/30 hover:text-[#E8E1D5]"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </InView>
          </div>
        </section>

        {/* CHAPTER 07 — THE ATELIER & ARCHITECTURAL PROCESS */}
        <section
          id="chapter-07"
          className="scroll-mt-20 border-t border-[#E8E1D5]/10 bg-[#0E1110]/85 py-28 lg:py-36"
        >
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <InView variants={sectionVariants} transition={sectionTransition} once>
              <div className="max-w-3xl">
                <p className="font-mono-tech text-xs tracking-[0.24em] text-[#C4A77C] uppercase">
                  07 / THE ATELIER & METHODOLOGY
                </p>
                <h2 className="mt-3 font-display text-4xl leading-[1.06] font-light text-[#E8E1D5] sm:text-6xl">
                  “We do not build on land. We build with it.”
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#9EA5A1]">
                  Founded across Zurich, Reykjavik, and Kyoto, AETHER accepts at most three private
                  residential commissions per annum. Every project is executed as an integrated structural,
                  environmental, and acoustic monograph.
                </p>
              </div>
            </InView>

            <AnimatedGroup
              variants={groupVariants}
              className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                {
                  step: "PHASE 01",
                  title: "Geological Coring & Lidar",
                  body: "Drone photogrammetry and 40m diamond bedrock coring establish the true load-bearing stratum before a single line is drawn.",
                },
                {
                  step: "PHASE 02",
                  title: "Heliodon & Aero Simulation",
                  body: "Computational fluid dynamics and annual solar incidence models shape roof cantilevers to deflect storm gusts and trap winter sun.",
                },
                {
                  step: "PHASE 03",
                  title: "Quarry Monolith Milling",
                  body: "Stone blocks and titanium node castings are CNC-milled at the quarry and dry-fitted prior to marine or helicopter transport.",
                },
                {
                  step: "PHASE 04",
                  title: "Zero-Scar Site Assembly",
                  body: "Foundations are post-tensioned directly into bedrock without temporary haul roads, leaving surrounding flora untouched.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="border border-[#E8E1D5]/12 bg-[#141917]/85 p-6"
                >
                  <span className="font-mono-tech text-[11px] tracking-[0.22em] text-[#C4A77C]">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-light text-[#E8E1D5]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#9EA5A1]">{item.body}</p>
                </div>
              ))}
            </AnimatedGroup>

            {/* Atelier Journal Dispatches */}
            <div className="mt-20 border-t border-[#E8E1D5]/10 pt-14">
              <div className="font-mono-tech text-xs tracking-[0.22em] text-[#9EA5A1] uppercase">
                RESEARCH MONOGRAPHS & ATELIER JOURNAL
              </div>
              <AnimatedGroup
                variants={groupVariants}
                className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3"
              >
                {JOURNAL_ENTRIES.map((entry) => (
                  <article
                    key={entry.id}
                    className="border border-[#E8E1D5]/12 bg-[#141917]/70 p-6 transition-colors hover:border-[#E8E1D5]/30"
                  >
                    <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] text-[#C4A77C]">
                      <span>{entry.id} · {entry.category}</span>
                      <span className="text-[#9EA5A1]">{entry.date}</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-light text-[#E8E1D5]">
                      {entry.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-[#9EA5A1]">{entry.excerpt}</p>
                    <div className="mt-5 font-mono-tech text-[10px] tracking-[0.2em] text-[#E8E1D5]/70">
                      {entry.readTime}
                    </div>
                  </article>
                ))}
              </AnimatedGroup>
            </div>
          </div>
        </section>

        {/* CHAPTER 08 — INTERACTIVE PROJECT EXPLORER */}
        <section
          id="chapter-08"
          className="scroll-mt-20 border-t border-[#E8E1D5]/10 bg-[#0E1110]/90 py-28 lg:py-36"
        >
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <InView variants={sectionVariants} transition={sectionTransition} once>
              <div className="flex flex-col justify-between gap-6 border-b border-[#E8E1D5]/10 pb-8 lg:flex-row lg:items-end">
                <div>
                  <p className="font-mono-tech text-xs tracking-[0.24em] text-[#C4A77C] uppercase">
                    08 / ARCHIVAL PROJECT INDEX & TECHNICAL MATRIX
                  </p>
                  <h2 className="mt-3 font-display text-4xl font-light text-[#E8E1D5] sm:text-5xl">
                    Interactive Project Explorer
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by landscape typology">
                  {(["All", "Coastal", "Desert", "Forest"] as const).map((typ) => (
                    <button
                      key={typ}
                      type="button"
                      onClick={() => setTypologyFilter(typ)}
                      aria-pressed={typologyFilter === typ}
                      className={`px-4 py-2 font-mono-tech text-xs tracking-[0.18em] uppercase transition-colors ${
                        typologyFilter === typ
                          ? "bg-[#E8E1D5] text-[#0E1110]"
                          : "border border-[#E8E1D5]/15 bg-[#141917] text-[#9EA5A1] hover:text-[#E8E1D5]"
                      }`}
                    >
                      {typ}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#E8E1D5]/15 font-mono-tech text-[11px] tracking-[0.2em] text-[#9EA5A1] uppercase">
                      <th className="py-4 pr-4">Archive ID</th>
                      <th className="py-4 px-4">Residence</th>
                      <th className="py-4 px-4">Typology</th>
                      <th className="py-4 px-4">Coordinates</th>
                      <th className="py-4 px-4">Area</th>
                      <th className="py-4 px-4">Cantilever</th>
                      <th className="py-4 pl-4 text-right">Dossier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E1D5]/10 text-sm">
                    {filteredProjects.map((proj) => (
                      <tr
                        key={proj.slug}
                        className="transition-colors hover:bg-[#141917]/90"
                      >
                        <td className="py-5 pr-4 font-mono-tech text-xs text-[#C4A77C]">
                          {proj.code}
                        </td>
                        <td className="py-5 px-4 font-display text-2xl text-[#E8E1D5]">
                          {proj.title}
                        </td>
                        <td className="py-5 px-4 font-mono-tech text-xs text-[#9EA5A1]">
                          {proj.typology}
                        </td>
                        <td className="py-5 px-4 font-mono-tech text-xs text-[#9EA5A1]">
                          {proj.coordinates}
                        </td>
                        <td className="py-5 px-4 font-mono-tech text-xs text-[#E8E1D5] tabular-nums">
                          {proj.areaSqm.toLocaleString()} m²
                        </td>
                        <td className="py-5 px-4 font-mono-tech text-xs text-[#E8E1D5] tabular-nums">
                          {proj.cantileverM} m
                        </td>
                        <td className="py-5 pl-4 text-right">
                          <button
                            type="button"
                            onClick={() => setModalProject(proj)}
                            className="border border-[#E8E1D5]/20 px-3.5 py-1.5 font-mono-tech text-[11px] tracking-[0.18em] text-[#E8E1D5] uppercase transition-colors hover:border-[#C4A77C] hover:text-[#C4A77C]"
                          >
                            Open Plan
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </InView>
          </div>
        </section>

        {/* CHAPTER 09 — PRIVATE COMMISSIONS INQUIRY (No animation on form controls per motion-system rule) */}
        <section
          id="chapter-09"
          className="scroll-mt-20 border-t border-[#E8E1D5]/10 bg-[#0E1110]/95 py-28 lg:py-36"
        >
          <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-mono-tech text-xs tracking-[0.24em] text-[#C4A77C] uppercase">
                  09 / PRIVATE COMMISSIONS & SITE FEASIBILITY
                </p>
                <h2 className="mt-3 font-display text-4xl font-light text-[#E8E1D5] sm:text-5xl">
                  Initiate a Private Architectural Dialogue.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#9EA5A1]">
                  Direct inquiries from private principals, land custodians, and family offices are
                  reviewed by our senior partners in Zurich and Reykjavik under strict non-disclosure.
                </p>
                <div className="mt-8 space-y-3 border-t border-[#E8E1D5]/10 pt-6 font-mono-tech text-xs text-[#9EA5A1]">
                  <div className="flex items-center gap-2 text-[#E8E1D5]">
                    <ShieldCheck className="h-4 w-4 text-[#C4A77C]" aria-hidden="true" />
                    <span>ENCRYPTED PRINCIPAL BRIEF · NDA PROTECTED</span>
                  </div>
                  <p>ZURICH · TALSTRASSE 82 · +41 44 580 29 10</p>
                  <p>REYKJAVIK · FISKISLÓÐ 31 · +354 551 9400</p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="border border-[#E8E1D5]/15 bg-[#141917] p-8 sm:p-10">
                  {commissionSubmitted ? (
                    <div role="status" aria-live="polite" className="py-8">
                      <div className="flex items-center gap-3 text-[#C4A77C]">
                        <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                        <span className="font-mono-tech text-xs tracking-[0.22em] uppercase">
                          DOSSIER REGISTERED · REF #AE-2026-09
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-3xl font-light text-[#E8E1D5]">
                        Thank you, {clientName}. Your site brief has been logged.
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#9EA5A1]">
                        Our Senior Partner for {clientLandscape} Typologies will transmit an encrypted
                        geotechnical feasibility memorandum to <span className="text-[#E8E1D5]">{clientEmail}</span> within 48 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setCommissionSubmitted(false);
                          setClientName("");
                          setClientEmail("");
                          setClientNotes("");
                        }}
                        className="mt-6 border border-[#E8E1D5]/20 px-5 py-2.5 font-mono-tech text-xs tracking-[0.2em] text-[#E8E1D5] uppercase hover:border-[#C4A77C]"
                      >
                        Register Another Site Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCommissionSubmit} noValidate className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="client-name"
                            className="block font-mono-tech text-xs tracking-[0.18em] text-[#E8E1D5] uppercase"
                          >
                            Principal or Family Office
                          </label>
                          <input
                            id="client-name"
                            name="clientName"
                            type="text"
                            autoComplete="name"
                            placeholder="e.g. Lindqvist Family Office…"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="mt-2 w-full border border-[#E8E1D5]/20 bg-[#0E1110] px-4 py-3 text-base text-[#E8E1D5] placeholder:text-[#9EA5A1]/50 focus:border-[#C4A77C]"
                          />
                          {formErrors.name && (
                            <p role="alert" className="mt-1.5 font-mono-tech text-xs text-[#E07A5F]">
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="client-email"
                            className="block font-mono-tech text-xs tracking-[0.18em] text-[#E8E1D5] uppercase"
                          >
                            Private Correspondence Email
                          </label>
                          <input
                            id="client-email"
                            name="clientEmail"
                            type="email"
                            autoComplete="email"
                            spellCheck={false}
                            placeholder="principal@domain.ch…"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="mt-2 w-full border border-[#E8E1D5]/20 bg-[#0E1110] px-4 py-3 text-base text-[#E8E1D5] placeholder:text-[#9EA5A1]/50 focus:border-[#C4A77C]"
                          />
                          {formErrors.email && (
                            <p role="alert" className="mt-1.5 font-mono-tech text-xs text-[#E07A5F]">
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="client-landscape"
                            className="block font-mono-tech text-xs tracking-[0.18em] text-[#E8E1D5] uppercase"
                          >
                            Target Landscape Typology
                          </label>
                          <select
                            id="client-landscape"
                            name="clientLandscape"
                            value={clientLandscape}
                            onChange={(e) =>
                              setClientLandscape(
                                e.target.value as "Coastal" | "Desert" | "Forest" | "Alpine"
                              )
                            }
                            className="mt-2 w-full border border-[#E8E1D5]/20 bg-[#0E1110] px-4 py-3 text-base text-[#E8E1D5]"
                          >
                            <option value="Coastal">Coastal Headland / Basalt Cliff</option>
                            <option value="Desert">Arid Escarpment / Dune Field</option>
                            <option value="Forest">Boreal / Ancient Forest Basin</option>
                            <option value="Alpine">High-Altitude Glacial Ridge</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="client-horizon"
                            className="block font-mono-tech text-xs tracking-[0.18em] text-[#E8E1D5] uppercase"
                          >
                            Commission Horizon
                          </label>
                          <select
                            id="client-horizon"
                            name="clientHorizon"
                            value={clientHorizon}
                            onChange={(e) => setClientHorizon(e.target.value)}
                            className="mt-2 w-full border border-[#E8E1D5]/20 bg-[#0E1110] px-4 py-3 text-base text-[#E8E1D5]"
                          >
                            <option value="2026–2027 Private Commission">2026–2027 Private Commission</option>
                            <option value="2027–2028 Site Acquisition Study">2027–2028 Site Acquisition Study</option>
                            <option value="Multi-Generational Estate Masterplan">Multi-Generational Estate Masterplan</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="client-notes"
                          className="block font-mono-tech text-xs tracking-[0.18em] text-[#E8E1D5] uppercase"
                        >
                          Site Coordinates, Topography & Spatial Brief
                        </label>
                        <textarea
                          id="client-notes"
                          name="clientNotes"
                          rows={3}
                          placeholder="Describe site coordinates, access conditions, and desired residential program…"
                          value={clientNotes}
                          onChange={(e) => setClientNotes(e.target.value)}
                          className="mt-2 w-full border border-[#E8E1D5]/20 bg-[#0E1110] px-4 py-3 text-base text-[#E8E1D5] placeholder:text-[#9EA5A1]/50 focus:border-[#C4A77C]"
                        />
                        {formErrors.notes && (
                          <p role="alert" className="mt-1.5 font-mono-tech text-xs text-[#E07A5F]">
                            {formErrors.notes}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="inline-flex min-h-[48px] items-center gap-3 bg-[#E8E1D5] px-8 py-3.5 font-mono-tech text-xs font-medium tracking-[0.22em] text-[#0E1110] uppercase transition-colors hover:bg-[#C4A77C]"
                      >
                        <span>Transmit Encrypted Brief</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 10 — ARCHITECTURAL FINALE & WIREFRAME DISSOLUTION */}
        <section
          id="chapter-10"
          className="scroll-mt-20 border-t border-[#E8E1D5]/10 bg-[#0E1110]/75 py-28 lg:py-40"
        >
          <div className="mx-auto max-w-[1440px] px-6 text-center lg:px-12">
            <InView variants={sectionVariants} transition={sectionTransition} once>
              <p className="font-mono-tech text-xs tracking-[0.28em] text-[#C4A77C] uppercase">
                10 / ARCHITECTURAL FINALE · ELEVATION DISSOLUTION
              </p>
              <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl leading-[1.04] font-light text-[#E8E1D5] sm:text-6xl lg:text-7xl">
                Architecture is where earth meets infinity.
              </h2>

              <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 border border-[#E8E1D5]/15 bg-[#141917]/90 p-5">
                <div className="flex w-full items-center justify-between font-mono-tech text-[11px] tracking-[0.18em] text-[#9EA5A1] uppercase">
                  <span className="flex items-center gap-2">
                    <Sliders className="h-3.5 w-3.5 text-[#C4A77C]" aria-hidden="true" />
                    <span>3D Structural Wireframe Overlay</span>
                  </span>
                  <span className="text-[#C4A77C]">{Math.round(wireframeRatio * 100)}%</span>
                </div>
                <input
                  id="wireframe-slider"
                  name="wireframe-slider"
                  aria-label="3D Structural Wireframe Overlay Percentage"
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={wireframeRatio}
                  onChange={(e) => setWireframeRatio(parseFloat(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none bg-[#E8E1D5]/15 accent-[#C4A77C]"
                />
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="#chapter-09"
                  className="inline-flex min-h-[48px] items-center gap-3 bg-[#E8E1D5] px-8 py-3.5 font-mono-tech text-xs font-medium tracking-[0.22em] text-[#0E1110] uppercase transition-colors hover:bg-[#C4A77C]"
                >
                  <span>Begin a Private Conversation</span>
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </InView>
          </div>
        </section>
      </main>

      {/* Footer — Plumbing (un-animated per motion-system rule) */}
      <footer className="relative z-10 border-t border-[#E8E1D5]/10 bg-[#0E1110] py-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center lg:px-12">
          <div>
            <span translate="no" className="font-display text-lg tracking-[0.28em] text-[#E8E1D5]">
              AETHER
            </span>
            <p className="mt-1 font-mono-tech text-[11px] tracking-[0.16em] text-[#9EA5A1]">
              © {new Date().getFullYear()} AETHER ARCHITECTURAL ATELIER AG · ZURICH / REYKJAVIK / KYOTO
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 font-mono-tech text-xs tracking-[0.18em] text-[#9EA5A1] uppercase">
            <button
              type="button"
              onClick={() => setLegalOpen(true)}
              className="hover:text-[#E8E1D5]"
            >
              Privacy & Architectural Credits
            </button>
            <a href="#chapter-01" className="hover:text-[#C4A77C]">
              Return to Zenith ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Project Dossier Inspection Modal */}
      {modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E1110]/90 p-4 backdrop-blur-md sm:p-8"
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-[#E8E1D5]/20 bg-[#141917] p-6 sm:p-10">
            <div className="flex items-center justify-between border-b border-[#E8E1D5]/10 pb-4">
              <span className="font-mono-tech text-xs tracking-[0.22em] text-[#C4A77C] uppercase">
                ARCHITECTURAL MONOGRAPH · {modalProject.code}
              </span>
              <button
                type="button"
                onClick={() => setModalProject(null)}
                aria-label="Close project dossier"
                className="border border-[#E8E1D5]/20 p-2 text-[#E8E1D5] hover:border-[#C4A77C]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <img
                src={modalProject.heroImage}
                alt={modalProject.title}
                width={600}
                height={420}
                className="h-60 w-full border border-[#E8E1D5]/10 object-cover"
              />
              <div>
                <h2 id="dossier-modal-title" className="font-display text-4xl font-light text-[#E8E1D5]">
                  {modalProject.title}
                </h2>
                <p className="mt-1 font-mono-tech text-xs text-[#C4A77C]">
                  {modalProject.location} · {modalProject.coordinates}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#E8E1D5]/85">
                  {modalProject.leadArchitectNote}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[#E8E1D5]/10 pt-4 font-mono-tech text-xs">
                  <div>
                    <dt className="text-[#9EA5A1]">SOLAR ORIENTATION</dt>
                    <dd className="mt-1 text-[#E8E1D5]">{modalProject.solarOrientation}</dd>
                  </div>
                  <div>
                    <dt className="text-[#9EA5A1]">ACOUSTIC FLOOR</dt>
                    <dd className="mt-1 text-[#E8E1D5]">{modalProject.acousticRating}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-6 border-t border-[#E8E1D5]/10 pt-5">
              <h3 className="font-mono-tech text-xs tracking-[0.2em] text-[#9EA5A1] uppercase">
                STRUCTURAL SYSTEMS & MATERIAL SPECIMENS
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#E8E1D5]/80">
                {modalProject.structuralSystem}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {modalProject.materials.map((m) => (
                  <span
                    key={m}
                    className="border border-[#E8E1D5]/15 bg-[#0E1110] px-3 py-1 font-mono-tech text-[11px] text-[#C4A77C]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal / Credits Modal */}
      {legalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E1110]/90 p-4 backdrop-blur-md"
        >
          <div className="max-w-xl border border-[#E8E1D5]/20 bg-[#141917] p-8">
            <div className="flex items-center justify-between border-b border-[#E8E1D5]/10 pb-4">
              <h2 id="legal-modal-title" className="font-mono-tech text-xs tracking-[0.22em] text-[#C4A77C] uppercase">
                PRIVACY, DISCRETION & PRODUCTION NOTES
              </h2>
              <button
                type="button"
                onClick={() => setLegalOpen(false)}
                aria-label="Close legal notice"
                className="border border-[#E8E1D5]/20 p-1.5 text-[#E8E1D5]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[#9EA5A1]">
              AETHER is a flagship conceptual architectural atelier experience. All client inquiries
              are processed with strict confidentiality. Architectural visualizations (`SOLACE`,
              `DUNE`, `VEIL`, and interior sanctuary studies) are original AI-generated architectural
              artworks paired with a real-time procedural 3D perspective architectural projection canvas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

