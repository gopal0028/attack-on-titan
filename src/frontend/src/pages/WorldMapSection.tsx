import { AnimatePresence, motion } from "motion/react";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// ─── Local Types ──────────────────────────────────────────────────────────────

type LocType = "district" | "territory" | "landmark" | "fortress";

interface Loc {
  id: string;
  name: string;
  type: LocType;
  x: number; // SVG coords (0–1000 × 0–620)
  y: number;
  faction: string;
  status: string;
  description: string;
  events: string[];
}

// ─── Map Data ─────────────────────────────────────────────────────────────────

const LOCATIONS: Loc[] = [
  {
    id: "shiganshina",
    name: "Shiganshina District",
    type: "district",
    x: 390,
    y: 458,
    faction: "Paradis",
    status: "Reclaimed",
    description:
      "The southernmost gate district of Wall Maria. Birthplace of Eren Yeager and site of the first Titan breach in Year 845.",
    events: [
      "Fall of Wall Maria (Year 845)",
      "Battle of Shiganshina (Year 850)",
      "Sealing of Wall Maria",
    ],
  },
  {
    id: "trost",
    name: "Trost District",
    type: "district",
    x: 448,
    y: 330,
    faction: "Paradis",
    status: "Secured",
    description:
      "A major district on Wall Rose's southern face. Site of Eren's first transformation and the first major defensive victory against Titans.",
    events: [
      "Battle of Trost District",
      "Eren's Titan Debut",
      "First Vertical Maneuvering Engagement",
    ],
  },
  {
    id: "stohess",
    name: "Stohess District",
    type: "district",
    x: 524,
    y: 222,
    faction: "Paradis",
    status: "Damaged",
    description:
      "An affluent district of Wall Sina. Site of the battle against the Female Titan — Annie Leonhart.",
    events: [
      "Female Titan Battle",
      "Annie Leonhart Captured",
      "Severe Civilian Casualties",
    ],
  },
  {
    id: "ehrmich",
    name: "Ehrmich District",
    type: "district",
    x: 312,
    y: 272,
    faction: "Paradis",
    status: "Evacuated",
    description:
      "A district of Wall Rose. Evacuated during the Wall Rose breach. Temporary refugee camp was established here.",
    events: [
      "Wall Rose Breach Alert",
      "Mass Civilian Evacuation",
      "Titan Sweep Operation",
    ],
  },
  {
    id: "utgard",
    name: "Utgard Castle",
    type: "fortress",
    x: 368,
    y: 388,
    faction: "Neutral",
    status: "Destroyed",
    description:
      "An abandoned fortress between Walls Maria and Rose. Scene of a desperate night battle where cadets faced Titans without vertical maneuvering gear.",
    events: [
      "Night Battle at Utgard",
      "Death of Nanaba & Gelgar",
      "Beast Titan First Appearance",
    ],
  },
  {
    id: "reiss-cave",
    name: "Reiss Cave",
    type: "landmark",
    x: 476,
    y: 228,
    faction: "Royal Government",
    status: "Collapsed",
    description:
      "A hidden underground chapel within Wall Sina. Held the secret of the Founding Titan and the Reiss royal family's true power.",
    events: [
      "Rod Reiss Reveals the Truth",
      "Historia Crowned Queen",
      "Eren Gains Founding Titan Access",
    ],
  },
  {
    id: "fort-salta",
    name: "Fort Salta",
    type: "fortress",
    x: 762,
    y: 148,
    faction: "Marley",
    status: "Captured",
    description:
      "A Marleyan military airbase used for airship operations. Site of the Survey Corps' daring airship raid into Marley.",
    events: [
      "Survey Corps Airship Raid",
      "Thunder Spear Assault",
      "Escape from Marley",
    ],
  },
  {
    id: "liberio",
    name: "Liberio",
    type: "territory",
    x: 792,
    y: 218,
    faction: "Marley",
    status: "Besieged",
    description:
      "An Eldian internment zone inside Marley. Site of the Survey Corps' devastating attack during the Marley arc.",
    events: [
      "Marley Festival Attack",
      "Warhammer Titan Battle",
      "Survey Corps Full Assault",
    ],
  },
  {
    id: "marley-capital",
    name: "Marley (Territory)",
    type: "territory",
    x: 830,
    y: 290,
    faction: "Marley",
    status: "At War",
    description:
      "The dominant nation on the mainland continent. Controls multiple Titan Shifters and has waged war against Eldians for generations.",
    events: [
      "Marleyan Military Campaign",
      "Titan Shifter Program",
      "Declaration of War vs. Paradis",
    ],
  },
  {
    id: "odiha",
    name: "Odiha",
    type: "territory",
    x: 682,
    y: 342,
    faction: "Neutral",
    status: "Mobilized",
    description:
      "A port city on the mainland continent used as a staging ground for the Survey Corps' plan to intercept the Rumbling.",
    events: [
      "Rumbling Intercept Planning",
      "Alliance Mobilization",
      "Last Airship Departure",
    ],
  },
];

