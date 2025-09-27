'use server';
/**
 * @fileOverview Provides study method guidance tailored to a student's learning challenges and strengths.
 *
 * - provideStudyMethodGuidance - A function that suggests study methods and resources based on student data.
 * - ProvideStudyMethodGuidanceInput - The input type for the provideStudyMethodGuidance function.
 * - ProvideStudyMethodGuidanceOutput - The return type for the provideStudyMethodGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideStudyMethodGuidanceInputSchema = z.object({
  learningChallenges: z
    .string()
    .describe('Description of the student\'s learning challenges.'),
  strengths: z.string().describe('Description of the student\'s academic strengths.'),
  subjects: z.string().describe('Subjects the student is studying.'),
  topics: z.string().describe('Topics the student is currently studying within those subjects.'),
});
export type ProvideStudyMethodGuidanceInput = z.infer<typeof ProvideStudyMethodGuidanceInputSchema>;

const ProvideStudyMethodGuidanceOutputSchema = z.object({
  suggestedMethods: z
    .string()
    .describe('A list of suggested study methods tailored to the student.'),
  suggestedResources: z
    .string()
    .describe('A list of resources that would be helpful for the student.'),
});
export type ProvideStudyMethodGuidanceOutput = z.infer<typeof ProvideStudyMethodGuidanceOutputSchema>;

export async function provideStudyMethodGuidance(
  input: ProvideStudyMethodGuidanceInput
): Promise<ProvideStudyMethodGuidanceOutput> {
  return provideStudyMethodGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideStudyMethodGuidancePrompt',
  input: {schema: ProvideStudyMethodGuidanceInputSchema},
  output: {schema: ProvideStudyMethodGuidanceOutputSchema},
  prompt: `You are an AI study advisor.  A student will provide their learning challenges, strengths, subjects, and topics.

You will provide a list of study methods tailored to the student, and a list of resources that will be helpful.

Learning Challenges: {{{learningChallenges}}}
Strengths: {{{strengths}}}
Subjects: {{{subjects}}}
Topics: {{{topics}}}`,
});

const provideStudyMethodGuidanceFlow = ai.defineFlow(
  {
    name: 'provideStudyMethodGuidanceFlow',
    inputSchema: ProvideStudyMethodGuidanceInputSchema,
    outputSchema: ProvideStudyMethodGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
