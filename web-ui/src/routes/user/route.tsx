import React from "react";
import { FoodWasteContextProvider, useFoodWasteData } from "./hooks";
import { DataTable } from "@/components/custom/data-table";
import { columns } from "./columns";
import { FoodWasteForm } from "./food-waste-form";
import { createFoodWaste } from "@/utils/api";
import { toast } from "sonner";

export const UserHome: React.FC = () => {
  return (
    <FoodWasteContextProvider>
      <FoodWasteTable />
    </FoodWasteContextProvider>
  );
};

const FoodWasteTable = () => {
  const { data, setData } = useFoodWasteData();

  if (!data) return <>no data</>;

  return (
    <div className="p-6 gap-6 grid grid-cols-3">
      <div className="flex justify-center">
        <FoodWasteForm
          handleSubmit={async (f) => {
            const foodWaste = await createFoodWaste(f);

            if (foodWaste) {
              toast("Food Waste entry created & saved.");
              setData?.((data) => {
                return [foodWaste, ...(data || [])];
              });
            }
          }}
          className="max-w-100 w-full"
        />
      </div>
      <div className="col-span-2">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};
