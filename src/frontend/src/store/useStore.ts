import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AppStore,
  AudioTrack,
  Character,
  CharacterFilters,
  CharacterSortKey,
  NavSection,
  Theme,
} from "../types";

const defaultFilters: CharacterFilters = {
  faction: [],
  status: "all",
  titanType: "all",
  search: "",
};

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      // ── UI State ─────────────────────────────────────────────────────────
      currentSection: "home",
      setCurrentSection: (section: NavSection) =>
        set({ currentSection: section }),

      // ── Theme ─────────────────────────────────────────────────────────────
      theme: "dark",
      setTheme: (theme: Theme) => {
        set({ theme });
        applyTheme(theme);
      },
      toggleTheme: () =>
        set((state) => {
          const next: Theme = state.theme === "dark" ? "red" : "dark";
          applyTheme(next);
          return { theme: next };
        }),

      // ── Story Mode ────────────────────────────────────────────────────────
      storyModeEnabled: false,
      setStoryModeEnabled: (enabled: boolean) =>
        set({ storyModeEnabled: enabled }),
      toggleStoryMode: () =>
        set((state) => ({ storyModeEnabled: !state.storyModeEnabled })),

      // ── Audio ─────────────────────────────────────────────────────────────
      audioTrack: "calm",
      setAudioTrack: (track: AudioTrack) => set({ audioTrack: track }),
      audioVolume: 0.3,
      setAudioVolume: (volume: number) => set({ audioVolume: volume }),
      audioPlaying: false,
      setAudioPlaying: (playing: boolean) => set({ audioPlaying: playing }),

      // ── Mobile nav ────────────────────────────────────────────────────────
      mobileNavOpen: false,
      setMobileNavOpen: (open: boolean) => set({ mobileNavOpen: open }),

      // ── Character modal ───────────────────────────────────────────────────
      selectedCharacter: null,
      setSelectedCharacter: (character: Character | null) =>
        set({ selectedCharacter: character }),

      // ── Character filters ─────────────────────────────────────────────────
      characterFilters: defaultFilters,
      setCharacterFilters: (filters: Partial<CharacterFilters>) =>
        set((state) => ({
          characterFilters: { ...state.characterFilters, ...filters },
        })),
      characterSort: "strength",
      setCharacterSort: (sort: CharacterSortKey) =>
        set({ characterSort: sort }),

      // ── Intro ─────────────────────────────────────────────────────────────
      introComplete: false,
      setIntroComplete: (complete: boolean) => set({ introComplete: complete }),
    }),
    {
      name: "aot-app-state",
      partialize: (state) => ({
        theme: state.theme,
        audioVolume: state.audioVolume,
        storyModeEnabled: state.storyModeEnabled,
      }),
    },
  ),
);

// ── Helpers ────────────────────────────────────────────────────────────────────

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("theme-dark", "theme-red");
  root.classList.add(`theme-${theme}`);
  if (theme === "red") {
    root.style.setProperty("--background", "0.09 0.04 15");
    root.style.setProperty("--card", "0.12 0.05 15");
    root.style.setProperty("--border", "0.22 0.06 20");
    root.style.setProperty("--muted", "0.15 0.04 18");
    root.style.setProperty("--primary", "0.45 0.28 22");
    root.style.setProperty("--accent", "0.70 0.18 55");
  } else {
    root.style.setProperty("--background", "0.07 0 0");
    root.style.setProperty("--card", "0.12 0 0");
    root.style.setProperty("--border", "0.20 0 0");
    root.style.setProperty("--muted", "0.20 0 0");
    root.style.setProperty("--primary", "0.26 0.22 25");
    root.style.setProperty("--accent", "0.65 0.15 60");
  }
}

// Apply theme on load
const stored = localStorage.getItem("aot-app-state");
if (stored) {
  try {
    const parsed = JSON.parse(stored) as { state?: { theme?: Theme } };
    if (parsed?.state?.theme) {
      applyTheme(parsed.state.theme);
    }
  } catch {
    // ignore
  }
}
