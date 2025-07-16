"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

const feedSchema = z.object({
  interests: z.array(z.string()).describe("Interesses identificados do usuário"),
  contentTypes: z.array(z.enum(["video", "image", "text", "poll", "story"]))
    .describe("Tipos de conteúdo preferidos"),
  timePreference: z.enum(["morning", "afternoon", "evening", "night"])
    .optional().describe("Horário preferido para consumo"),
  engagement_score: z.number().min(0).max(10)
    .describe("Score de engajamento esperado (0-10)"),
  topics: z.array(z.string()).describe("Tópicos relevantes para o feed"),
  mood: z.enum(["inspirational", "funny", "educational", "news", "entertainment"])
    .describe("Humor/tom do conteúdo recomendado")
});

export async function generatePersonalizedFeed(
  userBehavior: string, 
  recentInteractions: string,
  timeOfDay: string
) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      system: `Você é um algoritmo de IA especializado em personalização de feed para redes sociais.
                Analise o comportamento do usuário e gere recomendações inteligentes.
                Horário atual: ${timeOfDay}
                Data: ${new Date().toISOString().split('T')[0]}
                
                Considere:
                - Padrões de engajamento
                - Horário de maior atividade
                - Tipos de conteúdo com melhor performance
                - Diversidade para evitar bolhas de filtro`,
      schema: feedSchema,
      prompt: `Comportamento do usuário: ${userBehavior}
               Interações recentes: ${recentInteractions}`,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { feedRecommendations: stream.value };
}