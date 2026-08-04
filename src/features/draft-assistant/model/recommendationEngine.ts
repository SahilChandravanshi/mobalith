import type { Hero } from '@/entities/hero/model/hero'
import { relationshipRepository } from '@/entities/hero/repository/relationshipRepository'

export interface HeroRecommendation {
  hero: Hero
  score: number
  reasons: string[]
}

function scoreMeta(hero: Hero, reasons: string[]) {
  let score = 0

  switch (hero.tier) {
    case 'S+':
      score += 40
      reasons.push('Top meta hero')
      break
    case 'S':
      score += 32
      reasons.push('Strong meta pick')
      break
    case 'A':
      score += 24
      reasons.push('Reliable pick')
      break
    case 'B':
      score += 12
      break
    case 'C':
      score += 4
      break
  }

  score += hero.rates.winRate * 1.2
  score += hero.rates.pickRate * 1.8
  score += hero.rates.banRate * 0.5

  return score
}

function scoreMissingRoles(
  hero: Hero,
  allyTeam: (Hero | null)[],
  reasons: string[],
) {
  let score = 0

  const roles = allyTeam
    .filter((h): h is Hero => h !== null)
    .flatMap((h) => h.roles)

  if (!roles.includes('Tank') && hero.roles.includes('Tank')) {
    score += 30
    reasons.push('Provides frontline')
  }

  if (!roles.includes('Marksman') && hero.roles.includes('Marksman')) {
    score += 24
    reasons.push('Adds late-game damage')
  }

  if (!roles.includes('Mage') && hero.roles.includes('Mage')) {
    score += 20
    reasons.push('Adds magic damage')
  }

  if (!roles.includes('Support') && hero.roles.includes('Support')) {
    score += 18
    reasons.push('Provides utility')
  }

  if (!roles.includes('Assassin') && hero.roles.includes('Assassin')) {
    score += 14
    reasons.push('Provides burst')
  }

  return score
}

function scoreDuplicateRoles(
  hero: Hero,
  allyTeam: (Hero | null)[],
  reasons: string[],
) {
  let score = 0

  const allyRoles = allyTeam
    .filter((h): h is Hero => h !== null)
    .flatMap((h) => h.roles)

  const duplicates = hero.roles.filter((role) => allyRoles.includes(role))

  if (duplicates.length) {
    score -= duplicates.length * 15
    reasons.push('Duplicate role')
  }

  return score
}

function scoreDamageBalance(
  hero: Hero,
  allyTeam: (Hero | null)[],
  reasons: string[],
) {
  let score = 0

  const magic = allyTeam.filter((h) => h?.damageType === 'Magic').length
  const physical = allyTeam.filter((h) => h?.damageType === 'Physical').length

  if (magic > physical + 1 && hero.damageType === 'Physical') {
    score += 18
    reasons.push('Balances damage')
  }

  if (physical > magic + 1 && hero.damageType === 'Magic') {
    score += 18
    reasons.push('Balances damage')
  }

  return score
}

function scoreLaneBalance(
  hero: Hero,
  allyTeam: (Hero | null)[],
  reasons: string[],
) {
  let score = 0

  const lanes = allyTeam
    .filter((h): h is Hero => h !== null)
    .flatMap((h) => h.lanes)

  const freeLane = hero.lanes.find((lane) => !lanes.includes(lane))

  if (freeLane) {
    score += 12
    reasons.push(`Fits ${freeLane}`)
  }

  return score
}

function scoreLaneConflicts(
  hero: Hero,
  allyTeam: (Hero | null)[],
  reasons: string[],
) {
  let score = 0

  const occupied = allyTeam
    .filter((h): h is Hero => h !== null)
    .flatMap((h) => h.lanes)

  const conflicts = hero.lanes.filter((lane) => occupied.includes(lane))

  if (conflicts.length) {
    score -= conflicts.length * 8
    reasons.push('Lane conflict')
  }

  return score
}

function scoreEnemyRoles(
  hero: Hero,
  enemyTeam: (Hero | null)[],
  reasons: string[],
) {
  let score = 0

  const enemyRoles = enemyTeam
    .filter((h): h is Hero => h !== null)
    .flatMap((h) => h.roles)

  if (
    enemyRoles.includes('Tank') &&
    (hero.roles.includes('Marksman') || hero.roles.includes('Mage'))
  ) {
    score += 12
    reasons.push('Good into tanks')
  }

  if (enemyRoles.includes('Marksman') && hero.roles.includes('Assassin')) {
    score += 18
    reasons.push('Can dive enemy backline')
  }

  if (enemyRoles.includes('Assassin') && hero.roles.includes('Tank')) {
    score += 10
    reasons.push('Protects carries')
  }

  return score
}

