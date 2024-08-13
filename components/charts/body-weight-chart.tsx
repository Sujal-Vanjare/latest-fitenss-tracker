"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
} from "recharts";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  body_weight: {
    label: "Weight",
    color: "hsl(var(--chart-1))",
  },
  bodyweight_change: {
    label: "Weight Change",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function BodyWeightChart({
  chartData,
}: {
  chartData: ChartEntry[];
}) {
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
      Math.min(...chartData.map((item) => new Date(item.recorded_at).getTime()))
    );
  } else {
    startDate = new Date(now.setDate(now.getDate() - 90));
  }

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.recorded_at);
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
    <Card className="grow">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 lg:flex-row">
        <div className="flex w-full justify-between px-6 py-5 sm:py-6">
          <div className="flex flex-col justify-center gap-1 ">
            <CardTitle>Body Weight</CardTitle>
            <CardDescription className="mt-1.5">
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
            <span className="text-xs text-muted-foreground">
              Current Weight
            </span>
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
              dataKey="recorded_at"
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
                  className="w-[160px]"
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
