/**
 * ============================================================================
 * Mobalith
 * Hero Entity
 * ============================================================================
 */

export type HeroRole =
  | "Tank"
  | "Fighter"
  | "Assassin"
  | "Mage"
  | "Marksman"
  | "Support";

export type Lane =
  | "EXP"
  | "Gold"
  | "Mid"
  | "Jungle"
  | "Roam";

export type Difficulty =
  | "Easy"
  | "Medium"
  | "Hard";

export type DamageType =
  | "Physical"
  | "Magic"
  | "Hybrid";

export type HeroTier =
  | "S+"
  | "S"
  | "A"
  | "B"
  | "C";


export interface HeroImages {
  portrait: string;
  square: string;
  banner: string;
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


export interface HeroSkill {
  name: string;
  description: string;
  type:
    | "Passive"
    | "Skill"
    | "Ultimate";
}


export interface HeroBuildItem {
  name: string;
  icon: string;
}


export interface HeroRelation {
  heroId: number;
  reason: string;
}


export interface Hero {
  id: number;
  name: string;
  slug: string;
  title: string;

  roles: HeroRole[];
  lanes: Lane[];
  specialty: string[];

  damageType: DamageType;
  difficulty: Difficulty;
  tier: HeroTier;

  releaseDate?: string;

  images: HeroImages;

  stats: HeroStats;

  rates?: HeroRates;

  skills?: HeroSkill[];

  recommendedBuild?: HeroBuildItem[];

  counters?: HeroRelation[];

  synergy?: HeroRelation[];
}