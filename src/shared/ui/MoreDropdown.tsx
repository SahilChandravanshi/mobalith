import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import { featureRoutes, navigationSections } from '@/shared/config/navigation'

export function MoreDropdown({
  onHover,
  buttonRef,
}: {
  onHover?: (hovered: boolean) => void
  buttonRef?: React.Ref<HTMLButtonElement>
}) {
  const [open, setOpen] = useState(false)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  const [indicator, setIndicator] = useState({
    top: 0,
    left: 0,
    height: 0,
    opacity: 0,
  })

  const hiddenRoutes = ['heroes', 'draft-assistant', 'meta-pulse']

  useEffect(() => {
    if (!hoveredPath) {
      setIndicator((current) => ({
        ...current,
        opacity: 0,
      }))
      return
    }

    const item = itemRefs.current[hoveredPath]
    const container = dropdownRef.current

    if (!item || !container) return

    const itemRect = item.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    setIndicator({
      top: itemRect.top - containerRect.top,
      left: itemRect.left - containerRect.left,
      height: itemRect.height,
      opacity: 1,
    })
  }, [hoveredPath])

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setOpen(true)
        onHover?.(true)
      }}
      onMouseLeave={() => {
        setOpen(false)
        setHoveredPath(null)
        onHover?.(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
          open ? 'text-ink' : 'text-muted hover:text-ink'
        }`}
      >
        More
      </button>

      {open && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 pt-1">
          <div
            ref={dropdownRef}
            className="angular-frame relative w-[340px] border border-ink/10 bg-surface p-5 shadow-float"
          >
            {/* Shared sliding hover indicator */}
            <motion.span
              className="pointer-events-none absolute w-0.5 bg-brand"
              animate={{
                top: indicator.top,
                left: indicator.left,
                height: indicator.height,
                opacity: indicator.opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 15,
                mass: 0.7,
              }}
            />

            {navigationSections
              .filter((section) => !['Heroes'].includes(section))
              .map((section) => {
                const routes = featureRoutes.filter(
                  (route) =>
                    route.section === section &&
                    route.nav !== false &&
                    !hiddenRoutes.includes(route.path),
                )

                if (!routes.length) return null

                return (
                  <div key={section} className="mb-6 last:mb-0">
                    <p className="mb-3 border-b border-ink/10 pb-2 text-[11px] font-black uppercase tracking-[0.22em] text-brand">
                      {section}
                    </p>

                    <div className="space-y-1">
                      {routes.map(({ path, title, icon: Icon }) => (
                        <NavLink
                          key={path}
                          to={path}
                          ref={(element) => {
                            itemRefs.current[path] = element
                          }}
                          onMouseEnter={() => setHoveredPath(path)}
                          className="relative angular-frame flex items-center gap-3 px-3 py-2.5 transition-colors duration-150 hover:bg-brand/8 hover:text-white"
                        >
                          <Icon size={18} strokeWidth={2} />

                          {title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}
