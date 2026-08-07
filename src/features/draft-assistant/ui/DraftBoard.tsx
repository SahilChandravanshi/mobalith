import type { Hero } from '@/entities/hero'

interface DraftBoardProps {
  enemyTeam: (Hero | null)[]
  yourTeam: (Hero | null)[]
  bannedHeroes: (Hero | null)[]
}

export function DraftBoard({
  enemyTeam,
  yourTeam,
  bannedHeroes,
}: DraftBoardProps) {
  void enemyTeam
  void yourTeam
  void bannedHeroes

  return (
    <div className="grid gap-8 lg:grid-cols-[180px_1fr_180px]">
      {/* Enemy Picks */}
      <div>Enemy Picks</div>

      {/* Center */}
      <div className="space-y-6">
        <div>Bans</div>

        <div>Hero Picker</div>
      </div>

      {/* Your Picks */}
      <div>Your Picks</div>
    </div>
  )
}
