import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useHeroes } from "@/entities/hero";

import { ErrorState, Skeleton } from "@/shared/ui/FeedbackStates";
import { Section } from "@/shared/ui/layout/Section";

import { HeroBanner } from "@/widgets/hero-details/ui/HeroBanner";
import { HeroRates } from "@/widgets/hero-details/ui/HeroRates";
import { HeroAttributes } from "@/widgets/hero-details/ui/HeroAttributes";
import { HeroStats } from "@/widgets/hero-details/ui/HeroStats";
import { HeroSkills } from "@/widgets/hero-details/ui/HeroSkills";
import { HeroBuild } from "@/widgets/hero-details/ui/HeroBuild";
import { HeroCounters } from "@/widgets/hero-details/ui/HeroCounters";
import { HeroSynergy } from "@/widgets/hero-details/ui/HeroSynergy";

export default function HeroDetailsPage() {
  const { slug } = useParams();

  const { heroes, loading, error } = useHeroes();

  const hero = useMemo(
    () => heroes.find((hero) => hero.slug === slug),
    [heroes, slug]
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-80" />
        <Skeleton className="h-48" />
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    );
  }

  if (error) {
    return <ErrorState description={error} />;
  }

  if (!hero) {
    return (
      <ErrorState
        title="Hero not found"
        description="The requested hero could not be found."
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <HeroBanner hero={hero} />

      <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <Section title="Overview">
            <HeroRates hero={hero} />
          </Section>

          <Section
            title="Skills"
            description="Passive and active abilities."
          >
            <HeroSkills hero={hero} />
          </Section>

          <Section
            title="Recommended Build"
            description="Core item progression."
          >
            <HeroBuild hero={hero} />
          </Section>

          <Section
            title="Counters"
            description="Heroes that perform well against this hero."
          >
            <HeroCounters hero={hero} />
          </Section>

          <Section
            title="Best Synergies"
            description="Heroes that work especially well together."
          >
            <HeroSynergy hero={hero} />
          </Section>
        </div>

        <div className="space-y-8">
          <Section
            title="Attributes"
            description="Overall strengths."
          >
            <HeroAttributes hero={hero} />
          </Section>

          <Section
            title="Stat Distribution"
            description="Overall hero profile."
          >
            <HeroStats hero={hero} />
          </Section>
        </div>
      </div>
    </div>
  );
}