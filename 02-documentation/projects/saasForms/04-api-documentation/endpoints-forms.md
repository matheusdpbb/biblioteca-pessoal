# 📋 API Documentation - Forms Management
## YouForm - SaaS de Formulários Web

### 🎯 Visão Geral

Esta documentação detalha todos os endpoints relacionados ao gerenciamento de formulários no YouForm, incluindo criação, edição, publicação, análise e compartilhamento.

### 🔐 Autenticação

Todos os endpoints (exceto visualização pública) requerem autenticação via Bearer Token:

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
X-API-Version: v1
```

### 📊 Estrutura de Dados

#### Form Object

```typescript
interface Form {
  id: string;                    // UUID do formulário
  userId: string;                // UUID do proprietário
  title: string;                 // Título do formulário
  description?: string;          // Descrição opcional
  fields: FormField[];           // Array de campos
  settings: FormSettings;        // Configurações do formulário
  status: 'draft' | 'published' | 'archived' | 'deleted';
  tags: string[];               // Tags para organização
  responseCount: number;        // Número de respostas
  viewCount: number;            // Número de visualizações
  createdAt: string;            // ISO timestamp
  updatedAt: string;            // ISO timestamp
  publishedAt?: string;         // ISO timestamp quando publicado
}

interface FormField {
  id: string;                   // ID único do campo
  type: FieldType;              // Tipo do campo
  label: string;                // Label do campo
  placeholder?: string;         // Placeholder
  description?: string;         // Descrição/ajuda
  required: boolean;            // Campo obrigatório
  validation?: ValidationRule[]; // Regras de validação
  options?: FieldOption[];      // Opções (select, radio, checkbox)
  logic?: ConditionalLogic[];   // Lógica condicional
  settings?: FieldSettings;     // Configurações específicas
}

type FieldType = 
  | 'text' | 'textarea' | 'email' | 'phone' | 'url'
  | 'number' | 'date' | 'time' | 'datetime'
  | 'select' | 'radio' | 'checkbox' | 'multiselect'
  | 'file' | 'image' | 'rating' | 'scale'
  | 'yes_no' | 'legal' | 'signature'
  | 'section' | 'divider' | 'html';

interface FormSettings {
  theme: {
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
    borderRadius: number;
  };
  behavior: {
    showProgressBar: boolean;
    allowMultipleSubmissions: boolean;
    requireLogin: boolean;
    captchaEnabled: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    webhookUrl?: string;
    autoResponder?: AutoResponder;
  };
  privacy: {
    collectIpAddress: boolean;
    collectUserAgent: boolean;
    gdprCompliant: boolean;
  };
}
```

### 🔗 Endpoints

#### 1. Listar Formulários

```http
GET /api/v1/forms
```

**Query Parameters:**
- `page` (number, default: 1): Página atual
- `limit` (number, default: 20, max: 100): Itens por página
- `status` (string): Filtrar por status (`draft`, `published`, `archived`)
- `search` (string): Buscar por título ou descrição
- `tags` (string): Filtrar por tags (separadas por vírgula)
- `sort` (string): Ordenação (`created_at`, `updated_at`, `title`, `response_count`)
- `order` (string): Direção (`asc`, `desc`)

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Pesquisa de Satisfação",
      "description": "Avalie nosso atendimento",
      "status": "published",
      "tags": ["feedback", "customer-service"],
      "responseCount": 42,
      "viewCount": 156,
      "createdAt": "2025-06-16T21:00:00Z",
      "updatedAt": "2025-06-16T21:30:00Z",
      "publishedAt": "2025-06-16T21:15:00Z"
    }
  ],
  "metadata": {
    "timestamp": "2025-06-16T21:45:00Z",
    "requestId": "req_123456789"
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### 2. Obter Formulário por ID

```http
GET /api/v1/forms/{id}
```

**Path Parameters:**
- `id` (string, required): UUID do formulário

**Query Parameters:**
- `include` (string): Dados adicionais (`analytics`, `recent_responses`)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Formulário de Contato",
    "description": "Entre em contato conosco",
    "fields": [
      {
        "id": "field_1",
        "type": "text",
        "label": "Nome completo",
        "placeholder": "Digite seu nome",
        "required": true,
        "validation": [
          {
            "type": "minLength",
            "value": 2,
            "message": "Nome deve ter pelo menos 2 caracteres"
          }
        ]
      },
      {
        "id": "field_2",
        "type": "email",
        "label": "E-mail",
        "placeholder": "seu@email.com",
        "required": true,
        "validation": [
          {
            "type": "email",
            "message": "Digite um e-mail válido"
          }
        ]
      },
      {
        "id": "field_3",
        "type": "textarea",
        "label": "Mensagem",
        "placeholder": "Digite sua mensagem",
        "required": true,
        "settings": {
          "rows": 4,
          "maxLength": 500
        }
      }
    ],
    "settings": {
      "theme": {
        "primaryColor": "#FF6B35",
        "backgroundColor": "#FFFFFF",
        "fontFamily": "Inter",
        "borderRadius": 8
      },
      "behavior": {
        "showProgressBar": true,
        "allowMultipleSubmissions": false,
        "requireLogin": false,
        "captchaEnabled": true
      },
      "notifications": {
        "emailNotifications": true,
        "webhookUrl": "https://api.example.com/webhook",
        "autoResponder": {
          "enabled": true,
          "subject": "Obrigado pelo contato!",
          "message": "Recebemos sua mensagem e responderemos em breve."
        }
      }
    },
    "status": "published",
    "tags": ["contato", "suporte"],
    "responseCount": 15,
    "viewCount": 89,
    "createdAt": "2025-06-16T20:00:00Z",
    "updatedAt": "2025-06-16T21:00:00Z",
    "publishedAt": "2025-06-16T20:30:00Z"
  },
  "metadata": {
    "timestamp": "2025-06-16T21:45:00Z",
    "requestId": "req_123456790"
  }
}
```

