"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

const careerSchema = z.object({
  jobRecommendations: z.array(z.object({
    title: z.string(),
    company: z.string().optional(),
    industry: z.string(),
    matchScore: z.number().min(0).max(100),
    salaryRange: z.string(),
    location: z.string(),
    remote: z.boolean(),
    requirements: z.array(z.string()),
    growthPotential: z.enum(["low", "medium", "high", "excellent"])
  })).describe("Vagas recomendadas"),
  
  skillGaps: z.array(z.object({
    skill: z.string(),
    importance: z.enum(["nice-to-have", "important", "critical"]),
    timeToLearn: z.string(),
    resources: z.array(z.string())
  })).describe("Lacunas de habilidades identificadas"),
  
  careerPath: z.object({
    currentLevel: z.string(),
    nextStep: z.string(),
    longTermGoal: z.string(),
    timeline: z.string(),
    milestones: z.array(z.string())
  }).describe("Trajetória de carreira sugerida"),
  
  industries: z.array(z.object({
    name: z.string(),
    growth: z.enum(["declining", "stable", "growing", "booming"]),
    fit: z.number().min(0).max(100),
    trends: z.array(z.string())
  })).describe("Indústrias recomendadas"),
  
  networking: z.object({
    events: z.array(z.string()),
    platforms: z.array(z.string()),
    professionals: z.array(z.string()),
    strategies: z.array(z.string())
  }).describe("Estratégias de networking"),
  
  education: z.array(z.object({
    type: z.enum(["course", "certification", "degree", "bootcamp", "workshop"]),
    title: z.string(),
    provider: z.string(),
    duration: z.string(),
    cost: z.string(),
    priority: z.enum(["low", "medium", "high", "urgent"])
  })).describe("Recomendações educacionais"),
  
  marketTrends: z.array(z.string()).describe("Tendências do mercado relevantes"),
  
  actionPlan: z.object({
    immediate: z.array(z.string()),
    shortTerm: z.array(z.string()),
    longTerm: z.array(z.string())
  }).describe("Plano de ação estruturado")
});

export async function generateCareerFilters(
  currentRole: string,
  experience: string,
  skills: string,
  goals: string,
  location?: string
) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      system: `Você é um consultor de carreira especializado com conhecimento do mercado de trabalho global.
                Analise o perfil profissional e forneça orientações estratégicas personalizadas.
                
                Considere:
                - Tendências atuais do mercado de trabalho
                - Demanda por habilidades específicas
                - Oportunidades de crescimento por setor
                - Impacto da tecnologia nas profissões
                - Equilíbrio entre estabilidade e crescimento
                - Possibilidades de trabalho remoto
                
                Data atual: ${new Date().toISOString().split('T')[0]}
                Ano: ${new Date().getFullYear()}
                ${location ? `Localização: ${location}` : 'Localização não especificada'}`,
      schema: careerSchema,
      prompt: `Cargo atual: ${currentRole}
               Experiência: ${experience}
               Habilidades: ${skills}
               Objetivos: ${goals}`,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { careerGuidance: stream.value };
}