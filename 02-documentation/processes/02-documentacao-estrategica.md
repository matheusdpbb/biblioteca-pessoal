# Prompt Universal de Documentação Estratégica Completa

## 🎯 Contexto
Você é um arquiteto de soluções fullstack enterprise especializado em criar documentação estratégica completa para projetos de software de grande escala. Sua expertise abrange metodologias ágeis, arquitetura de sistemas, bancos de dados, design patterns, DevOps e melhores práticas de desenvolvimento.

## 📋 Missão
Criar uma documentação estratégica completa e estruturada que sirva como "cérebro externo" para toda a equipe, eliminando ambiguidades, maximizando produtividade e garantindo qualidade em todas as fases do desenvolvimento.

## 🏗️ ESTRUTURA COMPLETA DE DOCUMENTAÇÃO

### PARTE 1: DOCUMENTAÇÃO ESTRATÉGICA ENTERPRISE

#### 1.1 Product Requirements Document (PRD)

**Visão Estratégica do Produto**
- **Problema de Negócio**: Quantifique o impacto (tempo, custo, eficiência)
- **Solução Proposta**: Visão de 3 anos, missão e proposta de valor única
- **Diferenciação Competitiva**: Mínimo 3 diferenciais únicos e sustentáveis
- **Validação de Mercado**: Dados de pesquisa, TAM/SAM/SOM, early adopters

**OKRs e KPIs Detalhados**
- **Objetivos Trimestrais**: 3 OKRs com Key Results mensuráveis
- **KPIs de Negócio**: 
  - Aquisição: CAC, conversion rate, trial-to-paid
  - Ativação: Time to value, onboarding completion
  - Retenção: Churn rate, retention cohorts, NPS
  - Receita: MRR, ARPU, LTV/CAC ratio
  - Referência: Viral coefficient, referral rate
- **Métricas de Produto**: 
  - Feature adoption rate
  - Daily/Monthly active users
  - Task completion rate
  - Error rates por funcionalidade
- **Benchmarks**: Comparação com top 3 competidores

**Personas e Jornadas Detalhadas**
- **Demografia Completa**: 
  - Idade, gênero, localização
  - Cargo, senioridade, tamanho da empresa
  - Renda, orçamento disponível
- **Perfil Psicográfico**: 
  - Valores pessoais e profissionais
  - Motivações e aspirações
  - Frustrações e pain points
  - Influenciadores de decisão
- **Comportamento Digital**: 
  - Dispositivos preferidos (mobile/desktop)
  - Plataformas e redes sociais
  - Horários de pico de uso
  - Preferências de comunicação
- **Jobs to be Done**: 
  - Funcionais: O que precisam realizar
  - Emocionais: Como querem se sentir
  - Sociais: Como querem ser percebidos
- **Jornada Completa do Usuário**:
  1. **Awareness**: Como descobrem a solução
  2. **Consideration**: Critérios de avaliação
  3. **Decision**: Fatores decisivos
  4. **Onboarding**: Primeiros passos
  5. **Adoption**: Uso regular
  6. **Advocacy**: Recomendação ativa

**Análise Competitiva Profunda**
- **Mapeamento de Concorrentes**:
  - Diretos: Mesma solução, mesmo público
  - Indiretos: Solução alternativa, mesmo problema
  - Potenciais: Podem entrar no mercado
- **Análise SWOT Detalhada**:
  - Strengths: Vantagens competitivas
  - Weaknesses: Pontos de melhoria
  - Opportunities: Tendências favoráveis
  - Threats: Riscos e ameaças
- **Estratégia de Posicionamento**:
  - Proposta de valor única
  - Mensagem principal
  - Diferenciação clara
- **Modelo de Pricing**:
  - Estratégia (freemium, trial, etc.)
  - Tiers e features por plano
  - Comparação com mercado

#### 1.2 Especificações Técnicas Completas

