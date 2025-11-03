'use server';
/**
 * @fileOverview Player comparison AI agent.
 *
 * - comparePlayers - A function that handles the comparison of players.
 * - ComparePlayersInput - The input type for the comparePlayers function.
 * - ComparePlayersOutput - The return type for the comparePlayers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ComparePlayersInputSchema = z.object({
  player1Characteristics: z
    .string()
    .describe('Characteristics of the first player.'),
  player2Characteristics: z
    .string()
    .describe('Characteristics of the second player.'),
  comparisonMetric: z
    .string()
    .describe(
      'The metric to use for comparison (e.g., batting average, strike rate, wickets per match)'
    ),
});
export type ComparePlayersInput = z.infer<typeof ComparePlayersInputSchema>;

const ComparePlayersOutputSchema = z.object({
  comparisonSummary: z
    .string()
    .describe('A summary of the comparison between the two players.'),
  player1Score: z.number().describe('The score of player 1 based on the metric'),
  player2Score: z.number().describe('The score of player 2 based on the metric'),
  winningPlayer: z.string().describe('Which player is better.'),
});
export type ComparePlayersOutput = z.infer<typeof ComparePlayersOutputSchema>;

export async function comparePlayers(input: ComparePlayersInput): Promise<ComparePlayersOutput> {
  return comparePlayersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'comparePlayersPrompt',
  input: {schema: ComparePlayersInputSchema},
  output: {schema: ComparePlayersOutputSchema},
  prompt: `You are an expert cricket analyst. Compare two players based on their characteristics and a given metric.

Player 1 Characteristics: {{{player1Characteristics}}}
Player 2 Characteristics: {{{player2Characteristics}}}
Comparison Metric: {{{comparisonMetric}}}

Provide a detailed comparison summary highlighting the strengths and weaknesses of each player, and tell me which player is better based on the comparison metric.
Also compute a numeric score for each player based on the metric provided, then specify which player is better.`,
});

const comparePlayersFlow = ai.defineFlow(
  {
    name: 'comparePlayersFlow',
    inputSchema: ComparePlayersInputSchema,
    outputSchema: ComparePlayersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
