'use server';

/**
 * @fileOverview Analyzes student performance data to identify common areas of weakness across a class.
 *
 * - analyzeStudentPerformanceData - A function that analyzes student performance data and returns areas of weakness.
 * - AnalyzeStudentPerformanceDataInput - The input type for the analyzeStudentPerformanceData function.
 * - AnalyzeStudentPerformanceDataOutput - The return type for the analyzeStudentPerformanceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeStudentPerformanceDataInputSchema = z.object({
  studentPerformanceData: z
    .string()
    .describe(
      'Student performance data, including subjects, topics, and scores for each student.'
    ),
});
export type AnalyzeStudentPerformanceDataInput = z.infer<
  typeof AnalyzeStudentPerformanceDataInputSchema
>;

const AnalyzeStudentPerformanceDataOutputSchema = z.object({
  commonWeaknesses: z
    .string()
    .describe(
      'A summary of common areas of weakness across the class, including specific subjects and topics.'
    ),
});
export type AnalyzeStudentPerformanceDataOutput = z.infer<
  typeof AnalyzeStudentPerformanceDataOutputSchema
>;

export async function analyzeStudentPerformanceData(
  input: AnalyzeStudentPerformanceDataInput
): Promise<AnalyzeStudentPerformanceDataOutput> {
  return analyzeStudentPerformanceDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeStudentPerformanceDataPrompt',
  input: {schema: AnalyzeStudentPerformanceDataInputSchema},
  output: {schema: AnalyzeStudentPerformanceDataOutputSchema},
  prompt: `You are an AI assistant that analyzes student performance data to identify common weaknesses across a class.

  Analyze the following student performance data and identify common areas of weakness across the class, including specific subjects and topics.

  Student Performance Data: {{{studentPerformanceData}}}

  Provide a concise summary of the common weaknesses identified.
  `,
});

const analyzeStudentPerformanceDataFlow = ai.defineFlow(
  {
    name: 'analyzeStudentPerformanceDataFlow',
    inputSchema: AnalyzeStudentPerformanceDataInputSchema,
    outputSchema: AnalyzeStudentPerformanceDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
