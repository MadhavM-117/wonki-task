import { FoodWasteEntry } from "@/models";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/custom/data-table/column-header";

export const columns: ColumnDef<FoodWasteEntry>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
  },
  {
    accessorKey: "item_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Name" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "surplus_weight_kg",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Surplus Weight (kg)" />
    ),
  },
  {
    accessorKey: "bbe_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Best Before" />
    ),
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
  },
];
