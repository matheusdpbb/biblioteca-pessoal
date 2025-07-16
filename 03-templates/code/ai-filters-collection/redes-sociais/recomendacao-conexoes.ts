"use server";

import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

const connectionSchema = z.object({
  suggested_users: z.array(z.object({
    user_id: z.string().describe("ID do usuário sugerido"),
    match_score: z.number().min(0).max(100).describe("Score de compatibilidade (0-100)"),
    connection_reason: z.string().describe("Motivo da sugestão"),
    mutual_interests: z.array(z.string()).describe("Interesses em comum"),
    interaction_probability: z.enum(["low", "medium", "high"])
      .describe("Probabilidade de interação")
  })).describe("Lista de usuários sugeridos"),
  
  networking_opportunities: z.array(z.object({
    event_type: z.string().describe("Tipo de evento ou oportunidade"),
    relevance_score: z.number().min(0).max(10),
    participants: z.array(z.string()).describe("Participantes relevantes")
  })).describe("Oportunidades de networking"),
  
  community_suggestions: z.array(z.string())
    .describe("Comunidades ou grupos recomendados"),
  
  engagement_strategy: z.object({
    best_approach: z.string().describe("Melhor abordagem para conexão"),
    conversation_starters: z.array(z.string()).describe("Sugestões de conversa"),
    optimal_timing: z.string().describe("Melhor momento para conectar")
  }).describe("Estratégia de engajamento"),
  
  growth_potential: z.enum(["low", "medium", "high", "exponential"])
    .describe("Potencial de crescimento da rede")
});

export async function generateConnectionRecommendations(
  userProfile: string,
  currentConnections: string[],
  interests: string[],
  professionalGoals?: string
) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-mini"),
      system: `Você é um algoritmo avançado de recomendação de conexões para redes sociais profissionais.
                Analise perfis e sugira conexões estratégicas que agreguem valor mútuo.
                
                Critérios de análise:
                - Compatibilidade profissional e pessoal
                - Potencial de colaboração
                - Diversidade de rede (evitar echo chambers)
                - Oportunidades de crescimento mútuo
                - Relevância geográfica e temporal
                
                Objetivos profissionais: ${professionalGoals || 'Não especificados'}
                Data: ${new Date().toISOString().split('T')[0]}`,
      schema: connectionSchema,
      prompt: `Perfil do usuário: ${userProfile}
               Conexões atuais: ${currentConnections.join(', ')}
               Interesses: ${interests.join(', ')}`,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { connectionRecommendations: stream.value };
}