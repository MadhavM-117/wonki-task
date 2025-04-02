import { FoodWasteEntry } from "@/models";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/custom/data-table/column-header";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFoodWasteData } from "./hooks";
import { deleteFoodWaste } from "@/utils/api";
import { toast } from "sonner";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const foodwaste = row.original;

      return <FoodWasteDelete foodwasteId={foodwaste.id} />;
    },
  },
];

const FoodWasteDelete: React.FC<{ foodwasteId: number }> = ({
  foodwasteId,
}) => {
  const { setData } = useFoodWasteData();

  return (
    <Button
      variant={"outline"}
      onClick={async () => {
        const ok = await deleteFoodWaste(foodwasteId);

        if (ok) {
          setData?.((data) => {
            return data?.filter((d) => d.id !== foodwasteId);
          });

          toast("Deleted Food Waste entry successfully");
        }
      }}
    >
      <Trash className="text-amber-600" />
    </Button>
  );
};
