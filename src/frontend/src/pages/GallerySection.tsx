import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryCategory, GalleryImage } from "../types";

// ── Gallery data ───────────────────────────────────────────────────────────────
interface GalleryItem extends GalleryImage {
  description: string;
  aspect: "wide" | "tall" | "square";
}

const GALLERY_ITEMS: GalleryItem[] = [
  // ── Characters ──────────────────────────────────────────────────────────────
  {
    id: "char-eren",
    title: "Eren Yeager",
    category: "Characters",
    src: "/assets/generated/eren-yeager.dim_400x600.jpg",
    alt: "Eren Yeager — holder of the Attack Titan",
    description:
      "Survey Corps — Special Operative. Holder of the Attack, Founding & War Hammer Titans.",
    aspect: "tall",
  },
  {
    id: "char-mikasa",
    title: "Mikasa Ackerman",
    category: "Characters",
    src: "/assets/generated/mikasa-ackerman.dim_400x600.jpg",
    alt: "Mikasa Ackerman — Elite Officer of the Survey Corps",
    description:
      "Survey Corps — Elite Officer. Humanity's finest blade, Ackerman bloodline.",
    aspect: "tall",
  },
  {
    id: "char-armin",
    title: "Armin Arlert",
    category: "Characters",
    src: "/assets/generated/armin-arlert.dim_400x600.jpg",
    alt: "Armin Arlert — Tactical Advisor",
    description:
      "Survey Corps — Tactical Advisor. Bearer of the Colossus Titan, strategic genius.",
    aspect: "tall",
  },
  {
    id: "char-levi",
    title: "Levi Ackerman",
    category: "Characters",
    src: "/assets/generated/levi-ackerman.dim_400x600.jpg",
    alt: "Captain Levi — Humanity's Strongest Soldier",
    description:
      "Survey Corps — Captain. Humanity's Strongest Soldier, legendary Ackerman warrior.",
    aspect: "tall",
  },
  {
    id: "char-erwin",
    title: "Erwin Smith",
    category: "Characters",
    src: "/assets/generated/erwin-smith.dim_400x600.jpg",
    alt: "Commander Erwin Smith — Survey Corps Commander",
    description:
      "Survey Corps — Commander. Visionary leader who sacrificed everything for humanity.",
    aspect: "tall",
  },
  {
    id: "char-hange",
    title: "Hange Zoë",
    category: "Characters",
    src: "/assets/generated/hange-zoe.dim_400x600.jpg",
    alt: "Hange Zoë — Survey Corps Section Commander",
    description:
      "Survey Corps — Section Commander. Chief scientist and fearless Titan researcher.",
    aspect: "tall",
  },
  {
    id: "char-historia",
    title: "Historia Reiss",
    category: "Characters",
    src: "/assets/generated/historia-reiss.dim_400x600.jpg",
    alt: "Historia Reiss — Queen of the Walls",
    description:
      "Royal Family — Queen. True heir to the Walls, rightful Queen of Eldia.",
    aspect: "tall",
  },
  {
    id: "char-reiner",
    title: "Reiner Braun",
    category: "Characters",
    src: "/assets/generated/reiner-braun.dim_400x600.jpg",
    alt: "Reiner Braun — Armored Titan warrior",
    description:
      "Marley Warriors — Warrior. Bearer of the Armored Titan, torn between duty and loyalty.",
    aspect: "tall",
  },
  {
    id: "char-annie",
    title: "Annie Leonhart",
    category: "Characters",
    src: "/assets/generated/annie-leonhart.dim_400x600.jpg",
    alt: "Annie Leonhart — Female Titan warrior",
    description:
      "Marley Warriors — Warrior. Bearer of the Female Titan, ruthless combat specialist.",
    aspect: "tall",
  },
  {
    id: "char-bertholdt",
    title: "Bertholdt Hoover",
    category: "Characters",
    src: "/assets/generated/bertholdt-hoover.dim_400x600.jpg",
    alt: "Bertholdt Hoover — Colossal Titan warrior",
    description:
      "Marley Warriors — Warrior. Bearer of the Colossal Titan, the greatest weapon of mass destruction.",
    aspect: "tall",
  },
  {
    id: "char-zeke",
    title: "Zeke Yeager",
    category: "Characters",
    src: "/assets/generated/zeke-yeager.dim_400x600.jpg",
    alt: "Zeke Yeager — Beast Titan warchief",
    description:
      "Marley Warriors — Warchief. Bearer of the Beast Titan, Eren's half-brother.",
    aspect: "tall",
  },
  {
    id: "char-gabi",
    title: "Gabi Braun",
    category: "Characters",
    src: "/assets/generated/gabi-braun.dim_400x600.jpg",
    alt: "Gabi Braun — Warrior Candidate",
    description:
      "Marley Warriors — Warrior Candidate. Reiner's cousin, destined to inherit the Armored Titan.",
    aspect: "tall",
  },
  // ── Titans ──────────────────────────────────────────────────────────────────
  {
    id: "titan-eren",
    title: "Attack Titan / Founding Titan",
    category: "Titans",
    src: "/assets/generated/eren-yeager.dim_400x600.jpg",
    alt: "Eren Yeager — the Attack and Founding Titan",
    description:
      "Eren's titan forms: the Attack Titan who fights for freedom, and the god-like Founding Titan who commands the Rumbling.",
    aspect: "tall",
  },
  {
    id: "titan-reiner",
    title: "Armored Titan",
    category: "Titans",
    src: "/assets/generated/reiner-braun.dim_400x600.jpg",
    alt: "Reiner Braun — the Armored Titan",
    description:
      "Reiner Braun's titan form. The living siege weapon covered in impenetrable crystalline armor plates.",
    aspect: "tall",
  },
  {
    id: "titan-annie",
    title: "Female Titan",
    category: "Titans",
    src: "/assets/generated/annie-leonhart.dim_400x600.jpg",
    alt: "Annie Leonhart — the Female Titan",
    description:
      "Annie Leonhart's titan form. The Female Titan can harden its skin and attract Pure Titans with its unique scream.",
    aspect: "tall",
  },
  {
    id: "titan-bertholdt",
    title: "Colossal Titan",
    category: "Titans",
    src: "/assets/generated/bertholdt-hoover.dim_400x600.jpg",
    alt: "Bertholdt Hoover — the Colossal Titan",
    description:
      "Bertholdt Hoover's titan form. The 60-meter Colossal Titan can emit devastating steam blasts and level entire cities.",
    aspect: "tall",
  },
  {
    id: "titan-zeke",
    title: "Beast Titan",
    category: "Titans",
    src: "/assets/generated/zeke-yeager.dim_400x600.jpg",
    alt: "Zeke Yeager — the Beast Titan",
    description:
      "Zeke Yeager's unique titan form with ape-like features. Commands Pure Titans and wields devastating throwing power.",
    aspect: "tall",
  },
  {
    id: "titan-armin",
    title: "Colossus Titan",
    category: "Titans",
    src: "/assets/generated/armin-arlert.dim_400x600.jpg",
    alt: "Armin Arlert — the Colossus Titan",
    description:
      "Armin Arlert inherited the Colossus Titan from Bertholdt. A weapon of apocalyptic scale and devastating nuclear heat.",
    aspect: "tall",
  },
  // ── Battles ──────────────────────────────────────────────────────────────────
  {
    id: "battle-eren",
    title: "The Rumbling — Eren's March",
    category: "Battles",
    src: "/assets/generated/eren-yeager.dim_400x600.jpg",
    alt: "Eren Yeager leads the Rumbling across the world",
    description:
      "Eren's final gambit: unleashing millions of Wall Titans to trample the world outside Paradis and ensure Eldian survival.",
    aspect: "tall",
  },
  {
    id: "battle-levi",
    title: "Levi — The Blade Unsheathed",
    category: "Battles",
    src: "/assets/generated/levi-ackerman.dim_400x600.jpg",
    alt: "Captain Levi in ODM combat",
    description:
      "Captain Levi's legendary ODM combat technique. Humanity's strongest soldier has never lost a one-on-one engagement.",
    aspect: "tall",
  },
  {
    id: "battle-mikasa",
    title: "Mikasa — Last Stand",
    category: "Battles",
    src: "/assets/generated/mikasa-ackerman.dim_400x600.jpg",
    alt: "Mikasa Ackerman in final battle stance",
    description:
      "Mikasa Ackerman at the climax of the final battle against Eren's Founding Titan — every swing a farewell.",
    aspect: "tall",
  },
  {
    id: "battle-erwin",
    title: "Erwin's Final Charge",
    category: "Battles",
    src: "/assets/generated/erwin-smith.dim_400x600.jpg",
    alt: "Commander Erwin Smith leads the charge at Shiganshina",
    description:
      "Erwin Smith's legendary suicidal charge against the Beast Titan at Shiganshina — sacrificing himself so Levi could act.",
    aspect: "tall",
  },
  {
    id: "battle-banner",
    title: "Survey Corps — Beyond the Walls",
    category: "Battles",
    src: "/assets/generated/aot-hero-banner.dim_1200x600.jpg",
    alt: "Attack on Titan hero banner — Survey Corps embodies freedom",
    description:
      "The Survey Corps charges beyond the Walls. For every ten soldiers who venture outside, only a few return — yet still they ride.",
    aspect: "wide",
  },
];

