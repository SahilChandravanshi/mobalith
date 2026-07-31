/**
 * ============================================================================
 * Mobalith
 * Hero Domain Types
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

export interface HeroImages {
  portrait: string;
  banner: string;
  square: string;
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
}

export interface HeroFilter {
  search: string;

  roles: HeroRole[];

  lanes: Lane[];

  tier: HeroTier[];

  difficulty: Difficulty[];
}

export type HeroSort =
  | "name"
  | "tier"
  | "winRate"
  | "pickRate"
  | "banRate";