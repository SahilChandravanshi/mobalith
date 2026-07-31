import { PageHeader } from "@/shared/ui/PageHeader";

import { HeroExplorer } from "@/widgets/hero-explorer/ui/HeroExplorer";

export function HeroesPage() {
  return (
    <main className="space-y-8">

      <PageHeader
        eyebrow="Explore"
        title="Heroes"
        description="Browse every Mobile Legends hero with powerful search and filtering."
      />

      <HeroExplorer />

    </main>
  );
}