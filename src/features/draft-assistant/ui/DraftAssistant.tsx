import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { DraftBoard } from './ui/DraftBoard'

import { DraftSlot } from './DraftSlot'

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
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Draft Phase</p>

              <h2 className="mt-1 text-2xl font-black tracking-wide">
                {currentStep
                  ?.replace('blue', 'Blue')
                  .replace('red', 'Red')
                  .replace('-', ' ')}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-muted">
                Progress
              </p>

              <p className="text-3xl font-black text-brand">{draftStep + 1}</p>
            </div>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-inset">
            <div
              className="h-full bg-brand transition-all duration-500"
              style={{
                width: `${((draftStep + 1) / DRAFT_ORDER.length) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-[repeat(15,minmax(0,1fr))]">
            {DRAFT_ORDER.map((_, index) => (
              <div
                key={index}
                className={`
            h-2 angular-frame transition-all
            ${
              index < draftStep
                ? 'bg-brand'
                : index === draftStep
                  ? 'bg-yellow-400'
                  : 'bg-inset'
            }
          `}
              />
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="space-y-8">
          {/* Enemy */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-red-400">RED SIDE</span>

              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Enemy Team
              </span>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {enemyTeam.map((hero, index) => (
                <DraftSlot
                  key={index}
                  hero={hero}
                  active={
                    currentStep === 'red-pick' &&
                    index === nextEmptySlot('enemy')
                  }
                  disabled={
                    currentStep !== 'red-pick' ||
                    (hero === null && index !== nextEmptySlot('enemy'))
                  }
                  onClick={() => {
                    if (hero) {
                      removeHero('enemy', index)
                    } else {
                      openPicker('enemy', index)
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bans */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-red-500">🚫</span>

              <p className="eyebrow">Banned Heroes</p>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <DraftSlot
                  key={index}
                  hero={bannedHeroes[index] ?? null}
                  onClick={() => {
                    if (bannedHeroes[index]) {
                      setBannedHeroes((prev) =>
                        prev.filter((_, i) => i !== index),
                      )
                    } else {
                      openBanPicker()
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Ally */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Your Team
              </span>

              <span className="eyebrow text-blue-400">BLUE SIDE</span>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {yourTeam.map((hero, index) => (
                <DraftSlot
                  key={index}
                  hero={hero}
                  active={
                    currentStep === 'blue-pick' &&
                    index === nextEmptySlot('ally')
                  }
                  disabled={
                    currentStep !== 'blue-pick' ||
                    (hero === null && index !== nextEmptySlot('ally'))
                  }
                  onClick={() => {
                    if (hero) {
                      removeHero('ally', index)
                    } else {
                      openPicker('ally', index)
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={clearDraft}>
            Reset Draft
          </Button>
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

                  <div className="grid gap-4 lg:grid-cols-2">
                    {roleHeroes.map((item) => (
                      <Link
                        key={item.hero.id}
                        to={`/heroes/${item.hero.slug}`}
                        className="
                    angular-frame
                    group
                    relative
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
                    hover:-translate-y-1
                    duration-200
                  "
                      >
                        <img
                          src={item.hero.images.square}
                          alt={item.hero.name}
                          className="angular-frame h-20 w-20 shrink-0 object-cover"
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
                          <p className="text-3xl font-black text-brand">
                            {item.score}
                          </p>

                          <p className="text-xs text-muted">Score</p>
                          <div className="mt-3 space-y-1 text-[11px] text-muted">
                            <p>WR {item.hero.rates.winRate}%</p>
                            <p>PR {item.hero.rates.pickRate}%</p>
                            <p>BR {item.hero.rates.banRate}%</p>
                          </div>
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