#### 3. Criar Novo Formulário

```http
POST /api/v1/forms
```

**Request Body:**
```json
{
  "title": "Novo Formulário",
  "description": "Descrição do formulário",
  "fields": [
    {
      "id": "field_1",
      "type": "text",
      "label": "Nome",
      "required": true
    }
  ],
  "settings": {
    "theme": {
      "primaryColor": "#FF6B35"
    },
    "behavior": {
      "showProgressBar": true
    }
  },
  "tags": ["tag1", "tag2"]
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Novo Formulário",
    "description": "Descrição do formulário",
    "fields": [...],
    "settings": {...},
    "status": "draft",
    "tags": ["tag1", "tag2"],
    "responseCount": 0,
    "viewCount": 0,
    "createdAt": "2025-06-16T21:45:00Z",
    "updatedAt": "2025-06-16T21:45:00Z"
  },
  "metadata": {
    "timestamp": "2025-06-16T21:45:00Z",
    "requestId": "req_123456791"
  }
}
```

#### 4. Atualizar Formulário

```http
PUT /api/v1/forms/{id}
```

**Path Parameters:**
- `id` (string, required): UUID do formulário

**Request Body:** (campos opcionais)
```json
{
  "title": "Título Atualizado",
  "description": "Nova descrição",
  "fields": [...],
  "settings": {...},
  "tags": ["nova-tag"]
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    // Formulário atualizado
  },
  "metadata": {
    "timestamp": "2025-06-16T21:45:00Z",
    "requestId": "req_123456792"
  }
}
```

#### 5. Publicar Formulário

```http
POST /api/v1/forms/{id}/publish
```

**Path Parameters:**
- `id` (string, required): UUID do formulário

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "published",
    "publishedAt": "2025-06-16T21:45:00Z",
    "publicUrl": "https://youform.com/f/550e8400-e29b-41d4-a716-446655440000"
  },
  "metadata": {
    "timestamp": "2025-06-16T21:45:00Z",
    "requestId": "req_123456793"
  }
}
```

#### 6. Despublicar Formulário

```http
POST /api/v1/forms/{id}/unpublish
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "draft",
    "publishedAt": null
  }
}
```

#### 7. Arquivar Formulário

```http
POST /api/v1/forms/{id}/archive
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "archived"
  }
}
```

#### 8. Restaurar Formulário

```http
POST /api/v1/forms/{id}/restore
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "draft"
  }
}
```

#### 9. Deletar Formulário

```http
DELETE /api/v1/forms/{id}
```

**Query Parameters:**
- `permanent` (boolean, default: false): Deletar permanentemente

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "deleted": true,
    "permanent": false
  }
}
```

