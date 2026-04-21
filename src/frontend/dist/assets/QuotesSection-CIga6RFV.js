import { r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion } from "./index-B5x8QOC7.js";
import { C as ChevronLeft } from "./chevron-left-PB_Pw5H8.js";
import { C as ChevronRight } from "./chevron-right-CG7O-DCs.js";
const QUOTES = [
  {
    text: "If you win, you live. If you lose, you die. If you don't fight, you can't win!",
    author: "Eren Yeager",
    arc: "Battle of Trost",
    bgGradient: "radial-gradient(ellipse at 60% 40%, oklch(0.18 0.14 22) 0%, oklch(0.06 0.04 15) 60%)",
    accentColor: "oklch(0.56 0.25 18)"
  },
  {
    text: "The world is merciless, and it's also very beautiful.",
    author: "Mikasa Ackerman",
    arc: "Trost Arc",
    bgGradient: "radial-gradient(ellipse at 40% 50%, oklch(0.14 0.06 220) 0%, oklch(0.06 0 0) 65%)",
    accentColor: "oklch(0.55 0.12 220)"
  },
  {
    text: "I want to see and understand the world outside. I don't want to die inside these walls without knowing what's out there.",
    author: "Eren Yeager",
    arc: "Before the Fall",
    bgGradient: "radial-gradient(ellipse at 50% 60%, oklch(0.16 0.1 20) 0%, oklch(0.05 0.02 15) 65%)",
    accentColor: "oklch(0.50 0.22 22)"
  },
  {
    text: "No matter how messed up things get, you can always figure out the best solution.",
    author: "Erwin Smith",
    arc: "Return to Shiganshina",
    bgGradient: "radial-gradient(ellipse at 55% 35%, oklch(0.15 0.05 55) 0%, oklch(0.06 0.01 30) 65%)",
    accentColor: "oklch(0.60 0.14 55)"
  },
  {
    text: "The lesson you need to learn is that there are some things in this world you just can't change no matter how hard you try.",
    author: "Armin Arlert",
    arc: "Marley Arc",
    bgGradient: "radial-gradient(ellipse at 45% 55%, oklch(0.14 0.06 60) 0%, oklch(0.06 0.02 40) 65%)",
    accentColor: "oklch(0.62 0.13 60)"
  },
  {
    text: "I'll kill every last titan and walk out of here with my head held high.",
    author: "Levi Ackerman",
    arc: "Female Titan Arc",
    bgGradient: "radial-gradient(ellipse at 50% 40%, oklch(0.12 0.04 200) 0%, oklch(0.05 0.01 180) 65%)",
    accentColor: "oklch(0.50 0.10 200)"
  },
  {
    text: "If you don't fight, you can't win. No matter what's in front of you, fight with everything you have.",
    author: "Eren Yeager",
    arc: "War for Paradis",
    bgGradient: "radial-gradient(ellipse at 60% 50%, oklch(0.20 0.18 18) 0%, oklch(0.06 0.05 12) 65%)",
    accentColor: "oklch(0.52 0.24 18)"
  },
  {
    text: "We are born into this world and we live in it. If that is so, then we have the right to fight for our freedom.",
    author: "Ymir Fritz",
    arc: "Founding Titan Arc",
    bgGradient: "radial-gradient(ellipse at 40% 60%, oklch(0.14 0.08 30) 0%, oklch(0.06 0.03 20) 65%)",
    accentColor: "oklch(0.55 0.18 30)"
  },
  {
    text: "I don't like the idea of using someone, but sometimes it's the only way to move forward.",
    author: "Hange Zoë",
    arc: "The Uprising",
    bgGradient: "radial-gradient(ellipse at 55% 45%, oklch(0.16 0.07 80) 0%, oklch(0.06 0.02 60) 65%)",
    accentColor: "oklch(0.58 0.14 80)"
  },
  {
    text: "Everything I've done, I did for you. So that the children of Paradis could have a future.",
    author: "Zeke Yeager",
    arc: "War for Paradis",
    bgGradient: "radial-gradient(ellipse at 50% 50%, oklch(0.14 0.05 90) 0%, oklch(0.06 0.01 70) 65%)",
    accentColor: "oklch(0.56 0.12 90)"
  },
  {
    text: "On that day, mankind received a grim reminder. We lived in fear of the titans and were disgraced to live in these cages we called walls.",
    author: "Narrator",
    arc: "Fall of Shiganshina",
    bgGradient: "radial-gradient(ellipse at 50% 50%, oklch(0.16 0.12 20) 0%, oklch(0.04 0.02 10) 60%)",
    accentColor: "oklch(0.48 0.20 20)"
  },
  {
    text: "Dedicate your hearts.",
    author: "Erwin Smith",
    arc: "Survey Corps Motto",
    bgGradient: "radial-gradient(ellipse at 50% 40%, oklch(0.18 0.08 50) 0%, oklch(0.06 0.02 35) 65%)",
    accentColor: "oklch(0.65 0.15 50)"
  }
];
const glitchIn = {
  opacity: [0, 0.8, 0.2, 1, 0.6, 1],
  x: [0, -4, 6, -2, 3, 0],
  filter: [
    "blur(4px) brightness(2)",
    "blur(0px) brightness(1.5)",
    "blur(2px) brightness(0.8)",
    "blur(1px) brightness(1.2)",
    "blur(0px) brightness(1)"
  ],
  transition: { duration: 0.45 }
};
const glitchOut = {
  opacity: [1, 0.6, 0.1, 0.5, 0],
  x: [0, 5, -3, 8, 0],
  filter: [
    "blur(0px) brightness(1)",
    "blur(1px) brightness(1.5)",
    "blur(3px) brightness(0.5)",
    "blur(6px) brightness(0)"
  ],
  transition: { duration: 0.3 }
};
function QuotesSection() {
  const [index, setIndex] = reactExports.useState(0);
  const [isTransitioning, setIsTransitioning] = reactExports.useState(false);
  const autoRef = reactExports.useRef(null);
  const quote = QUOTES[index];
  const go = reactExports.useCallback(
    (next) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((next + QUOTES.length) % QUOTES.length);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 320);
    },
    [isTransitioning]
  );
  const goNext = reactExports.useCallback(() => go(index + 1), [go, index]);
  const goPrev = reactExports.useCallback(() => go(index - 1), [go, index]);
  reactExports.useEffect(() => {
    autoRef.current = setInterval(goNext, 5e3);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [goNext]);
  const pauseAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
  };
  const resumeAuto = () => {
    autoRef.current = setInterval(goNext, 5e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "quotes",
      "data-section": "quotes",
      "data-ocid": "quotes.section",
      className: "relative min-h-[70vh] flex flex-col items-center justify-center py-24 overflow-hidden",
      onMouseEnter: pauseAuto,
      onMouseLeave: resumeAuto,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 1.2 },
            className: "absolute inset-0 z-0",
            style: { background: quote.bgGradient },
            "aria-hidden": "true"
          },
          `bg-${index}`
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-0 grain-overlay opacity-50 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-0 pointer-events-none",
            style: { boxShadow: "inset 0 0 120px rgba(0,0,0,0.85)" },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isTransitioning && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: [0, 0.5, 0, 0.35, 0] },
            exit: { opacity: 0 },
            transition: { duration: 0.4 },
            className: "absolute inset-0 pointer-events-none z-10",
            style: {
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.26 0.22 25 / 0.07) 2px, oklch(0.26 0.22 25 / 0.07) 4px)"
            },
            "aria-hidden": "true"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-3xl mx-auto px-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "flex items-center justify-center gap-3 mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px flex-1 max-w-20",
                    style: { background: quote.accentColor, opacity: 0.5 }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "terminal-text text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Field Intelligence Logs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px flex-1 max-w-20",
                    style: { background: quote.accentColor, opacity: 0.5 }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: glitchIn,
              animate: { opacity: 1, x: 0, filter: "blur(0px) brightness(1)" },
              exit: glitchOut,
              "data-ocid": "quotes.quote_card",
              children: [
                quote.arc && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "terminal-text text-[11px] uppercase tracking-[0.3em] mb-6",
                    style: { color: quote.accentColor },
                    children: [
                      "[",
                      quote.arc,
                      "]"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "font-display text-xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-8", children: [
                  "“",
                  quote.text,
                  "”"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-12 h-0.5 mb-3",
                      style: { background: quote.accentColor }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-display text-lg font-bold",
                      style: { color: quote.accentColor },
                      children: [
                        "— ",
                        quote.author
                      ]
                    }
                  )
                ] })
              ]
            },
            index
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-8 mt-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: goPrev,
                className: "p-3 rounded-full glass-panel border border-border/30 text-muted-foreground hover:text-foreground transition-all hover:scale-110",
                "aria-label": "Previous quote",
                "data-ocid": "quotes.prev_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 20 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center gap-0.5",
                "data-ocid": "quotes.counter",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "terminal-text text-sm font-bold",
                      style: { color: quote.accentColor },
                      children: String(index + 1).padStart(2, "0")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border/40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "terminal-text text-xs text-muted-foreground", children: String(QUOTES.length).padStart(2, "0") })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: goNext,
                className: "p-3 rounded-full glass-panel border border-border/30 text-muted-foreground hover:text-foreground transition-all hover:scale-110",
                "aria-label": "Next quote",
                "data-ocid": "quotes.next_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex justify-center gap-1.5 mt-6",
              "data-ocid": "quotes.progress",
              children: QUOTES.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => go(i),
                  className: "rounded-full transition-all duration-300",
                  style: {
                    width: i === index ? 20 : 6,
                    height: 6,
                    background: i === index ? quote.accentColor : "oklch(var(--muted))"
                  },
                  "aria-label": `Go to quote ${i + 1}`,
                  "data-ocid": `quotes.dot.${i + 1}`
                },
                q.author + String(i)
              ))
            }
          )
        ] })
      ]
    }
  );
}
export {
  QuotesSection as default
};
