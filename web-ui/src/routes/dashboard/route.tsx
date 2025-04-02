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
import { SetStateAction, useState } from "react";
import { FoodWasteFilter } from "@/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Dashboard: React.FC = () => {
  const [filter, setFilterData] = useState<FoodWasteFilter>({});
  const data = useFoodWasteData(filter);

  if (!data) return <>no data</>;

  return (
    <>
      <div className="grid grid-cols-4 p-6 gap-6">
        <FoodWasteFiltering filter={filter} setFilter={setFilterData} />
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

interface FoodWasteFilteringProps extends FoodWasteFilter {
  filter: FoodWasteFilter;
  setFilter: React.Dispatch<SetStateAction<FoodWasteFilter>>;
}

export const FoodWasteFiltering: React.FC<FoodWasteFilteringProps> = ({
  setFilter,
}) => {
  return (
    <Card className="col-span-2 col-start-3 flex justify-between">
      <CardHeader>
        <CardTitle className="text-center">Filter Data</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-around">
        <div className="grid gap-3">
          <Label htmlFor="category_id">Category</Label>
          <Select
            name="category_id"
            required
            onValueChange={(c) => setFilter((f) => ({ ...f, category_id: c }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Food Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Fruit</SelectItem>
              <SelectItem value="2">Dairy</SelectItem>
              <SelectItem value="3">Bakery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="bbe_after">Best Before End - After </Label>
          <Input
            id="bbe_after"
            name="bbe_after"
            type="date"
            placeholder={new Date().toDateString()}
            onChange={(e) =>
              setFilter((f) => ({ ...f, bbe_after: e.target.value }))
            }
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="bbe_after">Best Before End - Before</Label>
          <Input
            id="bbe_after"
            name="bbe_after"
            type="date"
            placeholder={new Date().toDateString()}
            onChange={(e) =>
              setFilter((f) => ({ ...f, bbe_before: e.target.value }))
            }
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};
