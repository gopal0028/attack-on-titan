import { u as useStore, r as reactExports, j as jsxRuntimeExports } from "./index-B5x8QOC7.js";
const TYPING_TEXT = "Humanity is on the brink of extinction...";
const PHASE_TIMINGS = {
  preloader: 3e3,
  wall: 2e3,
  hero: 2500
};
function DustParticle({ index }) {
  const left = `${8 + index * 7.3 % 84}%`;
  const animDelay = `${index * 0.35 % 3}s`;
  const animDur = `${3.5 + index % 4}s`;
  const size = 1 + index % 3;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": "true",
      className: "absolute rounded-full pointer-events-none",
      style: {
        left,
        bottom: `${10 + index % 15}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: "oklch(0.82 0.06 55 / 0.55)",
        animation: `aot-dust ${animDur} ${animDelay} ease-out infinite`,
        willChange: "transform, opacity"
      }
    }
  );
}
function FogParticle({ index }) {
  const left = `${index * 13.7 % 100}%`;
  const top = `${index * 11.3 % 65}%`;
  const delay = `${index * 0.28 % 2}s`;
  const w = 90 + index % 130;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": "true",
      className: "absolute rounded-full pointer-events-none",
      style: {
        left,
        top,
        width: `${w}px`,
        height: `${w / 2}px`,
        background: "radial-gradient(ellipse, oklch(0.14 0.05 15 / 0.55) 0%, transparent 70%)",
        animation: `aot-fog ${5 + index % 4}s ${delay} ease-in-out infinite alternate`,
        willChange: "transform, opacity",
        filter: "blur(10px)"
      }
    }
  );
}
function WallSilhouette() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 1200 420",
      className: "w-full h-full",
      preserveAspectRatio: "xMidYMax slice",
      role: "img",
      "aria-label": "Silhouette of the Walls of Paradis",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Walls of Paradis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "aot-sky", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.07 0.02 235)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "55%", stopColor: "oklch(0.11 0.04 20)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.05 0.01 0)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "aot-sun", cx: "50%", cy: "0%", r: "80%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.60 0.14 58 / 0.14)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "transparent" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "1200", height: "420", fill: "url(#aot-sky)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "600", cy: "-30", rx: "620", ry: "320", fill: "url(#aot-sun)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "82", width: "1200", height: "338", fill: "#0a0a0a" }),
        Array.from({ length: 25 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: i * 48,
            y: 58,
            width: 32,
            height: 28,
            fill: "#0a0a0a"
          },
          `maria-x${i * 48}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "0",
            y: "88",
            width: "1200",
            height: "2",
            fill: "oklch(0.65 0.15 60 / 0.1)",
            style: { filter: "blur(1px)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "60", y: "138", width: "1080", height: "282", fill: "#070707" }),
        Array.from({ length: 21 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 60 + i * 51,
            y: 114,
            width: 34,
            height: 28,
            fill: "#070707"
          },
          `rose-x${60 + i * 51}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "60",
            y: "143",
            width: "1080",
            height: "2",
            fill: "oklch(0.65 0.15 60 / 0.07)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "165", y: "200", width: "870", height: "220", fill: "#040404" }),
        Array.from({ length: 17 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 165 + i * 51,
            y: 174,
            width: 36,
            height: 30,
            fill: "#040404"
          },
          `sina-x${165 + i * 51}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "165",
            y: "204",
            width: "870",
            height: "2",
            fill: "oklch(0.65 0.15 60 / 0.12)",
            style: { filter: "blur(1px)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M0 375 Q180 350 380 368 Q580 385 780 360 Q980 342 1200 370 L1200 420 L0 420 Z",
            fill: "#020202"
          }
        ),
        [210, 285, 370, 465, 540].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x, y: 345, width: 4, height: 20, fill: "#121212" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: x + 2, cy: 343, r: 3.5, fill: "#121212" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: `M${x - 1} 350 L${x - 6} 365 L${x + 2} 362 Z`,
              fill: "#0e0e0e"
            }
          )
        ] }, `soldier-${x}`))
      ]
    }
  );
}
function PhaseLabel({ phase }) {
  const labels = {
    preloader: "INITIALIZING",
    fog: "BREACH DETECTED",
    wall: "WALL PERIMETER",
    hero: "ENTERING SECTOR"
  };
  const label = labels[phase];
  if (!label) return null;
  const phaseNum = phase === "preloader" ? 1 : phase === "fog" ? 2 : phase === "wall" ? 3 : 4;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed top-5 left-5 z-[300] terminal-text text-foreground/30 text-xs tracking-widest flex items-center gap-2 pointer-events-none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
        "PHASE ",
        phaseNum,
        " / ",
        label
      ]
    }
  );
}
function LoadingBar({ progress }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "w-64 sm:w-80",
      "aria-label": `Loading: ${Math.round(progress)}%`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between terminal-text text-foreground/30 text-xs mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LOADING ENCRYPTED DATA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            Math.min(Math.round(progress), 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-foreground/10 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-y-0 left-0 bg-primary",
            style: {
              width: `${Math.min(progress, 100)}%`,
              boxShadow: "0 0 8px oklch(0.26 0.22 25 / 0.8), 0 0 18px oklch(0.26 0.22 25 / 0.4)",
              transition: "width 60ms linear"
            }
          }
        ) })
      ]
    }
  );
}
function IntroSequence() {
  const { setIntroComplete } = useStore();
  const [phase, setPhase] = reactExports.useState("preloader");
  const [loadProgress, setLoadProgress] = reactExports.useState(0);
  const [typedText, setTypedText] = reactExports.useState("");
  const [showSkip, setShowSkip] = reactExports.useState(false);
  const [screenShake, setScreenShake] = reactExports.useState(false);
  const [globalFadeOut, setGlobalFadeOut] = reactExports.useState(false);
  const [heroVisible, setHeroVisible] = reactExports.useState(false);
  const [titleVisible, setTitleVisible] = reactExports.useState(false);
  const [subtitleVisible, setSubtitleVisible] = reactExports.useState(false);
  const [ctaVisible, setCtaVisible] = reactExports.useState(false);
  const typingRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(null);
  const progressStart = reactExports.useRef(0);
  const completeIntro = reactExports.useCallback(() => {
    setGlobalFadeOut(true);
    setTimeout(() => setIntroComplete(true), 700);
  }, [setIntroComplete]);
  const handleSkip = reactExports.useCallback(() => {
    if (typingRef.current) clearTimeout(typingRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    completeIntro();
  }, [completeIntro]);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 2e3);
    return () => clearTimeout(t);
  }, []);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleSkip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSkip]);
  reactExports.useEffect(() => {
    if (phase !== "preloader") return;
    progressStart.current = performance.now();
    const duration = PHASE_TIMINGS.preloader;
    const tick = (now) => {
      const elapsed = now - progressStart.current;
      const pct = Math.min(elapsed / duration * 100, 100);
      setLoadProgress(pct);
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("fog");
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);
  reactExports.useEffect(() => {
    if (phase !== "fog") return;
    const shakeTimer = setTimeout(() => {
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 900);
    }, 600);
    let charIdx = 0;
    const type = () => {
      if (charIdx <= TYPING_TEXT.length) {
        setTypedText(TYPING_TEXT.slice(0, charIdx));
        charIdx++;
        typingRef.current = setTimeout(type, 55);
      } else {
        typingRef.current = setTimeout(() => setPhase("wall"), 1300);
      }
    };
    typingRef.current = setTimeout(type, 900);
    return () => {
      clearTimeout(shakeTimer);
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [phase]);
  reactExports.useEffect(() => {
    if (phase !== "wall") return;
    const t = setTimeout(() => setPhase("hero"), PHASE_TIMINGS.wall);
    return () => clearTimeout(t);
  }, [phase]);
  reactExports.useEffect(() => {
    if (phase !== "hero") return;
    setGlobalFadeOut(true);
    const t0 = setTimeout(() => {
      setGlobalFadeOut(false);
      setHeroVisible(true);
    }, 650);
    const t1 = setTimeout(() => setTitleVisible(true), 850);
    const t2 = setTimeout(() => setSubtitleVisible(true), 1450);
    const t3 = setTimeout(() => setCtaVisible(true), 1900);
    const t4 = setTimeout(() => {
      setPhase("done");
      completeIntro();
    }, PHASE_TIMINGS.hero + 600);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [phase, completeIntro]);
  if (phase === "done") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes aot-glitch {
          0%,86%,100% { opacity:1; transform:skewX(0); }
          87%          { opacity:.7; transform:skewX(-2deg) translateX(-3px); clip-path:inset(20% 0 30% 0); }
          88%          { opacity:1; transform:skewX(1deg) translateX(2px); }
          89%          { opacity:.85; transform:skewX(-0.5deg); clip-path:none; }
          90%          { opacity:1; transform:skewX(0); }
        }
        @keyframes aot-dust {
          0%   { transform:translateY(0) translateX(0); opacity:0; }
          18%  { opacity:.65; }
          80%  { opacity:.3; }
          100% { transform:translateY(-130px) translateX(18px); opacity:0; }
        }
        @keyframes aot-fog {
          0%   { transform:translateX(-12px) scale(1);   opacity:.25; }
          100% { transform:translateX(12px)  scale(1.12); opacity:.6; }
        }
        @keyframes aot-shake {
          0%,100% { transform:translate(0,0) rotate(0deg); }
          12%     { transform:translate(-5px,3px) rotate(-0.3deg); }
          25%     { transform:translate(5px,-4px) rotate(0.3deg); }
          37%     { transform:translate(-4px,5px) rotate(-0.2deg); }
          50%     { transform:translate(4px,-3px) rotate(0.2deg); }
          62%     { transform:translate(-3px,4px) rotate(-0.1deg); }
          75%     { transform:translate(3px,-2px) rotate(0.1deg); }
          87%     { transform:translate(-2px,2px) rotate(0); }
        }
        @keyframes aot-wall-zoom {
          0%   { transform:scale(1.0); }
          100% { transform:scale(1.09); }
        }
        @keyframes aot-slam {
          0%   { transform:scale(1.5); filter:blur(14px); opacity:0; }
          55%  { transform:scale(0.97); filter:blur(0); opacity:1; }
          100% { transform:scale(1); filter:blur(0); opacity:1; }
        }
        @keyframes aot-slide-up {
          0%   { transform:translateY(28px); opacity:0; }
          100% { transform:translateY(0);    opacity:1; }
        }
        @keyframes aot-fade-in {
          0%   { opacity:0; }
          100% { opacity:1; }
        }
        @keyframes aot-cursor {
          0%,100% { opacity:1; }
          50%     { opacity:0; }
        }
        @keyframes aot-grain {
          0%  { transform:translate(0,0); }
          20% { transform:translate(-3%,-2%); }
          40% { transform:translate(2%,-4%); }
          60% { transform:translate(-4%,3%); }
          80% { transform:translate(3%,-1%); }
          100%{ transform:translate(0,0); }
        }
        @keyframes aot-red-pulse {
          0%,100% { text-shadow:0 0 30px oklch(0.26 0.22 25 / .45),0 0 60px oklch(0.26 0.22 25 / .2); }
          50%     { text-shadow:0 0 50px oklch(0.26 0.22 25 / .7),0 0 90px oklch(0.26 0.22 25 / .35); }
        }
        @keyframes aot-light-ray {
          0%   { opacity:0; }
          60%  { opacity:.7; }
          100% { opacity:.3; }
        }
        @keyframes aot-vignette {
          0%,100% { box-shadow:inset 0 0 130px rgba(0,0,0,.9),inset 0 0 65px rgba(80,0,0,.22); }
          50%     { box-shadow:inset 0 0 130px rgba(0,0,0,.95),inset 0 0 85px rgba(100,0,0,.38); }
        }
        .aot-grain-layer::after {
          content:'';
          position:absolute;
          inset:-50%;
          width:200%;
          height:200%;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
          background-size:180px 180px;
          animation:aot-grain 0.35s steps(1) infinite;
          pointer-events:none;
          z-index:2;
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-[100] overflow-hidden select-none aot-grain-layer",
        style: {
          background: "#000",
          animation: screenShake ? "aot-shake 0.9s ease-in-out" : "none",
          willChange: "transform"
        },
        "aria-label": "Cinematic intro sequence",
        "aria-live": "polite",
        "data-ocid": "intro.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "absolute inset-0 pointer-events-none z-[5]",
              style: {
                animation: "aot-vignette 4.5s ease-in-out infinite"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": "true",
              className: "absolute inset-0 pointer-events-none z-[80]",
              style: {
                background: "#000",
                opacity: globalFadeOut ? 1 : 0,
                transition: "opacity 650ms ease-in-out"
              }
            }
          ),
          phase === "preloader" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute inset-0 flex flex-col items-center justify-center z-[10] gap-10",
              style: { animation: "aot-fade-in 0.8s ease-out forwards" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "terminal-text text-foreground/30 text-xs tracking-[0.45em]",
                    style: { animation: "aot-fade-in 0.7s 0.4s ease-out both" },
                    children: "PARADIS INTELLIGENCE ARCHIVE"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "cinematic-title text-foreground text-center",
                    style: {
                      fontSize: "clamp(2.4rem, 8vw, 6.5rem)",
                      letterSpacing: "0.14em",
                      animation: "aot-fade-in 0.9s 0.2s ease-out both, aot-glitch 4s 1.5s ease-in-out infinite, aot-red-pulse 2.5s 1s ease-in-out infinite"
                    },
                    "data-ocid": "intro.title",
                    children: "ATTACK ON TITAN"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "terminal-text text-accent text-xs tracking-[0.35em]",
                    style: { animation: "aot-fade-in 0.7s 0.9s ease-out both" },
                    children: "━━━ CLASSIFIED DOSSIER ━━━"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { animation: "aot-slide-up 0.7s 0.6s ease-out both" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingBar, { progress: loadProgress }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "terminal-text text-foreground/20 text-xs tracking-widest animate-pulse",
                    style: { animation: "aot-fade-in 0.6s 1s ease-out both" },
                    children: "ACCESSING MILITARY DATABASE..."
                  }
                )
              ]
            }
          ),
          phase === "fog" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-[10]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "aria-hidden": "true",
                className: "absolute inset-0",
                style: {
                  background: "radial-gradient(ellipse at 50% 65%, oklch(0.17 0.12 18 / 0.85) 0%, oklch(0.07 0.03 12 / 0.92) 55%, #000 100%)",
                  animation: "aot-fade-in 1.8s ease-out forwards"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true", className: "absolute inset-0", children: [
              "f0",
              "f1",
              "f2",
              "f3",
              "f4",
              "f5",
              "f6",
              "f7",
              "f8",
              "f9",
              "f10",
              "f11",
              "f12",
              "f13",
              "f14",
              "f15"
            ].map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FogParticle, { index: i }, id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-6 px-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "inline-flex items-center gap-2 px-4 py-1.5 border border-primary/60",
                  style: {
                    animation: "aot-fade-in 0.6s ease-out forwards",
                    boxShadow: "0 0 12px oklch(0.26 0.22 25 / 0.35)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-2 h-2 rounded-full bg-primary",
                        style: {
                          animation: "aot-red-pulse 0.9s ease-in-out infinite"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "terminal-text text-primary text-xs tracking-widest", children: "EMERGENCY BROADCAST — WALL MARIA FALLEN" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "cinematic-title text-foreground/90 text-center max-w-2xl",
                  style: {
                    fontSize: "clamp(1.15rem, 3.5vw, 2rem)",
                    letterSpacing: "0.04em",
                    lineHeight: 1.45,
                    fontStyle: "italic",
                    minHeight: "3em",
                    textShadow: "0 0 25px oklch(0.26 0.22 25 / 0.4)",
                    animation: "aot-fade-in 0.5s 0.3s ease-out both"
                  },
                  "aria-live": "polite",
                  "data-ocid": "intro.typing_text",
                  children: [
                    typedText,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "inline-block w-0.5 h-[0.9em] bg-primary align-middle ml-0.5",
                        style: { animation: "aot-cursor 0.7s step-start infinite" }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "terminal-text text-foreground/25 text-xs tracking-widest",
                  style: { animation: "aot-fade-in 0.5s 1s ease-out both" },
                  children: "— SURVEY CORPS EMERGENCY LOG, YEAR 845 —"
                }
              )
            ] })
          ] }),
          phase === "wall" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-[10]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "aria-hidden": "true",
                className: "absolute inset-0",
                style: {
                  background: "linear-gradient(to bottom, oklch(0.06 0.025 235) 0%, oklch(0.10 0.045 20) 55%, oklch(0.04 0.01 0) 100%)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "aria-hidden": "true",
                className: "absolute inset-0",
                style: {
                  background: "radial-gradient(ellipse at 50% -5%, oklch(0.60 0.14 58 / 0.11) 0%, transparent 60%)",
                  animation: "aot-light-ray 2s ease-out forwards"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "aria-hidden": "false",
                className: "absolute inset-0 flex items-end",
                style: {
                  animation: "aot-wall-zoom 8s ease-in-out forwards",
                  willChange: "transform"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(WallSilhouette, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "aria-hidden": "true",
                className: "absolute bottom-0 left-0 right-0 h-52 pointer-events-none",
                style: {
                  background: "linear-gradient(to top, oklch(0.07 0.025 15 / 0.75), transparent)",
                  filter: "blur(6px)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "aria-hidden": "true",
                className: "absolute inset-0 overflow-hidden",
                children: [
                  "d0",
                  "d1",
                  "d2",
                  "d3",
                  "d4",
                  "d5",
                  "d6",
                  "d7",
                  "d8",
                  "d9",
                  "d10",
                  "d11",
                  "d12",
                  "d13",
                  "d14",
                  "d15",
                  "d16",
                  "d17",
                  "d18",
                  "d19",
                  "d20",
                  "d21",
                  "d22",
                  "d23",
                  "d24",
                  "d25",
                  "d26",
                  "d27"
                ].map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DustParticle, { index: i }, id))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-14 left-0 right-0 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "terminal-text text-foreground/40 text-xs tracking-[0.5em] uppercase",
                style: { animation: "aot-slide-up 1s 0.4s ease-out both" },
                children: "YEAR 845 — SHIGANSHINA DISTRICT, WALL MARIA"
              }
            ) })
          ] }),
          phase === "hero" && heroVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-[10]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "aria-hidden": "true",
                className: "absolute inset-0",
                style: {
                  background: "radial-gradient(ellipse at 50% 42%, oklch(0.16 0.11 20) 0%, oklch(0.07 0.025 12) 55%, #000 100%)",
                  animation: "aot-fade-in 0.5s ease-out forwards"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "aria-hidden": "true",
                className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                style: { opacity: 0.035 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    viewBox: "0 0 200 200",
                    className: "w-80 h-80 sm:w-96 sm:h-96",
                    role: "img",
                    "aria-label": "Wings of Freedom symbol",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Wings of Freedom symbol" }),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "text",
                        {
                          x: "50%",
                          y: "52%",
                          textAnchor: "middle",
                          dominantBaseline: "middle",
                          fontSize: "168",
                          fill: "white",
                          children: "⚔"
                        }
                      )
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-5 px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "terminal-text text-primary/80 text-xs tracking-[0.5em]",
                  style: { animation: "aot-fade-in 0.5s 0.1s ease-out both" },
                  children: "▶ INITIATING ARCHIVE ACCESS"
                }
              ),
              titleVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "cinematic-title text-foreground text-center",
                  style: {
                    fontSize: "clamp(2.6rem, 9.5vw, 7.5rem)",
                    letterSpacing: "0.13em",
                    textShadow: "0 0 60px oklch(0.26 0.22 25 / 0.65), 0 0 120px oklch(0.26 0.22 25 / 0.3)",
                    animation: "aot-slam 0.65s cubic-bezier(0.22,1,0.36,1) forwards"
                  },
                  "data-ocid": "intro.hero_title",
                  children: "ATTACK ON TITAN"
                }
              ),
              subtitleVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.8rem, 1.8vw, 1.15rem)",
                    color: "oklch(0.65 0.15 60)",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    animation: "aot-slide-up 0.75s ease-out forwards"
                  },
                  "data-ocid": "intro.hero_subtitle",
                  children: "The Last Stand of Humanity"
                }
              ),
              subtitleVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: { animation: "aot-fade-in 0.6s 0.2s ease-out both" },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-28 h-px mx-auto",
                      style: { background: "oklch(0.65 0.15 60 / 0.45)" }
                    }
                  )
                }
              ),
              ctaVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-wrap gap-4 justify-center mt-2",
                  style: { animation: "aot-slide-up 0.65s ease-out forwards" },
                  "data-ocid": "intro.cta_group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "px-8 py-3 border border-primary bg-primary/15 text-foreground cinematic-title text-sm tracking-[0.25em] hover:bg-primary/35 transition-smooth glow-red",
                        onClick: completeIntro,
                        "data-ocid": "intro.enter_button",
                        "aria-label": "Enter the Archive",
                        children: "ENTER ARCHIVE"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "px-8 py-3 border border-foreground/20 text-foreground/55 cinematic-title text-sm tracking-[0.25em] hover:border-accent hover:text-accent transition-smooth",
                        onClick: completeIntro,
                        "data-ocid": "intro.explore_button",
                        "aria-label": "Explore the world",
                        children: "EXPLORE WORLD"
                      }
                    )
                  ]
                }
              ),
              ctaVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "terminal-text text-foreground/18 text-xs tracking-widest mt-4",
                  style: { animation: "aot-fade-in 0.6s 0.5s ease-out both" },
                  "aria-hidden": "true",
                  children: "■ PARADIS INTELLIGENCE ARCHIVE — CLASSIFIED ■"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PhaseLabel, { phase }),
          showSkip && phase !== "hero" && (phase === "preloader" || phase === "fog" || phase === "wall") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "fixed bottom-8 right-8 z-[200] terminal-text text-foreground/35 text-xs tracking-widest border border-foreground/12 px-4 py-2 hover:text-foreground/65 hover:border-foreground/30 transition-smooth",
              onClick: handleSkip,
              "data-ocid": "intro.skip_button",
              "aria-label": "Skip the intro sequence",
              children: "SKIP INTRO ▶"
            }
          )
        ]
      }
    )
  ] });
}
export {
  IntroSequence as default
};
