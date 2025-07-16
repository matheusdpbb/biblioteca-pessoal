# Call (Chamadas) - Evolution API

Funcionalidades para gerenciamento e simulação de chamadas no WhatsApp.

## 📋 Endpoints Disponíveis

### 1. Fake Call (Chamada Falsa)
**POST** `/call/offer/{instance}`

Simula uma chamada para um contato específico.

#### Body
```json
{
    "number": "5511999999999",
    "isVideo": false,
    "callDuration": 3
}
```

#### Parâmetros

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `number` | string | ✅ | Número do destinatário (com código do país) |
| `isVideo` | boolean | ❌ | Se é videochamada (padrão: false) |
| `callDuration` | number | ❌ | Duração da chamada em segundos (padrão: 3) |

#### Resposta
```json
{
    "status": "success",
    "callId": "CALL_ID_123456",
    "message": "Fake call initiated"
}
```

## 🎯 Tipos de Chamada

### Chamada de Voz
```json
{
    "number": "5511999999999",
    "isVideo": false,
    "callDuration": 5
}
```

### Videochamada
```json
{
    "number": "5511999999999",
    "isVideo": true,
    "callDuration": 10
}
```

## 📱 Casos de Uso

### 1. Teste de Conectividade
Verificar se a instância consegue iniciar chamadas:

```javascript
async function testCallFeature() {
    try {
        const result = await fetch(`${baseUrl}/call/offer/${instance}`, {
            method: 'POST',
            headers: {
                'apikey': apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: "5511999999999",
                isVideo: false,
                callDuration: 1
            })
        });
        
        const data = await result.json();
        console.log('Teste de chamada:', data);
        return data;
    } catch (error) {
        console.error('Erro no teste de chamada:', error);
    }
}
```

### 2. Notificação de Chamada
Simular chamada para chamar atenção:

```javascript
async function notificationCall(number) {
    return await fetch(`${baseUrl}/call/offer/${instance}`, {
        method: 'POST',
        headers: {
            'apikey': apikey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            number: number,
            isVideo: false,
            callDuration: 2
        })
    });
}
```

### 3. Teste de Videochamada
```javascript
async function testVideoCall(number) {
    return await fetch(`${baseUrl}/call/offer/${instance}`, {
        method: 'POST',
        headers: {
            'apikey': apikey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            number: number,
            isVideo: true,
            callDuration: 5
        })
    });
}
```

## 🔔 Eventos de Webhook

### Evento CALL
Quando uma chamada é iniciada ou recebida, você receberá um webhook:

```json
{
    "event": "CALL",
    "instance": "minha-instancia",
    "data": {
        "id": "CALL_ID_123456",
        "from": "5511999999999@s.whatsapp.net",
        "to": "5511888888888@s.whatsapp.net",
        "status": "offer",
        "isVideo": false,
        "timestamp": 1640995200
    }
}
```

### Status de Chamada
- `offer`: Chamada oferecida/iniciada
- `accept`: Chamada aceita
- `reject`: Chamada rejeitada
- `timeout`: Chamada expirou

### Processando Eventos de Chamada
```javascript
function handleCallEvent(data) {
    const { id, from, to, status, isVideo } = data;
    
    console.log(`Chamada ${id}: ${status}`);
    console.log(`De: ${from} Para: ${to}`);
    console.log(`Tipo: ${isVideo ? 'Vídeo' : 'Voz'}`);
    
    switch (status) {
        case 'offer':
            console.log('Nova chamada recebida');
            break;
        case 'accept':
            console.log('Chamada aceita');
            break;
        case 'reject':
            console.log('Chamada rejeitada');
            break;
        case 'timeout':
            console.log('Chamada expirou');
            break;
    }
}
```

## ⚙️ Configurações Relacionadas

### Rejeitar Chamadas Automaticamente
Configure a instância para rejeitar chamadas automaticamente:

```json
{
    "rejectCall": true,
    "msgCall": "Desculpe, não aceito chamadas no momento. Envie uma mensagem!"
}
```

### Monitorar Chamadas
Para receber eventos de chamada, configure o webhook:

```json
{
    "webhook": {
        "url": "https://seu-webhook.com/evolution",
        "events": ["CALL"]
    }
}
```

## 🛡️ Limitações e Considerações

### Limitações da API
- Fake calls são apenas simulações
- Não estabelecem conexão real de áudio/vídeo
- Duração limitada (máximo recomendado: 30 segundos)