const CATEGORIES: ("ALL" | GalleryCategory)[] = [
  "ALL",
  "Characters",
  "Titans",
  "Battles",
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNav: (idx: number) => void;
}

function Lightbox({ items, index, onClose, onNav }: LightboxProps) {
  const item = items[index];
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetZoom();
  }, [resetZoom]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        resetZoom();
        onNav((index + 1) % items.length);
      }
      if (e.key === "ArrowLeft") {
        resetZoom();
        onNav((index - 1 + items.length) % items.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onNav, resetZoom]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    dragging.current = true;
    isDragging.current = false;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    isDragging.current = true;
    setPan((o) => ({
      x: o.x + e.clientX - lastPos.current.x,
      y: o.y + e.clientY - lastPos.current.y,
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => {
    dragging.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1)
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    if (Math.abs(dx) > 50) {
      resetZoom();
      if (dx < 0) onNav((index + 1) % items.length);
      else onNav((index - 1 + items.length) % items.length);
    }
    touchStart.current = null;
  };

  if (!item) return null;

  const imgStyle: React.CSSProperties =
    item.aspect === "wide"
      ? { maxWidth: "min(90vw, 1000px)", maxHeight: "70vh" }
      : item.aspect === "tall"
        ? { maxHeight: "72vh", maxWidth: "min(50vw, 480px)" }
        : { maxHeight: "70vh", maxWidth: "min(70vw, 700px)" };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "oklch(0.04 0 0 / 0.97)" }}
      data-ocid="gallery.lightbox"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/20 flex-shrink-0">
        <div>
          <p className="font-display text-lg font-bold text-foreground">
            {item.title}
          </p>
          <span className="terminal-text text-xs text-muted-foreground uppercase tracking-widest">
            {item.category} — {index + 1} / {items.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(3, z + 0.5))}
            className="p-2 rounded-lg glass-panel text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Zoom in"
            data-ocid="gallery.zoom_in"
          >
            <ZoomIn size={18} />
          </button>
          <button
            type="button"
            onClick={() =>
              setZoom((z) => {
                const next = Math.max(1, z - 0.5);
                if (next <= 1) setPan({ x: 0, y: 0 });
                return next;
              })
            }
            className="p-2 rounded-lg glass-panel text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Zoom out"
            data-ocid="gallery.zoom_out"
          >
            <ZoomOut size={18} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg glass-panel text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close lightbox"
            data-ocid="gallery.close_button"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        className="flex-1 overflow-hidden relative flex items-center justify-center"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ cursor: zoom > 1 ? "grab" : "default" }}
      >
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            ...imgStyle,
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transition: dragging.current ? "none" : "transform 0.2s ease",
            userSelect: "none",
          }}
          className="relative"
        >
          <img
            src={item.src}
            alt={item.alt}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "0.5rem",
              boxShadow:
                "0 0 60px oklch(0.26 0.22 25 / 0.25), 0 20px 60px black",
            }}
          />
        </motion.div>

        {/* Nav arrows */}
        <button
          type="button"
          onClick={() => {
            resetZoom();
            onNav((index - 1 + items.length) % items.length);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass-panel rounded-full text-foreground hover:text-primary transition-all"
          aria-label="Previous image"
          data-ocid="gallery.prev_button"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => {
            resetZoom();
            onNav((index + 1) % items.length);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass-panel rounded-full text-foreground hover:text-primary transition-all"
          aria-label="Next image"
          data-ocid="gallery.next_button"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Caption */}
      <div className="text-center px-8 py-3 flex-shrink-0 border-t border-border/10">
        <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
          {item.description}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center pb-4 flex-shrink-0 gap-1.5 flex-wrap px-8">
        {items.map((it, i) => (
          <button
            type="button"
            key={it.id}
            onClick={() => {
              resetZoom();
              onNav(i);
            }}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{
              background:
                i === index ? "oklch(0.65 0.15 60)" : "oklch(var(--muted))",
              transform: i === index ? "scale(1.4)" : "scale(1)",
            }}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── GallerySection ────────────────────────────────────────────────────────────
export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | GalleryCategory>(
    "ALL",
  );
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    activeCategory === "ALL"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (itemId: string) => {
    const idx = filtered.findIndex((i) => i.id === itemId);
    if (idx >= 0) setLightboxIdx(idx);
  };

  return (
    <section
      id="section-gallery"
      data-section="gallery"
      data-ocid="gallery.section"
      className="relative py-24 bg-background grain-overlay"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="terminal-text text-xs text-primary uppercase tracking-[0.3em] mb-3">
            ░ CLASSIFIED VISUAL RECORDS ░
          </p>
          <h2 className="cinematic-title text-4xl md:text-5xl mb-4">
            VISUAL ARCHIVE
          </h2>
          <p className="terminal-text text-muted-foreground text-sm tracking-wider">
            SURVEY CORPS DOCUMENTATION UNIT — RESTRICTED FILES
          </p>
          <div className="w-24 h-px bg-primary mx-auto opacity-60 mt-4" />
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-2 mt-8 mb-10 flex-wrap"
          role="tablist"
          aria-label="Gallery categories"
          data-ocid="gallery.filters"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className="terminal-text text-xs px-5 py-2 border transition-all duration-200 uppercase tracking-widest"
                style={{
                  borderColor: isActive
                    ? "oklch(0.26 0.22 25)"
                    : "oklch(var(--border))",
                  background: isActive
                    ? "oklch(0.26 0.22 25 / 0.15)"
                    : "transparent",
                  color: isActive
                    ? "oklch(var(--foreground))"
                    : "oklch(var(--muted-foreground))",
                }}
                data-ocid={`gallery.filter.${cat.toLowerCase()}`}
              >
                {cat === "ALL" ? "ALL FILES" : cat}
              </button>
            );
          })}
        </motion.div>

        {/* Masonry grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3"
            layout
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="break-inside-avoid mb-3"
                data-ocid={`gallery.item.${i + 1}`}
              >
                <button
                  type="button"
                  className="w-full group cursor-pointer overflow-hidden relative border border-border/30 hover:border-primary/60 transition-all duration-300 text-left block rounded-sm"
                  onClick={() => openLightbox(item.id)}
                  aria-label={`View ${item.title}`}
                >
                  {/* Real image */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                    style={{
                      aspectRatio:
                        item.aspect === "wide"
                          ? "2/1"
                          : item.aspect === "tall"
                            ? "2/3"
                            : "1/1",
                      objectFit: "cover",
                    }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-end p-3">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span
                        className="terminal-text text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm mb-1.5 inline-block"
                        style={{
                          background: "oklch(0.26 0.22 25 / 0.85)",
                          color: "oklch(0.95 0 0)",
                        }}
                      >
                        {item.category}
                      </span>
                      <p className="font-display text-sm font-bold text-foreground leading-tight drop-shadow-lg">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  {/* Zoom badge */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-1.5 glass-panel rounded-full">
                      <ZoomIn size={12} className="text-foreground" />
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16" data-ocid="gallery.empty_state">
            <p className="terminal-text text-muted-foreground text-sm">
              [NO RECORDS FOUND — {activeCategory.toUpperCase()}]
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onNav={setLightboxIdx}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
