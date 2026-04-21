// ─── Theme ───────────────────────────────────────────────────────────────────
export type Theme = "dark" | "red";

// ─── Audio ───────────────────────────────────────────────────────────────────
export type AudioTrack = "calm" | "battle" | "emotional" | "none";

// ─── Navigation ──────────────────────────────────────────────────────────────
export type NavSection =
  | "home"
  | "quotes"
  | "characters"
  | "titans"
  | "world"
  | "timeline"
  | "terminal"
  | "gallery";

export interface NavItem {
  id: NavSection;
  label: string;
  href: string;
}

// ─── Character ───────────────────────────────────────────────────────────────
export interface CharacterStats {
  strength: number;
  intelligence: number;
  speed: number;
  leadership: number;
}

export interface Character {
  id: string;
  name: string;
  image: string;
  role: string;
  faction: string;
  titan: string | null;
  status: "Alive" | "Dead" | "Unknown";
  debut: string;
  abilities: string[];
  quote: string;
  stats: CharacterStats;
  popularity: number;
  rank: string;
  bio: string;
}

// ─── Titan ───────────────────────────────────────────────────────────────────
export interface Titan {
  id: string;
  name: string;
  height: string;
  ability: string;
  inheritor: string;
  firstAppearance: string;
  dangerLevel: number;
  description: string;
  classification: "Nine Titans" | "Pure Titan" | "Colossal Class";
}

// ─── Timeline Event ──────────────────────────────────────────────────────────
export type Arc =
  | "Before the Fall"
  | "Fall of Shiganshina"
  | "Training Arc"
  | "Battle of Trost"
  | "Female Titan"
  | "The Uprising"
  | "Return to Shiganshina"
  | "Marley Arc"
  | "War for Paradis";

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  arc: Arc;
  isKeyEvent: boolean;
}

// ─── Gallery Image ────────────────────────────────────────────────────────────
export type GalleryCategory = "Battles" | "Characters" | "Titans" | "World";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
}

// ─── Quote ───────────────────────────────────────────────────────────────────
export interface Quote {
  text: string;
  author: string;
  arc?: string;
}

// ─── Filters / Sorting ───────────────────────────────────────────────────────
export type CharacterSortKey =
  | "strength"
  | "intelligence"
  | "speed"
  | "leadership"
  | "popularity"
  | "name";
export type FactionFilter = string;
export type StatusFilter = "Alive" | "Dead" | "Unknown" | "all";
export type TitanFilter = "titan-shifter" | "human" | "all";

export interface CharacterFilters {
  faction: string[];
  status: StatusFilter;
  titanType: TitanFilter;
  search: string;
}

// ─── Map Location ─────────────────────────────────────────────────────────────
export interface MapLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  type: "wall" | "district" | "region";
  description: string;
  significance: string;
}

// ─── Store ────────────────────────────────────────────────────────────────────
export interface AppStore {
  // UI State
  currentSection: NavSection;
  setCurrentSection: (section: NavSection) => void;

  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Story Mode
  storyModeEnabled: boolean;
  setStoryModeEnabled: (enabled: boolean) => void;
  toggleStoryMode: () => void;

  // Audio
  audioTrack: AudioTrack;
  setAudioTrack: (track: AudioTrack) => void;
  audioVolume: number;
  setAudioVolume: (volume: number) => void;
  audioPlaying: boolean;
  setAudioPlaying: (playing: boolean) => void;

  // Mobile nav
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;

  // Character modal
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;

  // Character filters & sorting
  characterFilters: CharacterFilters;
  setCharacterFilters: (filters: Partial<CharacterFilters>) => void;
  characterSort: CharacterSortKey;
  setCharacterSort: (sort: CharacterSortKey) => void;

  // Intro sequence
  introComplete: boolean;
  setIntroComplete: (complete: boolean) => void;
}
