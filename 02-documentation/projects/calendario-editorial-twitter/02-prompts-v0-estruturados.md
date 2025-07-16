# PROMPTS ESTRUTURADOS PARA V0.DEV - Sistema de Calendário Editorial Twitter

## 🚀 SEQUÊNCIA DE PROMPTS PARA DESENVOLVIMENTO

### PROMPT 1 - CONFIGURAÇÃO INICIAL DO PROJETO

```
Crie a estrutura inicial de um projeto SAAS em Next.js 14 com a seguinte organização:

ESTRUTURA DO PROJETO:
```
app/
├── (auth)/
│   ├── login/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── components/
│   │       ├── LoginForm.tsx
│   │       └── SocialLogin.tsx
│   ├── register/
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── RegisterForm.tsx
│   │       └── OnboardingSteps.tsx
│   └── layout.tsx
├── dashboard/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── actions.ts
│   └── components/
│       ├── WeeklyCalendar.tsx
│       ├── StatsCards.tsx
│       ├── RecentActivity.tsx
│       └── QuickActions.tsx
├── calendario/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── actions.ts
│   └── components/
│       ├── CalendarView.tsx
│       ├── PostCard.tsx
│       ├── FilterBar.tsx
│       └── CreatePostModal.tsx
├── criador/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── actions.ts
│   └── components/
│       ├── AgentWorkflow.tsx
│       ├── BrainstormAgent.tsx
│       ├── ValidationAgent.tsx
│       ├── CreationAgent.tsx
│       └── ReviewAgent.tsx
├── biblioteca/
│   ├── page.tsx
│   ├── actions.ts
│   └── components/
│       ├── ContentLibrary.tsx
│       ├── TemplateGrid.tsx
│       └── SearchFilters.tsx
├── analytics/
│   ├── page.tsx
│   ├── actions.ts
│   └── components/
│       ├── PerformanceCharts.tsx
│       ├── EngagementMetrics.tsx
│       └── ViralityScore.tsx
├── configuracoes/
│   ├── page.tsx
│   ├── marca/page.tsx
│   ├── integracoes/page.tsx
│   ├── billing/page.tsx
│   └── components/
│       ├── BrandSettings.tsx
│       ├── VoiceSettings.tsx
│       └── IntegrationCards.tsx
├── api/
│   ├── auth/
│   ├── agents/
│   ├── calendar/
│   ├── content/
│   └── analytics/
└── globals.css

components/ (componentes reutilizáveis)
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Badge.tsx
│   └── Avatar.tsx
├── forms/
│   ├── FormField.tsx
│   ├── SearchBar.tsx
│   └── FilterSelect.tsx
└── layout/
    ├── Header.tsx
    ├── Footer.tsx
    ├── DashboardHeader.tsx
    ├── Sidebar.tsx
    └── Navigation.tsx

public/
└── images/
    ├── logo/
    ├── icons/
    └── illustrations/
```

CONFIGURAÇÕES:
- Next.js 14 com App Router
- TypeScript
- Tailwind CSS
- Estrutura modular e escalável
- Suporte a Server Actions

IDENTIDADE VISUAL:
- Estilo: Tech/SaaS minimalista
- Cor primária: #3B82F6 (Azul Confiança)
- Tipografia: Inter (Google Fonts)
- Personalidade: Moderno, inovador, profissional e confiável

CONFIGURAÇÕES TÉCNICAS:
- Configurar Tailwind com paleta de cores personalizada
- Configurar Inter como fonte padrão
- Estrutura de pastas seguindo App Router
- TypeScript configurado com tipos rigorosos

Crie apenas a estrutura base com layout root, configurações iniciais do Tailwind, e arquivo de configuração do Next.js.
```

### PROMPT 2 - LANDING PAGE COMPLETA

