// src/ai/flows/generate-personalized-study-plan.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating personalized study plans based on student weaknesses and upcoming exams.
 *
 * - generatePersonalizedStudyPlan - A function that generates a personalized study plan.
 * - GeneratePersonalizedStudyPlanInput - The input type for the generatePersonalizedStudyPlan function.
 * - GeneratePersonalizedStudyPlanOutput - The return type for the generatePersonalizedStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedStudyPlanInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  weaknesses: z.array(z.string()).describe('An array of identified weaknesses for the student, including subjects and specific topics.'),
  upcomingExams: z.array(z.string()).describe('An array of upcoming exams for the student, including subject names and dates.'),
  strengths: z.array(z.string()).describe('An array of identified strengths for the student.'),
  studyMethods: z.array(z.string()).describe('An array of study methods the student prefers.'),
});
export type GeneratePersonalizedStudyPlanInput = z.infer<typeof GeneratePersonalizedStudyPlanInputSchema>;


const StudySessionSchema = z.object({
  date: z.string().describe("The date for the study session in 'YYYY-MM-DD' format."),
  topic: z.string().describe('The specific topic to study.'),
  objective: z.string().describe('A concise, measurable objective for the study session. What should the student be able to do after this session?'),
  startTime: z.string().describe("The start time of the study session in 'HH:mm' format (24-hour)."),
  endTime: z.string().describe("The end time of the study session in 'HH:mm' format (24-hour). Duration must be at least 2 hours."),
});

const GeneratePersonalizedStudyPlanOutputSchema = z.object({
  studyPlan: z.array(StudySessionSchema).describe('A structured calendar of study sessions for the next 7 days.'),
});
export type GeneratePersonalizedStudyPlanOutput = z.infer<typeof GeneratePersonalizedStudyPlanOutputSchema>;
export type StudySession = z.infer<typeof StudySessionSchema>;

export async function generatePersonalizedStudyPlan(input: GeneratePersonalizedStudyPlanInput): Promise<GeneratePersonalizedStudyPlanOutput> {
  return generatePersonalizedStudyPlanFlow(input);
}

const generatePersonalizedStudyPlanPrompt = ai.definePrompt({
  name: 'generatePersonalizedStudyPlanPrompt',
  input: {schema: GeneratePersonalizedStudyPlanInputSchema},
  output: {schema: GeneratePersonalizedStudyPlanOutputSchema},
  prompt: `You are an AI study plan generator. Create a 7-day personalized study calendar for a student based on their weaknesses, strengths, upcoming exams, and preferred study methods.

  Student Name: {{{studentName}}}
  Weaknesses: {{#each weaknesses}}{{{this}}}, {{/each}}
  Strengths: {{#each strengths}}{{{this}}}, {{/each}}
  Upcoming Exams: {{#each upcomingExams}}{{{this}}}, {{/each}}
  Study Methods: {{#each studyMethods}}{{{this}}}, {{/each}}

  Generate a detailed 7-day study plan as a calendar.
  - Each day must have at least one study session.
  - Each session must have a specific topic, a clear objective, a start time, and an end time.
  - Each study session must be a minimum of 2 hours long.
  - Prioritize weaknesses, but also include revision of strengths.
  - Schedule sessions strategically based on upcoming exams.
  - Start the plan from today's date.
  - The output must be a JSON object matching the provided schema.
  `,
});

const generatePersonalizedStudyPlanFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedStudyPlanFlow',
    inputSchema: GeneratePersonalizedStudyPlanInputSchema,
    outputSchema: GeneratePersonalizedStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await generatePersonalizedStudyPlanPrompt(input);
    return output!;
  }
);
