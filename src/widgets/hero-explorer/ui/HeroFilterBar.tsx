import { Button } from "@/shared/ui/Button";

import type {
  HeroFilters,
  HeroSort,
} from "../model/filters";

interface HeroFilterBarProps {
  filters: HeroFilters;
  updateFilter: <K extends keyof HeroFilters>(
    key: K,
    value: HeroFilters[K]
  ) => void;
  resetFilters: () => void;
}

const ROLES = [
  "Tank",
  "Fighter",
  "Assassin",
  "Mage",
  "Marksman",
  "Support",
] as const;

const LANES = [
  "EXP",
  "Gold",
  "Mid",
  "Jungle",
  "Roam",
] as const;

const TIERS = ["S+", "S", "A", "B", "C"] as const;

const DAMAGE_TYPES = [
  "Physical",
  "Magic",
  "Hybrid",
] as const;

const DIFFICULTIES = [
  "Easy",
  "Medium",
  "Hard",
] as const;

const SORT_OPTIONS: {
  value: HeroSort;
  label: string;
}[] = [
  { value: "name", label: "Name (A–Z)" },
  { value: "tier", label: "Tier" },
  { value: "winRate", label: "Win Rate" },
  { value: "pickRate", label: "Pick Rate" },
  { value: "banRate", label: "Ban Rate" },
  { value: "releaseDate", label: "Release Date" },
];

function ChipGroup({
  title,
  values,
  selected,
  filterKey,
  updateFilter,
}: {
  title: string;
  values: readonly string[];
  selected: string[];
  filterKey:
    | "roles"
    | "lanes"
    | "tiers"
    | "damageTypes"
    | "difficulties";
  updateFilter: HeroFilterBarProps["updateFilter"];
}) {
  function toggle(value: string) {
    updateFilter(
      filterKey,
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <Button
            key={value}
            type="button"
            variant={
              selected.includes(value)
                ? "primary"
                : "ghost"
            }
            onClick={() => toggle(value)}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function HeroFilterBar({
  filters,
  updateFilter,
  resetFilters,
}: HeroFilterBarProps) {
  return (
    <section className="card space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <ChipGroup
          title="Roles"
          values={ROLES}
          selected={filters.roles}
          filterKey="roles"
          updateFilter={updateFilter}
        />

        <ChipGroup
          title="Lanes"
          values={LANES}
          selected={filters.lanes}
          filterKey="lanes"
          updateFilter={updateFilter}
        />

        <ChipGroup
          title="Tier"
          values={TIERS}
          selected={filters.tiers}
          filterKey="tiers"
          updateFilter={updateFilter}
        />

        <ChipGroup
          title="Damage Type"
          values={DAMAGE_TYPES}
          selected={filters.damageTypes}
          filterKey="damageTypes"
          updateFilter={updateFilter}
        />

        <ChipGroup
          title="Difficulty"
          values={DIFFICULTIES}
          selected={filters.difficulties}
          filterKey="difficulties"
          updateFilter={updateFilter}
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
            Sort By
          </h3>

          <select
            className="input w-full"
            value={filters.sort}
            onChange={(e) =>
              updateFilter(
                "sort",
                e.target.value as HeroSort
              )
            }
          >
            {SORT_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <Button
          variant="secondary"
          type="button"
          onClick={resetFilters}
        >
          Clear Filters
        </Button>
      </div>
    </section>
  );
}