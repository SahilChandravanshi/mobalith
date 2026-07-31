import HeroCard from "@/entities/hero/ui/HeroCard";
import { useHeroes } from "@/entities/hero/api/useHeroes";

export default function HeroGrid() {
  const { heroes, loading, error } = useHeroes();

  if (loading) {
    return (
      <div className="py-16 text-center text-zinc-400">
        Loading heroes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (heroes.length === 0) {
    return (
      <div className="py-16 text-center text-zinc-500">
        No heroes found.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {heroes.map((hero) => (
        <HeroCard
          key={hero.id}
          hero={hero}
        />
      ))}
    </section>
  );
}