**Arquitetura de Sistema Detalhada**
```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
├─────────────────────────────────────────────────────────────┤
│  Framework: Next.js 14 (App Router)                         │
│  Estado: Zustand + React Query                              │
│  UI: Tailwind CSS + Shadcn/ui                              │
│  Build: Turbopack                                          │
│  Testing: Jest + React Testing Library + Playwright        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                             │
├─────────────────────────────────────────────────────────────┤
│  Protocolo: REST + GraphQL (híbrido)                       │
│  Auth: JWT + Refresh Tokens                                │
│  Rate Limiting: Redis-based                                │
│  Cache: Redis + CDN                                        │
│  API Versioning: URL path (/v1, /v2)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                               │
├─────────────────────────────────────────────────────────────┤
│  Platform: Supabase (PostgreSQL + Auth + Realtime)         │
│  Edge Functions: Deno runtime                              │
│  Background Jobs: pg_cron + queues                         │
│  File Storage: Supabase Storage                            │
│  Search: PostgreSQL full-text + pgvector                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE                            │
├─────────────────────────────────────────────────────────────┤
│  Hosting: Vercel (Frontend) + Supabase Cloud               │
│  CDN: Vercel Edge Network                                  │
│  Monitoring: Sentry + Vercel Analytics                     │
│  CI/CD: GitHub Actions                                     │
│  Secrets: Vercel Environment Variables                     │
└─────────────────────────────────────────────────────────────┘
```

**Technology Stack Decisions (ADRs)**

**ADR-001: Frontend Framework**
- **Decisão**: Next.js 14 com App Router
- **Contexto**: Necessidade de SSR/SSG, performance, SEO
- **Alternativas**: 
  - React + Vite: Mais simples, sem SSR nativo
  - Remix: Bom SSR, ecossistema menor
  - Gatsby: Focado em sites estáticos
- **Justificativa**: 
  - Server Components para performance
  - App Router para melhor DX
  - Vercel integration perfeita
  - Maior comunidade React
- **Consequências**: 
  - ✅ SEO otimizado, performance excelente
  - ⚠️ Vendor lock-in parcial com Vercel
  - ⚠️ Curva de aprendizado App Router

**ADR-002: Backend Platform**
- **Decisão**: Supabase
- **Contexto**: Backend completo com auth, database, realtime
- **Alternativas**:
  - Firebase: NoSQL, vendor lock-in Google
  - AWS Amplify: Muito complexo para o escopo
  - Custom backend: Muito tempo de desenvolvimento
- **Justificativa**:
  - PostgreSQL robusto e familiar
  - Auth pronto e seguro
  - Row Level Security nativo
  - Realtime subscriptions
  - Open source
- **Consequências**:
  - ✅ Desenvolvimento rápido
  - ✅ Features enterprise prontas
  - ⚠️ Dependência do serviço
  - ⚠️ Customizações limitadas

**API Design Completo**

**Estrutura de Endpoints RESTful**
```
# Autenticação
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
POST   /api/v1/auth/verify-email
GET    /api/v1/auth/me

# Gerenciamento de Usuários
GET    /api/v1/users/profile
PUT    /api/v1/users/profile
DELETE /api/v1/users/account
POST   /api/v1/users/avatar
PUT    /api/v1/users/preferences
GET    /api/v1/users/activity

# [Recurso Principal - Exemplo: Projects]
GET    /api/v1/projects              # Lista com paginação
POST   /api/v1/projects              # Criar novo
GET    /api/v1/projects/:id          # Detalhes
PUT    /api/v1/projects/:id          # Atualizar
DELETE /api/v1/projects/:id          # Deletar
POST   /api/v1/projects/:id/archive  # Arquivar
POST   /api/v1/projects/:id/restore  # Restaurar
GET    /api/v1/projects/:id/stats    # Estatísticas

# Busca e Filtros
GET    /api/v1/search?q=termo        # Busca global
GET    /api/v1/projects?filter[status]=active&sort=-created_at

# Webhooks
POST   /api/webhooks/stripe
POST   /api/webhooks/github
```

**Estrutura Request/Response Padronizada**

```typescript
// Request
interface ApiRequest<T> {
  headers: {
    'Content-Type': 'application/json';
    'Authorization': `Bearer ${token}`;
    'X-API-Version': 'v1';
    'X-Request-ID': string;
  };
  body: {
    data: T;
    metadata?: {
      timestamp: string;
      source?: string;
    };
  };
}

// Response Success
interface ApiResponse<T> {
  success: true;
  data: T;
  metadata: {
    timestamp: string;
    requestId: string;
    version: string;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Response Error
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{
      field?: string;
      message: string;
      code?: string;
    }>;
    stack?: string; // Apenas em desenvolvimento
  };
  metadata: {
    timestamp: string;
    requestId: string;
  };
}
```

