import { useMemo, useState } from "react";

import { Card } from "@/shared/ui/Card";
import { PageHeader } from "@/shared/ui/PageHeader";
import {
  EmptyState,
  ErrorState,
  Skeleton,
} from "@/shared/ui/FeedbackStates";

import { RoleFilter } from "@/features/hero-filters/ui/RoleFilter";
import { LaneFilter } from "@/features/hero-filters/ui/LaneFilter";
import { TierFilter } from "@/features/hero-filters/ui/TierFilter";
import { DifficultyFilter } from "@/features/hero-filters/ui/DifficultyFilter";

import { useHeroes } from "@/entities/hero/api/useHeroes";
import HeroCard from "@/entities/hero/ui/HeroCard";

import type {
  HeroRole,
  Lane,
  HeroTier,
  Difficulty,
} from "@/entities/hero/model/hero";

export function HeroExplorer() {
  const {
    heroes,
    loading,
    error,
  } = useHeroes();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState<HeroRole | null>(null);
  const [lane, setLane] = useState<Lane | null>(null);
  const [tier, setTier] = useState<HeroTier | null>(null);
  const [difficulty, setDifficulty] =
    useState<Difficulty | null>(null);


  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) => {

      const matchesSearch =
        hero.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        hero.title
          .toLowerCase()
          .includes(search.toLowerCase());


      const matchesRole =
        !role ||
        hero.roles.includes(role);


      const matchesLane =
        !lane ||
        hero.lanes.includes(lane);


      const matchesTier =
        !tier ||
        hero.tier === tier;


      const matchesDifficulty =
        !difficulty ||
        hero.difficulty === difficulty;


      return (
        matchesSearch &&
        matchesRole &&
        matchesLane &&
        matchesTier &&
        matchesDifficulty
      );
    });

  }, [
    heroes,
    search,
    role,
    lane,
    tier,
    difficulty,
  ]);


  return (
    <div className="space-y-8">

      <PageHeader
        eyebrow="Explore"
        title="Heroes"
        description="Explore Mobile Legends heroes, roles, lanes, and current meta performance."
      />


      <Card>

        <div className="space-y-6">

          <input
            className="input"
            placeholder="Search heroes..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />


          <div className="space-y-4">

            <div>
              <p className="mb-2 text-sm font-medium">
                Role
              </p>

              <RoleFilter
                selected={role}
                onChange={setRole}
              />
            </div>


            <div>
              <p className="mb-2 text-sm font-medium">
                Lane
              </p>

              <LaneFilter
                selected={lane}
                onChange={setLane}
              />
            </div>


            <div>
              <p className="mb-2 text-sm font-medium">
                Tier
              </p>

              <TierFilter
                selected={tier}
                onChange={setTier}
              />
            </div>


            <div>
              <p className="mb-2 text-sm font-medium">
                Difficulty
              </p>

              <DifficultyFilter
                selected={difficulty}
                onChange={setDifficulty}
              />
            </div>

          </div>

        </div>

      </Card>


      {loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-72"
            />
          ))}
        </div>
      )}


      {error && (
        <ErrorState
          description={error}
        />
      )}


      {!loading &&
        !error &&
        filteredHeroes.length === 0 && (
          <EmptyState
            title="No heroes found"
            description="Try adjusting your filters."
          />
        )}


      {!loading &&
        !error &&
        filteredHeroes.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {filteredHeroes.map((hero) => (
              <HeroCard
                key={hero.id}
                hero={hero}
              />
            ))}
          </div>
        )}

    </div>
  );
}