export type HeroSort =
  | "name"
  | "winRate"
  | "pickRate"
  | "banRate"
  | "releaseDate";

export interface HeroFilters {
  search: string;

  roles: string[];

  lanes: string[];

  tiers: string[];

  damageTypes: string[];

  difficulties: string[];

  sort: HeroSort;
}