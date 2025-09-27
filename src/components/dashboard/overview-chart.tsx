"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 75 },
  { month: "Apr", score: 88 },
  { month: "May", score: 85 },
  { month: "Jun", score: 91 },
]

const chartConfig = {
  score: {
    label: "Average Score",
    color: "hsl(var(--primary))",
  },
}

export function OverviewChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data} margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
