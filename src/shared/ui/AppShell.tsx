import { Menu, Moon, Search, Sun } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import {
  featureRoutes,
  navigationSections,
} from "@/shared/config/navigation";

import { useTheme } from "@/shared/model/useTheme";
import { Drawer } from "@/shared/ui/Overlay";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `angular-frame flex items-center gap-3 border px-3 py-2 text-sm font-medium transition-colors duration-150 ease-out ${
    isActive
      ? "border-brand/20 bg-brand/15 text-brand"
      : "border-transparent text-muted hover:border-ink/10 hover:bg-elevated hover:text-ink"
  }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `angular-frame flex flex-col items-center gap-1 px-2 py-1.5 text-[0.625rem] font-semibold ${
    isActive ? "text-brand" : "text-muted"
  }`;

export function AppShell() {
  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = theme !== "light";

  const primaryRoutes = featureRoutes.filter((route) =>
    ["heroes", "draft-assistant", "meta-pulse"].includes(route.path)
  );

  return (
    <div className="app-canvas min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-canvas/85 px-4 py-3 backdrop-blur-xl lg:px-8">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 font-semibold tracking-tight"
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
              <NavLink
                key={path}
                className={linkClass}
                to={path}
              >
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
              onClick={() =>
                setTheme(isDark ? "light" : "dark")
              }
            >
              {isDark ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              aria-label="Open navigation menu"
              className="icon-button lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[90rem] lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-ink/10 px-4 py-6 lg:block">
          <nav
            aria-label="Module navigation"
            className="space-y-5"
          >
            <NavLink
              to="/"
              end
              className={linkClass}
            >
              Dashboard
            </NavLink>

            {navigationSections.map((section) => (
              <div key={section}>
                <p className="mb-1 px-3 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                  {section}
                </p>

                <div className="space-y-0.5">
                  {featureRoutes
                    .filter(
                      (route) =>
                        route.section === section &&
                        route.nav !== false
                    )
                    .map(
                      ({
                        path,
                        title,
                        icon: Icon,
                      }) => (
                        <NavLink
                          key={path}
                          to={path}
                          className={linkClass}
                        >
                          <Icon
                            size={17}
                            strokeWidth={1.8}
                          />

                          {title}
                        </NavLink>
                      )
                    )}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 px-4 py-7 pb-12 sm:px-6 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-ink/10 bg-surface/95 px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
      >
        <NavLink
          to="/"
          end
          className={mobileLinkClass}
        >
          Home
        </NavLink>

        {primaryRoutes.map(
          ({ path, title, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={mobileLinkClass}
            >
              <Icon size={17} />

              {title.replace(" Assistant", "")}
            </NavLink>
          )
        )}
      </nav>

      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Navigate"
      >
        <nav className="space-y-1">
          {featureRoutes
            .filter((route) => route.nav !== false)
            .map(
              ({ path, title, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={linkClass}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  <Icon size={17} />

                  {title}
                </NavLink>
              )
            )}
        </nav>

        <button
          className="angular-frame mt-6 flex w-full items-center justify-between border border-ink/10 px-3 py-2 text-sm font-medium"
          onClick={() =>
            setTheme(isDark ? "light" : "dark")
          }
        >
          {isDark
            ? "Use light theme"
            : "Use dark theme"}

          {isDark ? (
            <Sun size={17} />
          ) : (
            <Moon size={17} />
          )}
        </button>
      </Drawer>
    </div>
  );
}