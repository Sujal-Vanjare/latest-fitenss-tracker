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
import { useBodyWeightHistory } from "@/app/hook/useBodyWeightHistory";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function BodyWeightBarChart() {
  const { data: history, isLoading, error } = useBodyWeightHistory();

  if (isLoading || error || !history || history.length === 0) {
    return (
      <Card className="2xl:h-[405px] 2xl:w-[400px]">
        <CardHeader className="p-6 pb-0">
          <CardTitle>Bar Chart</CardTitle>
          <Skeleton className="h-5 w-44 mt-2 dark:bg-primary/30" />
        </CardHeader>
        <CardContent className="pt-6">
          <Skeleton className="w-full h-[226px] bg-muted/60" />
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <Skeleton className="h-4 w-[200px] dark:bg-primary/30" />
          <Skeleton className="h-3.5 w-[224px] dark:bg-primary/30" />
        </CardFooter>
      </Card>
    );
  }

  const getLastSixMonthsData = (
    data: BodyWeightEntry[]
  ): { monthsData: MonthlyData[]; monthCount: number } => {
    const lastSixMonthsData: MonthlyData[] = [];
    const uniqueMonths = new Map<string, number>();

    data.forEach((entry) => {
      const date = new Date(entry.recorded_at);
      const month = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      uniqueMonths.set(month, entry.body_weight);
    });

    // Convert the map to an array and sort by date
    const sortedMonths = Array.from(uniqueMonths.keys()).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });

    // Get the last 6 months
    const lastSixMonths = sortedMonths.slice(-6);

    // Create the final result in the correct format
    lastSixMonths.forEach((month) => {
      lastSixMonthsData.push({ month, weight: uniqueMonths.get(month)! });
    });

    return {
      monthsData: lastSixMonthsData,
      monthCount: lastSixMonthsData.length,
    };
  };

  const { monthsData: monthlyData, monthCount } = getLastSixMonthsData(history);

  const weightChangeLastSixMonths =
    monthlyData.length > 1
      ? monthlyData[monthlyData.length - 1].weight - monthlyData[0].weight
      : 0;

  const monthsText =
    monthCount > 1 ? `${monthCount} months` : `${monthCount} month`;

  const startMonth = monthlyData[0].month.split(" ")[0];
  const endMonthYear = monthlyData[monthlyData.length - 1].month.split(" ");
  const dateRangeDescription = `${startMonth} - ${endMonthYear[0]} ${endMonthYear[1]}`;

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
