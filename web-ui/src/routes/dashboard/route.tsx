import {
  CategoryDaysRemainingChart,
  CategoryWeightedDaysRemainingChart,
  TotalCategorySurplusChart,
} from "./charts";
import { useFoodWasteData } from "./hooks";

export const Dashboard: React.FC = () => {
  const data = useFoodWasteData();

  if (!data) return <>no data</>;

  return (
    <>
      <div className="grid grid-cols-3 p-6 gap-6">
        <TotalCategorySurplusChart data={data} />
        <CategoryDaysRemainingChart data={data} />
        <CategoryWeightedDaysRemainingChart data={data} />
      </div>
    </>
  );
};
