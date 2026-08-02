import { ItemCard } from "@/entities/item/ui/ItemCard";
import { useItems } from "@/entities/item/api/useItems";

import {
  ErrorState,
  Skeleton,
} from "@/shared/ui/FeedbackStates";

export function ItemGrid() {
  const {
    items,
    loading,
    error,
  } = useItems();

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-28"
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
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
        />
      ))}
    </section>
  );
}