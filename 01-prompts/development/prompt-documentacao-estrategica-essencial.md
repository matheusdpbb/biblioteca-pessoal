# 🚀 PROMPT: Sistema de Documentação Estratégica - VERSÃO ESSENCIAL

## CONTEXTO
Você é um especialista em arquitetura de software e documentação técnica. Sua missão é criar um **Sistema de Documentação Estratégica** essencial para este projeto, seguindo a metodologia que elimina alucinações de IA e maximiza a produtividade em desenvolvimento.

## OBJETIVO
Criar uma estrutura de documentação markdown organizada que servirá como "cérebro externo" para IAs, permitindo contexto perfeito sem sobrecarga de informações.

## ESTRUTURA ESSENCIAL

### 📁 CodeBase-Info/
Crie os seguintes arquivos com conteúdo detalhado:

1. **API-Design.md**
   - Endpoints completos com métodos HTTP
   - Estrutura de request/response
   - Códigos de status e tratamento de erros
   - Autenticação e autorização
   - Rate limiting e versionamento

2. **Authentication-Flow.md**
   - Fluxo completo de autenticação (diagramas em texto)
   - Tipos de tokens (access, refresh)
   - Middleware de autenticação
   - Políticas de segurança
   - Fluxos de logout e renovação

3. **Database-Schemas.md Supabase**
   - Estrutura completa das tabelas
   - Relacionamentos e foreign keys
   - Índices e constraints
   - Migrations necessárias
   - Queries otimizadas comuns

4. **Docker-Services.md**
   - Dockerfile completo
   - docker-compose.yml
   - Variáveis de ambiente
   - Volumes e networks
   - Scripts de build e deploy

### 📁 Implementation/
Crie os seguintes arquivos com conteúdo detalhado:

1. **Setup-Guide.md**
   - Pré-requisitos do sistema
   - Instalação passo a passo
   - Configuração do ambiente
   - Variáveis de ambiente
   - Comandos de inicialização

2. **Development-Workflow.md**
   - Git flow e branching strategy
   - Code review process
   - Padrões de commit
   - Estrutura de pastas
   - Convenções de nomenclatura

3. **Testing-Protocol.md**
   - Estratégia de testes (unit, integration, e2e)
   - Ferramentas de teste
   - Coverage mínimo exigido
   - Mocks e fixtures
   - Scripts de teste automatizado

4. **Deployment-Steps.md**
   - Processo de build
   - Ambientes (dev, staging, prod)
   - Scripts de deploy
   - Rollback procedures
   - Monitoramento pós-deploy

### 📁 Project-Info/
Crie os seguintes arquivos com conteúdo detalhado:

1. **Feature-Specifications.md**
   - User stories detalhadas
   - Critérios de aceitação
   - Wireframes em texto/ASCII
   - Fluxos de usuário
   - Regras de negócio

2. **PRD-Document.md**
   - Visão do produto
   - Objetivos e KPIs
   - Personas e casos de uso
   - Roadmap de features
   - Métricas de sucesso

3. **Security-Policy.md**
   - Políticas de segurança básicas
   - Vulnerabilidades comuns
   - Práticas de código seguro
   - Validação de inputs
   - Gestão de sessões

4. **Tech-Stack.md**
   - Tecnologias escolhidas e justificativas
   - Versões específicas
   - Dependências principais
   - Configurações básicas
   - Comandos essenciais

## INSTRUÇÕES ESPECÍFICAS

### 🎯 PARA CADA ARQUIVO:
1. **Seja EXTREMAMENTE detalhado** - inclua código, exemplos, comandos
2. **Use formatação markdown rica** - tabelas, listas, código blocks
3. **Inclua diagramas em texto** quando necessário (ASCII art, mermaid syntax)
4. **Adicione seções de troubleshooting** com problemas comuns
5. **Mantenha informações atualizadas** com datas de última modificação

### 🔧 PADRÕES OBRIGATÓRIOS:
- **Headers consistentes** com emojis para fácil navegação
- **Índice no início** de cada arquivo longo
- **Links internos** entre documentos relacionados
- **Seção "Quick Reference"** no final de cada arquivo
- **Tags de versão** para controle de mudanças

### 📋 TEMPLATE DE ESTRUTURA PARA CADA ARQUIVO:
```markdown
# 📄 [NOME DO ARQUIVO]

## 📋 Índice
- [Seção 1](#seção-1)
- [Seção 2](#seção-2)

## 🎯 Objetivo
[Propósito deste documento]

## 📖 Conteúdo Principal
[Conteúdo detalhado aqui]

## 🔧 Quick Reference
[Comandos/informações rápidas]

## 🔗 Links Relacionados
- [Documento relacionado](./outro-arquivo.md)

## 📅 Última Atualização
[Data] - [Descrição da mudança]
```

## RESULTADO ESPERADO
Ao final, devo ter uma estrutura essencial que permita:
- ✅ Contexto perfeito para qualquer IA
- ✅ Zero alucinações em desenvolvimento
- ✅ Onboarding rápido de novos desenvolvedores
- ✅ Referência técnica completa
- ✅ Base sólida para manutenção e evolução

## COMANDO DE EXECUÇÃO
**INICIE AGORA** criando todos os arquivos da estrutura acima com conteúdo completo e detalhado baseado nas informações do projeto atual.

---

*💡 Para projetos enterprise com necessidades avançadas, utilize a [Versão Enterprise](./prompt-documentacao-estrategica-enterprise.md) que inclui CI/CD, UI/UX, Performance e Compliance.*