```
Crie uma Landing Page completa para um SAAS de Calendário Editorial com IA para Twitter com:

OBJETIVO: Resolver o problema de criadores de conteúdo que gastam horas criando calendários editoriais manualmente, sem estratégia de viralização

PÚBLICO-ALVO: Criadores de conteúdo digital, agências de marketing, empresas SaaS, consultores de marketing digital

ESTRUTURA DA PÁGINA:
1. Header com navegação (Logo, Recursos, Preços, Login, Começar Grátis)
2. Hero section com proposta de valor e demonstração dos agentes IA
3. Seção "Como Funciona" (5 agentes IA trabalhando em conjunto)
4. Seção de benefícios (3 principais: Economia de Tempo, Potencial Viral, Consistência)
5. Seção de recursos únicos (AudioThread, HQ Thread, Agentes Especializados)
6. Seção de preços (4 planos: Freemium, Pro R$97, Agency R$297, Enterprise R$997)
7. Seção de depoimentos/casos de sucesso
8. CTA final com trial gratuito
9. Footer completo

IDENTIDADE VISUAL:
- Estilo: Tech/SaaS minimalista
- Cor primária: #3B82F6
- Tipografia: Inter
- Personalidade: Moderno, inovador, profissional

ORGANIZAÇÃO:
- Arquivo: app/page.tsx
- Componentes específicos em: app/components/
- Componentes reutilizáveis em: components/

TECNOLOGIAS:
- Next.js 14 + TypeScript
- Tailwind CSS
- Responsivo (mobile-first)
- Otimizado para conversão
- Animações suaves com Framer Motion (opcional)

CONTEÚDO ESPECÍFICO:
- Título Hero: "Crie Calendários Editoriais que Viralizam com IA"
- Subtítulo: "5 Agentes IA especializados trabalham juntos para criar conteúdo Twitter que engaja, converte e viraliza. Economize 15h/semana."
- CTA Principal: "Começar Grátis - 5 Posts/Mês"
- Benefícios: "80% menos tempo", "3x mais engajamento", "Conteúdo sempre relevante"

SEÇÃO AGENTES IA:
1. Agente Brainstorm - Pesquisa tendências e gera ideias criativas
2. Agente Validação - Analisa potencial viral e alinhamento de marca
3. Agente Criação - Produz conteúdo técnico com storytelling
4. Agente Humanização - Ajusta tom de voz e autenticidade
5. Agente Performance - Monitora métricas e otimiza estratégia

Inclua textos realistas, CTAs persuasivos e elementos visuais que demonstrem o poder da automação com IA.
```

### PROMPT 3 - SISTEMA DE AUTENTICAÇÃO COMPLETO

```
Crie o sistema completo de autenticação com onboarding para o SAAS de Calendário Editorial:

PÁGINAS:
1. Login (app/(auth)/login/page.tsx)
2. Registro (app/(auth)/register/page.tsx)
3. Layout compartilhado (app/(auth)/layout.tsx)

COMPONENTES ESPECÍFICOS:
- app/(auth)/login/components/LoginForm.tsx
- app/(auth)/login/components/SocialLogin.tsx
- app/(auth)/register/components/RegisterForm.tsx
- app/(auth)/register/components/OnboardingSteps.tsx

FUNCIONALIDADES LOGIN:
- Email e senha com validação
- Login social (Google, Twitter)
- "Lembrar-me" checkbox
- Link "Esqueci minha senha"
- Estados de loading e erro
- Redirecionamento pós-login

FUNCIONALIDADES REGISTRO:
- Formulário em etapas (3 steps)
- Step 1: Dados básicos (nome, email, senha)
- Step 2: Informações da marca (nome, setor, público-alvo)
- Step 3: Configuração inicial (tom de voz, objetivos)
- Validação em tempo real
- Progresso visual das etapas

ONBOARDING ESPECÍFICO:
- Definição da identidade da marca
- Seleção do tom de voz (Profissional, Descontraído, Técnico, Criativo)
- Definição do público-alvo
- Objetivos principais (Awareness, Leads, Vendas, Autoridade)
- Temas de interesse (Tech, Business, Marketing, etc.)

IDENTIDADE VISUAL:
- Estilo: Tech/SaaS minimalista
- Cor primária: #3B82F6
- Consistente com landing page
- Formulários bem espaçados
- Feedback visual claro

VALIDAÇÕES:
- Email obrigatório e formato válido
- Senha mínimo 8 caracteres com complexidade
- Confirmação de senha
- Nome da marca obrigatório
- Termos de uso e privacidade

LAYOUT COMPARTILHADO:
- Design centrado na tela
- Ilustração ou imagem de marca
- Progresso do onboarding
- Links de navegação entre login/registro

TECNOLOGIAS:
- React Hook Form para validação
- Zod para schema validation
- Estados de loading com spinners
- Toasts para feedback
- Navegação programática

Organize cada página em sua pasta específica com componentes isolados e reutilizáveis.
```

### PROMPT 4 - DASHBOARD PRINCIPAL

