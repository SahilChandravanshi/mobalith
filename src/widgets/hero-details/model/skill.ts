export type SkillType =
  | "Passive"
  | "Skill 1"
  | "Skill 2"
  | "Ultimate";

export interface HeroSkill {
  id: number;
  type: SkillType;
  name: string;
  description: string;
  cooldown?: string;
  manaCost?: string;
  image: string;
}