import type { Item } from "../model/item";


const ITEMS_URL = "/data/items.json";


class ItemService {

  async getItems(): Promise<Item[]> {

    const response = await fetch(ITEMS_URL);


    if (!response.ok) {
      throw new Error(
        "Failed to fetch items data."
      );
    }


    const data = await response.json();


    return data as Item[];
  }

}


export const itemService = new ItemService();