```
Crie o Dashboard principal após login com visão geral do calendário editorial:

ESTRUTURA:
- app/dashboard/page.tsx
- app/dashboard/layout.tsx
- app/dashboard/actions.ts
- app/dashboard/components/ (componentes específicos)

LAYOUT DO DASHBOARD:
- Header com navegação, notificações e perfil
- Sidebar com menu principal colapsável
- Área de conteúdo principal responsiva
- Cards de estatísticas em grid
- Calendário semanal compacto
- Área de ações rápidas

COMPONENTES ESPECÍFICOS:
- app/dashboard/components/StatsCards.tsx (métricas principais)
- app/dashboard/components/WeeklyCalendar.tsx (calendário da semana)
- app/dashboard/components/RecentActivity.tsx (atividades recentes)
- app/dashboard/components/QuickActions.tsx (ações rápidas)
- app/dashboard/components/UpcomingPosts.tsx (próximos posts)

COMPONENTES REUTILIZÁVEIS:
- components/layout/DashboardHeader.tsx
- components/layout/Sidebar.tsx
- components/ui/StatCard.tsx
- components/ui/ActivityItem.tsx

MÉTRICAS PRINCIPAIS (StatsCards):
- Posts criados este mês
- Taxa de engajamento média
- Posts com potencial viral
- Tempo economizado

CALENDÁRIO SEMANAL:
- Visualização dos próximos 7 dias
- Posts agendados por dia
- Status dos posts (Rascunho, Aprovado, Publicado)
- Indicadores visuais de performance

ATIVIDADES RECENTES:
- Posts criados pelos agentes IA
- Aprovações pendentes
- Métricas de performance
- Notificações importantes

AÇÕES RÁPIDAS:
- "Criar Calendário Semanal" (botão principal)
- "Revisar Posts Pendentes"
- "Ver Analytics Completo"
- "Configurar Nova Marca"

MENU SIDEBAR:
- Dashboard (ativo)
- Criador de Conteúdo
- Calendário Editorial
- Biblioteca de Conteúdo
- Analytics
- Configurações
- Suporte

FUNCIONALIDADES:
- Navegação responsiva
- Menu colapsável (mobile)
- Cards informativos com hover effects
- Loading states para dados
- Empty states quando necessário
- Notificações em tempo real

IDENTIDADE VISUAL:
- Estilo: Tech/SaaS minimalista
- Cor primária: #3B82F6
- Interface limpa e profissional
- Cards com sombras suaves
- Ícones consistentes (Lucide React)

DADOS MOCK REALISTAS:
- 47 posts criados este mês
- 8.4% taxa de engajamento média
- 12 posts com alto potencial viral
- 15.2 horas economizadas

Organize tudo na estrutura modular especificada com componentes bem isolados.
```

### PROMPT 5 - CRIADOR DE CONTEÚDO (FUNCIONALIDADE PRINCIPAL)

```
Crie a tela principal do Criador de Conteúdo com sistema de agentes IA:

FUNCIONALIDADE: Interface para criação de calendário editorial semanal usando 5 agentes IA especializados
OBJETIVO: Usuário define tema/objetivo e agentes trabalham em sequência para criar calendário completo

ESTRUTURA:
- app/criador/page.tsx
- app/criador/layout.tsx
- app/criador/actions.ts
- app/criador/components/

COMPONENTES ESPECÍFICOS:
- app/criador/components/AgentWorkflow.tsx (fluxo principal)
- app/criador/components/BrainstormAgent.tsx (agente 1)
- app/criador/components/ValidationAgent.tsx (agente 2)
- app/criador/components/CreationAgent.tsx (agente 3)
- app/criador/components/ReviewAgent.tsx (agente 4)
- app/criador/components/PerformanceAgent.tsx (agente 5)
- app/criador/components/WeeklyCalendarPreview.tsx
- app/criador/components/ContentPreview.tsx

FLUXO DE TRABALHO:
1. Usuário define tema/objetivo da semana
2. Agente Brainstorm gera ideias (com loading e progresso)
3. Agente Validação analisa e aprova/rejeita
4. Agente Criação produz conteúdo final
5. Agente Humanização ajusta tom de voz
6. Agente Performance sugere otimizações
7. Preview do calendário semanal completo

INTERFACE PRINCIPAL:
- Header com breadcrumbs e ações
- Área de input para tema/objetivo
- Visualização do fluxo de agentes (stepper)
- Área de preview em tempo real
- Painel lateral com configurações
- Botões de ação (Gerar, Revisar, Aprovar)

AGENTE BRAINSTORM:
- Input para tema da semana
- Configurações de criatividade
- Pesquisa de tendências (toggle)
- Loading com mensagens motivacionais
- Output: Lista de ideias criativas

AGENTE VALIDAÇÃO:
- Análise automática das ideias
- Score de potencial viral (1-10)
- Alinhamento com marca (%)
- Sugestões de melhoria
- Aprovação/rejeição com justificativa

AGENTE CRIAÇÃO:
- Produção de conteúdo final
- Aplicação de técnicas de copywriting
- Estruturação para Twitter (threads/posts)
- Adição de CTAs e hashtags
- Preview em formato Twitter

AGENTE HUMANIZAÇÃO:
- Ajuste de tom de voz
- Verificação de autenticidade
- Otimização para engajamento
- Sugestões de elementos visuais
- Finalização do conteúdo

AGENTE PERFORMANCE:
- Previsão de métricas
- Sugestões de horários
- Otimizações finais
- Score de viralidade
- Recomendações estratégicas

PREVIEW DO CALENDÁRIO:
- Visualização semanal (7 dias)
- Posts organizados por dia
- Preview visual estilo Twitter
- Status de cada post
- Métricas previstas

FUNCIONALIDADES AVANÇADAS:
- Salvamento automático de progresso
- Histórico de versões
- Exportação para diferentes formatos
- Integração com calendário
- Notificações de aprovação

ESTADOS DA INTERFACE:
- Estado inicial (aguardando input)
- Estados de loading para cada agente
- Estados de erro com retry
- Estado de sucesso com preview
- Estado de edição manual

IDENTIDADE VISUAL:
- Consistente com dashboard
- Cor primária: #3B82F6
- Foco na usabilidade
- Feedback visual claro
- Animações suaves entre etapas

DADOS MOCK:
- Tema exemplo: "Inovação em IA para Negócios"
- 14 posts gerados (2 por dia)
- Score viral médio: 8.2/10
- Tempo de geração: 3-5 minutos

Organize todos os componentes em suas pastas específicas com lógica bem separada.
```

