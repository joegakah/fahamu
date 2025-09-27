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
  masteryLevel: z.enum(['weakness', 'average', 'stronghold']).describe("The student's mastery level for this topic. Base this on whether the topic is in the student's weaknesses or strengths list. Topics not in either list can be considered 'average'."),
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
  prompt: `You are an intelligent AI study plan generator. Create a balanced, 7-day personalized study calendar for a student that promotes learning without causing burnout.

  Student Name: {{{studentName}}}
  Weaknesses: {{#each weaknesses}}{{{this}}}, {{/each}}
  Strengths: {{#each strengths}}{{{this}}}, {{/each}}
  Upcoming Exams: {{#each upcomingExams}}{{{this}}}, {{/each}}
  Study Methods: {{#each studyMethods}}{{{this}}}, {{/each}}

  Generate a detailed 7-day study plan with the following rules:
  - Each day must have at least one study session.
  - Each session must have a specific topic, a clear objective, a start time, and an end time.
  - Each study session must be a minimum of 2 hours long.
  - To avoid mental overload, do not schedule more than one 'weakness' topic on the same day. Create a balanced schedule by mixing in 'average' and 'stronghold' topics.
  - Prioritize weaknesses over the week, but also include revision of strengths.
  - For each session, set the 'masteryLevel' to 'weakness', 'average', or 'stronghold' based on the student's provided lists.
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
