import { fetchJson } from "@/shared/api/fetchJson";

import type { Item } from "../model/item";

const ITEMS_URL = `${import.meta.env.BASE_URL}data/items.json`;

class ItemService {
  async getItems(): Promise<Item[]> {
    return fetchJson<Item[]>(ITEMS_URL);
  }
}

export const itemService = new ItemService();