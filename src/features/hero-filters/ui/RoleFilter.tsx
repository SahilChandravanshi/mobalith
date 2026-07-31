import type { HeroRole } from "@/entities/hero/model/hero";

const ROLES: HeroRole[] = [
  "Tank",
  "Fighter",
  "Assassin",
  "Mage",
  "Marksman",
  "Support",
];

interface RoleFilterProps {
  selected: HeroRole | null;
  onChange: (role: HeroRole | null) => void;
}

export function RoleFilter({
  selected,
  onChange,
}: RoleFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`border px-3 py-2 text-sm transition-colors ${
          selected === null
            ? "border-blue-500 bg-blue-500/10 text-blue-400"
            : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
        }`}
      >
        All
      </button>

      {ROLES.map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onChange(role)}
          className={`border px-3 py-2 text-sm transition-colors ${
            selected === role
              ? "border-blue-500 bg-blue-500/10 text-blue-400"
              : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
          }`}
        >
          {role}
        </button>
      ))}
    </div>
  );
}