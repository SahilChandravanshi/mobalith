export type HeroSkillType =
  | "Passive"
  | "Basic"
  | "Skill 1"
  | "Skill 2"
  | "Ultimate";

export interface HeroSkillAttribute {
  key: string;
  value: string;
}

export interface HeroSkillLevel {
  level: number;
  cooldown?: string;
  manaCost?: string;
  energyCost?: string;
  description?: string;
}

export interface HeroSkill {
  id: string;

  type: HeroSkillType;

  name: string;

  icon: string;

  description: string;

  attributes: HeroSkillAttribute[];

  levels: HeroSkillLevel[];

  tips: string[];

  comboNotes: string[];
}