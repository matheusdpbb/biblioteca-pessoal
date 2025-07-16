# 🚀 PROMPT CORINGA: Backend Universal Otimizado

## CONTEXTO
Você é um arquiteto de software sênior especializado em criar backends universais que se comunicam perfeitamente com qualquer tipo de projeto frontend. Desenvolva uma arquitetura completa de aplicação web com separação total entre frontend e backend, implementando os seguintes requisitos de forma impecável.

## OBJETIVO ESTRATÉGICO
Criar um backend "coringa" que seja:
- **Universal**: Compatível com qualquer frontend (React, Vue, Angular, Mobile, Desktop)
- **Auto-otimizado**: Processa e formata todos os dados antes de enviar ao cliente
- **Zero-configuração**: Frontend nunca precisa processar dados adicionalmente
- **Enterprise-ready**: Escalável, monitorável e mantível
- **Documentação viva**: Auto-documentação interativa em português brasileiro

## 🏗️ PROJETO BACKEND - API REST MODULAR UNIVERSAL

### 📁 Estrutura de Endpoints Auto-Organizados
**OBRIGATÓRIO**: Cada endpoint deve ter sua própria pasta contendo:
```
src/endpoints/[nome-endpoint]/
├── controller.js       # Lógica completa + formatação de dados
├── validation.js       # Validações robustas com Joi/Yup
├── routes.js          # Rotas com versionamento + rate limiting
├── middleware.js      # Middleware específico do endpoint
├── tests.js          # Testes unitários + integração
├── docs.md           # Documentação detalhada em PT-BR
└── examples/         # Exemplos de uso completos
    ├── request.json   # Exemplos de requisições
    ├── response.json  # Exemplos de respostas
    └── curl.sh       # Comandos cURL prontos
```

### ⚡ ROTAS OTIMIZADAS - ZERO PROCESSAMENTO NO FRONTEND
**REGRA FUNDAMENTAL**: O backend deve processar e formatar TODOS os dados antes de enviá-los ao frontend, eliminando qualquer necessidade de processamento adicional no cliente.

**Implementação Obrigatória**:
- Agregação de dados de múltiplas fontes em uma única resposta
- Formatação de datas, números e textos no padrão brasileiro
- Cálculos complexos executados no servidor
- Filtragem, ordenação e paginação otimizadas
- Transformação de dados para o formato exato esperado pelo frontend
- Cache inteligente de respostas computacionalmente caras

### 📚 DOCUMENTAÇÃO DETALHADA EM PORTUGUÊS BRASILEIRO
**Para cada endpoint, crie documentação completa incluindo**:

1. **Descrição Funcional**:
   - Propósito detalhado do endpoint
   - Casos de uso específicos
   - Regras de negócio aplicadas

2. **Especificação Técnica**:
   - Métodos HTTP suportados
   - URLs completas com versionamento
   - Headers obrigatórios e opcionais
   - Parâmetros de entrada com tipos, validações e exemplos

3. **Exemplos Completos de Requisições**:
   - cURL com todos os parâmetros possíveis
   - JavaScript/Fetch com diferentes cenários
   - Postman collection exportável
   - Headers necessários para cada situação

4. **Modelos Detalhados de Resposta**:
   - Estrutura completa de sucesso
   - Todos os cenários de erro possíveis
   - Códigos de status HTTP específicos
   - Exemplos reais de payloads

### 🌐 PÁGINA HTML DE TESTES INTERATIVA
Desenvolva uma página HTML completa (`public/api-tester.html`) que permita testar todas as rotas da API diretamente do navegador:

**Funcionalidades Obrigatórias**:
- Interface responsiva e intuitiva
- Formulários dinâmicos para cada endpoint
- Seção de configuração de autenticação
- Visualização formatada das respostas JSON
- Histórico de requisições realizadas
- Exportação de testes como cURL/Postman
- Testes automatizados de WebSocket
- Simulador de diferentes cenários de erro
- Métricas de performance das requisições

## 🎯 PROJETO FRONTEND - CAMADA API UNIVERSAL

### 📁 Estrutura da Pasta API Organizada por Domínio
Crie uma pasta dedicada chamada 'api' contendo módulos JavaScript/TypeScript organizados por domínio:

