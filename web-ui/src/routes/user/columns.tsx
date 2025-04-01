import { FoodWasteEntry } from "@/models";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FoodWasteEntry>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "item_name",
    header: "Item Name",
  },
  {
    accessorKey: "surplus_weight_kg",
    header: "Surplus Weight (kg)",
  },
  {
    accessorKey: "bbe_date",
    header: "Best Before",
  },
];
