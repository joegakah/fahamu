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

const GeneratePersonalizedStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('A detailed study plan tailored to the student, including topics to study, schedule, and study methods.'),
});
export type GeneratePersonalizedStudyPlanOutput = z.infer<typeof GeneratePersonalizedStudyPlanOutputSchema>;

export async function generatePersonalizedStudyPlan(input: GeneratePersonalizedStudyPlanInput): Promise<GeneratePersonalizedStudyPlanOutput> {
  return generatePersonalizedStudyPlanFlow(input);
}

const generatePersonalizedStudyPlanPrompt = ai.definePrompt({
  name: 'generatePersonalizedStudyPlanPrompt',
  input: {schema: GeneratePersonalizedStudyPlanInputSchema},
  output: {schema: GeneratePersonalizedStudyPlanOutputSchema},
  prompt: `You are an AI study plan generator. You will generate a personalized study plan for a student based on their weaknesses, strengths, upcoming exams, and preferred study methods.

  Student Name: {{{studentName}}}
  Weaknesses: {{#each weaknesses}}{{{this}}}, {{/each}}
  Strengths: {{#each strengths}}{{{this}}}, {{/each}}
  Upcoming Exams: {{#each upcomingExams}}{{{this}}}, {{/each}}
  Study Methods: {{#each studyMethods}}{{{this}}}, {{/each}}

  Generate a detailed study plan that addresses the student's weaknesses, prepares them for their upcoming exams, and incorporates their strengths and preferred study methods. The study plan should include specific topics to study, a suggested schedule, and recommended study methods for each topic. The plan should be formatted in markdown.
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
