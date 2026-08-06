import type { Hero } from '@/entities/hero'

interface DraftSlotProps {
  hero: Hero | null
  variant?: 'pick' | 'ban'
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function DraftSlot({
  hero,
  variant = 'pick',
  active = false,
  disabled = false,
  onClick,
}: DraftSlotProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`group relative h-[150px] w-full overflow-hidden angular-frame border bg-elevated transition-all duration-200 ${
        active
          ? 'border-brand ring-2 ring-brand/40 shadow-[0_0_22px_rgba(79,116,255,.35)] scale-[1.03]'
          : 'border-ink/10 hover:-translate-y-1 hover:border-brand/40'
      } ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
    >
      {hero ? (
        <>
          <img
            src={hero.images.square}
            alt={hero.name}
            className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.08] ${
              variant === 'ban' ? 'grayscale brightness-75' : ''
            }`}
          />

          {variant === 'ban' && (
            <>
              <div className="absolute inset-0 bg-red-950/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[70px] font-thin text-red-500/70">
                ×
              </div>
            </>
          )}

          {variant !== 'ban' && (
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          )}

          <span className="absolute right-2 top-2 rounded-md bg-brand/95 px-2 py-1 text-[10px] font-black uppercase text-white shadow-lg">
            {hero.tier}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-2">
            <p className="truncate text-[13px] font-black tracking-wide text-white">
              {hero.name}
            </p>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="text-6xl font-thin text-white/15 transition-all duration-200 group-hover:text-brand/80">
            +
          </span>
        </div>
      )}
    </button>
  )
}
