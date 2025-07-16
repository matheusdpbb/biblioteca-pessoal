"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

const moderationSchema = z.object({
  isAppropriate: z.boolean().describe("Se o conteúdo é apropriado para a plataforma"),
  riskLevel: z.enum(["low", "medium", "high", "critical"])
    .describe("Nível de risco do conteúdo"),
  categories: z.array(z.enum([
    "spam", "hate_speech", "violence", "adult_content", 
    "misinformation", "harassment", "copyright", "safe"
  ])).describe("Categorias identificadas no conteúdo"),
  confidence: z.number().min(0).max(1)
    .describe("Confiança da análise (0-1)"),
  suggestedAction: z.enum([
    "approve", "flag_review", "auto_remove", "shadow_ban", "age_restrict"
  ]).describe("Ação recomendada"),
  explanation: z.string().describe("Explicação da decisão tomada"),
  sensitiveTopics: z.array(z.string()).optional()
    .describe("Tópicos sensíveis identificados")
});

export async function moderateContent(
  content: string,
  contentType: "text" | "image" | "video",
  userHistory?: string
) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      system: `Você é um sistema avançado de moderação de conteúdo para redes sociais.
                Analise o conteúdo com base nas diretrizes da comunidade.
                
                Diretrizes:
                - Priorize a segurança dos usuários
                - Considere contexto cultural e nuances
                - Balance liberdade de expressão com proteção
                - Seja consistente mas flexível para casos especiais
                - Considere o histórico do usuário quando disponível
                
                Tipo de conteúdo: ${contentType}
                Data da análise: ${new Date().toISOString()}`,
      schema: moderationSchema,
      prompt: `Conteúdo para análise: ${content}
               ${userHistory ? `Histórico do usuário: ${userHistory}` : ''}`,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { moderationResult: stream.value };
}