### PROMPT 6 - CALENDÁRIO EDITORIAL

```
Crie a tela do Calendário Editorial com visualização e gestão de conteúdos:

FUNCIONALIDADE: Visualização mensal/semanal de todos os posts criados, com gestão de status e edição
OBJETIVO: Usuário visualiza, edita, aprova e agenda posts do calendário editorial

ESTRUTURA:
- app/calendario/page.tsx
- app/calendario/layout.tsx
- app/calendario/actions.ts
- app/calendario/components/

COMPONENTES ESPECÍFICOS:
- app/calendario/components/CalendarView.tsx (visualização principal)
- app/calendario/components/PostCard.tsx (card individual do post)
- app/calendario/components/FilterBar.tsx (filtros e busca)
- app/calendario/components/CreatePostModal.tsx (criação manual)
- app/calendario/components/EditPostModal.tsx (edição de posts)
- app/calendario/components/BulkActions.tsx (ações em lote)
- app/calendario/components/CalendarHeader.tsx (navegação de datas)

VISUALIZAÇÕES:
- Visualização Mensal (grid de 30 dias)
- Visualização Semanal (7 dias detalhados)
- Visualização Lista (lista cronológica)
- Visualização Kanban (por status)

INTERFACE PRINCIPAL:
- Header com navegação de datas (mês/semana)
- Filtros por status, tipo, agente criador
- Barra de busca por conteúdo
- Seletor de visualização
- Área principal do calendário
- Painel lateral com detalhes

CARD DO POST:
- Preview do conteúdo (primeiras linhas)
- Data e horário agendado
- Status visual (Rascunho, Aprovado, Publicado)
- Score de viralidade
- Agente que criou
- Ações rápidas (Editar, Duplicar, Deletar)
- Métricas de performance (se publicado)

FILTROS E BUSCA:
- Filtro por status (Todos, Rascunho, Aprovado, Publicado)
- Filtro por tipo (Post, Thread, Repost)
- Filtro por agente criador
- Filtro por score viral (Alto, Médio, Baixo)
- Busca por texto no conteúdo
- Filtro por data (período personalizado)

MODAL DE CRIAÇÃO:
- Criação manual de post
- Seleção de data/horário
- Editor de texto rico
- Preview em tempo real
- Configurações de publicação
- Salvamento como rascunho

MODAL DE EDIÇÃO:
- Edição completa do conteúdo
- Histórico de versões
- Comentários e notas
- Re-análise pelos agentes
- Aprovação/rejeição
- Agendamento/reagendamento

AÇÕES EM LOTE:
- Seleção múltipla de posts
- Aprovação em lote
- Mudança de status em massa
- Exportação selecionada
- Duplicação em lote
- Exclusão em massa

ESTADOS DOS POSTS:
- 🟡 Rascunho (criado pelos agentes, aguardando revisão)
- 🟢 Aprovado (revisado e aprovado para publicação)
- 🔵 Agendado (aprovado e com data/hora definida)
- ✅ Publicado (já publicado no Twitter)
- ❌ Rejeitado (não aprovado, com motivo)

MÉTRICAS VISUAIS:
- Score de viralidade (1-10) com cores
- Previsão de engajamento
- Melhor horário para publicar
- Hashtags sugeridas
- Elementos visuais recomendados

FUNCIONALIDADES AVANÇADAS:
- Arrastar e soltar para reagendar
- Duplicação rápida para outras datas
- Templates de posts recorrentes
- Integração com ferramentas de agendamento
- Exportação para CSV/PDF
- Notificações de aprovação pendente

NAVEGAÇÃO DE DATAS:
- Setas para navegar mês/semana
- Seletor de data rápido
- Botão "Hoje" para voltar ao atual
- Indicadores visuais de densidade de posts
- Mini calendário para navegação rápida

IDENTIDADE VISUAL:
- Consistente com dashboard
- Cores por status bem definidas
- Grid limpo e organizado
- Hover effects suaves
- Loading states para ações

DADOS MOCK:
- 47 posts no mês atual
- 12 aguardando aprovação
- 23 aprovados e agendados
- 8 já publicados
- 4 rejeitados com feedback

Organize todos os componentes com lógica bem separada e estados gerenciados adequadamente.
```

