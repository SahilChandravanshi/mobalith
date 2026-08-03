import { useEffect, useState } from "react";

import type { Hero } from "../model/hero";
import { heroDetailsRepository } from "../repository/heroDetailsRepository";

export function useHeroDetails(slug?: string) {
  const [hero, setHero] = useState<Hero>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug === undefined) {
      setHero(undefined);
      setLoading(false);
      return;
    }

    let mounted = true;

    async function loadHero(currentSlug: string) {
      try {
        setLoading(true);

        const data = await heroDetailsRepository.getHero(currentSlug);

        if (!mounted) {
          return;
        }

        setHero(data);
        setError(null);
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load hero."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadHero(slug);

    return () => {
      mounted = false;
    };
  }, [slug]);

  return {
    hero,
    loading,
    error,
  };
}