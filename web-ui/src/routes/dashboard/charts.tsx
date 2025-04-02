import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

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
  total: {
    label: "Total",
    color: "var(--chart-4)",
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
        <CardTitle className="text-center">Surplus Food by Category</CardTitle>
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
        <CardTitle className="text-center">
          Days Remaining by Category
        </CardTitle>
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
        <CardTitle className="text-center">
          Weighted) Days Remaining by Category
        </CardTitle>
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

const useCategoryWasteOverTimeData = ({ data }: DashboardChartProps) => {
  const chartData = useMemo(() => {
    const MONTH_MAPPING: Record<number, string> = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };

    const byMonth = data.reduce(
      (acc, foodWaste) => {
        const bbeDate = new Date(foodWaste.bbe_date);
        const month = bbeDate.getMonth();

        if (acc[month]) {
          if (acc[month][foodWaste.category])
            acc[month][foodWaste.category] += foodWaste.surplus_weight_kg;
          else acc[month][foodWaste.category] = foodWaste.surplus_weight_kg;
        } else {
          acc[month] = {
            [foodWaste.category]: foodWaste.surplus_weight_kg,
          };
        }

        return acc;
      },
      {} as Record<number, Record<string, number>>,
    );

    const sortedKeys = Object.keys(byMonth)
      .map((x) => parseInt(x, 10))
      .sort();

    return sortedKeys.map((k) => ({ month: MONTH_MAPPING[k], ...byMonth[k] }));
  }, [data]);

  return chartData;
};

export function CategoryWasteOverTimeChart({ data }: DashboardChartProps) {
  const chartData = useCategoryWasteOverTimeData({ data });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">
          Waste over time, by Category
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis
              tickLine
              tickMargin={8}
              tickFormatter={(value) => `${value / 1000} tons`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="fruit"
              type="monotone"
              stroke="var(--color-fruit)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="dairy"
              type="monotone"
              stroke="var(--color-dairy)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="bakery"
              type="monotone"
              stroke="var(--color-bakery)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend
              content={<ChartLegendContent />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const useCumulativeWasteOverTimeData = ({ data }: DashboardChartProps) => {
  const chartData = useMemo(() => {
    const MONTH_MAPPING: Record<number, string> = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };

    const byMonth = data.reduce(
      (acc, foodWaste) => {
        const bbeDate = new Date(foodWaste.bbe_date);
        const month = bbeDate.getMonth();

        if (acc[month]) {
          if (acc[month][foodWaste.category])
            acc[month][foodWaste.category] += foodWaste.surplus_weight_kg;
          else acc[month][foodWaste.category] = foodWaste.surplus_weight_kg;
        } else {
          acc[month] = {
            [foodWaste.category]: foodWaste.surplus_weight_kg,
          };
        }

        return acc;
      },
      {} as Record<number, Record<string, number>>,
    );

    const sortedKeys = Object.keys(byMonth)
      .map((x) => parseInt(x, 10))
      .sort();

    return sortedKeys.reduce(
      (acc, k) => {
        const { fruit, dairy, bakery } = byMonth[k];
        if (acc.length > 0) {
          const prev = acc[acc.length - 1];

          acc.push({
            month: MONTH_MAPPING[k],
            fruit: (prev.fruit as number) + (fruit || 0),
            dairy: (prev.dairy as number) + (dairy || 0),
            bakery: (prev.bakery as number) + (bakery || 0),
            total:
              (prev.total as number) +
              (fruit || 0) +
              (dairy || 0) +
              (bakery || 0),
          });
        } else {
          acc.push({
            month: MONTH_MAPPING[k],
            fruit: fruit || 0,
            dairy: dairy || 0,
            bakery: bakery || 0,
            total: (fruit || 0) + (dairy || 0) + (bakery || 0),
          });
        }

        return acc;
      },
      [] as Record<string, number | string>[],
    );
  }, [data]);

  return chartData;
};

export function CumulativeWasteOverTimeChart({ data }: DashboardChartProps) {
  const chartData = useCumulativeWasteOverTimeData({ data });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">
          Cumulative Waste by Category
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine
              tickMargin={8}
              tickFormatter={(value) => `${value / 1000} tons`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="fruit"
              type="natural"
              fill="var(--color-fruit)"
              fillOpacity={0.0}
              stroke="var(--color-fruit)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              dataKey="dairy"
              type="natural"
              fill="var(--color-dairy)"
              fillOpacity={0.0}
              stroke="var(--color-dairy)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              dataKey="bakery"
              type="natural"
              fill="var(--color-bakery)"
              fillOpacity={0.0}
              stroke="var(--color-bakery)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              dataKey="total"
              type="natural"
              fill="var(--color-total)"
              fillOpacity={0.01}
              stroke="var(--color-total)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend
              content={<ChartLegendContent />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
