import { useCallback, useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import type { NavSection } from "../types";

const NAV_ITEMS: { id: NavSection; label: string }[] = [
  { id: "home", label: "Archive" },
  { id: "characters", label: "Characters" },
  { id: "titans", label: "Titans" },
  { id: "world", label: "World" },
  { id: "timeline", label: "History" },
  { id: "terminal", label: "Terminal" },
  { id: "gallery", label: "Gallery" },
];

export default function Navigation() {
  const {
    currentSection,
    setCurrentSection,
    theme,
    toggleTheme,
    storyModeEnabled,
    toggleStoryMode,
    mobileNavOpen,
    setMobileNavOpen,
  } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = useCallback(
    (id: NavSection) => {
      setCurrentSection(id);
      setMobileNavOpen(false);
      const el = document.getElementById(`section-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [setCurrentSection, setMobileNavOpen],
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-md border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              type="button"
              className="flex items-center gap-3 group"
              onClick={() => scrollToSection("home")}
              data-ocid="nav.home_link"
              aria-label="Back to home"
            >
              <SurveyCoreWings className="w-9 h-9 sm:w-10 sm:h-10 text-accent group-hover:text-primary transition-colors duration-200" />
              <span className="hidden sm:block cinematic-title text-sm tracking-widest text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                PARADIS ARCHIVE
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  data-ocid={`nav.${item.id}_link`}
                  className={`relative px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200 font-mono ${
                    currentSection === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {currentSection === item.id && (
                    <span className="absolute bottom-0 left-2 right-2 h-px bg-primary animate-fade-in" />
                  )}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Story mode toggle */}
              <button
                type="button"
                onClick={toggleStoryMode}
                data-ocid="nav.story_mode_toggle"
                title={storyModeEnabled ? "Story Mode: ON" : "Story Mode: OFF"}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider border rounded-sm transition-all duration-200 ${
                  storyModeEnabled
                    ? "border-accent text-accent bg-accent/10 glow-gold"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${storyModeEnabled ? "bg-accent animate-pulse" : "bg-muted-foreground"}`}
                />
                STORY
              </button>

              {/* Theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                data-ocid="nav.theme_toggle"
                title={`Theme: ${theme === "dark" ? "Dark" : "Red"}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider border border-border text-muted-foreground hover:border-primary hover:text-primary rounded-sm transition-all duration-200"
              >
                {theme === "dark" ? (
                  <span className="text-xs">◉ DARK</span>
                ) : (
                  <span className="text-xs text-primary">◉ RED</span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="lg:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                data-ocid="nav.mobile_menu_toggle"
                aria-label={
                  mobileNavOpen ? "Close navigation" : "Open navigation"
                }
                aria-expanded={mobileNavOpen}
              >
                <span
                  className={`block w-5 h-px bg-foreground transition-all duration-200 ${mobileNavOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-5 h-px bg-foreground transition-all duration-200 ${mobileNavOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-5 h-px bg-foreground transition-all duration-200 ${mobileNavOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileNavOpen(false)}
          onKeyUp={(e) => {
            if (e.key === "Escape") setMobileNavOpen(false);
          }}
          role="button"
          tabIndex={0}
          aria-label="Close navigation"
        />
        {/* Drawer */}
        <div
          className={`absolute top-16 right-0 bottom-0 w-64 bg-card border-l border-border flex flex-col transition-transform duration-300 ${
            mobileNavOpen ? "translate-x-0" : "translate-x-full"
          }`}
          data-ocid="nav.mobile_drawer"
        >
          <div className="p-4 border-b border-border">
            <p className="terminal-text text-muted-foreground text-xs">
              NAVIGATION MENU
            </p>
          </div>
          <nav className="flex-1 p-4 space-y-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                data-ocid={`nav.mobile_${item.id}_link`}
                className={`w-full text-left px-4 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-200 border-l-2 ${
                  currentSection === item.id
                    ? "border-primary text-foreground bg-primary/10"
                    : "border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-border space-y-2">
            <button
              type="button"
              onClick={toggleStoryMode}
              data-ocid="nav.mobile_story_toggle"
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-mono tracking-wider border rounded-sm transition-all duration-200 ${
                storyModeEnabled
                  ? "border-accent text-accent bg-accent/10"
                  : "border-border text-muted-foreground"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${storyModeEnabled ? "bg-accent animate-pulse" : "bg-muted-foreground"}`}
              />
              STORY MODE {storyModeEnabled ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SurveyCoreWings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="currentColor"
      className={className}
      role="img"
      aria-label="Survey Corps Wings of Freedom"
    >
      <title>Survey Corps Wings of Freedom</title>
      <g>
        <path d="M48 40 C30 30, 8 20, 5 15 C8 22, 15 35, 20 45 C12 40, 5 38, 2 42 C8 44, 18 48, 25 55 C15 52, 5 55, 3 60 C10 60, 22 60, 30 62 L48 40Z" />
        <path d="M52 40 C70 30, 92 20, 95 15 C92 22, 85 35, 80 45 C88 40, 95 38, 98 42 C92 44, 82 48, 75 55 C85 52, 95 55, 97 60 C90 60, 78 60, 70 62 L52 40Z" />
        <ellipse cx="50" cy="42" rx="5" ry="8" />
        <path d="M46 50 L50 65 L54 50Z" />
      </g>
    </svg>
  );
}
