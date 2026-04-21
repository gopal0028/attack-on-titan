import { AlertTriangle, ChevronRight, Eye, EyeOff, Shield } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface TitanEntry {
  id: string;
  name: string;
  height: string;
  ability: string;
  currentInheritor: string;
  previousInheritors: string[];
  firstAppearance: string;
  dangerLevel: number; // 1-10
  classificationLevel: "TOP SECRET" | "CLASSIFIED" | "SECRET";
  description: string;
  powerType:
    | "TRANSFORMATION"
    | "HARDENING"
    | "SUMMONING"
    | "CONTROL"
    | "ENHANCEMENT";
  weakness: string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const TITANS: TitanEntry[] = [
  {
    id: "attack",
    name: "Attack Titan",
    height: "15m",
    ability:
      "Memory inheritance from future inheritors; autonomous transformation; combat instinct amplification beyond normal limits",
    currentInheritor: "Eren Yeager",
    previousInheritors: ["Grisha Yeager", "Eren Kruger (The Owl)"],
    firstAppearance: "Year 845 — Shiganshina District Wall Breach",
    dangerLevel: 10,
    classificationLevel: "TOP SECRET",
    description:
      "The Shingeki no Kyojin — a titan whose inheritor always strives for freedom. Uniquely capable of receiving memories from both past AND future inheritors. Has driven every wielder to pursue freedom above all else. Its connection to the Founding Titan suggests a deeper, sinister role in Eldian history. OMEGA THREAT.",
    powerType: "TRANSFORMATION",
    weakness: "Nape exposure during incomplete regeneration cycle",
  },
  {
    id: "colossal",
    name: "Colossal Titan",
    height: "60m",
    ability:
      "Catastrophic steam emission; controlled body vaporization; massive explosive transformation capable of leveling entire districts",
    currentInheritor: "Armin Arlert",
    previousInheritors: ["Bertholdt Hoover"],
    firstAppearance: "Year 845 — Shiganshina Wall Breach",
    dangerLevel: 10,
    classificationLevel: "TOP SECRET",
    description:
      "Designated the God of Destruction. Largest known titan shifter at 60 meters. Generates nuclear-level heat upon transformation. Steam discharge makes direct combat nearly impossible. Bertholdt Hoover was responsible for the fall of Wall Maria. Power transferred to Armin Arlert under extreme circumstances — Year 850.",
    powerType: "ENHANCEMENT",
    weakness:
      "Rapid movement impossible; extended steam output depletes body tissue",
  },
  {
    id: "female",
    name: "Female Titan",
    height: "14m",
    ability:
      "Crystal hardening; selective titan attraction via crystalline scream; physical mimicry of any combat technique from observed opponents",
    currentInheritor: "Annie Leonhart",
    previousInheritors: ["[REDACTED — LEVEL 5 CLEARANCE]"],
    firstAppearance: "Year 850 — 57th Exterior Scouting Mission",
    dangerLevel: 9,
    classificationLevel: "TOP SECRET",
    description:
      "Uniquely versatile. Can selectively attract and command pure titans. Annie Leonhart sealed herself in hardened crystal — held in Survey Corps custody for years. Capable of copying any martial combat style observed in battle. Demonstrated ability to harden outer skin makes anti-titan blades ineffective. CURRENT STATUS: Crystal coma lifted — active threat.",
    powerType: "HARDENING",
    weakness:
      "Sustained titan attraction depletes energy rapidly; exposed nape at hardening joints",
  },
  {
    id: "armored",
    name: "Armored Titan",
    height: "15m",
    ability:
      "Full-body crystalline armor plating; selective hardening of specific body regions; reinforced charge capable of breaching reinforced walls",
    currentInheritor: "Reiner Braun",
    previousInheritors: ["[CLASSIFICATION PENDING — MARLEYAN ARCHIVE]"],
    firstAppearance: "Year 845 — Wall Maria Inner Breach Operation",
    dangerLevel: 9,
    classificationLevel: "TOP SECRET",
    description:
      "Designed as a wall-breaching weapon by Marleyan military command. Armored plating renders conventional anti-titan blades ineffective on body surface. Reiner Braun displayed significant psychological deterioration after prolonged deep-cover espionage missions. Armor weaknesses at articulation points — discovered through Survey Corps combat data analysis.",
    powerType: "HARDENING",
    weakness:
      "Joint articulation points lack full coverage; sustained battle depletes hardening reserves",
  },
  {
    id: "beast",
    name: "Beast Titan",
    height: "17m",
    ability:
      "Precision projectile launch with artillery-grade impact force; titan command via royal scream; unique animal-characteristic morphology per inheritor",
    currentInheritor: "Zeke Yeager",
    previousInheritors: [
      "Tom Ksaver",
      "[MULTIPLE REDACTED INHERITORS — PRE-MARLEYAN ERA]",
    ],
    firstAppearance: "Year 850 — Wall Rose Interior Infiltration",
    dangerLevel: 10,
    classificationLevel: "TOP SECRET",
    description:
      "Zeke Yeager's Beast Titan resembles a primate. Throwing accuracy classified as artillery-grade — capable of saturating entire Survey Corps formations in a single barrage. Zeke possesses royal blood enabling transformation of spinal-fluid subjects into controllable titans. The Euthanization Plan was developed by this inheritor. EXTREME THREAT.",
    powerType: "SUMMONING",
    weakness:
      "Stationary during extended projectile barrages; exposed nape in aftermath",
  },
  {
    id: "jaw",
    name: "Jaw Titan",
    height: "5m",
    ability:
      "Indestructible titanium-class jaw and claws capable of cutting hardened crystal; fastest titan shifter on record; extreme agility",
    currentInheritor: "Falco Grice",
    previousInheritors: ["Porco Galliard", "Marcel Galliard", "Ymir (Fritz)"],
    firstAppearance: "Year 854 — Liberio Internment Zone Incident",
    dangerLevel: 8,
    classificationLevel: "CLASSIFIED",
    description:
      "Smallest and fastest of the nine titan powers. Crystalline jaw can cut through War Hammer Titan hardening — one of the only recorded instances of hardening neutralization. Falco Grice's version demonstrated abnormal wing development, suggesting unique power evolution. Extreme close-range lethality despite compact size.",
    powerType: "ENHANCEMENT",
    weakness:
      "Small frame; vulnerable to coordinated anti-titan teams; less regenerative capacity",
  },
  {
    id: "cart",
    name: "Cart Titan",
    height: "4m",
    ability:
      "Extended titan transformation duration — months without reversion; quadrupedal high-speed movement; military equipment and artillery mounting capability",
    currentInheritor: "Pieck Finger",
    previousInheritors: ["[CLASSIFIED — MARLEYAN MILITARY ARCHIVE]"],
    firstAppearance: "Year 850 — Wall Rose Titan Incursion",
    dangerLevel: 7,
    classificationLevel: "CLASSIFIED",
    description:
      "Serves as mobile platform for Marleyan military operations. Pieck Finger can maintain titan form for months without reverting — significantly exceeding all other shifters. Used for artillery transport, evacuation support, and deep scouting. Lower direct combat threat but strategic value is classified as critical. SUPPORT ROLE — HIGH VALUE TARGET.",
    powerType: "TRANSFORMATION",
    weakness:
      "Not built for direct combat engagement; slow titan-form regeneration",
  },
  {
    id: "warhammer",
    name: "War Hammer Titan",
    height: "15m",
    ability:
      "Remote body operation from underground crystalline chamber; manifests any solid weapon or structure from hardened titan flesh on demand",
    currentInheritor: "Eren Yeager (consumed Lara Tybur)",
    previousInheritors: [
      "Lara Tybur",
      "[TYBUR FAMILY — MULTIPLE GENERATIONS — CLASSIFIED]",
    ],
    firstAppearance: "Year 854 — Liberio Festival Incident",
    dangerLevel: 9,
    classificationLevel: "TOP SECRET",
    description:
      "Most unique of the nine titans. Wielder operates the titan body remotely from a crystalline structure buried underground — connected via organic white cord. The Tybur family held this power for generations, leveraging it to dominate world politics from the shadows. Eren Yeager consumed Lara Tybur's crystal using the Jaw Titan's bite force. Power now absorbed.",
    powerType: "HARDENING",
    weakness:
      "Underground crystal chamber can be targeted; only Jaw Titan can breach crystal shell",
  },
  {
    id: "founding",
    name: "Founding Titan",
    height: "IMMEASURABLE — TRUE FORM",
    ability:
      "Absolute control of all Subjects of Ymir; mass memory alteration; titan creation and manipulation; godlike control over Eldian biology itself",
    currentInheritor: "Eren Yeager",
    previousInheritors: [
      "Historia Reiss (refused inheritance)",
      "Rod Reiss (transformation failed)",
      "Frieda Reiss",
      "Uri Reiss",
      "[COUNTLESS ROYAL FAMILY INHERITORS]",
    ],
    firstAppearance:
      "Year 743 — Ancient Eldia (Historical Records Declassified)",
    dangerLevel: 10,
    classificationLevel: "TOP SECRET",
    description:
      "THE PROGENITOR. Source of all titan power — the first titan, originating from Ymir Fritz's contact with the Source of All Living Matter. Full power only accessible by royal bloodline. Eren Yeager accessed it via Zeke Yeager (royal blood contact). The Rumbling — deployment of the Wall Titans against global populations — was authorized by this power. CIVILIZATION-LEVEL THREAT.",
    powerType: "CONTROL",
    weakness:
      "Full power requires royal blood contact; Paths connection can theoretically be severed",
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function dangerColor(level: number): string {
  if (level >= 10) return "oklch(0.56 0.25 18)";
  if (level >= 9) return "oklch(0.58 0.22 22)";
  if (level >= 8) return "oklch(0.6 0.18 28)";
  return "oklch(0.65 0.12 45)";
}

function classColor(level: TitanEntry["classificationLevel"]): string {
  if (level === "TOP SECRET") return "oklch(0.56 0.25 18)";
  if (level === "CLASSIFIED") return "oklch(0.65 0.15 60)";
  return "oklch(0.55 0.18 230)";
}

/* ─── DangerBar ──────────────────────────────────────────────────────────── */
function DangerBar({ level, revealed }: { level: number; revealed: boolean }) {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: 10 }, (_, i) => `seg-${i}`).map((key, i) => (
        <motion.div
          key={key}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={
            revealed ? { scaleY: 1, opacity: 1 } : { scaleY: 0.4, opacity: 0.3 }
          }
          transition={{ delay: revealed ? i * 0.05 : 0, duration: 0.25 }}
          className="h-3 w-3"
          style={{
            background:
              i < level
                ? `oklch(${0.3 + (i / 10) * 0.25} 0.25 18)`
                : "oklch(0.17 0 0)",
            border: "1px solid oklch(0.26 0.22 25 / 0.35)",
            clipPath: "polygon(20% 0%,80% 0%,100% 100%,0% 100%)",
            originY: "bottom",
          }}
        />
      ))}
      <span
        className="terminal-text text-[10px] ml-1.5"
        style={{ color: dangerColor(level) }}
      >
        {level}/10
      </span>
    </div>
  );
}

