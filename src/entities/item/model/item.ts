export type ItemCategory =
  | "Attack"
  | "Magic"
  | "Defense"
  | "Movement"
  | "Jungle"
  | "Roam";


export interface ItemStats {
  attack?: number;
  magicPower?: number;
  defense?: number;
  hp?: number;
  movementSpeed?: number;
}


export interface Item {
  id: number;
  name: string;
  description: string;

  category: ItemCategory;

  price: number;

  icon: string;

  stats?: ItemStats;
}