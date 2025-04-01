export interface FoodWasteEntry {
  id: number;
  owner: string;
  category: string;
  item_name: string;
  surplus_weight_kg: number;
  bbe_date: string;
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
