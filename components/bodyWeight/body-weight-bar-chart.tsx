"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function BodyWeightBarChart({
  chartData,
}: {
  chartData: ChartEntry[];
}) {
  // Update getLastSixMonthsData to return both the data and the month count
  const getLastSixMonthsData = (
    data: ChartEntry[]
  ): { monthsData: MonthlyData[]; monthCount: number } => {
    const lastSixMonthsData: MonthlyData[] = [];
    const uniqueMonths = new Map<string, number>();

    data.forEach((entry) => {
      const date = new Date(entry.recorded_at);
      const month = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      // Update the map with the latest weight for the month
      uniqueMonths.set(month, entry.body_weight);
    });

    // Convert the map back to an array and get the last 6 months
    const sortedMonths = Array.from(uniqueMonths.entries()).slice(-6);

    // Create the final result in the correct format
    sortedMonths.forEach(([month, weight]) => {
      lastSixMonthsData.push({ month, weight });
    });

    // Return both data and the count of unique months
    return {
      monthsData: lastSixMonthsData,
      monthCount: lastSixMonthsData.length,
    };
  };

  const { monthsData: monthlyData, monthCount } =
    getLastSixMonthsData(chartData);

  const weightChangeLastSixMonths =
    monthlyData.length > 1
      ? monthlyData[monthlyData.length - 1].weight - monthlyData[0].weight
      : 0; // Handle case where not enough data is available

  // Adjust the display message based on the number of available months
  const monthsText =
    monthCount > 1 ? `${monthCount} months` : `${monthCount} month`;

  // Extract only the month names for the date range
  const startMonth = monthlyData[0].month.split(" ")[0];
  const endMonthYear = monthlyData[monthlyData.length - 1].month.split(" ");
  const dateRangeDescription = `${startMonth} - ${endMonthYear[0]} ${endMonthYear[1]}`;

  const calculateWeightChange = (data: MonthlyData[]): number => {
    if (data.length === 0) return 0;
    const firstMonthWeight = data[0].weight;
    const lastMonthWeight = data[data.length - 1].weight;
    return lastMonthWeight - firstMonthWeight;
  };
  return (
    <Card className="2xl:h-[405px] 2xl:w-[400px]">
      <CardHeader className="pb-0">
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>{dateRangeDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={monthlyData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="weight" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {weightChangeLastSixMonths > 0
            ? `Gained ${weightChangeLastSixMonths.toFixed(
                1
              )} kg in the last ${monthsText}`
            : `Lost ${Math.abs(weightChangeLastSixMonths).toFixed(
                1
              )} kg in the last ${monthsText}`}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing Body Weight for the last {monthsText}
        </div>
      </CardFooter>
    </Card>
  );
}
