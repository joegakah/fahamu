"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { ProvideStudyMethodGuidanceOutput } from '@/ai/flows/provide-study-method-guidance';
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
  learningChallenges: z.string().min(10, "Describe your challenges in at least 10 characters."),
  strengths: z.string().min(10, "Describe your strengths in at least 10 characters."),
  subjects: z.string().min(3, "List at least one subject."),
  topics: z.string().min(3, "List at least one topic."),
})

type GuidanceFormProps = {
  getGuidance: (input: z.infer<typeof formSchema>) => Promise<ProvideStudyMethodGuidanceOutput>;
}

export function GuidanceForm({ getGuidance }: GuidanceFormProps) {
  const [guidance, setGuidance] = useState<ProvideStudyMethodGuidanceOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learningChallenges: "Difficulty retaining information from lectures.",
      strengths: "Good at hands-on experiments and visual learning.",
      subjects: "Physics, Biology",
      topics: "Newtonian Mechanics, Mitosis",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setGuidance(null)
    try {
      const result = await getGuidance(values)
      setGuidance(result)
    } catch (error) {
      console.error("Failed to get guidance:", error)
      // Show toast on error
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
              name="learningChallenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Learning Challenges</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Trouble concentrating, difficulty with abstract concepts..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="strengths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Strengths</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Good at memorizing, creative thinking..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="subjects"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Subjects</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Mathematics, History" {...field} />
                    </FormControl>
                    <FormDescription>Separate with commas.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="topics"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Topics</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Algebra, World War II" {...field} />
                    </FormControl>
                    <FormDescription>Separate with commas.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Guidance
          </Button>
        </form>
      </Form>
      {isLoading && (
        <div className="mt-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">AI is analyzing your learning style...</p>
        </div>
      )}
      {guidance && (
        <div className="mt-8 grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Suggested Methods</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="whitespace-pre-wrap font-body text-sm">{guidance.suggestedMethods}</pre>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Suggested Resources</CardTitle>
                </CardHeader>
                <CardContent>
                     <pre className="whitespace-pre-wrap font-body text-sm">{guidance.suggestedResources}</pre>
                </CardContent>
            </Card>
        </div>
      )}
    </>
  )
}
