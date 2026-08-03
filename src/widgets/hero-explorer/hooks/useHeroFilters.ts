import { useMemo, useState } from "react";

import type { Hero } from "@/entities/hero/model/hero";

import {
  DEFAULT_FILTERS,
  type HeroFilters,
} from "../model/filters";

const tierRank = {
  "S+": 5,
  S: 4,
  A: 3,
  B: 2,
  C: 1,
} as const;

export function useHeroFilters(
  heroes: Hero[]
) {
  const [filters, setFilters] =
    useState<HeroFilters>(DEFAULT_FILTERS);

  const filteredHeroes = useMemo(() => {
    let result = [...heroes];

    if (filters.search.trim()) {
      const query = filters.search
        .trim()
        .toLowerCase();

      result = result.filter(
        (hero) =>
          hero.name
            .toLowerCase()
            .includes(query) ||
          hero.title
            .toLowerCase()
            .includes(query)
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

    switch (filters.sort) {
      case "name":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "tier":
        result.sort(
          (a, b) =>
            tierRank[b.tier] -
            tierRank[a.tier]
        );
        break;

      case "winRate":
        result.sort(
          (a, b) =>
            b.rates.winRate -
            a.rates.winRate
        );
        break;

      case "pickRate":
        result.sort(
          (a, b) =>
            b.rates.pickRate -
            a.rates.pickRate
        );
        break;

      case "banRate":
        result.sort(
          (a, b) =>
            b.rates.banRate -
            a.rates.banRate
        );
        break;

      case "releaseDate":
        result.sort((a, b) =>
          (b.releaseDate ?? "").localeCompare(
            a.releaseDate ?? ""
          )
        );
        break;

      default:
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
    }

    return result;
  }, [heroes, filters]);

  function updateFilter<
    K extends keyof HeroFilters,
  >(
    key: K,
    value: HeroFilters[K]
  ) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return {
    filters,
    filteredHeroes,
    updateFilter,
    resetFilters,
  };
}