function scoreDifficulty(
  hero: Hero,
  allyTeam: (Hero | null)[],
  reasons: string[],
) {
  let score = 0

  const picked = allyTeam.filter((h): h is Hero => h !== null).length

  if (picked <= 2) {
    if (hero.difficulty === 'Easy') {
      score += 10
      reasons.push('Safe early pick')
    }

    if (hero.difficulty === 'Hard') {
      score -= 5
    }
  } else {
    if (hero.difficulty === 'Hard') {
      score += 8
      reasons.push('Strong counter carry')
    }
  }

  return score
}

function scoreFlexibility(hero: Hero, reasons: string[]) {
  let score = 0

  if (hero.roles.length > 1) {
    score += hero.roles.length * 4
    reasons.push('Flexible pick')
  }

  if (hero.lanes.length > 1) {
    score += hero.lanes.length * 3
  }

  return score
}

function scoreScaling(
  hero: Hero,
  allyTeam: (Hero | null)[],
  reasons: string[],
) {
  let score = 0

  const earlyGame = allyTeam.filter((h) => h?.difficulty === 'Easy').length

  if (earlyGame >= 3 && hero.roles.includes('Marksman')) {
    score += 12
    reasons.push('Adds late-game scaling')
  }

  if (allyTeam.length <= 2 && hero.roles.includes('Fighter')) {
    score += 6
  }

  return score
}

function scoreCrowdControl(
  hero: Hero,
  allyTeam: (Hero | null)[],
  reasons: string[],
) {
  let score = 0

  const hasTank = allyTeam.some((h) => h?.roles.includes('Tank'))

  const hasSupport = allyTeam.some((h) => h?.roles.includes('Support'))

  if (!hasTank && hero.roles.includes('Tank')) {
    score += 18
    reasons.push('Reliable crowd control')
  }

  if (!hasSupport && hero.roles.includes('Support')) {
    score += 10
    reasons.push('Provides utility')
  }

  return score
}

function scoreDraftPhase(
  hero: Hero,
  allyTeam: (Hero | null)[],
  reasons: string[],
) {
  let score = 0

  const picks = allyTeam.filter((h): h is Hero => h !== null).length

  if (picks <= 1) {
    if (hero.roles.includes('Fighter') || hero.roles.includes('Tank')) {
      score += 10
      reasons.push('Strong first pick')
    }
  }

  if (picks >= 3) {
    if (hero.roles.includes('Assassin')) {
      score += 8
      reasons.push('Good last pick')
    }
  }

  return score
}

export async function getRecommendations(
  heroes: Hero[],
  enemyTeam: (Hero | null)[],
  allyTeam: (Hero | null)[],
): Promise<HeroRecommendation[]> {
  const relationships = await relationshipRepository.getAll()

  const picked = new Set(
    [...enemyTeam, ...allyTeam]
      .filter((hero): hero is Hero => hero !== null)
      .map((hero) => hero.id),
  )

  return heroes
    .filter((hero) => !picked.has(hero.id))
    .map((hero) => {
      const reasons: string[] = []

      let score =
        scoreMeta(hero, reasons) +
        scoreMissingRoles(hero, allyTeam, reasons) +
        scoreDuplicateRoles(hero, allyTeam, reasons) +
        scoreDamageBalance(hero, allyTeam, reasons) +
        scoreLaneBalance(hero, allyTeam, reasons) +
        scoreLaneConflicts(hero, allyTeam, reasons) +
        scoreEnemyRoles(hero, enemyTeam, reasons) +
        scoreDifficulty(hero, allyTeam, reasons) +
        scoreFlexibility(hero, reasons) +
        scoreScaling(hero, allyTeam, reasons) +
        scoreCrowdControl(hero, allyTeam, reasons) +
        scoreDraftPhase(hero, allyTeam, reasons)

      const relation = relationships.find((r) => r.heroId === hero.id)

      if (relation) {
        enemyTeam.forEach((enemy) => {
          if (!enemy) return

          const counter = relation.counters.find((c) => c.heroId === enemy.id)

          if (counter) {
            score += counter.score
            reasons.push(counter.reason)
          }
        })

        allyTeam.forEach((ally) => {
          if (!ally) return

          const badMatchup = relation.counteredBy.find(
            (c) => c.heroId === ally.id,
          )

          if (badMatchup) {
            score -= badMatchup.score
            reasons.push(`Weak with ${ally.name}`)
          }
        })

        allyTeam.forEach((ally) => {
          if (!ally) return

          const synergy = relation.synergies.find((s) => s.heroId === ally.id)

          if (synergy) {
            score += synergy.score
            reasons.push(synergy.reason)
          }
        })
      }

      return {
        hero,
        score: Math.round(score),
        reasons,
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
}