### PROMPT 7 - BIBLIOTECA DE CONTEÚDO

```
Crie a tela da Biblioteca de Conteúdo com gestão de templates e histórico:

FUNCIONALIDADE: Repositório de todos os conteúdos criados, templates, rascunhos e histórico
OBJETIVO: Usuário acessa, organiza, reutiliza e gerencia todo conteúdo criado

ESTRUTURA:
- app/biblioteca/page.tsx
- app/biblioteca/actions.ts
- app/biblioteca/components/

COMPONENTES ESPECÍFICOS:
- app/biblioteca/components/ContentLibrary.tsx (biblioteca principal)
- app/biblioteca/components/TemplateGrid.tsx (grid de templates)
- app/biblioteca/components/SearchFilters.tsx (busca e filtros)
- app/biblioteca/components/ContentCard.tsx (card de conteúdo)
- app/biblioteca/components/CreateTemplateModal.tsx (criar template)
- app/biblioteca/components/ContentPreview.tsx (preview detalhado)
- app/biblioteca/components/TagManager.tsx (gestão de tags)

SEÇÕES PRINCIPAIS:
- Todos os Conteúdos
- Templates Salvos
- Rascunhos
- Favoritos
- Histórico de Versões
- Lixeira

INTERFACE PRINCIPAL:
- Sidebar com categorias e filtros
- Área principal com grid/lista de conteúdos
- Barra de busca avançada
- Filtros rápidos (tags, tipo, data)
- Seletor de visualização (grid/lista)
- Ações em lote

CARD DE CONTEÚDO:
- Preview do texto (primeiras linhas)
- Thumbnail/preview visual
- Data de criação/modificação
- Tipo (Post, Thread, Template)
- Tags e categorias
- Score de performance (se publicado)
- Ações rápidas (Usar, Editar, Duplicar, Favoritar)
- Status de uso (Quantas vezes usado)

BUSCA AVANÇADA:
- Busca por texto completo
- Filtro por tipo de conteúdo
- Filtro por data (período)
- Filtro por performance (alto/médio/baixo engajamento)
- Filtro por agente criador
- Filtro por tags
- Ordenação (data, performance, uso)

TEMPLATES:
- Templates pré-criados pelo sistema
- Templates criados pelo usuário
- Templates da comunidade (futuro)
- Categorias (Educativo, Promocional, Storytelling, etc.)
- Variáveis personalizáveis
- Preview antes de usar

GESTÃO DE TAGS:
- Criação de tags personalizadas
- Tags automáticas por IA
- Cores para categorização
- Busca por tags
- Tags mais usadas
- Sugestões inteligentes

FUNCIONALIDADES:
- Duplicação rápida de conteúdos
- Criação de templates a partir de posts
- Histórico de versões com diff
- Restauração de versões anteriores
- Exportação em múltiplos formatos
- Importação de conteúdos externos

MODAL DE PREVIEW:
- Visualização completa do conteúdo
- Histórico de edições
- Métricas de performance
- Comentários e notas
- Ações (Editar, Duplicar, Usar como Template)
- Compartilhamento interno

AÇÕES EM LOTE:
- Seleção múltipla
- Adição de tags em massa
- Movimentação para pastas
- Exportação selecionada
- Exclusão em lote
- Criação de templates em lote

ORGANIZAÇÃO:
- Pastas personalizadas
- Sistema de favoritos
- Tags coloridas
- Filtros salvos
- Visualizações personalizadas
- Ordenação customizada

MÉTRICAS E INSIGHTS:
- Conteúdos mais performáticos
- Templates mais utilizados
- Tendências de criação
- Análise de tags
- Sugestões de reutilização
- ROI de conteúdos

ESTADOS DA INTERFACE:
- Estado vazio (primeira vez)
- Loading states
- Estados de erro
- Confirmações de ações
- Feedback de sucesso
- Paginação inteligente

IDENTIDADE VISUAL:
- Grid responsivo e limpo
- Cards com hover effects
- Sistema de cores por categoria
- Ícones consistentes
- Tipografia hierárquica
- Espaçamento adequado

DADOS MOCK:
- 156 conteúdos na biblioteca
- 23 templates salvos
- 8 rascunhos pendentes
- 34 conteúdos favoritados
- 12 tags personalizadas
- 89% de taxa de reutilização

Organize todos os componentes com foco na experiência de busca e descoberta de conteúdo.
```

