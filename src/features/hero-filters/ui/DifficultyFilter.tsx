import type { Difficulty } from "@/entities/hero/model/hero";

const DIFFICULTIES: Difficulty[] = [
  "Easy",
  "Medium",
  "Hard",
];

interface DifficultyFilterProps {
  selected: Difficulty | null;
  onChange: (difficulty: Difficulty | null) => void;
}

export function DifficultyFilter({
  selected,
  onChange,
}: DifficultyFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={
          selected === null
            ? "filter-active"
            : "filter"
        }
      >
        All
      </button>

      {DIFFICULTIES.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => onChange(difficulty)}
          className={
            selected === difficulty
              ? "filter-active"
              : "filter"
          }
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
}