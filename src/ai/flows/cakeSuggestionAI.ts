'use server';
/**
 * @fileOverview An AI agent that suggests personalized cake designs and flavor combinations
 *               based on user preferences and references existing cake models.
 *
 * - cakeSuggestionAI - A function that handles the cake suggestion process.
 * - CakeSuggestionInput - The input type for the cakeSuggestionAI function.
 * - CakeSuggestionOutput - The return type for the cakeSuggestionAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Replicating PRODUCTS array from the user's context for AI reference
const PRODUCTS = [
  { id: 1, name: "Sonho de Valsa", shortDesc: "Bolo de Sonho de valsa e ninho com morango", fullDesc: "Massa leve e delicadamente umedecida, recheada com o cremoso Ninho e pedaços de Sonho de Valsa, finalizado com morangos frescos selecionados. Uma combinação equilibrada, sofisticada e simplesmente irresistível!", sizes: "30 pedaços", doughs: "Branca", image: "https://lh3.googleusercontent.com/d/1snCVAPyLL_QzdfNvlTs62yQxu9jaz2yN", gallery: ["https://lh3.googleusercontent.com/d/1snCVAPyLL_QzdfNvlTs62yQxu9jaz2yN", "https://lh3.googleusercontent.com/d/1VNJ911k8uaovAH4TeQhGaIUWZx0Hmk3q", "https://lh3.googleusercontent.com/d/1dB5_RTAvpglXuwJ5u0lfjUZAozDHY_Vd", "https://lh3.googleusercontent.com/d/1cgAV1Ov7kCMXbONszZiq3POlufQE-sjc"] },
  { id: 2, name: "Sonho de Valsa", shortDesc: "Bolo de Sonho de valsa e ninho com morango", fullDesc: "Massa leve e delicadamente umedecida, recheada com o cremoso Ninho e pedaços de Sonho de Valsa, finalizado com morangos frescos selecionados. Uma combinação equilibrada, sofisticada e simplesmente irresistível!", sizes: "40 pedaços", doughs: "Preta", image: "https://lh3.googleusercontent.com/d/14ipoMX00Ism_CyhgQehtRP_TLPyEOSDA", gallery: ["https://lh3.googleusercontent.com/d/14ipoMX00Ism_CyhgQehtRP_TLPyEOSDA", "https://lh3.googleusercontent.com/d/1nZAGhjcOmW2apjfWp67vSD9ft_A7u6QP", "https://lh3.googleusercontent.com/d/1n554EaAOdfMMiYGjMVen0NBqn2tQoRNS", "https://lh3.googleusercontent.com/d/1AV7bXxBYOE3HfiPZ8fxUefvOCDbu5D2U"] },
  { id: 3, name: "Sonho de Valsa", shortDesc: "Bolo de Sonho de valsa e ninho com morango", fullDesc: "Massa leve e delicadamente umedecida, recheada com o cremoso Ninho e pedaços de Sonho de Valsa, finalizado com morangos frescos selecionados. Uma combinação equilibrada, sofisticada e simplesmente irresistível!", sizes: "Personalizado", doughs: "Mista", image: "https://lh3.googleusercontent.com/d/1HrHFWyHIodmP8Lz5AcFnYvom25fY-XxU", gallery: ["https://lh3.googleusercontent.com/d/1HrHFWyHIodmP8Lz5AcFnYvom25fY-XxU", "https://lh3.googleusercontent.com/d/13dHGbZ9a6MyVj3MIZMFUCwEidVwCPaJ1", "https://lh3.googleusercontent.com/d/1XZyeTgoEDyvZcDOdueNkR1TtmzeNRlRy", "https://lh3.googleusercontent.com/d/1GSpLCoh4BC8_fPjYyy3oJBCO8gRrv4-f"] },
  { id: 4, name: "Sonho de Valsa", shortDesc: "Bolo de Sonho de valsa e ninho com morango", fullDesc: "Massa leve e delicadamente umedecida, recheada com o cremoso Ninho e pedaços de Sonho de Valsa, finalizado com morangos frescos selecionados. Uma combinação equilibrada, sofisticada e simplesmente irresistível!", sizes: "40 pedaços", doughs: "Branca", image: "https://lh3.googleusercontent.com/d/11-YsMvkoT_KgeUzovjRs_DIpz72qBIby", gallery: ["https://lh3.googleusercontent.com/d/11-YsMvkoT_KgeUzovjRs_DIpz72qBIby", "https://lh3.googleusercontent.com/d/1pzzPLWplW3WRrksc0s5qkupuQ99Yizn1", "https://lh3.googleusercontent.com/d/1TIoqSi83V4ib6jgELV-O7AZ8N-3yj982", "https://lh3.googleusercontent.com/d/1qfObJA-HjUTQ5sr_tus_hueUPRoq51pZ"] },
  { id: 5, name: "Sonho de Valsa", shortDesc: "Bolo de Sonho de valsa e ninho com morango", fullDesc: "Massa leve e delicadamente umedecida, recheada com o cremoso Ninho e pedaços de Sonho de Valsa, finalizado com morangos frescos selecionados. Uma combinação equilibrada, sofisticada e simplesmente irresistível!", sizes: "30 pedaços", doughs: "Mista", image: "https://lh3.googleusercontent.com/d/1fOChb9u2sJog679ApfgKTF6T-9PTeWkv", gallery: ["https://lh3.googleusercontent.com/d/1fOChb9u2sJog679ApfgKTF6T-9PTeWkv", "https://lh3.googleusercontent.com/d/1oRquR3kNMA_miAqj0y7VKhzCpztISRJo", "https://lh3.googleusercontent.com/d/1yEhA1AdlR6jRQZpN06UWxsbdvcCwo1IO", "https://lh3.googleusercontent.com/d/10AkDu7bjzENqE2oPg-2v4I2mVBTw-jUS"] },
  { id: 6, name: "Sonho de Valsa", fullDesc: "Massa leve e delicadamente umedecida, recheada com o cremoso Ninho e pedaços de Sonho de Valsa, finalizado com morangos frescos selecionados. Uma combinação equilibrada, sofisticada e simplesmente irresistível!", sizes: "50 pedaços", doughs: "Preta", image: "https://lh3.googleusercontent.com/d/15QVssGzPXzQVyKKRor7NLRYViniOqneq", gallery: ["https://lh3.googleusercontent.com/d/15QVssGzPXzQVyKKRor7NLRYViniOqneq", "https://lh3.googleusercontent.com/d/170HoE49eUJxWxdsHxLsDjZpic4OzRxBm", "https://lh3.googleusercontent.com/d/1XhsobDV1CTf3I86uM-I3V4ZCdfSsP9uX", "https://lh3.googleusercontent.com/d/1YcUZ97LdtReWSRAcSdYX3KPBe9Gh9OXL"] }
];

const CakeSuggestionInputSchema = z.object({
  occasion: z.string().optional().describe('The occasion for the cake (e.g., Birthday, Wedding, Graduation).'),
  theme: z.string().optional().describe('The desired theme for the cake (e.g., Floral, Superhero, Minimalist).'),
  preferredFlavors: z.string().optional().describe('A comma-separated list of preferred flavors (e.g., Chocolate, Strawberry, Lemon).'),
});
export type CakeSuggestionInput = z.infer<typeof CakeSuggestionInputSchema>;

const CakeSuggestionOutputSchema = z.object({
  suggestedDesign: z.string().describe('A detailed description of the suggested cake design, including decoration elements.'),
  suggestedFlavors: z.string().describe('A description of the suggested flavor combination for the cake, including dough and fillings.'),
  reasoning: z.string().describe('An explanation for why this particular design and flavor combination were suggested, referencing user preferences and existing products.'),
  referencedProductIds: z.array(z.number()).describe('An array of IDs of existing products that inspired this suggestion.'),
});
export type CakeSuggestionOutput = z.infer<typeof CakeSuggestionOutputSchema>;

// Format the PRODUCTS array into a string for the LLM to reference
const formattedProducts = PRODUCTS.map(p =>
  `ID: ${p.id}, Name: "${p.name}", Short Description: "${p.shortDesc}", Sizes: "${p.sizes}", Doughs: "${p.doughs}"`
).join('\n');

const cakeSuggestionPrompt = ai.definePrompt({
  name: 'cakeSuggestionPrompt',
  input: { schema: CakeSuggestionInputSchema },
  output: { schema: CakeSuggestionOutputSchema },
  prompt: `You are an expert cake designer and flavor specialist for "SweetArt Atelier". Your goal is to provide personalized cake design and flavor suggestions based on customer preferences, always referencing existing products for inspiration.\n\nHere are examples of our previous creations. Use these as inspiration to create a unique suggestion, but do not simply duplicate them.\n--- Existing Products ---\n${formattedProducts}\n--- End Existing Products ---\n\nBased on the following customer preferences, suggest a cake design and flavor combination.\nOccasion: {{{occasion}}}\nTheme: {{{theme}}}\nPreferred Flavors: {{{preferredFlavors}}}\n\nYour suggestions should be creative yet feasible, and you must clearly explain your reasoning, specifically mentioning which existing products (by their ID) or elements from them inspired your new suggestion. If no specific products are directly referenced, explain why the suggestion is appropriate for the given preferences.\n\nExample Output Format:\n{\n  "suggestedDesign": "A two-tier cake with smooth white buttercream, adorned with edible silver dust and delicate fondant roses in shades of pale pink and white. A custom topper with the number '30' would be placed on top.",\n  "suggestedFlavors": "The bottom tier features a rich chocolate dough with a creamy hazelnut filling, while the top tier offers a light vanilla dough with fresh strawberry and Ninho filling.",\n  "reasoning": "For the '30th Birthday' occasion and 'Elegant' theme, a sophisticated two-tier design with classic elements like roses was chosen. The chocolate and hazelnut combination is a timeless favorite, inspired by the richness found in cakes like 'Sonho de Valsa' (ID: 2). The vanilla, strawberry, and Ninho combination provides a fresh contrast, echoing the fruit and cream elements from 'Sonho de Valsa' (ID: 1).",\n  "referencedProductIds": [1, 2]\n}\n`,
});

const cakeSuggestionAIFlow = ai.defineFlow(
  {
    name: 'cakeSuggestionAIFlow',
    inputSchema: CakeSuggestionInputSchema,
    outputSchema: CakeSuggestionOutputSchema,
  },
  async (input) => {
    const {output} = await cakeSuggestionPrompt(input);
    return output!;
  }
);

export async function cakeSuggestionAI(input: CakeSuggestionInput): Promise<CakeSuggestionOutput> {
  return cakeSuggestionAIFlow(input);
}