### PROMPT 8 - ANALYTICS E PERFORMANCE

```
Crie a tela de Analytics com métricas detalhadas de performance:

FUNCIONALIDADE: Dashboard completo de métricas, análises e insights de performance dos conteúdos
OBJETIVO: Usuário monitora performance, identifica padrões e otimiza estratégia de conteúdo

ESTRUTURA:
- app/analytics/page.tsx
- app/analytics/actions.ts
- app/analytics/components/

COMPONENTES ESPECÍFICOS:
- app/analytics/components/PerformanceCharts.tsx (gráficos principais)
- app/analytics/components/EngagementMetrics.tsx (métricas de engajamento)
- app/analytics/components/ViralityScore.tsx (análise de viralidade)
- app/analytics/components/ContentInsights.tsx (insights de conteúdo)
- app/analytics/components/TrendAnalysis.tsx (análise de tendências)
- app/analytics/components/CompetitorBenchmark.tsx (comparação)
- app/analytics/components/RecommendationEngine.tsx (recomendações)

MÉTRICAS PRINCIPAIS:
- Total de impressões
- Taxa de engajamento média
- Crescimento de seguidores
- Clicks em links
- Compartilhamentos
- Comentários e respostas
- Tempo médio de visualização
- Score de viralidade médio

GRÁFICOS E VISUALIZAÇÕES:
- Gráfico de linha: Engajamento ao longo do tempo
- Gráfico de barras: Performance por tipo de conteúdo
- Heatmap: Melhores horários para postar
- Gráfico de pizza: Distribuição de tipos de conteúdo
- Gráfico de área: Crescimento de métricas
- Scatter plot: Correlação viralidade x engajamento

ANÁLISE DE CONTEÚDO:
- Top 10 posts com melhor performance
- Posts com maior potencial viral realizado
- Análise de hashtags mais efetivas
- Temas que geram mais engajamento
- Formatos de maior sucesso (post vs thread)
- Análise de sentimento dos comentários

INSIGHTS INTELIGENTES:
- Padrões de horários ótimos
- Dias da semana com melhor performance
- Temas em alta para seu nicho
- Sugestões de otimização
- Alertas de queda de performance
- Oportunidades identificadas pela IA

COMPARAÇÃO E BENCHMARKS:
- Performance vs período anterior
- Comparação com média do setor
- Benchmark com concorrentes (anonimizado)
- Evolução de métricas-chave
- Ranking de performance por categoria
- Análise de gaps e oportunidades

FILTROS E PERÍODOS:
- Seletor de período (7d, 30d, 90d, 1a, personalizado)
- Filtro por tipo de conteúdo
- Filtro por agente criador
- Filtro por tags/categorias
- Comparação entre períodos
- Segmentação por audiência

RECOMENDAÇÕES IA:
- Sugestões de horários ótimos
- Temas para próximos conteúdos
- Formatos recomendados
- Hashtags sugeridas
- Frequência ideal de postagem
- Otimizações específicas

RELATÓRIOS:
- Relatório semanal automatizado
- Relatório mensal detalhado
- Exportação de dados (CSV, PDF)
- Relatórios personalizados
- Agendamento de relatórios
- Compartilhamento de insights

ALERTAS E NOTIFICAÇÕES:
- Alertas de performance excepcional
- Notificações de queda de engajamento
- Alertas de oportunidades
- Lembretes de análise
- Notificações de tendências
- Alertas de concorrência

INTERFACE PRINCIPAL:
- Cards de métricas principais no topo
- Grid de gráficos responsivo
- Sidebar com filtros
- Área de insights e recomendações
- Seção de top performers
- Footer com resumo executivo

MÉTRICAS AVANÇADAS:
- ROI de conteúdo (se aplicável)
- Lifetime value por tipo de post
- Taxa de conversão por conteúdo
- Custo por engajamento
- Valor por impressão
- Score de autoridade

ANÁLISE PREDITIVA:
- Previsão de performance
- Tendências futuras
- Sazonalidade identificada
- Projeções de crescimento
- Cenários otimistas/pessimistas
- Recomendações estratégicas

IDENTIDADE VISUAL:
- Gráficos com
IDENTIDADE VISUAL:
- Gráficos com paleta de cores consistente
- Cores semânticas (verde=sucesso, vermelho=alerta)
- Tipografia clara e hierárquica
- Cards com sombras suaves
- Responsividade em todos os gráficos
- Loading states para dados

DADOS MOCK REALISTAS:
- 45.2K impressões este mês (+23%)
- 8.7% taxa de engajamento média
- 1.2K novos seguidores (+15%)
- 89 clicks em links
- Score viral médio: 7.8/10
- Melhor horário: 14h-16h
- Melhor dia: Terça-feira

Organize todos os componentes com foco em insights acionáveis e visualizações claras.
```

