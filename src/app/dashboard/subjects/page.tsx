// src/app/dashboard/subjects/page.tsx
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Brain, CheckCircle, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const subjectsData = [
    {
        name: "Mathematics",
        overallScore: 78,
        mastery: 65,
        topics: [
            { name: "Algebra", score: 85, trend: "up" },
            { name: "Calculus", score: 60, trend: "down" },
            { name: "Geometry", score: 88, trend: "up" },
        ],
        strengths: ["Algebra", "Geometry"],
        weaknesses: ["Calculus"],
    },
    {
        name: "Physics",
        overallScore: 65,
        mastery: 50,
        topics: [
            { name: "Mechanics", score: 70, trend: "up" },
            { name: "Thermodynamics", score: 55, trend: "down" },
            { name: "Optics", score: 68, trend: "up" },
        ],
        strengths: ["Mechanics", "Optics"],
        weaknesses: ["Thermodynamics"],
    },
    {
        name: "Chemistry",
        overallScore: 82,
        mastery: 75,
        topics: [
            { name: "Organic", score: 75, trend: "down" },
            { name: "Inorganic", score: 88, trend: "up" },
            { name: "Physical", score: 80, trend: "up" },
        ],
        strengths: ["Inorganic", "Physical"],
        weaknesses: ["Organic"],
    }
];

export default function SubjectsPage() {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                     <Link href="/dashboard">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Subjects Overview</h1>
                        <p className="text-muted-foreground">A detailed look at your performance in each subject.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {subjectsData.map((subject) => (
                    <Card key={subject.name} className="overflow-hidden">
                        <CardHeader className="bg-card">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <BookOpen className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl">{subject.name}</CardTitle>
                                </div>
                                <div className="flex items-center gap-6 text-center">
                                    <div>
                                        <p className="text-2xl font-bold">{subject.overallScore}%</p>
                                        <p className="text-xs text-muted-foreground">Overall Score</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{subject.mastery}%</p>
                                        <p className="text-xs text-muted-foreground">Mastery</p>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                <div className="lg:col-span-2 p-6">
                                     <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Brain className="h-5 w-5 text-primary"/>Topic Breakdown</h3>
                                    <div className="border rounded-lg overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Topic</TableHead>
                                                    <TableHead className="text-center">Score</TableHead>
                                                    <TableHead className="text-center">Trend</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {subject.topics.map((topic) => (
                                                    <TableRow key={topic.name}>
                                                        <TableCell className="font-medium">{topic.name}</TableCell>
                                                        <TableCell className="text-center">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <span>{topic.score}%</span>
                                                                <Progress value={topic.score} className="w-24 h-2" />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {topic.trend === 'up' ?
                                                                <TrendingUp className="h-5 w-5 text-green-500 mx-auto" /> :
                                                                <TrendingDown className="h-5 w-5 text-red-500 mx-auto" />
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                                <div className="bg-muted/30 p-6">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500"/>Strengths</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {subject.strengths.map(strength => <Badge key={strength} variant="secondary" className="bg-green-100 text-green-800">{strength}</Badge>)}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><TrendingDown className="h-5 w-5 text-red-500"/>Weaknesses</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {subject.weaknesses.map(weakness => <Badge key={weakness} variant="destructive">{weakness}</Badge>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}