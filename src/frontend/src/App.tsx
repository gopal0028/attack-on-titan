import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Layout from "./components/Layout";
import SystemBreach from "./components/SystemBreach";
import { useKonamiCode, useTitanMode } from "./hooks/useKonamiCode";
import { useStore } from "./store/useStore";
import type { NavSection } from "./types";

const IntroSequence = lazy(() => import("./pages/IntroSequence"));
const HeroSection = lazy(() => import("./pages/HeroSection"));
const CharactersSection = lazy(() => import("./pages/CharactersSection"));
const TitansSection = lazy(() => import("./pages/TitansSection"));
const WorldMapSection = lazy(() => import("./pages/WorldMapSection"));
const TimelineSection = lazy(() => import("./pages/TimelineSection"));
const TerminalSection = lazy(() => import("./pages/TerminalSection"));
const GallerySection = lazy(() => import("./pages/GallerySection"));
const QuotesSection = lazy(() => import("./pages/QuotesSection"));

// ── Section list for story mode auto-scroll ──────────────────────────────────
const SECTION_ORDER: NavSection[] = [
  "home",
  "quotes",
  "characters",
  "titans",
  "world",
  "timeline",
  "terminal",
  "gallery",
];

const SECTION_TITLES: Record<NavSection, string> = {
  home: "Year 850 — The Walls Still Stand",
  quotes: "The Words of Those Who Fought",
  characters: "Soldiers of the Survey Corps",
  titans: "Classified Titan Intelligence",
  world: "Map of the Known World",
  timeline: "History of the Paradis Conflict",
  terminal: "Survey Corps Terminal",
  gallery: "Intelligence Archive Gallery",
};

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex gap-1">
        {(["a", "b", "c"] as const).map((k) => (
          <span
            key={k}
            className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
            style={{
              animationDelay: k === "a" ? "0s" : k === "b" ? "0.2s" : "0.4s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Konami overlay ────────────────────────────────────────────────────────────
interface KonamiOverlayProps {
  onDismiss: () => void;
}

function KonamiOverlay({ onDismiss }: KonamiOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
      style={{
        background: "oklch(0.05 0.04 15 / 0.97)",
        animation: "screen-shake 0.5s ease-in-out 3",
      }}
      data-ocid="konami.overlay"
    >
      {/* Red flashes */}
      <div
        className="absolute inset-0 pointer-events-none"
        role="presentation"
        style={{
          background: "oklch(0.40 0.28 22 / 0.25)",
          animation: "red-flash 0.4s ease-in-out infinite",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        role="presentation"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 4px,
            oklch(0 0 0 / 0.15) 4px, oklch(0 0 0 / 0.15) 5px
          )`,
        }}
      />

      <div className="relative z-10 text-center px-4">
        <div
          className="terminal-text mb-4"
          style={{
            color: "oklch(0.65 0.28 22)",
            fontSize: "0.7rem",
            letterSpacing: "0.5em",
            animation: "glitch-flicker 0.3s infinite",
          }}
        >
          ⚠ CLASSIFIED ⚠
        </div>
        <h2
          className="cinematic-title"
          style={{
            fontSize: "clamp(2rem, 8vw, 5rem)",
            color: "oklch(0.75 0.3 22)",
            textShadow:
              "0 0 40px oklch(0.5 0.3 22), 0 0 80px oklch(0.35 0.22 22 / 0.6)",
            animation: "glitch-text-heavy 0.4s infinite",
            lineHeight: 1.1,
          }}
          data-ocid="konami.title"
        >
          TITAN MODE
          <br />
          ACTIVATED
        </h2>
        <p
          className="terminal-text mt-6"
          style={{
            color: "oklch(0.6 0.15 22)",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
          }}
        >
          THE RUMBLING HAS BEGUN
        </p>
        <p
          className="terminal-text mt-2"
          style={{
            color: "oklch(0.4 0.1 22)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
          }}
        >
          Revert in 30s
        </p>
        <button
          type="button"
          onClick={onDismiss}
          className="mt-8 px-6 py-2 border border-primary/60 terminal-text text-xs tracking-widest text-primary hover:bg-primary/20 transition-all duration-200"
          data-ocid="konami.dismiss_button"
        >
          ACKNOWLEDGE
        </button>
      </div>

      <style>{`
        @keyframes screen-shake {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-4px, 2px) rotate(-0.5deg); }
          40% { transform: translate(4px, -2px) rotate(0.5deg); }
          60% { transform: translate(-2px, 4px); }
          80% { transform: translate(2px, -4px); }
        }
        @keyframes red-flash {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes glitch-flicker {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }
        @keyframes glitch-text-heavy {
          0%, 92%, 100% { transform: translate(0); filter: none; }
          93% { transform: translate(-3px, 2px); filter: hue-rotate(90deg); }
          95% { transform: translate(3px, -2px); filter: brightness(1.5); }
          97% { transform: translate(-2px, 0); filter: none; }
        }
        body.titan-mode {
          --background: 0.09 0.04 15 !important;
          --card: 0.13 0.06 15 !important;
          --primary: 0.50 0.30 22 !important;
          --foreground: 0.98 0 0 !important;
        }
      `}</style>
    </div>
  );
}

// ── Story Mode subtitle overlay ──────────────────────────────────────────────
interface StoryOverlayProps {
  currentSection: NavSection;
}

function StoryModeOverlay({ currentSection }: StoryOverlayProps) {
  const [visible, setVisible] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState("");

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayedTitle(SECTION_TITLES[currentSection] ?? "");
      setVisible(true);
    }, 300);
    return () => clearTimeout(t);
  }, [currentSection]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] pointer-events-none transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      data-ocid="story_mode.subtitle_overlay"
      aria-live="polite"
    >
      <div
        className="px-8 py-3 text-center"
        style={{
          background: "oklch(0.04 0 0 / 0.80)",
          backdropFilter: "blur(8px)",
          border: "1px solid oklch(0.26 0.22 25 / 0.3)",
        }}
      >
        <p
          className="terminal-text text-foreground text-sm tracking-widest"
          style={{ maxWidth: "420px" }}
        >
          {displayedTitle}
        </p>
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const { introComplete, storyModeEnabled, currentSection, setCurrentSection } =
    useStore();

  const [breachVisible, setBreachVisible] = useState(false);
  const storyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Titan / Konami
  const {
    konamiVisible,
    activate: activateTitanMode,
    dismissOverlay: dismissKonami,
  } = useTitanMode();
  useKonamiCode(activateTitanMode);

  // Expose breach trigger via custom event (for TerminalSection)
  useEffect(() => {
    const handler = () => setBreachVisible(true);
    window.addEventListener("aot:breach", handler);
    return () => window.removeEventListener("aot:breach", handler);
  }, []);

  // Intersection observer — track current section
  useEffect(() => {
    if (!introComplete) return;
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) setCurrentSection(id as NavSection);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, [introComplete, setCurrentSection]);

  // Lock/unlock scroll during intro
  useEffect(() => {
    document.documentElement.style.overflow = introComplete ? "" : "hidden";
    document.body.style.overflow = introComplete ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [introComplete]);

  // Apply dark class
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Story mode: auto-scroll through sections
  const storyScrollSection = useCallback((sectionId: NavSection) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!storyModeEnabled || !introComplete) {
      if (storyTimerRef.current) clearTimeout(storyTimerRef.current);
      return;
    }

    const currentIdx = SECTION_ORDER.indexOf(currentSection);
    const nextIdx = (currentIdx + 1) % SECTION_ORDER.length;

    storyTimerRef.current = setTimeout(() => {
      storyScrollSection(SECTION_ORDER[nextIdx]);
    }, 8000);

    return () => {
      if (storyTimerRef.current) clearTimeout(storyTimerRef.current);
    };
  }, [storyModeEnabled, introComplete, currentSection, storyScrollSection]);

  return (
    <>
      {/* Intro sequence */}
      {!introComplete && (
        <Suspense fallback={null}>
          <IntroSequence />
        </Suspense>
      )}

      {/* Konami code overlay */}
      {konamiVisible && <KonamiOverlay onDismiss={dismissKonami} />}

      {/* System breach overlay */}
      {breachVisible && (
        <SystemBreach onComplete={() => setBreachVisible(false)} />
      )}

      {/* Main content */}
      <div
        className={`transition-opacity duration-1000 ${introComplete ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!introComplete}
      >
        <Layout>
          {/* Story mode subtitle */}
          {storyModeEnabled && introComplete && (
            <StoryModeOverlay currentSection={currentSection} />
          )}

          <Suspense fallback={<SectionLoader />}>
            <HeroSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <QuotesSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <CharactersSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <TitansSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <WorldMapSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <TimelineSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <TerminalSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <GallerySection />
          </Suspense>
        </Layout>
      </div>
    </>
  );
}
