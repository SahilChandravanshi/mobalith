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

export const DEFAULT_FILTERS: HeroFilters = {
  search: "",

  roles: [],
  lanes: [],
  tiers: [],
  damageTypes: [],
  difficulties: [],

  sort: "name",
};