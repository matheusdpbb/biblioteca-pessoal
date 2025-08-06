# 🔧 Frontend/Backend Debug & Comunicação

## 📋 Visão Geral

Esta pasta contém prompts especializados para identificação e correção de problemas de comunicação entre as camadas de aplicações full-stack (Frontend ↔ Backend ↔ Database).

## 🎯 Objetivo

Diagnosticar e corrigir de forma sistemática problemas críticos de comunicação entre:
- Comunicação Frontend com APIs Backend
- Processamento de dados no Backend
- Conexão e operações com Database
- Fluxo completo de dados entre todas as camadas
- Validação e tratamento de erros em cada ponto

## 📁 Prompts Disponíveis

### 🔍 [Prompt Frontend/Backend Debug](./prompt-frontend-backend-debug.md)
**Tipo**: Prompt diagnóstico sistemático
**Ideal para**: Debugging de problemas de comunicação críticos, análise de falhas em produção

**Características**:
- ✅ Análise sistemática da cadeia completa de comunicação
- ✅ Checklist de verificação por camadas (Frontend, Backend, Database)
- ✅ Metodologia estruturada de debugging
- ✅ Correções incrementais e testáveis
- ✅ Sistema de logging para monitoramento
- ✅ Documentação das correções implementadas

**Problemas que Resolve**:
- Erros de cadastro/registro de usuários
- Falhas na comunicação com APIs
- Problemas de autenticação/autorização
- Inconsistências de dados entre camadas
- Timeouts e problemas de conectividade
- Erros de validação e serialização
- Problemas de CORS e configuração
- Falhas em operações CRUD

## 🎯 Quando Usar

### Use este prompt quando:
- Fluxos críticos da aplicação não funcionam (cadastros, login, operações)
- Dados não chegam do frontend ao backend/database
- Erros intermitentes de comunicação
- Problemas após deploy ou alterações de configuração
- Inconsistências de dados entre camadas
- Timeouts frequentes em operações
- Códigos de erro HTTP inesperados
- Falhas de validação em qualquer camada

### Não use quando:
- Problemas puramente de interface/UX
- Otimizações de performance (use prompts de análise/otimização)
- Bugs específicos de lógica de negócio
- Problemas de CSS ou layout
- Implementação de novas funcionalidades

## 🚀 Como Usar

1. **Identifique o problema**: Colete logs, mensagens de erro e comportamento observado
2. **Copie o prompt completo** do arquivo de prompt
3. **Inicie um chat fresco** com sua IA de debugging
4. **Forneça contexto específico**: Código relevante, logs de erro, arquitetura atual
5. **Siga a metodologia sistemática** proposta pela IA
6. **Implemente correções incrementalmente** testando cada etapa
7. **Documente as soluções** para referência futura

## 💡 Metodologia de Debugging

### Princípios Fundamentais
- **Análise Sistemática**: Investigar toda a cadeia de comunicação
- **Isolamento de Camadas**: Testar cada componente separadamente
- **Correção Incremental**: Implementar e testar uma correção por vez
- **Logging Detalhado**: Adicionar logs em pontos críticos para debugging
- **Documentação**: Registrar todas as alterações e soluções

### Fluxo de Debugging
1. **Mapeamento**: Traçar o fluxo completo dos dados
2. **Coleta de Dados**: Reunir logs, códigos de erro e comportamentos
3. **Isolamento**: Testar cada camada independentemente
4. **Diagnóstico**: Identificar pontos de falha específicos
5. **Correção**: Implementar soluções targeted e testáveis
6. **Validação**: Confirmar que as correções resolvem o problema
7. **Prevenção**: Adicionar validações e logs para evitar reincidência

## 🔧 Tecnologias Cobertas

**Frontend**:
- React, Vue, Angular
- Axios, Fetch API
- Estados de loading/error
- Interceptadores HTTP
- Validação de formulários

**Backend**:
- Node.js, Express, Fastify
- APIs REST e GraphQL
- Middlewares e roteamento
- Autenticação/Autorização
- Validação de dados

**Database**:
- SQL (PostgreSQL, MySQL)
- NoSQL (MongoDB)
- ORMs (Prisma, Sequelize, Mongoose)
- Supabase, Firebase
- Queries e transações

## 🔗 Links Relacionados

- [Prompts AdonisJS Backend](../adonisjs-backend/) - Para correções específicas de backend AdonisJS
- [Prompts Supabase SQL Fixer](../supabase-sql-fixer/) - Para correções específicas de SQL no Supabase
- [Arquitetura Web Full-Stack](../arquitetura-web-fullstack/) - Para implementação de novas funcionalidades
- [Análise e Otimização](../analise-otimizacao/) - Para otimizações após correções

## 📅 Histórico de Versões

- **v1.0** - Versão inicial com metodologia sistemática de debugging
- **v1.0** - Criação do prompt especializado em comunicação frontend/backend/database

---

*🔧 Este prompt é projetado para resolver problemas críticos de comunicação em aplicações full-stack, seguindo uma metodologia sistemática e estruturada de debugging.*