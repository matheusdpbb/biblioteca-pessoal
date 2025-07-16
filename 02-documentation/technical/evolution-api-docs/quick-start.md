# 🚀 Guia de Início Rápido - Evolution API

Este guia te ajudará a começar a usar a Evolution API rapidamente com exemplos práticos.

## 📋 Pré-requisitos

- Servidor Evolution API configurado
- Chave API global (`globalApikey`)
- Cliente HTTP (Postman, Insomnia, curl, etc.)

## 🔧 Configuração Inicial

### 1. Variáveis de Ambiente

Configure estas variáveis no seu cliente HTTP:

```json
{
    "baseUrl": "https://sua-api.evolution.com",
    "globalApikey": "sua-chave-global-aqui",
    "instance": "minha-primeira-instancia",
    "webhookUrl": "https://seu-webhook.com/evolution"
}
```

## 🎯 Primeiros Passos

### Passo 1: Criar uma Instância

**POST** `{{baseUrl}}/instance/create`

```json
{
    "instanceName": "{{instance}}",
    "qrcode": true,
    "integration": "WHATSAPP-BAILEYS",
    "webhook": {
        "url": "{{webhookUrl}}",
        "byEvents": false,
        "base64": true,
        "events": [
            "QRCODE_UPDATED",
            "CONNECTION_UPDATE",
            "MESSAGES_UPSERT"
        ]
    }
}
```

**Headers:**
```
apikey: {{globalApikey}}
Content-Type: application/json
```

**Resposta:**
```json
{
    "instance": {
        "instanceName": "minha-primeira-instancia",
        "status": "created"
    },
    "hash": "ABC123DEF456", // ⚠️ SALVE ESTA CHAVE!
    "qrcode": {
        "base64": "data:image/png;base64,..."
    }
}
```

> 🔑 **IMPORTANTE**: Salve o `hash` retornado - ele será sua `apikey` para esta instância!

### Passo 2: Conectar ao WhatsApp

1. **Escaneie o QR Code** retornado na resposta anterior com seu WhatsApp
2. **Aguarde a conexão** - você receberá um webhook com `CONNECTION_UPDATE`
3. **Verifique o status** da conexão:

**GET** `{{baseUrl}}/instance/connectionState/{{instance}}`

```json
{
    "instance": "minha-primeira-instancia",
    "state": "open"
}
```

### Passo 3: Enviar sua Primeira Mensagem

**POST** `{{baseUrl}}/message/sendText/{{instance}}`

```json
{
    "number": "5511999999999",
    "text": "🎉 Olá! Esta é minha primeira mensagem via Evolution API!"
}
```

**Headers:**
```
apikey: ABC123DEF456
Content-Type: application/json
```

## 📱 Exemplos Práticos

### 1. Verificar se um Número está no WhatsApp

```bash
curl -X POST "{{baseUrl}}/chat/whatsappNumbers/{{instance}}" \
-H "apikey: {{apikey}}" \
-H "Content-Type: application/json" \
-d '{
    "numbers": [
        "5511999999999",
        "5511888888888"
    ]
}'
```

### 2. Enviar Imagem com Legenda

```json
{
    "number": "5511999999999",
    "mediatype": "image",
    "mimetype": "image/jpeg",
    "caption": "Olha que foto legal! 📸",
    "media": "https://picsum.photos/800/600",
    "fileName": "foto-aleatoria.jpg"
}
```

### 3. Criar um Grupo

```json
{
    "subject": "Meu Primeiro Grupo via API",
    "description": "Grupo criado automaticamente pela Evolution API",
    "participants": [
        "5511999999999",
        "5511888888888",
        "5511777777777"
    ]
}
```

### 4. Enviar Lista Interativa

```json
{
    "number": "5511999999999",
    "title": "Escolha uma Opção",
    "description": "Selecione uma das opções abaixo:",
    "buttonText": "Ver Opções",
    "footerText": "Evolution API",
    "sections": [
        {
            "title": "Serviços",
            "rows": [
                {
                    "title": "Suporte Técnico",
                    "description": "Precisa de ajuda técnica?",
                    "rowId": "suporte"
                },
                {
                    "title": "Vendas",
                    "description": "Interessado em nossos produtos?",
                    "rowId": "vendas"
                }
            ]
        }
    ]
}
```

### 5. Enviar Botões Interativos

```json
{
    "number": "5511999999999",
    "title": "Confirmação de Pedido",
    "description": "Seu pedido #1234 está pronto para envio.",
    "footer": "Evolution API - Automação",
    "buttons": [
        {
            "type": "reply",
            "displayText": "✅ Confirmar",
            "id": "confirmar_pedido"
        },
        {
            "type": "reply",
            "displayText": "❌ Cancelar",
            "id": "cancelar_pedido"
        },
        {
            "type": "url",
            "displayText": "🔗 Rastrear",
            "url": "https://rastreamento.com/1234"
        }
    ]
}
```

## 🔔 Configurando Webhooks

### Exemplo de Webhook Receiver (Node.js/Express)

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/evolution-webhook', (req, res) => {
    const { event, instance, data } = req.body;
    
    console.log(`Evento recebido: ${event} da instância: ${instance}`);
    
    switch(event) {
        case 'MESSAGES_UPSERT':
            handleNewMessage(data);
            break;
        case 'CONNECTION_UPDATE':
            handleConnectionUpdate(data);
            break;
        case 'QRCODE_UPDATED':
            handleQRCodeUpdate(data);
            break;
    }
    
    res.status(200).send('OK');
});

