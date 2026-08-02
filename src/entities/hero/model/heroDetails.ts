import type { HeroBuild } from "./heroBuild";
import type { HeroMatchup } from "./heroMatchup";
import type { HeroPatch } from "./heroPatch";
import type { HeroSkin } from "./heroSkin";
import type { HeroSkill } from "./heroSkill";

export interface HeroIdentity {
  id: number;
  slug: string;

  name: string;
  title: string;
  nickname?: string;

  roles: string[];
  lanes: string[];

  specialty: string[];

  damageType: "Physical" | "Magic" | "Hybrid";

  difficulty: "Easy" | "Medium" | "Hard";

  tier: "S+" | "S" | "A" | "B" | "C";
}

export interface HeroImages {
  icon: string;
  portrait: string;
  banner: string;
  splash: string;
}

export interface HeroAttributes {
  durability: number;
  offense: number;
  control: number;
  mobility: number;
  difficulty: number;
}

export interface HeroStatBlock {
  hp: number;
  hpGrowth: number;

  mana: number;
  manaGrowth: number;

  physicalAttack: number;
  magicPower: number;

  physicalDefense: number;
  magicDefense: number;

  attackSpeed: number;
  movementSpeed: number;
}

export interface HeroRates {
  winRate: number;
  pickRate: number;
  banRate: number;
}

export interface HeroPowerSpike {
  phase: "Early" | "Mid" | "Late";

  description: string;
}

export interface HeroGuide {
  strengths: string[];

  weaknesses: string[];

  objectives: string[];

  tips: string[];

  combos: string[];
}

export interface HeroRecommendation {
  emblemIds: string[];

  spellIds: string[];

  builds: HeroBuild[];
}

export interface HeroLore {
  region?: string;

  faction?: string;

  biography: string;
}

export interface HeroDetails {
  schemaVersion: number;

  gameVersion: string;

  identity: HeroIdentity;

  images: HeroImages;

  attributes: HeroAttributes;

  stats: HeroStatBlock;

  rates: HeroRates;

  passive: HeroSkill;

  skills: HeroSkill[];

  recommendations: HeroRecommendation;

  counters: HeroMatchup[];

  synergies: HeroMatchup[];

  powerSpikes: HeroPowerSpike[];

  guide: HeroGuide;

  skins: HeroSkin[];

  lore: HeroLore;

  patches: HeroPatch[];

  searchKeywords: string[];
}