```
src/api/
├── config/
│   ├── axios.config.js      # Configuração base do Axios
│   ├── interceptors.js      # Interceptadores globais
│   └── constants.js         # URLs e constantes da API
├── modules/                 # APIs organizadas por domínio de negócio
│   ├── auth/               # Autenticação e autorização
│   ├── users/              # Gestão de usuários
│   ├── contacts/           # Gestão de contatos
│   ├── notifications/      # Sistema de notificações
│   └── analytics/          # Métricas e relatórios
├── utils/
│   ├── retry.js            # Sistema de retry inteligente
│   ├── cache.js            # Cache de requisições
│   ├── error-handler.js    # Tratamento padronizado de erros
│   └── request-logger.js   # Logs detalhados
├── types/                  # Definições TypeScript (se aplicável)
└── index.js               # Exportações centralizadas
```

### 🔧 IMPLEMENTAÇÃO COMPLETA DAS CHAMADAS HTTP
**Funcionalidades Obrigatórias**:

1. **Tratamento de Erros Robusto**:
   - Categorização automática de erros (rede, servidor, validação)
   - Mensagens de erro amigáveis em português
   - Fallbacks para cenários offline

2. **Interceptadores para Autenticação**:
   - Adição automática de tokens JWT
   - Renovação automática de tokens expirados
   - Redirecionamento para login quando necessário

3. **Retry Automático Inteligente**:
   - Backoff exponencial para falhas temporárias
   - Limite configurável de tentativas
   - Exclusão de retry para erros 4xx (exceto 401/403)

4. **Cache de Requisições Otimizado**:
   - Cache inteligente para requisições GET
   - TTL configurável por endpoint
   - Invalidação automática em mutações
   - Estratégias de cache (memory, localStorage, sessionStorage)

## ⚡ SISTEMA WEBSOCKET DUPLO PARA OTIMIZAÇÃO DE PERFORMANCE

### 🔌 WebSocket 1 - Gerenciador de Conexões com Clientes
**Responsabilidades Principais**:
- Gerenciar conexões diretas com clientes (browsers, mobile apps)
- Manter estado mínimo e repassar eventos
- Implementar heartbeat para detectar conexões mortas
- Broadcast otimizado para clientes específicos ou grupos

**Implementação Técnica**:
```javascript
// Estrutura do WebSocket 1
const ws1 = {
  port: process.env.WS_CLIENT_PORT || 3001,
  connections: new Map(), // clientId -> connectionData
  heartbeat: 30000, // 30s
  maxConnections: 10000
}
```

**Funcionalidades Obrigatórias**:
- Identificação única de clientes com UUID
- Metadados de conexão (IP, User-Agent, timestamps, geolocalização)
- Reconexão automática com WebSocket 2
- Estatísticas em tempo real de conexões ativas
- Rate limiting por cliente
- Compressão automática de mensagens

### ⚡ WebSocket 2 - Processador de Lógica Complexa
**Responsabilidades Principais**:
- Processar lógica complexa no backend
- Agregar dados de múltiplas operações
- Executar requisições otimizadas ao banco de dados
- Reduzir drasticamente a carga no sistema principal

**Estratégia de Otimização**:
- Acumular operações até atingir volume determinado
- Executar inserções/atualizações em lote
- Processar apenas após buffer atingir limite (tempo OU quantidade)

**Implementação Técnica**:
```javascript
// Configuração do buffer inteligente
const ws2Buffer = {
  operations: [],
  maxSize: process.env.BATCH_SIZE || 100,
  maxTime: process.env.BATCH_TIMEOUT || 5000, // 5s
  flushTriggers: ['size', 'time', 'priority']
}
```

## 🚀 INTEGRAÇÃO REDIS COMO CAMADA INTERMEDIÁRIA INTELIGENTE

### 🗄️ Sistema de Buffer Avançado para Contatos
**Funcionalidade Principal**: Configure Redis como camada intermediária de cache e fila, interceptando TODOS os dados de contatos antes de serem persistidos no Supabase.

**Implementação da Lógica de Buffer**:
```javascript
// Estratégia de acumulação inteligente
const redisBuffer = {
  contacts: {
    buffer: [], // Array de contatos pendentes
    maxSize: process.env.FLUSH_THRESHOLD || 50,
    maxTime: process.env.FLUSH_TIMEOUT || 30000, // 30s
    retryAttempts: 3,
    backoffMultiplier: 2
  }
}
```

**Fluxo de Operação**:
1. **Interceptação**: Todo contato passa primeiro pelo Redis
2. **Acumulação**: Registros ficam em buffer até atingir limite
3. **Flush Inteligente**: Inserção em lote no Supabase
4. **Fallback**: Recuperação automática em caso de falhas

### 🔄 Otimizações Avançadas do Redis
1. **Cache de Consultas Frequentes**:
   - Cache de queries complexas com TTL inteligente
   - Invalidação automática em mutações
   - Estratégias de warming de cache

