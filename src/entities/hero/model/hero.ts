export type HeroRole =
  | "Tank"
  | "Fighter"
  | "Assassin"
  | "Mage"
  | "Marksman"
  | "Support";

export type Lane =
  | "Gold"
  | "EXP"
  | "Mid"
  | "Jungle"
  | "Roam";

export type HeroTier = "S+" | "S" | "A" | "B" | "C";

export type Difficulty =
  | "Easy"
  | "Medium"
  | "Hard";

export interface HeroSkill {
  id: number;
  slot: "Passive" | "Skill 1" | "Skill 2" | "Ultimate";
  name: string;
  description: string;
  cooldown?: string;
  manaCost?: string;
  image: string;
}

export interface HeroStats {
  durability: number;
  offense: number;
  skillEffects: number;
  difficulty: number;
}

export interface HeroRates {
  winRate: number;
  pickRate: number;
  banRate: number;
}

export interface HeroSkin {
  id: number;
  name: string;
  rarity:
    | "Basic"
    | "Elite"
    | "Special"
    | "Epic"
    | "Collector"
    | "Legend";

  image: string;
}

export interface HeroBuildItem {
  id: number;
  name: string;
  icon: string;
  description: string;
  price: number;
}

export interface HeroRelation {
  heroId: number;
  reason: string;
  score?: number;
}

export interface HeroImages {
  square: string;
  portrait: string;
  banner: string;
}

export interface Hero {
  id: number;

  slug: string;

  name: string;

  title: string;

  roles: HeroRole[];

  lanes: Lane[];

  specialty: string[];

  damageType: "Physical" | "Magic" | "Hybrid";

  difficulty: Difficulty;

  tier: HeroTier;

  releaseDate?: string;

  images: HeroImages;

  stats: HeroStats;

  rates: HeroRates;

  skills: HeroSkill[];

  skins?: HeroSkin[];

  recommendedBuild?: HeroBuildItem[];

  /**
   * Heroes this hero performs well against.
   */
  counters?: HeroRelation[];

  /**
   * Heroes this hero performs poorly against.
   */
  counteredBy?: HeroRelation[];

  /**
   * Heroes that work well with this hero.
   */
  synergies?: HeroRelation[];
}