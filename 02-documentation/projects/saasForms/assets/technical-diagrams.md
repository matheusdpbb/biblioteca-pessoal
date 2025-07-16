# 📐 Technical Diagrams & Visual Assets
## YouForm - SaaS de Formulários Web

### 🎨 Design System Overview

Baseado na identidade visual apresentada na imagem de referência, o YouForm segue um design system moderno e acessível:

#### Paleta de Cores Principal
```css
/* YouForm Color Palette */
:root {
  /* Primary Colors */
  --primary-orange: #FF6B35;      /* Laranja vibrante - CTAs principais */
  --primary-teal: #4ECDC4;        /* Verde-azulado - Botões secundários */
  
  /* Neutral Colors */
  --background-cream: #FFF8F0;    /* Fundo principal suave */
  --background-white: #FFFFFF;    /* Cards e containers */
  --text-dark: #2C3E50;          /* Texto principal */
  --text-gray: #7F8C8D;          /* Texto secundário */
  --border-light: #E8E8E8;       /* Bordas sutis */
  
  /* Status Colors */
  --success-green: #27AE60;      /* Sucesso e confirmações */
  --warning-yellow: #F39C12;     /* Avisos e alertas */
  --error-red: #E74C3C;          /* Erros e validações */
  --info-blue: #3498DB;          /* Informações e dicas */
}
```

#### Typography Scale
```css
/* YouForm Typography */
.typography {
  /* Font Family */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Scale */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  
  /* Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### 🏗️ System Architecture Diagram

```mermaid
graph TB
    subgraph "User Layer"
        U1[👤 Form Creator]
        U2[👥 Form Respondent]
        U3[📊 Admin User]
    end
    
    subgraph "Presentation Layer"
        WEB[🌐 Web Application<br/>Next.js 14 + TypeScript]
        MOBILE[📱 Mobile Apps<br/>React Native]
        EMBED[🔗 Embeddable Forms<br/>Iframe + SDK]
    end
    
    subgraph "CDN & Edge"
        VERCEL[⚡ Vercel Edge Network]
        CACHE[💾 Edge Caching]
        STATIC[📁 Static Assets]
    end
    
    subgraph "API Gateway"
        API[🔌 API Routes<br/>Next.js API]
        AUTH[🔐 Authentication<br/>JWT + Supabase Auth]
        RATE[⏱️ Rate Limiting<br/>Redis]
        VALID[✅ Validation<br/>Zod Schemas]
    end
    
    subgraph "Business Logic"
        FORMS[📋 Form Service]
        RESP[📝 Response Service]
        ANALYTICS[📊 Analytics Service]
        NOTIF[🔔 Notification Service]
    end
    
    subgraph "Data Layer"
        SUPA[🗄️ Supabase<br/>PostgreSQL + Auth]
        REDIS[🔴 Redis<br/>Caching + Sessions]
        STORAGE[📁 Supabase Storage<br/>File Uploads]
    end
    
    subgraph "External Services"
        STRIPE[💳 Stripe<br/>Payments]
        EMAIL[📧 Resend<br/>Email Service]
        POSTHOG[📈 PostHog<br/>Analytics]
        SENTRY[🐛 Sentry<br/>Error Tracking]
    end
    
    U1 --> WEB
    U2 --> EMBED
    U3 --> MOBILE
    
    WEB --> VERCEL
    MOBILE --> VERCEL
    EMBED --> VERCEL
    
    VERCEL --> CACHE
    CACHE --> STATIC
    VERCEL --> API
    
    API --> AUTH
    API --> RATE
    API --> VALID
    
    AUTH --> FORMS
    VALID --> RESP
    RATE --> ANALYTICS
    API --> NOTIF
    
    FORMS --> SUPA
    RESP --> SUPA
    ANALYTICS --> REDIS
    NOTIF --> EMAIL
    
    SUPA --> STORAGE
    API --> STRIPE
    WEB --> POSTHOG
    API --> SENTRY
    
    style U1 fill:#FF6B35,color:#fff
    style U2 fill:#4ECDC4,color:#fff
    style U3 fill:#FF6B35,color:#fff
    style WEB fill:#FFF8F0,stroke:#FF6B35
    style SUPA fill:#4ECDC4,color:#fff
    style VERCEL fill:#000,color:#fff