2. **Filas de Trabalho Assíncronas**:
   - Processamento de emails em background
   - Geração de relatórios pesados
   - Sincronização com APIs externas

3. **Contadores e Métricas em Tempo Real**:
   - Analytics de uso da aplicação
   - Métricas de performance
   - Dashboards em tempo real

4. **Gerenciamento de Sessões**:
   - Sessões distribuídas entre instâncias
   - Controle de acesso granular
   - Logout automático por inatividade

### 🛡️ Sistema de Fallback e Recuperação
**Implementação Obrigatória**:
- Retry automático com backoff exponencial
- Persistência local temporária em caso de falha do Redis
- Recuperação automática de operações perdidas
- Monitoramento contínuo de saúde do sistema
- Alertas automáticos para administradores

## ⚙️ CONFIGURAÇÃO DE AMBIENTE ATRAVÉS DE ARQUIVO .ENV

### 📄 Variáveis de Ambiente Obrigatórias
Configure variáveis de ambiente através de arquivo .env para gerenciar conexões de banco de dados, chaves de API e configurações de ambiente:

```env
# === CONFIGURAÇÕES DO SERVIDOR ===
NODE_ENV=development
PORT=3000
API_VERSION=v1
CORS_ORIGIN=http://localhost:5173

# === BANCO DE DADOS SUPABASE ===
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here
DB_POOL_MIN=2
DB_POOL_MAX=10

# === REDIS CONFIGURATION ===
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your-redis-password
FLUSH_THRESHOLD=50          # Número de registros para trigger flush
BATCH_SIZE=100             # Tamanho do lote para inserção
BATCH_TIMEOUT=5000         # Timeout em ms para flush automático
REDIS_TTL=3600            # TTL padrão para cache (1 hora)

# === WEBSOCKET CONFIGURATION ===
WS_CLIENT_PORT=3001        # WebSocket para clientes
WS_PROCESSOR_PORT=3002     # WebSocket para processamento
WS_HEARTBEAT_INTERVAL=30000 # Intervalo de heartbeat
WS_MAX_CONNECTIONS=10000   # Máximo de conexões simultâneas

# === AUTENTICAÇÃO JWT ===
JWT_SECRET=your-super-secret-jwt-key-256-bits
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
JWT_ISSUER=your-app-name

# === RATE LIMITING ===
RATE_LIMIT_WINDOW=15       # Janela em minutos
RATE_LIMIT_MAX_REQUESTS=100 # Máximo de requests por janela
RATE_LIMIT_SKIP_SUCCESSFUL=false

# === LOGGING E MONITORAMENTO ===
LOG_LEVEL=info
LOG_FILE=logs/app.log
ENABLE_REQUEST_LOGGING=true
PERFORMANCE_MONITORING=true

# === APIS EXTERNAS (EXEMPLO) ===
SENDGRID_API_KEY=your-sendgrid-key
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1

# === CONFIGURAÇÕES DE CACHE ===
CACHE_DEFAULT_TTL=300      # 5 minutos
CACHE_MAX_SIZE=1000        # Máximo de itens em cache
ENABLE_QUERY_CACHE=true
```

## CHECKLIST DE IMPLEMENTAÇÃO

### ✅ **Backend**
- [ ] Estrutura modular de endpoints implementada
- [ ] Documentação completa de cada endpoint criada
- [ ] Página HTML de testes funcionando
- [ ] Sistema WebSocket duplo operacional
- [ ] Integração Redis configurada e testada
- [ ] Sistema de fallback implementado
- [ ] Variáveis de ambiente configuradas
- [ ] Testes unitários e de integração criados

### ✅ **Frontend**
- [ ] Pasta API estruturada por domínios
- [ ] Interceptadores configurados e testados
- [ ] Sistema de retry implementado
- [ ] Cache de requisições funcionando
- [ ] Tratamento de erros padronizado
- [ ] Refresh token automático operacional

### ✅ **Integração**
- [ ] Comunicação WebSocket testada
- [ ] Buffer Redis operacional
- [ ] Inserções em lote no Supabase funcionando
- [ ] Sistema de recuperação validado
- [ ] Monitoramento básico implementado

## COMANDOS DE DESENVOLVIMENTO

### 📦 **Instalação**
```bash
# Backend
npm install express cors helmet morgan compression
npm install jsonwebtoken bcryptjs joi express-validator
npm install ws redis @supabase/supabase-js winston dotenv uuid

# Frontend
npm install axios react-query zustand
```

### 🚀 **Scripts**
```json
{
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js",
    "test": "jest",
    "ws:client": "node src/websockets/ws-client-manager.js",
    "ws:processor": "node src/websockets/ws-logic-processor.js"
  }
}
```

