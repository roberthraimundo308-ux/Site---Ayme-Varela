'use server';

import { cakeSuggestionAI, type CakeSuggestionInput, type CakeSuggestionOutput } from '@/ai/flows/cakeSuggestionAI';

export async function getAiCakeSuggestion(input: CakeSuggestionInput): Promise<CakeSuggestionOutput> {
  try {
    const result = await cakeSuggestionAI(input);
    return result;
  } catch (error) {
    console.error("AI suggestion failed:", error);
    throw new Error("Failed to get AI suggestion. Please try again.");
  }
}