### PARTE 2: ARQUITETURA WEB FULLSTACK

#### 2.1 Estrutura de Projeto Detalhada

**Frontend Structure**
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Grupo de rotas autenticadas
│   ├── (public)/          # Grupo de rotas públicas
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            
│   ├── ui/                # Componentes base (Shadcn)
│   ├── forms/             # Formulários reutilizáveis
│   ├── layouts/           # Layouts e containers
│   └── features/          # Componentes por feature
├── hooks/                 # Custom React hooks
│   ├── use-auth.ts       
│   ├── use-api.ts        
│   └── use-toast.ts      
├── lib/                   # Bibliotecas e utilities
│   ├── api/              # API client
│   ├── auth/             # Auth helpers
│   ├── utils/            # Funções utilitárias
│   └── validations/      # Schemas de validação
├── stores/                # Estado global (Zustand)
├── styles/                # Estilos globais
└── types/                 # TypeScript types
```

**Backend Structure (Supabase)**
```
supabase/
├── migrations/            # SQL migrations
│   ├── 00001_initial_schema.sql
│   ├── 00002_add_profiles.sql
│   └── 00003_add_rls_policies.sql
├── functions/             # Edge Functions
│   ├── webhook-handler/
│   ├── process-upload/
│   └── send-notification/
├── seed.sql              # Dados iniciais
└── config.toml           # Configuração local
```

#### 2.2 Database Design com Supabase

**Schema Principal**
```sql
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Para busca fuzzy
CREATE EXTENSION IF NOT EXISTS "unaccent"; -- Para busca sem acentos

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_full_name_trgm ON profiles USING gin(full_name gin_trgm_ops);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public profiles are viewable by everyone" 
    ON profiles FOR SELECT 
    USING (true);

CREATE POLICY "Users can update own profile" 
    ON profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Main resource table (example: projects)
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
    settings JSONB DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_tags ON projects USING gin(tags);

-- Full text search
ALTER TABLE projects ADD COLUMN search_vector tsvector;

CREATE FUNCTION projects_search_trigger() RETURNS trigger AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('portuguese', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('portuguese', COALESCE(NEW.description, '')), 'B');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_search
    BEFORE INSERT OR UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION projects_search_trigger();

CREATE INDEX idx_projects_search ON projects USING gin(search_vector);

-- RLS for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects" 
    ON projects FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create projects" 
    ON projects FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" 
    ON projects FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" 
    ON projects FOR DELETE 
    USING (auth.uid() = user_id);
```

**Functions e Procedures**
```sql
-- Function: Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Function: Search projects
CREATE OR REPLACE FUNCTION search_projects(search_query TEXT, user_uuid UUID)
RETURNS SETOF projects AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM projects
    WHERE user_id = user_uuid
    AND (
        search_vector @@ plainto_tsquery('portuguese', search_query)
        OR title ILIKE '%' || search_query || '%'
    )
    ORDER BY ts_rank(search_vector, plainto_tsquery('portuguese', search_query)) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Get user statistics
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE (
    total_projects BIGINT,
    active_projects BIGINT,
    archived_projects BIGINT,
    total_tags BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) FILTER (WHERE status != 'deleted'),
        COUNT(*) FILTER (WHERE status = 'active'),
        COUNT(*) FILTER (WHERE status = 'archived'),
        COUNT(DISTINCT unnest(tags))
    FROM projects
    WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### PARTE 3: PROCEDIMENTOS DE DESENVOLVIMENTO

#### 3.1 Git Workflow Completo

**Branch Strategy (GitFlow Adaptado)**
```
main (production)
├── develop (staging)
│   ├── feature/JIRA-123-user-authentication
│   ├── feature/JIRA-456-payment-integration
│   └── feature/JIRA-789-dashboard-redesign
├── hotfix/JIRA-321-critical-auth-fix
└── release/v1.2.0
```

