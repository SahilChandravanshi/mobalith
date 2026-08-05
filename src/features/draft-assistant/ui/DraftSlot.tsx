import type { Hero } from '@/entities/hero'

interface DraftSlotProps {
  hero: Hero | null
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function DraftSlot({
  hero,
  active = false,
  disabled = false,
  onClick,
}: DraftSlotProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`group relative w-full h-[150px] overflow-hidden angular-frame border transition-all duration-200
        ${
          active
            ? 'border-yellow-400 shadow-[0_0_22px_rgba(255,205,60,.45)] scale-[1.04]'
            : 'border-ink/10 hover:border-brand/40'
        }

        ${disabled ? 'opacity-60' : ''}

        bg-elevated
      `}
    >
      {hero ? (
        <>
          <img
            src={hero.images.square}
            alt={hero.name}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />

          <span className="absolute right-2 top-2 rounded-md bg-brand px-2 py-1 text-[11px] font-black text-white">
            {hero.tier}
          </span>

          <div className="absolute bottom-0 left-0 right-0 p-2">
            <p className="truncate text-sm font-bold tracking-wide text-white">{hero.name}</p>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="text-7xl font-thin text-white/20 transition-colors group-hover:text-brand">
            +
          </span>
        </div>
      )}
    </button>
  )
}
