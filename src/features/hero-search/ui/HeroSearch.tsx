interface HeroSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function HeroSearch({
  value,
  onChange,
}: HeroSearchProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search heroes..."
        autoComplete="off"
        spellCheck={false}
        className="
          h-11
          w-full
          border
          border-zinc-800
          bg-zinc-900
          px-4
          text-sm
          text-zinc-100
          outline-none
          transition-colors
          placeholder:text-zinc-500
          focus:border-blue-500
        "
      />
    </div>
  );
}