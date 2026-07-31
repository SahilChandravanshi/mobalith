import type { HeroTier } from "@/entities/hero/model/hero";

const TIERS: HeroTier[] = [
  "S+",
  "S",
  "A",
  "B",
  "C",
];

interface TierFilterProps {
  selected: HeroTier | null;
  onChange: (tier: HeroTier | null) => void;
}

export function TierFilter({
  selected,
  onChange,
}: TierFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={selected === null ? "filter-active" : "filter"}
      >
        All
      </button>

      {TIERS.map((tier) => (
        <button
          key={tier}
          onClick={() => onChange(tier)}
          className={
            selected === tier
              ? "filter-active"
              : "filter"
          }
        >
          {tier}
        </button>
      ))}
    </div>
  );
}