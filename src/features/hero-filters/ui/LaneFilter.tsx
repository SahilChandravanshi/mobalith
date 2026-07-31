import type { Lane } from "@/entities/hero/model/hero";

const LANES: Lane[] = [
  "EXP",
  "Gold",
  "Mid",
  "Jungle",
  "Roam",
];

interface LaneFilterProps {
  selected: Lane | null;
  onChange: (lane: Lane | null) => void;
}

export function LaneFilter({
  selected,
  onChange,
}: LaneFilterProps) {
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

      {LANES.map((lane) => (
        <button
          key={lane}
          onClick={() => onChange(lane)}
          className={
            selected === lane
              ? "filter-active"
              : "filter"
          }
        >
          {lane}
        </button>
      ))}
    </div>
  );
}