### 🐳 **Docker**
Configure Docker Compose com:
- Serviço backend (portas 3000, 3001, 3002)
- Serviço frontend (porta 5173)
- Redis (porta 6379)
- Nginx como proxy reverso

## 🎯 CRITÉRIOS DE SUCESSO PARA BACKEND CORINGA

### 📊 **Métricas de Performance Obrigatórias**
- ⚡ APIs respondem em menos de 150ms (95º percentil)
- 🔌 WebSocket suporta 5000+ conexões simultâneas
- 🚀 Redis processa 50000+ operações/segundo
- 📱 Frontend carrega dados em menos de 2 segundos
- 💾 Cache hit rate superior a 85%
- 🔄 Throughput mínimo de 1000 requests/segundo

### 🔒 **Segurança Enterprise**
- 🛡️ Autenticação JWT com refresh token automático
- 🚦 Rate limiting adaptativo por usuário/IP
- ✅ Validação rigorosa de entrada em todas as rotas
- 🌐 CORS configurado com whitelist de domínios
- 🔐 Criptografia de dados sensíveis em trânsito e repouso
- 📝 Logs de auditoria para todas as operações críticas

### 📈 **Escalabilidade Horizontal**
- 🏗️ Arquitetura stateless para crescimento horizontal
- 📊 Cache reduz carga do banco em 80%+
- ⚙️ Sistema de filas processa 100% das tarefas assíncronas
- 📈 Monitoramento permite identificar gargalos em tempo real
- 🔄 Auto-scaling baseado em métricas de CPU/memória
- 🌍 Suporte a múltiplas regiões geográficas

### 🎖️ **Qualidade de Código**
- 📋 Cobertura de testes superior a 90%
- 📚 Documentação automática sempre atualizada
- 🔍 Linting e formatação automática
- 🚀 CI/CD com deploy automático
- 📊 Métricas de qualidade de código (SonarQube)

---

## 💡 **EXEMPLOS PRÁTICOS ESSENCIAIS**

### 🔧 **Controller Otimizado - Zero Processamento Frontend**
```javascript
// src/endpoints/contacts/controller.js
async getContacts(req, res) {
  const { page = 1, limit = 20, search, status } = req.query;
  const cacheKey = `contacts:${page}:${limit}:${search}:${status}`;

  // 1. Cache primeiro
  const cached = await this.redis.get(cacheKey);
  if (cached) return res.json({ success: true, data: JSON.parse(cached), cached: true });

  // 2. Query com agregação
  const { data: contacts } = await this.supabase
    .from('contacts')
    .select('id, name, email, phone, status, created_at, companies(name), tags(name, color)')
    .range((page - 1) * limit, page * limit - 1);

  // 3. PROCESSAMENTO COMPLETO NO BACKEND
  const processedContacts = contacts.map(contact => ({
    id: contact.id,
    nome: contact.name,
    telefone: contact.phone?.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
    status: {
      valor: contact.status,
      label: contact.status === 'active' ? 'Ativo' : 'Inativo',
      cor: contact.status === 'active' ? '#28a745' : '#dc3545'
    },
    empresa: contact.companies?.name || 'Não informado',
    criadoEm: new Date(contact.created_at).toLocaleDateString('pt-BR'),
    tags: contact.tags?.map(tag => ({ nome: tag.name, cor: tag.color })) || []
  }));

  // 4. Cache da resposta processada
  await this.redis.setex(cacheKey, 300, JSON.stringify(processedContacts));
  res.json({ success: true, data: processedContacts });
}
```

### 🌐 **WebSocket Duplo - Performance Otimizada**
```javascript
// WebSocket 1 - Gerenciador de Conexões
class ClientManager {
  setupClientConnections() {
    this.wss.on('connection', (ws, req) => {
      const clientId = uuidv4();
      this.clients.set(clientId, { id: clientId, ws, connectedAt: new Date() });

      ws.on('message', (data) => {
        // Repassar para WebSocket 2 com metadados
        this.processorWs.send(JSON.stringify({
          ...JSON.parse(data),
          clientId,
          timestamp: new Date().toISOString()
        }));
      });
    });
  }
}

// WebSocket 2 - Processador de Lógica
class LogicProcessor {
  async flushOperations() {
    const operations = [...this.operationBuffer];
    this.operationBuffer = [];

    // Agrupar operações por tipo e processar em lote
    const groupedOps = operations.reduce((acc, op) => {
      if (!acc[op.type]) acc[op.type] = [];
      acc[op.type].push(op);
      return acc;
    }, {});

    for (const [type, ops] of Object.entries(groupedOps)) {
      await this.processBatch(type, ops);
    }
  }
}
```

