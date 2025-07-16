"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

const healthSchema = z.object({
  symptoms: z.array(z.string()).describe("Sintomas identificados e categorizados"),
  
  urgencyLevel: z.enum(["low", "medium", "high", "emergency"])
    .describe("Nível de urgência médica"),
  
  recommendedActions: z.array(z.object({
    action: z.string(),
    priority: z.enum(["immediate", "within_24h", "within_week", "routine"]),
    description: z.string()
  })).describe("Ações recomendadas"),
  
  specialties: z.array(z.string()).describe("Especialidades médicas relevantes"),
  
  lifestyle: z.object({
    diet: z.array(z.string()),
    exercise: z.array(z.string()),
    sleep: z.array(z.string()),
    stress: z.array(z.string())
  }).describe("Recomendações de estilo de vida"),
  
  preventiveCare: z.array(z.object({
    exam: z.string(),
    frequency: z.string(),
    ageGroup: z.string(),
    importance: z.enum(["routine", "important", "critical"])
  })).describe("Cuidados preventivos recomendados"),
  
  riskFactors: z.array(z.object({
    factor: z.string(),
    level: z.enum(["low", "moderate", "high"]),
    mitigation: z.array(z.string())
  })).describe("Fatores de risco identificados"),
  
  mentalHealth: z.object({
    indicators: z.array(z.string()),
    resources: z.array(z.string()),
    techniques: z.array(z.string())
  }).describe("Aspectos de saúde mental"),
  
  emergencyContacts: z.array(z.object({
    service: z.string(),
    when: z.string(),
    contact: z.string()
  })).describe("Contatos de emergência relevantes"),
  
  disclaimer: z.string().describe("Aviso médico obrigatório")
});

export async function generateHealthFilters(
  healthConcern: string,
  age: string,
  gender: string,
  medicalHistory?: string,
  currentMedications?: string
) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      system: `Você é um assistente de triagem médica que fornece orientações gerais de saúde.
                IMPORTANTE: Você NÃO substitui consulta médica profissional.
                
                Diretrizes:
                - Sempre inclua disclaimer sobre consulta médica
                - Priorize segurança e encaminhamento profissional
                - Forneça informações educativas, não diagnósticos
                - Identifique sinais de alerta para emergências
                - Promova prevenção e cuidados gerais
                - Considere fatores demográficos e histórico
                
                AVISO: Esta análise é apenas informativa e educacional.
                Data: ${new Date().toISOString().split('T')[0]}`,
      schema: healthSchema,
      prompt: `Preocupação de saúde: ${healthConcern}
               Idade: ${age}
               Gênero: ${gender}
               ${medicalHistory ? `Histórico médico: ${medicalHistory}` : ''}
               ${currentMedications ? `Medicações atuais: ${currentMedications}` : ''}`,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { healthGuidance: stream.value };
}