### PROMPT 9 - CONFIGURAÇÕES E PERFIL

```
Crie a área completa de configurações do usuário e da marca:

ESTRUTURA:
- app/configuracoes/page.tsx (overview das configurações)
- app/configuracoes/layout.tsx
- app/configuracoes/marca/page.tsx
- app/configuracoes/integracoes/page.tsx
- app/configuracoes/billing/page.tsx
- app/configuracoes/components/

SUBPÁGINAS E COMPONENTES:
- app/configuracoes/components/ProfileForm.tsx
- app/configuracoes/components/PasswordForm.tsx
- app/configuracoes/components/BrandSettings.tsx
- app/configuracoes/components/VoiceSettings.tsx
- app/configuracoes/components/IntegrationCards.tsx
- app/configuracoes/components/BillingInfo.tsx
- app/configuracoes/components/SettingsNav.tsx

CONFIGURAÇÕES DE PERFIL:
- Editar informações pessoais (nome, email, foto)
- Alterar senha com validação
- Configurações de notificação (email, push, WhatsApp)
- Preferências de interface (tema, idioma)
- Fuso horário e localização
- Configurações de privacidade

CONFIGURAÇÕES DE MARCA:
- Nome da marca/empresa
- Logo e identidade visual
- Setor/nicho de atuação
- Público-alvo detalhado
- Valores e missão da marca
- Concorrentes principais

CONFIGURAÇÕES DE VOZ:
- Tom de voz (Profissional, Descontraído, Técnico, Criativo)
- Personalidade da marca (sliders para características)
- Palavras-chave obrigatórias
- Palavras/temas a evitar
- Exemplos de conteúdo de referência
- Diretrizes de comunicação

INTEGRAÇÕES:
- Twitter API (para publicação automática)
- WhatsApp Business (notificações)
- Google Analytics (métricas)
- Zapier (automações)
- Slack (notificações de equipe)
- Webhook personalizado

BILLING E PLANOS:
- Plano atual e uso
- Histórico de faturas
- Métodos de pagamento
- Upgrade/downgrade de plano
- Cancelamento de assinatura
- Cupons e descontos

FUNCIONALIDADES:
- Navegação entre seções com tabs
- Salvamento automático
- Validação em tempo real
- Preview de mudanças
- Confirmação para ações críticas
- Backup de configurações

LAYOUT:
- Sidebar com navegação de configurações
- Área principal com formulários organizados
- Breadcrumbs para navegação
- Botões de ação bem posicionados
- Feedback visual para mudanças
- Estados de loading e sucesso

IDENTIDADE VISUAL:
- Consistente com dashboard
- Formulários bem espaçados
- Feedback visual claro
- Cores semânticas para status
- Ícones intuitivos
- Tipografia hierárquica

Organize em estrutura modular com componentes isolados e validações robustas.
```

### PROMPT 10 - COMPONENTES REUTILIZÁVEIS

