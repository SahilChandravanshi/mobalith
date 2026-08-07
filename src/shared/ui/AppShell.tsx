import { useState } from 'react'
import { Moon, Search, Sun } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

import { MoreDropdown } from '@/shared/ui/MoreDropdown'

import { featureRoutes, navigationSections } from '@/shared/config/navigation'

import { useTheme } from '@/shared/model/useTheme'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `angular-frame flex items-center gap-3 border px-4 py-2.5 text-sm font-medium transition-colors duration-150 ease-out ${
    isActive
      ? 'border-brand/20 bg-brand/15 text-brand'
      : 'border-transparent text-muted hover:border-ink/10 hover:bg-brand/8 hover:text-ink'
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `angular-frame flex flex-col items-center gap-1 px-2 py-1.5 text-[0.625rem] font-semibold ${
    isActive ? 'text-brand' : 'text-muted'
  }`

export function AppShell() {
  const { theme, setTheme } = useTheme()

  const isDark = theme !== 'light'

  const primaryRoutes = featureRoutes.filter((route) =>
    ['heroes', 'draft-assistant', 'meta-pulse'].includes(route.path),
  )

  const toolRoutes = featureRoutes.filter(
    (r) => r.section === 'Tools' && r.nav !== false,
  )

  const [toolsOpen, setToolsOpen] = useState(false)

  return (
    <div className="app-canvas min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-canvas/85 px-4 py-3 backdrop-blur-xl lg:px-8">
        <div className="mx-auto flex max-w-[96rem] items-center justify-between">
          {/* Spacer */}
          <div className="hidden w-20 lg:block" />

          {/* CENTER NAVIGATION */}

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-2">
              <NavLink to="/heroes" className={linkClass}>
                Heroes
              </NavLink>

              <NavLink to="/draft-assistant" className={linkClass}>
                Draft
              </NavLink>

              <NavLink
                to="/"
                className="mx-6 flex items-center gap-3 font-semibold tracking-tight"
              >
                <span className="angular-frame grid size-9 place-items-center bg-gradient-to-br from-brand to-cyan font-black text-white shadow-glow">
                  M
                </span>

                <span className="text-lg font-black tracking-tight">Mobalith</span>
              </NavLink>

              <NavLink to="/meta-pulse" className={linkClass}>
                Meta
              </NavLink>

              <MoreDropdown />
            </div>
          </div>

          {/* MOBILE LOGO */}

          <NavLink
            to="/"
            className="flex items-center gap-2 font-semibold tracking-tight lg:hidden"
          >
            <span className="angular-frame grid size-8 place-items-center bg-gradient-to-br from-brand to-cyan font-black text-white shadow-glow">
              M
            </span>

            <span>Mobalith</span>
          </NavLink>

          {/* MOBILE LOGO */}
          <NavLink
            to="/"
            className="flex items-center gap-2 font-semibold tracking-tight lg:hidden"
          >
            <span className="angular-frame grid size-8 place-items-center bg-gradient-to-br from-brand to-cyan font-black text-white shadow-glow">
              M
            </span>

            <span>Mobalith</span>
          </NavLink>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/heroes"
              className="angular-frame icon-button"
              aria-label="Search heroes"
            >
              <Search size={18} />
            </NavLink>

            <button
              className="angular-frame icon-button"
              aria-label="Toggle theme"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[96rem]">
        <main className="min-w-0 px-4 py-6 pb-12 sm:px-6 lg:px-8 xl:px-10">
          <Outlet />
        </main>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-ink/10 bg-surface/95 px-2 py-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
      >
        <NavLink to="/heroes" className={mobileLinkClass}>
          Heroes
        </NavLink>

        <NavLink to="/draft-assistant" className={mobileLinkClass}>
          Draft
        </NavLink>

        <NavLink to="/" end className="flex -mt-5 flex-col items-center gap-1">
          <span className="angular-frame grid h-14 w-14 place-items-center bg-gradient-to-br from-brand to-cyan text-xl font-black text-white shadow-glow ring-2 ring-brand/20">
            M
          </span>
        </NavLink>

        <NavLink to="/meta-pulse" className={mobileLinkClass}>
          Meta
        </NavLink>

        <button
          type="button"
          onClick={() => setToolsOpen(true)}
          className="flex flex-col items-center justify-center gap-1 text-[0.625rem] font-semibold text-muted"
        >
          Tools
          <span className="text-xs">▲</span>
        </button>
      </nav>
      {toolsOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setToolsOpen(false)}
          />

          <div className="fixed inset-x-0 bottom-0 z-40 rounded-t-[28px] border-t border-ink/10 bg-surface px-6 pt-5 pb-8 shadow-2xl lg:hidden">
            <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-white/20" />

            <h3 className="mb-6 text-center text-lg font-bold">More</h3>

            {navigationSections
              .filter((section) => !['Heroes'].includes(section))
              .map((section) => {
                const routes = featureRoutes.filter(
                  (route) =>
                    route.section === section &&
                    route.nav !== false &&
                    !['heroes', 'draft-assistant', 'meta-pulse'].includes(
                      route.path,
                    ),
                )

                if (!routes.length) return null

                return (
                  <div key={section} className="mb-6">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-muted">
                      {section}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {routes.map(({ path, title, icon: Icon }) => (
                        <NavLink
                          key={path}
                          to={path}
                          onClick={() => setToolsOpen(false)}
                          className="angular-frame flex items-center gap-3 px-4 py-3.5 transition-all duration-150 hover:scale-[1.02] hover:bg-brand/8"
                        >
                          <Icon size={18} />
                          {title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>
        </>
      )}
    </div>
  )
}
