import { useEffect, useRef } from "react";
import { useStore } from "../store/useStore";
import AudioControls from "./AudioControls";
import CustomCursor from "./CustomCursor";
import Navigation from "./Navigation";
import ParticleSystem from "./ParticleSystem";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme, storyModeEnabled } = useStore();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-dark", "theme-red");
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("story-mode", storyModeEnabled);
  }, [storyModeEnabled]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth - 0.5) * 20;
          const y = (e.clientY / window.innerHeight - 0.5) * 10;
          const parallaxEls =
            document.querySelectorAll<HTMLElement>("[data-parallax]");
          for (const el of parallaxEls) {
            const depth = Number.parseFloat(el.dataset.parallax ?? "1");
            el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Always-on grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[2]"
        role="presentation"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Always-on vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-[3]"
        role="presentation"
        style={{
          boxShadow:
            "inset 0 0 120px rgba(0,0,0,0.85), inset 0 0 60px rgba(120,0,0,0.15)",
        }}
      />

      {storyModeEnabled && (
        <div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] h-16 bg-gradient-to-t from-background/90 to-transparent"
          role="presentation"
        />
      )}

      <ParticleSystem />
      <CustomCursor />
      <Navigation />
      <AudioControls />

      <main
        ref={mainRef}
        id="main-content"
        className="relative z-[10]"
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </main>

      <footer className="relative z-[10] border-t border-border bg-card/80 backdrop-blur-sm py-8 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="terminal-text text-muted-foreground text-xs">
                PARADIS INTELLIGENCE ARCHIVE — RESTRICTED ACCESS
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="terminal-text">
                © {new Date().getFullYear()} PARADIS INTELLIGENCE ARCHIVE
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="terminal-text text-muted-foreground text-xs">
              SYSTEM STATUS: OPERATIONAL — ALL SECTORS MONITORED
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
