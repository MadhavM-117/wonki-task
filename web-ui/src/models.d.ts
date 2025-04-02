export interface FoodWasteEntry {
  id: number;
  owner: string;
  category: string;
  item_name: string;
  surplus_weight_kg: number;
  bbe_date: string;
}

export interface FoodWasteFilter {
  category_id?: string;
  bbe_after?: string;
  bbe_before?: string;
  owner_id?: string;
  order_by?: "bbe" | "-bbe" | "surplus_weight" | "-surplus_weight";
}

export interface Category {
  id: number;
  name: string;
}

export interface UserDetails {
  id: number;
  full_name: string;
  username: string;
}
