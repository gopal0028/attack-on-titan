import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Local Types
───────────────────────────────────────────── */
type EventType = "battle" | "revelation" | "death" | "alliance";

interface ArcMarker {
  kind: "arc";
  arcId: string;
  arcLabel: string;
  arcSubtitle: string;
}

interface RichEvent {
  kind: "event";
  id: string;
  year: string;
  arc: string;
  arcId: string;
  title: string;
  narration: string;
  type: EventType;
  side: "left" | "right";
  /** CSS gradient used as atmospheric scene image */
  imageBg: string;
  /** Brief image caption shown at the bottom of the image panel */
  imageCaption: string;
}

type TimelineItem = ArcMarker | RichEvent;

interface ArcConfig {
  bg: string;
  accent: string;
}

/* ─────────────────────────────────────────────
   Arc visual config
───────────────────────────────────────────── */
const ARC_CONFIG: Record<string, ArcConfig> = {
  arc1: { bg: "from-[#0e0e0e] via-[#111] to-[#1a1a1a]", accent: "#6b7280" },
  arc2: { bg: "from-[#111111] via-[#161410] to-[#1c1915]", accent: "#78716c" },
  arc3: { bg: "from-[#140f0a] via-[#19120c] to-[#1e1410]", accent: "#a16207" },
  arc4: { bg: "from-[#1a1008] via-[#201510] to-[#241510]", accent: "#b45309" },
  arc5: { bg: "from-[#1c1008] via-[#23140c] to-[#271608]", accent: "#c2410c" },
  arc6: { bg: "from-[#1a0e0e] via-[#221010] to-[#291010]", accent: "#dc2626" },
  arc7: { bg: "from-[#1e0a0a] via-[#280a0a] to-[#2d0a0a]", accent: "#ef4444" },
  arc8: { bg: "from-[#1c0a0a] via-[#260808] to-[#300808]", accent: "#b91c1c" },
  arc9: { bg: "from-[#200606] via-[#2d0505] to-[#360404]", accent: "#991b1b" },
  arc10: { bg: "from-[#120000] via-[#190000] to-[#200000]", accent: "#7f1d1d" },
};

/* ─────────────────────────────────────────────
   Event type styling
───────────────────────────────────────────── */
const TYPE_CONFIG: Record<
  EventType,
  {
    glow: string;
    badge: string;
    color: string;
    label: string;
    panelBorder: string;
  }
> = {
  battle: {
    glow: "shadow-[0_0_40px_rgba(239,68,68,0.18)]",
    badge: "bg-red-900/50 text-red-300 border border-red-800/50",
    color: "#ef4444",
    label: "BATTLE",
    panelBorder: "rgba(239,68,68,0.25)",
  },
  revelation: {
    glow: "shadow-[0_0_40px_rgba(234,179,8,0.14)]",
    badge: "bg-yellow-900/50 text-yellow-300 border border-yellow-700/50",
    color: "#eab308",
    label: "REVELATION",
    panelBorder: "rgba(234,179,8,0.22)",
  },
  death: {
    glow: "shadow-[0_0_32px_rgba(107,114,128,0.18)]",
    badge: "bg-neutral-800/70 text-neutral-300 border border-neutral-600/40",
    color: "#9ca3af",
    label: "DEATH",
    panelBorder: "rgba(107,114,128,0.22)",
  },
  alliance: {
    glow: "shadow-[0_0_32px_rgba(59,130,246,0.16)]",
    badge: "bg-blue-900/50 text-blue-300 border border-blue-800/50",
    color: "#3b82f6",
    label: "ALLIANCE",
    panelBorder: "rgba(59,130,246,0.22)",
  },
};

/* ─────────────────────────────────────────────
   Atmospheric image backgrounds per event
───────────────────────────────────────────── */
const SMOKE =
  "radial-gradient(ellipse at 30% 70%, rgba(0,0,0,0.7) 0%, transparent 70%),radial-gradient(ellipse at 80% 20%, rgba(0,0,0,0.5) 0%, transparent 60%)";
function scene(gradient: string) {
  return `${SMOKE},${gradient}`;
}

