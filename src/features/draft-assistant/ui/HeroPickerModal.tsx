import { useMemo, useState } from "react";

import type { Hero } from "@/entities/hero";

import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Overlay";

interface HeroPickerModalProps {
  open: boolean;
  heroes: Hero[];
  pickedHeroes: (Hero | null)[];
  onClose: () => void;
  onSelect: (hero: Hero) => void;
}

export function HeroPickerModal({
  open,
  heroes,
  pickedHeroes,
  onClose,
  onSelect,
}: HeroPickerModalProps) {
  const [search, setSearch] = useState("");

  const filteredHeroes = useMemo(() => {
    const query = search.trim().toLowerCase();

    const pickedIds = new Set(
      pickedHeroes
        .filter(
          (hero): hero is Hero => hero !== null,
        )
        .map((hero) => hero.id),
    );

    return heroes.filter((hero) => {
      if (pickedIds.has(hero.id)) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        hero.name
          .toLowerCase()
          .includes(query) ||
        hero.title
          .toLowerCase()
          .includes(query)
      );
    });
  }, [heroes, pickedHeroes, search]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Select Hero"
    >
      <div className="space-y-4">
        <Input
          icon="search"
          placeholder="Search hero..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="grid max-h-[420px] grid-cols-3 gap-3 overflow-y-auto sm:grid-cols-4">
          {filteredHeroes.map((hero) => (
            <button
              key={hero.id}
              type="button"
              onClick={() => {
                onSelect(hero);
                onClose();
              }}
              className="
                angular-frame
                overflow-hidden
                border
                border-ink/10
                bg-inset
                transition-colors
                hover:border-brand/40
              "
            >
              <img
                src={hero.images.square}
                alt={hero.name}
                className="aspect-square w-full object-cover"
              />

              <div className="p-2">
                <p className="truncate text-xs font-semibold">
                  {hero.name}
                </p>
              </div>
            </button>
          ))}

          {filteredHeroes.length === 0 && (
            <div className="col-span-full py-8 text-center text-sm text-muted">
              No heroes found.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}