function handleNewMessage(data) {
    const message = data.messages[0];
    const from = message.key.remoteJid;
    const text = message.message?.conversation;
    
    if (text && !message.key.fromMe) {
        console.log(`Nova mensagem de ${from}: ${text}`);
        
        // Resposta automática
        if (text.toLowerCase().includes('oi')) {
            sendAutoReply(from, 'Olá! Como posso ajudar?');
        }
    }
}

function sendAutoReply(number, text) {
    // Implementar envio de resposta automática
    fetch(`${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.INSTANCE}`, {
        method: 'POST',
        headers: {
            'apikey': process.env.API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            number: number.replace('@s.whatsapp.net', ''),
            text: text
        })
    });
}

app.listen(3000, () => {
    console.log('Webhook server rodando na porta 3000');
});
```

## 🛠️ Casos de Uso Comuns

### 1. Bot de Atendimento Básico

```javascript
// Resposta automática baseada em palavras-chave
const responses = {
    'horario': 'Nosso horário de funcionamento é de segunda a sexta, das 9h às 18h.',
    'preço': 'Para informações sobre preços, fale com nosso vendedor: (11) 99999-9999',
    'suporte': 'Para suporte técnico, envie um email para: suporte@empresa.com'
};

function handleMessage(text, from) {
    const keyword = Object.keys(responses).find(key => 
        text.toLowerCase().includes(key)
    );
    
    if (keyword) {
        sendMessage(from, responses[keyword]);
    }
}
```

### 2. Notificações Automáticas

```javascript
// Enviar notificação para lista de contatos
async function sendBulkNotification(message, contacts) {
    for (const contact of contacts) {
        await sendMessage(contact, message);
        await sleep(2000); // Delay de 2 segundos entre envios
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

### 3. Backup de Conversas

```javascript
// Buscar e salvar mensagens
async function backupConversation(chatId) {
    const messages = await fetch(`${API_URL}/chat/findMessages/${INSTANCE}?remoteJid=${chatId}&limit=1000`);
    const data = await messages.json();
    
    // Salvar em arquivo ou banco de dados
    fs.writeFileSync(`backup_${chatId}_${Date.now()}.json`, JSON.stringify(data, null, 2));
}
```

## 🔍 Monitoramento e Debug

### 1. Verificar Status da Instância

```bash
# Script para monitorar status
#!/bin/bash
while true; do
    status=$(curl -s "${BASE_URL}/instance/connectionState/${INSTANCE}" | jq -r '.state')
    echo "$(date): Status da instância: $status"
    
    if [ "$status" != "open" ]; then
        echo "⚠️ Instância desconectada! Tentando reconectar..."
        curl -X GET "${BASE_URL}/instance/connect/${INSTANCE}"
    fi
    
    sleep 30
done
```

### 2. Log de Mensagens

```javascript
// Middleware para log de todas as requisições
app.use('/api', (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log('Body:', JSON.stringify(req.body, null, 2));
    next();
});
```

## ⚠️ Boas Práticas

### 1. Rate Limiting
```javascript
// Implementar delay entre mensagens
const messageQueue = [];
const DELAY_BETWEEN_MESSAGES = 2000; // 2 segundos

setInterval(() => {
    if (messageQueue.length > 0) {
        const message = messageQueue.shift();
        sendMessage(message.number, message.text);
    }
}, DELAY_BETWEEN_MESSAGES);
```

### 2. Tratamento de Erros
```javascript
async function sendMessageSafe(number, text) {
    try {
        const response = await fetch(`${API_URL}/message/sendText/${INSTANCE}`, {
            method: 'POST',
            headers: {
                'apikey': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number, text })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        // Implementar retry ou notificação de erro
    }
}
```

### 3. Validação de Números
```javascript
function isValidWhatsAppNumber(number) {
    // Remover caracteres não numéricos
    const cleanNumber = number.replace(/\D/g, '');
    
    // Verificar se tem pelo menos 10 dígitos (código país + número)
    return cleanNumber.length >= 10 && cleanNumber.length <= 15;
}
```

## 🎯 Próximos Passos

1. **Explore a documentação completa** em `/endpoints/`
2. **Configure webhooks** para automação avançada
3. **Implemente rate limiting** para evitar bloqueios
4. **Monitore logs** e status da instância
5. **Teste em ambiente de desenvolvimento** antes da produção

## 🆘 Solução de Problemas

### Instância não conecta
- Verifique se o QR Code foi escaneado
- Confirme se o número não está sendo usado em outro lugar
- Reinicie a instância: `POST /instance/restart/{instance}`

### Mensagens não são enviadas
- Verifique se o número está no formato correto
- Confirme se o destinatário tem WhatsApp
- Verifique rate limits

### Webhooks não funcionam
- Teste se a URL está acessível
- Verifique se está retornando status 200
- Confirme os eventos configurados

---

🎉 **Parabéns!** Você está pronto para usar a Evolution API. Para dúvidas, consulte a documentação completa ou entre em contato com o suporte.