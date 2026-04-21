import { r as reactExports, j as jsxRuntimeExports, m as motion, A as AnimatePresence } from "./index-B5x8QOC7.js";
const LOCATIONS = [
  {
    id: "shiganshina",
    name: "Shiganshina District",
    type: "district",
    x: 390,
    y: 458,
    faction: "Paradis",
    status: "Reclaimed",
    description: "The southernmost gate district of Wall Maria. Birthplace of Eren Yeager and site of the first Titan breach in Year 845.",
    events: [
      "Fall of Wall Maria (Year 845)",
      "Battle of Shiganshina (Year 850)",
      "Sealing of Wall Maria"
    ]
  },
  {
    id: "trost",
    name: "Trost District",
    type: "district",
    x: 448,
    y: 330,
    faction: "Paradis",
    status: "Secured",
    description: "A major district on Wall Rose's southern face. Site of Eren's first transformation and the first major defensive victory against Titans.",
    events: [
      "Battle of Trost District",
      "Eren's Titan Debut",
      "First Vertical Maneuvering Engagement"
    ]
  },
  {
    id: "stohess",
    name: "Stohess District",
    type: "district",
    x: 524,
    y: 222,
    faction: "Paradis",
    status: "Damaged",
    description: "An affluent district of Wall Sina. Site of the battle against the Female Titan — Annie Leonhart.",
    events: [
      "Female Titan Battle",
      "Annie Leonhart Captured",
      "Severe Civilian Casualties"
    ]
  },
  {
    id: "ehrmich",
    name: "Ehrmich District",
    type: "district",
    x: 312,
    y: 272,
    faction: "Paradis",
    status: "Evacuated",
    description: "A district of Wall Rose. Evacuated during the Wall Rose breach. Temporary refugee camp was established here.",
    events: [
      "Wall Rose Breach Alert",
      "Mass Civilian Evacuation",
      "Titan Sweep Operation"
    ]
  },
  {
    id: "utgard",
    name: "Utgard Castle",
    type: "fortress",
    x: 368,
    y: 388,
    faction: "Neutral",
    status: "Destroyed",
    description: "An abandoned fortress between Walls Maria and Rose. Scene of a desperate night battle where cadets faced Titans without vertical maneuvering gear.",
    events: [
      "Night Battle at Utgard",
      "Death of Nanaba & Gelgar",
      "Beast Titan First Appearance"
    ]
  },
  {
    id: "reiss-cave",
    name: "Reiss Cave",
    type: "landmark",
    x: 476,
    y: 228,
    faction: "Royal Government",
    status: "Collapsed",
    description: "A hidden underground chapel within Wall Sina. Held the secret of the Founding Titan and the Reiss royal family's true power.",
    events: [
      "Rod Reiss Reveals the Truth",
      "Historia Crowned Queen",
      "Eren Gains Founding Titan Access"
    ]
  },
  {
    id: "fort-salta",
    name: "Fort Salta",
    type: "fortress",
    x: 762,
    y: 148,
    faction: "Marley",
    status: "Captured",
    description: "A Marleyan military airbase used for airship operations. Site of the Survey Corps' daring airship raid into Marley.",
    events: [
      "Survey Corps Airship Raid",
      "Thunder Spear Assault",
      "Escape from Marley"
    ]
  },
  {
    id: "liberio",
    name: "Liberio",
    type: "territory",
    x: 792,
    y: 218,
    faction: "Marley",
    status: "Besieged",
    description: "An Eldian internment zone inside Marley. Site of the Survey Corps' devastating attack during the Marley arc.",
    events: [
      "Marley Festival Attack",
      "Warhammer Titan Battle",
      "Survey Corps Full Assault"
    ]
  },
  {
    id: "marley-capital",
    name: "Marley (Territory)",
    type: "territory",
    x: 830,
    y: 290,
    faction: "Marley",
    status: "At War",
    description: "The dominant nation on the mainland continent. Controls multiple Titan Shifters and has waged war against Eldians for generations.",
    events: [
      "Marleyan Military Campaign",
      "Titan Shifter Program",
      "Declaration of War vs. Paradis"
    ]
  },
  {
    id: "odiha",
    name: "Odiha",
    type: "territory",
    x: 682,
    y: 342,
    faction: "Neutral",
    status: "Mobilized",
    description: "A port city on the mainland continent used as a staging ground for the Survey Corps' plan to intercept the Rumbling.",
    events: [
      "Rumbling Intercept Planning",
      "Alliance Mobilization",
      "Last Airship Departure"
    ]
  }
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
    labelY: 174
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
    labelY: 204
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
    labelY: 220
  }
];
function CompassRose({ x, y }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "g",
    {
      transform: `translate(${x},${y})`,
      "aria-label": "Compass rose",
      className: "pointer-events-none",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            r: "28",
            fill: "none",
            stroke: "#9C7A2E",
            strokeWidth: "0.8",
            strokeDasharray: "3 2",
            opacity: "0.6"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            r: "20",
            fill: "rgba(8,5,2,0.75)",
            stroke: "#9C7A2E",
            strokeWidth: "0.4",
            opacity: "0.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "0,-17 2.5,-5 0,-2 -2.5,-5", fill: "#CC2222" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "0,17 2.5,5 0,2 -2.5,5", fill: "#4a4540" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "15,0 5,2.5 2,0 5,-2.5", fill: "#4a4540" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "-15,0 -5,2.5 -2,0 -5,-2.5", fill: "#4a4540" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "2", fill: "#CC2222" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "0",
            y: "-23",
            textAnchor: "middle",
            fontSize: "6.5",
            fill: "#CC2222",
            fontFamily: "'JetBrains Mono',monospace",
            fontWeight: "700",
            children: "N"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "0",
            y: "30",
            textAnchor: "middle",
            fontSize: "6.5",
            fill: "#9C7A2E",
            fontFamily: "'JetBrains Mono',monospace",
            children: "S"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "22",
            y: "3",
            textAnchor: "middle",
            fontSize: "6.5",
            fill: "#9C7A2E",
            fontFamily: "'JetBrains Mono',monospace",
            children: "E"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "-21",
            y: "3",
            textAnchor: "middle",
            fontSize: "6.5",
            fill: "#9C7A2E",
            fontFamily: "'JetBrains Mono',monospace",
            children: "W"
          }
        )
      ]
    }
  );
}
const TYPE_COLORS = {
  district: "#CC2222",
  territory: "#7a4f2e",
  landmark: "#6B7280",
  fortress: "#6b3ea0"
};
function LocationMarker({
  loc,
  selected,
  hovered,
  onEnter,
  onLeave,
  onClick
}) {
  const color = TYPE_COLORS[loc.type];
  const active = selected || hovered;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "g",
    {
      transform: `translate(${loc.x},${loc.y})`,
      tabIndex: 0,
      "aria-label": `Location: ${loc.name}`,
      style: { cursor: "pointer" },
      onPointerEnter: onEnter,
      onPointerLeave: onLeave,
      onClick,
      onKeyDown: (e) => e.key === "Enter" && onClick(),
      children: [
        active && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              r: "16",
              fill: "none",
              stroke: color,
              strokeWidth: "0.8",
              opacity: "0.25"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              r: "10",
              fill: "none",
              stroke: color,
              strokeWidth: "0.6",
              opacity: "0.45"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            r: active ? 6.5 : 4.5,
            fill: color,
            opacity: active ? 1 : 0.72,
            style: { transition: "r 0.18s ease, opacity 0.18s ease" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "2", fill: "rgba(0,0,0,0.75)" }),
        active && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            y: "-13",
            textAnchor: "middle",
            fontSize: "7.5",
            fill: "#e8dcc8",
            fontFamily: "'JetBrains Mono',monospace",
            fontWeight: "600",
            style: { pointerEvents: "none" },
            children: loc.name
          }
        )
      ]
    }
  );
}
const TYPE_LABEL = {
  district: "DISTRICT",
  territory: "TERRITORY",
  landmark: "CLASSIFIED SITE",
  fortress: "MILITARY FORTRESS"
};
const TYPE_TEXT_COLOR = {
  district: "text-red-500",
  territory: "text-orange-500",
  landmark: "text-slate-400",
  fortress: "text-purple-400"
};
function Tooltip({ loc, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.92, y: 6 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.92, y: 6 },
      transition: { duration: 0.17 },
      className: "absolute top-3 right-3 z-30 w-72 pointer-events-auto",
      "data-ocid": "map.tooltip",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative border border-border/60 bg-card/90 backdrop-blur-md rounded-sm overflow-hidden shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 pointer-events-none opacity-[0.04]",
            style: {
              backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.1) 2px,rgba(255,255,255,0.1) 4px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `text-[9px] font-mono tracking-widest mb-1 ${TYPE_TEXT_COLOR[loc.type]}`,
                  children: [
                    "[",
                    TYPE_LABEL[loc.type],
                    "] ",
                    "// ",
                    loc.faction.toUpperCase()
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground leading-tight", children: loc.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "aria-label": "Close location panel",
                "data-ocid": "map.close_button",
                className: "flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-0.5 text-xs leading-none w-5 h-5 flex items-center justify-center",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 bg-muted/40 border border-border/30 px-2 py-0.5 rounded-sm mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] text-muted-foreground tracking-widest", children: [
              "STATUS: ",
              loc.status.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mb-3", children: loc.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground tracking-widest mb-1.5", children: "// KEY EVENTS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: loc.events.map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-1.5 text-[10px] font-mono text-foreground/80",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 flex-shrink-0", children: "▸" }),
                  ev
                ]
              },
              ev
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" })
      ] })
    }
  );
}
function WorldMapSection() {
  const [selected, setSelected] = reactExports.useState(null);
  const [hovered, setHovered] = reactExports.useState(null);
  const [scale, setScale] = reactExports.useState(1);
  const [pan, setPan] = reactExports.useState({ x: 0, y: 0 });
  const dragging = reactExports.useRef(false);
  const lastPt = reactExports.useRef({ x: 0, y: 0 });
  const containerRef = reactExports.useRef(null);
  const pinchDistRef = reactExports.useRef(null);
  const SVG_W = 1e3;
  const SVG_H = 620;
  const MIN_S = 0.55;
  const MAX_S = 3.5;
  const clamp = reactExports.useCallback((x, y, s) => {
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
      y: Math.max(-my, Math.min(my, y))
    };
  }, []);
  const handleWheel = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      const d = e.deltaY > 0 ? 0.88 : 1.14;
      setScale((prev) => {
        const next = Math.max(MIN_S, Math.min(MAX_S, prev * d));
        setPan((p) => clamp(p.x, p.y, next));
        return next;
      });
    },
    [clamp]
  );
  reactExports.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);
  const onPointerDown = (e) => {
    if (e.pointerType === "touch") return;
    dragging.current = true;
    lastPt.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPt.current.x;
    const dy = e.clientY - lastPt.current.y;
    lastPt.current = { x: e.clientX, y: e.clientY };
    setPan((p) => clamp(p.x + dx, p.y + dy, scale));
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  const onTouchMove = reactExports.useCallback(
    (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t = e.touches;
        const dist = Math.hypot(
          t[0].clientX - t[1].clientX,
          t[0].clientY - t[1].clientY
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
    [clamp]
  );
  const onTouchEnd = reactExports.useCallback(() => {
    pinchDistRef.current = null;
  }, []);
  reactExports.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [onTouchMove, onTouchEnd]);
  const zoomIn = () => setScale((p) => {
    const n = Math.min(MAX_S, p * 1.25);
    setPan((pp) => clamp(pp.x, pp.y, n));
    return n;
  });
  const zoomOut = () => setScale((p) => {
    const n = Math.max(MIN_S, p / 1.25);
    setPan((pp) => clamp(pp.x, pp.y, n));
    return n;
  });
  const reset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "map",
      "data-section": "map",
      "data-ocid": "map.section",
      className: "relative py-20 bg-background overflow-hidden",
      "aria-label": "Interactive World Map",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.55) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -14 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              className: "mb-8 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-3 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-10 bg-primary/50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.3em] text-primary", children: "SURVEY CORPS INTELLIGENCE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-10 bg-primary/50" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight", children: "OPERATIONAL MAP" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-[11px] tracking-[0.25em] text-muted-foreground", children: "// CLASSIFIED — AUTHORIZED PERSONNEL ONLY" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.97 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { duration: 0.75, delay: 0.2 },
              className: "relative border border-border/50 rounded-sm overflow-hidden shadow-2xl",
              style: { height: "clamp(360px, 54vw, 620px)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    className: "absolute inset-0",
                    style: {
                      background: "radial-gradient(ellipse at 44% 54%,#1a1208 0%,#100c06 45%,#070503 100%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    className: "absolute inset-0 opacity-[0.035] pointer-events-none",
                    style: {
                      backgroundImage: "linear-gradient(#9C7A2E 1px,transparent 1px),linear-gradient(90deg,#9C7A2E 1px,transparent 1px)",
                      backgroundSize: "56px 56px"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    className: "absolute inset-0 pointer-events-none z-10",
                    style: {
                      background: "radial-gradient(ellipse at 50% 50%,transparent 52%,rgba(0,0,0,0.78) 100%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    className: "absolute inset-0 pointer-events-none z-10 opacity-[0.055]",
                    style: {
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundSize: "256px 256px"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    ref: containerRef,
                    className: "absolute inset-0 overflow-hidden z-20",
                    style: { cursor: dragging.current ? "grabbing" : "grab" },
                    onPointerDown,
                    onPointerMove,
                    onPointerUp,
                    onPointerCancel: onPointerUp,
                    "data-ocid": "map.canvas_target",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          transform: `translate(${pan.x}px,${pan.y}px) scale(${scale})`,
                          transformOrigin: "center center",
                          width: "100%",
                          height: "100%",
                          willChange: "transform",
                          transition: dragging.current ? "none" : "transform 0.07s ease-out"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "svg",
                          {
                            viewBox: `0 0 ${SVG_W} ${SVG_H}`,
                            preserveAspectRatio: "xMidYMid meet",
                            width: "100%",
                            height: "100%",
                            "aria-label": "Attack on Titan World Map",
                            role: "img",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "grd-paradis", cx: "44%", cy: "55%", r: "26%", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#2a1a08" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "transparent" })
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "grd-marley", cx: "82%", cy: "46%", r: "22%", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#1a0a08" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "transparent" })
                                ] })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "rect",
                                {
                                  x: "0",
                                  y: "0",
                                  width: "1000",
                                  height: "620",
                                  fill: "url(#grd-paradis)",
                                  opacity: "0.55"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "rect",
                                {
                                  x: "0",
                                  y: "0",
                                  width: "1000",
                                  height: "620",
                                  fill: "url(#grd-marley)",
                                  opacity: "0.55"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "ellipse",
                                {
                                  cx: "450",
                                  cy: "370",
                                  rx: "238",
                                  ry: "198",
                                  fill: "none",
                                  stroke: "#5a4a2a",
                                  strokeWidth: "1.5",
                                  strokeDasharray: "7 4",
                                  opacity: "0.45"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "text",
                                {
                                  x: "225",
                                  y: "545",
                                  fontSize: "10",
                                  fill: "#6b5a3a",
                                  fontFamily: "'JetBrains Mono',monospace",
                                  opacity: "0.65",
                                  children: "PARADIS ISLAND"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M 655 75 Q 718 55 824 86 Q 924 118 964 202 Q 985 282 954 364 Q 922 424 862 442 Q 800 452 758 402 Q 718 362 698 302 Q 678 242 658 202 Q 643 162 655 75 Z",
                                  fill: "#180704",
                                  stroke: "#5a3a2a",
                                  strokeWidth: "1.5",
                                  strokeDasharray: "5 3",
                                  opacity: "0.75"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "text",
                                {
                                  x: "790",
                                  y: "290",
                                  fontSize: "11",
                                  fill: "#7a4a2a",
                                  fontFamily: "'JetBrains Mono',monospace",
                                  opacity: "0.85",
                                  children: "MARLEY"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "text",
                                {
                                  x: "82",
                                  y: "415",
                                  fontSize: "9",
                                  fill: "#1a2a4a",
                                  fontFamily: "'JetBrains Mono',monospace",
                                  opacity: "0.55",
                                  letterSpacing: "3",
                                  children: "SEA"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "text",
                                {
                                  x: "555",
                                  y: "530",
                                  fontSize: "9",
                                  fill: "#1a2a4a",
                                  fontFamily: "'JetBrains Mono',monospace",
                                  opacity: "0.5",
                                  letterSpacing: "3",
                                  children: "STRAIT"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "text",
                                {
                                  x: "608",
                                  y: "196",
                                  fontSize: "9",
                                  fill: "#1a2a4a",
                                  fontFamily: "'JetBrains Mono',monospace",
                                  opacity: "0.45",
                                  letterSpacing: "3",
                                  children: "OCEAN"
                                }
                              ),
                              [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "g",
                                {
                                  transform: `translate(${293 + i % 3 * 18},${352 + Math.floor(i / 3) * 18})`,
                                  opacity: "0.55",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "circle",
                                      {
                                        r: "7",
                                        fill: "#182e18",
                                        stroke: "#2a4a2a",
                                        strokeWidth: "0.5"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "line",
                                      {
                                        x1: "0",
                                        y1: "7",
                                        x2: "0",
                                        y2: "12",
                                        stroke: "#3a5a3a",
                                        strokeWidth: "1"
                                      }
                                    )
                                  ]
                                },
                                `tree-${i + 1}`
                              )),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "text",
                                {
                                  x: "284",
                                  y: "426",
                                  fontSize: "7.5",
                                  fill: "#3a5a3a",
                                  fontFamily: "'JetBrains Mono',monospace",
                                  opacity: "0.65",
                                  children: "FOREST OF GIANT TREES"
                                }
                              ),
                              WALLS.map((wall) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "ellipse",
                                  {
                                    cx: wall.cx,
                                    cy: wall.cy,
                                    rx: wall.rx + 5,
                                    ry: wall.ry + 5,
                                    fill: "none",
                                    stroke: wall.glowColor,
                                    strokeWidth: "5",
                                    opacity: "0.07"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "ellipse",
                                  {
                                    cx: wall.cx,
                                    cy: wall.cy,
                                    rx: wall.rx,
                                    ry: wall.ry,
                                    fill: "none",
                                    stroke: wall.strokeColor,
                                    strokeWidth: "2.5",
                                    opacity: "0.88"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "ellipse",
                                  {
                                    cx: wall.cx,
                                    cy: wall.cy,
                                    rx: wall.rx - 2.5,
                                    ry: wall.ry - 2.5,
                                    fill: "none",
                                    stroke: wall.strokeColor,
                                    strokeWidth: "0.5",
                                    opacity: "0.28"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "text",
                                  {
                                    x: wall.cx,
                                    y: wall.labelY,
                                    textAnchor: "middle",
                                    fontSize: "8.5",
                                    fill: wall.strokeColor,
                                    fontFamily: "'JetBrains Mono',monospace",
                                    fontWeight: "700",
                                    letterSpacing: "2.5",
                                    opacity: "0.92",
                                    children: wall.name
                                  }
                                )
                              ] }, wall.id)),
                              LOCATIONS.map((loc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                LocationMarker,
                                {
                                  loc,
                                  selected: (selected == null ? void 0 : selected.id) === loc.id,
                                  hovered: hovered === loc.id,
                                  onEnter: () => setHovered(loc.id),
                                  onLeave: () => setHovered(null),
                                  onClick: () => setSelected((s) => (s == null ? void 0 : s.id) === loc.id ? null : loc)
                                },
                                loc.id
                              )),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(CompassRose, { x: 922, y: 548 }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "translate(50,572)", opacity: "0.58", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "line",
                                  {
                                    x1: "0",
                                    y1: "0",
                                    x2: "80",
                                    y2: "0",
                                    stroke: "#9C7A2E",
                                    strokeWidth: "1"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "line",
                                  {
                                    x1: "0",
                                    y1: "-4",
                                    x2: "0",
                                    y2: "4",
                                    stroke: "#9C7A2E",
                                    strokeWidth: "1"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "line",
                                  {
                                    x1: "80",
                                    y1: "-4",
                                    x2: "80",
                                    y2: "4",
                                    stroke: "#9C7A2E",
                                    strokeWidth: "1"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "line",
                                  {
                                    x1: "40",
                                    y1: "-3",
                                    x2: "40",
                                    y2: "3",
                                    stroke: "#9C7A2E",
                                    strokeWidth: "0.5"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "text",
                                  {
                                    x: "40",
                                    y: "-7",
                                    textAnchor: "middle",
                                    fontSize: "7",
                                    fill: "#9C7A2E",
                                    fontFamily: "'JetBrains Mono',monospace",
                                    children: "~500 KM"
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "translate(815,555)", opacity: "0.22", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "rect",
                                  {
                                    x: "-30",
                                    y: "-10",
                                    width: "90",
                                    height: "18",
                                    fill: "none",
                                    stroke: "#CC2222",
                                    strokeWidth: "0.8"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "text",
                                  {
                                    x: "15",
                                    y: "3",
                                    textAnchor: "middle",
                                    fontSize: "7",
                                    fill: "#CC2222",
                                    fontFamily: "'JetBrains Mono',monospace",
                                    fontWeight: "700",
                                    letterSpacing: "2",
                                    children: "CLASSIFIED"
                                  }
                                )
                              ] })
                            ]
                          }
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { loc: selected, onClose: () => setSelected(null) }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 z-30 flex flex-col gap-1", children: [
                  {
                    label: "Zoom in",
                    ocid: "map.zoom_in.button",
                    content: "+",
                    fn: zoomIn
                  },
                  {
                    label: "Zoom out",
                    ocid: "map.zoom_out.button",
                    content: "−",
                    fn: zoomOut
                  },
                  {
                    label: "Reset",
                    ocid: "map.reset.button",
                    content: "⌂",
                    fn: reset
                  }
                ].map(({ label, ocid, content, fn }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: fn,
                    "aria-label": label,
                    "data-ocid": ocid,
                    className: "w-8 h-8 flex items-center justify-center bg-card/80 border border-border/60 text-foreground hover:text-primary hover:border-primary/60 backdrop-blur-sm font-mono text-sm transition-colors rounded-sm",
                    children: content
                  },
                  ocid
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 right-4 z-30 bg-card/75 border border-border/50 backdrop-blur-sm rounded-sm p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[8px] tracking-widest text-muted-foreground mb-2", children: "// LEGEND" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [
                    { color: "#CC2222", label: "DISTRICT" },
                    { color: "#9C7A2E", label: "WALL" },
                    { color: "#7a4f2e", label: "TERRITORY" },
                    { color: "#6b3ea0", label: "FORTRESS" },
                    { color: "#6B7280", label: "CLASSIFIED SITE" }
                  ].map(({ color, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-2 h-2 rounded-full flex-shrink-0",
                        style: { background: color }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] text-muted-foreground tracking-wider", children: label })
                  ] }, label)) })
                ] }),
                [
                  { pos: "top-0 left-0", bt: "1px", bb: 0, bl: "1px", br: 0 },
                  { pos: "top-0 right-0", bt: "1px", bb: 0, bl: 0, br: "1px" },
                  { pos: "bottom-0 left-0", bt: 0, bb: "1px", bl: "1px", br: 0 },
                  { pos: "bottom-0 right-0", bt: 0, bb: "1px", bl: 0, br: "1px" }
                ].map(({ pos, bt, bb, bl, br }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    className: `absolute ${pos} w-5 h-5 pointer-events-none z-40 border-primary/35`,
                    style: {
                      borderTopWidth: bt,
                      borderBottomWidth: bb,
                      borderLeftWidth: bl,
                      borderRightWidth: br
                    }
                  },
                  pos
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    className: "absolute inset-x-0 h-px z-40 pointer-events-none",
                    style: {
                      background: "linear-gradient(90deg,transparent,#9C7A2E55,transparent)",
                      animation: "map-scanline 8s linear infinite"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-center gap-5 font-mono text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⊕ Scroll / pinch-to-zoom" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✥ Drag to pan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "● Click marker for intel" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes map-scanline {
          0%   { top: 0%;   opacity: 0;    }
          5%   { opacity: 0.12; }
          95%  { opacity: 0.12; }
          100% { top: 100%; opacity: 0;    }
        }
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" })
      ]
    }
  );
}
export {
  WorldMapSection as default
};
