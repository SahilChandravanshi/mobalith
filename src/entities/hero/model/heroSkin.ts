export interface HeroSkin {
  id: number;

  name: string;

  rarity:
    | "Normal"
    | "Elite"
    | "Special"
    | "Epic"
    | "Collector"
    | "Legend"
    | "Aspirant"
    | "Limited";

  image: string;

  releaseDate?: string;
}