import { Input } from "@/shared/ui/Input";

import HeroCard from "@/entities/hero/ui/HeroCard";
import { useHeroes } from "@/entities/hero/api/useHeroes";

import {
  ErrorState,
  Skeleton,
} from "@/shared/ui/FeedbackStates";

import { HeroFilterBar } from "./HeroFilterBar";
import { useHeroFilters } from "../hooks/useHeroFilters";

export function HeroExplorer() {
  const {
    heroes,
    loading,
    error,
  } = useHeroes();

  const {
    filters,
    filteredHeroes,
    updateFilter,
    resetFilters,
  } = useHeroFilters(heroes);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-72"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState description={error} />
    );
  }

  return (
    <div className="space-y-8">

      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <p className="eyebrow">
            Hero Explorer
          </p>

          <h1 className="section-title">
            Browse Heroes
          </h1>

          <p className="mt-2 text-muted">
            {filteredHeroes.length} of {heroes.length} heroes
          </p>

        </div>

        <div className="w-full lg:max-w-md">

          <Input
            icon="search"
            placeholder="Search hero..."
            value={filters.search}
            onChange={(e) =>
              updateFilter(
                "search",
                e.target.value
              )
            }
          />

        </div>

      </header>

      <HeroFilterBar
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
      />

      {filteredHeroes.length === 0 ? (
        <ErrorState
          title="No heroes found"
          description="Try changing or clearing your filters."
        />
      ) : (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {filteredHeroes.map((hero) => (
            <HeroCard
              key={hero.id}
              hero={hero}
            />
          ))}
        </section>
      )}

    </div>
  );
}