const WALLS = [
  {
    id: "wall-maria",
    name: "WALL MARIA",
    cx: 440,
    cy: 330,
    rx: 178,
    ry: 148,
    strokeColor: "#8B1A1A",
    glowColor: "#CC2222",
    labelY: 174,
  },
  {
    id: "wall-rose",
    name: "WALL ROSE",
    cx: 450,
    cy: 296,
    rx: 108,
    ry: 88,
    strokeColor: "#9C7A2E",
    glowColor: "#C9A44E",
    labelY: 204,
  },
  {
    id: "wall-sina",
    name: "WALL SINA",
    cx: 460,
    cy: 266,
    rx: 54,
    ry: 44,
    strokeColor: "#7A8496",
    glowColor: "#A0AABB",
    labelY: 220,
  },
];

// ─── Compass Rose ─────────────────────────────────────────────────────────────

function CompassRose({ x, y }: { x: number; y: number }) {
  return (
    <g
      transform={`translate(${x},${y})`}
      aria-label="Compass rose"
      className="pointer-events-none"
    >
      <circle
        r="28"
        fill="none"
        stroke="#9C7A2E"
        strokeWidth="0.8"
        strokeDasharray="3 2"
        opacity="0.6"
      />
      <circle
        r="20"
        fill="rgba(8,5,2,0.75)"
        stroke="#9C7A2E"
        strokeWidth="0.4"
        opacity="0.5"
      />
      {/* N arm */}
      <polygon points="0,-17 2.5,-5 0,-2 -2.5,-5" fill="#CC2222" />
      {/* S arm */}
      <polygon points="0,17 2.5,5 0,2 -2.5,5" fill="#4a4540" />
      {/* E arm */}
      <polygon points="15,0 5,2.5 2,0 5,-2.5" fill="#4a4540" />
      {/* W arm */}
      <polygon points="-15,0 -5,2.5 -2,0 -5,-2.5" fill="#4a4540" />
      <circle r="2" fill="#CC2222" />
      <text
        x="0"
        y="-23"
        textAnchor="middle"
        fontSize="6.5"
        fill="#CC2222"
        fontFamily="'JetBrains Mono',monospace"
        fontWeight="700"
      >
        N
      </text>
      <text
        x="0"
        y="30"
        textAnchor="middle"
        fontSize="6.5"
        fill="#9C7A2E"
        fontFamily="'JetBrains Mono',monospace"
      >
        S
      </text>
      <text
        x="22"
        y="3"
        textAnchor="middle"
        fontSize="6.5"
        fill="#9C7A2E"
        fontFamily="'JetBrains Mono',monospace"
      >
        E
      </text>
      <text
        x="-21"
        y="3"
        textAnchor="middle"
        fontSize="6.5"
        fill="#9C7A2E"
        fontFamily="'JetBrains Mono',monospace"
      >
        W
      </text>
    </g>
  );
}

// ─── Location Marker ──────────────────────────────────────────────────────────

const TYPE_COLORS: Record<LocType, string> = {
  district: "#CC2222",
  territory: "#7a4f2e",
  landmark: "#6B7280",
  fortress: "#6b3ea0",
};

