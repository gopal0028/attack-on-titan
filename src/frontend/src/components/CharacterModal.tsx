import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Character } from "../types";

// ─── Faction colors ───────────────────────────────────────────────────────────
const FACTION_COLORS: Record<string, string> = {
  "Survey Corps": "text-accent border-accent/50 bg-accent/10",
  "Military Police": "text-blue-400 border-blue-400/50 bg-blue-400/10",
  Garrison: "text-yellow-500 border-yellow-500/50 bg-yellow-500/10",
  Warriors: "text-primary border-primary/50 bg-primary/20",
};

// ─── Animated stat bar ────────────────────────────────────────────────────────
interface StatBarProps {
  label: string;
  value: number;
  delay?: number;
}

function StatBar({ label, value, delay = 0 }: StatBarProps) {
  const colorClass =
    value >= 90
      ? "from-primary to-accent"
      : value >= 70
        ? "from-primary/80 to-accent/80"
        : "from-primary/60 to-accent/60";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="terminal-text text-muted-foreground text-xs tracking-widest">
          {label}
        </span>
        <span className="terminal-text text-primary text-xs font-bold">
          {value}
        </span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClass} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Radar tooltip ────────────────────────────────────────────────────────────
function RadarTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { subject: string; value: number } }>;
}) {
  if (!active || !payload?.length) return null;
  const { subject, value } = payload[0].payload;
  return (
    <div className="glass-panel border border-border/60 px-2 py-1">
      <p className="terminal-text text-primary text-xs">
        {subject}: {value}
      </p>
    </div>
  );
}

// ─── CharacterModal ───────────────────────────────────────────────────────────
interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

