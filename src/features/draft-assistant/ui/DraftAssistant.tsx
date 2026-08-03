import { useState } from 'react'
import { useEffect } from 'react'

import type { Hero } from '@/entities/hero/model/hero'

import { useHeroes } from '@/entities/hero/api/useHeroes'

import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'

import {
  getRecommendations,
  type HeroRecommendation,
} from '@/features/draft-assistant/model/recommendationEngine'

import { HeroPickerModal } from './HeroPickerModal'

function TeamSection({
  title,
  heroes,
  team,
  onPick,
}: {
  title: string
  heroes: (Hero | null)[]
  team: 'enemy' | 'ally'
  onPick: (team: 'enemy' | 'ally', slot: number) => void
}) {
  return (
    <div className="space-y-4">
      <p className="eyebrow">{title}</p>

      <div className="grid grid-cols-5 gap-3">
        {heroes.map((hero, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onPick(team, index)}
            className="
              angular-frame
              aspect-square
              overflow-hidden
              border
              border-ink/10
              bg-inset
              transition-all
              hover:border-brand/40
              hover:bg-elevated
            "
          >
            {hero ? (
              <div className="relative h-full w-full">
                <img
                  src={hero.images.square}
                  alt={hero.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-black/70 px-1 py-0.5">
                  <p className="truncate text-[10px] font-semibold text-white">
                    {hero.name}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-3xl font-light text-muted">
                +
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export function DraftAssistant() {
  const { heroes } = useHeroes()

  const [enemyTeam, setEnemyTeam] = useState<(Hero | null)[]>(
    Array(5).fill(null),
  )

  const [yourTeam, setYourTeam] = useState<(Hero | null)[]>(Array(5).fill(null))

  const [pickerOpen, setPickerOpen] = useState(false)

  const [activeTeam, setActiveTeam] = useState<'enemy' | 'ally'>('enemy')

  const [activeIndex, setActiveIndex] = useState(0)

  const [recommendations, setRecommendations] = useState<HeroRecommendation[]>(
    [],
  )

  useEffect(() => {
    getRecommendations(heroes, enemyTeam, yourTeam).then(setRecommendations)
  }, [heroes, enemyTeam, yourTeam])

  function openPicker(team: 'enemy' | 'ally', slot: number) {
    setActiveTeam(team)
    setActiveIndex(slot)
    setPickerOpen(true)
  }

  function clearDraft() {
    setEnemyTeam(Array(5).fill(null))
    setYourTeam(Array(5).fill(null))
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow">Smart Draft Assistant</p>

        <h1 className="section-title mt-2">Draft Assistant</h1>

        <p className="mt-2 max-w-2xl text-muted">
          Build your team, add enemy heroes, and receive intelligent hero
          recommendations based on counters, synergies, and the current meta.
        </p>
      </header>

      <Card>
        <div className="space-y-8">
          <TeamSection
            title="Enemy Team"
            heroes={enemyTeam}
            team="enemy"
            onPick={openPicker}
          />

          <TeamSection
            title="Your Team"
            heroes={yourTeam}
            team="ally"
            onPick={openPicker}
          />

          <div className="flex justify-end">
            <Button variant="secondary" onClick={clearDraft}>
              Clear Draft
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Recommended Picks">
        {recommendations.length === 0 ? (
          <div className="flex min-h-[240px] items-center justify-center">
            <p className="text-center text-muted">
              No recommendations available.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recommendations.map((item) => (
              <div
                key={item.hero.id}
                className="
                  angular-frame
                  flex
                  items-center
                  gap-4
                  border
                  border-ink/10
                  bg-inset/50
                  p-3
                "
              >
                <img
                  src={item.hero.images.square}
                  alt={item.hero.name}
                  className="angular-frame h-14 w-14 object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{item.hero.name}</h3>

                  <p className="text-sm text-muted">
                    {item.reasons.join(' • ') || 'Recommended'}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-black text-brand">{item.score}</p>

                  <p className="text-xs text-muted">Score</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <HeroPickerModal
        open={pickerOpen}
        heroes={heroes}
        pickedHeroes={[...enemyTeam, ...yourTeam]}
        onClose={() => setPickerOpen(false)}
        onSelect={(hero) => {
          if (activeTeam === 'enemy') {
            setEnemyTeam((prev) => {
              const next = [...prev]
              next[activeIndex] = hero
              return next
            })
          } else {
            setYourTeam((prev) => {
              const next = [...prev]
              next[activeIndex] = hero
              return next
            })
          }

          setPickerOpen(false)
        }}
      />
    </div>
  )
}
