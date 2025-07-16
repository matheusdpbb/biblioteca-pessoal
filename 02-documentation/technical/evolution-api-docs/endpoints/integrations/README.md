# Integrations (Integrações) - Evolution API

Sistema completo de integrações da Evolution API com diferentes plataformas e serviços.

## 📋 Categorias de Integração

### 🔔 Events (Eventos)
- [Webhook](#webhook)
- [WebSocket](#websocket)
- [RabbitMQ](#rabbitmq)
- [AWS SQS](#aws-sqs)

### 🤖 Chatbots
- [Chatwoot](#chatwoot)
- [Typebot](#typebot)

## 🔔 Events (Eventos)

### Webhook

#### Configurar Webhook
**POST** `/webhook/set/{instance}`

```json
{
    "webhook": {
        "enabled": true,
        "url": "https://seu-webhook.com/evolution",
        "headers": {
            "authorization": "Bearer TOKEN",
            "Content-Type": "application/json"
        },
        "byEvents": false,
        "base64": false,
        "events": [
            "APPLICATION_STARTUP",
            "QRCODE_UPDATED",
            "MESSAGES_UPSERT",
            "CONNECTION_UPDATE",
            "CALL"
        ]
    }
}
```

#### Buscar Configuração do Webhook
**GET** `/webhook/find/{instance}`

### WebSocket

#### Configurar WebSocket
**POST** `/websocket/set/{instance}`

```json
{
    "websocket": {
        "enabled": true,
        "events": [
            "APPLICATION_STARTUP",
            "QRCODE_UPDATED",
            "MESSAGES_UPSERT",
            "CONNECTION_UPDATE"
        ]
    }
}
```

#### Buscar Configuração do WebSocket
**GET** `/websocket/find/{instance}`

### RabbitMQ

#### Configurar RabbitMQ
**POST** `/rabbitmq/set/{instance}`

```json
{
    "rabbitmq": {
        "enabled": true,
        "events": [
            "APPLICATION_STARTUP",
            "QRCODE_UPDATED",
            "MESSAGES_UPSERT",
            "MESSAGES_UPDATE",
            "CONNECTION_UPDATE",
            "CALL"
        ]
    }
}
```

#### Buscar Configuração do RabbitMQ
**GET** `/rabbitmq/find/{instance}`

### AWS SQS

#### Configurar SQS
**POST** `/sqs/set/{instance}`

```json
{
    "sqs": {
        "enabled": true,
        "events": [
            "APPLICATION_STARTUP",
            "QRCODE_UPDATED",
            "MESSAGES_UPSERT",
            "CONNECTION_UPDATE"
        ]
    }
}
```

#### Buscar Configuração do SQS
**GET** `/sqs/find/{instance}`

## 🤖 Chatbots

### Chatwoot

#### Configurar Chatwoot
**POST** `/chatwoot/set/{instance}`

```json
{
    "enabled": true,
    "accountId": "1",
    "token": "SEU_TOKEN_CHATWOOT",
    "url": "https://seu-chatwoot.com",
    "signMsg": true,
    "reopenConversation": true,
    "conversationPending": false,
    "nameInbox": "evolution",
    "mergeBrazilContacts": true,
    "importContacts": true,
    "importMessages": true,
    "daysLimitImportMessages": 2,
    "signDelimiter": "\n",
    "autoCreate": true,
    "organization": "Sua Empresa",
    "logo": "https://seu-logo.com/logo.png",
    "ignoreJids": [
        "@g.us"
    ]
}
```

#### Parâmetros do Chatwoot

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `enabled` | boolean | Habilitar integração |
| `accountId` | string | ID da conta no Chatwoot |
| `token` | string | Token de acesso do Chatwoot |
| `url` | string | URL da instância Chatwoot |
| `signMsg` | boolean | Assinar mensagens |
| `reopenConversation` | boolean | Reabrir conversas automaticamente |
| `conversationPending` | boolean | Deixar conversas pendentes |
| `nameInbox` | string | Nome da caixa de entrada |
| `mergeBrazilContacts` | boolean | Mesclar contatos brasileiros |
| `importContacts` | boolean | Importar contatos |
| `importMessages` | boolean | Importar mensagens |
| `daysLimitImportMessages` | number | Limite de dias para importar mensagens |
| `ignoreJids` | array | JIDs para ignorar |

#### Buscar Configuração do Chatwoot
**GET** `/chatwoot/find/{instance}`

### Typebot

#### Configurar Configurações Padrão
**POST** `/typebot/settings/{instance}`

```json
{
    "expire": 20,
    "keywordFinish": "#SAIR",
    "delayMessage": 1000,
    "unknownMessage": "Mensagem não reconhecida",
    "listeningFromMe": false,
    "stopBotFromMe": false,
    "keepOpen": false,
    "debounceTime": 10,
    "ignoreJids": [],
    "typebotIdFallback": "typebot-id-fallback"
}
```

#### Criar Typebot
**POST** `/typebot/create/{instance}`

```json
{
    "enabled": true,
    "url": "https://seu-typebot.com",
    "typebot": "meu-typebot-id",
    "triggerType": "keyword",
    "triggerOperator": "contains",
    "triggerValue": "atendimento",
    "expire": 20,
    "keywordFinish": "#SAIR",
    "delayMessage": 1000,
    "unknownMessage": "Mensagem não reconhecida",
    "listeningFromMe": false,
    "stopBotFromMe": false,
    "keepOpen": false,
    "debounceTime": 10
}
```

#### Parâmetros do Typebot

| Campo | Tipo | Opções | Descrição |
|-------|------|--------|-----------|
| `triggerType` | string | `all`, `keyword` | Tipo de gatilho |
| `triggerOperator` | string | `contains`, `equals`, `startsWith`, `endsWith`, `regex` | Operador do gatilho |
| `triggerValue` | string | - | Valor do gatilho |
| `expire` | number | - | Tempo de expiração em minutos |
| `keywordFinish` | string | - | Palavra-chave para finalizar |
| `delayMessage` | number | - | Delay entre mensagens (ms) |
| `unknownMessage` | string | - | Mensagem para entrada não reconhecida |
| `listeningFromMe` | boolean | - | Escutar mensagens próprias |
| `stopBotFromMe` | boolean | - | Parar bot com mensagens próprias |
| `keepOpen` | boolean | - | Manter sessão aberta |
| `debounceTime` | number | - | Tempo de debounce (segundos) |

#### Outros Endpoints do Typebot

- **Buscar Typebots**: `GET /typebot/find/{instance}`
- **Buscar Typebot Específico**: `GET /typebot/fetch/{typebotId}/{instance}`
- **Atualizar Typebot**: `PUT /typebot/update/{typebotId}/{instance}`
- **Deletar Typebot**: `DELETE /typebot/delete/{typebotId}/{instance}`
- **Iniciar Typebot**: `POST /typebot/start/{instance}`
- **Buscar Configurações**: `GET /typebot/fetchSettings/{instance}`

#### Gerenciar Sessões do Typebot

**Alterar Status da Sessão**
**POST** `/typebot/changeStatus/{instance}`

```json
{
    "remoteJid": "5511999999999@s.whatsapp.net",
    "status": "closed"
}
```

Status disponíveis: `opened`, `paused`, `closed`

**Buscar Sessões**
**GET** `/typebot/fetchSessions/{typebotId}/{instance}`

## 📊 Eventos Disponíveis

### Lista Completa de Eventos

```javascript
const AVAILABLE_EVENTS = [
    "APPLICATION_STARTUP",      // Inicialização da aplicação
    "QRCODE_UPDATED",          // Atualização do QR Code
    "MESSAGES_SET",            // Configuração de mensagens
    "MESSAGES_UPSERT",         // Nova mensagem ou atualização
    "MESSAGES_UPDATE",         // Atualização de mensagem
    "MESSAGES_DELETE",         // Exclusão de mensagem
    "SEND_MESSAGE",            // Envio de mensagem
    "CONTACTS_SET",            // Configuração de contatos
    "CONTACTS_UPSERT",         // Novo contato ou atualização
    "CONTACTS_UPDATE",         // Atualização de contato
    "PRESENCE_UPDATE",         // Atualização de presença
    "CHATS_SET",              // Configuração de chats
    "CHATS_UPSERT",           // Novo chat ou atualização
    "CHATS_UPDATE",           // Atualização de chat
    "CHATS_DELETE",           // Exclusão de chat
    "GROUPS_UPSERT",          // Novo grupo ou atualização
    "GROUP_UPDATE",           // Atualização de grupo
    "GROUP_PARTICIPANTS_UPDATE", // Atualização de participantes
    "CONNECTION_UPDATE",       // Atualização de conexão
    "LABELS_EDIT",            // Edição de etiquetas
    "LABELS_ASSOCIATION",     // Associação de etiquetas
    "CALL",                   // Chamadas
    "TYPEBOT_START",          // Início do Typebot
    "TYPEBOT_CHANGE_STATUS"   // Mudança de status do Typebot
];
```

## 💻 Exemplos de Implementação

### Configuração Completa de Webhook
```javascript
async function setupWebhook() {
    const webhookConfig = {
        webhook: {
            enabled: true,
            url: "https://seu-webhook.com/evolution",
            headers: {
                "authorization": "Bearer SEU_TOKEN",
                "Content-Type": "application/json",
                "x-api-key": "sua-chave-api"
            },
            byEvents: false,
            base64: true,
            events: [
                "MESSAGES_UPSERT",
                "CONNECTION_UPDATE",
                "QRCODE_UPDATED",
                "CALL"
            ]
        }
    };

    try {
        const response = await fetch(`${baseUrl}/webhook/set/${instance}`, {
            method: 'POST',
            headers: {
                'apikey': apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(webhookConfig)
        });

        const result = await response.json();
        console.log('Webhook configurado:', result);
        return result;
    } catch (error) {
        console.error('Erro ao configurar webhook:', error);
    }
}
```

### Configuração do Chatwoot
```javascript
async function setupChatwoot() {
    const chatwootConfig = {
        enabled: true,
        accountId: "1",
        token: process.env.CHATWOOT_TOKEN,
        url: "https://seu-chatwoot.com",
        signMsg: true,
        reopenConversation: true,
        conversationPending: false,
        nameInbox: "WhatsApp Evolution",
        mergeBrazilContacts: true,
        importContacts: true,
        importMessages: true,
        daysLimitImportMessages: 7,
        autoCreate: true,
        organization: "Sua Empresa",
        logo: "https://seu-site.com/logo.png",
        ignoreJids: ["@g.us"] // Ignorar grupos
    };

    try {
        const response = await fetch(`${baseUrl}/chatwoot/set/${instance}`, {
            method: 'POST',
            headers: {
                'apikey': apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chatwootConfig)
        });

        return await response.json();
    } catch (error) {
        console.error('Erro ao configurar Chatwoot:', error);
    }
}
```

### Configuração do Typebot
```javascript
async function setupTypebot() {
    // Primeiro, configurar as configurações padrão
    const defaultSettings = {
        expire: 30,
        keywordFinish: "#SAIR",
        delayMessage: 1500,
        unknownMessage: "Desculpe, não entendi. Digite #SAIR para encerrar.",
        listeningFromMe: false,
        stopBotFromMe: true,
        keepOpen: false,
        debounceTime: 5,
        ignoreJids: ["@g.us"],
        typebotIdFallback: "typebot-fallback-id"
    };

    await fetch(`${baseUrl}/typebot/settings/${instance}`, {
        method: 'POST',
        headers: {
            'apikey': apikey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(defaultSettings)
    });

    // Depois, criar o typebot específico
    const typebotConfig = {
        enabled: true,
        url: "https://seu-typebot.com",
        typebot: "meu-typebot-id",
        triggerType: "keyword",
        triggerOperator: "contains",
        triggerValue: "atendimento",
        expire: 30,
        keywordFinish: "#SAIR",
        delayMessage: 1500,
        unknownMessage: "Não entendi. Digite 'atendimento' para começar.",
        listeningFromMe: false,
        stopBotFromMe: true,
        keepOpen: false,
        debounceTime: 5
    };

    try {
        const response = await fetch(`${baseUrl}/typebot/create/${instance}`, {
            method: 'POST',
            headers: {
                'apikey': apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(typebotConfig)
        });

        return await response.json();
    } catch (error) {
        console.error('Erro ao configurar Typebot:', error);
    }
}
```

### Configuração de Múltiplas Integrações
```javascript
class IntegrationManager {
    constructor(apiClient) {
        this.api = apiClient;
    }

    async setupAll() {
        try {
            // Configurar Webhook
            await this.setupWebhook();
            
            // Configurar Chatwoot (se habilitado)
            if (process.env.ENABLE_CHATWOOT === 'true') {
                await this.setupChatwoot();
            }
            
            // Configurar Typebot (se habilitado)
            if (process.env.ENABLE_TYPEBOT === 'true') {
                await this.setupTypebot();
            }
            
            // Configurar RabbitMQ (se habilitado)
            if (process.env.ENABLE_RABBITMQ === 'true') {
                await this.setupRabbitMQ();
            }

            console.log('✅ Todas as integrações configuradas');
        } catch (error) {
            console.error('❌ Erro ao configurar integrações:', error);
        }
    }

    async setupWebhook() {
        const config = {
            webhook: {
                enabled: true,
                url: process.env.WEBHOOK_URL,
                headers: {
                    "authorization": `Bearer ${process.env.WEBHOOK_TOKEN}`,
                    "Content-Type": "application/json"
                },
                byEvents: false,
                base64: true,
                events: ["MESSAGES_UPSERT", "CONNECTION_UPDATE"]
            }
        };

        return await this.api.setWebhook(config);
    }

    async setupChatwoot() {
        const config = {
            enabled: true,
            accountId: process.env.CHATWOOT_ACCOUNT_ID,
            token: process.env.CHATWOOT_TOKEN,
            url: process.env.CHATWOOT_URL,
            signMsg: true,
            reopenConversation: true,
            nameInbox: "Evolution API",
            importContacts: true,
            importMessages: true
        };

        return await this.api.setChatwoot(config);
    }

    async setupTypebot() {
        const config = {
            enabled: true,
            url: process.env.TYPEBOT_URL,
            typebot: process.env.TYPEBOT_ID,
            triggerType: "keyword",
            triggerOperator: "contains",
            triggerValue: "bot",
            expire: 20,
            keywordFinish: "#SAIR"
        };

        return await this.api.createTypebot(config);
    }

    async setupRabbitMQ() {
        const config = {
            rabbitmq: {
                enabled: true,
                events: [
                    "MESSAGES_UPSERT",
                    "CONNECTION_UPDATE",
                    "CALL"
                ]
            }
        };

        return await this.api.setRabbitMQ(config);
    }
}
```

## 🔧 Monitoramento e Troubleshooting

### Verificar Status das Integrações
```javascript
async function checkIntegrationsStatus() {
    const integrations = ['webhook', 'chatwoot', 'typebot', 'rabbitmq'];
    const status = {};

    for (const integration of integrations) {
        try {
            const response = await fetch(`${baseUrl}/${integration}/find/${instance}`, {
                headers: { 'apikey': apikey }
            });
            
            if (response.ok) {
                status[integration] = await response.json();
            } else {
                status[integration] = { error: 'Not configured' };
            }
        } catch (error) {
            status[integration] = { error: error.message };
        }
    }

    return status;
}
```

### Health Check das Integrações
```javascript
async function healthCheckIntegrations() {
    const status = await checkIntegrationsStatus();
    
    console.log('🔍 Status das Integrações:');
    
    Object.entries(status).forEach(([integration, config]) => {
        if (config.error) {
            console.log(`❌ ${integration}: ${config.error}`);
        } else if (config.enabled) {
            console.log(`✅ ${integration}: Ativo`);
        } else {
            console.log(`⚠️ ${integration}: Configurado mas inativo`);
        }
    });
    
    return status;
}
```

## ⚠️ Considerações Importantes

### Segurança
- Sempre use HTTPS para webhooks
- Implemente autenticação nos endpoints
- Valide tokens e assinaturas
- Use headers de autorização

### Performance
- Configure apenas os eventos necessários
- Implemente rate limiting nos webhooks
- Use filas para processamento assíncrono
- Monitore o desempenho das integrações

### Confiabilidade
- Implemente retry automático
- Configure timeouts adequados
- Monitore falhas de entrega
- Mantenha logs detalhados

### Manutenção
- Documente todas as configurações
- Mantenha backup das configurações
- Teste regularmente as integrações
- Monitore mudanças nas APIs externas

## 📚 Recursos Adicionais

- [Documentação do Chatwoot](https://www.chatwoot.com/docs/)
- [Documentação do Typebot](https://docs.typebot.io/)
- [RabbitMQ Documentation](https://www.rabbitmq.com/documentation.html)
- [AWS SQS Documentation](https://docs.aws.amazon.com/sqs/)