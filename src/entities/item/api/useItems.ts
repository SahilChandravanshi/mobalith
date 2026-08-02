import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/api/queryKeys";

import { itemRepository } from "../repository/itemRepository";

export function useItems() {
  const query = useQuery({
    queryKey: queryKeys.items,
    queryFn: () => itemRepository.getItems(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const items = useMemo(
    () =>
      [...(query.data ?? [])].sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    [query.data]
  );

  return {
    items,
    loading: query.isPending,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}