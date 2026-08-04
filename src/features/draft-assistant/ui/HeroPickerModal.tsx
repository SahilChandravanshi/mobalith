import { useMemo, useState } from 'react'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Modal } from '@/shared/ui/Overlay'

import type { Hero } from '@/entities/hero'
import type { HeroRole } from '@/entities/hero/model/hero'

interface HeroPickerModalProps {
  open: boolean
  heroes: Hero[]
  pickedHeroes: (Hero | null)[]
  onClose: () => void
  onSelect: (hero: Hero) => void
}

export function HeroPickerModal({
  open,
  heroes,
  pickedHeroes,
  onClose,
  onSelect,
}: HeroPickerModalProps) {
  const [search, setSearch] = useState('')
  const [selectedRole, setSelectedRole] = useState<'All' | HeroRole>('All')

  const [sortBy, setSortBy] = useState<
    'meta' | 'winRate' | 'pickRate' | 'name'
  >('meta')

  const filteredHeroes = useMemo(() => {
    const query = search.trim().toLowerCase()

    const pickedIds = new Set(
      pickedHeroes
        .filter((hero): hero is Hero => hero !== null)
        .map((hero) => hero.id),
    )

    const tierValue = {
      'S+': 5,
      S: 4,
      A: 3,
      B: 2,
      C: 1,
    }

    return heroes
      .filter((hero) => {
        if (pickedIds.has(hero.id)) {
          return false
        }

        const matchesRole =
          selectedRole === 'All' ||
          hero.roles.includes(selectedRole)

        const matchesSearch =
          !query ||
          hero.name.toLowerCase().includes(query) ||
          hero.title.toLowerCase().includes(query)

        return matchesRole && matchesSearch
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'winRate':
            return b.rates.winRate - a.rates.winRate

          case 'pickRate':
            return b.rates.pickRate - a.rates.pickRate

          case 'name':
            return a.name.localeCompare(b.name)

          case 'meta':
          default:
            return (
              tierValue[b.tier] - tierValue[a.tier] ||
              b.rates.winRate - a.rates.winRate
            )
        }
      })
  }, [
    heroes,
    pickedHeroes,
    search,
    selectedRole,
    sortBy,
  ])

  return (
    <Modal open={open} onClose={onClose} title="Select Hero">
      <div className="space-y-4">
        <Input
          icon="search"
          placeholder="Search hero..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              'All',
              'Tank',
              'Fighter',
              'Assassin',
              'Mage',
              'Marksman',
              'Support',
            ] as const
          ).map((role) => (
            <Button
              key={role}
              variant={
                selectedRole === role
                  ? 'primary'
                  : 'secondary'
              }
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </Button>
          ))}

          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | 'meta'
                    | 'winRate'
                    | 'pickRate'
                    | 'name',
                )
              }
              className="
                angular-frame
                border
                border-ink/10
                bg-elevated
                px-3
                py-2
                text-sm
              "
            >
              <option value="meta">Meta</option>
              <option value="winRate">Win Rate</option>
              <option value="pickRate">Pick Rate</option>
              <option value="name">A–Z</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredHeroes.map((hero) => (
            <button
              key={hero.id}
              type="button"
              onClick={() => {
                onSelect(hero)
                onClose()
              }}
              className="
                group
                relative
                angular-frame
                overflow-hidden
                border
                border-ink/10
                bg-elevated
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-brand/40
              "
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={hero.images.square}
                  alt={hero.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                <span className="absolute right-2 top-2 rounded bg-brand px-2 py-1 text-[10px] font-bold text-white">
                  {hero.tier}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-3">
                  <h3 className="truncate text-sm font-bold text-white">
                    {hero.name}
                  </h3>

                  <p className="mt-1 text-[11px] text-zinc-300">
                    {hero.roles.join(' • ')}
                  </p>
                </div>
              </div>
            </button>
          ))}

          {filteredHeroes.length === 0 && (
            <div className="col-span-full py-10 text-center text-muted">
              No heroes found.
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}