**Commit Message Convention**
```bash
# Formato
<type>(<scope>): <subject>

<body>

<footer>

# Tipos permitidos
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Documentação
style:    Formatação (não afeta lógica)
refactor: Refatoração de código
perf:     Melhorias de performance
test:     Adição/correção de testes
build:    Build system ou dependências
ci:       CI/CD
chore:    Outras mudanças

# Exemplos
feat(auth): implement JWT refresh token rotation

- Add refresh token endpoint
- Implement token rotation logic
- Update auth middleware
- Add tests for token refresh

Closes #123

fix(api): handle null values in user profile update

Prevent crash when bio field is null

Fixes #456
```

**Pull Request Template**
```markdown
## 📋 Descrição
[Descreva claramente o que foi implementado/corrigido]

## 🎯 Tipo de Mudança
- [ ] 🐛 Bug fix (correção que resolve um problema)
- [ ] ✨ Nova feature (mudança que adiciona funcionalidade)
- [ ] 💥 Breaking change (mudança incompatível com versão anterior)
- [ ] 📚 Documentação
- [ ] 🎨 Refatoração
- [ ] ⚡ Performance

## 🧪 Como Testar
1. Clone a branch: `git checkout feature/...`
2. Instale dependências: `npm install`
3. Execute: `npm run dev`
4. Teste: [instruções específicas]

## ✅ Checklist
- [ ] Código segue os padrões do projeto
- [ ] Self-review realizado
- [ ] Comentários adicionados em código complexo
- [ ] Documentação atualizada
- [ ] Testes adicionados/atualizados
- [ ] Todos os testes passando
- [ ] Build sem erros
- [ ] Sem conflitos com develop

## 📸 Screenshots/Vídeos
[Se aplicável, adicione evidências visuais]

## 🔗 Issues Relacionadas
Closes #[número]
Relates to #[número]

## 📊 Performance Impact
- [ ] Sem impacto
- [ ] Melhoria de performance
- [ ] Possível degradação (justifique)

## 🚨 Deploy Notes
[Instruções especiais para deploy, se houver]
```

#### 3.2 Testing Strategy Completa

**Pirâmide de Testes**
```
         /\
        /  \      E2E Tests (10%)
       /____\     - Fluxos críticos completos
      /      \    - Playwright
     /________\   Integration Tests (20%)
    /          \  - API endpoints
   /____________\ - Database operations
  /              \ Unit Tests (70%)
 /________________\- Business logic
                   - Utilities
                   - Components
```

**Estrutura de Testes**
```typescript
// Unit Test Example
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = { email: 'test@example.com', name: 'Test' };
      
      // Act
      const user = await userService.createUser(userData);
      
      // Assert
      expect(user).toMatchObject({
        email: userData.email,
        name: userData.name,
        id: expect.any(String)
      });
    });

    it('should throw error for duplicate email', async () => {
      // Test implementation
    });
  });
});

// Integration Test Example
describe('POST /api/v1/auth/register', () => {
  it('should register new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'newuser@example.com',
        password: 'SecurePass123!',
        name: 'New User'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data.user');
    expect(response.body).toHaveProperty('data.token');
  });
});

// E2E Test Example
test('user can complete onboarding flow', async ({ page }) => {
  // Navigate to signup
  await page.goto('/signup');
  
  // Fill form
  await page.fill('[name="email"]', 'e2e@example.com');
  await page.fill('[name="password"]', 'TestPass123!');
  await page.click('button[type="submit"]');
  
  // Verify redirect to onboarding
  await expect(page).toHaveURL('/onboarding');
  
  // Complete onboarding steps
  // ...
});
```

**Coverage Requirements**
- **Overall**: Mínimo 80%
- **Critical paths**: 100%
- **New features**: 90%
- **Bug fixes**: Teste reproduzindo o bug + fix

#### 3.3 CI/CD Pipeline Completo

**GitHub Actions Workflow**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '18.x'

jobs:
  # 1. Qualidade de Código
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint code
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Format check
        run: npm run format:check

  # 2. Testes
  test:
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  # 3. Build
  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: .next

  # 4. Security Scan
  security:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v3
      
      - name: Run security audit
        run: npm audit --production
      
      - name: Run Snyk scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  # 5. E2E Tests
  e2e:
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          PLAYWRIGHT_BASE_URL: ${{ secrets.STAGING_URL }}

  # 6. Deploy to Staging
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [build, security]
    if: github.ref == 'refs/heads/develop'
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel Staging
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_SCOPE }}

  # 7. Deploy to Production
  deploy-production:
    runs-on: ubuntu-latest
    needs: [build, security, e2e]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_SCOPE }}
      
      - name: Notify deployment
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Production deployment completed!'
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### PARTE 4: DESIGN SYSTEM E UX

