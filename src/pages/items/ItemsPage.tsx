import { PageHeader } from "@/shared/ui/PageHeader";

import { ItemGrid } from "@/widgets/item-grid/ui/ItemGrid";


export function ItemsPage() {

  return (
    <main className="space-y-8">

      <PageHeader
        eyebrow="Explore"
        title="Items"
        description="Explore item stats, effects, and build paths."
      />


      <ItemGrid />

    </main>
  );
}