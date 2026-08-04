import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import type { Hero, HeroRole } from '@/entities/hero/model/hero'

import { useHeroes } from '@/entities/hero/api/useHeroes'

import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'

import {
  getRecommendations,
  type HeroRecommendation,
} from '@/features/draft-assistant/model/recommendationEngine'

import { HeroPickerModal } from './HeroPickerModal'

import { DRAFT_ORDER } from '@/features/draft-assistant/model/draftOrder'

function TeamSection({
  title,
  heroes,
  team,
  onPick,
  onRemove,
}: {
  title: string
  heroes: (Hero | null)[]
  team: 'enemy' | 'ally'
  onPick: (team: 'enemy' | 'ally', slot: number) => void
  onRemove: (team: 'enemy' | 'ally', slot: number) => void
}) {
  return (
    <div className="space-y-4">
      <p className="eyebrow">{title}</p>

      <div className="grid grid-cols-5 gap-3">
        {heroes.map((hero, index) => (
          <div key={index} className="relative">
            <button
              type="button"
              onClick={() => onPick(team, index)}
              className="
      angular-frame
      aspect-square
      w-full
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

            {hero && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(team, index)
                }}
                className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-red-600 text-xs font-bold text-white hover:bg-red-700"
              >
                ×
              </button>
            )}
          </div>
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

  const [bannedHeroes, setBannedHeroes] = useState<Hero[]>([])

  const [draftStep, setDraftStep] = useState(0)

  const currentStep = DRAFT_ORDER[draftStep]

  const [pickerOpen, setPickerOpen] = useState(false)

  const [activeTeam, setActiveTeam] = useState<'enemy' | 'ally' | 'ban'>(
    'enemy',
  )

  const [activeIndex, setActiveIndex] = useState(0)

  const [roleFilter, setRoleFilter] = useState<'All' | HeroRole>('All')

  const [recommendations, setRecommendations] = useState<HeroRecommendation[]>(
    [],
  )

  useEffect(() => {
    getRecommendations(
      heroes.filter(
        (hero) => !bannedHeroes.some((banned) => banned.id === hero.id),
      ),
      enemyTeam,
      yourTeam,
    ).then(setRecommendations)
  }, [heroes, enemyTeam, yourTeam, bannedHeroes])

  function openPicker(team: 'enemy' | 'ally', slot: number) {
    if (
      (currentStep === 'blue-pick' && team !== 'ally') ||
      (currentStep === 'red-pick' && team !== 'enemy')
    ) {
      return
    }

    if (slot !== nextEmptySlot(team)) {
      return
    }

    setActiveTeam(team)
    setActiveIndex(slot)
    setPickerOpen(true)
  }

  function openBanPicker() {
    if (currentStep !== 'blue-ban' && currentStep !== 'red-ban') {
      return
    }

    setActiveTeam('ban')
    setPickerOpen(true)
  }

  function removeHero(team: 'enemy' | 'ally', slot: number) {
    if (team === 'enemy') {
      setEnemyTeam((prev) => {
        const next = [...prev]
        next[slot] = null
        return next
      })
    } else {
      setYourTeam((prev) => {
        const next = [...prev]
        next[slot] = null
        return next
      })
    }
  }

  function clearDraft() {
    setEnemyTeam(Array(5).fill(null))
    setYourTeam(Array(5).fill(null))
  }

  function nextStep() {
    setDraftStep((step) => Math.min(step + 1, DRAFT_ORDER.length - 1))
  }

  function nextEmptySlot(team: 'enemy' | 'ally') {
    const list = team === 'enemy' ? enemyTeam : yourTeam
    return list.findIndex((hero) => hero === null)
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
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Current Turn</p>

            <h2 className="mt-1 text-xl font-bold capitalize">
              {DRAFT_ORDER[draftStep]?.replace('-', ' ')}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted">Step</p>

            <p className="text-2xl font-black text-brand">
              {draftStep + 1}/{DRAFT_ORDER.length}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-8">
          <TeamSection
            title="Banned Heroes"
            heroes={[
              ...bannedHeroes,
              ...Array(Math.max(0, 5 - bannedHeroes.length)).fill(null),
            ]}
            team="enemy"
            onPick={() => {}}
            onRemove={(_, slot) => {
              setBannedHeroes((prev) => prev.filter((_, i) => i !== slot))
            }}
          />

          <div className="flex justify-end">
            <Button variant="secondary" onClick={openBanPicker}>
              Ban Hero
            </Button>
          </div>

          <TeamSection
            title="Enemy Team"
            heroes={enemyTeam}
            team="enemy"
            onPick={openPicker}
            onRemove={removeHero}
          />

          <TeamSection
            title="Your Team"
            heroes={yourTeam}
            team="ally"
            onPick={openPicker}
            onRemove={removeHero}
          />

          <div className="flex justify-end">
            <Button variant="secondary" onClick={clearDraft}>
              Clear Draft
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
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
            variant={roleFilter === role ? 'primary' : 'secondary'}
            onClick={() => setRoleFilter(role)}
          >
            {role}
          </Button>
        ))}
      </div>

      <Card title="Recommended Picks">
        {recommendations.length === 0 ? (
          <div className="flex min-h-[240px] items-center justify-center">
            <p className="text-center text-muted">
              No recommendations available.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {(
              [
                'Tank',
                'Fighter',
                'Assassin',
                'Mage',
                'Marksman',
                'Support',
              ] as const
            ).map((role) => {
              const roleHeroes = recommendations.filter(
                (item) =>
                  (roleFilter === 'All' ||
                    item.hero.roles.includes(roleFilter)) &&
                  item.hero.roles.includes(role),
              )

              if (roleHeroes.length === 0) return null

              return (
                <div key={role} className="space-y-3">
                  <h3 className="eyebrow">{role}</h3>

                  <div className="space-y-3">
                    {roleHeroes.map((item) => (
                      <Link
                        key={item.hero.id}
                        to={`/heroes/${item.hero.slug}`}
                        className="
                    angular-frame
                    flex
                    items-center
                    gap-4
                    border
                    border-ink/10
                    bg-inset/50
                    p-3
                    transition-all
                    hover:border-brand/40
                    hover:bg-elevated
                  "
                      >
                        <img
                          src={item.hero.images.square}
                          alt={item.hero.name}
                          className="angular-frame h-14 w-14 object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{item.hero.name}</h3>

                            <span className="rounded bg-brand/15 px-2 py-0.5 text-[10px] font-semibold text-brand">
                              {item.hero.tier}
                            </span>
                          </div>

                          <div className="mt-1 flex flex-wrap gap-1">
                            {item.hero.roles.map((role) => (
                              <span
                                key={role}
                                className="rounded bg-muted/20 px-2 py-0.5 text-[10px]"
                              >
                                {role}
                              </span>
                            ))}

                            <span className="rounded bg-blue-500/15 px-2 py-0.5 text-[10px] text-blue-400">
                              {item.hero.damageType}
                            </span>

                            <span className="rounded bg-orange-500/15 px-2 py-0.5 text-[10px] text-orange-400">
                              {item.hero.difficulty}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-1">
                            {(item.reasons.length
                              ? item.reasons
                              : ['Recommended']
                            )
                              .slice(0, 2)
                              .map((reason) => (
                                <span
                                  key={reason}
                                  className="rounded bg-brand/10 px-2 py-1 text-[11px] text-brand"
                                >
                                  {reason}
                                </span>
                              ))}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-black text-brand">
                            {item.score}
                          </p>

                          <p className="text-xs text-muted">Score</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      <HeroPickerModal
        open={pickerOpen}
        heroes={heroes}
        pickedHeroes={[...enemyTeam, ...yourTeam]}
        onClose={() => setPickerOpen(false)}
        onSelect={(hero) => {
          if (bannedHeroes.some((h) => h.id === hero.id)) {
            setPickerOpen(false)
            return
          }
          if (activeTeam === 'ban') {
            if (bannedHeroes.length >= 5) return

            setBannedHeroes((prev) => [...prev, hero])
            nextStep()
            setPickerOpen(false)
            return
          } else if (activeTeam === 'enemy') {
            setEnemyTeam((prev) => {
              const next = [...prev]
              next[activeIndex] = hero
              return next
            })

            nextStep()
          } else {
            setYourTeam((prev) => {
              const next = [...prev]
              next[activeIndex] = hero
              return next
            })

            nextStep()
          }

          setPickerOpen(false)
        }}
      />
    </div>
  )
}
