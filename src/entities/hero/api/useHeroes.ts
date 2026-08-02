import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/api/queryKeys";

import { heroRepository } from "../repository/heroRepository";

export function useHeroes() {
  const query = useQuery({
    queryKey: queryKeys.heroes,
    queryFn: () => heroRepository.getHeroes(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const heroes = useMemo(
    () =>
      [...(query.data ?? [])].sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    [query.data]
  );

  return {
    heroes,
    loading: query.isPending,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}