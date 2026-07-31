import { useParams } from "react-router-dom";

import { useHeroes } from "@/entities/hero/api/useHeroes";

import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import {
  ErrorState,
  Skeleton,
} from "@/shared/ui/FeedbackStates";

import { HeroSkills } from "@/widgets/hero-details/ui/HeroSkills";
import { HeroBuild } from "@/widgets/hero-details/ui/HeroBuild";
import { HeroCounters } from "@/widgets/hero-details/ui/HeroCounters";
import { HeroSynergy } from "@/widgets/hero-details/ui/HeroSynergy";


export function HeroDetailsPage() {
  const { heroId } = useParams();

  const {
    heroes,
    loading,
    error,
  } = useHeroes();


  const hero = heroes.find(
    (item) =>
      item.slug === heroId ||
      item.id.toString() === heroId
  );


  if (loading) {
    return (
      <main className="space-y-6">
        <Skeleton className="h-96" />
      </main>
    );
  }


  if (error) {
    return (
      <ErrorState
        description={error}
      />
    );
  }


  if (!hero) {
    return (
      <main className="space-y-6">
        <Card title="Hero not found">
          <p className="text-sm text-muted">
            This hero does not exist.
          </p>
        </Card>
      </main>
    );
  }


  return (
    <main className="space-y-8">

      <section
        className="
          angular-frame
          overflow-hidden
          border
          border-ink/10
          bg-elevated
        "
      >

        <img
          src={hero.images.banner}
          alt={hero.name}
          className="
            h-64
            w-full
            object-cover
          "
        />


        <div className="space-y-4 p-6">

          <div>
            <h1 className="text-4xl font-semibold">
              {hero.name}
            </h1>

            <p className="mt-2 text-muted">
              {hero.title}
            </p>
          </div>


          <div className="flex flex-wrap gap-2">

            {hero.roles.map((role) => (
              <Badge key={role}>
                {role}
              </Badge>
            ))}


            {hero.lanes.map((lane) => (
              <Badge key={lane}>
                {lane}
              </Badge>
            ))}

          </div>

        </div>

      </section>


      <Card title="Hero Stats">

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

          <Stat
            label="Durability"
            value={hero.stats.durability}
          />

          <Stat
            label="Offense"
            value={hero.stats.offense}
          />

          <Stat
            label="Skill Effects"
            value={hero.stats.skillEffects}
          />

          <Stat
            label="Difficulty"
            value={hero.stats.difficulty}
          />

        </div>

      </Card>


      <HeroSkills
        skills={hero.skills}
      />


      <HeroBuild
        build={hero.recommendedBuild}
      />


      <div className="grid gap-8 lg:grid-cols-2">

        <HeroCounters
          counters={hero.counters}
        />

        <HeroSynergy
          synergy={hero.synergy}
        />

      </div>


      {hero.rates && (
        <Card title="Performance">

          <div className="grid grid-cols-3 gap-4">

            <Stat
              label="Win Rate"
              value={`${hero.rates.winRate}%`}
            />

            <Stat
              label="Pick Rate"
              value={`${hero.rates.pickRate}%`}
            />

            <Stat
              label="Ban Rate"
              value={`${hero.rates.banRate}%`}
            />

          </div>

        </Card>
      )}

    </main>
  );
}


function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-sm text-muted">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}