import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import { featureRoutes, navigationSections } from '@/shared/config/navigation'

import { useTheme } from '@/shared/model/useTheme'
import { Drawer } from '@/shared/ui/Overlay'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `angular-frame flex items-center gap-3 border px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out ${
    isActive
      ? 'border-brand/20 bg-brand/15 text-brand'
      : 'border-transparent text-muted hover:border-ink/10 hover:bg-elevated hover:text-ink'
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `angular-frame flex flex-col items-center gap-1 px-2 py-1.5 text-[0.625rem] font-semibold ${
    isActive ? 'text-brand' : 'text-muted'
  }`

export function AppShell() {
  const { theme, setTheme } = useTheme()

  const [menuOpen, setMenuOpen] = useState(false)

  const [openSection, setOpenSection] =
    useState<(typeof navigationSections)[number]>('Strategy')

  const isDark = theme !== 'light'

  const primaryRoutes = featureRoutes.filter((route) =>
    ['heroes', 'draft-assistant', 'meta-pulse'].includes(route.path),
  )

  return (
    <div className="app-canvas min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-canvas/85 px-4 py-3 backdrop-blur-xl lg:px-8">
        <div className="mx-auto flex max-w-[96rem] items-center justify-between gap-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="angular-frame grid size-8 place-items-center bg-gradient-to-br from-brand to-cyan font-black text-white shadow-glow">
              M
            </span>

            <span>Mobalith</span>
          </NavLink>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {primaryRoutes.map(({ path, title }) => (
              <NavLink key={path} className={linkClass} to={path}>
                {title}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <NavLink
              aria-label="Search heroes"
              className="icon-button"
              to="/heroes"
            >
              <Search size={18} />
            </NavLink>

            <button
              aria-label="Toggle theme"
              className="icon-button hidden sm:grid"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              aria-label="Open navigation menu"
              className="icon-button"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={19} />
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
        className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-ink/10 bg-surface/95 px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
      >
        <NavLink to="/" end className={mobileLinkClass}>
          Home
        </NavLink>

        {primaryRoutes.map(({ path, title, icon: Icon }) => (
          <NavLink key={path} to={path} className={mobileLinkClass}>
            <Icon size={17} />

            {title.replace(' Assistant', '')}
          </NavLink>
        ))}
      </nav>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="angular-frame grid h-8 w-8 place-items-center bg-gradient-to-br from-brand to-cyan text-base font-black text-white shadow-glow">
              M
            </span>

            <div>
              <p className="text-xl font-bold tracking-tight">Mobalith</p>

              <p className="mt-0.5 text-xs text-muted">
                Master the Meta. Forge Your Victory.
              </p>
            </div>
          </div>

          <button
            className="icon-button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-3 border-b border-ink/10" />

        <div className="min-h-0 flex-1 overflow-y-auto pr-1 thin-scrollbar">
          <nav className="space-y-5">
            {navigationSections.map((section) => (
              <div key={section}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection((prev) =>
                      prev === section ? ('' as never) : section,
                    )
                  }
                  className={`mb-2 flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                    openSection === section ? 'text-brand' : 'text-muted'
                  }`}
                >
                  {section}

                  <span className="text-sm">
                    {openSection === section ? '−' : '+'}
                  </span>
                </button>

                {openSection === section && (
                  <div className="space-y-1">
                    {featureRoutes
                      .filter(
                        (route) =>
                          route.section === section && route.nav !== false,
                      )
                      .map(({ path, title, icon: Icon }) => (
                        <NavLink
                          key={path}
                          to={path}
                          className={({ isActive }) =>
                            `angular-frame flex items-center gap-2 px-3 py-2.5 transition-[background-color,color,transform] duration-150 hover:translate-x-1 ${
                              isActive
                                ? 'border-l-2 border-brand bg-brand/10 text-white'
                                : 'hover:bg-white/5 hover:text-white'
                            }`
                          }
                          onClick={() => setMenuOpen(false)}
                        >
                          <Icon size={18} strokeWidth={2} />
                          {title}
                        </NavLink>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="lg:hidden">
          <button
            className="angular-frame mt-6 flex w-full items-center justify-between bg-elevated px-4 py-3 text-sm font-semibold transition-all hover:bg-white/5"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? 'Use light theme' : 'Use dark theme'}

            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        <div className="mt-3 border-t border-ink/10 pt-3 pb-0">
          <p className="text-center text-sm font-semibold">Mobalith v0.1.0</p>

          <p className="mt-1 text-center text-xs text-muted">
            By Sahil Chandravanshi
          </p>
        </div>
      </Drawer>
    </div>
  )
}
