import { useMemo, useState } from "react";

import type { Hero } from "@/entities/hero/model/hero";
import type { HeroFilters } from "../model/filters";

const defaultFilters: HeroFilters = {
  search: "",
  roles: [],
  lanes: [],
  tiers: [],
  damageTypes: [],
  difficulties: [],
  sort: "name",
};

export function useHeroFilters(heroes: Hero[]) {
  const [filters, setFilters] =
    useState<HeroFilters>(defaultFilters);

  const filteredHeroes = useMemo(() => {
    let result = [...heroes];

    if (filters.search) {
      const query = filters.search.toLowerCase();

      result = result.filter(
        (hero) =>
          hero.name.toLowerCase().includes(query) ||
          hero.title.toLowerCase().includes(query)
      );
    }

    if (filters.roles.length) {
      result = result.filter((hero) =>
        hero.roles.some((role) =>
          filters.roles.includes(role)
        )
      );
    }

    if (filters.lanes.length) {
      result = result.filter((hero) =>
        hero.lanes.some((lane) =>
          filters.lanes.includes(lane)
        )
      );
    }

    if (filters.tiers.length) {
      result = result.filter((hero) =>
        filters.tiers.includes(hero.tier)
      );
    }

    if (filters.damageTypes.length) {
      result = result.filter((hero) =>
        filters.damageTypes.includes(
          hero.damageType
        )
      );
    }

    if (filters.difficulties.length) {
      result = result.filter((hero) =>
        filters.difficulties.includes(
          hero.difficulty
        )
      );
    }

    result.sort((a, b) => {
      switch (filters.sort) {
        case "winRate":
          return (
            (b.rates?.winRate ?? 0) -
            (a.rates?.winRate ?? 0)
          );

        case "pickRate":
          return (
            (b.rates?.pickRate ?? 0) -
            (a.rates?.pickRate ?? 0)
          );

        case "banRate":
          return (
            (b.rates?.banRate ?? 0) -
            (a.rates?.banRate ?? 0)
          );

        case "releaseDate":
          return (
            (a.releaseDate ?? "").localeCompare(
              b.releaseDate ?? ""
            )
          );

        default:
          return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [heroes, filters]);

  function updateFilter<K extends keyof HeroFilters>(
    key: K,
    value: HeroFilters[K]
  ) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  return {
    filters,
    filteredHeroes,
    updateFilter,
    resetFilters,
  };
}