function LocationMarker({
  loc,
  selected,
  hovered,
  onEnter,
  onLeave,
  onClick,
}: {
  loc: Loc;
  selected: boolean;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const color = TYPE_COLORS[loc.type];
  const active = selected || hovered;

  return (
    <g
      transform={`translate(${loc.x},${loc.y})`}
      tabIndex={0}
      aria-label={`Location: ${loc.name}`}
      style={{ cursor: "pointer" }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {active && (
        <>
          <circle
            r="16"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.25"
          />
          <circle
            r="10"
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            opacity="0.45"
          />
        </>
      )}
      <circle
        r={active ? 6.5 : 4.5}
        fill={color}
        opacity={active ? 1 : 0.72}
        style={{ transition: "r 0.18s ease, opacity 0.18s ease" }}
      />
      <circle r="2" fill="rgba(0,0,0,0.75)" />
      {active && (
        <text
          y="-13"
          textAnchor="middle"
          fontSize="7.5"
          fill="#e8dcc8"
          fontFamily="'JetBrains Mono',monospace"
          fontWeight="600"
          style={{ pointerEvents: "none" }}
        >
          {loc.name}
        </text>
      )}
    </g>
  );
}

// ─── Tooltip Panel ────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<LocType, string> = {
  district: "DISTRICT",
  territory: "TERRITORY",
  landmark: "CLASSIFIED SITE",
  fortress: "MILITARY FORTRESS",
};

const TYPE_TEXT_COLOR: Record<LocType, string> = {
  district: "text-red-500",
  territory: "text-orange-500",
  landmark: "text-slate-400",
  fortress: "text-purple-400",
};

function Tooltip({ loc, onClose }: { loc: Loc; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 6 }}
      transition={{ duration: 0.17 }}
      className="absolute top-3 right-3 z-30 w-72 pointer-events-auto"
      data-ocid="map.tooltip"
    >
      <div className="relative border border-border/60 bg-card/90 backdrop-blur-md rounded-sm overflow-hidden shadow-2xl">
        {/* Top glow bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        {/* Scanline overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.1) 2px,rgba(255,255,255,0.1) 4px)",
          }}
        />
        <div className="p-4 relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <div
                className={`text-[9px] font-mono tracking-widest mb-1 ${TYPE_TEXT_COLOR[loc.type]}`}
              >
                [{TYPE_LABEL[loc.type]}] {"// "}
                {loc.faction.toUpperCase()}
              </div>
              <h3 className="font-display text-base font-semibold text-foreground leading-tight">
                {loc.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close location panel"
              data-ocid="map.close_button"
              className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-0.5 text-xs leading-none w-5 h-5 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Status */}
          <div className="inline-flex items-center gap-1.5 bg-muted/40 border border-border/30 px-2 py-0.5 rounded-sm mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[9px] text-muted-foreground tracking-widest">
              STATUS: {loc.status.toUpperCase()}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            {loc.description}
          </p>

          {/* Key events */}
          <div>
            <div className="font-mono text-[9px] text-muted-foreground tracking-widest mb-1.5">
              {"// KEY EVENTS"}
            </div>
            <ul className="space-y-1">
              {loc.events.map((ev) => (
                <li
                  key={ev}
                  className="flex items-start gap-1.5 text-[10px] font-mono text-foreground/80"
                >
                  <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                  {ev}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom accent */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WorldMapSection() {
  const [selected, setSelected] = useState<Loc | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Pan / zoom
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPt = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const pinchDistRef = useRef<number | null>(null);

  const SVG_W = 1000;
  const SVG_H = 620;
  const MIN_S = 0.55;
  const MAX_S = 3.5;

  const clamp = useCallback((x: number, y: number, s: number) => {
    const el = containerRef.current;
    if (!el) return { x, y };
    const cw = el.clientWidth;
    const ch = el.clientHeight;
    const sw = SVG_W * s;
    const sh = SVG_H * s;
    const mx = Math.max(0, (sw - cw) / 2);
    const my = Math.max(0, (sh - ch) / 2);
    return {
      x: Math.max(-mx, Math.min(mx, x)),
      y: Math.max(-my, Math.min(my, y)),
    };
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const d = e.deltaY > 0 ? 0.88 : 1.14;
      setScale((prev) => {
        const next = Math.max(MIN_S, Math.min(MAX_S, prev * d));
        setPan((p) => clamp(p.x, p.y, next));
        return next;
      });
    },
    [clamp],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    dragging.current = true;
    lastPt.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPt.current.x;
    const dy = e.clientY - lastPt.current.y;
    lastPt.current = { x: e.clientX, y: e.clientY };
    setPan((p) => clamp(p.x + dx, p.y + dy, scale));
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  // Pinch-to-zoom (touch)
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t = e.touches;
        const dist = Math.hypot(
          t[0].clientX - t[1].clientX,
          t[0].clientY - t[1].clientY,
        );
        if (pinchDistRef.current !== null) {
          const ratio = dist / pinchDistRef.current;
          setScale((prev) => {
            const next = Math.max(MIN_S, Math.min(MAX_S, prev * ratio));
            setPan((p) => clamp(p.x, p.y, next));
            return next;
          });
        }
        pinchDistRef.current = dist;
      }
    },
    [clamp],
  );

  const onTouchEnd = useCallback(() => {
    pinchDistRef.current = null;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [onTouchMove, onTouchEnd]);

  const zoomIn = () =>
    setScale((p) => {
      const n = Math.min(MAX_S, p * 1.25);
      setPan((pp) => clamp(pp.x, pp.y, n));
      return n;
    });
  const zoomOut = () =>
    setScale((p) => {
      const n = Math.max(MIN_S, p / 1.25);
      setPan((pp) => clamp(pp.x, pp.y, n));
      return n;
    });
  const reset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <section
      id="map"
      data-section="map"
      data-ocid="map.section"
      className="relative py-20 bg-background overflow-hidden"
      aria-label="Interactive World Map"
    >
      {/* Section edge lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Background vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Header ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="h-px w-10 bg-primary/50" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-primary">
              SURVEY CORPS INTELLIGENCE
            </span>
            <div className="h-px w-10 bg-primary/50" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            OPERATIONAL MAP
          </h2>
          <p className="mt-2 font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
            {"// CLASSIFIED — AUTHORIZED PERSONNEL ONLY"}
          </p>
        </motion.div>

        {/* ── Map wrapper ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="relative border border-border/50 rounded-sm overflow-hidden shadow-2xl"
          style={{ height: "clamp(360px, 54vw, 620px)" }}
        >
          {/* Parchment background */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 44% 54%,#1a1208 0%,#100c06 45%,#070503 100%)",
            }}
          />
          {/* Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#9C7A2E 1px,transparent 1px),linear-gradient(90deg,#9C7A2E 1px,transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          {/* Edge vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%,transparent 52%,rgba(0,0,0,0.78) 100%)",
            }}
          />
          {/* Grain texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.055]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "256px 256px",
            }}
          />

          {/* Draggable canvas */}
          <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden z-20"
            style={{ cursor: dragging.current ? "grabbing" : "grab" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            data-ocid="map.canvas_target"
          >
            <div
              style={{
                transform: `translate(${pan.x}px,${pan.y}px) scale(${scale})`,
                transformOrigin: "center center",
                width: "100%",
                height: "100%",
                willChange: "transform",
                transition: dragging.current
                  ? "none"
                  : "transform 0.07s ease-out",
              }}
            >
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                preserveAspectRatio="xMidYMid meet"
                width="100%"
                height="100%"
                aria-label="Attack on Titan World Map"
                role="img"
              >
                <defs>
                  <radialGradient id="grd-paradis" cx="44%" cy="55%" r="26%">
                    <stop offset="0%" stopColor="#2a1a08" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <radialGradient id="grd-marley" cx="82%" cy="46%" r="22%">
                    <stop offset="0%" stopColor="#1a0a08" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* Territory fills */}
                <rect
                  x="0"
                  y="0"
                  width="1000"
                  height="620"
                  fill="url(#grd-paradis)"
                  opacity="0.55"
                />
                <rect
                  x="0"
                  y="0"
                  width="1000"
                  height="620"
                  fill="url(#grd-marley)"
                  opacity="0.55"
                />

                {/* ── Paradis Island outline ── */}
                <ellipse
                  cx="450"
                  cy="370"
                  rx="238"
                  ry="198"
                  fill="none"
                  stroke="#5a4a2a"
                  strokeWidth="1.5"
                  strokeDasharray="7 4"
                  opacity="0.45"
                />
                <text
                  x="225"
                  y="545"
                  fontSize="10"
                  fill="#6b5a3a"
                  fontFamily="'JetBrains Mono',monospace"
                  opacity="0.65"
                >
                  PARADIS ISLAND
                </text>

                {/* ── Marley continent ── */}
                <path
                  d="M 655 75 Q 718 55 824 86 Q 924 118 964 202 Q 985 282 954 364 Q 922 424 862 442 Q 800 452 758 402 Q 718 362 698 302 Q 678 242 658 202 Q 643 162 655 75 Z"
                  fill="#180704"
                  stroke="#5a3a2a"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                  opacity="0.75"
                />
                <text
                  x="790"
                  y="290"
                  fontSize="11"
                  fill="#7a4a2a"
                  fontFamily="'JetBrains Mono',monospace"
                  opacity="0.85"
                >
                  MARLEY
                </text>

                {/* ── Sea labels ── */}
                <text
                  x="82"
                  y="415"
                  fontSize="9"
                  fill="#1a2a4a"
                  fontFamily="'JetBrains Mono',monospace"
                  opacity="0.55"
                  letterSpacing="3"
                >
                  SEA
                </text>
                <text
                  x="555"
                  y="530"
                  fontSize="9"
                  fill="#1a2a4a"
                  fontFamily="'JetBrains Mono',monospace"
                  opacity="0.5"
                  letterSpacing="3"
                >
                  STRAIT
                </text>
                <text
                  x="608"
                  y="196"
                  fontSize="9"
                  fill="#1a2a4a"
                  fontFamily="'JetBrains Mono',monospace"
                  opacity="0.45"
                  letterSpacing="3"
                >
                  OCEAN
                </text>

                {/* ── Forest of Giant Trees ── */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <g
                    key={`tree-${i + 1}`}
                    transform={`translate(${293 + (i % 3) * 18},${352 + Math.floor(i / 3) * 18})`}
                    opacity="0.55"
                  >
                    <circle
                      r="7"
                      fill="#182e18"
                      stroke="#2a4a2a"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="0"
                      y1="7"
                      x2="0"
                      y2="12"
                      stroke="#3a5a3a"
                      strokeWidth="1"
                    />
                  </g>
                ))}
                <text
                  x="284"
                  y="426"
                  fontSize="7.5"
                  fill="#3a5a3a"
                  fontFamily="'JetBrains Mono',monospace"
                  opacity="0.65"
                >
                  FOREST OF GIANT TREES
                </text>

                {/* ── Walls ── */}
                {WALLS.map((wall) => (
                  <g key={wall.id}>
                    {/* Outer glow */}
                    <ellipse
                      cx={wall.cx}
                      cy={wall.cy}
                      rx={wall.rx + 5}
                      ry={wall.ry + 5}
                      fill="none"
                      stroke={wall.glowColor}
                      strokeWidth="5"
                      opacity="0.07"
                    />
                    {/* Main wall */}
                    <ellipse
                      cx={wall.cx}
                      cy={wall.cy}
                      rx={wall.rx}
                      ry={wall.ry}
                      fill="none"
                      stroke={wall.strokeColor}
                      strokeWidth="2.5"
                      opacity="0.88"
                    />
                    {/* Inner shadow line */}
                    <ellipse
                      cx={wall.cx}
                      cy={wall.cy}
                      rx={wall.rx - 2.5}
                      ry={wall.ry - 2.5}
                      fill="none"
                      stroke={wall.strokeColor}
                      strokeWidth="0.5"
                      opacity="0.28"
                    />
                    {/* Label */}
                    <text
                      x={wall.cx}
                      y={wall.labelY}
                      textAnchor="middle"
                      fontSize="8.5"
                      fill={wall.strokeColor}
                      fontFamily="'JetBrains Mono',monospace"
                      fontWeight="700"
                      letterSpacing="2.5"
                      opacity="0.92"
                    >
                      {wall.name}
                    </text>
                  </g>
                ))}

                {/* ── Location markers ── */}
                {LOCATIONS.map((loc) => (
                  <LocationMarker
                    key={loc.id}
                    loc={loc}
                    selected={selected?.id === loc.id}
                    hovered={hovered === loc.id}
                    onEnter={() => setHovered(loc.id)}
                    onLeave={() => setHovered(null)}
                    onClick={() =>
                      setSelected((s) => (s?.id === loc.id ? null : loc))
                    }
                  />
                ))}

                {/* ── Compass rose ── */}
                <CompassRose x={922} y={548} />

                {/* ── Scale bar ── */}
                <g transform="translate(50,572)" opacity="0.58">
                  <line
                    x1="0"
                    y1="0"
                    x2="80"
                    y2="0"
                    stroke="#9C7A2E"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="-4"
                    x2="0"
                    y2="4"
                    stroke="#9C7A2E"
                    strokeWidth="1"
                  />
                  <line
                    x1="80"
                    y1="-4"
                    x2="80"
                    y2="4"
                    stroke="#9C7A2E"
                    strokeWidth="1"
                  />
                  <line
                    x1="40"
                    y1="-3"
                    x2="40"
                    y2="3"
                    stroke="#9C7A2E"
                    strokeWidth="0.5"
                  />
                  <text
                    x="40"
                    y="-7"
                    textAnchor="middle"
                    fontSize="7"
                    fill="#9C7A2E"
                    fontFamily="'JetBrains Mono',monospace"
                  >
                    ~500 KM
                  </text>
                </g>

                {/* ── Classification stamp ── */}
                <g transform="translate(815,555)" opacity="0.22">
                  <rect
                    x="-30"
                    y="-10"
                    width="90"
                    height="18"
                    fill="none"
                    stroke="#CC2222"
                    strokeWidth="0.8"
                  />
                  <text
                    x="15"
                    y="3"
                    textAnchor="middle"
                    fontSize="7"
                    fill="#CC2222"
                    fontFamily="'JetBrains Mono',monospace"
                    fontWeight="700"
                    letterSpacing="2"
                  >
                    CLASSIFIED
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* ── Tooltip ─────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <AnimatePresence>
              {selected && (
                <Tooltip loc={selected} onClose={() => setSelected(null)} />
              )}
            </AnimatePresence>
          </div>

          {/* ── Zoom controls ───────────────────────────── */}
          <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-1">
            {[
              {
                label: "Zoom in",
                ocid: "map.zoom_in.button",
                content: "+",
                fn: zoomIn,
              },
              {
                label: "Zoom out",
                ocid: "map.zoom_out.button",
                content: "−",
                fn: zoomOut,
              },
              {
                label: "Reset",
                ocid: "map.reset.button",
                content: "⌂",
                fn: reset,
              },
            ].map(({ label, ocid, content, fn }) => (
              <button
                type="button"
                key={ocid}
                onClick={fn}
                aria-label={label}
                data-ocid={ocid}
                className="w-8 h-8 flex items-center justify-center bg-card/80 border border-border/60 text-foreground hover:text-primary hover:border-primary/60 backdrop-blur-sm font-mono text-sm transition-colors rounded-sm"
              >
                {content}
              </button>
            ))}
          </div>

          {/* ── Legend ──────────────────────────────────── */}
          <div className="absolute bottom-4 right-4 z-30 bg-card/75 border border-border/50 backdrop-blur-sm rounded-sm p-3">
            <div className="font-mono text-[8px] tracking-widest text-muted-foreground mb-2">
              {"// LEGEND"}
            </div>
            <div className="space-y-1.5">
              {[
                { color: "#CC2222", label: "DISTRICT" },
                { color: "#9C7A2E", label: "WALL" },
                { color: "#7a4f2e", label: "TERRITORY" },
                { color: "#6b3ea0", label: "FORTRESS" },
                { color: "#6B7280", label: "CLASSIFIED SITE" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: color }}
                  />
                  <span className="font-mono text-[8px] text-muted-foreground tracking-wider">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Corner brackets ──────────────────────────── */}
          {(
            [
              { pos: "top-0 left-0", bt: "1px", bb: 0, bl: "1px", br: 0 },
              { pos: "top-0 right-0", bt: "1px", bb: 0, bl: 0, br: "1px" },
              { pos: "bottom-0 left-0", bt: 0, bb: "1px", bl: "1px", br: 0 },
              { pos: "bottom-0 right-0", bt: 0, bb: "1px", bl: 0, br: "1px" },
            ] as const
          ).map(({ pos, bt, bb, bl, br }) => (
            <div
              key={pos}
              aria-hidden="true"
              className={`absolute ${pos} w-5 h-5 pointer-events-none z-40 border-primary/35`}
              style={{
                borderTopWidth: bt,
                borderBottomWidth: bb,
                borderLeftWidth: bl,
                borderRightWidth: br,
              }}
            />
          ))}

          {/* ── Scan line ────────────────────────────────── */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 h-px z-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg,transparent,#9C7A2E55,transparent)",
              animation: "map-scanline 8s linear infinite",
            }}
          />
        </motion.div>

        {/* ── Hint bar ──────────────────────────────────── */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-5 font-mono text-[10px] text-muted-foreground">
          <span>⊕ Scroll / pinch-to-zoom</span>
          <span>✥ Drag to pan</span>
          <span>● Click marker for intel</span>
        </div>
      </div>

      {/* Scanline keyframe */}
      <style>{`
        @keyframes map-scanline {
          0%   { top: 0%;   opacity: 0;    }
          5%   { opacity: 0.12; }
          95%  { opacity: 0.12; }
          100% { top: 100%; opacity: 0;    }
        }
      `}</style>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
    </section>
  );
}