/* ─── Scanline overlay ───────────────────────────────────────────────────── */
function ScanLine({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      className="absolute inset-x-0 z-30 pointer-events-none"
      style={{
        height: "3px",
        background:
          "linear-gradient(90deg,transparent,oklch(0.75 0.35 140),oklch(0.85 0.4 140),oklch(0.75 0.35 140),transparent)",
        boxShadow:
          "0 0 18px oklch(0.7 0.3 140),0 0 40px oklch(0.5 0.22 140/0.4)",
      }}
      initial={{ top: "0%" }}
      animate={{ top: "100%" }}
      transition={{ duration: 1.3, ease: "linear" }}
    />
  );
}

/* ─── RedactedBlock ──────────────────────────────────────────────────────── */
function RedactedBlock({
  w = "w-full",
  h = "h-3.5",
}: { w?: string; h?: string }) {
  return (
    <div
      className={`${w} ${h} rounded-sm`}
      style={{
        background:
          "repeating-linear-gradient(45deg,oklch(0.19 0 0),oklch(0.19 0 0) 3px,oklch(0.13 0 0) 3px,oklch(0.13 0 0) 6px)",
      }}
    />
  );
}

/* ─── ClassificationBadge ────────────────────────────────────────────────── */
function ClassificationBadge({
  level,
}: { level: TitanEntry["classificationLevel"] }) {
  const c = classColor(level);
  return (
    <span
      className="terminal-text text-[9px] px-2 py-0.5 border font-bold tracking-[0.2em]"
      style={{
        color: c,
        borderColor: `${c.slice(0, -1)} / 0.6)`,
        background: `${c.slice(0, -1)} / 0.07)`,
      }}
    >
      {level}
    </span>
  );
}

