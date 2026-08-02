import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useHeroes } from "@/entities/hero";

import { ErrorState, Skeleton } from "@/shared/ui/FeedbackStates";
import { Section } from "@/shared/ui/layout/Section";

import { HeroBanner } from "@/widgets/hero-details/ui/HeroBanner";
import { HeroRates } from "@/widgets/hero-details/ui/HeroRates";
import { HeroAttributes } from "@/widgets/hero-details/ui/HeroAttributes";
import { HeroSkills } from "@/widgets/hero-details/ui/HeroSkills";

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
        <Skeleton className="h-40" />
        <Skeleton className="h-64" />
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

      <Section title="Overview">
        <HeroRates hero={hero} />
      </Section>

      <Section
        title="Attributes"
        description="Overall strengths of the hero."
      >
        <HeroAttributes hero={hero} />
      </Section>

      <Section
        title="Skills"
        description="Passive and active abilities."
      >
        <HeroSkills hero={hero} />
      </Section>

    </div>
  );
}