# Instance (Instância) - Evolution API

Gerenciamento completo de instâncias do WhatsApp na Evolution API.

## 📋 Endpoints Disponíveis

### 1. Criar Instância
**POST** `/instance/create`

Cria uma nova instância do WhatsApp.

#### Headers
```
apikey: {{globalApikey}}
Content-Type: application/json
```

#### Body
```json
{
    "instanceName": "minha-instancia",
    "qrcode": true,
    "integration": "WHATSAPP-BAILEYS",
    
    // Configurações opcionais
    "rejectCall": false,
    "msgCall": "",
    "groupsIgnore": false,
    "alwaysOnline": false,
    "readMessages": false,
    "readStatus": false,
    "syncFullHistory": false,
    
    // Proxy (opcional)
    "proxyHost": "",
    "proxyPort": "",
    "proxyProtocol": "",
    "proxyUsername": "",
    "proxyPassword": "",
    
    // Webhook (opcional)
    "webhook": {
        "url": "https://meusite.com/webhook",
        "byEvents": false,
        "base64": true,
        "headers": {
            "authorization": "Bearer TOKEN",
            "Content-Type": "application/json"
        },
        "events": [
            "APPLICATION_STARTUP",
            "QRCODE_UPDATED",
            "MESSAGES_SET",
            "MESSAGES_UPSERT",
            "MESSAGES_UPDATE",
            "MESSAGES_DELETE",
            "SEND_MESSAGE",
            "CONTACTS_SET",
            "CONTACTS_UPSERT",
            "CONTACTS_UPDATE",
            "PRESENCE_UPDATE",
            "CHATS_SET",
            "CHATS_UPSERT",
            "CHATS_UPDATE",
            "CHATS_DELETE",
            "GROUPS_UPSERT",
            "GROUP_UPDATE",
            "GROUP_PARTICIPANTS_UPDATE",
            "CONNECTION_UPDATE",
            "LABELS_EDIT",
            "LABELS_ASSOCIATION",
            "CALL",
            "TYPEBOT_START",
            "TYPEBOT_CHANGE_STATUS"
        ]
    },
    
    // Chatwoot (opcional)
    "chatwootAccountId": "1",
    "chatwootToken": "TOKEN",
    "chatwootUrl": "https://chatwoot.com",
    "chatwootSignMsg": true,
    "chatwootReopenConversation": true,
    "chatwootConversationPending": false,
    "chatwootImportContacts": true,
    "chatwootNameInbox": "evolution",
    "chatwootMergeBrazilContacts": true,
    "chatwootImportMessages": true,
    "chatwootDaysLimitImportMessages": 3,
    "chatwootOrganization": "Evolution Bot",
    "chatwootLogo": "https://evolution-api.com/files/evolution-api-favicon.png"
}
```

#### Parâmetros

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `instanceName` | string | ✅ | Nome único da instância |
| `qrcode` | boolean | ❌ | Gerar QR Code (padrão: true) |
| `integration` | string | ❌ | Tipo de integração: WHATSAPP-BAILEYS, WHATSAPP-BUSINESS, EVOLUTION |

#### Resposta
```json
{
    "instance": {
        "instanceName": "minha-instancia",
        "status": "created"
    },
    "hash": "instance-api-key-hash",
    "qrcode": {
        "base64": "data:image/png;base64,..."
    }
}
```

---

### 2. Buscar Instâncias
**GET** `/instance/fetchInstances`

Lista todas as instâncias ou busca uma específica.

#### Headers
```
apikey: {{apikey}}
```

#### Query Parameters (Opcionais)
- `instanceName`: Nome da instância específica
- `instanceId`: ID da instância específica

#### Resposta
```json
[
    {
        "instance": {
            "instanceName": "minha-instancia",
            "status": "open"
        }
    }
]
```

---

### 3. Conectar Instância
**GET** `/instance/connect/{instance}`

Conecta uma instância existente e gera QR Code se necessário.

#### Headers
Nenhum header específico necessário.

#### Query Parameters (Opcionais)
- `number`: Número para conexão direta

#### Resposta
```json
{
    "base64": "data:image/png;base64,..."
}
```

---

### 4. Reiniciar Instância
**POST** `/instance/restart/{instance}`

Reinicia uma instância existente.

#### Resposta
```json
{
    "status": "restarted",
    "base64": "data:image/png;base64,..." // QR Code se necessário
}
```

---

### 5. Definir Presença
**POST** `/instance/setPresence/{instance}`

Define o status de presença da instância.

#### Body
```json
{
    "presence": "available" // available, unavailable
}
```

---

### 6. Status da Conexão
**GET** `/instance/connectionState/{instance}`

Verifica o status da conexão da instância.

#### Resposta
```json
{
    "instance": "minha-instancia",
    "state": "open" // open, close, connecting
}
```

---

### 7. Logout da Instância
**DELETE** `/instance/logout/{instance}`

Desconecta a instância do WhatsApp.

#### Resposta
```json
{
    "status": "logged out"
}
```

---

### 8. Deletar Instância
**DELETE** `/instance/delete/{instance}`

Remove completamente uma instância.

#### Headers
```
apikey: {{globalApikey}}
```

#### Resposta
```json
{
    "status": "deleted"
}
```

## 🔧 Integrações Disponíveis

### WHATSAPP-BAILEYS (Padrão)
- Integração padrão usando Baileys
- Suporte completo a todas as funcionalidades
- Recomendado para a maioria dos casos

### WHATSAPP-BUSINESS
- Integração com WhatsApp Business API
- Recursos empresariais avançados
- Requer configuração adicional

### EVOLUTION
- Integração nativa da Evolution API
- Funcionalidades específicas da plataforma

## 📝 Eventos de Webhook

A Evolution API suporta os seguintes eventos de webhook:

- `APPLICATION_STARTUP`: Inicialização da aplicação
- `QRCODE_UPDATED`: Atualização do QR Code
- `MESSAGES_SET`: Configuração de mensagens
- `MESSAGES_UPSERT`: Inserção/atualização de mensagens
- `MESSAGES_UPDATE`: Atualização de mensagens
- `MESSAGES_DELETE`: Exclusão de mensagens
- `SEND_MESSAGE`: Envio de mensagem
- `CONTACTS_SET`: Configuração de contatos
- `CONTACTS_UPSERT`: Inserção/atualização de contatos
- `CONTACTS_UPDATE`: Atualização de contatos
- `PRESENCE_UPDATE`: Atualização de presença
- `CHATS_SET`: Configuração de chats
- `CHATS_UPSERT`: Inserção/atualização de chats
- `CHATS_UPDATE`: Atualização de chats
- `CHATS_DELETE`: Exclusão de chats
- `GROUPS_UPSERT`: Inserção/atualização de grupos
- `GROUP_UPDATE`: Atualização de grupo
- `GROUP_PARTICIPANTS_UPDATE`: Atualização de participantes
- `CONNECTION_UPDATE`: Atualização de conexão
- `LABELS_EDIT`: Edição de etiquetas
- `LABELS_ASSOCIATION`: Associação de etiquetas
- `CALL`: Chamadas
- `TYPEBOT_START`: Início do Typebot
- `TYPEBOT_CHANGE_STATUS`: Mudança de status do Typebot

## 💡 Dicas de Uso

1. **Sempre salve o hash retornado** na criação da instância - ele será sua API key
2. **Configure webhooks** para receber eventos em tempo real
3. **Use nomes únicos** para suas instâncias
4. **Monitore o status** da conexão regularmente
5. **Configure proxy** se necessário para sua infraestrutura