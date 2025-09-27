import { generatePersonalizedStudyPlan } from '@/ai/flows/generate-personalized-study-plan';
import { StudyPlanForm } from '@/components/dashboard/study-plan-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bot } from 'lucide-react';

export default function StudyPlanPage() {
    async function getStudyPlan(input: { studentName: string; weaknesses: string[]; upcomingExams: string[]; strengths: string[], studyMethods: string[] }) {
        'use server';
        const result = await generatePersonalizedStudyPlan(input);
        return result.studyPlan;
    }

    return (
        <div className="container mx-auto p-0 md:p-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Bot className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>AI-Powered Study Plan Generator</CardTitle>
                            <CardDescription>
                                Fill in your details below and our AI will create a personalized study plan just for you.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <StudyPlanForm getStudyPlan={getStudyPlan} />
                </CardContent>
            </Card>
        </div>
    )
}