#### 4.1 Design Tokens Completo

```css
/* Design Tokens - CSS Variables */
:root {
  /* Colors - Primary Palette */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;

  /* Colors - Neutral Palette */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-gray-950: #030712;

  /* Colors - Semantic */
  --color-success: #10b981;
  --color-success-light: #34d399;
  --color-success-dark: #059669;
  
  --color-warning: #f59e0b;
  --color-warning-light: #fbbf24;
  --color-warning-dark: #d97706;
  
  --color-error: #ef4444;
  --color-error-light: #f87171;
  --color-error-dark: #dc2626;
  
  --color
Acessibilidade WCAG AA garantida
- [ ] Responsive design testado
- [ ] Animation guidelines definidas
- [ ] User flows mapeados

### Segurança e Performance
- [ ] Security headers configurados
- [ ] Authentication/authorization implementados
- [ ] Input validation em todas APIs
- [ ] Performance monitoring ativo
- [ ] Load testing realizado
- [ ] Backup strategy implementada

### Monitoramento e Manutenção
- [ ] APM configurado (Sentry)
- [ ] Logs centralizados
- [ ] Alertas configurados
- [ ] Dashboards criados
- [ ] Runbooks documentados
- [ ] Post-mortem template pronto

## 🚀 RESULTADO ESPERADO

Uma documentação que:

**Elimina Ambiguidades**
- Especificações técnicas precisas
- Regras de negócio claras
- Fluxos detalhados
- Decisões documentadas

**Acelera Desenvolvimento**
- Templates prontos
- Padrões estabelecidos
- Ferramentas configuradas
- Processos definidos

**Facilita Onboarding**
- Setup automatizado
- Documentação clara
- Exemplos práticos
- Mentoria estruturada

**Garante Qualidade**
- Testes automatizados
- Code review process
- Performance monitoring
- Security by design

**Suporta Escala**
- Arquitetura escalável
- Database otimizado
- Caching estratégico
- Load balancing ready

**Reduz Riscos**
- Backup automático
- Disaster recovery
- Compliance garantido
- Security first

## 💡 FORMATO DE RESPOSTA

Ao usar este prompt, organize a documentação em:

1. **Seções Claras**: Use headers hierárquicos
2. **Markdown Rico**: Tabelas, listas, code blocks
3. **Diagramas**: ASCII art ou Mermaid
4. **Exemplos**: Código real e funcional
5. **Checklists**: Para validação
6. **Links**: Entre seções relacionadas
7. **Versionamento**: Data e responsável

**Priorize**:
- Clareza sobre brevidade
- Exemplos sobre teoria
- Específico sobre genérico
- Prático sobre conceitual

## 🔄 MANUTENÇÃO CONTÍNUA

**Revisão Semanal**
- [ ] Atualizar status do projeto
- [ ] Revisar métricas e KPIs
- [ ] Documentar decisões tomadas
- [ ] Atualizar roadmap

**Revisão Mensal**
- [ ] Revisar arquitetura
- [ ] Atualizar dependências
- [ ] Avaliar performance
- [ ] Planejar melhorias

**Revisão Trimestral**
- [ ] Revisar OKRs
- [ ] Atualizar tech stack
- [ ] Avaliar ROI
- [ ] Planejar próximo trimestre

## 📚 RECURSOS ADICIONAIS

**Templates Incluídos**
- PRD Template
- API Documentation
- Database Schema
- Testing Strategy
- CI/CD Pipeline
- Post-mortem Template

**Ferramentas Recomendadas**
- **Documentação**: Notion, Confluence
- **Diagramas**: Draw.io, Mermaid
- **API**: Swagger, Postman
- **Monitoring**: Sentry, DataDog
- **Analytics**: Mixpanel, Amplitude

**Referências**
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [OWASP Security](https://owasp.org/www-project-top-ten/)

---

*Esta documentação é um documento vivo e deve ser atualizada continuamente conforme o projeto evolui. Última atualização: [Data] por [Responsável]*