/* ─── TitanCard ──────────────────────────────────────────────────────────── */
function TitanCard({ titan, index }: { titan: TitanEntry; index: number }) {
  const [revealed, setRevealed] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const dc = dangerColor(titan.dangerLevel);

  const handleAccess = () => {
    if (scanning || revealed) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setShowContent(true);
      setRevealed(true);
    }, 1400);
  };

  return (
    <motion.div
      data-ocid={`titans.card.${index + 1}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="relative overflow-hidden flex flex-col"
      style={{
        background: "oklch(0.095 0 0)",
        border: `1px solid ${revealed ? dc : "oklch(0.21 0 0)"}`,
        boxShadow: revealed
          ? `0 0 28px ${dc.replace(")", " / 0.18)")},inset 0 0 28px ${dc.replace(")", " / 0.04)")}`
          : "none",
        transition: "border-color 0.6s,box-shadow 0.6s",
      }}
    >
      {/* Scanline animation */}
      <div className="relative">
        <ScanLine active={scanning} />
      </div>

      {/* Top bar */}
      <div
        className="flex items-center justify-between px-3.5 py-2 border-b"
        style={{
          borderColor: "oklch(0.19 0 0)",
          background: "oklch(0.075 0 0)",
        }}
      >
        <div className="flex items-center gap-2">
          <ClassificationBadge level={titan.classificationLevel} />
          <span
            className="terminal-text text-[9px]"
            style={{ color: "oklch(0.36 0 0)" }}
          >
            FILE-{String(index + 1).padStart(3, "0")} / TITAN-INTEL
          </span>
        </div>
        {revealed ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="terminal-text text-[9px] font-bold"
            style={{ color: "oklch(0.58 0.28 140)" }}
          >
            ◉ DECRYPTED
          </motion.span>
        ) : (
          <span
            className="terminal-text text-[9px]"
            style={{ color: "oklch(0.28 0 0)" }}
          >
            ◎ ENCRYPTED
          </span>
        )}
      </div>

      {/* Danger meter — always visible */}
      <div className="flex items-center justify-between px-3.5 pt-3 pb-1">
        <span
          className="terminal-text text-[9px]"
          style={{ color: "oklch(0.42 0 0)" }}
        >
          THREAT LEVEL:
        </span>
        <DangerBar level={titan.dangerLevel} revealed={revealed} />
      </div>

      {/* Body */}
      <div className="px-3.5 pb-4 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {!showContent ? (
            /* ── REDACTED VIEW ── */
            <motion.div
              key="redacted"
              exit={{ opacity: 0 }}
              className="space-y-4 pt-3 flex-1 flex flex-col"
            >
              <div className="space-y-1.5">
                <span
                  className="terminal-text text-[9px]"
                  style={{ color: "oklch(0.38 0 0)" }}
                >
                  SUBJECT DESIGNATION:
                </span>
                <div className="flex items-center gap-2">
                  <RedactedBlock w="w-44" h="h-5" />
                  <span
                    className="terminal-text text-[9px]"
                    style={{ color: "oklch(0.35 0.15 18)" }}
                  >
                    [REDACTED]
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {["INHERITOR DATA", "ABILITY PROFILE", "THREAT ANALYSIS"].map(
                  (label) => (
                    <div key={label} className="space-y-1">
                      <span
                        className="terminal-text text-[9px]"
                        style={{ color: "oklch(0.32 0 0)" }}
                      >
                        {label}:
                      </span>
                      <RedactedBlock />
                      <RedactedBlock w="w-4/5" />
                    </div>
                  ),
                )}
              </div>

              {/* ACCESS FILE button */}
              <div className="mt-auto pt-3">
                <motion.button
                  type="button"
                  data-ocid={`titans.access_button.${index + 1}`}
                  onClick={handleAccess}
                  disabled={scanning}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 terminal-text text-xs tracking-[0.2em] font-bold"
                  style={{
                    background: scanning
                      ? "oklch(0.55 0.25 140 / 0.08)"
                      : "oklch(0.26 0.22 25 / 0.12)",
                    border: `1px solid ${scanning ? "oklch(0.55 0.25 140)" : "oklch(0.26 0.22 25 / 0.7)"}`,
                    color: scanning
                      ? "oklch(0.72 0.28 140)"
                      : "oklch(0.56 0.25 18)",
                    transition: "all 0.2s",
                  }}
                >
                  {scanning ? (
                    <span>
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{
                          duration: 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        ▶ DECRYPTING FILE...
                      </motion.span>
                    </span>
                  ) : (
                    "▶ ACCESS FILE"
                  )}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* ── REVEALED VIEW ── */
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="space-y-3 pt-3 flex-1 flex flex-col"
            >
              {/* Name */}
              <div>
                <span
                  className="terminal-text text-[9px]"
                  style={{ color: "oklch(0.42 0 0)" }}
                >
                  SUBJECT DESIGNATION:
                </span>
                <h3
                  className="cinematic-title mt-1 leading-none"
                  style={{
                    fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                    color: dc,
                    textShadow: `0 0 18px ${dc.replace(")", " / 0.4)")}`,
                  }}
                >
                  {titan.name}
                </h3>
              </div>

              {/* Height + type badges */}
              <div className="flex flex-wrap gap-1.5">
                <span
                  className="terminal-text text-[10px] px-2 py-0.5 border font-bold"
                  style={{
                    color: "oklch(0.82 0 0)",
                    borderColor: "oklch(0.28 0 0)",
                    background: "oklch(0.13 0 0)",
                  }}
                >
                  HEIGHT: {titan.height}
                </span>
                <span
                  className="terminal-text text-[9px] px-2 py-0.5 border"
                  style={{
                    color: "oklch(0.55 0.18 230)",
                    borderColor: "oklch(0.55 0.18 230 / 0.4)",
                    background: "oklch(0.55 0.18 230 / 0.06)",
                  }}
                >
                  {titan.powerType}
                </span>
              </div>

              {/* Inheritor */}
              <div>
                <span
                  className="terminal-text text-[9px]"
                  style={{ color: "oklch(0.42 0 0)" }}
                >
                  CURRENT INHERITOR:
                </span>
                <p
                  className="terminal-text text-sm font-bold mt-0.5"
                  style={{ color: "oklch(0.65 0.15 60)" }}
                >
                  {titan.currentInheritor}
                </p>
              </div>

              {/* Previous inheritors */}
              <div>
                <span
                  className="terminal-text text-[9px]"
                  style={{ color: "oklch(0.42 0 0)" }}
                >
                  PREV. INHERITORS:
                </span>
                <div className="mt-1 space-y-0.5">
                  {titan.previousInheritors.map((p) => (
                    <div key={p} className="flex items-start gap-1">
                      <ChevronRight
                        className="w-2.5 h-2.5 mt-0.5 shrink-0"
                        style={{ color: "oklch(0.32 0 0)" }}
                      />
                      <span
                        className="terminal-text text-[10px]"
                        style={{ color: "oklch(0.5 0 0)" }}
                      >
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ability */}
              <div>
                <span
                  className="terminal-text text-[9px]"
                  style={{ color: "oklch(0.42 0 0)" }}
                >
                  RECORDED ABILITY:
                </span>
                <p
                  className="terminal-text text-[11px] mt-0.5 leading-relaxed"
                  style={{ color: "oklch(0.68 0 0)" }}
                >
                  {titan.ability}
                </p>
              </div>

              {/* Description */}
              <div
                className="p-2.5 border-l-2 flex-1"
                style={{
                  borderColor: dc,
                  background: `${dc.replace(")", " / 0.04)")}`,
                }}
              >
                <p
                  className="terminal-text text-[10px] leading-relaxed"
                  style={{ color: "oklch(0.58 0 0)" }}
                >
                  {titan.description}
                </p>
              </div>

              {/* Bottom metadata */}
              <div
                className="pt-2.5 space-y-1.5 border-t"
                style={{ borderColor: "oklch(0.17 0 0)" }}
              >
                <div>
                  <span
                    className="terminal-text text-[9px]"
                    style={{ color: "oklch(0.38 0 0)" }}
                  >
                    FIRST OBSERVED:
                  </span>
                  <p
                    className="terminal-text text-[10px] mt-0.5"
                    style={{ color: "oklch(0.55 0 0)" }}
                  >
                    {titan.firstAppearance}
                  </p>
                </div>
                <div>
                  <span
                    className="terminal-text text-[9px]"
                    style={{ color: "oklch(0.38 0 0)" }}
                  >
                    KNOWN WEAKNESS:
                  </span>
                  <p
                    className="terminal-text text-[10px] mt-0.5"
                    style={{ color: "oklch(0.48 0 0)" }}
                  >
                    {titan.weakness}
                  </p>
                </div>
              </div>

              {/* Seal file */}
              <button
                type="button"
                data-ocid={`titans.close_file.${index + 1}`}
                onClick={() => {
                  setRevealed(false);
                  setShowContent(false);
                }}
                className="flex items-center gap-1 terminal-text text-[9px] tracking-wider transition-opacity hover:opacity-60 self-start"
                style={{ color: "oklch(0.38 0 0)" }}
              >
                <EyeOff className="w-3 h-3" />
                SEAL FILE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Blinking Warning Banner ────────────────────────────────────────────── */
function WarningBanner() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 750);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative overflow-hidden py-2.5 px-4 flex items-center justify-center gap-3"
      style={{
        background: on
          ? "oklch(0.26 0.22 25 / 0.22)"
          : "oklch(0.26 0.22 25 / 0.06)",
        border: `1px solid oklch(0.26 0.22 25 / ${on ? "0.75" : "0.25"})`,
        transition: "background 0.1s,border-color 0.1s",
      }}
    >
      <AlertTriangle
        className="w-4 h-4 shrink-0"
        style={{ color: on ? "oklch(0.6 0.25 18)" : "oklch(0.32 0.15 18)" }}
      />
      <span
        className="terminal-text text-xs tracking-[0.2em] font-bold"
        style={{ color: on ? "oklch(0.78 0.2 18)" : "oklch(0.42 0.12 18)" }}
      >
        ⚠ WARNING: TITAN INTELLIGENCE DATA — AUTHORIZED PERSONNEL ONLY ⚠
      </span>
      <AlertTriangle
        className="w-4 h-4 shrink-0"
        style={{ color: on ? "oklch(0.6 0.25 18)" : "oklch(0.32 0.15 18)" }}
      />
    </div>
  );
}

/* ─── Edge Danger Gutters ────────────────────────────────────────────────── */
function EdgeGutter({ side }: { side: "left" | "right" }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="hidden lg:flex fixed top-1/4 flex-col items-center gap-0.5 z-10 pointer-events-none"
      style={{
        [side]: "6px",
        opacity: tick % 2 === 0 ? 0.75 : 0.2,
        transition: "opacity 0.35s",
      }}
    >
      {Array.from({ length: 16 }, (_, i) => `gutter-${i}`).map((key, i) => (
        <div
          key={key}
          className="w-1"
          style={{
            height: i % 4 === 0 ? "10px" : "4px",
            background:
              i % 4 === 0 ? "oklch(0.56 0.25 18)" : "oklch(0.26 0.22 25 / 0.5)",
          }}
        />
      ))}
      <div
        className="terminal-text text-[7px] mt-2 tracking-wider"
        style={{
          color: "oklch(0.38 0.12 18)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        RESTRICTED / TITAN DATA
      </div>
    </div>
  );
}

/* ─── Section Header ─────────────────────────────────────────────────────── */
const HEADER_TEXT = "TITAN INTELLIGENCE FILES";

function SectionHeader() {
  const [chars, setChars] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    if (chars >= HEADER_TEXT.length) return;
    const t = setTimeout(() => setChars((c) => c + 1), 55);
    return () => clearTimeout(t);
  }, [chars]);

  useEffect(() => {
    const id = setInterval(() => setCursor((v) => !v), 550);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-center space-y-5 mb-12">
      {/* Divider with stamp */}
      <div className="flex items-center justify-center gap-4">
        <div
          className="flex-1 max-w-28 h-px"
          style={{ background: "oklch(0.26 0.22 25 / 0.6)" }}
        />
        <span
          className="terminal-text text-[10px] tracking-[0.35em] font-bold px-3 py-1 border"
          style={{
            color: "oklch(0.56 0.25 18)",
            borderColor: "oklch(0.26 0.22 25 / 0.7)",
            background: "oklch(0.26 0.22 25 / 0.12)",
          }}
        >
          CLASSIFIED
        </span>
        <div
          className="flex-1 max-w-28 h-px"
          style={{ background: "oklch(0.26 0.22 25 / 0.6)" }}
        />
      </div>

      {/* Typewriter heading */}
      <div>
        <h2
          className="cinematic-title"
          style={{
            fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)",
            color: "oklch(0.92 0 0)",
            letterSpacing: "0.06em",
          }}
        >
          {HEADER_TEXT.slice(0, chars)}
          <span
            style={{ opacity: cursor ? 1 : 0, color: "oklch(0.56 0.25 18)" }}
          >
            █
          </span>
        </h2>
        <p
          className="terminal-text text-[10px] tracking-[0.22em] mt-1"
          style={{ color: "oklch(0.4 0 0)" }}
        >
          PARADIS ISLAND MILITARY INTELLIGENCE — DIVISION 9 SPECIAL FILES
        </p>
      </div>

      {/* Blinking badge */}
      <div className="flex items-center justify-center gap-2">
        <Shield
          className="w-3.5 h-3.5"
          style={{ color: "oklch(0.56 0.25 18)" }}
        />
        <motion.span
          className="terminal-text text-xs font-bold tracking-[0.18em] px-3 py-1"
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 0.75, repeat: Number.POSITIVE_INFINITY }}
          data-ocid="titans.restricted_badge"
          style={{
            color: "oklch(0.78 0.2 18)",
            background: "oklch(0.26 0.22 25 / 0.18)",
            border: "1px solid oklch(0.26 0.22 25 / 0.55)",
          }}
        >
          [RESTRICTED ACCESS]
        </motion.span>
        <Eye className="w-3.5 h-3.5" style={{ color: "oklch(0.56 0.25 18)" }} />
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {[
          { label: "TOTAL SUBJECTS", value: "9" },
          { label: "CLASSIFICATION", value: "TOP SECRET" },
          { label: "ARCHIVE STATUS", value: "ACTIVE" },
          { label: "AUTHORIZED EYES", value: "LEVEL 9+" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div
              className="terminal-text text-[9px]"
              style={{ color: "oklch(0.35 0 0)" }}
            >
              {item.label}
            </div>
            <div
              className="terminal-text text-xs font-bold"
              style={{ color: "oklch(0.65 0.15 60)" }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */
export default function TitansSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="titans"
      data-section="titans"
      data-ocid="titans.section"
      className="relative py-20 overflow-hidden grain-overlay"
      style={{ background: "oklch(0.07 0 0)" }}
    >
      {/* Red ambient corners */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 0% 50%,oklch(0.26 0.22 25/0.1) 0%,transparent 55%)," +
            "radial-gradient(ellipse at 100% 50%,oklch(0.26 0.22 25/0.1) 0%,transparent 55%)," +
            "radial-gradient(ellipse at 50% 0%,oklch(0.26 0.22 25/0.08) 0%,transparent 45%)",
        }}
      />

      {/* Side gutter animations */}
      <EdgeGutter side="left" />
      <EdgeGutter side="right" />

      {/* Sticky top warning */}
      <div className="sticky top-0 z-20 mb-6">
        <WarningBanner />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        {/* File count bar */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="h-px flex-1"
            style={{ background: "oklch(0.19 0 0)" }}
          />
          <span
            className="terminal-text text-[9px]"
            style={{ color: "oklch(0.32 0 0)" }}
          >
            {TITANS.length} CLASSIFIED FILES — CLICK "ACCESS FILE" TO DECRYPT
          </span>
          <div
            className="h-px flex-1"
            style={{ background: "oklch(0.19 0 0)" }}
          />
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="titans.list"
        >
          {TITANS.map((titan, i) => (
            <TitanCard key={titan.id} titan={titan} index={i} />
          ))}
        </div>

        {/* Bottom warning */}
        <div className="mt-10">
          <WarningBanner />
        </div>

        {/* Footer stamp */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div
            className="h-px w-12"
            style={{ background: "oklch(0.18 0 0)" }}
          />
          <div
            className="terminal-text text-[9px] tracking-widest px-4 py-2 border text-center"
            style={{
              color: "oklch(0.32 0 0)",
              borderColor: "oklch(0.18 0 0)",
              background: "oklch(0.085 0 0)",
            }}
          >
            PROPERTY OF THE PARADIS ISLAND MILITARY — UNAUTHORIZED ACCESS IS
            PUNISHABLE BY DEATH
          </div>
          <div
            className="h-px w-12"
            style={{ background: "oklch(0.18 0 0)" }}
          />
        </div>
      </div>
    </section>
  );
}
