"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { week: 1, score: 45 },
  { week: 2, score: 52 },
  { week: 3, score: 60 },
  { week: 4, score: 68 },
];


const chartConfig = {
  score: {
    label: "Average Score",
    color: "hsl(var(--primary))",
  },
}

export function OverallPerformanceChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart accessibilityLayer data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
        <XAxis
          dataKey="week"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `Week ${value}`}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          cursor={true}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Line dataKey="score" type="monotone" stroke="var(--color-score)" strokeWidth={2} dot={{r: 4, fill: "var(--color-score)"}} />
      </LineChart>
    </ChartContainer>
  )
}