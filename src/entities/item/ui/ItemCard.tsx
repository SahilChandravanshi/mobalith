import type { Item } from "../model/item";


interface ItemCardProps {
  item: Item;
}


export default function ItemCard({
  item,
}: ItemCardProps) {

  return (
    <article
      className="
        group
        overflow-hidden
        border
        border-ink/10
        bg-elevated
        transition-colors
        duration-200
        hover:border-brand
      "
    >

      <div
        className="
          flex
          items-center
          justify-center
          border-b
          border-ink/10
          bg-inset
          p-6
        "
      >

        <img
          src={item.icon}
          alt={item.name}
          loading="lazy"
          className="
            h-16
            w-16
            object-contain
          "
        />

      </div>


      <div className="space-y-3 p-4">

        <div>

          <h3 className="font-semibold">
            {item.name}
          </h3>


          <p className="mt-1 text-sm text-muted">
            {item.category}
          </p>

        </div>


        <p className="text-sm leading-6 text-muted">
          {item.description}
        </p>


        <div
          className="
            flex
            items-center
            justify-between
            text-sm
          "
        >

          <span className="text-muted">
            Price
          </span>


          <span className="font-semibold text-brand">
            {item.price}
          </span>

        </div>


      </div>

    </article>
  );
}