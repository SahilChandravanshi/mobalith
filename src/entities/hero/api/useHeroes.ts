import { useEffect, useMemo, useState } from "react";
import { heroService } from "./heroService";
import type { Hero } from "../model/hero";

export function useHeroes() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadHeroes() {
      try {
        setLoading(true);
        const data = await heroService.getHeroes();

        if (!mounted) return;

        setHeroes(data);
        setError(null);
      } catch (err) {
        if (!mounted) return;

        setError(
          err instanceof Error ? err.message : "Failed to load heroes."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadHeroes();

    return () => {
      mounted = false;
    };
  }, []);

  const sortedHeroes = useMemo(
    () => [...heroes].sort((a, b) => a.name.localeCompare(b.name)),
    [heroes]
  );

  return {
    heroes: sortedHeroes,
    loading,
    error,
  };
}