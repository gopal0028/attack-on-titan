import { useEffect, useRef, useState } from "react";

interface SystemBreachProps {
  onComplete: () => void;
}

const FAKE_IPS = [
  "192.168.1.104",
  "10.0.0.77",
  "172.16.254.1",
  "203.0.113.42",
  "198.51.100.9",
  "185.220.101.33",
  "45.142.212.100",
  "91.108.4.10",
  "62.210.105.116",
  "178.162.200.37",
  "194.165.16.72",
  "37.120.175.15",
];

const BREACH_LINES = [
  "> INTRUSION DETECTED — SECTOR 7G",
  "> FIREWALL BREACHED — NODE 4A",
  "> DECRYPTING MILITARY ARCHIVES...",
  "> ACCESS LEVEL: OMEGA CLEARANCE BYPASSED",
  "> TITAN SHIFTER DATA — UNLOCKED",
  "> COORDINATE ABILITY — CLASSIFIED",
  "> ELDIAN ROYAL BLOODLINE — CONFIRMED",
  "> DEPLOYING COUNTER-MEASURES...",
  "> ISOLATING THREAT VECTORS...",
  "> BREACH CONTAINED ✓",
];

export default function SystemBreach({ onComplete }: SystemBreachProps) {
  const [phase, setPhase] = useState<"breach" | "contain" | "fade">("breach");
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [scrollingIPs, setScrollingIPs] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ipIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lineIndex = useRef(0);

  // Scroll fake IPs
  useEffect(() => {
    const shuffled = [...FAKE_IPS].sort(() => Math.random() - 0.5);
    setScrollingIPs(shuffled);
    ipIntervalRef.current = setInterval(() => {
      setScrollingIPs((prev) => {
        const next = [...prev];
        next.push(
          `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        );
        if (next.length > 20) next.shift();
        return next;
      });
    }, 200);
    return () => {
      if (ipIntervalRef.current) clearInterval(ipIntervalRef.current);
    };
  }, []);

  // Reveal breach lines one by one
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (lineIndex.current < BREACH_LINES.length) {
        const line = BREACH_LINES[lineIndex.current];
        setVisibleLines((prev) => [...prev, line]);
        lineIndex.current += 1;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setPhase("contain");
        setTimeout(() => setPhase("fade"), 1500);
        setTimeout(() => onComplete(), 2800);
      }
    }, 280);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-1000 ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.12 0.05 15) 0%, oklch(0.04 0.02 15) 100%)",
      }}
      data-ocid="system_breach.overlay"
      role="alertdialog"
      aria-modal="true"
      aria-label="System Breach Alert"
    >
      {/* Red scanlines */}
      <div
        className="pointer-events-none absolute inset-0"
        role="presentation"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            oklch(0.4 0.25 22 / 0.08) 3px,
            oklch(0.4 0.25 22 / 0.08) 4px
          )`,
          animation: "scanlines-move 0.15s linear infinite",
        }}
      />

      {/* Flashing red border */}
      <div
        className="pointer-events-none absolute inset-0 border-4"
        role="presentation"
        style={{
          borderColor: "oklch(0.45 0.28 22)",
          animation: "border-flash 0.5s ease-in-out infinite",
        }}
      />

      {/* WARNING HEADER */}
      <div className="relative z-10 text-center mb-8">
        <div
          className="terminal-text mb-2"
          style={{
            color: "oklch(0.65 0.28 22)",
            fontSize: "0.7rem",
            letterSpacing: "0.4em",
            animation: "glitch-text 0.3s infinite",
          }}
        >
          ⚠ PARADIS MILITARY NETWORK ⚠
        </div>
        <h2
          className="cinematic-title"
          style={{
            fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
            color: "oklch(0.75 0.3 22)",
            textShadow:
              "0 0 30px oklch(0.5 0.3 22), 0 0 60px oklch(0.4 0.25 22 / 0.5)",
            animation: "glitch-text 0.4s infinite",
          }}
          data-ocid="system_breach.title"
        >
          UNAUTHORIZED ACCESS
          <br />
          DETECTED
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Breach log */}
        <div
          className="glass-panel p-4"
          style={{ borderColor: "oklch(0.45 0.28 22 / 0.4)" }}
        >
          <div
            className="terminal-text mb-3"
            style={{
              color: "oklch(0.65 0.28 22)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
            }}
          >
            &gt; BREACH LOG
          </div>
          <div className="space-y-1 max-h-48 overflow-hidden">
            {visibleLines.map((line) => (
              <div
                key={line}
                className="terminal-text text-xs"
                style={{
                  color: line.includes("CONTAINED")
                    ? "oklch(0.65 0.22 145)"
                    : "oklch(0.75 0.18 22)",
                  animation: "fade-in-line 0.2s ease-out forwards",
                  fontSize: "0.7rem",
                }}
              >
                {line}
              </div>
            ))}
            <span
              className="inline-block w-2 h-3 bg-current"
              style={{
                color: "oklch(0.65 0.28 22)",
                animation: "blink-cursor 0.7s step-end infinite",
              }}
            />
          </div>
        </div>

        {/* IP scroll feed */}
        <div
          className="glass-panel p-4"
          style={{ borderColor: "oklch(0.45 0.28 22 / 0.4)" }}
        >
          <div
            className="terminal-text mb-3"
            style={{
              color: "oklch(0.65 0.28 22)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
            }}
          >
            &gt; THREAT VECTORS IDENTIFIED
          </div>
          <div className="space-y-0.5 overflow-hidden max-h-48">
            {scrollingIPs.slice(-12).map((ip, i) => (
              <div
                key={`ip-${i}-${ip}`}
                className="terminal-text text-xs flex items-center gap-2"
                style={{ color: "oklch(0.6 0.2 22)", fontSize: "0.68rem" }}
              >
                <span style={{ color: "oklch(0.45 0.15 22)" }}>⬤</span>
                {ip}
                <span
                  className="ml-auto"
                  style={{ color: "oklch(0.75 0.25 22)", fontSize: "0.6rem" }}
                >
                  BLOCKED
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BREACH CONTAINED banner */}
      {phase === "contain" && (
        <div
          className="relative z-10 mt-8 text-center"
          style={{ animation: "slam-in 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
          data-ocid="system_breach.contained_banner"
        >
          <div
            className="cinematic-title"
            style={{
              fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
              color: "oklch(0.65 0.22 145)",
              textShadow:
                "0 0 20px oklch(0.5 0.2 145), 0 0 40px oklch(0.4 0.15 145 / 0.5)",
              letterSpacing: "0.15em",
            }}
          >
            ✓ BREACH CONTAINED
          </div>
          <p
            className="terminal-text mt-2"
            style={{
              color: "oklch(0.5 0.1 145)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
            }}
          >
            SYSTEM INTEGRITY RESTORED
          </p>
        </div>
      )}

      <style>{`
        @keyframes scanlines-move {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
        @keyframes border-flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes glitch-text {
          0%, 95%, 100% { transform: translate(0); clip-path: none; }
          96% { transform: translate(-2px, 1px); }
          97% { transform: translate(2px, -1px); clip-path: inset(10% 0 30% 0); }
          98% { transform: translate(-1px, 0); clip-path: inset(60% 0 10% 0); }
        }
        @keyframes fade-in-line {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slam-in {
          from { transform: scale(1.2); opacity: 0; filter: blur(4px); }
          to { transform: scale(1); opacity: 1; filter: blur(0); }
        }
      `}</style>
    </div>
  );
}
