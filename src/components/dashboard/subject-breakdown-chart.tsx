"use client"

import { PolarGrid, PolarAngleAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

const data = [
  { subject: "Math", score: 70 },
  { subject: "Physics", score: 55 },
  { subject: "Biology", score: 80 },
  { subject: "English", score: 85 },
  { subject: "History", score: 65 },
  { subject: "Chemistry", score: 75 },
];

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--primary))",
  },
}

export function SubjectBreakdownChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
        <RadarChart
          data={data}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
            <ChartTooltip content={<ChartTooltipContent />} />
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar
                dataKey="score"
                stroke="var(--color-score)"
                fill="var(--color-score)"
                fillOpacity={0.6}
            />
        </RadarChart>
    </ChartContainer>
  )
}