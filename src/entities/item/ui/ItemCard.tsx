import { Link } from "react-router-dom";

import type { Item } from "../model/item";

import { Card } from "@/shared/ui/Card";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({
  item,
}: ItemCardProps) {
  return (
    <Link
      to={`/items/${item.slug}`}
      className="block"
    >
      <Card className="transition-transform duration-200 hover:-translate-y-1">

        <div className="flex items-center gap-4">

          <img
            src={item.image}
            alt={item.name}
            className="h-14 w-14 rounded-lg object-cover"
          />

          <div className="min-w-0 flex-1">

            <h3 className="truncate font-semibold">
              {item.name}
            </h3>

            <p className="text-sm text-muted">
              {item.category}
            </p>

          </div>

        </div>

      </Card>
    </Link>
  );
}