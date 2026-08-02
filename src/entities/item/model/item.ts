export type ItemCategory =
  | "Attack"
  | "Magic"
  | "Defense"
  | "Movement"
  | "Jungle"
  | "Roam";

export interface ItemStats {
  hp?: number;

  mana?: number;

  physicalAttack?: number;

  magicPower?: number;

  physicalDefense?: number;

  magicDefense?: number;

  attackSpeed?: number;

  movementSpeed?: number;

  cooldownReduction?: number;

  criticalChance?: number;

  lifesteal?: number;

  hybridLifesteal?: number;

  penetration?: number;
}

export interface Item {
  id: number;

  slug: string;

  name: string;

  category: ItemCategory;

  price: number;

  description: string;

  uniquePassive?: string;

  activeSkill?: string;

  stats: ItemStats;

  image: string;
}