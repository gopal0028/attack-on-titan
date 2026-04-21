import { useEffect, useRef, useState } from "react";
import { useStore } from "../store/useStore";

const STATS_TICKER = [
  "104th Cadet Corps — Year 850",
  "Survey Corps: 30% Survival Rate",
  "Titan Threat Level: CRITICAL",
  "Wall Maria: FALLEN",
  "Wall Rose: SECURED",
  "Wall Sina: OPERATIONAL",
  "Colossal Titan — Last Seen: Trost",
  "Active Titan Shifters: CLASSIFIED",
];

export default function HeroSection() {
  const { storyModeEnabled } = useStore();
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 600);
    const t2 = setTimeout(() => setShowCTA(true), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Stats ticker cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIndex((i) => (i + 1) % STATS_TICKER.length);
        setTickerVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    document
      .getElementById(`section-${id}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="section-home"
      data-section="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      {/* Cinematic background layers */}
      <div
        className="absolute inset-0 z-0"
        data-parallax="0.3"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, oklch(0.18 0.10 15 / 0.9) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 60%, oklch(0.12 0.06 22 / 0.5) 0%, transparent 45%),
            radial-gradient(ellipse at 20% 80%, oklch(0.12 0.06 25 / 0.6) 0%, transparent 50%),
            linear-gradient(to bottom, oklch(0.04 0 0) 0%, oklch(0.08 0.02 15) 50%, oklch(0.04 0 0) 100%)
          `,
          willChange: "transform",
        }}
        role="presentation"
      />

      {/* Atmospheric dust / light rays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        role="presentation"
        style={{
          background: `
            linear-gradient(135deg, oklch(0.30 0.12 22 / 0.06) 0%, transparent 50%),
            linear-gradient(225deg, oklch(0.30 0.12 22 / 0.04) 0%, transparent 50%)
          `,
          animation: "drift-light 8s ease-in-out infinite alternate",
        }}
      />

      {/* Wall silhouette layer */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1]"
        data-parallax="0.15"
        style={{ willChange: "transform" }}
        role="presentation"
      >
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="xMidYMax slice"
          className="w-full"
          role="img"
          aria-label="Wall silhouette"
        >
          <title>Walls of Paradis silhouette</title>
          <defs>
            <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.06 0.01 15)" />
              <stop offset="100%" stopColor="oklch(0.04 0 0)" />
            </linearGradient>
            <linearGradient id="wallTopGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.20 0.06 20 / 0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {/* Wall main body */}
          <rect x="0" y="170" width="1440" height="150" fill="url(#wallGrad)" />
          {/* Wall glow top edge */}
          <rect
            x="0"
            y="160"
            width="1440"
            height="20"
            fill="url(#wallTopGrad)"
          />
          {/* Battlements row 1 */}
          {Array.from({ length: 72 }, (_, i) => (
            <rect
              key={`b1-x${i * 20 + 2}`}
              x={i * 20 + 2}
              y="148"
              width="14"
              height="26"
              fill="oklch(0.06 0.01 15)"
              rx="1"
            />
          ))}
          {/* Battlements row 2 (behind) */}
          {Array.from({ length: 36 }, (_, i) => (
            <rect
              key={`b2-x${i * 40 + 10}`}
              x={i * 40 + 10}
              y="135"
              width="22"
              height="18"
              fill="oklch(0.05 0 0)"
              rx="1"
            />
          ))}
          {/* Distant wall */}
          <rect
            x="0"
            y="100"
            width="1440"
            height="50"
            fill="oklch(0.04 0 0 / 0.6)"
          />
          {Array.from({ length: 36 }, (_, i) => (
            <rect
              key={`b3-x${i * 40}`}
              x={i * 40}
              y="88"
              width="26"
              height="18"
              fill="oklch(0.04 0 0 / 0.5)"
            />
          ))}
          {/* Wall texture lines */}
          {[185, 205, 225, 245, 270, 295].map((y) => (
            <line
              key={`line-${y}`}
              x1="0"
              y1={y}
              x2="1440"
              y2={y}
              stroke="oklch(0.09 0.01 15)"
              strokeWidth="1"
            />
          ))}
          {/* Soldier silhouettes on battlements */}
          {[100, 300, 550, 800, 1050, 1250].map((x) => (
            <g key={`soldier-${x}`} transform={`translate(${x}, 148)`}>
              <rect
                x="1"
                y="-16"
                width="3"
                height="14"
                fill="oklch(0.08 0 0)"
                rx="1"
              />
              <circle cx="2.5" cy="-18" r="3" fill="oklch(0.08 0 0)" />
            </g>
          ))}
        </svg>
      </div>

      {/* Survey Corps Wings watermark */}
      <div
        className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none"
        role="presentation"
      >
        <svg
          viewBox="0 0 100 80"
          fill="oklch(0.26 0.22 25 / 0.04)"
          className="w-[60vw] max-w-[600px]"
          role="img"
          aria-label="Survey Corps Wings watermark"
          style={{ animation: "slow-pulse 6s ease-in-out infinite" }}
        >
          <title>Survey Corps Wings of Freedom</title>
          <g>
            <path d="M48 40 C30 30, 8 20, 5 15 C8 22, 15 35, 20 45 C12 40, 5 38, 2 42 C8 44, 18 48, 25 55 C15 52, 5 55, 3 60 C10 60, 22 60, 30 62 L48 40Z" />
            <path d="M52 40 C70 30, 92 20, 95 15 C92 22, 85 35, 80 45 C88 40, 95 38, 98 42 C92 44, 82 48, 75 55 C85 52, 95 55, 97 60 C90 60, 78 60, 70 62 L52 40Z" />
            <ellipse cx="50" cy="42" rx="5" ry="8" />
            <path d="M46 50 L50 65 L54 50Z" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-[2] text-center px-4 sm:px-8 max-w-5xl mx-auto pt-24 pb-52">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-primary/40 bg-primary/10 rounded-sm"
          style={{ animation: "slide-up 0.6s ease-out forwards" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="terminal-text text-primary text-xs tracking-[0.3em]">
            PROPERTY OF THE ELDIAN MILITARY — RESTRICTED ACCESS
          </span>
        </div>

        {/* Main title */}
        <h1
          className="cinematic-title text-5xl sm:text-7xl lg:text-[6rem] xl:text-[7rem] leading-none mb-4 text-foreground"
          style={{
            textShadow:
              "0 0 60px oklch(0.26 0.22 25 / 0.4), 0 0 120px oklch(0.26 0.22 25 / 0.2)",
            animation: "slam-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both",
          }}
          data-ocid="hero.title"
        >
          ATTACK
          <br />
          ON TITAN
        </h1>

        {/* Subtitle */}
        <div
          className={`transition-all duration-700 ${showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p
            className="cinematic-title text-lg sm:text-2xl lg:text-3xl text-foreground/80 tracking-[0.25em] mb-3"
            style={{
              textShadow: "0 0 30px oklch(0.26 0.22 25 / 0.25)",
            }}
          >
            THE LAST STAND OF HUMANITY
          </p>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="terminal-text text-primary text-xs tracking-widest">
              ✦ CLASSIFIED DOSSIER ✦
            </span>
            <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-primary/60" />
          </div>

          {/* Stats ticker */}
          <div
            className="inline-flex items-center gap-3 px-5 py-2 mt-2 border border-border/60 bg-card/40 backdrop-blur-sm rounded-sm"
            style={{ minWidth: "300px" }}
          >
            <span
              className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0"
              style={{ boxShadow: "0 0 6px oklch(0.26 0.22 25)" }}
            />
            <span
              className={`terminal-text text-xs tracking-widest transition-all duration-300 ${
                tickerVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
              style={{ color: "oklch(0.75 0.12 22)" }}
              data-ocid="hero.stats_ticker"
            >
              {STATS_TICKER[tickerIndex]}
            </span>
          </div>
        </div>

        {/* Story mode subtitle */}
        {storyModeEnabled && (
          <p className="terminal-text text-muted-foreground text-sm mt-6 italic animate-fade-in">
            "In this world, every heartbeat is borrowed time."
          </p>
        )}

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 transition-all duration-700 ${showCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          data-ocid="hero.cta_group"
        >
          <button
            type="button"
            onClick={() => scrollToSection("characters")}
            className="group flex items-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground cinematic-title text-sm tracking-widest hover:bg-primary/90 transition-all duration-200 glow-red"
            data-ocid="hero.enter_walls_cta"
            data-interactive
          >
            <span>ENTER THE WALLS</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("timeline")}
            className="flex items-center gap-3 px-8 py-3.5 border border-accent/60 text-accent cinematic-title text-sm tracking-widest hover:bg-accent/10 transition-all duration-200 glow-gold"
            data-ocid="hero.timeline_cta"
            data-interactive
          >
            VIEW TIMELINE
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex flex-col items-center gap-2"
          style={{ animation: "bounce-slow 2s ease-in-out infinite" }}
        >
          <span className="terminal-text text-muted-foreground/50 text-xs tracking-widest">
            SCROLL TO EXPLORE
          </span>
          <svg
            width="12"
            height="24"
            viewBox="0 0 12 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="4"
              y="1"
              width="4"
              height="8"
              rx="2"
              stroke="oklch(0.5 0 0)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="6" cy="4" r="1.5" fill="oklch(0.5 0 0)">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 3; 0 0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>

      {/* Scanline effect */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        role="presentation"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.025) 2px, oklch(0 0 0 / 0.025) 4px)",
        }}
      />

      <style>{`
        @keyframes slam-in {
          0% { transform: scale(1.15); opacity: 0; filter: blur(6px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes drift-light {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes slow-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.03); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
}
