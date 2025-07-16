# 🔧 Troubleshooting - Evolution API

Guia completo para solução de problemas comuns na Evolution API.

## 📋 Índice

- [Problemas de Conexão](#problemas-de-conexão)
- [Problemas de Instância](#problemas-de-instância)
- [Problemas de Mensagens](#problemas-de-mensagens)
- [Problemas de Webhook](#problemas-de-webhook)
- [Problemas de Grupos](#problemas-de-grupos)
- [Códigos de Erro](#códigos-de-erro)
- [Logs e Monitoramento](#logs-e-monitoramento)
- [Performance](#performance)
- [Segurança](#segurança)

## 🔌 Problemas de Conexão

### Instância não conecta

**Sintomas:**
- QR Code não aparece
- Status permanece como "close"
- Erro ao tentar conectar

**Soluções:**

1. **Verificar configurações básicas:**
```bash
# Testar conectividade com a API
curl -X GET "https://sua-api.evolution.com/instance/connectionState/sua-instancia" \
-H "apikey: sua-chave-api"
```

2. **Regenerar QR Code:**
```bash
curl -X GET "https://sua-api.evolution.com/instance/connect/sua-instancia"
```

3. **Reiniciar instância:**
```bash
curl -X POST "https://sua-api.evolution.com/instance/restart/sua-instancia"
```

4. **Verificar se o número não está sendo usado em outro lugar:**
   - Feche o WhatsApp Web em outros dispositivos
   - Desconecte de outras APIs do WhatsApp
   - Aguarde alguns minutos antes de tentar novamente

### QR Code não carrega

**Possíveis causas:**
- Instância já conectada
- Problema de rede
- Configuração incorreta

**Soluções:**
```javascript
// Verificar status antes de gerar QR Code
const status = await fetch(`${baseUrl}/instance/connectionState/${instance}`);
const statusData = await status.json();

if (statusData.state === 'open') {
    console.log('Instância já conectada!');
} else {
    // Gerar novo QR Code
    const qr = await fetch(`${baseUrl}/instance/connect/${instance}`);
}
```

### Conexão perdida frequentemente

**Soluções:**
1. **Implementar reconexão automática:**
```javascript
async function monitorConnection() {
    setInterval(async () => {
        try {
            const status = await checkConnectionStatus();
            if (status.state !== 'open') {
                console.log('Conexão perdida. Reconectando...');
                await connectInstance();
            }
        } catch (error) {
            console.error('Erro ao verificar conexão:', error);
        }
    }, 30000); // Verificar a cada 30 segundos
}
```

2. **Configurar webhook para monitorar CONNECTION_UPDATE:**
```json
{
    "webhook": {
        "events": ["CONNECTION_UPDATE"]
    }
}
```

## 🏠 Problemas de Instância

### Erro ao criar instância

**Erro comum:** `Instance already exists`

**Solução:**
```bash
# Verificar instâncias existentes
curl -X GET "https://sua-api.evolution.com/instance/fetchInstances" \
-H "apikey: sua-chave-global"

# Deletar instância existente se necessário
curl -X DELETE "https://sua-api.evolution.com/instance/delete/nome-instancia" \
-H "apikey: sua-chave-global"
```

### Instância não responde

**Diagnóstico:**
```bash
# Verificar status
curl -X GET "https://sua-api.evolution.com/instance/connectionState/sua-instancia"

# Verificar logs do servidor
tail -f /var/log/evolution-api/evolution.log
```

**Soluções:**
1. Reiniciar instância
2. Verificar recursos do servidor
3. Limpar cache da instância

### Perda de chave API da instância

**Problema:** Perdeu o `hash` retornado na criação da instância

**Soluções:**
1. **Buscar instâncias existentes:**
```bash
curl -X GET "https://sua-api.evolution.com/instance/fetchInstances" \
-H "apikey: sua-chave-global"
```

2. **Recriar instância se necessário:**
```bash
# Deletar instância antiga
curl -X DELETE "https://sua-api.evolution.com/instance/delete/nome-instancia" \
-H "apikey: sua-chave-global"

# Criar nova instância
curl -X POST "https://sua-api.evolution.com/instance/create" \
-H "apikey: sua-chave-global" \
-H "Content-Type: application/json" \
-d '{"instanceName": "nova-instancia", "qrcode": true}'
```

## 💬 Problemas de Mensagens

### Mensagens não são enviadas

**Verificações:**

1. **Formato do número:**
```javascript
// ❌ Incorreto
"11999999999"
"+55 11 99999-9999"

// ✅ Correto
"5511999999999"
```

2. **Verificar se o número está no WhatsApp:**
```javascript
const result = await checkWhatsAppNumbers(["5511999999999"]);
console.log(result); // Deve retornar exists: true
```

3. **Verificar rate limiting:**
```javascript
// Adicionar delay entre mensagens
await sendMessage(number, text);
await sleep(2000); // 2 segundos de delay
```

### Mensagens de mídia falham

**Problemas comuns:**
- URL inacessível
- Formato não suportado
- Arquivo muito grande

**Soluções:**
```javascript
// Verificar URL antes de enviar
async function validateMediaUrl(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Usar formatos suportados
const supportedFormats = {
    image: ['jpg', 'jpeg', 'png', 'gif'],
    video: ['mp4', 'avi', 'mov'],
    audio: ['mp3', 'wav', 'ogg'],
    document: ['pdf', 'doc', 'docx', 'xls', 'xlsx']
};
```

### Mensagens duplicadas

**Causas:**
- Retry automático
- Múltiplas chamadas da API
- Problemas de rede

**Soluções:**
```javascript
// Implementar idempotência
const messageId = `msg_${Date.now()}_${Math.random()}`;
const messageData = {
    number,
    text,
    messageId // Usar para evitar duplicatas
};
```

## 🔔 Problemas de Webhook

### Webhook não recebe eventos

**Verificações:**

1. **URL acessível:**
```bash
# Testar se a URL responde
curl -X POST "https://seu-webhook.com/evolution" \
-H "Content-Type: application/json" \
-d '{"test": true}'
```

2. **Configuração correta:**
```json
{
    "webhook": {
        "url": "https://seu-webhook.com/evolution",
        "byEvents": false,
        "base64": true,
        "events": [
            "MESSAGES_UPSERT",
            "CONNECTION_UPDATE"
        ]
    }
}
```

3. **Certificado SSL válido:**
```bash
# Verificar SSL
curl -I https://seu-webhook.com
```

### Webhook recebe eventos duplicados

**Soluções:**
```javascript
// Implementar deduplicação
const processedEvents = new Set();

app.post('/webhook', (req, res) => {
    const eventId = `${req.body.event}_${req.body.data.timestamp}`;
    
    if (processedEvents.has(eventId)) {
        return res.status(200).send('Already processed');
    }
    
    processedEvents.add(eventId);
    // Processar evento...
    
    res.status(200).send('OK');
});
```

### Webhook muito lento

**Otimizações:**
```javascript
// Processar assincronamente
app.post('/webhook', (req, res) => {
    // Responder imediatamente
    res.status(200).send('OK');
    
    // Processar em background
    setImmediate(() => {
        processWebhookEvent(req.body);
    });
});

// Usar fila para processamento
const Queue = require('bull');
const webhookQueue = new Queue('webhook processing');

app.post('/webhook', (req, res) => {
    webhookQueue.add('process', req.body);
    res.status(200).send('OK');
});
```

## 👥 Problemas de Grupos

### Não consegue adicionar participantes

**Erros comuns:**
- `privacy_settings`: Configurações de privacidade
- `not_admin`: Sem permissões de administrador
- `participant_limit_reached`: Limite de participantes

**Soluções:**
```javascript
// Verificar se é administrador
const participants = await getGroupParticipants(groupJid);
const isAdmin = participants.some(p => 
    p.id === myNumber && p.admin === 'admin'
);

if (!isAdmin) {
    throw new Error('Sem permissões de administrador');
}

// Adicionar participantes em lotes pequenos
async function addParticipantsBatch(groupJid, numbers, batchSize = 5) {
    for (let i = 0; i < numbers.length; i += batchSize) {
        const batch = numbers.slice(i, i + batchSize);
        await addParticipants(groupJid, batch);
        await sleep(2000); // Delay entre lotes
    }
}
```

### Grupo não é criado

**Verificações:**
```javascript
// Validar participantes antes de criar
async function createGroupSafe(subject, description, participants) {
    // Verificar se números estão no WhatsApp
    const validNumbers = await checkWhatsAppNumbers(participants);
    const activeNumbers = validNumbers
        .filter(n => n.exists)
        .map(n => n.jid.replace('@s.whatsapp.net', ''));
    
    if (activeNumbers.length < 2) {
        throw new Error('Pelo menos 2 participantes ativos são necessários');
    }
    
    return await createGroup(subject, description, activeNumbers);
}
```

## ⚠️ Códigos de Erro

### HTTP Status Codes

| Código | Significado | Solução |
|--------|-------------|---------|
| 400 | Bad Request | Verificar formato dos dados |
| 401 | Unauthorized | Verificar API key |
| 403 | Forbidden | Verificar permissões |
| 404 | Not Found | Verificar endpoint/instância |
| 429 | Too Many Requests | Implementar rate limiting |
| 500 | Internal Server Error | Verificar logs do servidor |

### Erros Específicos da Evolution API

```javascript
// Tratamento de erros específicos
async function handleApiError(error) {
    if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
            case 400:
                if (data.message?.includes('Instance not found')) {
                    console.log('Instância não encontrada. Criando nova...');
                    await createInstance();
                }
                break;
                
            case 401:
                console.log('API key inválida. Verificar configuração.');
                break;
                
            case 429:
                console.log('Rate limit atingido. Aguardando...');
                await sleep(60000); // Aguardar 1 minuto
                break;
                
            default:
                console.error('Erro não tratado:', data);
        }
    }
}
```

## 📊 Logs e Monitoramento

### Configurar Logging

```javascript
// Logger estruturado
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'evolution-api.log' }),
        new winston.transports.Console()
    ]
});

// Usar em requisições
async function apiRequest(endpoint, data) {
    logger.info('API Request', { endpoint, data });
    
    try {
        const result = await makeRequest(endpoint, data);
        logger.info('API Response', { endpoint, result });
        return result;
    } catch (error) {
        logger.error('API Error', { endpoint, error: error.message });
        throw error;
    }
}
```

### Health Check

```javascript
// Endpoint de health check
app.get('/health', async (req, res) => {
    try {
        const status = await checkConnectionStatus();
        const health = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            instance: {
                name: config.instance,
                state: status.state
            }
        };
        
        res.json(health);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
});
```

### Métricas

```javascript
// Contador de mensagens
let messageCount = 0;
let errorCount = 0;

function incrementMessageCount() {
    messageCount++;
}

function incrementErrorCount() {
    errorCount++;
}

// Endpoint de métricas
app.get('/metrics', (req, res) => {
    res.json({
        messages_sent: messageCount,
        errors: errorCount,
        uptime: process.uptime()
    });
});
```

## 🚀 Performance

### Otimização de Requisições

```javascript
// Pool de conexões
const https = require('https');
const agent = new https.Agent({
    keepAlive: true,
    maxSockets: 10
});

// Usar o agent nas requisições
const response = await fetch(url, {
    agent,
    ...options
});
```

### Cache

```javascript
// Cache simples para verificação de números
const numberCache = new Map();

async function checkWhatsAppNumbersCached(numbers) {
    const uncachedNumbers = numbers.filter(n => !numberCache.has(n));
    
    if (uncachedNumbers.length > 0) {
        const results = await checkWhatsAppNumbers(uncachedNumbers);
        results.forEach(result => {
            numberCache.set(result.jid.replace('@s.whatsapp.net', ''), result);
        });
    }
    
    return numbers.map(n => numberCache.get(n));
}
```

### Rate Limiting

```javascript
// Implementar fila de mensagens
class MessageQueue {
    constructor(delayMs = 2000) {
        this.queue = [];
        this.processing = false;
        this.delay = delayMs;
    }
    
    add(message) {
        this.queue.push(message);
        this.process();
    }
    
    async process() {
        if (this.processing || this.queue.length === 0) return;
        
        this.processing = true;
        
        while (this.queue.length > 0) {
            const message = this.queue.shift();
            try {
                await this.sendMessage(message);
                await this.sleep(this.delay);
            } catch (error) {
                console.error('Erro ao enviar mensagem:', error);
            }
        }
        
        this.processing = false;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
```

## 🔒 Segurança

### Validação de Entrada

```javascript
// Validar números de telefone
function validatePhoneNumber(number) {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length < 10 || cleaned.length > 15) {
        throw new Error('Número de telefone inválido');
    }
    return cleaned;
}

// Sanitizar texto
function sanitizeText(text) {
    return text.replace(/[<>]/g, '').substring(0, 4096);
}
```

### Rate Limiting por IP

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requisições por IP
    message: 'Muitas requisições deste IP'
});

app.use('/api/', limiter);
```

### Autenticação

```javascript
// Middleware de autenticação
function authenticateApiKey(req, res, next) {
    const apiKey = req.headers['apikey'];
    
    if (!apiKey || !isValidApiKey(apiKey)) {
        return res.status(401).json({ error: 'API key inválida' });
    }
    
    next();
}

app.use('/api/', authenticateApiKey);
```

## 🆘 Quando Buscar Ajuda

### Informações para Suporte

Ao reportar problemas, inclua:

1. **Versão da Evolution API**
2. **Logs relevantes**
3. **Configuração (sem dados sensíveis)**
4. **Passos para reproduzir o problema**
5. **Comportamento esperado vs atual**

### Exemplo de Report

```
**Problema:** Mensagens não são enviadas

**Versão:** Evolution API v2.2.2

**Configuração:**
- Instância: minha-instancia
- Integração: WHATSAPP-BAILEYS
- Webhook: Configurado

**Logs:**
```
2024-01-15 10:30:00 ERROR: Failed to send message to 5511999999999
2024-01-15 10:30:00 ERROR: Connection state: close
```

**Passos para reproduzir:**
1. Criar instância
2. Conectar via QR Code
3. Tentar enviar mensagem
4. Mensagem falha

**Comportamento esperado:** Mensagem deveria ser enviada
**Comportamento atual:** Erro de conexão
```

## 📚 Recursos Adicionais

- [Documentação Oficial](https://evolution-api.com)
- [GitHub Issues](https://github.com/EvolutionAPI/evolution-api)
- [Comunidade Discord](https://discord.gg/evolution-api)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/evolution-api)

---

💡 **Dica:** Mantenha sempre backups das suas configurações e implemente monitoramento proativo para detectar problemas antes que afetem os usuários.