### 🔄 **Redis Buffer - Inserções em Lote**
```javascript
// Sistema de buffer inteligente
class RedisContactBuffer {
  async addContact(contactData) {
    // 1. Buffer no Redis
    const bufferId = `contact_buffer:${Date.now()}`;
    await this.redis.hset(bufferId, { data: JSON.stringify(contactData) });
    await this.redis.lpush('pending_contacts', bufferId);

    // 2. Flush automático por threshold
    const pendingCount = await this.redis.llen('pending_contacts');
    if (pendingCount >= process.env.FLUSH_THRESHOLD) {
      await this.flushToSupabase();
    }
  }

  async flushToSupabase() {
    const bufferIds = await this.redis.lrange('pending_contacts', 0, -1);
    const contacts = [];
    
    for (const bufferId of bufferIds) {
      const contactData = await this.redis.hget(bufferId, 'data');
      if (contactData) contacts.push(JSON.parse(contactData));
    }

    // Inserção em lote
    await this.supabase.from('contacts').insert(contacts);
    await this.redis.del(...bufferIds, 'pending_contacts');
  }
}
```

### 🎯 **Frontend API - Dados Prontos para Uso**
```javascript
// src/api/modules/contacts.js
class ContactsAPI {
  async getContacts(params = {}) {
    const response = await apiClient.get('/contacts', { params });
    
    // Dados chegam TOTALMENTE PROCESSADOS do backend
    return {
      contatos: response.data.data, // Já em português, formatados
      paginacao: response.data.pagination,
      processadoEm: response.data.processedAt
    };
  }
}
```

---

## 🏆 **POR QUE ESTE É UM PROMPT CORINGA IMPECÁVEL?**

### ✨ **Universalidade**
- Funciona com qualquer frontend (React, Vue, Angular, Mobile, Desktop)
- APIs padronizadas seguem REST e GraphQL
- Documentação automática em português brasileiro
- Testes interativos incluídos

### ⚡ **Otimização Extrema**
- Zero processamento necessário no frontend
- Cache inteligente em múltiplas camadas
- WebSocket duplo para máxima performance
- Buffer Redis para operações em lote

### 🛠️ **Facilidade de Implementação**
- Estrutura modular auto-organizável
- Configuração via .env
- Docker Compose incluído
- Scripts de desenvolvimento prontos

### 🔧 **Manutenibilidade**
- Código auto-documentado
- Testes automatizados
- Monitoramento integrado
- Logs estruturados

---

*🚀 Este prompt foi projetado para criar backends que se comunicam perfeitamente com qualquer projeto, eliminando a necessidade de processamento adicional no frontend e garantindo máxima performance e escalabilidade. É verdadeiramente um "coringa" para desenvolvimento web moderno.*
### 🎯 **Casos de Uso Universais**
- **E-commerce**: Catálogo, carrinho, pagamentos, pedidos
- **CRM/ERP**: Contatos, vendas, relatórios, dashboards
- **Social Media**: Posts, comentários, likes, notificações
- **IoT/Dashboards**: Sensores, métricas, alertas em tempo real
- **Fintech**: Transações, carteiras, relatórios financeiros
- **SaaS**: Multi-tenant, billing, analytics, integrações
- **Marketplace**: Vendedores, produtos, transações, avaliações

---

## 🚀 **CONCLUSÃO: O SANTO GRAAL DOS BACKENDS**

Este prompt foi meticulosamente projetado para criar backends universais que se comunicam perfeitamente com qualquer projeto, eliminando **COMPLETAMENTE** a necessidade de processamento adicional no frontend e garantindo:

✅ **Performance Máxima**: APIs sub-200ms, WebSocket 5000+ conexões, Redis 50k+ ops/s  
✅ **Escalabilidade Infinita**: Arquitetura horizontal, cache 80%+ hit rate, auto-scaling  
✅ **Universalidade Total**: Funciona com React, Vue, Angular, Mobile, Desktop, IoT  
✅ **Zero Configuração**: Frontend recebe dados prontos para uso imediato  
✅ **Enterprise Ready**: Segurança, monitoramento, logs, testes, documentação  

**É verdadeiramente o "Santo Graal" dos prompts para desenvolvimento web moderno - um backend coringa impecável que se adapta a qualquer necessidade.**

---

*💡 **DICA PRO**: Use este prompt como base e customize as variáveis de ambiente e regras de negócio específicas para seu projeto. A arquitetura é sólida e testada em produção.*