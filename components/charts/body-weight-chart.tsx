"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { date: "2024-04-11", body_weight: 66, bodyweight_change: 0.0 },
  { date: "2024-05-11", body_weight: 73.2, bodyweight_change: 0.0 },
  { date: "2024-05-12", body_weight: 73.4, bodyweight_change: 0.2 },
  { date: "2024-05-13", body_weight: 73.5, bodyweight_change: 0.1 },
  { date: "2024-05-14", body_weight: 73.7, bodyweight_change: 0.2 },
  { date: "2024-05-15", body_weight: 73.9, bodyweight_change: 0.2 },
  { date: "2024-05-16", body_weight: 74.1, bodyweight_change: 0.2 },
  { date: "2024-05-17", body_weight: 74.0, bodyweight_change: -0.1 },
  { date: "2024-05-18", body_weight: 74.3, bodyweight_change: 0.3 },
  { date: "2024-05-19", body_weight: 74.1, bodyweight_change: -0.2 },
  { date: "2024-05-20", body_weight: 74.5, bodyweight_change: 0.4 },
  { date: "2024-05-21", body_weight: 74.3, bodyweight_change: -0.2 },
  { date: "2024-05-22", body_weight: 74.6, bodyweight_change: 0.3 },
  { date: "2024-05-23", body_weight: 74.8, bodyweight_change: 0.2 },
  { date: "2024-05-24", body_weight: 74.7, bodyweight_change: -0.1 },
  { date: "2024-05-25", body_weight: 74.9, bodyweight_change: 0.2 },
  { date: "2024-05-26", body_weight: 75.1, bodyweight_change: 0.2 },
  { date: "2024-05-27", body_weight: 75.0, bodyweight_change: -0.1 },
  { date: "2024-05-28", body_weight: 75.2, bodyweight_change: 0.2 },
  { date: "2024-05-29", body_weight: 75.4, bodyweight_change: 0.2 },
  { date: "2024-05-30", body_weight: 75.1, bodyweight_change: -0.3 },
  { date: "2024-05-31", body_weight: 75.5, bodyweight_change: 0.4 },
  { date: "2024-06-01", body_weight: 78.0, bodyweight_change: 2.5 }, // Major weight gain
  { date: "2024-06-02", body_weight: 75.0, bodyweight_change: -3.0 }, // Major weight loss
  { date: "2024-06-03", body_weight: 75.4, bodyweight_change: 0.4 },
  { date: "2024-06-04", body_weight: 75.6, bodyweight_change: 0.2 },
  { date: "2024-06-05", body_weight: 75.5, bodyweight_change: -0.1 },
  { date: "2024-06-06", body_weight: 75.9, bodyweight_change: 0.4 },
  { date: "2024-06-07", body_weight: 75.8, bodyweight_change: -0.1 },
  { date: "2024-06-08", body_weight: 76.2, bodyweight_change: 0.4 },
  { date: "2024-06-09", body_weight: 76.0, bodyweight_change: -0.2 },
  { date: "2024-06-10", body_weight: 76.5, bodyweight_change: 0.5 },
  { date: "2024-06-11", body_weight: 76.7, bodyweight_change: 0.2 },
  { date: "2024-06-12", body_weight: 76.4, bodyweight_change: -0.3 },
  { date: "2024-06-13", body_weight: 76.9, bodyweight_change: 0.5 },
  { date: "2024-06-14", body_weight: 77.2, bodyweight_change: 0.3 },
  { date: "2024-06-15", body_weight: 77.0, bodyweight_change: -0.2 },
  { date: "2024-06-16", body_weight: 77.5, bodyweight_change: 0.5 },
  { date: "2024-06-17", body_weight: 77.4, bodyweight_change: -0.1 },
  { date: "2024-06-18", body_weight: 77.8, bodyweight_change: 0.4 },
  { date: "2024-06-19", body_weight: 77.6, bodyweight_change: -0.2 },
  { date: "2024-06-20", body_weight: 78.0, bodyweight_change: 0.4 },
  { date: "2024-06-21", body_weight: 77.8, bodyweight_change: -0.2 },
  { date: "2024-06-22", body_weight: 78.3, bodyweight_change: 0.5 },
  { date: "2024-06-23", body_weight: 78.0, bodyweight_change: -0.3 },
  { date: "2024-06-24", body_weight: 78.4, bodyweight_change: 0.4 },
  { date: "2024-06-25", body_weight: 78.7, bodyweight_change: 0.3 },
  { date: "2024-06-26", body_weight: 78.5, bodyweight_change: -0.2 },
  { date: "2024-06-27", body_weight: 79.0, bodyweight_change: 0.5 },
  { date: "2024-06-28", body_weight: 79.3, bodyweight_change: 0.3 },
  { date: "2024-06-29", body_weight: 79.0, bodyweight_change: -0.3 },
  { date: "2024-06-30", body_weight: 79.5, bodyweight_change: 0.5 },
  { date: "2024-07-01", body_weight: 79.2, bodyweight_change: -0.3 },
  { date: "2024-07-02", body_weight: 79.7, bodyweight_change: 0.5 },
  { date: "2024-07-03", body_weight: 79.9, bodyweight_change: 0.2 },
  { date: "2024-07-04", body_weight: 79.5, bodyweight_change: -0.4 },
  { date: "2024-07-05", body_weight: 79.8, bodyweight_change: 0.3 },
  { date: "2024-07-06", body_weight: 79.6, bodyweight_change: -0.2 },
  { date: "2024-07-07", body_weight: 80.0, bodyweight_change: 0.4 },
  { date: "2024-07-08", body_weight: 79.8, bodyweight_change: -0.2 },
  { date: "2024-07-09", body_weight: 80.2, bodyweight_change: 0.4 },
  { date: "2024-07-10", body_weight: 80.0, bodyweight_change: -0.2 },
  { date: "2024-07-11", body_weight: 80.4, bodyweight_change: 0.4 },
  { date: "2024-07-12", body_weight: 80.2, bodyweight_change: -0.2 },
  { date: "2024-07-13", body_weight: 80.7, bodyweight_change: 0.5 },
  { date: "2024-07-14", body_weight: 80.5, bodyweight_change: -0.2 },
  { date: "2024-07-15", body_weight: 81.0, bodyweight_change: 0.5 },
  { date: "2024-07-16", body_weight: 80.8, bodyweight_change: -0.2 },
  { date: "2024-07-17", body_weight: 81.3, bodyweight_change: 0.5 },
  { date: "2024-07-17", body_weight: 81.3, bodyweight_change: 0.5 },
  { date: "2024-07-18", body_weight: 81.0, bodyweight_change: -0.3 },
  { date: "2024-07-19", body_weight: 81.5, bodyweight_change: 0.5 },
  { date: "2024-07-20", body_weight: 81.3, bodyweight_change: -0.2 },
  { date: "2024-07-21", body_weight: 81.7, bodyweight_change: 0.4 },
  { date: "2024-07-22", body_weight: 81.5, bodyweight_change: -0.2 },
  { date: "2024-07-23", body_weight: 81.9, bodyweight_change: 0.4 },
  { date: "2024-07-24", body_weight: 81.7, bodyweight_change: -0.2 },
  { date: "2024-07-25", body_weight: 82.1, bodyweight_change: 0.4 },
  { date: "2024-07-26", body_weight: 81.8, bodyweight_change: -0.3 },
  { date: "2024-07-27", body_weight: 82.3, bodyweight_change: 0.5 },
  { date: "2024-07-28", body_weight: 82.0, bodyweight_change: -0.3 },
  { date: "2024-07-29", body_weight: 82.5, bodyweight_change: 0.5 },
  { date: "2024-07-30", body_weight: 82.2, bodyweight_change: -0.3 },
  { date: "2024-07-31", body_weight: 82.6, bodyweight_change: 0.4 },
  { date: "2024-08-01", body_weight: 82.4, bodyweight_change: -0.2 },
  { date: "2024-08-02", body_weight: 82.8, bodyweight_change: 0.4 },
  { date: "2024-08-03", body_weight: 82.6, bodyweight_change: -0.2 },
  { date: "2024-08-04", body_weight: 83.0, bodyweight_change: 0.4 },
  { date: "2024-08-05", body_weight: 82.7, bodyweight_change: -0.3 },
  { date: "2024-08-06", body_weight: 83.2, bodyweight_change: 0.5 },
  { date: "2024-08-07", body_weight: 82.9, bodyweight_change: -0.3 },
  { date: "2024-08-08", body_weight: 83.3, bodyweight_change: 0.4 },
  { date: "2024-08-09", body_weight: 83.0, bodyweight_change: -0.3 },
  { date: "2024-08-10", body_weight: 83.4, bodyweight_change: 0.4 },
  { date: "2024-08-11", body_weight: 80.7, bodyweight_change: -6 },
];
const chartConfig = {
  body_weight: {
    label: "Body Weight",
    color: "hsl(var(--chart-1))",
  },
  bodyweight_change: {
    label: "Weight Change",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function BodyWeightChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("body_weight");

  const [timeRange, setTimeRange] = React.useState("all");

  const now = new Date();
  let startDate: Date;

  if (timeRange === "30d") {
    startDate = new Date(now.setDate(now.getDate() - 30));
  } else if (timeRange === "7d") {
    startDate = new Date(now.setDate(now.getDate() - 7));
  } else if (timeRange === "all") {
    // For "All Time", set startDate to a very early date
    startDate = new Date(
      Math.min(...chartData.map((item) => new Date(item.date).getTime()))
    );
  } else {
    startDate = new Date(now.setDate(now.getDate() - 90));
  }

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    return date >= startDate;
  });

  const currentWeight =
    filteredData.length > 0
      ? filteredData[filteredData.length - 1].body_weight
      : 0;

  const weightChange =
    filteredData.length > 0
      ? filteredData[filteredData.length - 1].body_weight -
        filteredData[0].body_weight
      : 0;

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 lg:flex-row">
        <div className="flex w-full justify-between px-6 py-5 sm:py-6">
          <div className="flex flex-col justify-center gap-1 ">
            <CardTitle>Body Weight</CardTitle>
            <CardDescription>
              {startDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              {" - "}
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </CardDescription>
          </div>

          <div className="flex items-center">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-[130px] sm:w-[160px] text-xs sm:text-sm rounded-lg"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="w-[130px] sm:w-[160px] rounded-xl">
                <SelectItem
                  value="all"
                  className="rounded-lg text-xs sm:text-sm"
                >
                  All Time
                </SelectItem>
                <SelectItem
                  value="90d"
                  className="rounded-lg text-xs sm:text-sm"
                >
                  Last 3 months
                </SelectItem>
                <SelectItem
                  value="30d"
                  className="rounded-lg text-xs sm:text-sm"
                >
                  Last 30 days
                </SelectItem>
                <SelectItem
                  value="7d"
                  className="rounded-lg text-xs sm:text-sm"
                >
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex lg:max-w-[500px] w-full">
          <button
            data-active={activeChart === "body_weight"}
            className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/80 sm:border-l lg:border-t-0 sm:px-8 sm:py-6"
            onClick={() => setActiveChart("body_weight")}
          >
            <span className="text-xs text-muted-foreground">Weight</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {currentWeight.toLocaleString()}{" "}
              <span className="text-xs">Kg</span>
            </span>
          </button>

          <button
            data-active={activeChart === "bodyweight_change"}
            className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/80 sm:border-l lg:border-t-0 sm:px-8 sm:py-6"
            onClick={() => setActiveChart("bodyweight_change")}
          >
            <span className="text-xs text-muted-foreground">
              {weightChange > 0 ? (
                <span className="text-green-600 dark:text-green-400">
                  Gained
                </span>
              ) : weightChange < 0 ? (
                <span className="text-red-600 dark:text-red-400">Loosed</span>
              ) : (
                "No Change"
              )}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {weightChange.toLocaleString()}{" "}
              <span className="text-xs">Kg</span>
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
