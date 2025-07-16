# Settings (Configurações) - Evolution API

Gerenciamento de configurações da instância do WhatsApp.

## 📋 Endpoints Disponíveis

### 1. Definir Configurações
**POST** `/settings/set/{instance}`

Define as configurações de comportamento da instância.

#### Body
```json
{
    "rejectCall": true,
    "msgCall": "Não aceito chamadas",
    "groupsIgnore": false,
    "alwaysOnline": true,
    "readMessages": false,
    "syncFullHistory": false,
    "readStatus": false
}
```

#### Parâmetros

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `rejectCall` | boolean | Rejeitar chamadas automaticamente |
| `msgCall` | string | Mensagem enviada ao rejeitar chamadas |
| `groupsIgnore` | boolean | Ignorar mensagens de grupos |
| `alwaysOnline` | boolean | Manter sempre online |
| `readMessages` | boolean | Marcar mensagens como lidas automaticamente |
| `syncFullHistory` | boolean | Sincronizar histórico completo |
| `readStatus` | boolean | Marcar status como visualizado |

#### Resposta
```json
{
    "status": "success",
    "settings": {
        "rejectCall": true,
        "msgCall": "Não aceito chamadas",
        "groupsIgnore": false,
        "alwaysOnline": true,
        "readMessages": false,
        "syncFullHistory": false,
        "readStatus": false
    }
}
```

---

### 2. Buscar Configurações
**GET** `/settings/find/{instance}`

Obtém as configurações atuais da instância.

#### Resposta
```json
{
    "rejectCall": true,
    "msgCall": "Não aceito chamadas",
    "groupsIgnore": false,
    "alwaysOnline": true,
    "readMessages": false,
    "syncFullHistory": false,
    "readStatus": false
}
```

## 🔧 Configurações Detalhadas

### Reject Call (Rejeitar Chamadas)
- **Ativo**: Rejeita automaticamente todas as chamadas recebidas
- **Inativo**: Permite chamadas normalmente
- **Mensagem**: Define texto enviado ao rejeitar (opcional)

```json
{
    "rejectCall": true,
    "msgCall": "Desculpe, não aceito chamadas no momento. Envie uma mensagem!"
}
```

### Groups Ignore (Ignorar Grupos)
- **Ativo**: Não processa mensagens de grupos
- **Inativo**: Processa mensagens de grupos normalmente

```json
{
    "groupsIgnore": false
}
```

### Always Online (Sempre Online)
- **Ativo**: Mantém status sempre como "online"
- **Inativo**: Status normal baseado na atividade

```json
{
    "alwaysOnline": true
}
```

### Read Messages (Ler Mensagens)
- **Ativo**: Marca mensagens como lidas automaticamente
- **Inativo**: Não marca como lida automaticamente

```json
{
    "readMessages": false
}
```

### Sync Full History (Sincronizar Histórico)
- **Ativo**: Sincroniza todo o histórico de mensagens
- **Inativo**: Sincroniza apenas mensagens recentes

```json
{
    "syncFullHistory": false
}
```

### Read Status (Ler Status)
- **Ativo**: Marca status/stories como visualizados
- **Inativo**: Não marca status como visualizados

```json
{
    "readStatus": false
}
```

## 💡 Exemplos de Uso

### Configuração para Bot de Atendimento
```json
{
    "rejectCall": true,
    "msgCall": "Olá! Sou um bot de atendimento. Por favor, envie sua mensagem que responderemos em breve.",
    "groupsIgnore": true,
    "alwaysOnline": true,
    "readMessages": true,
    "syncFullHistory": false,
    "readStatus": false
}
```

### Configuração para Uso Pessoal
```json
{
    "rejectCall": false,
    "msgCall": "",
    "groupsIgnore": false,
    "alwaysOnline": false,
    "readMessages": false,
    "syncFullHistory": true,
    "readStatus": true
}
```

### Configuração para Monitoramento
```json
{
    "rejectCall": true,
    "msgCall": "Esta é uma conta de monitoramento.",
    "groupsIgnore": false,
    "alwaysOnline": false,
    "readMessages": false,
    "syncFullHistory": true,
    "readStatus": false
}
```

## ⚠️ Considerações Importantes

### Performance
- `syncFullHistory: true` pode impactar a performance em contas com muito histórico
- `alwaysOnline: true` pode aumentar o consumo de recursos

### Privacidade
- `readMessages: true` fará com que o remetente veja que a mensagem foi lida
- `readStatus: true` mostrará que você visualizou os status

### Comportamento
- `rejectCall: true` enviará a mensagem definida em `msgCall` automaticamente
- `groupsIgnore: true` pode fazer você perder mensagens importantes de grupos

## 🔄 Atualizando Configurações

### Atualização Parcial
Você pode atualizar apenas algumas configurações:

```json
{
    "alwaysOnline": false,
    "readMessages": true
}
```

### Resetar Configurações
Para voltar às configurações padrão:

```json
{
    "rejectCall": false,
    "msgCall": "",
    "groupsIgnore": false,
    "alwaysOnline": false,
    "readMessages": false,
    "syncFullHistory": false,
    "readStatus": false
}
```

## 📊 Monitoramento

### Verificar Configurações Ativas
```javascript
async function checkSettings() {
    const settings = await fetch(`${baseUrl}/settings/find/${instance}`, {
        headers: { 'apikey': apikey }
    });
    
    const data = await settings.json();
    console.log('Configurações atuais:', data);
    
    return data;
}
```

### Aplicar Configurações Condicionais
```javascript
async function applyBotSettings() {
    const settings = {
        rejectCall: true,
        msgCall: "Bot de atendimento ativo. Envie sua mensagem!",
        alwaysOnline: true,
        readMessages: true
    };
    
    const response = await fetch(`${baseUrl}/settings/set/${instance}`, {
        method: 'POST',
        headers: {
            'apikey': apikey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
    });
    
    return await response.json();
}
```

## 🔔 Eventos Relacionados

As configurações podem afetar os seguintes eventos de webhook:
- `MESSAGES_UPSERT`: Afetado por `readMessages`
- `CALL`: Afetado por `rejectCall`
- `PRESENCE_UPDATE`: Afetado por `alwaysOnline`

## 🛠️ Troubleshooting

### Configurações não aplicadas
1. Verificar se a instância está conectada
2. Confirmar se a API key está correta
3. Reiniciar a instância se necessário

### Comportamento inesperado
1. Verificar configurações atuais com `/settings/find`
2. Comparar com configurações desejadas
3. Reaplicar configurações se necessário

### Performance degradada
1. Desativar `syncFullHistory` se não necessário
2. Considerar `groupsIgnore` para reduzir carga
3. Monitorar uso de recursos do servidor