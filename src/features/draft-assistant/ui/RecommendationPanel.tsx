import type { HeroRecommendation } from '../model/recommendationEngine'

import { RecommendationCard } from './RecommendationCard'

interface RecommendationPanelProps {
  recommendations: HeroRecommendation[]
}

export function RecommendationPanel({
  recommendations,
}: RecommendationPanelProps) {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-bold">
        Recommended Picks
      </h2>

      <div className="space-y-3">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.hero.id}
            recommendation={recommendation}
          />
        ))}
      </div>

    </div>
  )
}