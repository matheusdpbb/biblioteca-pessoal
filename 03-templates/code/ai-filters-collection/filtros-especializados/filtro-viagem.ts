"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

const travelSchema = z.object({
  destinations: z.array(z.object({
    city: z.string(),
    country: z.string(),
    matchScore: z.number().min(0).max(100),
    bestSeason: z.string(),
    estimatedCost: z.enum(["budget", "mid-range", "luxury"]),
    highlights: z.array(z.string())
  })).describe("Destinos recomendados"),
  
  travelStyle: z.enum([
    "adventure", "relaxation", "cultural", "business", "romantic", 
    "family", "solo", "backpacking", "luxury", "eco-tourism"
  ]).describe("Estilo de viagem identificado"),
  
  budget: z.object({
    range: z.enum(["low", "medium", "high", "unlimited"]),
    currency: z.string(),
    breakdown: z.object({
      accommodation: z.string(),
      transport: z.string(),
      activities: z.string(),
      food: z.string()
    })
  }).describe("Orçamento estimado e distribuição"),
  
  duration: z.object({
    recommended: z.string(),
    minimum: z.string(),
    optimal: z.string()
  }).describe("Duração recomendada da viagem"),
  
  activities: z.array(z.string()).describe("Atividades recomendadas"),
  
  accommodation: z.array(z.enum([
    "hotel", "hostel", "airbnb", "resort", "camping", "boutique", "luxury"
  ])).describe("Tipos de acomodação sugeridos"),
  
  transport: z.object({
    toDestination: z.array(z.string()),
    local: z.array(z.string()),
    tips: z.array(z.string())
  }).describe("Opções de transporte"),
  
  bestTime: z.object({
    months: z.array(z.string()),
    weather: z.string(),
    events: z.array(z.string()).optional()
  }).describe("Melhor época para viajar"),
  
  requirements: z.object({
    visa: z.boolean(),
    vaccination: z.array(z.string()).optional(),
    documents: z.array(z.string())
  }).describe("Requisitos de viagem"),
  
  localTips: z.array(z.string()).describe("Dicas locais importantes")
});

export async function generateTravelFilters(
  travelDesire: string,
  budget: string,
  duration: string,
  travelers: string,
  currentLocation?: string
) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      system: `Você é um consultor de viagens especializado com conhecimento global.
                Analise as preferências do viajante e sugira destinos e experiências personalizadas.
                
                Considere:
                - Sazonalidade e clima ideal
                - Relação custo-benefício por região
                - Segurança e estabilidade política
                - Facilidade de acesso e logística
                - Experiências únicas vs. destinos populares
                - Requisitos de visto e documentação
                
                Data atual: ${new Date().toISOString().split('T')[0]}
                Mês atual: ${new Date().toLocaleDateString('pt-BR', { month: 'long' })}
                ${currentLocation ? `Localização atual: ${currentLocation}` : ''}`,
      schema: travelSchema,
      prompt: `Desejo de viagem: ${travelDesire}
               Orçamento: ${budget}
               Duração: ${duration}
               Viajantes: ${travelers}`,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { travelPlan: stream.value };
}