import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import {
  Activity,
  Crosshair,
  Ellipsis,
  Moon,
  Search,
  Shield,
  Sun,
} from 'lucide-react'

import { NavLink, Outlet } from 'react-router-dom'

import { MoreDropdown } from '@/shared/ui/MoreDropdown'

import { featureRoutes } from '@/shared/config/navigation'

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

  const gameDataRoutes = featureRoutes.filter((route) =>
    ['items', 'emblems', 'battle-spells', 'patch-notes'].includes(route.path),
  )

  const utilityRoutes = featureRoutes.filter((route) =>
    ['compare-heroes', 'mobalith-intelligence', 'labs', 'builds'].includes(
      route.path,
    ),
  )

  const [toolsOpen, setToolsOpen] = useState(false)

  useEffect(() => {
    if (!toolsOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [toolsOpen])

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

                <span className="text-lg font-black tracking-tight">
                  Mobalith
                </span>
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
      {/* MOBILE NAVIGATION + MORE SHEET */}
      <div className="fixed inset-0 z-50 pointer-events-none lg:hidden">
        <AnimatePresence>
          {toolsOpen && (
            <>
              {/* Backdrop */}
              <motion.button
                type="button"
                aria-label="Close More menu"
                className="pointer-events-auto absolute inset-0 bg-black/45"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setToolsOpen(false)}
              />

              {/* More Sheet */}
              <motion.div
                className="pointer-events-auto absolute inset-x-0 bottom-0 z-40 angular-frame border-x border-t border-ink/10 bg-surface px-5 pt-3 pb-[82px] shadow-none"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{
                  duration: 0.22,
                  ease: 'easeOut',
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 60 || info.velocity.y > 400) {
                    setToolsOpen(false)
                  }
                }}
              >
                {/* Drag handle */}
                <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-white/20" />

                <h3 className="mb-3 text-center text-base font-black">More</h3>

                <div className="space-y-4">
                  {/* Strategy */}
                  <section>
                    <p className="mb-3 border-b border-ink/10 pb-1 text-[9px] font-black uppercase tracking-[0.2em] text-brand">
                      Strategy
                    </p>

                    <div className="grid grid-cols-3 gap-1">
                      {featureRoutes
                        .filter(
                          (route) =>
                            route.section === 'Strategy' &&
                            route.path !== 'draft-assistant' &&
                            route.nav !== false,
                        )
                        .map(({ path, title, icon: Icon }) => (
                          <NavLink
                            key={path}
                            to={path}
                            onClick={() => setToolsOpen(false)}
                           className="angular-frame flex flex-col items-center gap-1 px-2 py-1.5 text-[0.625rem] font-semibold text-center transition-colors hover:bg-brand/8"
                          >
                            <Icon size={17} strokeWidth={2} />

                            <span className="text-[0.625rem] font-semibold leading-tight">
                              {title.replace(' Assistant', '')}
                            </span>
                          </NavLink>
                        ))}
                    </div>
                  </section>

                  {/* GAME DATA */}
                  <section>
                    <p className="mb-3 border-b border-ink/10 pb-1 text-[9px] font-black uppercase tracking-[0.2em] text-brand">
                      Game Data
                    </p>

                    <div className="grid grid-cols-4 gap-1">
                      {gameDataRoutes.map(({ path, title, icon: Icon }) => (
                        <NavLink
                          key={path}
                          to={`/${path}`}
                          onClick={() => setToolsOpen(false)}
                          className="angular-frame flex h-12 flex-col items-center justify-center gap-0.5 px-1 text-center transition-colors hover:bg-brand/8"
                        >
                          <Icon size={17} strokeWidth={2} />

                          <span className="text-[0.625rem] font-semibold leading-tight">
                            {title}
                          </span>
                        </NavLink>
                      ))}
                    </div>
                  </section>

                  {/* UTILITIES */}
                  <section>
                    <p className="mb-3 border-b border-ink/10 pb-1 text-[9px] font-black uppercase tracking-[0.2em] text-brand">
                      Utilities
                    </p>

                    <div className="grid grid-cols-4 gap-1 pb-2">
                      {utilityRoutes.map(({ path, title, icon: Icon }) => (
                        <NavLink
                          key={path}
                          to={`/${path}`}
                          onClick={() => setToolsOpen(false)}
                          className="angular-frame flex h-12 flex-col items-center justify-center gap-0.5 px-1 text-center transition-colors hover:bg-brand/8"
                        >
                          <Icon size={17} strokeWidth={2} />

                          <span className="text-[0.625rem] font-semibold leading-tight">
                            {title}
                          </span>
                        </NavLink>
                      ))}
                    </div>
                  </section>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <nav
          aria-label="Mobile navigation"
          className="pointer-events-auto absolute inset-x-0 bottom-0 z-50 flex items-end justify-around border-t border-ink/10 bg-surface/95 px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-xl"
        >
          {/* Heroes */}
          <NavLink
            to="/heroes"
            className={mobileLinkClass}
            onClick={() => setToolsOpen(false)}
          >
            <Shield size={17} strokeWidth={2} />
            <span>Heroes</span>
          </NavLink>

          {/* Draft */}
          <NavLink
            to="/draft-assistant"
            className={mobileLinkClass}
            onClick={() => setToolsOpen(false)}
          >
            <Crosshair size={17} strokeWidth={2} />
            <span>Draft</span>
          </NavLink>

          {/* Mobalith */}
          <NavLink
            to="/"
            end
            className="flex -mt-5 flex-col items-center gap-1 text-brand"
            onClick={() => setToolsOpen(false)}
          >
            <span className="angular-frame grid h-14 w-14 place-items-center bg-gradient-to-br from-brand to-cyan text-xl font-black text-white shadow-glow ring-2 ring-brand/20">
              M
            </span>
          </NavLink>

          {/* Meta */}
          <NavLink
            to="/meta-pulse"
            className={mobileLinkClass}
            onClick={() => setToolsOpen(false)}
          >
            <Activity size={17} strokeWidth={2} />
            <span>Meta</span>
          </NavLink>

          {/* More */}
          <button
            type="button"
            aria-label="Open More menu"
            aria-expanded={toolsOpen}
            className={mobileLinkClass({
              isActive: toolsOpen,
            })}
            onClick={() => setToolsOpen((prev) => !prev)}
          >
            <Ellipsis size={19} strokeWidth={2.5} />

            <span>More</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
