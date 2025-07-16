# Prompt: Análise de Otimização de Projeto

## Objetivo
Realize uma análise técnica criteriosa do projeto, identificando oportunidades de otimização práticas e de alto impacto.

## Escopo da Análise
- Arquivos a analisar: todos os arquivos do projeto
- Profundidade: código-fonte, configurações, dependências

## Categorias de Otimização
Identifique melhorias nas seguintes áreas:
1. **Performance**: tempo de execução, uso de memória, queries
2. **Segurança**: vulnerabilidades, validações, autenticação
3. **Manutenibilidade**: duplicação de código, complexidade, documentação
4. **Escalabilidade**: gargalos, limites de capacidade
5. **Experiência do Usuário**: tempos de resposta, fluxos de trabalho

## Critérios de Avaliação
Para cada otimização identificada, forneça:
- **Impacto**: Alto/Médio/Baixo (com justificativa quantitativa quando possível)
- **Complexidade**: Alta/Média/Baixa
- **Risco**: Potencial de introduzir bugs ou quebrar funcionalidades
- **Prioridade**: Baseada na relação benefício/complexidade

## Restrições
- ✅ Preservar toda funcionalidade existente
- ✅ Manter características visuais e de design
- ❌ Evitar refatorações extensivas
- ❌ Descartar propostas sem benefícios mensuráveis
- ❌ Ignorar otimizações que introduzam dependências complexas

## Formato do Relatório
Estruture o relatório com:

### 1. Resumo Executivo
- Total de otimizações encontradas
- Top 3 recomendações prioritárias
- Estimativa total de ganhos

### 2. Otimizações por Categoria
Para cada otimização:
```
**ID**: OPT-001
**Categoria**: Performance
**Arquivo(s)**: path/to/file.js
**Descrição**: Breve explicação do problema
**Solução**: Implementação proposta
**Impacto**: Alto - Redução de 70% no tempo de carregamento
**Complexidade**: Baixa
**Risco**: Baixo
**Código Exemplo**: (se aplicável)
```

### 3. Matriz de Priorização
Tabela ordenada por prioridade (Impacto vs Complexidade)

### 4. Roadmap de Implementação
Sequência recomendada considerando dependências

## Foco
Priorize exclusivamente otimizações que:
- Apresentem benefícios concretos e mensuráveis
- Possam ser implementadas incrementalmente
- Não exijam mudanças arquiteturais significativas
- Tenham baixo risco de regressão

## Exemplo de Uso

```
Por favor, realize uma análise de otimização focada em:
- Prioridade: Performance e Segurança
- Apenas otimizações de baixa/média complexidade
```

## Variações do Prompt

### Versão Rápida (Quick Scan)
"Identifique as 5 principais otimizações de performance de baixa complexidade"

### Versão Focada em Segurança
"Analise exclusivamente vulnerabilidades de segurança críticas e médias"

### Versão para Code Review
"Avalie a qualidade do código e sugira melhorias de manutenibilidade"