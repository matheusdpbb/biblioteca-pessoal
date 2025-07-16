"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

const ecommerceSchema = z.object({
  category: z.array(z.string()).describe("Categorias de produtos relevantes"),
  priceRange: z.object({
    min: z.number().optional(),
    max: z.number().optional()
  }).describe("Faixa de preço sugerida"),
  brand: z.array(z.string()).optional().describe("Marcas recomendadas"),
  features: z.array(z.string()).describe("Características/recursos desejados"),
  urgency: z.enum(["low", "medium", "high", "immediate"])
    .describe("Urgência da compra"),
  season: z.enum(["spring", "summer", "fall", "winter", "year-round"])
    .optional().describe("Sazonalidade do produto"),
  targetAudience: z.enum(["kids", "teens", "adults", "seniors", "all"])
    .describe("Público-alvo identificado"),
  shoppingIntent: z.enum(["browsing", "comparing", "ready_to_buy", "gift"])
    .describe("Intenção de compra detectada"),
  recommendations: z.array(z.object({
    product: z.string(),
    reason: z.string(),
    confidence: z.number().min(0).max(1)
  })).describe("Recomendações específicas de produtos")
});

export async function generateEcommerceFilters(
  searchQuery: string, 
  userHistory?: string,
  budget?: string
) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      system: `Você é um assistente de compras inteligente especializado em e-commerce.
                Analise a consulta do usuário e gere filtros otimizados para encontrar produtos ideais.
                
                Considere:
                - Intenção de compra real vs. navegação casual
                - Sazonalidade e tendências atuais
                - Relação custo-benefício
                - Compatibilidade com histórico de compras
                - Urgência da necessidade
                
                Data atual: ${new Date().toISOString().split('T')[0]}
                Época do ano: ${new Date().toLocaleDateString('pt-BR', { month: 'long' })}
                ${budget ? `Orçamento informado: ${budget}` : ''}`,
      schema: ecommerceSchema,
      prompt: `Consulta de busca: ${searchQuery}
               ${userHistory ? `Histórico de compras: ${userHistory}` : ''}`,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { shoppingFilters: stream.value };
}