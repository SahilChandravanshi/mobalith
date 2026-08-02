export type BuildType =
  | "Core"
  | "Burst"
  | "Sustain"
  | "Snowball"
  | "Situational";

export interface HeroBuildItem {
  itemId: number;

  priority: number;

  notes?: string;
}

export interface HeroBuild {
  id: string;

  name: string;

  type: BuildType;

  description: string;

  items: HeroBuildItem[];

  strengths: string[];

  weaknesses: string[];
}