export default function CharacterModal({
  character,
  onClose,
}: CharacterModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const factionClass =
    FACTION_COLORS[character.faction] ??
    "text-muted-foreground border-border bg-muted/20";

  const radarData = [
    { subject: "STR", value: character.stats.strength, fullMark: 100 },
    { subject: "INT", value: character.stats.intelligence, fullMark: 100 },
    { subject: "SPD", value: character.stats.speed, fullMark: 100 },
    { subject: "LDR", value: character.stats.leadership, fullMark: 100 },
    { subject: "POP", value: character.popularity, fullMark: 100 },
  ];

  // Focus trap + Escape key
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-ocid="characters.dialog"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-label="Close character profile"
        data-ocid="characters.close_button"
      />

      {/* Modal panel */}
      <motion.div
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-card border border-border"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          boxShadow:
            "0 0 60px oklch(0.26 0.22 25 / 0.25), 0 0 0 1px oklch(0.26 0.22 25 / 0.15)",
          willChange: "transform, opacity",
        }}
        data-ocid="characters.modal"
        aria-label={`${character.name} personnel file`}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors terminal-text text-sm"
          aria-label="Close"
          data-ocid="characters.modal_close_button"
        >
          ✕
        </button>

        {/* Classified header bar */}
        <div className="bg-primary/20 border-b border-primary/40 px-6 py-2 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
          <span className="terminal-text text-primary text-xs tracking-[0.4em] truncate">
            CLASSIFIED — ELDIAN MILITARY PERSONNEL FILE
          </span>
          <span className="ml-auto terminal-text text-primary/50 text-xs hidden sm:inline flex-shrink-0">
            ID: {character.id.toUpperCase()}
          </span>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row">
          {/* ── Left: Image ── */}
          <div className="lg:w-2/5 relative bg-muted flex-shrink-0">
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[500px]">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: "top center" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/images/placeholder.svg";
                }}
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent lg:to-card/70 hidden lg:block pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent lg:hidden pointer-events-none" />

              {/* Status badge */}
              <div className="absolute bottom-4 left-4">
                <span
                  className={`px-3 py-1.5 text-xs terminal-text font-bold border ${
                    character.status === "Alive"
                      ? "bg-accent/20 text-accent border-accent/40"
                      : "bg-primary/20 text-primary border-primary/40"
                  }`}
                >
                  {character.status === "Alive" ? "● ACTIVE" : "◆ KIA"}
                </span>
              </div>

              {/* Titan shifter badge */}
              {character.titan && (
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 text-xs terminal-text bg-primary/30 text-primary border border-primary/50">
                    ⚡ TITAN SHIFTER
                  </span>
                </div>
              )}

              {/* Scan lines effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-5 hidden lg:block"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.95 0 0) 2px, oklch(0.95 0 0) 3px)",
                }}
              />
            </div>
          </div>

          {/* ── Right: Data ── */}
          <div className="flex-1 p-5 sm:p-6 space-y-5 min-w-0">
            {/* Name + faction + debut */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-2 py-0.5 text-xs terminal-text border ${factionClass}`}
                >
                  {character.faction.toUpperCase()}
                </span>
                {character.titan && (
                  <span className="px-2 py-0.5 text-xs terminal-text bg-primary/20 text-primary border border-primary/40">
                    INHERITOR
                  </span>
                )}
              </div>
              <h2 className="cinematic-title text-3xl sm:text-4xl text-foreground leading-tight">
                {character.name.toUpperCase()}
              </h2>
              <div className="flex flex-wrap items-center gap-3 terminal-text text-muted-foreground text-xs tracking-wider">
                <span>RANK: {character.rank.toUpperCase()}</span>
                <span className="text-border">·</span>
                <span>DEBUT: {character.debut}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <p className="terminal-text text-primary text-xs tracking-widest">
                {"// BIOGRAPHICAL SUMMARY"}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                {character.bio}
              </p>
            </div>

            {/* Abilities */}
            <div className="space-y-2">
              <p className="terminal-text text-primary text-xs tracking-widest">
                {"// KNOWN ABILITIES"}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {character.abilities.map((ability) => (
                  <motion.span
                    key={ability}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="px-2 py-1 text-xs terminal-text bg-secondary text-muted-foreground border border-border/50"
                  >
                    {ability.toUpperCase()}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Titan form */}
            {character.titan && (
              <div className="space-y-1 p-3 border border-primary/30 bg-primary/5">
                <p className="terminal-text text-primary text-xs tracking-widest">
                  {"// TITAN FORM"}
                </p>
                <p className="terminal-text text-accent text-sm">
                  {character.titan}
                </p>
              </div>
            )}

            {/* Stats + Radar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Progress bars */}
              <div className="space-y-3">
                <p className="terminal-text text-primary text-xs tracking-widest">
                  {"// COMBAT STATISTICS"}
                </p>
                <StatBar
                  label="STRENGTH"
                  value={character.stats.strength}
                  delay={0}
                />
                <StatBar
                  label="INTELLIGENCE"
                  value={character.stats.intelligence}
                  delay={0.1}
                />
                <StatBar
                  label="SPEED"
                  value={character.stats.speed}
                  delay={0.2}
                />
                <StatBar
                  label="LEADERSHIP"
                  value={character.stats.leadership}
                  delay={0.3}
                />
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="terminal-text text-muted-foreground text-xs tracking-widest">
                      POPULARITY
                    </span>
                    <span className="terminal-text text-accent text-xs font-bold">
                      {character.popularity}
                    </span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent/70 to-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${character.popularity}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.7,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Radar chart */}
              <div className="space-y-2">
                <p className="terminal-text text-primary text-xs tracking-widest">
                  {"// POWER ANALYSIS"}
                </p>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} outerRadius="70%">
                      <PolarGrid
                        stroke="oklch(0.2 0 0)"
                        strokeDasharray="3 3"
                      />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                          fill: "oklch(0.65 0 0)",
                          fontSize: 9,
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      />
                      <Radar
                        name={character.name}
                        dataKey="value"
                        stroke="oklch(0.26 0.22 25)"
                        fill="oklch(0.26 0.22 25)"
                        fillOpacity={0.3}
                        strokeWidth={1.5}
                      />
                      <Tooltip content={<RadarTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-2 border-accent pl-4 space-y-1">
              <p className="terminal-text text-accent text-xs tracking-widest">
                {"// FIELD QUOTE"}
              </p>
              <blockquote className="font-display text-sm italic text-foreground/80 leading-relaxed">
                "{character.quote}"
              </blockquote>
              <p className="terminal-text text-muted-foreground/50 text-xs">
                — {character.name}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom classified bar */}
        <div className="bg-primary/10 border-t border-primary/20 px-6 py-2 flex items-center justify-between">
          <span className="terminal-text text-primary/40 text-xs tracking-widest">
            PROPERTY OF THE ELDIAN MILITARY — UNAUTHORIZED ACCESS PROHIBITED
          </span>
          <AnimatePresence>
            <motion.span
              className="terminal-text text-primary text-xs"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              ◉ CLASSIFIED
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
