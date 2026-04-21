import { u as useStore, r as reactExports, j as jsxRuntimeExports } from "./index-B5x8QOC7.js";
const STATS_TICKER = [
  "104th Cadet Corps — Year 850",
  "Survey Corps: 30% Survival Rate",
  "Titan Threat Level: CRITICAL",
  "Wall Maria: FALLEN",
  "Wall Rose: SECURED",
  "Wall Sina: OPERATIONAL",
  "Colossal Titan — Last Seen: Trost",
  "Active Titan Shifters: CLASSIFIED"
];
function HeroSection() {
  const { storyModeEnabled } = useStore();
  const [showSubtitle, setShowSubtitle] = reactExports.useState(false);
  const [showCTA, setShowCTA] = reactExports.useState(false);
  const [tickerIndex, setTickerIndex] = reactExports.useState(0);
  const [tickerVisible, setTickerVisible] = reactExports.useState(true);
  const sectionRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 600);
    const t2 = setTimeout(() => setShowCTA(true), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIndex((i) => (i + 1) % STATS_TICKER.length);
        setTickerVisible(true);
      }, 400);
    }, 3e3);
    return () => clearInterval(interval);
  }, []);
  const scrollToSection = (id) => {
    var _a;
    (_a = document.getElementById(`section-${id}`)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref: sectionRef,
      id: "section-home",
      "data-section": "home",
      className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
      "data-ocid": "hero.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-0",
            "data-parallax": "0.3",
            style: {
              background: `
            radial-gradient(ellipse at 50% 0%, oklch(0.18 0.10 15 / 0.9) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 60%, oklch(0.12 0.06 22 / 0.5) 0%, transparent 45%),
            radial-gradient(ellipse at 20% 80%, oklch(0.12 0.06 25 / 0.6) 0%, transparent 50%),
            linear-gradient(to bottom, oklch(0.04 0 0) 0%, oklch(0.08 0.02 15) 50%, oklch(0.04 0 0) 100%)
          `,
              willChange: "transform"
            },
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-[1] pointer-events-none",
            role: "presentation",
            style: {
              background: `
            linear-gradient(135deg, oklch(0.30 0.12 22 / 0.06) 0%, transparent 50%),
            linear-gradient(225deg, oklch(0.30 0.12 22 / 0.04) 0%, transparent 50%)
          `,
              animation: "drift-light 8s ease-in-out infinite alternate"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 left-0 right-0 z-[1]",
            "data-parallax": "0.15",
            style: { willChange: "transform" },
            role: "presentation",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                viewBox: "0 0 1440 320",
                preserveAspectRatio: "xMidYMax slice",
                className: "w-full",
                role: "img",
                "aria-label": "Wall silhouette",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Walls of Paradis silhouette" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "wallGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.06 0.01 15)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.04 0 0)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "wallTopGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.20 0.06 20 / 0.4)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "transparent" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "170", width: "1440", height: "150", fill: "url(#wallGrad)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: "0",
                      y: "160",
                      width: "1440",
                      height: "20",
                      fill: "url(#wallTopGrad)"
                    }
                  ),
                  Array.from({ length: 72 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: i * 20 + 2,
                      y: "148",
                      width: "14",
                      height: "26",
                      fill: "oklch(0.06 0.01 15)",
                      rx: "1"
                    },
                    `b1-x${i * 20 + 2}`
                  )),
                  Array.from({ length: 36 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: i * 40 + 10,
                      y: "135",
                      width: "22",
                      height: "18",
                      fill: "oklch(0.05 0 0)",
                      rx: "1"
                    },
                    `b2-x${i * 40 + 10}`
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: "0",
                      y: "100",
                      width: "1440",
                      height: "50",
                      fill: "oklch(0.04 0 0 / 0.6)"
                    }
                  ),
                  Array.from({ length: 36 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "rect",
                    {
                      x: i * 40,
                      y: "88",
                      width: "26",
                      height: "18",
                      fill: "oklch(0.04 0 0 / 0.5)"
                    },
                    `b3-x${i * 40}`
                  )),
                  [185, 205, 225, 245, 270, 295].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: "0",
                      y1: y,
                      x2: "1440",
                      y2: y,
                      stroke: "oklch(0.09 0.01 15)",
                      strokeWidth: "1"
                    },
                    `line-${y}`
                  )),
                  [100, 300, 550, 800, 1050, 1250].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `translate(${x}, 148)`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        x: "1",
                        y: "-16",
                        width: "3",
                        height: "14",
                        fill: "oklch(0.08 0 0)",
                        rx: "1"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "2.5", cy: "-18", r: "3", fill: "oklch(0.08 0 0)" })
                  ] }, `soldier-${x}`))
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-[1] flex items-center justify-center pointer-events-none",
            role: "presentation",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                viewBox: "0 0 100 80",
                fill: "oklch(0.26 0.22 25 / 0.04)",
                className: "w-[60vw] max-w-[600px]",
                role: "img",
                "aria-label": "Survey Corps Wings watermark",
                style: { animation: "slow-pulse 6s ease-in-out infinite" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Survey Corps Wings of Freedom" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M48 40 C30 30, 8 20, 5 15 C8 22, 15 35, 20 45 C12 40, 5 38, 2 42 C8 44, 18 48, 25 55 C15 52, 5 55, 3 60 C10 60, 22 60, 30 62 L48 40Z" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M52 40 C70 30, 92 20, 95 15 C92 22, 85 35, 80 45 C88 40, 95 38, 98 42 C92 44, 82 48, 75 55 C85 52, 95 55, 97 60 C90 60, 78 60, 70 62 L52 40Z" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "50", cy: "42", rx: "5", ry: "8" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M46 50 L50 65 L54 50Z" })
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-[2] text-center px-4 sm:px-8 max-w-5xl mx-auto pt-24 pb-52", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-primary/40 bg-primary/10 rounded-sm",
              style: { animation: "slide-up 0.6s ease-out forwards" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "terminal-text text-primary text-xs tracking-[0.3em]", children: "PROPERTY OF THE ELDIAN MILITARY — RESTRICTED ACCESS" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h1",
            {
              className: "cinematic-title text-5xl sm:text-7xl lg:text-[6rem] xl:text-[7rem] leading-none mb-4 text-foreground",
              style: {
                textShadow: "0 0 60px oklch(0.26 0.22 25 / 0.4), 0 0 120px oklch(0.26 0.22 25 / 0.2)",
                animation: "slam-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both"
              },
              "data-ocid": "hero.title",
              children: [
                "ATTACK",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "ON TITAN"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `transition-all duration-700 ${showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "cinematic-title text-lg sm:text-2xl lg:text-3xl text-foreground/80 tracking-[0.25em] mb-3",
                    style: {
                      textShadow: "0 0 30px oklch(0.26 0.22 25 / 0.25)"
                    },
                    children: "THE LAST STAND OF HUMANITY"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 my-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-primary/60" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "terminal-text text-primary text-xs tracking-widest", children: "✦ CLASSIFIED DOSSIER ✦" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-primary/60" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "inline-flex items-center gap-3 px-5 py-2 mt-2 border border-border/60 bg-card/40 backdrop-blur-sm rounded-sm",
                    style: { minWidth: "300px" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0",
                          style: { boxShadow: "0 0 6px oklch(0.26 0.22 25)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `terminal-text text-xs tracking-widest transition-all duration-300 ${tickerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`,
                          style: { color: "oklch(0.75 0.12 22)" },
                          "data-ocid": "hero.stats_ticker",
                          children: STATS_TICKER[tickerIndex]
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          storyModeEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "terminal-text text-muted-foreground text-sm mt-6 italic animate-fade-in", children: '"In this world, every heartbeat is borrowed time."' }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 transition-all duration-700 ${showCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
              "data-ocid": "hero.cta_group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => scrollToSection("characters"),
                    className: "group flex items-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground cinematic-title text-sm tracking-widest hover:bg-primary/90 transition-all duration-200 glow-red",
                    "data-ocid": "hero.enter_walls_cta",
                    "data-interactive": true,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ENTER THE WALLS" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-hover:translate-x-1 transition-transform duration-200", children: "→" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => scrollToSection("timeline"),
                    className: "flex items-center gap-3 px-8 py-3.5 border border-accent/60 text-accent cinematic-title text-sm tracking-widest hover:bg-accent/10 transition-all duration-200 glow-gold",
                    "data-ocid": "hero.timeline_cta",
                    "data-interactive": true,
                    children: "VIEW TIMELINE"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-16 flex flex-col items-center gap-2",
              style: { animation: "bounce-slow 2s ease-in-out infinite" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "terminal-text text-muted-foreground/50 text-xs tracking-widest", children: "SCROLL TO EXPLORE" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    width: "12",
                    height: "24",
                    viewBox: "0 0 12 24",
                    fill: "none",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: "4",
                          y: "1",
                          width: "4",
                          height: "8",
                          rx: "2",
                          stroke: "oklch(0.5 0 0)",
                          strokeWidth: "1.5",
                          fill: "none"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "6", cy: "4", r: "1.5", fill: "oklch(0.5 0 0)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "animateTransform",
                        {
                          attributeName: "transform",
                          type: "translate",
                          values: "0 0; 0 3; 0 0",
                          dur: "1.5s",
                          repeatCount: "indefinite"
                        }
                      ) })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-[3] pointer-events-none",
            role: "presentation",
            style: {
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.025) 2px, oklch(0 0 0 / 0.025) 4px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` })
      ]
    }
  );
}
export {
  HeroSection as default
};
