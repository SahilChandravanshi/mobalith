import { useMemo, useState } from "react";

import type { Hero } from "@/entities/hero/model/hero";
import { useHeroes } from "@/entities/hero/api/useHeroes";

import { Input } from "@/shared/ui/Input";
import { Card } from "@/shared/ui/Card";

interface HeroPickerProps {
  onSelect(hero: Hero): void;
}

export function HeroPicker({
  onSelect,
}: HeroPickerProps) {
  const { heroes, loading, error } =
    useHeroes();

  const [search, setSearch] =
    useState("");

  const filteredHeroes = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return heroes;
    }

    return heroes.filter(
      (hero) =>
        hero.name
          .toLowerCase()
          .includes(query) ||
        hero.title
          .toLowerCase()
          .includes(query)
    );
  }, [heroes, search]);

  if (loading) {
    return (
      <Card>
        <p className="text-muted">
          Loading heroes...
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p className="text-danger">
          {error}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">

      <Input
        icon="search"
        placeholder="Search heroes..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {filteredHeroes.map((hero) => (
          <button
            key={hero.id}
            type="button"
            onClick={() =>
              onSelect(hero)
            }
            className="
              card
              text-left
              transition-all
              hover:-translate-y-0.5
              hover:border-brand/30
            "
          >
            <div className="flex items-center gap-4">

              <img
                src={hero.images.square}
                alt={hero.name}
                className="
                  angular-frame
                  h-16
                  w-16
                  border
                  border-ink/10
                  object-cover
                "
              />

              <div className="min-w-0 flex-1">

                <h3 className="truncate font-semibold">
                  {hero.name}
                </h3>

                <p className="truncate text-sm text-muted">
                  {hero.title}
                </p>

                <div className="mt-2 flex flex-wrap gap-1">

                  {hero.roles.map((role) => (
                    <span
                      key={role}
                      className="
                        angular-frame
                        border
                        border-brand/20
                        bg-brand/10
                        px-2
                        py-0.5
                        text-[10px]
                        font-semibold
                        uppercase
                        text-brand
                      "
                    >
                      {role}
                    </span>
                  ))}

                </div>

              </div>

            </div>
          </button>
        ))}

      </div>

    </div>
  );
}