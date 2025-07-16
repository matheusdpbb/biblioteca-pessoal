"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

const streamingSchema = z.object({
  genres: z.array(z.string()).describe("Gêneros de filmes/séries recomendados"),
  mood: z.enum(["relaxing", "exciting", "romantic", "scary", "funny", "dramatic", "educational"])
    .describe("Humor/atmosfera desejada"),
  duration: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    preferred: z.enum(["short", "medium", "long", "binge-worthy"])
  }).describe("Duração preferida do conteúdo"),
  platform: z.array(z.enum(["netflix", "prime", "disney", "hbo", "youtube", "any"]))
    .describe("Plataformas disponíveis"),
  ageRating: z.enum(["all", "kids", "teens", "adults", "mature"])
    .describe("Classificação etária apropriada"),
  language: z.array(z.string()).describe("Idiomas preferidos"),
  releaseYear: z.object({
    from: z.number().optional(),
    to: z.number().optional(),
    preference: z.enum(["classic", "recent", "latest", "any"])
  }).describe("Período de lançamento"),
  watchContext: z.enum(["alone", "family", "friends", "date", "background"])
    .describe("Contexto de visualização"),
  contentType: z.array(z.enum(["movie", "series", "documentary", "anime", "reality", "comedy_special"]))
    .describe("Tipos de conteúdo recomendados"),
  recommendations: z.array(z.object({
    title: z.string(),
    platform: z.string(),
    matchScore: z.number().min(0).max(100),
    reason: z.string()
  })).describe("Recomendações específicas de conteúdo")
});

export async function generateStreamingFilters(
  userMood: string,
  availableTime: string,
  watchingWith?: string,
  previousWatched?: string[]
) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      system: `Você é um curador de conteúdo especializado em streaming e entretenimento.
                Analise o estado de espírito e contexto do usuário para sugerir o conteúdo perfeito.
                
                Considere:
                - Humor atual e necessidades emocionais
                - Tempo disponível e contexto social
                - Evitar repetições do histórico recente
                - Balancear descoberta com preferências conhecidas
                - Adequação ao momento do dia/semana
                
                Horário atual: ${new Date().toLocaleTimeString('pt-BR')}
                Dia da semana: ${new Date().toLocaleDateString('pt-BR', { weekday: 'long' })}
                Data: ${new Date().toISOString().split('T')[0]}`,
      schema: streamingSchema,
      prompt: `Estado de espírito: ${userMood}
               Tempo disponível: ${availableTime}
               ${watchingWith ? `Assistindo com: ${watchingWith}` : 'Assistindo sozinho'}
               ${previousWatched?.length ? `Assistido recentemente: ${previousWatched.join(', ')}` : ''}`,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { streamingRecommendations: stream.value };
}