import { Input } from "@/shared/ui/Input";

import HeroCard from "@/entities/hero/ui/HeroCard";
import { useHeroes } from "@/entities/hero/api/useHeroes";

import { ErrorState, Skeleton } from "@/shared/ui/FeedbackStates";

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
  } = useHeroFilters(heroes);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
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
      <ErrorState
        description={error}
      />
    );
  }

  return (
    <div className="space-y-6">

      <Input
        icon="search"
        placeholder="Search heroes..."
        value={filters.search}
        onChange={(e) =>
          updateFilter(
            "search",
            e.target.value
          )
        }
      />

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">

        {filteredHeroes.map((hero) => (
          <HeroCard
            key={hero.id}
            hero={hero}
          />
        ))}

      </section>

    </div>
  );
}