```

### 📱 User Interface Mockups

#### 1. Landing Page Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📋 YouForm                    🏠 Home  📊 Templates  💰 Pricing  👤 Login    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🎯 Rated 5 ⭐ on Capterra →                                               │
│                                                                             │
│  The most affordable                        ┌─────────────────────────────┐ │
│  Typeform alternative                       │ 👋 Welcome! This is a live  │ │
│                                             │    Youform                  │ │
│  Youform is a form builder that provides   │                             │ │
│  UNLIMITED forms and responses for FREE.    │ Feel free to fill it out to │ │
│  You can add logic, custom domains, upload │ see how a published         │ │
│  files, embed forms on your website,       │ Youform looks and feels 👀  │ │
│  and much more 🤯                          │                             │ │
│                                             │                             │ │
│  [🚀 Create free account]                   │     [🎯 Let's Start]        │ │
│                                             │                             │ │
│  Have a Typeform URL? Import it now         │ or click here to open this  │ │
│                                             │ form in a new tab           │ │
│  ✅ Unlimited responses  ✅ No credit card required                        │ │
│                                                                             │ │
│  "Youform is an absolute joy to use."                                      │ │
│  👤 Pieter Levels                                                          │ │
│  Founder Nomadlist and RemoteOK                                            │ │
│  400k+ Followers on Twitter                                                │ │
│                                                                             │ │
│                    intuitive builder →                                     │ │
│                                                                             │ │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2. Dashboard Interface

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📋 YouForm    🏠 Dashboard  📊 Analytics  ⚙️ Settings  👤 Maria Silva       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  👋 Olá, Maria! Bem-vinda de volta                                          │
│                                                                             │
│  📊 Seus números hoje:                                                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │     15      │ │    127      │ │     89      │ │   70.1%     │          │
│  │   Forms     │ │   Views     │ │ Responses   │ │ Conv Rate   │          │
│  │   📈 +3     │ │   📈 +12    │ │   📈 +8     │ │   📈 +2.1%  │          │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                                             │
│  🎨 [+ Criar Novo Formulário]  📋 [Ver Templates]  📤 [Importar]           │
│                                                                             │
│  📋 Seus Formulários Recentes:                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 📝 Pesquisa de Satisfação do Cliente        🟢 Publicado           │   │
│  │    42 respostas • Criado há 3 dias • Taxa de conversão: 68.2%     │   │
│  │    [📊 Analytics] [✏️ Editar] [📤 Compartilhar] [⚙️ Configurar]    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 📞 Formulário de Contato                     🟡 Rascunho           │   │
│  │    0 respostas • Criado há 1 dia • Última edição: há 2 horas      │   │
│  │    [✏️ Continuar Editando] [👁️ Preview] [🚀 Publicar]              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🎓 Avaliação do Curso                        🟢 Publicado           │   │
│  │    156 respostas • Criado há 1 semana • Taxa de conversão: 82.1%  │   │
│  │    [📊 Analytics] [✏️ Editar] [📤 Compartilhar] [📋 Duplicar]      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  📈 Quick Stats:                                                            │
│  • Formulário mais popular: Pesquisa de Satisfação (42 respostas)          │
│  • Melhor taxa de conversão: Avaliação do Curso (82.1%)                    │
│  • Total de visualizações esta semana: 1,247                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 3. Form Builder Interface

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ← Voltar  📝 Pesquisa de Satisfação  [💾 Salvar] [👁️ Preview] [🚀 Publicar] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ 🎨 CAMPOS DISPONÍVEIS        │  📋 SEU FORMULÁRIO                          │
│                              │                                             │
│ 📝 Texto Simples             │  📝 Pesquisa de Satisfação do Cliente       │
│ 📧 Email                     │  Ajude-nos a melhorar nossos serviços       │
│ 📞 Telefone                  │                                             │
│ 📅 Data                      │  ┌─────────────────────────────────────────┐ │
│ 🔢 Número                    │  │ Como você avalia nosso atendimento? *   │ │
│ 📄 Texto Longo              │  │                                         │ │
│ ☑️ Múltipla Escolha          │  │ ⭐⭐⭐⭐⭐                              │ │
│ 🔘 Escolha Única             │  │ 1 = Muito ruim  5 = Excelente          │ │
│ ⭐ Avaliação                 │  └─────────────────────────────────────────┘ │
│ 📎 Arquivo                   │                                             │
│ ✅ Sim/Não                   │  ┌─────────────────────────────────────────┐ │
│                              │  │ Deixe seu comentário                    │ │
│ 🎨 ELEMENTOS VISUAIS         │  │ ┌─────────────────────────────────────┐ │ │
│                              │  │ │ Conte-nos sobre sua experiência...  │ │ │
│ 📏 Divisor                   │  │ │                                     │ │ │
│ 📄 Texto HTML                │  │ │                                     │ │ │
│ 🖼️ Imagem                    │  │ │                                     │ │ │
│ 📊 Gráfico                   │  │ └─────────────────────────────────────┘ │ │
│                              │  └─────────────────────────────────────────┘ │
│ 🔧 CONFIGURAÇÕES             │                                             │
│                              │  ┌─────────────────────────────────────────┐ │
│ 🎨 Design & Tema             │  │ Você nos recomendaria? *                │ │
│ ⚙️ Comportamento             │  │                                         │ │
│ 🔔 Notificações              │  │ ○ Sim, definitivamente                  │ │
│ 🔐 Privacidade               │  │ ○ Provavelmente sim                     │ │
│ 📊 Analytics                 │  │ ○ Não tenho certeza                     │ │
│                              │  │ ○ Provavelmente não                     │ │
│                              │  │ ○ Não, definitivamente não              │ │
│                              │  └─────────────────────────────────────────┘ │
│                              │                                             │
│                              │  [🚀 Enviar Pesquisa]                      │
│                              │                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 📊 Database Entity Relationship Diagram

```mermaid
erDiagram
    users ||--o{ profiles : "extends"
    users ||--o{ forms : "owns"
    users ||--o{ subscriptions : "has"
    users ||--o{ team_members : "belongs_to"
    
    forms ||--o{ responses : "receives"
    forms ||--o{ form_analytics : "tracks"
    forms ||--o{ form_shares : "shared_via"
    forms ||--o{ team_forms : "shared_with"
    
    responses ||--o{ response_files : "contains"
    
    teams ||--o{ team_members : "has"
    teams ||--o{ team_forms : "owns"
    
    users {
        uuid id PK
        string email UK
        string encrypted_password
        timestamp created_at
        timestamp updated_at
        jsonb raw_user_meta_data
        timestamp last_sign_in_at
        boolean email_confirmed
    }
    
    profiles {
        uuid id PK,FK
        string username UK
        string full_name
        string avatar_url
        text bio
        jsonb metadata
        timestamp created_at
        timestamp updated_at
    }
    
    forms {
        uuid id PK
        uuid user_id FK
        string title
        text description
        jsonb fields
        jsonb settings
        string status
        string[] tags
        tsvector search_vector
        integer response_count
        integer view_count
        timestamp created_at
        timestamp updated_at
        timestamp published_at
    }
    
    responses {
        uuid id PK
        uuid form_id FK
        jsonb data
        jsonb metadata
        inet ip_address
        string user_agent
        string referrer
        string country_code
        string city
        timestamp submitted_at
    }
    
    form_analytics {
        uuid id PK
        uuid form_id FK
        date date
        integer views
        integer starts
        integer completions
        decimal completion_rate
        integer unique_visitors
        decimal bounce_rate
        interval avg_completion_time
        jsonb field_analytics
        jsonb traffic_sources
        jsonb device_analytics
        timestamp created_at
        timestamp updated_at
    }
    
    subscriptions {
        uuid id PK
        uuid user_id FK
        string stripe_customer_id UK
        string stripe_subscription_id UK
        string plan_name
        string status
        timestamp current_period_start
        timestamp current_period_end
        boolean cancel_at_period_end
        timestamp canceled_at
        timestamp trial_start
        timestamp trial_end
        jsonb metadata
        timestamp created_at
        timestamp updated_at
    }
    
    teams {
        uuid id PK
        string name
        text description
        uuid owner_id FK
        jsonb settings
        timestamp created_at
        timestamp updated_at
    }
    
    team_members {
        uuid id PK
        uuid team_id FK
        uuid user_id FK
        string role
        jsonb permissions
        timestamp joined_at
    }
    
    team_forms {
        uuid id PK
        uuid team_id FK
        uuid form_id FK
        uuid shared_by FK
        jsonb permissions
        timestamp shared_at
    }
    
    response_files {
        uuid id PK
        uuid response_id FK
        string field_id
        string filename
        string original_filename
        string mime_type
        bigint file_size
        string storage_path
        timestamp uploaded_at
    }
    
    form_shares {
        uuid id PK
        uuid form_id FK
        string share_token UK
        string password_hash
        timestamp expires_at
        integer max_responses
        integer current_responses
        jsonb settings
        timestamp created_at
    }
```

### 🔄 Data Flow Diagrams

#### Form Creation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant V as Validation
    participant D as Database
    participant C as Cache
    participant N as Notifications
    
    U->>F: Click "Create Form"
    F->>F: Open Form Builder
    U->>F: Design Form (drag & drop)
    F->>F: Update Local State
    U->>F: Click "Save"
    
    F->>A: POST /api/v1/forms
    A->>V: Validate Form Schema
    
    alt Validation Success
        V->>A: Schema Valid
        A->>D: INSERT form
        D->>A: Return Form ID
        A->>C: Cache Form Data
        A->>F: Return Success + Form
        F->>U: Show Success Message
        
        opt Auto-save enabled
            A->>N: Send Save Notification
        end
    else Validation Error
        V->>A: Schema Invalid
        A->>F: Return Validation Errors
        F->>U: Show Error Messages
    end
```

#### Form Response Flow

```mermaid
sequenceDiagram
    participant R as Respondent
    participant P as Public Form
    participant A as API
    participant V as Validation
    participant D as Database
    participant An as Analytics
    participant W as Webhooks
    participant E as Email
    
    R->>P: Access Form URL
    P->>A: GET /api/v1/forms/:id/public
    A->>D: Fetch Form Data
    D->>A: Return Form
    A->>P: Return Form Structure
    P->>R: Render Form
    
    R->>P: Fill Form Fields
    R->>P: Submit Form
    
    P->>A: POST /api/v1/forms/:id/responses
    A->>V: Validate Response Data
    
    alt Validation Success
        V->>A: Data Valid
        A->>D: INSERT response
        D->>A: Return Response ID
        
        par Analytics Update
            A->>An: Update Form Analytics
            An->>D: UPDATE analytics
        and Webhooks
            A->>W: Trigger Webhooks
            W->>W: Send to External URLs
        and Email Notifications
            A->>E: Send Notifications
            E->>E: Send to Form Owner
        end
        
        A->>P: Return Success
        P->>R: Show Thank You Page
    else Validation Error
        V->>A: Data Invalid
        A->>P: Return Errors
        P->>R: Show Error Messages
    end
```

### 🔐 Security Architecture

```mermaid
graph TB
    subgraph "External Threats"
        DDOS[🔥 DDoS Attacks]
        BOT[🤖 Bot Traffic]
        HACK[👨‍💻 Hackers]
        SPAM[📧 Spam]
    end
    
    subgraph "Perimeter Defense"
        WAF[🛡️ Web Application Firewall]
        CDN[🌍 CDN Protection]
        RATE[⏱️ Rate Limiting]
        GEO[🌎 Geo-blocking]
    end
    
    subgraph "Application Security"
        AUTH[🔐 Authentication]
        AUTHZ[🔑 Authorization]
        CSRF[🛡️ CSRF Protection]
        XSS[🔒 XSS Prevention]
        SQL[💉 SQL Injection Prevention]
        INPUT[✅ Input Validation]
    end
    
    subgraph "Data Security"
        ENCRYPT[🔒 Encryption at Rest]
        TRANSIT[🚀 TLS/SSL]
        RLS[🔐 Row Level Security]
        BACKUP[💾 Encrypted Backups]
        AUDIT[📋 Audit Logging]
    end
    
    subgraph "Monitoring & Response"
        SIEM[👁️ SIEM]
        ALERT[🚨 Real-time Alerts]
        INCIDENT[🚑 Incident Response]
        FORENSIC[🔍 Digital Forensics]
    end
    
    DDOS --> WAF
    BOT --> CDN
    HACK --> RATE
    SPAM --> GEO
    
    WAF --> AUTH
    CDN --> AUTHZ
    RATE --> CSRF
    GEO --> XSS
    
    AUTH --> ENCRYPT
    AUTHZ --> TRANSIT
    CSRF --> RLS
    XSS --> BACKUP
    SQL --> AUDIT
    INPUT --> AUDIT
    
    ENCRYPT --> SIEM
    TRANSIT --> ALERT
    RLS --> INCIDENT
    BACKUP --> FORENSIC
    AUDIT --> SIEM
    
    style DDOS fill:#E74C3C,color:#fff
    style BOT fill:#E74C3C,color:#fff
    style HACK fill:#E74C3C,color:#fff
    style SPAM fill:#E74C3C,color:#fff
    style WAF fill:#27AE60,color:#fff
    style ENCRYPT fill:#3498DB,color:#fff
    style SIEM fill:#9B59B6,color:#fff
```

### 📱 Mobile App Wireframes

#### Mobile Form Builder

```
┌─────────────────────┐
│ ← 📝 Form Builder   │
├─────────────────────┤
│                     │
│ 📋 Contact Form     │
│ ┌─────────────────┐ │
│ │ 📝 Name *       │ │
│ │ [____________]  │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ 📧 Email *      │ │
│ │ [____________]  │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ 📞 Phone        │ │
│ │ [____________]  │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ 📝 Message *    │ │
│ │ [____________]  │ │
│ │ [____________]  │ │
│ │ [____________]  │ │
│ └─────────────────┘ │
│                     │
│ [🚀 Send Message]   │
│                     │
│ ┌─────────────────┐ │
│ │ + Add Field     │ │
│ └─────────────────┘ │
│                     │
│ [💾 Save] [👁️ Preview] │
│                     │
└─────────────────────┘
```

### 🎯 Performance Optimization Flow

```mermaid
graph LR
    subgraph "Frontend Optimization"
        SPLIT[📦 Code Splitting]
        LAZY[⏳ Lazy Loading]
        CACHE[💾 Browser Cache]
        COMPRESS[🗜️ Asset Compression]
    end
    
    subgraph "Network Optimization"
        CDN[🌍 Global CDN]
        HTTP2[⚡ HTTP/2]
        PRELOAD[🚀 Resource Preload]
        PREFETCH[📡 DNS Prefetch]
    end
    
    subgraph "Backend Optimization"
        API_CACHE[💾 API Caching]
        DB_INDEX[📊 Database Indexes]
        QUERY_OPT[🔍 Query Optimization]
        CONNECTION[🔗 Connection Pooling]
    end
    
    subgraph "Monitoring"
        METRICS[📊 Performance Metrics]
        ALERTS[🚨 Performance Alerts]
        ANALYSIS[📈 Performance Analysis]
    end
    
    SPLIT --> CDN
    LAZY --> HTTP2
    CACHE --> PRELOAD
    COMPRESS --> PREFETCH
    
    CDN --> API_CACHE
    HTTP2 --> DB_INDEX
    PRELOAD --> QUERY_OPT
    PREFETCH --> CONNECTION
    
    API_CACHE --> METRICS
    DB_INDEX --> ALERTS
    QUERY_OPT --> ANALYSIS
    CONNECTION --> METRICS
    
    style SPLIT fill:#FF6B35,color:#fff
    style CDN fill:#4ECDC4,color:#fff
    style API_CACHE fill:#3498DB,color:#fff
    style METRICS fill:#9B59B6,color:#fff
```

### 📊 Analytics Dashboard Mockup

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📊 Analytics - Pesquisa de Satisfação                    📅 Últimos 30 dias │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │   1,247     │ │    892      │ │    634      │ │   71.1%     │            │
│ │   Views     │ │   Starts    │ │ Completions │ │ Conv Rate   │            │
│ │   📈 +12.3% │ │   📈 +8.7%  │ │   📈 +15.2% │ │   📈 +2.1%  │            │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                                             │
│ 📈 Conversions Over Time                                                    │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 100%│                                                                   │ │
│ │     │     ●●●                                                           │ │
│ │  80%│   ●●   ●●                                                         │ │
│ │     │ ●●       ●●                                                       │ │
│ │  60%│●           ●●                                                     │ │
│ │     │              ●●                                                   │ │
│ │  40%│                ●●                                                 │ │
│ │     │                  ●●                                               │ │
│ │  20%│                    ●●                                             │ │
│ │     │                      ●●                                           │ │
│ │   0%└─────────────────────────────────────────────────────────────────│ │
│ │     1   5   10   15   20   25   30 (days)                              │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ 🔍 Field Analysis                          🌍 Traffic Sources              │
│ ┌─────────────────────────────────────┐   ┌─────────────────────────────┐   │
│ │ 1. Nome completo                    │   │ 📧 Email: 35.2%             │   │
│ │ ████████████████████ 100% (892)    │   │ 📱 Social: 28.7%            │   │
│ │ ⏱️ Avg time: 12s                    │   │ 🔗 Direct: 22.1%            │   │
│ │                                     │   │ 🔍 Search: 14.0%            │   │
│ │ 2. Email                            │   └─────────────────────────────┘   │
│ │ ██████████████████▌  95% (848)      │                                     │
│ │ ⏱️ Avg time: 8s                     │   📱 Device Breakdown               │
│ │ ⚠️ 44 drop-offs                     │   ┌─────────────