/* ─────────────────────────────────────────────
   Full timeline data with narration + images
───────────────────────────────────────────── */
const TIMELINE_ITEMS: TimelineItem[] = [
  /* ── ARC I ─────────────────────────────────── */
  {
    kind: "arc",
    arcId: "arc1",
    arcLabel: "ARC I: FALL OF SHIGANSHINA",
    arcSubtitle: "Year 845 — The walls are breached. Innocence ends.",
  },
  {
    kind: "event",
    id: "e01",
    arcId: "arc1",
    year: "845",
    arc: "Fall of Shiganshina",
    title: "The Colossal Titan Appears",
    narration:
      "On a grey morning in year 845, the sky itself seemed to fracture. Without warning, the Colossal Titan rose above Wall Maria — sixty meters of steam, malice, and impossible scale. Its single kick obliterated the outer gate of Shiganshina District, ending a century of enforced peace in an instant. The sound echoed not just through stone, but through the psyche of every child who had been told the Walls would never fall.",
    type: "battle",
    side: "right",
    imageBg: scene(
      "linear-gradient(160deg, #0a0a0a 0%, #1a0505 30%, #2d0808 55%, #4a0c0c 75%, #1a0505 100%)",
    ),
    imageCaption: "Wall Maria — Shiganshina Gate, Year 845",
  },
  {
    kind: "event",
    id: "e02",
    arcId: "arc1",
    year: "845",
    arc: "Fall of Shiganshina",
    title: "Wall Maria Falls",
    narration:
      "While the Colossal Titan drew every eye upward, the Armored Titan charged from below — a living battering ram that shattered the inner gate with mindless, terrifying purpose. Titans flooded Shiganshina. Carla Yeager was pinned beneath rubble, her cries swallowed by the chaos. Eren Yeager watched helplessly as the smiling Titan devoured his mother whole. In that moment, every gentle thing in Eren died with her — replaced by a hatred as vast and cold as the sky above the broken Wall.",
    type: "death",
    side: "left",
    imageBg: scene(
      "linear-gradient(180deg, #0c0c0c 0%, #1f1f1f 20%, #3d1f00 50%, #1a0c00 75%, #0d0d0d 100%)",
    ),
    imageCaption: "Shiganshina District — Mass Evacuation, Year 845",
  },
  {
    kind: "event",
    id: "e03",
    arcId: "arc1",
    year: "845–847",
    arc: "Fall of Shiganshina",
    title: "The Great Retreat & Refugee Crisis",
    narration:
      "Two million people fled Wall Maria in a single day — the largest forced migration in recorded history. Humanity contracted behind Wall Rose, and the food crisis that followed drove desperate decisions. The Royal Government dispatched 250,000 civilians on a reclamation mission they knew would fail, using starvation to thin the refugee population. Eren, Mikasa, and Armin bore witness to this quiet genocide. They enlisted in the military not out of duty, but out of a fury that could no longer be contained.",
    type: "revelation",
    side: "right",
    imageBg: scene(
      "linear-gradient(145deg, #0e0e0e 0%, #1c1c1c 25%, #2e2414 55%, #1a1508 80%, #0c0c0c 100%)",
    ),
    imageCaption: "Wall Rose Territory — Refugee Columns, Year 845–847",
  },

  /* ── ARC II ─────────────────────────────────── */
  {
    kind: "arc",
    arcId: "arc2",
    arcLabel: "ARC II: TRAINING CORPS",
    arcSubtitle: "Year 847 — Cadets are forged from grief.",
  },
  {
    kind: "event",
    id: "e04",
    arcId: "arc2",
    year: "847",
    arc: "Training Corps",
    title: "104th Cadet Corps Begins",
    narration:
      "They came from every corner of the Walls — orphans, idealists, the desperate, and the disguised. In the brutal training camps of the 104th Cadet Corps, recruits were broken and rebuilt under an unforgiving curriculum. Eren, Mikasa, and Armin trained alongside Annie, Reiner, Bertholdt, and Connie, forging bonds over shared exhaustion and shared nightmares. None of them knew that betrayal was already among them, wearing the same uniform, sharing the same rations, sleeping in the same barracks.",
    type: "alliance",
    side: "left",
    imageBg: scene(
      "linear-gradient(135deg, #0e0e0e 0%, #141414 30%, #1a1a2e 55%, #0f0f1a 80%, #0e0e0e 100%)",
    ),
    imageCaption: "Training Corps Camp — ODM Gear Drills, Year 847",
  },
  {
    kind: "event",
    id: "e05",
    arcId: "arc2",
    year: "850",
    arc: "Training Corps",
    title: "Graduation — Top 10 Named",
    narration:
      "Three years of blood and discipline culminated in a graduation ceremony that felt more like a funeral than a celebration. Mikasa ranked first — a prodigy beyond measure. Reiner second. Bertholdt third. Annie fourth. Eren fifth. The top ten earned Military Police privilege and the promise of safety behind Wall Sina. Most of them, to the astonishment of the assembled officers, chose the Survey Corps instead — walking willingly toward the abyss outside the Walls.",
    type: "revelation",
    side: "right",
    imageBg: scene(
      "linear-gradient(150deg, #0c0c0c 0%, #181818 25%, #1f1a10 55%, #141008 80%, #0c0c0c 100%)",
    ),
    imageCaption: "104th Cadet Corps — Graduation Ceremony, Year 850",
  },

  /* ── ARC III ─────────────────────────────────── */
  {
    kind: "arc",
    arcId: "arc3",
    arcLabel: "ARC III: BATTLE OF TROST",
    arcSubtitle: "Year 850 — Humanity fights back. A new power awakens.",
  },
  {
    kind: "event",
    id: "e06",
    arcId: "arc3",
    year: "850",
    arc: "Battle of Trost",
    title: "Trost District Breached",
    narration:
      "Three years after Wall Maria's fall, the Colossal Titan reappeared above Trost District as if time itself had looped back to the nightmare. The breach triggered an immediate Titan incursion. Garrison troops scrambled in chaos. Eren, barely graduated, charged into combat with the reckless fury of a boy who had never truly processed grief — only converted it. Thomas Wagner died before his eyes. Distracted by rage, Eren lost his leg to a Titan's jaws. Then, reaching into the beast's maw to save Armin, he lost everything else.",
    type: "battle",
    side: "left",
    imageBg: scene(
      "linear-gradient(160deg, #0c0000 0%, #1f0505 25%, #3d0a0a 50%, #5a0e0e 68%, #2d0505 85%, #0c0000 100%)",
    ),
    imageCaption: "Trost District — Titan Incursion, Year 850",
  },
  {
    kind: "event",
    id: "e07",
    arcId: "arc3",
    year: "850",
    arc: "Battle of Trost",
    title: "Eren's Titan Awakening",
    narration:
      "No one can fully explain what they saw that day in Trost. A Titan's fist burst from inside another Titan — then a fifteen-meter figure erupted upright, trailing steam, veins of dark energy mapping its body like war paint. Eren Yeager, consumed and presumed dead, had transformed into an Attack Titan. He tore apart every nearby Titan with his bare hands, a machine of fury operating beyond rational thought. The soldiers watching from rooftops didn't know whether to cheer or run. Humanity had just inherited a weapon it didn't understand.",
    type: "revelation",
    side: "right",
    imageBg: scene(
      "linear-gradient(140deg, #0d0000 0%, #200000 20%, #380808 40%, #5c1010 60%, #8b2020 75%, #2d0808 90%, #0d0000 100%)",
    ),
    imageCaption: "Trost — Rogue Titan Emergence, Year 850",
  },
  {
    kind: "event",
    id: "e08",
    arcId: "arc3",
    year: "850",
    arc: "Battle of Trost",
    title: "Boulder Operation — Trost Reclaimed",
    narration:
      "Commander Pixis gambled what remained of humanity's morale on a single teenager who had just awakened powers no one understood. Eren transformed and, barely maintaining control, lifted a 70-ton boulder toward the breach. He was attacked mid-task by fellow soldiers who mistook him for an enemy. With Mikasa's intervention and Levi's arrival, he reached the gate. The boulder fell. The breach sealed. Trost District was reclaimed — the first human victory in the war against the Titans. Eren was then arrested at gunpoint.",
    type: "battle",
    side: "left",
    imageBg: scene(
      "linear-gradient(155deg, #0a0a0a 0%, #1a1008 25%, #2e1e08 50%, #4a2e0a 65%, #2e1a05 80%, #0c0a0a 100%)",
    ),
    imageCaption: "Trost Gate — Boulder Sealing Operation, Year 850",
  },

  /* ── ARC IV ─────────────────────────────────── */
  {
    kind: "arc",
    arcId: "arc4",
    arcLabel: "ARC IV: THE FEMALE TITAN",
    arcSubtitle: "Year 850 — An enemy hides in plain sight.",
  },
  {
    kind: "event",
    id: "e09",
    arcId: "arc4",
    year: "850",
    arc: "Female Titan Arc",
    title: "Survey Corps 57th Expedition",
    narration:
      "The 57th Exterior Scouting Mission was the Survey Corps' most ambitious operation — and its most catastrophic. The Female Titan appeared in the forest with impossible precision, targeting specifically the formation's center where Eren was concealed. She slaughtered dozens of scouts with brutal efficiency, capturing Eren after devastating the Long-Range Scouting Formation. Captain Levi's entire Special Operations Squad — the soldiers closest to him — were systematically murdered before his eyes. The expedition returned in ruins. The traitor wore human skin.",
    type: "battle",
    side: "right",
    imageBg: scene(
      "linear-gradient(165deg, #050a0a 0%, #0a1414 25%, #0f1f1f 50%, #142828 65%, #0a1a1a 80%, #05100e 100%)",
    ),
    imageCaption: "Titan Forest — 57th Expedition Ambush, Year 850",
  },
  {
    kind: "event",
    id: "e10",
    arcId: "arc4",
    year: "850",
    arc: "Female Titan Arc",
    title: "Annie Leonhart Unmasked",
    narration:
      "The evidence assembled like an inescapable sentence: Annie Leonhart was the Female Titan. Levi and Hange cornered her in the Stohess District, deep within Wall Sina, where her escape routes were supposedly sealed. The confrontation was brief and devastating. Annie transformed, triggering a battle that tore through civilian streets. When Eren finally subdued her titan form, she encased herself in impenetrable crystal — a sleeping judgment, suspended in amber, beyond consequence. Her former squadmates looked at her frozen face and understood that some truths collapse everything around them.",
    type: "revelation",
    side: "left",
    imageBg: scene(
      "linear-gradient(150deg, #0a0a0a 0%, #0f1018 25%, #151520 50%, #0d1220 65%, #0a0e18 80%, #080808 100%)",
    ),
    imageCaption: "Stohess District — Annie's Crystal Encasement, Year 850",
  },

  /* ── ARC V ─────────────────────────────────── */
  {
    kind: "arc",
    arcId: "arc5",
    arcLabel: "ARC V: CLASH OF THE TITANS",
    arcSubtitle: "Year 850 — Friends become enemies. Walls hide secrets.",
  },
  {
    kind: "event",
    id: "e11",
    arcId: "arc5",
    year: "850",
    arc: "Clash of Titans",
    title: "Wall Rose — Titans Inside",
    narration:
      "No breach was found. Yet Titans were moving through Wall Rose territories with impossible freedom. The Survey Corps scattered to cover ground, track the incursion, and search for the gap that didn't exist. Connie Springer returned to his village and found it empty — except for a single immobile Titan, enormous and grotesque, lying atop his family home. Its face bore a horrifying resemblance to his mother. It smiled at him. In the accumulating horror of that silence, the first hypothesis formed: that Titans were not monsters born from outside, but humans transformed from within.",
    type: "revelation",
    side: "right",
    imageBg: scene(
      "linear-gradient(140deg, #0c0c0c 0%, #181410 25%, #221a0a 50%, #1c1508 65%, #141008 80%, #0c0c0c 100%)",
    ),
    imageCaption: "Wall Rose Interior — Titan Infiltration, Year 850",
  },
  {
    kind: "event",
    id: "e12",
    arcId: "arc5",
    year: "850",
    arc: "Clash of Titans",
    title: "Reiner & Bertholdt Revealed",
    narration:
      "Atop Wall Rose in the pale morning light, Reiner Braun pulled Eren aside and spoke words that restructured the entire history of the last three years: 'I'm the Armored Titan. Bertholdt is the Colossal Titan.' He said it with the exhausted matter-of-factness of a man confessing not a crime but a burden. They were Warriors — soldiers from Marley, sent to destroy the Walls at age twelve. Friends and killers, inseparable from each other. Before any response could form, both transformed simultaneously. The roar shook every stone in Wall Rose. The greatest betrayal in recorded history was already behind them.",
    type: "revelation",
    side: "left",
    imageBg: scene(
      "linear-gradient(160deg, #080808 0%, #140808 25%, #221010 50%, #3a1010 65%, #5c1c1c 78%, #2a0808 90%, #080808 100%)",
    ),
    imageCaption: "Wall Rose — Warrior Revelation, Year 850",
  },
  {
    kind: "event",
    id: "e13",
    arcId: "arc5",
    year: "850",
    arc: "Clash of Titans",
    title: "Battle of Castle Utgard",
    narration:
      "Stranded in Castle Utgard without ODM gear as darkness fell, a small group of veteran Survey Corps soldiers held back Titan assaults through the long night with little more than improvised weapons and the refusal to die quietly. Nanaba and Gelgar fell from the battlements before dawn arrived. At first light, the salvation they hoped for became a new catastrophe: Reiner and Bertholdt, revealed, transformed atop the Wall. The battle they had survived through the night became a prelude to something far worse. Castle Utgard fell. The real war had only just begun.",
    type: "battle",
    side: "right",
    imageBg: scene(
      "linear-gradient(145deg, #06060a 0%, #0c0c14 25%, #121224 50%, #181830 65%, #10101e 80%, #080808 100%)",
    ),
    imageCaption: "Castle Utgard — Night Siege, Year 850",
  },
  {
    kind: "event",
    id: "e14",
    arcId: "arc5",
    year: "850",
    arc: "Clash of Titans",
    title: "Ymir & the Jaw Titan Revealed",
    narration:
      "Ymir had carried her secret for sixty years: a stolen Titan power, a life of borrowed time, and a loyalty to Historia that superseded her own survival. When the cadets faced annihilation at Utgard, she broke the silence she'd maintained for decades — transforming into the Jaw Titan, tearing through the horde with feral precision, buying precious minutes for the survivors. But in the aftermath she surrendered herself to Reiner and Bertholdt. She chose Marley, knowing what awaited her there. She chose it for reasons she never fully explained. That choice would haunt Historia for years.",
    type: "revelation",
    side: "left",
    imageBg: scene(
      "linear-gradient(155deg, #050814 0%, #0a1020 25%, #0f1830 50%, #142040 65%, #0d1828 80%, #060a14 100%)",
    ),
    imageCaption: "Utgard — Ymir's Sacrifice, Year 850",
  },

  /* ── ARC VI ─────────────────────────────────── */
  {
    kind: "arc",
    arcId: "arc6",
    arcLabel: "ARC VI: ROYAL GOVERNMENT",
    arcSubtitle: "Year 850 — Revolution from within the walls.",
  },
  {
    kind: "event",
    id: "e15",
    arcId: "arc6",
    year: "850",
    arc: "Royal Government Arc",
    title: "Erwin Arrested — Military Coup Begins",
    narration:
      "The Royal Government's response to Eren's existence was fear wearing the mask of law. Soldiers arrived to arrest Commander Erwin Smith and seize Eren and Historia for reasons that were never officially disclosed. Levi made the calculation with practiced cold logic: the Scout Regiment had to go underground or be dismantled entirely. Erwin was allowed to be taken, buying time. The coup machinery began turning. For weeks, the Survey Corps operated like criminals in their own nation — gathering evidence, protecting the future queen, and dismantling a centuries-old lie at its roots.",
    type: "alliance",
    side: "right",
    imageBg: scene(
      "linear-gradient(140deg, #060608 0%, #0e0e12 25%, #18181e 50%, #141420 65%, #0e0e18 80%, #080808 100%)",
    ),
    imageCaption: "Underground — Scout Regiment in Hiding, Year 850",
  },
  {
    kind: "event",
    id: "e16",
    arcId: "arc6",
    year: "850",
    arc: "Royal Government Arc",
    title: "Historia Becomes Queen",
    narration:
      "Rod Reiss, the true king behind the king, transformed into the largest Pure Titan ever recorded — a crawling, burning abomination that consumed the cave around it. Eren, still raw from the crushing weight of his choices, used the Hardening ability to create weapons of stone and shattered the monster from within. Historia Reiss delivered the final blow to her father's remains, climbing atop the monster and decapitating its skull in a single decisive strike. In that cave, the last fraudulent king's power died. Historia was crowned, reluctantly, and the world shifted on its axis.",
    type: "revelation",
    side: "left",
    imageBg: scene(
      "linear-gradient(165deg, #080808 0%, #10080a 25%, #1e0a10 50%, #2e0c14 68%, #1a0808 82%, #080808 100%)",
    ),
    imageCaption: "Orvud District — Rod Reiss Titan, Year 850",
  },

  /* ── ARC VII ─────────────────────────────────── */
  {
    kind: "arc",
    arcId: "arc7",
    arcLabel: "ARC VII: RETURN TO SHIGANSHINA",
    arcSubtitle:
      "Year 850 — Humanity reclaims its home. Legends forged in blood.",
  },
  {
    kind: "event",
    id: "e17",
    arcId: "arc7",
    year: "850",
    arc: "Return to Shiganshina",
    title: "Operation to Seal Wall Maria",
    narration:
      "The Survey Corps marched on Shiganshina with everything they had left — which was no longer very much. Erwin Smith delivered his final address before the charge, a speech that was less motivation than honest accounting: they would likely all die, but the truth in the Yeager basement justified the cost. They moved at night. They moved together. The plan was simple: Eren seals the breach with hardening, the Corps secures the city, and humanity takes back everything the Colossal Titan stole on that grey morning five years before. Simple plans rarely survive contact with the enemy.",
    type: "battle",
    side: "right",
    imageBg: scene(
      "linear-gradient(150deg, #080808 0%, #120c08 25%, #1e1008 50%, #2e1a05 65%, #1c1005 80%, #0a0808 100%)",
    ),
    imageCaption: "Shiganshina District — Survey Corps Assault, Year 850",
  },
  {
    kind: "event",
    id: "e18",
    arcId: "arc7",
    year: "850",
    arc: "Return to Shiganshina",
    title: "Armored & Colossal Titan Defeated",
    narration:
      "The battle for Shiganshina demanded every impossible sacrifice the series had been building toward. Armin Arlert, burned beyond recognition by the Colossal Titan's steam to buy critical seconds for Eren, survived only through the injection of a Titan serum that transformed him. Commander Erwin Smith, equally near death, was not saved — Levi chose Armin, a choice that tore at him for years. Bertholdt Hoover was devoured by the newly-transformed Armin. Reiner barely survived. The Wall was sealed. But the Survey Corps lost nearly every soldier it had. Victory tasted like ash.",
    type: "battle",
    side: "left",
    imageBg: scene(
      "linear-gradient(160deg, #080000 0%, #180000 25%, #2d0404 50%, #4a0808 68%, #200404 82%, #080000 100%)",
    ),
    imageCaption: "Shiganshina — Final Confrontation, Year 850",
  },
  {
    kind: "event",
    id: "e19",
    arcId: "arc7",
    year: "850",
    arc: "Return to Shiganshina",
    title: "Grisha's Journals Uncovered",
    narration:
      "In the basement of a house in Shiganshina — a basement Eren had spent half his life dreaming about — the Survey Corps found Grisha Yeager's journals. Three leather-bound volumes that held the truth of everything. The world beyond the Walls existed. Eldia was an empire, not a colony. Marley was a nation that had rewritten history and enslaved its Titan powers for military dominance. The Titans inside the Walls were fossilized Colossal Titans placed there by the First King. And Eren, Mikasa, and Armin — they had been living inside the story of a genocide they didn't know they were part of.",
    type: "revelation",
    side: "right",
    imageBg: scene(
      "linear-gradient(145deg, #080a08 0%, #101410 25%, #181e14 50%, #202818 65%, #141c10 80%, #080a08 100%)",
    ),
    imageCaption: "Yeager Basement — The Truth Revealed, Year 850",
  },

  /* ── ARC VIII ─────────────────────────────────── */
  {
    kind: "arc",
    arcId: "arc8",
    arcLabel: "ARC VIII: MARLEY",
    arcSubtitle: "Year 854 — The enemy has a face. And they are afraid.",
  },
  {
    kind: "event",
    id: "e20",
    arcId: "arc8",
    year: "854",
    arc: "Marley Arc",
    title: "The Marley Mid-East War",
    narration:
      "Four years after Shiganshina, the perspective shifted entirely — to the other side of the sea. In Marley's war against the Mid-East Allied Forces, young Warriors Falco and Gabi fought in trenches beneath artillery fire that ripped through Titan Warriors with terrifying new efficiency. The era of Titan dominance was visibly ending. Anti-Titan artillery, developed in direct response to Paradis, was narrowing the power gap. Marley's military chiefs watched their greatest assets become vulnerabilities. The pressure to recover the Founding Titan from Paradis — and its terrifying potential — intensified into desperation.",
    type: "battle",
    side: "left",
    imageBg: scene(
      "linear-gradient(160deg, #050808 0%, #0a1212 25%, #0f1c1c 50%, #142424 65%, #0c1818 80%, #060a0a 100%)",
    ),
    imageCaption: "Mid-East War — Titan Warrior Deployment, Year 854",
  },
  {
    kind: "event",
    id: "e21",
    arcId: "arc8",
    year: "854",
    arc: "Marley Arc",
    title: "Eren Infiltrates Liberio",
    narration:
      "He had been watching them for years. Posing as a maimed veteran in Liberio's Eldian internment zone, Eren Yeager moved through the streets of his enemies with the patient stillness of a man who has already decided what he will do. He met Reiner in a darkened church basement — former captor and captive now reversed. Eren acknowledged their shared history with a grief that surprised even Reiner: 'I'm the same as you.' They sat in the quiet for a moment that held everything that could not be fixed. Then Eren told Reiner when the attack would begin.",
    type: "revelation",
    side: "right",
    imageBg: scene(
      "linear-gradient(155deg, #080808 0%, #101010 25%, #1a1a20 50%, #141428 65%, #0e0e1c 80%, #080808 100%)",
    ),
    imageCaption: "Liberio Internment Zone — Eren's Infiltration, Year 854",
  },
  {
    kind: "event",
    id: "e22",
    arcId: "arc8",
    year: "854",
    arc: "Marley Arc",
    title: "Attack on the Liberio Internment Zone",
    narration:
      "Willy Tybur stood on stage before an audience of the world's nations and declared war on Paradis Island, framing the attack as a preemptive necessity. As he spoke the final words, Eren emerged from below the stage and devoured him — transforming into the Attack Titan mid-speech in front of every foreign dignitary assembled. Survey Corps soldiers rappelled from airships above while Eren consumed the War Hammer Titan's power. The world watched Paradis strike first. The narrative Willy had crafted — 'Paradis is the aggressor' — was fulfilled in real time by Eren himself, as if he had helped write it.",
    type: "battle",
    side: "left",
    imageBg: scene(
      "linear-gradient(165deg, #0c0000 0%, #1c0404 25%, #2e0808 50%, #480c0c 68%, #261010 82%, #0c0404 100%)",
    ),
    imageCaption: "Liberio Festival — Paradis Assault, Year 854",
  },

  /* ── ARC IX ─────────────────────────────────── */
  {
    kind: "arc",
    arcId: "arc9",
    arcLabel: "ARC IX: WAR FOR PARADIS",
    arcSubtitle: "Year 854 — Freedom costs everything. The Rumbling begins.",
  },
  {
    kind: "event",
    id: "e23",
    arcId: "arc9",
    year: "854",
    arc: "War for Paradis",
    title: "Eren Imprisoned by His Comrades",
    narration:
      "The Survey Corps that returned from Liberio was fractured beyond repair. Eren had acted unilaterally, without authorisation, and refused to explain his intentions. When Hange, Mikasa, and Armin confronted him, he disavowed their friendship with words designed to wound. He was imprisoned. Outside the jail walls, the Yeagerist faction — soldiers loyal to Eren's ideology over the military chain of command — began staging a revolution. Zeke Yeager waited somewhere inside the Walls, patient and purposeful. The organisation that had once been humanity's finest shield was eating itself from within.",
    type: "revelation",
    side: "right",
    imageBg: scene(
      "linear-gradient(140deg, #080808 0%, #141414 25%, #1e1820 50%, #18141e 65%, #101018 80%, #080808 100%)",
    ),
    imageCaption: "Fort Salta Brig — Eren's Imprisonment, Year 854",
  },
  {
    kind: "event",
    id: "e24",
    arcId: "arc9",
    year: "854",
    arc: "War for Paradis",
    title: "Hange Zoë Assumes Command",
    narration:
      "With Erwin four years dead and the Scout Regiment's command structure shattered, the burden fell to Hange Zoë — scientist, eccentric, uncompromising believer in a humanity worth saving. They inherited not an organisation but a crisis: Levi Ackermann lay near death after a thunder spear detonated at point-blank range, his face destroyed, his survival uncertain. Yeagerists held the capital. The world's combined military was assembling for a counter-invasion of Paradis. Hange accepted command knowing they might command nothing but ruin. They led anyway.",
    type: "death",
    side: "left",
    imageBg: scene(
      "linear-gradient(155deg, #080808 0%, #141010 25%, #201414 50%, #2c1818 65%, #1c1010 80%, #080808 100%)",
    ),
    imageCaption: "Survey Corps Remnants — Transition of Command, Year 854",
  },
  {
    kind: "event",
    id: "e25",
    arcId: "arc9",
    year: "854",
    arc: "War for Paradis",
    title: "The Rumbling Unleashed",
    narration:
      "In the space between life and death — the Paths, where all Titans converge — Eren and Zeke met. But Zeke's plan for euthanasia was not Eren's. Seizing the Founding Titan's power through direct contact with Ymir Fritz, Eren issued a single command to every Wall Titan simultaneously. The Walls crumbled. Hundreds of thousands of Colossal Titans emerged from their millennial tombs and began marching. The Rumbling — the threat that had kept the world at bay for a century — was no longer a deterrent. It was an apocalypse in motion, directed by a boy who had decided that freedom required the death of everyone outside Paradis.",
    type: "revelation",
    side: "right",
    imageBg: scene(
      "linear-gradient(160deg, #0c0000 0%, #1e0000 25%, #320000 50%, #500404 68%, #2a0000 82%, #0c0000 100%)",
    ),
    imageCaption: "Paradis Walls — The Rumbling Begins, Year 854",
  },

  /* ── ARC X ─────────────────────────────────── */
  {
    kind: "arc",
    arcId: "arc10",
    arcLabel: "ARC X: THE FINAL BATTLE",
    arcSubtitle: "Year 854 — The end of all Titans. The end of everything.",
  },
  {
    kind: "event",
    id: "e26",
    arcId: "arc10",
    year: "854",
    arc: "Final Battle",
    title: "Alliance of Old Enemies",
    narration:
      "There was a bitter symmetry to it. Armin, Mikasa, and the surviving Survey Corps stood on airship decks beside Reiner, Annie, Falco, Gabi, and soldiers of Marley — people who had spent years trying to kill each other. The shared enemy was not a nation or an ideology but a march of a billion feet that would erase entire continents. They did not fully forgive each other. They did not pretend to. But they flew together toward the horizon where Eren's Rumbling was consuming everything, because the only alternative was to watch it happen from a safe distance that didn't exist.",
    type: "alliance",
    side: "left",
    imageBg: scene(
      "linear-gradient(145deg, #060808 0%, #0c1010 25%, #141c1c 50%, #101818 65%, #0c1414 80%, #060808 100%)",
    ),
    imageCaption: "Allied Airships — Final Coalition, Year 854",
  },
  {
    kind: "event",
    id: "e27",
    arcId: "arc10",
    year: "854",
    arc: "Final Battle",
    title: "Hange Zoë's Last Stand",
    narration:
      "The airships needed time to reach altitude. The Wall Titans marching below would destroy them before they cleared the ground unless something held them back. Hange Zoë descended alone. Armed with ODM gear and absolute clarity, they engaged hundreds of Colossal Titans in a solo action that bought precisely the minutes the alliance needed. The heat from their steam incinerated Hange's gear, then their body. They fought until there was nothing left to fight with. In the Paths afterlife, the Survey Corps legends who had preceded them greeted Hange with the only words that mattered: 'Nice work.'",
    type: "death",
    side: "right",
    imageBg: scene(
      "linear-gradient(160deg, #020202 0%, #080808 25%, #0e0e0e 50%, #141414 65%, #0c0c0c 80%, #040404 100%)",
    ),
    imageCaption: "Final Battlefield — Hange's Sacrifice, Year 854",
  },
  {
    kind: "event",
    id: "e28",
    arcId: "arc10",
    year: "854",
    arc: "Final Battle",
    title: "Eren Yeager Falls",
    narration:
      "Inside Eren's monstrous skeletal Titan form — bones the size of buildings, the final expression of the Founding Titan's power — Mikasa Ackermann found the boy she had known all her life. She held his decapitated head, kissed his lips, and said goodbye. It was the most intimate act in a war built on catastrophe. Eren's death transmitted through every Titan simultaneously: the transformations ceased, the curse broke, and every living Titan returned to human form. Hundreds of thousands of ordinary people stood blinking where monsters had stood moments before. The age of Titans ended not with a battle cry but with a farewell.",
    type: "death",
    side: "left",
    imageBg: scene(
      "linear-gradient(155deg, #020202 0%, #060606 25%, #0a0808 50%, #140808 68%, #0c0404 82%, #040202 100%)",
    ),
    imageCaption: "Fort Salta — Eren's Final Moment, Year 854",
  },
  {
    kind: "event",
    id: "e29",
    arcId: "arc10",
    year: "854+",
    arc: "Final Battle",
    title: "A World Without Titans",
    narration:
      "In the silence that followed, the world tried to understand what it had survived. Armin Arlert sat across from the leaders of the nations Eren's Rumbling had devastated and began the first honest conversation humanity had attempted in centuries. Mikasa Ackermann travelled to Hizuru, and then back to Paradis, and buried Eren Yeager beneath the tree on the hill where he had once slept in sunlight, dreaming of the world beyond the Walls. The tree grew. The years passed. Humanity still breathed. Whether Eren's freedom was worth its cost — that question remained open, written in the faces of every person left alive.",
    type: "revelation",
    side: "right",
    imageBg: scene(
      "linear-gradient(145deg, #080a08 0%, #101410 25%, #18201a 50%, #142018 65%, #101a10 80%, #080a08 100%)",
    ),
    imageCaption: "Paradis Island — Eren's Grave, Year 854+",
  },
];

