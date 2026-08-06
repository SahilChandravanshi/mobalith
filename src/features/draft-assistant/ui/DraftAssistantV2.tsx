import { useState } from 'react'
import { useEffect } from 'react'
// import { Link } from 'react-router-dom'
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

              <h2 className="mt-1 text-3xl font-black tracking-tight">
                {currentStep
                  ?.replace('blue', 'Blue')
                  .replace('red', 'Red')
                  .replace('-', ' ')}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-muted">
                Draft Step
              </p>

              <p className="text-4xl font-black leading-none text-brand">
                {draftStep + 1}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            {DRAFT_ORDER.map((step, index) => {
              const completed = index < draftStep
              const active = index === draftStep

              return (
                <div key={index} className="flex flex-1 items-center">
                  <div
                    className={`flex h-9 w-[58px] items-center justify-center angular-frame border text-[11px] font-black transition-all ${
                      completed
                        ? 'border-brand bg-brand text-white'
                        : active
                          ? 'border-yellow-400 bg-yellow-400 text-black shadow-[0_0_12px_rgba(255,210,50,.45)]'
                          : 'border-ink/10 bg-inset text-muted'
                    }`}
                  >
                    {step.includes('ban')
                      ? 'BAN'
                      : step.startsWith('blue')
                        ? 'BLUE'
                        : 'RED'}
                  </div>

                  {index !== DRAFT_ORDER.length - 1 && (
                    <div
                      className={`h-[2px] flex-1 ${
                        completed ? 'bg-brand' : 'bg-inset'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
          <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.3em] text-muted">
            {currentStep.includes('ban')
              ? 'BAN PHASE'
              : currentStep.startsWith('blue')
                ? 'BLUE TEAM PICKING'
                : 'RED TEAM PICKING'}
          </p>
        </div>
      </Card>

      <Card className="overflow-hidden border border-ink/10 p-0 min-h-[1100px]">
        <div className="grid grid-cols-[220px_minmax(0,1fr)_220px_320px]">
          {/* LEFT TEAM */}

          <div className="border-r border-ink/10 bg-[#0b1017] p-5">
            <p className="mb-5 text-center text-[12px] font-black uppercase tracking-[0.35em] text-red-500">
              RED TEAM
            </p>

            <div className="space-y-4">
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
                      variant="ban"
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
              <div className="mb-4 flex items-end justify-between gap-5">
                <div>
                  <p className="eyebrow">Hero Picker</p>

                  <h2 className="mt-1 text-[32px] font-black leading-none tracking-tight">
                    {activeTeam === 'enemy'
                      ? `Enemy Pick ${activeIndex + 1}`
                      : activeTeam === 'ally'
                        ? `Your Pick ${activeIndex + 1}`
                        : `Ban Hero ${bannedHeroes.length + 1}`}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-[280px]">
                    <Input
                      icon="search"
                      placeholder="Search heroes..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      'All',
                      'Tank',
                      'Fighter',
                      'Assassin',
                      'Mage',
                      'Marksman',
                      'Support',
                    ].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setRoleFilter(role as typeof roleFilter)}
                        className={`angular-frame border px-3 py-2 text-[11px] font-black uppercase tracking-wider transition-all ${
                          roleFilter === role
                            ? 'border-brand bg-brand text-white shadow-[0_0_14px_rgba(79,116,255,.35)]'
                            : 'border-ink/10 bg-elevated hover:border-brand/50'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex-1 overflow-y-auto angular-frame border border-ink/10 bg-inset/20 p-3">
                <div className="grid grid-cols-8 gap-2 xl:grid-cols-9 2xl:grid-cols-10">
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
                        className="group relative overflow-hidden angular-frame border border-ink/10 bg-elevated transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_0_18px_rgba(79,116,255,.30)]"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            loading="lazy"
                            src={hero.images.square}
                            alt={hero.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                          <span className="absolute right-1 top-1 angular-frame bg-brand px-1.5 py-0.5 text-[9px] font-black text-white">
                            {hero.tier}
                          </span>

                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-2">
                            <p className="truncate text-center text-[11px] font-bold tracking-wide text-white">
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

          {/* BLUE TEAM */}

          <div className="border-l border-ink/10 bg-[#0f141d] p-4">
            <p className="mb-5 text-center text-[12px] font-black uppercase tracking-[0.35em] text-sky-400">
              BLUE TEAM
            </p>

            <div className="space-y-4">
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

          {/* AI SIDEBAR */}

          <div className="border-l border-ink/10 bg-[#0b1017] p-5">
            <p className="mb-5 text-center text-[12px] font-black uppercase tracking-[0.35em] text-brand">
              AI PICKS
            </p>

            <div className="space-y-3">
              {recommendations.slice(0, 5).map((rec) => (
                <button
                  key={rec.hero.id}
                  onClick={() => selectHero(rec.hero)}
                  className="group flex w-full gap-3 angular-frame border border-ink/10 bg-elevated p-2 text-left transition-all duration-200 hover:border-brand hover:shadow-[0_0_16px_rgba(79,116,255,.25)]"
                >
                  <img
                    src={rec.hero.images.square}
                    alt={rec.hero.name}
                    className="h-16 w-16 angular-frame object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-black">
                        {rec.hero.name}
                      </p>

                      <span className="text-brand font-black">
                        {Math.round(rec.score)}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-muted">
                      {rec.hero.roles.join(' • ')}
                    </p>

                    <p className="mt-2 line-clamp-2 text-[11px] text-muted">
                      {rec.reasons[0]}
                    </p>
                  </div>
                </button>
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
