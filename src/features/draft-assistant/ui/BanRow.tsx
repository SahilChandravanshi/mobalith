import type { Hero } from '@/entities/hero'

interface BanRowProps {
  bans: (Hero | null)[]
}

export function BanRow({
  bans,
}: BanRowProps) {
  return (
    <div className="space-y-4">
      <h3 className="eyebrow text-center">
        Banned Heroes
      </h3>

      <div className="flex justify-center gap-4">
        {bans.map((hero, index) => (
          <div
            key={index}
            className="
              angular-frame
              h-16
              w-16
              overflow-hidden
              border
              border-ink/10
              bg-inset
            "
          >
            {hero ? (
              <img
                src={hero.images.square}
                alt={hero.name}
                className="h-full w-full object-cover grayscale"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xl text-muted">
                +
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}