import type { Hero } from '@/entities/hero/model/hero'

import { Badge } from '@/shared/ui/Badge'
import { Card } from '@/shared/ui/Card'

interface HeroSkinsProps {
  hero: Hero
}

function rarityTone(rarity: string): 'brand' | 'gold' | 'success' | 'muted' {
  switch (rarity) {
    case 'Collector':
    case 'Legend':
      return 'gold'

    case 'Epic':
      return 'brand'

    case 'Special':
      return 'success'

    default:
      return 'muted'
  }
}

export function HeroSkins({ hero }: HeroSkinsProps) {
  const skins = hero.skins ?? []

  if (skins.length === 0) {
    return null
  }

  return (
    <Card title="Skins">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {skins.map((skin) => (
          <article
            key={skin.id}
            className="
              angular-frame
              border
              border-ink/10
              bg-inset/40
              overflow-hidden
              transition-all
              duration-200
              hover:border-brand/30
              hover:bg-elevated
              hover:-translate-y-1
            "
          >
            <img
              src={skin.image}
              alt={skin.name}
              loading="lazy"
              className="
                h-52
                w-full
                object-cover
              "
            />

            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="truncate text-lg font-bold">{skin.name}</h3>

                <Badge tone={rarityTone(skin.rarity)}>{skin.rarity}</Badge>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Card>
  )
}
