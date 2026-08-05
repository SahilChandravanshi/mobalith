import type { Hero } from '@/entities/hero'

interface TeamColumnProps {
  title: string
  heroes: (Hero | null)[]
}

export function TeamColumn({
  title,
  heroes,
}: TeamColumnProps) {
  return (
    <div className="space-y-3">
      <h3 className="eyebrow text-center">
        {title}
      </h3>

      {heroes.map((hero, index) => (
        <button
          key={index}
          className="
            group
            relative
            angular-frame
            aspect-[3/4]
            w-full
            overflow-hidden
            border
            border-ink/10
            bg-inset
            transition-all
            hover:border-brand/40
          "
        >
          {hero ? (
            <>
              <img
                src={hero.images.square}
                alt={hero.name}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-2">
                <p className="truncate text-xs font-semibold text-white">
                  {hero.name}
                </p>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-4xl text-muted">
              +
            </div>
          )}
        </button>
      ))}
    </div>
  )
}