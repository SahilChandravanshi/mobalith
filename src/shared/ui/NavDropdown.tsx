import { ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

interface Item {
  path: string
  title: string
  icon: LucideIcon
}

interface NavDropdownProps {
  title: string
  items: Item[]
}

export function NavDropdown({
  title,
  items,
}: NavDropdownProps) {
  const [open, setOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClick)

    return () =>
      window.removeEventListener(
        'mousedown',
        handleClick,
      )
  }, [])

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        {title}

        <ChevronDown
          size={16}
          className={`transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="angular-frame absolute left-0 top-full z-50 mt-2 w-64 border border-ink/10 bg-surface p-2 shadow-float">
          {items.map(
            ({
              path,
              title,
              icon: Icon,
            }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 transition-colors ${
                    isActive
                      ? 'bg-brand/10 text-brand'
                      : 'hover:bg-elevated'
                  }`
                }
              >
                <Icon size={17} />

                {title}
              </NavLink>
            ),
          )}
        </div>
      )}
    </div>
  )
}