#### 10. Duplicar Formulário

```http
POST /api/v1/forms/{id}/duplicate
```

**Request Body:**
```json
{
  "title": "Cópia do Formulário Original",
  "includeResponses": false
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "title": "Cópia do Formulário Original",
    "status": "draft",
    "originalFormId": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

#### 11. Obter Analytics do Formulário

```http
GET /api/v1/forms/{id}/analytics
```

**Query Parameters:**
- `period` (string): Período (`7d`, `30d`, `90d`, `1y`, `all`)
- `startDate` (string): Data inicial (ISO format)
- `endDate` (string): Data final (ISO format)
- `granularity` (string): Granularidade (`hour`, `day`, `week`, `month`)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalViews": 1250,
      "totalStarts": 890,
      "totalCompletions": 567,
      "completionRate": 63.7,
      "averageTime": "00:03:45",
      "uniqueVisitors": 1100,
      "bounceRate": 28.9
    },
    "timeSeries": [
      {
        "date": "2025-06-16",
        "views": 45,
        "starts": 32,
        "completions": 21,
        "completionRate": 65.6
      }
    ],
    "fieldAnalytics": [
      {
        "fieldId": "field_1",
        "label": "Nome",
        "dropoffRate": 5.2,
        "averageTime": "00:00:15",
        "errorRate": 2.1
      }
    ],
    "trafficSources": [
      {
        "source": "direct",
        "visits": 450,
        "percentage": 36.0
      },
      {
        "source": "social",
        "visits": 320,
        "percentage": 25.6
      }
    ],
    "deviceBreakdown": {
      "desktop": 60.5,
      "mobile": 35.2,
      "tablet": 4.3
    },
    "locationBreakdown": [
      {
        "country": "BR",
        "countryName": "Brasil",
        "visits": 890,
        "percentage": 71.2
      }
    ]
  }
}
```

#### 12. Exportar Formulário

```http
GET /api/v1/forms/{id}/export
```

**Query Parameters:**
- `format` (string): Formato (`json`, `yaml`, `pdf`)
- `includeResponses` (boolean): Incluir respostas
- `includeAnalytics` (boolean): Incluir analytics

**Response 200:**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://api.youform.com/downloads/form-export-123.json",
    "expiresAt": "2025-06-17T21:45:00Z",
    "format": "json",
    "fileSize": 2048576
  }
}
```

#### 13. Importar Formulário

```http
POST /api/v1/forms/import
```

**Request Body (multipart/form-data):**
- `file`: Arquivo do formulário
- `format`: Formato do arquivo (`json`, `yaml`, `typeform`, `google_forms`)
- `title`: Título para o formulário importado

**Response 201:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "title": "Formulário Importado",
    "status": "draft",
    "importedFrom": "typeform",
    "fieldsImported": 8,
    "warnings": [
      "Campo 'signature' não suportado, convertido para 'text'"
    ]
  }
}
```

#### 14. Buscar Formulários

```http
GET /api/v1/forms/search
```

**Query Parameters:**
- `q` (string, required): Termo de busca
- `limit` (number): Limite de resultados
- `includeArchived` (boolean): Incluir arquivados

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Pesquisa de Satisfação",
      "description": "Avalie nosso atendimento",
      "status": "published",
      "relevanceScore": 0.95,
      "matchedFields": ["title", "description"]
    }
  ],
  "metadata": {
    "query": "satisfação",
    "totalResults": 3,
    "searchTime": "0.045s"
  }
}
```

#### 15. Obter Templates

```http
GET /api/v1/forms/templates
```

**Query Parameters:**
- `category` (string): Categoria (`contact`, `survey`, `registration`, `feedback`)
- `industry` (string): Setor (`healthcare`, `education`, `retail`, `technology`)
- `featured` (boolean): Apenas templates em destaque

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "template_contact_basic",
      "name": "Formulário de Contato Básico",
      "description": "Template simples para contato",
      "category": "contact",
      "industry": "general",
      "featured": true,
      "previewUrl": "https://youform.com/templates/contact-basic/preview",
      "fields": [...],
      "settings": {...}
    }
  ]
}
```