/* ─────────────────────────────────────────────
   Arc Chapter Marker
───────────────────────────────────────────── */
function ArcChapterMarker({ item }: { item: ArcMarker }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const cfg = ARC_CONFIG[item.arcId] ?? ARC_CONFIG.arc1;

  return (
    <div
      ref={ref}
      className="relative w-full flex justify-center my-16 md:my-24"
      data-arc-id={item.arcId}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-0 right-0 h-px origin-center"
        style={{
          background: `linear-gradient(90deg, transparent, ${cfg.accent}, transparent)`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, scaleX: 0.5, filter: "blur(16px)" }}
        animate={inView ? { opacity: 1, scaleX: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 px-8 py-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.09 0 0 / 0.97), oklch(0.06 0 0 / 0.98))",
          border: `1px solid ${cfg.accent}44`,
          backdropFilter: "blur(20px)",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="cinematic-title text-lg md:text-2xl tracking-[0.18em]"
          style={{ color: cfg.accent }}
        >
          {item.arcLabel}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="terminal-text text-xs md:text-sm mt-1.5"
          style={{ color: `${cfg.accent}99` }}
        >
          {item.arcSubtitle}
        </motion.p>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Atmospheric Image Panel
───────────────────────────────────────────── */
function ImagePanel({
  item,
  typeCfg,
  arcCfg,
}: {
  item: RichEvent;
  typeCfg: (typeof TYPE_CONFIG)[EventType];
  arcCfg: ArcConfig;
}) {
  return (
    <div
      className="relative w-full h-full min-h-[260px] md:min-h-[340px] overflow-hidden"
      style={{
        border: `1px solid ${typeCfg.color}22`,
        boxShadow: `0 0 48px ${typeCfg.color}14, inset 0 0 24px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Atmospheric CSS gradient scene */}
      <div
        className="absolute inset-0"
        style={{
          background: item.imageBg,
          filter: "blur(2px)",
          transform: "scale(1.06)",
        }}
      />

      {/* Subtle scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Type-colored edge glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 50%, ${typeCfg.color}08 100%)`,
        }}
      />

      {/* Arc accent dot + year stamp */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
          style={{ backgroundColor: arcCfg.accent }}
        />
        <span
          className="terminal-text text-[9px] tracking-[0.3em] px-1.5 py-0.5"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            color: arcCfg.accent,
            border: `1px solid ${arcCfg.accent}40`,
          }}
        >
          {item.year}
        </span>
      </div>

      {/* Image caption bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 px-3 py-2"
        style={{
          backgroundColor: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(4px)",
        }}
      >
        <p
          className="terminal-text text-[9px] tracking-[0.2em] uppercase"
          style={{ color: `${arcCfg.accent}bb` }}
        >
          {item.imageCaption}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-0 h-0"
          style={{
            borderTop: `32px solid ${typeCfg.color}40`,
            borderLeft: "32px solid transparent",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Text Narration Panel
───────────────────────────────────────────── */
function NarrationPanel({
  item,
  typeCfg,
  arcCfg,
}: {
  item: RichEvent;
  typeCfg: (typeof TYPE_CONFIG)[EventType];
  arcCfg: ArcConfig;
}) {
  return (
    <div
      className="relative h-full flex flex-col justify-center p-5 md:p-7 glass-panel"
      style={{
        borderLeft: `2px solid ${typeCfg.panelBorder}`,
        borderTop: `1px solid ${typeCfg.color}18`,
        boxShadow: `inset 0 0 40px rgba(0,0,0,0.35), 0 0 30px ${typeCfg.color}10`,
      }}
    >
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span
          className="terminal-text text-[10px] px-2 py-0.5"
          style={{
            background: `${arcCfg.accent}18`,
            color: arcCfg.accent,
            border: `1px solid ${arcCfg.accent}40`,
          }}
        >
          {item.year}
        </span>
        <span
          className={`terminal-text text-[10px] px-2 py-0.5 uppercase tracking-widest ${typeCfg.badge}`}
        >
          {typeCfg.label}
        </span>
      </div>

      {/* Arc label */}
      <p
        className="terminal-text text-[10px] uppercase tracking-[0.22em] mb-2"
        style={{ color: `${arcCfg.accent}80` }}
      >
        {item.arc}
      </p>

      {/* Title */}
      <h3
        className="cinematic-title text-xl md:text-2xl leading-tight mb-4"
        style={{ color: "oklch(0.93 0 0)" }}
      >
        {item.title}
      </h3>

      {/* Divider */}
      <div
        className="w-10 h-px mb-4 flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, ${typeCfg.color}70, transparent)`,
        }}
      />

      {/* Narration */}
      <p
        className="text-sm md:text-[0.82rem] leading-[1.8] flex-1"
        style={{
          color: "oklch(0.64 0 0)",
          fontFamily: "var(--font-body)",
          letterSpacing: "0.01em",
        }}
      >
        {item.narration}
      </p>

      {/* Bottom corner accent */}
      <div className="absolute bottom-3 right-3 opacity-30 pointer-events-none">
        <div
          className="w-0 h-0"
          style={{
            borderBottom: `12px solid ${typeCfg.color}`,
            borderRight: "12px solid transparent",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Event Row — cinematic image + narration layout
───────────────────────────────────────────── */
function EventCard({
  item,
  globalIndex,
}: { item: RichEvent; globalIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px -5% 0px" });
  const typeCfg = TYPE_CONFIG[item.type];
  const arcCfg = ARC_CONFIG[item.arcId] ?? ARC_CONFIG.arc1;
  const isLeft = item.side === "left";

  return (
    <div
      ref={ref}
      className="relative w-full mb-8 md:mb-12"
      data-ocid={`timeline.item.${globalIndex}`}
      data-side={isLeft ? "left" : "right"}
    >
      {/* Desktop: 2-column image + narration */}
      <div
        className={`
          hidden md:grid gap-0 overflow-hidden
          ${
            isLeft
              ? "grid-cols-[3fr_2fr]" /* image left, text right */
              : "grid-cols-[2fr_3fr]" /* text left, image right */
          }
        `}
        style={{ minHeight: "340px" }}
      >
        {isLeft ? (
          <>
            {/* Image left */}
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, x: -64, filter: "blur(12px)" }}
              animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <ImagePanel item={item} typeCfg={typeCfg} arcCfg={arcCfg} />
            </motion.div>

            {/* Text right */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.85,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <NarrationPanel item={item} typeCfg={typeCfg} arcCfg={arcCfg} />
            </motion.div>
          </>
        ) : (
          <>
            {/* Text left */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.85,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <NarrationPanel item={item} typeCfg={typeCfg} arcCfg={arcCfg} />
            </motion.div>

            {/* Image right */}
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, x: 64, filter: "blur(12px)" }}
              animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <ImagePanel item={item} typeCfg={typeCfg} arcCfg={arcCfg} />
            </motion.div>
          </>
        )}
      </div>

      {/* Mobile: stacked — image on top, text below */}
      <motion.div
        className="md:hidden flex flex-col overflow-hidden"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        style={{ borderLeft: `3px solid ${typeCfg.color}40` }}
      >
        <div className="relative h-48">
          <ImagePanel item={item} typeCfg={typeCfg} arcCfg={arcCfg} />
        </div>
        <NarrationPanel item={item} typeCfg={typeCfg} arcCfg={arcCfg} />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Background arc tracker
───────────────────────────────────────────── */
function useCurrentArc() {
  const [current, setCurrent] = useState("arc1");

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-arc-id]");
    if (!elements.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("data-arc-id");
            if (id) setCurrent(id);
          }
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 },
    );

    for (const el of elements) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return current;
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function TimelineSection() {
  const currentArc = useCurrentArc();
  const arcCfg = ARC_CONFIG[currentArc] ?? ARC_CONFIG.arc1;
  let eventIndex = 0;

  return (
    <section
      id="timeline"
      data-section="timeline"
      className="relative py-20 md:py-32 overflow-hidden"
      data-ocid="timeline.section"
    >
      {/* Dynamic arc background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`${currentArc}-bg`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6 }}
          className={`absolute inset-0 bg-gradient-to-b ${arcCfg.bg} pointer-events-none`}
        />
      </AnimatePresence>

      {/* Grain cinematic overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none opacity-25" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
          data-ocid="timeline.header"
        >
          <p
            className="terminal-text text-[10px] tracking-[0.45em] mb-4"
            style={{ color: "oklch(0.56 0.25 18)" }}
          >
            ▸ MILITARY ARCHIVES — SURVEY CORPS — CLASSIFICATION LEVEL 5
          </p>

          <h2 className="cinematic-title text-3xl md:text-5xl lg:text-6xl mb-3 leading-none">
            TIMELINE OF EVENTS
          </h2>

          <p
            className="cinematic-title text-sm md:text-base tracking-[0.3em]"
            style={{ color: "oklch(0.65 0.15 60)" }}
          >
            845 TO 854
          </p>

          <div
            className="mt-6 mx-auto w-28 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.56 0.25 18), transparent)",
            }}
          />

          <p
            className="mt-5 text-sm max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.58 0 0)", fontFamily: "var(--font-body)" }}
          >
            A classified record of pivotal moments — battles, betrayals,
            revelations, and sacrifices — that shaped the fate of Eldia and the
            world beyond the Walls. Each entry verified by the Intelligence
            Division.
          </p>
        </motion.div>

        {/* ── Legend ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2.5 mb-16 md:mb-20"
          data-ocid="timeline.legend"
        >
          {(
            Object.entries(TYPE_CONFIG) as [
              EventType,
              (typeof TYPE_CONFIG)[EventType],
            ][]
          ).map(([key, cfg]) => (
            <span
              key={key}
              className={`terminal-text text-[10px] px-3 py-1 tracking-widest uppercase ${cfg.badge}`}
            >
              {cfg.label}
            </span>
          ))}
          <span
            className="terminal-text text-[10px] px-3 py-1 tracking-widest uppercase"
            style={{
              color: "oklch(0.45 0 0)",
              border: "1px solid oklch(0.2 0 0)",
            }}
          >
            {TIMELINE_ITEMS.filter((i) => i.kind === "event").length} EVENTS
            RECORDED
          </span>
        </motion.div>

        {/* ── Timeline body ── */}
        <div className="relative">
          {TIMELINE_ITEMS.map((item) => {
            if (item.kind === "arc") {
              return <ArcChapterMarker key={item.arcId} item={item} />;
            }
            const gIndex = ++eventIndex;
            return <EventCard key={item.id} item={item} globalIndex={gIndex} />;
          })}
        </div>

        {/* ── End stamp ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20 md:mt-28"
          data-ocid="timeline.footer"
        >
          <div
            className="mx-auto w-full max-w-xs h-px mb-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.56 0.25 18 / 0.45), transparent)",
            }}
          />
          <p
            className="terminal-text text-[10px] tracking-[0.35em] uppercase"
            style={{ color: "oklch(0.32 0 0)" }}
          >
            END OF ARCHIVED RECORD — SURVEY CORPS INTELLIGENCE DIVISION
          </p>
          <p
            className="terminal-text text-[10px] mt-2 tracking-widest"
            style={{ color: "oklch(0.22 0 0)" }}
          >
            ████ FURTHER RECORDS CLASSIFIED — LEVEL 7 CLEARANCE REQUIRED ████
          </p>
        </motion.div>
      </div>
    </section>
  );
}
