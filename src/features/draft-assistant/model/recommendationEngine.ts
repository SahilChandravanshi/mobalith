import type { Hero } from "@/entities/hero/model/hero";

export interface HeroRecommendation {
  hero: Hero;
  score: number;
  reasons: string[];
}

function scoreMeta(hero: Hero, reasons: string[]) {
  let score = 0;

  switch (hero.tier) {
    case "S+":
      score += 40;
      reasons.push("Top meta hero");
      break;

    case "S":
      score += 30;
      reasons.push("Strong meta pick");
      break;

    case "A":
      score += 20;
      break;

    case "B":
      score += 10;
      break;
  }

  score += hero.rates.winRate;
  score += hero.rates.pickRate * 2;
  score += hero.rates.banRate;

  return score;
}

function scoreCounters() {
  return 0;
}

function scoreSynergy() {
  return 0;
}

function scoreTeamComposition() {
  return 0;
}

function scoreDamageBalance() {
  return 0;
}

function scoreLaneBalance() {
  return 0;
}

export function getRecommendations(
  heroes: Hero[],
  enemyTeam: (Hero | null)[],
  allyTeam: (Hero | null)[]
): HeroRecommendation[] {
  const picked = new Set(
    [...enemyTeam, ...allyTeam]
      .filter(Boolean)
      .map((hero) => hero!.id)
  );

  return heroes
    .filter((hero) => !picked.has(hero.id))
    .map((hero) => {
      const reasons: string[] = [];

      const score =
        scoreMeta(hero, reasons) +
        scoreCounters() +
        scoreSynergy() +
        scoreTeamComposition() +
        scoreDamageBalance() +
        scoreLaneBalance();

      return {
        hero,
        score: Math.round(score),
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}