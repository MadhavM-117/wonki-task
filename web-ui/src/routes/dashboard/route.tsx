import { DataTable } from "@/components/custom/data-table";
import {
  CategoryDaysRemainingChart,
  CategoryWasteOverTimeChart,
  CategoryWeightedDaysRemainingChart,
  CumulativeWasteOverTimeChart,
  TotalCategorySurplusChart,
} from "./charts";
import { useFoodWasteData } from "./hooks";
import { columns } from "./columns";

export const Dashboard: React.FC = () => {
  const data = useFoodWasteData();

  if (!data) return <>no data</>;

  return (
    <>
      <div className="grid grid-cols-4 p-6 gap-6">
        <TotalCategorySurplusChart data={data} />
        <CategoryDaysRemainingChart data={data} />
        <CategoryWeightedDaysRemainingChart data={data} />
        <CategoryWasteOverTimeChart data={data} />
        <CumulativeWasteOverTimeChart data={data} />
        <div className="col-span-3">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};
