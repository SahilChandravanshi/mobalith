import type { HeroRecommendation } from '../model/recommendationEngine'

interface RecommendationCardProps {
  recommendation: HeroRecommendation
}

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <div
      className="
        angular-frame
        flex
        items-center
        gap-4
        border
        border-ink/10
        bg-elevated
        p-3
      "
    >
      <img
        src={recommendation.hero.images.square}
        alt={recommendation.hero.name}
        className="angular-frame h-16 w-16 object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold">
          {recommendation.hero.name}
        </h3>

        <p className="text-xs text-muted">
          {recommendation.hero.roles.join(' • ')}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xl font-black text-brand">
          {recommendation.score}
        </p>

        <p className="text-xs text-muted">
          Score
        </p>
      </div>
    </div>
  )
}