import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { featureRoutes, navigationSections } from '@/shared/config/navigation'

export function MoreDropdown() {
  const [open, setOpen] = useState(false)

  const hiddenRoutes = ['heroes', 'draft-assistant', 'meta-pulse']

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="angular-frame flex items-center gap-2 border px-3 py-2 text-sm font-medium transition-colors hover:border-brand/20 hover:bg-elevated">
        More
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="angular-frame absolute right-0 mt-3 w-[340px] border border-ink/10 bg-surface p-5 shadow-float">
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
                        className="angular-frame flex items-center gap-3 rounded-none px-3 py-2.5 transition-all duration-150 hover:translate-x-1 hover:bg-brand/8 hover:text-white"
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
      )}
    </div>
  )
}
