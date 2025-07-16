# Chat - Evolution API

Funcionalidades para gerenciamento de chats, mensagens e contatos no WhatsApp.

## 📋 Endpoints Disponíveis

### 1. Verificar Números WhatsApp
**POST** `/chat/whatsappNumbers/{instance}`

Verifica quais números de uma lista estão registrados no WhatsApp.

#### Body
```json
{
    "numbers": [
        "5511999999999",
        "5511888888888",
        "5511777777777",
        "5511666666666",
        "5511555555555"
    ]
}
```

#### Resposta
```json
[
    {
        "exists": true,
        "jid": "5511999999999@s.whatsapp.net"
    },
    {
        "exists": false,
        "jid": "5511888888888@s.whatsapp.net"
    }
]
```

---

### 2. Marcar Mensagens como Lidas
**POST** `/chat/markMessageAsRead/{instance}`

Marca mensagens específicas como lidas.

#### Body
```json
{
    "readMessages": [
        {
            "remoteJid": "5511999999999@s.whatsapp.net",
            "fromMe": false,
            "id": "80C4CE9B72F797DBC6ECD8D19B247FC9"
        },
        {
            "remoteJid": "123456789@g.us",
            "fromMe": false,
            "id": "90D5DF0C83G808EDC7FDE9E20C358GD0"
        }
    ]
}
```

#### Parâmetros

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `remoteJid` | string | ✅ | ID do chat (individual ou grupo) |
| `fromMe` | boolean | ✅ | Se a mensagem foi enviada por você |
| `id` | string | ✅ | ID único da mensagem |

---

### 3. Arquivar Chat
**POST** `/chat/archiveChat/{instance}`

Arquiva ou desarquiva um chat específico.

#### Body
```json
{
    "lastMessage": {
        "key": {
            "remoteJid": "5511999999999@s.whatsapp.net",
            "fromMe": false,
            "id": "80C4CE9B72F797DBC6ECD8D19B247FC9"
        }
    },
    "chat": "5511999999999@s.whatsapp.net",
    "archive": true // true para arquivar, false para desarquivar
}
```

---

### 4. Marcar Chat como Não Lido
**POST** `/chat/markChatUnread/{instance}`

Marca um chat como não lido.

#### Body
```json
{
    "lastMessage": {
        "key": {
            "remoteJid": "5511999999999@s.whatsapp.net",
            "fromMe": false,
            "id": "80C4CE9B72F797DBC6ECD8D19B247FC9"
        }
    },
    "chat": "5511999999999@s.whatsapp.net"
}
```

---

### 5. Deletar Mensagem
**DELETE** `/chat/deleteMessage/{instance}`

Remove uma mensagem específica do chat.

#### Body
```json
{
    "key": {
        "remoteJid": "5511999999999@s.whatsapp.net",
        "fromMe": true,
        "id": "BAE5A75CB0F39712"
    }
}
```

---

### 6. Buscar Mensagens
**GET** `/chat/findMessages/{instance}`

Busca mensagens com filtros específicos.

#### Query Parameters
- `remoteJid`: ID do chat
- `limit`: Número máximo de mensagens (padrão: 20)
- `page`: Página da busca (padrão: 1)

#### Exemplo
```
GET /chat/findMessages/minha-instancia?remoteJid=5511999999999@s.whatsapp.net&limit=50&page=1
```

#### Resposta
```json
{
    "messages": [
        {
            "key": {
                "remoteJid": "5511999999999@s.whatsapp.net",
                "fromMe": false,
                "id": "MESSAGE_ID"
            },
            "message": {
                "conversation": "Texto da mensagem"
            },
            "messageTimestamp": 1640995200,
            "status": "READ"
        }
    ],
    "total": 150,
    "page": 1,
    "limit": 50
}
```

---

### 7. Buscar Chats
**GET** `/chat/findChats/{instance}`

Lista todos os chats da instância.

#### Query Parameters
- `limit`: Número máximo de chats (padrão: 20)
- `page`: Página da busca (padrão: 1)
- `archived`: Incluir chats arquivados (`true/false`)

#### Exemplo
```
GET /chat/findChats/minha-instancia?limit=30&archived=false
```

#### Resposta
```json
{
    "chats": [
        {
            "id": "5511999999999@s.whatsapp.net",
            "name": "Nome do Contato",
            "unreadCount": 3,
            "conversationTimestamp": 1640995200,
            "archived": false,
            "pinned": false,
            "muteEndTime": null
        }
    ],
    "total": 45,
    "page": 1,
    "limit": 30
}
```

---

### 8. Buscar Contatos
**GET** `/chat/findContacts/{instance}`

Lista todos os contatos da instância.

#### Query Parameters
- `limit`: Número máximo de contatos (padrão: 20)
- `page`: Página da busca (padrão: 1)

#### Resposta
```json
{
    "contacts": [
        {
            "id": "5511999999999@s.whatsapp.net",
            "name": "Nome do Contato",
            "notify": "Nome de Exibição",
            "verifiedName": "Nome Verificado",
            "imgUrl": "https://...",
            "status": "Status do contato"
        }
    ],
    "total": 120,
    "page": 1,
    "limit": 20
}
```

---

### 9. Buscar Status/Stories
**GET** `/chat/findStatusMessage/{instance}`

Busca mensagens de status (stories) disponíveis.

#### Query Parameters
- `limit`: Número máximo de status (padrão: 20)

