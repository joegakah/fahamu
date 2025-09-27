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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters."),
  weaknesses: z.string().min(10, "Please describe your weaknesses in at least 10 characters."),
  strengths: z.string().min(10, "Please describe your strengths in at least 10 characters."),
  upcomingExams: z.string().min(5, "List at least one upcoming exam."),
  studyMethods: z.string().min(5, "List at least one preferred study method."),
})

type StudyPlanFormProps = {
  getStudyPlan: (input: { studentName: string; weaknesses: string[]; upcomingExams: string[]; strengths: string[], studyMethods: string[] }) => Promise<string>;
}

export function StudyPlanForm({ getStudyPlan }: StudyPlanFormProps) {
  const [studyPlan, setStudyPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "Alex Doe",
      weaknesses: "Calculus, Organic Chemistry reactions",
      strengths: "Memorization, Essay writing",
      upcomingExams: "Finals in Math (1 week), Midterm in Chemistry (2 weeks)",
      studyMethods: "Pomodoro Technique, Practice problems",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setStudyPlan(null)
    try {
      const input = {
        studentName: values.studentName,
        weaknesses: values.weaknesses.split(',').map(s => s.trim()),
        strengths: values.strengths.split(',').map(s => s.trim()),
        upcomingExams: values.upcomingExams.split(',').map(s => s.trim()),
        studyMethods: values.studyMethods.split(',').map(s => s.trim()),
      };
      const result = await getStudyPlan(input)
      setStudyPlan(result)
    } catch (error) {
      console.error("Failed to generate study plan:", error)
      setStudyPlan("Sorry, we couldn't generate a study plan at this time. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="upcomingExams"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upcoming Exams</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Math Final, Physics Midterm" {...field} />
                  </FormControl>
                  <FormDescription>Separate items with a comma.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
           <FormField
              control={form.control}
              name="weaknesses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weaknesses</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List subjects and topics you struggle with, separated by commas..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be specific for better results.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="strengths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strengths</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What are you good at? e.g., Memorization, Problem-solving..."
                      {...field}
                    />
                  </FormControl>
                   <FormDescription>Separate items with a comma.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="studyMethods"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Study Methods</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Pomodoro, Feynman technique, Mind mapping..."
                      {...field}
                    />
                  </FormControl>
                   <FormDescription>Separate items with a comma.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Plan
          </Button>
        </form>
      </Form>
      {isLoading && (
        <div className="mt-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Our AI is crafting your plan...</p>
        </div>
      )}
      {studyPlan && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Personalized Study Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-body text-sm bg-muted/50 p-4 rounded-md">
                <code>{studyPlan}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </>
  )
}
