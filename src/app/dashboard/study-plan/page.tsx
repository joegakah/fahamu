// src/app/dashboard/study-plan/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { generatePersonalizedStudyPlan, GeneratePersonalizedStudyPlanOutput, GeneratePersonalizedStudyPlanInput, StudySession } from '@/ai/flows/generate-personalized-study-plan';
import { StudyCalendar } from '@/components/dashboard/study-calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StudyPlanPage() {
    const [studyPlan, setStudyPlan] = useState<GeneratePersonalizedStudyPlanOutput | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudyPlan = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const input: GeneratePersonalizedStudyPlanInput = {
                studentName: "Alex Doe",
                weaknesses: ["Calculus", "Organic Chemistry reactions"],
                strengths: ["Memorization", "Essay writing"],
                upcomingExams: ["Finals in Math (1 week)", "Midterm in Chemistry (2 weeks)"],
                studyMethods: ["Pomodoro Technique", "Practice problems"],
            };
            const result = await generatePersonalizedStudyPlan(input);
            setStudyPlan(result);
        } catch (error) {
            console.error("Failed to generate study plan:", error);
            setError("Sorry, we couldn't generate a study plan at this time. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudyPlan();
    }, []);


    return (
        <div className="container mx-auto p-0 md:p-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Bot className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Your AI-Powered Study Plan</CardTitle>
                                <CardDescription>
                                    Here is your personalized 7-day study schedule.
                                </CardDescription>
                            </div>
                        </div>
                        <Button onClick={fetchStudyPlan} disabled={isLoading}>
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Regenerate Plan
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading && (
                        <div className="mt-8 text-center">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                        <p className="mt-2 text-muted-foreground">Our AI is crafting your plan...</p>
                        </div>
                    )}
                    {error && (
                        <div className="mt-8 text-center text-destructive">
                        <p>{error}</p>
                        </div>
                    )}
                    {studyPlan && studyPlan.studyPlan.length > 0 && (
                        <div className="mt-8">
                            <StudyCalendar sessions={studyPlan.studyPlan} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