### Uso Responsável
- Use apenas para testes e notificações
- Não abuse da funcionalidade
- Respeite a privacidade dos usuários

### Rate Limiting
- Limite de chamadas por minuto
- Delay recomendado entre chamadas: 5 segundos

```javascript
// Implementar delay entre chamadas
async function makeCallWithDelay(number, delay = 5000) {
    await notificationCall(number);
    await new Promise(resolve => setTimeout(resolve, delay));
}
```

## 📊 Monitoramento

### Log de Chamadas
```javascript
class CallLogger {
    constructor() {
        this.calls = [];
    }
    
    logCall(callData) {
        this.calls.push({
            ...callData,
            timestamp: new Date().toISOString()
        });
    }
    
    getCallHistory() {
        return this.calls;
    }
    
    getCallStats() {
        return {
            total: this.calls.length,
            video: this.calls.filter(c => c.isVideo).length,
            voice: this.calls.filter(c => !c.isVideo).length
        };
    }
}

const callLogger = new CallLogger();
```

### Métricas de Chamada
```javascript
async function getCallMetrics() {
    const stats = callLogger.getCallStats();
    
    return {
        totalCalls: stats.total,
        videoCalls: stats.video,
        voiceCalls: stats.voice,
        successRate: calculateSuccessRate(),
        averageDuration: calculateAverageDuration()
    };
}
```

## 🔧 Troubleshooting

### Chamada não funciona
1. Verificar se a instância está conectada
2. Confirmar se o número está no formato correto
3. Verificar se o destinatário tem WhatsApp

### Webhook não recebe eventos
1. Verificar configuração do webhook
2. Confirmar se o evento "CALL" está habilitado
3. Testar conectividade do webhook

### Erro de rate limiting
1. Implementar delay entre chamadas
2. Reduzir frequência de chamadas
3. Monitorar limites da API

## 💡 Dicas de Implementação

### Bot de Notificação
```javascript
class CallNotificationBot {
    constructor(apiClient) {
        this.api = apiClient;
        this.callQueue = [];
        this.processing = false;
    }
    
    async addNotification(number, message) {
        this.callQueue.push({ number, message });
        this.processQueue();
    }
    
    async processQueue() {
        if (this.processing || this.callQueue.length === 0) return;
        
        this.processing = true;
        
        while (this.callQueue.length > 0) {
            const { number, message } = this.callQueue.shift();
            
            try {
                // Fazer chamada de notificação
                await this.api.makeCall(number, false, 2);
                
                // Aguardar um pouco e enviar mensagem
                await this.sleep(3000);
                await this.api.sendMessage(number, message);
                
                // Delay entre notificações
                await this.sleep(5000);
            } catch (error) {
                console.error('Erro na notificação:', error);
            }
        }
        
        this.processing = false;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
```

### Sistema de Alerta
```javascript
async function emergencyAlert(contacts, message) {
    for (const contact of contacts) {
        try {
            // Chamada de emergência
            await notificationCall(contact);
            
            // Aguardar e enviar mensagem
            await sleep(2000);
            await sendMessage(contact, `🚨 ALERTA: ${message}`);
            
            // Delay entre contatos
            await sleep(3000);
        } catch (error) {
            console.error(`Erro ao alertar ${contact}:`, error);
        }
    }
}
```

## 📚 Exemplos Avançados

### Teste de Conectividade Completo
```javascript
async function fullConnectivityTest() {
    const testNumber = "5511999999999";
    
    try {
        // Teste de chamada de voz
        console.log('Testando chamada de voz...');
        await testCallFeature(testNumber, false);
        
        await sleep(5000);
        
        // Teste de videochamada
        console.log('Testando videochamada...');
        await testCallFeature(testNumber, true);
        
        console.log('✅ Testes de chamada concluídos');
    } catch (error) {
        console.error('❌ Erro nos testes:', error);
    }
}
```

### Integração com Sistema de Monitoramento
```javascript
async function monitoringCall(alertLevel, contacts) {
    const callDuration = alertLevel === 'critical' ? 10 : 3;
    const isVideo = alertLevel === 'critical';
    
    for (const contact of contacts) {
        await fetch(`${baseUrl}/call/offer/${instance}`, {
            method: 'POST',
            headers: {
                'apikey': apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: contact,
                isVideo: isVideo,
                callDuration: callDuration
            })
        });
        
        await sleep(2000);
    }
}