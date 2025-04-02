import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FoodWasteEntry } from "@/models";
import { useMemo } from "react";

const chartConfig = {
  fruit: {
    label: "Fruit",
    color: "var(--chart-1)",
  },
  dairy: {
    label: "Dairy",
    color: "var(--chart-2)",
  },
  bakery: {
    label: "Bakery",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface DashboardChartProps {
  data: FoodWasteEntry[];
}

const useCategorySurplusChartData = ({ data }: DashboardChartProps) => {
  const chartData = useMemo(() => {
    const currentDate = new Date();
    const byCategory = data.reduce(
      (acc, foodWaste) => {
        const bbeDate = new Date(foodWaste.bbe_date);
        // ignore expired food
        if (currentDate > bbeDate) return acc;

        if (acc[foodWaste.category]) {
          acc[foodWaste.category].waste_kg += foodWaste.surplus_weight_kg;
        } else {
          acc[foodWaste.category] = {
            category: foodWaste.category,
            waste_kg: foodWaste.surplus_weight_kg,
            fill: `var(--color-${foodWaste.category})`,
          };
        }

        return acc;
      },
      {} as Record<
        string,
        { category: string; waste_kg: number; fill: string }
      >,
    );

    return Object.values(byCategory);
  }, [data]);

  return chartData;
};

export function TotalCategorySurplusChart({ data }: DashboardChartProps) {
  const chartData = useCategorySurplusChartData({ data });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Surplus Food by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="waste_kg" type="number" />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(x) => (
                    <span className="text-center">
                      {`${(parseFloat(x.toString()) / 1000).toFixed(3)} ton(s)`}
                    </span>
                  )}
                />
              }
            />
            <Bar dataKey="waste_kg" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const useCategoryDaysRemainingData = ({ data }: DashboardChartProps) => {
  const chartData = useMemo(() => {
    const currentDate = new Date();
    const millisecondsInADay = 1000 * 3600 * 24;

    const getDaysRemaining = (bbeDate: Date) => {
      const diff = bbeDate.getTime() - currentDate.getTime();
      return Math.floor(diff / millisecondsInADay);
    };

    const byCategory = data.reduce(
      (acc, foodWaste) => {
        const bbeDate = new Date(foodWaste.bbe_date);

        // ignore expired food
        if (currentDate > bbeDate) return acc;

        const daysRemaining = getDaysRemaining(bbeDate);

        if (acc[foodWaste.category]) {
          acc[foodWaste.category].daysRemaining += daysRemaining;
          acc[foodWaste.category].weightedDaysRemaining +=
            daysRemaining * foodWaste.surplus_weight_kg;
        } else {
          acc[foodWaste.category] = {
            category: foodWaste.category,
            daysRemaining,
            weightedDaysRemaining: daysRemaining * foodWaste.surplus_weight_kg,
            fill: `var(--color-${foodWaste.category})`,
          };
        }

        return acc;
      },
      {} as Record<
        string,
        {
          category: string;
          daysRemaining: number;
          weightedDaysRemaining: number;
          fill: string;
        }
      >,
    );

    return Object.values(byCategory);
  }, [data]);

  return chartData;
};

export function CategoryDaysRemainingChart({ data }: DashboardChartProps) {
  const chartData = useCategoryDaysRemainingData({ data });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Days Remaining by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey={"daysRemaining"} />

            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="category"
                  formatter={(x) => (
                    <span className="text-center">
                      {`${(parseFloat(x.toString()) / 1000).toFixed(3)} day(s)`}
                    </span>
                  )}
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function CategoryWeightedDaysRemainingChart({
  data,
}: DashboardChartProps) {
  const chartData = useCategoryDaysRemainingData({ data });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>(Weighted) Days Remaining by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey={"weightedDaysRemaining"} />

            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="category"
                  formatter={(x) => (
                    <span className="text-center">
                      {`${(parseFloat(x.toString()) / 1000).toFixed(3)} day(s)`}
                    </span>
                  )}
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
