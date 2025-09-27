import { analyzeStudentPerformanceData } from '@/ai/flows/analyze-student-performance-data';
import { TeacherOverview } from '@/components/dashboard/teacher-overview';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users } from 'lucide-react';

export default function TeacherPage() {
    async function analyzeData(input: { studentPerformanceData: string }) {
        'use server';
        const result = await analyzeStudentPerformanceData(input);
        return result.commonWeaknesses;
    }

    return (
        <div className="container mx-auto p-0 md:p-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Class Performance Analyzer</CardTitle>
                            <CardDescription>
                                Paste student data to identify common areas of weakness across your class.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <TeacherOverview analyzeData={analyzeData} />
                </CardContent>
            </Card>
        </div>
    )
}
