"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  studentPerformanceData: z.string().min(50, "Please provide at least 50 characters of performance data."),
})

const sampleData = `Student A: Math-Trigonometry (60%), Physics-Optics (75%), History-Ancient Rome (85%)
Student B: Math-Trigonometry (55%), Physics-Optics (65%), History-Ancient Rome (90%)
Student C: Math-Trigonometry (62%), Physics-Optics (80%), History-Ancient Rome (88%)
Student D: Math-Algebra (95%), Physics-Thermodynamics (92%), History-Ancient Greece (95%)
`;

type TeacherOverviewProps = {
  analyzeData: (input: { studentPerformanceData: string }) => Promise<string>;
}

export function TeacherOverview({ analyzeData }: TeacherOverviewProps) {
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentPerformanceData: sampleData,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setAnalysis(null)
    try {
      const result = await analyzeData(values)
      setAnalysis(result)
    } catch (error) {
      console.error("Failed to analyze data:", error)
      setAnalysis("Sorry, an error occurred during analysis. Please check your data format and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="studentPerformanceData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Performance Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste student data here. Format: Student Name: Subject-Topic (Score%), ..."
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide data for multiple students to identify class-wide trends. Use sample data as a guide.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Data
          </Button>
        </form>
      </Form>
      {isLoading && (
        <div className="mt-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">AI is analyzing student performance...</p>
        </div>
      )}
      {analysis && (
        <Card className="mt-8 bg-accent/50 border-accent">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap font-body text-sm text-accent-foreground">{analysis}</p>
          </CardContent>
        </Card>
      )}
    </>
  )
}
