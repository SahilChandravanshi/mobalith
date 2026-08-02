import type { Hero } from "@/entities/hero/model/hero";

import { HeroStatsCards } from "./HeroStatsCards";

interface HeroRatesProps {
  hero: Hero;
}

export function HeroRates({
  hero,
}: HeroRatesProps) {
  return (
    <HeroStatsCards hero={hero} />
  );
}