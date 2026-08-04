import type { Hero } from '@/entities/hero/model/hero'

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
      className={`
      group
      relative
      aspect-square
      overflow-hidden
      angular-frame
      border-2
      bg-inset
      transition-all
      duration-200

      ${
        active
          ? 'border-brand scale-105 shadow-[0_0_20px_rgba(59,130,246,.45)]'
          : 'border-ink/10 hover:border-brand/40 hover:scale-[1.03]'
      }

      ${disabled ? 'cursor-not-allowed opacity-60' : ''}
    `}
    >
      {hero ? (
        <>
          <img
            src={hero.images.square}
            alt={hero.name}
            className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-110
          "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-1">
            <p className="truncate text-[10px] font-bold text-white">
              {hero.name}
            </p>
          </div>

          {active && <div className="absolute inset-0 border-2 border-brand" />}
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="text-4xl font-light text-muted transition-colors group-hover:text-brand">
            +
          </span>
        </div>
      )}
    </button>
  )
}
