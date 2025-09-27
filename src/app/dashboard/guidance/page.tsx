import { provideStudyMethodGuidance } from '@/ai/flows/provide-study-method-guidance';
import { GuidanceForm } from '@/components/dashboard/guidance-form';
import type { ProvideStudyMethodGuidanceOutput, ProvideStudyMethodGuidanceInput } from '@/ai/flows/provide-study-method-guidance';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpen } from 'lucide-react';

export default function GuidancePage() {
    async function getGuidance(input: ProvideStudyMethodGuidanceInput): Promise<ProvideStudyMethodGuidanceOutput> {
        'use server';
        const result = await provideStudyMethodGuidance(input);
        return result;
    }

    return (
        <div className="container mx-auto p-0 md:p-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Study Method Guidance</CardTitle>
                            <CardDescription>
                                Discover effective study methods and resources tailored to your needs.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <GuidanceForm getGuidance={getGuidance} />
                </CardContent>
            </Card>
        </div>
    )
}