#### Resposta
```json
{
    "status": [
        {
            "id": "5511999999999@s.whatsapp.net",
            "messages": [
                {
                    "key": {
                        "id": "STATUS_ID"
                    },
                    "message": {
                        "imageMessage": {
                            "caption": "Legenda do status"
                        }
                    },
                    "messageTimestamp": 1640995200
                }
            ]
        }
    ]
}
```

---

### 10. Atualizar Mensagem
**PUT** `/chat/updateMessage/{instance}`

Atualiza o conteúdo de uma mensagem (edição).

#### Body
```json
{
    "key": {
        "remoteJid": "5511999999999@s.whatsapp.net",
        "fromMe": true,
        "id": "MESSAGE_ID"
    },
    "text": "Texto atualizado da mensagem"
}
```

---

### 11. Fixar Chat
**POST** `/chat/pinChat/{instance}`

Fixa ou desfixa um chat no topo da lista.

#### Body
```json
{
    "chat": "5511999999999@s.whatsapp.net",
    "pin": true // true para fixar, false para desfixar
}
```

---

### 12. Silenciar Chat
**POST** `/chat/muteChat/{instance}`

Silencia notificações de um chat por período determinado.

#### Body
```json
{
    "chat": "5511999999999@s.whatsapp.net",
    "mute": true, // true para silenciar, false para ativar
    "muteEndTime": 1640995200 // timestamp Unix (opcional)
}
```

#### Períodos Pré-definidos
- **8 horas**: `8 * 60 * 60` segundos
- **1 semana**: `7 * 24 * 60 * 60` segundos
- **Sempre**: `0` (silenciar indefinidamente)

---

### 13. Limpar Chat
**POST** `/chat/clearChat/{instance}`

Remove todas as mensagens de um chat.

#### Body
```json
{
    "chat": "5511999999999@s.whatsapp.net"
}
```

---

### 14. Bloquear Contato
**POST** `/chat/blockContact/{instance}`

Bloqueia um contato específico.

#### Body
```json
{
    "number": "5511999999999"
}
```

---

### 15. Desbloquear Contato
**POST** `/chat/unblockContact/{instance}`

Desbloqueia um contato previamente bloqueado.

#### Body
```json
{
    "number": "5511999999999"
}
```

---

### 16. Listar Contatos Bloqueados
**GET** `/chat/fetchBlocklist/{instance}`

Lista todos os contatos bloqueados.

#### Resposta
```json
{
    "blocklist": [
        "5511999999999@s.whatsapp.net",
        "5511888888888@s.whatsapp.net"
    ]
}
```

## 🔍 Filtros e Buscas Avançadas

### Busca por Tipo de Mensagem
```json
{
    "messageType": "text", // text, image, video, audio, document
    "fromDate": "2024-01-01",
    "toDate": "2024-12-31"
}
```

### Busca por Status
```json
{
    "status": "READ" // PENDING, SENT, RECEIVED, READ
}
```

### Ordenação
```json
{
    "orderBy": "timestamp", // timestamp, name
    "order": "desc" // asc, desc
}
```

## 📱 Tipos de Chat

### Individual
- **Formato**: `5511999999999@s.whatsapp.net`
- **Identificação**: Termina com `@s.whatsapp.net`

### Grupo
- **Formato**: `123456789@g.us`
- **Identificação**: Termina com `@g.us`

### Broadcast
- **Formato**: `123456789@broadcast`
- **Identificação**: Termina com `@broadcast`

## 🔔 Status de Mensagem

### Estados Possíveis
- `PENDING`: Mensagem pendente
- `SENT`: Mensagem enviada
- `RECEIVED`: Mensagem recebida pelo servidor
- `READ`: Mensagem lida pelo destinatário
- `PLAYED`: Mídia reproduzida (áudio/vídeo)

### Indicadores Visuais
- ✓ (Enviada)
- ✓✓ (Entregue)
- ✓✓ (Lida - azul)

## 💡 Dicas de Uso

1. **Use paginação** para listas grandes de mensagens/chats
2. **Implemente cache local** para melhor performance
3. **Configure webhooks** para receber atualizações em tempo real
4. **Valide IDs** antes de executar operações
5. **Use filtros** para buscas mais eficientes
6. **Monitore rate limits** para evitar bloqueios
7. **Mantenha backup** de mensagens importantes

## ⚠️ Limitações

### Rate Limiting
- **Busca de mensagens**: Máximo 100 por minuto
- **Operações de chat**: Máximo 50 por minuto
- **Verificação de números**: Máximo 1000 por hora

### Retenção de Dados
- **Mensagens**: Disponíveis conforme configuração do servidor
- **Status**: Disponíveis por 24 horas
- **Contatos**: Sincronizados com o WhatsApp

### Permissões
- **Deletar mensagens**: Apenas mensagens próprias
- **Arquivar chats**: Qualquer chat
- **Bloquear contatos**: Qualquer contato
- **Editar mensagens**: Apenas mensagens próprias (até 15 minutos)

## 🔔 Eventos de Webhook Relacionados

- `MESSAGES_SET`: Configuração de mensagens
- `MESSAGES_UPSERT`: Nova mensagem ou atualização
- `MESSAGES_UPDATE`: Atualização de mensagem
- `MESSAGES_DELETE`: Exclusão de mensagem
- `CHATS_SET`: Configuração de chats
- `CHATS_UPSERT`: Novo chat ou atualização
- `CHATS_UPDATE`: Atualização de chat
- `CHATS_DELETE`: Exclusão de chat
- `CONTACTS_SET`: Configuração de contatos
- `CONTACTS_UPSERT`: Novo contato ou atualização
- `CONTACTS_UPDATE`: Atualização de contato