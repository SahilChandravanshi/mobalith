import { itemService } from "../api/itemService";
import type { Item } from "../model/item";

class ItemRepository {
  async getItems(): Promise<Item[]> {
    return itemService.getItems();
  }

  async getItemBySlug(
    slug: string
  ): Promise<Item | undefined> {
    const items = await this.getItems();

    return items.find(
      (item) => item.slug === slug
    );
  }
}

export const itemRepository =
  new ItemRepository();