import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { DraftBoard } from './ui/DraftBoard'

import { DraftSlot } from './DraftSlot'

import type { Hero, HeroRole } from '@/entities/hero/model/hero'

import { useHeroes } from '@/entities/hero/api/useHeroes'

import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'

import {
  getRecommendations,
  type HeroRecommendation,
} from '@/features/draft-assistant/model/recommendationEngine'

// import { HeroPickerModal } from './HeroPickerModal'

import { DRAFT_ORDER } from '@/features/draft-assistant/model/draftOrder'

export function DraftAssistantV2() {
  const { heroes } = useHeroes()

  const [enemyTeam, setEnemyTeam] = useState<(Hero | null)[]>(
    Array(5).fill(null),
  )

  const [yourTeam, setYourTeam] = useState<(Hero | null)[]>(Array(5).fill(null))

  const [bannedHeroes, setBannedHeroes] = useState<Hero[]>([])

  const [draftStep, setDraftStep] = useState(0)

  const currentStep = DRAFT_ORDER[draftStep]

  // const [pickerOpen, setPickerOpen] = useState(false)

  const [activeTeam, setActiveTeam] = useState<'enemy' | 'ally' | 'ban'>(
    'enemy',
  )

  const [activeIndex, setActiveIndex] = useState(0)

  const [roleFilter, setRoleFilter] = useState<'All' | HeroRole>('All')

  const [search, setSearch] = useState('')

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
  }

  function openBanPicker() {
    if (currentStep !== 'blue-ban' && currentStep !== 'red-ban') {
      return
    }

    setActiveTeam('ban')
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

  function selectHero(hero: Hero) {
    if (bannedHeroes.some((h) => h.id === hero.id)) {
      return
    }

    if (activeTeam === 'ban') {
      if (bannedHeroes.length >= 5) return

      setBannedHeroes((prev) => [...prev, hero])
      nextStep()
      return
    }

    if (activeTeam === 'enemy') {
      setEnemyTeam((prev) => {
        const next = [...prev]
        next[activeIndex] = hero
        return next
      })

      nextStep()
      return
    }

    setYourTeam((prev) => {
      const next = [...prev]
      next[activeIndex] = hero
      return next
    })

    nextStep()
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

      <Card className="overflow-hidden border border-ink/10 p-0 min-h-[980px]">
        <div className="grid grid-cols-[180px_minmax(0,1fr)_180px]">
          {/* LEFT TEAM */}

          <div className="border-r border-ink/10 bg-[#0f141d] p-4">
            <p className="mb-4 text-center text-xs font-bold tracking-[0.25em] text-red-400">
              RED TEAM
            </p>

            <div className="space-y-3">
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

          {/* CENTER */}

          <div className="flex flex-col p-5">
            <div className="border-b border-ink/10 pb-5">
              <p className="mb-4 text-center text-xs font-bold tracking-[0.25em] text-muted">
                BANNED HEROES
              </p>

              <div className="flex justify-center gap-4 pb-2">
                {Array.from({ length: 5 }).map((_, index) => {
                  const active =
                    (currentStep === 'blue-ban' || currentStep === 'red-ban') &&
                    index === bannedHeroes.length

                  return (
                    <DraftSlot
                      key={index}
                      hero={bannedHeroes[index] ?? null}
                      active={active}
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
                  )
                })}
              </div>
            </div>

            <div className="mt-5 flex-1">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">Hero Picker</p>

                  <h2 className="mt-1 text-3xl font-black tracking-tight">
                    {activeTeam === 'enemy'
                      ? `Enemy Pick ${activeIndex + 1}`
                      : activeTeam === 'ally'
                        ? `Your Pick ${activeIndex + 1}`
                        : `Ban Hero ${bannedHeroes.length + 1}`}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-[320px]">
                    <Input
                      icon="search"
                      placeholder="Search heroes..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <select
                    value={roleFilter}
                    onChange={(e) =>
                      setRoleFilter(e.target.value as typeof roleFilter)
                    }
                    className="angular-frame border border-ink/10 bg-elevated px-3 py-2 text-sm"
                  >
                    <option value="All">All</option>
                    <option value="Tank">Tank</option>
                    <option value="Fighter">Fighter</option>
                    <option value="Assassin">Assassin</option>
                    <option value="Mage">Mage</option>
                    <option value="Marksman">Marksman</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto rounded-xl bg-inset/10 p-4">
                <div className="grid grid-cols-7 gap-2 xl:grid-cols-8 2xl:grid-cols-9">
                  {heroes
                    .filter((hero) => {
                      const picked = [
                        ...enemyTeam,
                        ...yourTeam,
                        ...bannedHeroes,
                      ]
                        .filter(Boolean)
                        .some((h) => h!.id === hero.id)

                      if (picked) return false

                      const query = search.trim().toLowerCase()

                      if (
                        query &&
                        !hero.name.toLowerCase().includes(query) &&
                        !hero.title.toLowerCase().includes(query)
                      ) {
                        return false
                      }

                      if (
                        roleFilter !== 'All' &&
                        !hero.roles.includes(roleFilter)
                      ) {
                        return false
                      }

                      return true
                    })
                    .map((hero) => (
                      <button
                        key={hero.id}
                        onClick={() => selectHero(hero)}
                        // className="group angular-frame overflow-hidden border border-ink/10 bg-elevated transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_0_18px_rgba(79,116,255,.28)]"
                        className="group relative angular-frame overflow-hidden border border-ink/10 bg-elevated transition-all duration-200 hover:z-10 hover:scale-[1.04] hover:border-brand hover:shadow-[0_0_20px_rgba(79,116,255,.35)]"
                      >
                        <div className="relative aspect-square">
                          <img
                            loading="lazy"
                            src={hero.images.square}
                            alt={hero.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                          <span className="absolute right-2 top-2 rounded bg-brand px-2 py-1 text-[10px] font-bold text-white">
                            {hero.tier}
                          </span>

                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                            <p className="truncate text-center text-xs font-bold text-white">
                              {hero.name}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT TEAM */}

          <div className="border-l border-ink/10 bg-[#0f141d] p-4">
            <p className="mb-4 text-center text-[11px] font-black tracking-[0.30em] uppercase text-sky-400">
              BLUE TEAM
            </p>

            <div className="space-y-3">
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

        <div className="border-t border-ink/10 p-4">
          <div className="flex justify-end">
            <Button variant="secondary" onClick={clearDraft}>
              Reset Draft
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
