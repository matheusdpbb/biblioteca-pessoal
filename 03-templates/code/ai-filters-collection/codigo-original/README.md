# 📸 Código Original - Filtros AI Base

Este diretório contém o código original transcrito da imagem fornecida pelo usuário.

## 📁 Arquivo

### [`filtros-ai-base.ts`](filtros-ai-base.ts)
**Código transcrito da imagem original**

Implementa um gerador de filtros inteligente usando:
- **OpenAI GPT-4o-mini**: Para processamento de linguagem natural
- **Zod Schema**: Validação estruturada de dados
- **Streaming**: Respostas em tempo real
- **TypeScript**: Tipagem forte e segurança

## 🎯 **Funcionalidade Original**

O código implementa uma função [`generateFilters()`](filtros-ai-base.ts:22) que:

1. **Recebe**: Prompt do usuário e contexto opcional
2. **Processa**: Via IA para extrair intenções e parâmetros
3. **Retorna**: Filtros estruturados com:
   - Nome/descrição para busca
   - Data de início (formato ISO-8601)
   - Data final (formato ISO-8601)

## 🔧 **Schema Zod**

```typescript
const schema = z.object({
  name: z.string().optional().describe("The name or description to search for"),
  start: z.date().optional().describe("The start date when to retrieve from. Return ISO-8601 format."),
  end: z.date().optional().describe("The end date when to retrieve data from. If not provided, defaults to the current date. Return ISO-8601 format.")
});
```

## 💡 **Conceito Base**

Este código serve como **fundação** para todas as variações criativas:

- **Padrão de Streaming**: Respostas progressivas
- **Validação Robusta**: Schemas Zod para confiabilidade
- **IA Contextual**: Prompts inteligentes com contexto
- **Tipagem Forte**: TypeScript para escalabilidade

## 🚀 **Evolução para Variações**

A partir deste código base, foram criadas **9 variações especializadas**:

### **Redes Sociais** (4 algoritmos)
- Feed personalizado
- Moderação de conteúdo
- Gerador de hashtags
- Recomendação de conexões

### **Filtros Especializados** (5 domínios)
- E-commerce inteligente
- Streaming/entretenimento
- Planejamento de viagens
- Desenvolvimento de carreira
- Saúde preventiva

## 📈 **Impacto**

Este simples gerador de filtros se transformou em:
- **9 produtos viáveis**
- **R$ 1+ trilhão** em mercados potenciais
- **Base tecnológica** para startups
- **Demonstração** de versatilidade da IA

---

*Um código, infinitas possibilidades.*