#### 16. Criar Formulário a partir de Template

```http
POST /api/v1/forms/from-template
```

**Request Body:**
```json
{
  "templateId": "template_contact_basic",
  "title": "Meu Formulário de Contato",
  "customizations": {
    "theme": {
      "primaryColor": "#FF6B35"
    }
  }
}
```

### 🚨 Códigos de Erro

#### Erros Comuns

**400 Bad Request**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados de entrada inválidos",
    "details": [
      {
        "field": "title",
        "message": "Título é obrigatório",
        "code": "REQUIRED"
      },
      {
        "field": "fields",
        "message": "Formulário deve ter pelo menos 1 campo",
        "code": "MIN_LENGTH"
      }
    ]
  },
  "metadata": {
    "timestamp": "2025-06-16T21:45:00Z",
    "requestId": "req_123456794"
  }
}
```

**401 Unauthorized**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Token de acesso inválido ou expirado"
  }
}
```

**403 Forbidden**
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Você não tem permissão para acessar este formulário"
  }
}
```

**404 Not Found**
```json
{
  "success": false,
  "error": {
    "code": "FORM_NOT_FOUND",
    "message": "Formulário não encontrado"
  }
}
```

**409 Conflict**
```json
{
  "success": false,
  "error": {
    "code": "FORM_ALREADY_PUBLISHED",
    "message": "Formulário já está publicado"
  }
}
```

**422 Unprocessable Entity**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_FORM_STRUCTURE",
    "message": "Estrutura do formulário inválida",
    "details": [
      {
        "field": "fields[0].type",
        "message": "Tipo de campo 'invalid_type' não é suportado",
        "code": "INVALID_FIELD_TYPE"
      }
    ]
  }
}
```

**429 Too Many Requests**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Muitas requisições. Tente novamente em 60 segundos",
    "retryAfter": 60
  }
}
```

### 📝 Exemplos de Uso

#### Criar Formulário Completo

```javascript
const form = await fetch('/api/v1/forms', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Pesquisa de Satisfação do Cliente',
    description: 'Ajude-nos a melhorar nossos serviços',
    fields: [
      {
        id: 'rating',
        type: 'rating',
        label: 'Como você avalia nosso atendimento?',
        required: true,
        settings: {
          maxRating: 5,
          ratingType: 'stars'
        }
      },
      {
        id: 'feedback',
        type: 'textarea',
        label: 'Deixe seu comentário',
        placeholder: 'Conte-nos sobre sua experiência...',
        required: false,
        settings: {
          rows: 4,
          maxLength: 500
        }
      },
      {
        id: 'recommend',
        type: 'yes_no',
        label: 'Você nos recomendaria para um amigo?',
        required: true
      }
    ],
    settings: {
      theme: {
        primaryColor: '#FF6B35',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Inter'
      },
      behavior: {
        showProgressBar: true,
        allowMultipleSubmissions: false
      },
      notifications: {
        emailNotifications: true,
        autoResponder: {
          enabled: true,
          subject: 'Obrigado pelo seu feedback!',
          message: 'Sua opinião é muito importante para nós.'
        }
      }
    },
    tags: ['feedback', 'customer-satisfaction']
  })
});

const result = await form.json();
console.log('Formulário criado:', result.data.id);
```

#### Buscar e Filtrar Formulários

```javascript
const forms = await fetch('/api/v1/forms?' + new URLSearchParams({
  status: 'published',
  search: 'satisfação',
  tags: 'feedback,survey',
  sort: 'response_count',
  order: 'desc',
  limit: '10'
}), {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const result = await forms.json();
console.log(`Encontrados ${result.data.length} formulários`);
```

#### Obter Analytics Detalhados

```javascript
const analytics = await fetch('/api/v1/forms/550e8400-e29b-41d4-a716-446655440000/analytics?' + new URLSearchParams({
  period: '30d',
  granularity: 'day'
}), {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const result = await analytics.json();
console.log(`Taxa de conversão: ${result.data.summary.completionRate}%`);
```

---

**Versão**: 1.0  
**Última Atualização**: 16/06/2025  
**Próxima Revisão**: 30/06/2025