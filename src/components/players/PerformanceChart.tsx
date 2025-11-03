"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { CalculatedPlayer } from "@/lib/types";

interface PerformanceChartProps {
  players: CalculatedPlayer[];
}

const PerformanceChart = ({ players }: PerformanceChartProps) => {
  const chartData = players.map((player) => ({
    name: player.name.split(" ")[0], // Use first name for brevity
    runs: player.runs,
    wickets: player.wickets,
  }));

  const chartConfig = {
    runs: {
      label: "Runs",
      color: "hsl(var(--chart-1))",
    },
    wickets: {
      label: "Wickets",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Player Performance</CardTitle>
        <CardDescription>Runs scored by the top ranked players</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="runs" fill="var(--color-runs)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
