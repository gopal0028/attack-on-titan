import {
  ChevronDown,
  ChevronUp,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "../store/useStore";
import type { AudioTrack } from "../types";

// ── Track definitions ──────────────────────────────────────────────────────────
const TRACKS: {
  id: AudioTrack;
  label: string;
  subtitle: string;
  mood: string;
}[] = [
  {
    id: "emotional",
    label: "Vogel Im Käfig",
    subtitle: "Emotional · Season 2",
    mood: "haunting",
  },
  {
    id: "battle",
    label: "Attack On Titan",
    subtitle: "Battle · Season 1",
    mood: "intense",
  },
  {
    id: "calm",
    label: "Call of Silence",
    subtitle: "Calm · Season 2",
    mood: "serene",
  },
];

const TRACK_COLORS: Record<AudioTrack, string> = {
  emotional: "oklch(0.56 0.25 18)", // blood red
  battle: "oklch(0.65 0.15 60)", // gold
  calm: "oklch(0.55 0.12 220)", // steel blue
  none: "oklch(0.4 0 0)",
};

const NUM_BARS = 20;

// ── Waveform visualizer ───────────────────────────────────────────────────────
function Waveform({ playing, track }: { playing: boolean; track: AudioTrack }) {
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: NUM_BARS }, () => 0.15),
  );
  const rafRef = useRef<number>(0);
  const color = TRACK_COLORS[track];

  useEffect(() => {
    if (!playing) {
      setBars(Array.from({ length: NUM_BARS }, () => 0.15));
      return;
    }

    const animate = () => {
      setBars((prev) =>
        prev.map((_, i) => {
          const base = 0.15 + Math.sin(Date.now() / 200 + i * 0.8) * 0.3;
          const noise = Math.random() * 0.2;
          return Math.max(0.08, Math.min(1, base + noise));
        }),
      );
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  return (
    <div className="flex items-center gap-px h-8" aria-hidden="true">
      {bars.map((h, i) => (
        <div
          key={`bar-${String(i)}`}
          className="flex-1 rounded-full transition-all duration-75"
          style={{
            height: `${Math.round(h * 100)}%`,
            background: color,
            opacity: playing ? 0.85 : 0.3,
            willChange: "height",
          }}
        />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AudioControls() {
  const {
    audioTrack,
    setAudioTrack,
    audioVolume,
    setAudioVolume,
    audioPlaying,
    setAudioPlaying,
  } = useStore();
  const [collapsed, setCollapsed] = useState(false);
  const [muted, setMuted] = useState(false);
  const prevVolRef = useRef(audioVolume);

  const currentIndex = TRACKS.findIndex((t) => t.id === audioTrack);
  const currentTrack = TRACKS[currentIndex] ?? TRACKS[0];

  const goNext = useCallback(() => {
    const next = TRACKS[(currentIndex + 1) % TRACKS.length];
    setAudioTrack(next.id);
  }, [currentIndex, setAudioTrack]);

  const goPrev = useCallback(() => {
    const prev = TRACKS[(currentIndex - 1 + TRACKS.length) % TRACKS.length];
    setAudioTrack(prev.id);
  }, [currentIndex, setAudioTrack]);

  const toggleMute = useCallback(() => {
    if (muted) {
      setAudioVolume(prevVolRef.current);
      setMuted(false);
    } else {
      prevVolRef.current = audioVolume;
      setAudioVolume(0);
      setMuted(true);
    }
  }, [muted, audioVolume, setAudioVolume]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.code === "Space" && e.shiftKey) {
        e.preventDefault();
        setAudioPlaying(!audioPlaying);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [audioPlaying, setAudioPlaying]);

  const accentColor = TRACK_COLORS[audioTrack];

  return (
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 120 }}
      className="fixed bottom-6 right-6 z-50"
      data-ocid="audio.panel"
    >
      {/* Container */}
      <div
        className="glass-panel rounded-xl overflow-hidden"
        style={{
          width: 260,
          boxShadow: `0 0 30px ${accentColor}33, 0 4px 24px rgba(0,0,0,0.6)`,
          border: `1px solid ${accentColor}44`,
        }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border/20">
          <div className="flex items-center gap-2">
            <Music
              size={14}
              style={{ color: accentColor }}
              className={audioPlaying ? "animate-pulse" : ""}
            />
            <span className="terminal-text text-xs text-muted-foreground uppercase tracking-widest">
              OST System
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={
              collapsed ? "Expand audio controls" : "Collapse audio controls"
            }
            data-ocid="audio.toggle"
          >
            {collapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="px-3 py-3 flex flex-col gap-3">
                {/* Track info */}
                <div className="flex flex-col gap-0.5">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTrack.id}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="font-display text-sm font-bold text-foreground truncate"
                    >
                      {currentTrack.label}
                    </motion.p>
                  </AnimatePresence>
                  <p className="terminal-text text-[10px] text-muted-foreground">
                    {currentTrack.subtitle}
                  </p>
                </div>

                {/* Waveform */}
                <div className="h-8">
                  <Waveform playing={audioPlaying} track={audioTrack} />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label="Previous track"
                    data-ocid="audio.prev_button"
                  >
                    <SkipBack size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setAudioPlaying(!audioPlaying)}
                    className="flex items-center justify-center w-9 h-9 rounded-full text-foreground transition-all hover:scale-110"
                    style={{
                      background: `${accentColor}`,
                      boxShadow: audioPlaying
                        ? `0 0 16px ${accentColor}88`
                        : "none",
                    }}
                    aria-label={audioPlaying ? "Pause" : "Play"}
                    data-ocid="audio.play_button"
                  >
                    {audioPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label="Next track"
                    data-ocid="audio.next_button"
                  >
                    <SkipForward size={16} />
                  </button>
                </div>

                {/* Track selector pills */}
                <div className="flex gap-1 flex-wrap">
                  {TRACKS.map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setAudioTrack(t.id)}
                      className="terminal-text text-[10px] px-2 py-0.5 rounded-full border transition-all"
                      style={{
                        borderColor:
                          audioTrack === t.id
                            ? accentColor
                            : "oklch(var(--border))",
                        background:
                          audioTrack === t.id
                            ? `${accentColor}22`
                            : "transparent",
                        color:
                          audioTrack === t.id
                            ? accentColor
                            : "oklch(var(--muted-foreground))",
                      }}
                      data-ocid={`audio.track.${t.id}`}
                    >
                      {t.mood}
                    </button>
                  ))}
                </div>

                {/* Volume row */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    aria-label={muted ? "Unmute" : "Mute"}
                    data-ocid="audio.mute_button"
                  >
                    {muted || audioVolume === 0 ? (
                      <VolumeX size={14} />
                    ) : (
                      <Volume2 size={14} />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={audioVolume}
                    onChange={(e) => {
                      const v = Number.parseFloat(e.target.value);
                      setAudioVolume(v);
                      if (v > 0 && muted) setMuted(false);
                    }}
                    className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                    style={
                      {
                        background: `linear-gradient(to right, ${accentColor} ${audioVolume * 100}%, oklch(var(--muted)) ${audioVolume * 100}%)`,
                        "--thumb-color": accentColor,
                      } as React.CSSProperties
                    }
                    aria-label="Volume"
                    data-ocid="audio.volume_slider"
                  />
                  <span className="terminal-text text-[10px] text-muted-foreground w-6 text-right">
                    {Math.round(audioVolume * 100)}
                  </span>
                </div>

                {/* Simulated status */}
                <div className="flex items-center gap-1.5 border-t border-border/20 pt-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: audioPlaying
                        ? accentColor
                        : "oklch(var(--muted-foreground))",
                      boxShadow: audioPlaying
                        ? `0 0 6px ${accentColor}`
                        : "none",
                    }}
                  />
                  <span className="terminal-text text-[9px] text-muted-foreground uppercase tracking-widest">
                    {audioPlaying ? "transmitting" : "standby"} · Eldian
                    Broadcast
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