```
Crie a biblioteca completa de componentes reutilizáveis:

COMPONENTES UI BASE (components/ui/):
- Button.tsx (variantes: primary, secondary, outline, ghost, destructive)
- Input.tsx (com validação, ícones, estados de erro/sucesso)
- Card.tsx (container padrão com variantes)
- Modal.tsx (overlay, dialog, diferentes tamanhos)
- Badge.tsx (status, tags, cores semânticas)
- Avatar.tsx (foto de perfil, fallback, tamanhos)
- Tooltip.tsx (informações adicionais)
- Dropdown.tsx (menu suspenso)
- Tabs.tsx (navegação por abas)
- Progress.tsx (barras de progresso)

COMPONENTES DE FORMULÁRIO (components/forms/):
- FormField.tsx (wrapper para inputs com label e erro)
- SearchBar.tsx (busca global com sugestões)
- FilterSelect.tsx (filtros dropdown múltiplos)
- DatePicker.tsx (seletor de data/hora)
- TextEditor.tsx (editor rico para conteúdo)
- FileUpload.tsx (upload de imagens/arquivos)
- TagInput.tsx (input de tags com autocomplete)
- RangeSlider.tsx (seletor de faixa de valores)

COMPONENTES DE LAYOUT (components/layout/):
- Header.tsx (header público com navegação)
- Footer.tsx (footer público com links)
- DashboardHeader.tsx (header logado com perfil)
- Sidebar.tsx (menu lateral colapsável)
- Navigation.tsx (navegação principal)
- Breadcrumbs.tsx (navegação hierárquica)
- PageHeader.tsx (cabeçalho de páginas internas)
- Container.tsx (wrapper responsivo)

COMPONENTES DE DADOS (components/data/):
- DataTable.tsx (tabela com ordenação, filtros, paginação)
- StatCard.tsx (card de estatística com ícone)
- Chart.tsx (wrapper para gráficos)
- EmptyState.tsx (estado vazio com ilustração)
- LoadingSpinner.tsx (indicadores de carregamento)
- ErrorBoundary.tsx (tratamento de erros)
- Pagination.tsx (navegação de páginas)
- InfiniteScroll.tsx (carregamento infinito)

COMPONENTES ESPECÍFICOS DO DOMÍNIO (components/domain/):
- PostCard.tsx (card de post do Twitter)
- AgentStatus.tsx (status dos agentes IA)
- CalendarGrid.tsx (grid do calendário)
- ContentPreview.tsx (preview de conteúdo)
- ViralityScore.tsx (indicador de score viral)
- EngagementMetrics.tsx (métricas de engajamento)
- BrandVoice.tsx (indicador de tom de voz)
- ActivityFeed.tsx (feed de atividades)

CARACTERÍSTICAS TÉCNICAS:
- TypeScript com props tipadas e documentadas
- Variantes usando class-variance-authority
- Estados (loading, disabled, error, success)
- Acessibilidade (ARIA labels, keyboard navigation)
- Responsividade mobile-first
- Temas (light/dark) preparados
- Animações suaves com Framer Motion
- Testes unitários incluídos

SISTEMA DE DESIGN:
- Tokens de design consistentes
- Paleta de cores semânticas
- Tipografia escalável
- Espaçamentos padronizados
- Sombras e bordas consistentes
- Ícones da biblioteca Lucide React

DOCUMENTAÇÃO:
- Storybook para cada componente
- Exemplos de uso
- Props documentadas
- Variantes visuais
- Estados interativos
- Código de exemplo

IDENTIDADE VISUAL:
- Estilo: Tech/SaaS minimalista
- Cor primária: #3B82F6
- Sistema consistente e escalável
- Hover effects suaves
- Focus states acessíveis
- Loading states elegantes

Cada componente deve ser independente, reutilizável e seguir as melhores práticas de React e TypeScript.
```

---

## 🎯 SEQUÊNCIA RECOMENDADA DE DESENVOLVIMENTO

### FASE 1 - ESTRUTURA BASE (Semana 1)
1. **PROMPT 1**: Configuração inicial do projeto
2. **PROMPT 10**: Componentes reutilizáveis base
3. **PROMPT 2**: Landing page completa

### FASE 2 - AUTENTICAÇÃO E DASHBOARD (Semana 2)
4. **PROMPT 3**: Sistema de autenticação
5. **PROMPT 4**: Dashboard principal
6. **PROMPT 9**: Configurações básicas

### FASE 3 - FUNCIONALIDADES CORE (Semana 3)
7. **PROMPT 5**: Criador de conteúdo (funcionalidade principal)
8. **PROMPT 6**: Calendário editorial
9. **PROMPT 7**: Biblioteca de conteúdo

### FASE 4 - ANALYTICS E REFINAMENTOS (Semana 4)
10. **PROMPT 8**: Analytics e performance
11. Refinamentos e otimizações
12. Testes e validações

---

## 📝 NOTAS IMPORTANTES PARA DESENVOLVIMENTO

### MELHORES PRÁTICAS:
- Sempre seguir a estrutura de pastas definida
- Manter componentes isolados e reutilizáveis
- Implementar loading states e tratamento de erros
- Usar TypeScript rigorosamente
- Manter consistência visual em todas as telas

### DADOS MOCK:
- Usar dados realistas e consistentes
- Manter métricas coerentes entre telas
- Simular diferentes estados (vazio, carregando, erro)
- Incluir variações de conteúdo

### RESPONSIVIDADE:
- Mobile-first approach
- Breakpoints consistentes
- Navegação adaptada para mobile
- Touch-friendly interactions

### PERFORMANCE:
- Lazy loading de componentes
- Otimização de imagens
- Code splitting por rotas
- Memoização de componentes pesados

---

**Status**: 🚀 Prompts Estruturados Completos  
**Próximo Passo**: Desenvolvimento no v0.dev seguindo a sequência  
**Duração Estimada**: 4 semanas para MVP completo