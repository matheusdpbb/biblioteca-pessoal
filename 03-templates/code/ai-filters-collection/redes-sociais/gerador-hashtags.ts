"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

const hashtagSchema = z.object({
  trending: z.array(z.string()).describe("Hashtags em alta relacionadas ao conteúdo"),
  niche: z.array(z.string()).describe("Hashtags específicas do nicho/comunidade"),
  branded: z.array(z.string()).describe("Hashtags de marca ou campanha"),
  location: z.array(z.string()).optional().describe("Hashtags de localização"),
  engagement_potential: z.enum(["low", "medium", "high", "viral"])
    .describe("Potencial de engajamento das hashtags sugeridas"),
  optimal_count: z.number().min(1).max(30)
    .describe("Número ideal de hashtags para este post"),
  best_time_to_post: z.string().describe("Melhor horário para postar com essas hashtags"),
  target_audience: z.string().describe("Audiência alvo identificada"),
  content_category: z.enum([
    "lifestyle", "business", "tech", "food", "travel", "fitness", 
    "art", "music", "education", "news", "entertainment"
  ]).describe("Categoria do conteúdo")
});

export async function generateSmartHashtags(
  postContent: string,
  userProfile: string,
  currentTrends?: string[]
) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      system: `Você é um especialista em marketing digital e algoritmos de redes sociais.
                Gere hashtags estratégicas que maximizem alcance e engajamento.
                
                Estratégias:
                - Mix de hashtags populares e de nicho
                - Considere tendências atuais
                - Balance competitividade com relevância
                - Adapte ao perfil do usuário
                - Otimize para descoberta orgânica
                
                Tendências atuais: ${currentTrends?.join(', ') || 'Não fornecidas'}
                Data: ${new Date().toISOString().split('T')[0]}
                Horário: ${new Date().toLocaleTimeString('pt-BR')}`,
      schema: hashtagSchema,
      prompt: `Conteúdo do post: ${postContent}
               Perfil do usuário: ${userProfile}`,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { hashtagStrategy: stream.value };
}