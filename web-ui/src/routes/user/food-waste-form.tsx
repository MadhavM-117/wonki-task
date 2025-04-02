import { cn } from "@/utils/styling";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface FoodWasteFormProps extends React.ComponentProps<"div"> {
  handleSubmit: (f: FormData) => Promise<void>;
}

export const FoodWasteForm: React.FC<FoodWasteFormProps> = ({
  className,
  handleSubmit,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Record Food Waste</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);

              handleSubmit(formData);
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="item_name">Item Name</Label>
                <Input
                  id="item_name"
                  name="item_name"
                  type="text"
                  placeholder="Milk"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category_id">Category</Label>
                <Select name="category_id" required>
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
                <Label htmlFor="surplus_weight_kg">Surplus Weight (kg)</Label>
                <Input
                  id="surplus_weight_kg"
                  name="surplus_weight_kg"
                  type="number"
                  step="any"
                  placeholder="12.34"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="bbe_date">Best Before End - Date</Label>
                <Input
                  id="bbe_date"
                  name="bbe_date"
                  type="date"
                  placeholder={new Date().toDateString()}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
