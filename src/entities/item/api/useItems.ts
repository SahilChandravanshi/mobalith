import { useEffect, useMemo, useState } from "react";

import type { Item } from "../model/item";
import { itemService } from "./itemService";


export function useItems() {

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);


  useEffect(() => {

    let mounted = true;


    async function loadItems() {

      try {

        setLoading(true);


        const data =
          await itemService.getItems();


        if (!mounted) return;


        setItems(data);
        setError(null);


      } catch (err) {

        if (!mounted) return;


        setError(
          err instanceof Error
            ? err.message
            : "Failed to load items."
        );


      } finally {

        if (mounted) {
          setLoading(false);
        }

      }
    }


    loadItems();


    return () => {
      mounted = false;
    };

  }, []);



  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          a.name.localeCompare(b.name)
      ),
    [items]
  );


  return {
    items: sortedItems,
    loading,
    error,
  };
}