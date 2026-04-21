import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import CharacterModal from "../components/CharacterModal";
import { useStore } from "../store/useStore";
import type { Character, CharacterSortKey } from "../types";

// ─── Character Data ───────────────────────────────────────────────────────────
export const CHARACTERS: Character[] = [
  {
    id: "eren-yeager",
    name: "Eren Yeager",
    image: "/assets/generated/eren-yeager.dim_400x600.jpg",
    role: "Special Operative",
    faction: "Survey Corps",
    titan: "Attack Titan / Founding Titan / War Hammer",
    status: "Dead",
    debut: "Year 850 — Fall of Shiganshina",
    abilities: [
      "Titan Shifter",
      "Hardening",
      "Coordinate",
      "War Hammer Inheritance",
      "Path Manipulation",
    ],
    quote:
      "If you win, you live. If you lose, you die. If you don't fight, you can't win.",
    bio: "Eren Yeager is the primary protagonist of Attack on Titan. Born in Shiganshina District, witnessing his mother's death drove him to join the Survey Corps. As a holder of multiple Titan powers, he ultimately chose a path of mass destruction in his pursuit of Eldian freedom.",
    rank: "Special Operative",
    stats: { strength: 85, intelligence: 78, speed: 80, leadership: 60 },
    popularity: 98,
  },
  {
    id: "mikasa-ackerman",
    name: "Mikasa Ackerman",
    image: "/assets/generated/mikasa-ackerman.dim_400x600.jpg",
    role: "Elite Officer",
    faction: "Survey Corps",
    titan: null,
    status: "Alive",
    debut: "Year 850 — Fall of Shiganshina",
    abilities: [
      "Ackerman Awakening",
      "Enhanced Reflexes",
      "ODM Mastery",
      "Peak Human Physiology",
    ],
    quote: "This world is cruel. It hit me that living was a miracle.",
    bio: "Mikasa Ackerman is considered one of the finest soldiers in Survey Corps history. As an Ackerman, she possesses enhanced combat ability and an unbreakable will. Her fierce loyalty to Eren shaped much of her journey throughout the conflict.",
    rank: "Elite Officer",
    stats: { strength: 95, intelligence: 75, speed: 97, leadership: 65 },
    popularity: 96,
  },
  {
    id: "armin-arlert",
    name: "Armin Arlert",
    image: "/assets/generated/armin-arlert.dim_400x600.jpg",
    role: "Tactical Advisor",
    faction: "Survey Corps",
    titan: "Colossus Titan",
    status: "Alive",
    debut: "Year 850 — Fall of Shiganshina",
    abilities: [
      "Strategic Genius",
      "Colossus Titan Form",
      "Diplomatic Acumen",
      "Nuclear Steam Blast",
    ],
    quote: "A person who cannot sacrifice everything cannot change anything.",
    bio: "Armin Arlert is the 15th Commander of the Survey Corps, known for his exceptional strategic mind. Though physically weak early in his career, his tactical brilliance turned the tide of many battles. He inherited the Colossus Titan from Bertholdt Hoover.",
    rank: "Commander",
    stats: { strength: 45, intelligence: 99, speed: 55, leadership: 90 },
    popularity: 92,
  },
  {
    id: "levi-ackerman",
    name: "Levi Ackerman",
    image: "/assets/generated/levi-ackerman.dim_400x600.jpg",
    role: "Squad Captain",
    faction: "Survey Corps",
    titan: null,
    status: "Alive",
    debut: "Year 850 — Battle of Trost",
    abilities: [
      "Ackerman Awakening",
      "Humanity's Strongest Soldier",
      "Dual Blade Mastery",
      "ODM Virtuosity",
    ],
    quote:
      "The only thing we're allowed to do is to believe that we won't regret the choice we made.",
    bio: "Levi Ackerman, also known as Captain Levi, is widely recognized as humanity's strongest soldier. Despite his small frame, he possesses extraordinary combat ability attributed to his Ackerman bloodline. His past in the underground city shaped his ruthless pragmatism.",
    rank: "Captain",
    stats: { strength: 90, intelligence: 85, speed: 99, leadership: 88 },
    popularity: 99,
  },
  {
    id: "erwin-smith",
    name: "Erwin Smith",
    image: "/assets/generated/erwin-smith.dim_400x600.jpg",
    role: "Commander",
    faction: "Survey Corps",
    titan: null,
    status: "Dead",
    debut: "Year 850 — Battle of Trost",
    abilities: [
      "Masterful Strategist",
      "Charismatic Leadership",
      "Long-Range Tactical Planning",
    ],
    quote: "We die trusting the living to carry out our will.",
    bio: "Erwin Smith served as the 13th Commander of the Survey Corps. His single-minded pursuit of the truth about humanity's history led him to make sacrifices that changed the tide of the war. He was revered by his soldiers for his inspirational leadership.",
    rank: "Commander",
    stats: { strength: 60, intelligence: 97, speed: 55, leadership: 99 },
    popularity: 88,
  },
  {
    id: "hange-zoe",
    name: "Hange Zoë",
    image: "/assets/generated/hange-zoe.dim_400x600.jpg",
    role: "Section Commander",
    faction: "Survey Corps",
    titan: null,
    status: "Dead",
    debut: "Year 850 — Battle of Trost",
    abilities: [
      "Scientific Research",
      "Titan Experimentation",
      "Field Command",
      "ODM Expertise",
    ],
    quote:
      "Don't patronize me. I've seen things that'd make your hair stand on end.",
    bio: "Hange Zoë served as Section Commander and later the 14th Commander of the Survey Corps. Their obsessive research into Titans yielded critical intelligence. Their sacrifice during the Rumbling halted the Wall Titans long enough for humanity to survive.",
    rank: "Section Commander",
    stats: { strength: 65, intelligence: 96, speed: 70, leadership: 85 },
    popularity: 85,
  },
  {
    id: "historia-reiss",
    name: "Historia Reiss",
    image: "/assets/generated/historia-reiss.dim_400x600.jpg",
    role: "Queen of the Walls",
    faction: "Survey Corps",
    titan: null,
    status: "Alive",
    debut: "Year 850 — Training Arc",
    abilities: [
      "Royal Bloodline",
      "Political Acumen",
      "Combat Training",
      "Founding Titan Candidate",
    ],
    quote: "I am the true ruler of the Walls. Historia Reiss.",
    bio: "Historia Reiss, formerly known as Christa Lenz, is the Queen of the Walls and last heir to the royal Reiss bloodline. After revealing her true identity, she rejected the path of sacrifice imposed upon her and chose to fight for humanity on her own terms.",
    rank: "Queen",
    stats: { strength: 55, intelligence: 80, speed: 72, leadership: 88 },
    popularity: 82,
  },
  {
    id: "reiner-braun",
    name: "Reiner Braun",
    image: "/assets/generated/reiner-braun.dim_400x600.jpg",
    role: "Warrior",
    faction: "Warriors",
    titan: "Armored Titan",
    status: "Alive",
    debut: "Year 850 — Fall of Shiganshina",
    abilities: [
      "Armored Titan Form",
      "Armored Hardening",
      "Military Combat",
      "Leadership Under Duress",
    ],
    quote:
      "I've been a warrior. I've been a soldier. I've been everything between. I don't know who I am anymore.",
    bio: "Reiner Braun is a Marleyan Warrior and inheritor of the Armored Titan. Torn between his duty to Marley and his bonds with the Survey Corps, Reiner struggles with the weight of the devastation he caused. His dual identity left him psychologically fractured.",
    rank: "Warrior",
    stats: { strength: 92, intelligence: 70, speed: 68, leadership: 72 },
    popularity: 87,
  },
  {
    id: "annie-leonhart",
    name: "Annie Leonhart",
    image: "/assets/generated/annie-leonhart.dim_400x600.jpg",
    role: "Military Police Officer",
    faction: "Military Police",
    titan: "Female Titan",
    status: "Alive",
    debut: "Year 850 — Battle of Trost",
    abilities: [
      "Female Titan Form",
      "Crystal Hardening",
      "Combat Specialist",
      "Crystallization Technique",
    ],
    quote:
      "I don't have any reason to go back to my hometown. But I still want to go back.",
    bio: "Annie Leonhart is a Marleyan Warrior and inheritor of the Female Titan. Ranked 4th in the 104th Training Corps, she infiltrated the walls as a spy. Her crystalline hardening ability allowed her to seal herself in a cocoon for years before emerging as humanity faced its greatest crisis.",
    rank: "Warrior",
    stats: { strength: 88, intelligence: 84, speed: 90, leadership: 58 },
    popularity: 86,
  },
  {
    id: "bertholdt-hoover",
    name: "Bertholdt Hoover",
    image: "/assets/generated/bertholdt-hoover.dim_400x600.jpg",
    role: "Warrior",
    faction: "Warriors",
    titan: "Colossus Titan",
    status: "Dead",
    debut: "Year 850 — Fall of Shiganshina",
    abilities: [
      "Colossus Titan Form",
      "Thermal Steam Emission",
      "Explosive Transformation",
      "Infiltration",
    ],
    quote: "There are no other options. We either kill them or get killed.",
    bio: "Bertholdt Hoover was a Marleyan Warrior and the original inheritor of the Colossus Titan. Responsible for breaching Wall Maria, he lived with the guilt of the countless lives lost that day. Despite his mission, he formed genuine bonds with his survey corps comrades.",
    rank: "Warrior",
    stats: { strength: 78, intelligence: 72, speed: 65, leadership: 50 },
    popularity: 74,
  },
  {
    id: "zeke-yeager",
    name: "Zeke Yeager",
    image: "/assets/generated/zeke-yeager.dim_400x600.jpg",
    role: "Warchief",
    faction: "Warriors",
    titan: "Beast Titan",
    status: "Dead",
    debut: "Year 850 — Battle of Castle Utgard",
    abilities: [
      "Beast Titan Form",
      "Titan Commanding",
      "Royal Blood Power",
      "Precision Throwing",
      "Scream Ability",
    ],
    quote: "You Subjects of Ymir... are all slaves to this world.",
    bio: "Zeke Yeager was the Warchief of the Marleyan Warriors and inheritor of the Beast Titan. Son of Grisha Yeager, he planned to euthanize all Eldians by using his royal blood Scream in conjunction with the Founding Titan. His complex ideology made him one of the series' most tragic antagonists.",
    rank: "Warchief",
    stats: { strength: 80, intelligence: 95, speed: 62, leadership: 82 },
    popularity: 83,
  },
  {
    id: "gabi-braun",
    name: "Gabi Braun",
    image: "/assets/generated/gabi-braun.dim_400x600.jpg",
    role: "Warrior Candidate",
    faction: "Warriors",
    titan: null,
    status: "Alive",
    debut: "Year 854 — Marley Arc",
    abilities: [
      "Expert Marksmanship",
      "Elite Warrior Training",
      "Anti-Titan Combat",
      "Athletic Prowess",
    ],
    quote:
      "I'll inherit the Armored Titan! And I'll prove that we Eldians are worthy of living in Marley!",
    bio: "Gabi Braun is a Marleyan Warrior candidate and the top candidate to inherit the Armored Titan from Reiner. Fiercely patriotic and militaristic, her journey to Paradis forced her to confront the complex truths about Eldians and the world she thought she knew.",
    rank: "Warrior Candidate",
    stats: { strength: 65, intelligence: 76, speed: 80, leadership: 60 },
    popularity: 72,
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────
const ALL_FACTIONS = [
  "Survey Corps",
  "Military Police",
  "Garrison",
  "Warriors",
];
const SORT_OPTIONS: { value: CharacterSortKey; label: string }[] = [
  { value: "popularity", label: "POPULARITY" },
  { value: "strength", label: "STRENGTH" },
  { value: "intelligence", label: "INTELLIGENCE" },
  { value: "speed", label: "SPEED" },
  { value: "leadership", label: "LEADERSHIP" },
];

const FACTION_COLORS: Record<string, string> = {
  "Survey Corps": "text-accent border-accent/40 bg-accent/10",
  "Military Police": "text-blue-400 border-blue-400/40 bg-blue-400/10",
  Garrison: "text-yellow-500 border-yellow-500/40 bg-yellow-500/10",
  Warriors: "text-primary border-primary/40 bg-primary/20",
  Titans: "text-orange-400 border-orange-400/40 bg-orange-400/10",
};

// ─── Stat Bar Component ───────────────────────────────────────────────────────
function MiniStatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-0.5">
      <div className="flex justify-between items-center">
        <span
          className="terminal-text text-muted-foreground"
          style={{ fontSize: "0.6rem", letterSpacing: "0.1em" }}
        >
          {label}
        </span>
        <span
          className="terminal-text text-primary"
          style={{ fontSize: "0.6rem" }}
        >
          {value}
        </span>
      </div>
      <div className="h-0.5 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Character Card ───────────────────────────────────────────────────────────
function CharacterCard({
  character,
  index,
}: { character: Character; index: number }) {
  const { setSelectedCharacter } = useStore();
  const [hovered, setHovered] = useState(false);
  const factionClass =
    FACTION_COLORS[character.faction] ??
    "text-muted-foreground border-border bg-muted/20";

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className="relative group text-left overflow-hidden border border-border bg-card hover:border-primary/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
      style={{ willChange: "transform, opacity" }}
      onClick={() => setSelectedCharacter(character)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid={`characters.item.${index + 1}`}
      aria-label={`View ${character.name} profile`}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />

        {/* Status badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-0.5 text-xs terminal-text font-bold ${
            character.status === "Alive"
              ? "bg-accent/20 text-accent border border-accent/40"
              : "bg-primary/20 text-primary border border-primary/40"
          }`}
        >
          {character.status === "Alive" ? "● ACTIVE" : "◆ KIA"}
        </div>

        {/* Titan badge */}
        {character.titan && (
          <div className="absolute top-2 left-2 px-1.5 py-0.5 text-xs terminal-text bg-primary/30 text-primary border border-primary/50">
            ⚡ SHIFTER
          </div>
        )}

        {/* Hover stats overlay */}
        <motion.div
          className="absolute inset-0 bg-background/92 backdrop-blur-sm p-3 flex flex-col justify-end pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <p
            className="terminal-text text-primary mb-2"
            style={{ fontSize: "0.6rem", letterSpacing: "0.3em" }}
          >
            ◉ STATISTICAL DATA
          </p>
          <div className="space-y-1.5">
            <MiniStatBar label="STRENGTH" value={character.stats.strength} />
            <MiniStatBar
              label="INTELLIGENCE"
              value={character.stats.intelligence}
            />
            <MiniStatBar label="SPEED" value={character.stats.speed} />
            <MiniStatBar
              label="LEADERSHIP"
              value={character.stats.leadership}
            />
          </div>
          <div className="mt-3 pt-2 border-t border-border/40">
            <p
              className="terminal-text text-muted-foreground text-center"
              style={{ fontSize: "0.55rem", letterSpacing: "0.2em" }}
            >
              CLICK TO ACCESS FULL DOSSIER
            </p>
          </div>
        </motion.div>
      </div>

      {/* Card footer */}
      <div className="p-3 space-y-1">
        <h3 className="cinematic-title text-sm text-foreground leading-tight">
          {character.name.toUpperCase()}
        </h3>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${character.status === "Alive" ? "bg-accent" : "bg-primary"}`}
          />
          <span
            className="terminal-text text-muted-foreground truncate"
            style={{ fontSize: "0.65rem" }}
          >
            {character.rank.toUpperCase()}
          </span>
        </div>
        <span
          className={`inline-block px-1.5 py-0.5 text-xs terminal-text border ${factionClass}`}
          style={{ fontSize: "0.6rem" }}
        >
          {character.faction.toUpperCase()}
        </span>
      </div>

      {/* Hover glow border */}
      <motion.div
        className="absolute inset-0 pointer-events-none border border-primary/0"
        animate={{
          borderColor: hovered ? "oklch(0.26 0.22 25 / 0.5)" : "transparent",
        }}
        style={{
          boxShadow: hovered
            ? "inset 0 0 20px oklch(0.26 0.22 25 / 0.08)"
            : "none",
        }}
      />
    </motion.button>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function CharactersSection() {
  const {
    characterFilters,
    setCharacterFilters,
    characterSort,
    setCharacterSort,
    selectedCharacter,
    setSelectedCharacter,
  } = useStore();

  const [showFilters, setShowFilters] = useState(true);

  const filtered = CHARACTERS.filter((c) => {
    if (
      characterFilters.status !== "all" &&
      c.status !== characterFilters.status
    )
      return false;
    if (
      characterFilters.faction.length > 0 &&
      !characterFilters.faction.includes(c.faction)
    )
      return false;
    if (characterFilters.titanType === "titan-shifter" && !c.titan)
      return false;
    if (characterFilters.titanType === "human" && c.titan) return false;
    if (
      characterFilters.search &&
      !c.name.toLowerCase().includes(characterFilters.search.toLowerCase())
    )
      return false;
    return true;
  }).sort((a, b) => {
    if (characterSort === "popularity") return b.popularity - a.popularity;
    if (characterSort === "name") return a.name.localeCompare(b.name);
    return (
      b.stats[characterSort as keyof typeof b.stats] -
      a.stats[characterSort as keyof typeof a.stats]
    );
  });

  const clearFilters = useCallback(() => {
    setCharacterFilters({
      faction: [],
      status: "all",
      titanType: "all",
      search: "",
    });
  }, [setCharacterFilters]);

  const toggleFaction = useCallback(
    (faction: string) => {
      const active = characterFilters.faction.includes(faction);
      setCharacterFilters({
        faction: active
          ? characterFilters.faction.filter((f) => f !== faction)
          : [...characterFilters.faction, faction],
      });
    },
    [characterFilters.faction, setCharacterFilters],
  );

  return (
    <section
      id="section-characters"
      data-section="characters"
      className="relative py-24 bg-muted/20"
      data-ocid="characters.section"
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          className="mb-12 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="terminal-text text-primary text-xs tracking-[0.5em]">
              ◉ CLASSIFIED ◉
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
          </div>

          <div className="text-center space-y-2">
            <div className="relative inline-block">
              <h2
                className="cinematic-title text-4xl sm:text-6xl text-foreground"
                data-ocid="characters.title"
              >
                INTELLIGENCE DOSSIER
              </h2>
              {/* Classified stamp effect */}
              <div className="absolute -top-2 -right-4 hidden sm:block rotate-[-12deg] border-2 border-primary/60 px-3 py-1 opacity-70">
                <span
                  className="terminal-text text-primary"
                  style={{ fontSize: "0.55rem", letterSpacing: "0.3em" }}
                >
                  RESTRICTED
                </span>
              </div>
            </div>
            <p className="terminal-text text-muted-foreground text-xs tracking-[0.4em]">
              ELDIAN MILITARY — PERSONNEL FILES — CLEARANCE LEVEL: ALPHA
            </p>
            <p className="terminal-text text-primary/60 text-xs">
              {`[ ${CHARACTERS.length} RECORDS ON FILE · ${filtered.length} MATCHES ACTIVE QUERY ]`}
            </p>
          </div>
        </motion.div>

        {/* ── Sort Bar ── */}
        <motion.div
          className="flex flex-wrap items-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          data-ocid="characters.sort_bar"
        >
          <span className="terminal-text text-muted-foreground text-xs tracking-widest mr-2 hidden sm:inline">
            SORT BY:
          </span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setCharacterSort(opt.value)}
              data-ocid={`characters.sort_${opt.value}`}
              className={`px-3 py-1.5 text-xs terminal-text border transition-all duration-200 ${
                characterSort === opt.value
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
              }`}
            >
              {characterSort === opt.value && <span className="mr-1">▶</span>}
              {opt.label}
            </button>
          ))}

          <div className="ml-auto">
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              data-ocid="characters.toggle_filters_button"
              className="px-3 py-1.5 text-xs terminal-text border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
            >
              {showFilters ? "▲ FILTERS" : "▼ FILTERS"}
            </button>
          </div>
        </motion.div>

        {/* ── Filter Panel ── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
              data-ocid="characters.filters"
            >
              <div className="glass-panel border border-border/50 p-4 space-y-4">
                <div className="flex flex-wrap gap-3 items-center">
                  {/* Search */}
                  <div className="flex-1 min-w-48 relative">
                    <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 terminal-text text-muted-foreground/50"
                      style={{ fontSize: "0.65rem" }}
                    >
                      ⌕
                    </span>
                    <input
                      type="text"
                      placeholder="SEARCH PERSONNEL..."
                      value={characterFilters.search}
                      onChange={(e) =>
                        setCharacterFilters({ search: e.target.value })
                      }
                      className="w-full bg-background border border-border pl-7 pr-4 py-2 terminal-text text-foreground text-xs placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
                      data-ocid="characters.search_input"
                    />
                  </div>

                  {/* Status filter */}
                  <select
                    value={characterFilters.status}
                    onChange={(e) =>
                      setCharacterFilters({
                        status: e.target
                          .value as typeof characterFilters.status,
                      })
                    }
                    className="bg-background border border-border px-3 py-2 terminal-text text-muted-foreground text-xs focus:outline-none focus:border-primary transition-colors"
                    data-ocid="characters.status_select"
                  >
                    <option value="all">ALL STATUS</option>
                    <option value="Alive">● ALIVE</option>
                    <option value="Dead">◆ DECEASED</option>
                  </select>

                  {/* Titan type filter */}
                  <select
                    value={characterFilters.titanType}
                    onChange={(e) =>
                      setCharacterFilters({
                        titanType: e.target
                          .value as typeof characterFilters.titanType,
                      })
                    }
                    className="bg-background border border-border px-3 py-2 terminal-text text-muted-foreground text-xs focus:outline-none focus:border-primary transition-colors"
                    data-ocid="characters.type_select"
                  >
                    <option value="all">ALL TYPES</option>
                    <option value="titan-shifter">⚡ TITAN SHIFTERS</option>
                    <option value="human">◯ HUMAN ONLY</option>
                  </select>

                  {/* Clear */}
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="px-3 py-2 text-xs terminal-text border border-border/40 text-muted-foreground/60 hover:border-primary hover:text-primary transition-colors"
                    data-ocid="characters.clear_filters_button"
                  >
                    CLEAR ALL
                  </button>
                </div>

                {/* Faction buttons */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="terminal-text text-muted-foreground/50 text-xs tracking-widest mr-1">
                    FACTION:
                  </span>
                  {ALL_FACTIONS.map((faction) => {
                    const active = characterFilters.faction.includes(faction);
                    const colorClass =
                      FACTION_COLORS[faction] ??
                      "text-muted-foreground border-border";
                    return (
                      <button
                        type="button"
                        key={faction}
                        onClick={() => toggleFaction(faction)}
                        data-ocid={`characters.faction_filter.${faction.toLowerCase().replace(/\s+/g, "_")}`}
                        className={`px-3 py-1 text-xs terminal-text border transition-all duration-200 ${
                          active
                            ? colorClass
                            : "border-border text-muted-foreground hover:border-muted-foreground"
                        }`}
                      >
                        {active && <span className="mr-1">✓</span>}
                        {faction.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Character Grid ── */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
              data-ocid="characters.empty_state"
            >
              <div className="w-16 h-16 border border-primary/30 flex items-center justify-center">
                <span className="terminal-text text-primary text-2xl">⚠</span>
              </div>
              <span className="terminal-text text-primary text-xs tracking-widest">
                NO RECORDS FOUND
              </span>
              <p className="terminal-text text-muted-foreground text-sm">
                Adjust filters to search the personnel database.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 border border-border text-muted-foreground terminal-text text-xs hover:border-primary hover:text-primary transition-colors"
                data-ocid="characters.reset_button"
              >
                RESET DATABASE QUERY
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4"
              data-ocid="characters.list"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((char, i) => (
                  <CharacterCard key={char.id} character={char} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Record count footer */}
        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px flex-1 bg-border/40" />
          <span className="terminal-text text-muted-foreground/40 text-xs tracking-widest">
            {`DISPLAYING ${filtered.length}/${CHARACTERS.length} RECORDS`}
          </span>
          <div className="h-px flex-1 bg-border/40" />
        </motion.div>
      </div>

      {/* Character modal */}
      <AnimatePresence>
        {selectedCharacter && (
          <CharacterModal
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
