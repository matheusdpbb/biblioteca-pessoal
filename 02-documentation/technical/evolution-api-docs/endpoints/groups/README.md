# Groups (Grupos) - Evolution API

Gerenciamento completo de grupos do WhatsApp, incluindo criação, administração e participantes.

## 📋 Endpoints Disponíveis

### 1. Criar Grupo
**POST** `/group/create/{instance}`

Cria um novo grupo no WhatsApp.

#### Body
```json
{
    "subject": "Meu Novo Grupo",
    "description": "Descrição do grupo",
    "participants": [
        "5511999999999",
        "5511888888888",
        "5511777777777"
    ]
}
```

#### Parâmetros

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `subject` | string | ✅ | Nome do grupo |
| `description` | string | ❌ | Descrição do grupo |
| `participants` | array | ✅ | Lista de números dos participantes |

#### Resposta
```json
{
    "groupJid": "123456789@g.us",
    "subject": "Meu Novo Grupo",
    "participants": [
        {
            "id": "5511999999999@s.whatsapp.net",
            "admin": "admin"
        }
    ]
}
```

---

### 2. Atualizar Foto do Grupo
**PUT** `/group/updateGroupPicture/{instance}`

Atualiza a foto de perfil do grupo.

#### Body
```json
{
    "groupJid": "123456789@g.us",
    "image": "https://exemplo.com/foto.jpg" // URL ou base64
}
```

---

### 3. Buscar Todos os Grupos
**GET** `/group/fetchAllGroups/{instance}`

Lista todos os grupos da instância.

#### Query Parameters (Opcionais)
- `getParticipants`: `true/false` - Incluir lista de participantes

#### Resposta
```json
[
    {
        "id": "123456789@g.us",
        "subject": "Nome do Grupo",
        "subjectOwner": "5511999999999@s.whatsapp.net",
        "subjectTime": 1640995200,
        "creation": 1640995200,
        "owner": "5511999999999@s.whatsapp.net",
        "desc": "Descrição do grupo",
        "descOwner": "5511999999999@s.whatsapp.net",
        "descTime": 1640995200,
        "participants": [
            {
                "id": "5511999999999@s.whatsapp.net",
                "admin": "admin"
            }
        ]
    }
]
```

---

### 4. Buscar Participantes
**GET** `/group/participants/{groupJid}/{instance}`

Lista todos os participantes de um grupo específico.

#### Resposta
```json
{
    "participants": [
        {
            "id": "5511999999999@s.whatsapp.net",
            "admin": "admin"
        },
        {
            "id": "5511888888888@s.whatsapp.net",
            "admin": null
        }
    ]
}
```

---

### 5. Adicionar Participante
**POST** `/group/addParticipant/{instance}`

Adiciona novos participantes ao grupo.

#### Body
```json
{
    "groupJid": "123456789@g.us",
    "numbers": [
        "5511999999999",
        "5511888888888"
    ]
}
```

#### Resposta
```json
{
    "success": [
        {
            "number": "5511999999999",
            "status": "added"
        }
    ],
    "failed": [
        {
            "number": "5511888888888",
            "reason": "not_on_whatsapp"
        }
    ]
}
```

---

### 6. Promover a Administrador
**POST** `/group/promoteParticipant/{instance}`

Promove participantes a administradores do grupo.

#### Body
```json
{
    "groupJid": "123456789@g.us",
    "numbers": [
        "5511999999999",
        "5511888888888"
    ]
}
```

---

### 7. Rebaixar Administrador
**POST** `/group/demoteParticipant/{instance}`

Remove privilégios de administrador de participantes.

#### Body
```json
{
    "groupJid": "123456789@g.us",
    "numbers": [
        "5511999999999"
    ]
}
```

---

### 8. Remover Participante
**POST** `/group/removeParticipant/{instance}`

Remove participantes do grupo.

#### Body
```json
{
    "groupJid": "123456789@g.us",
    "numbers": [
        "5511999999999"
    ]
}
```

---

### 9. Sair do Grupo
**DELETE** `/group/leaveGroup/{instance}`

Faz a instância sair do grupo.

#### Body
```json
{
    "groupJid": "123456789@g.us"
}
```

---

### 10. Atualizar Configurações do Grupo
**POST** `/group/updateGroupSetting/{instance}`

Modifica as configurações de privacidade do grupo.

#### Body
```json
{
    "groupJid": "123456789@g.us",
    "action": "announcement", // announcement, not_announcement
    "restrict": "admin" // admin, all
}
```

#### Configurações Disponíveis

| Ação | Descrição |
|------|-----------|
| `announcement` | Apenas admins podem enviar mensagens |
| `not_announcement` | Todos podem enviar mensagens |

| Restrição | Descrição |
|-----------|-----------|
| `admin` | Apenas admins podem editar info do grupo |
| `all` | Todos podem editar info do grupo |

---

### 11. Atualizar Nome do Grupo
**POST** `/group/updateGroupSubject/{instance}`

Altera o nome do grupo.

#### Body
```json
{
    "groupJid": "123456789@g.us",
    "subject": "Novo Nome do Grupo"
}
```

---

### 12. Atualizar Descrição do Grupo
**POST** `/group/updateGroupDescription/{instance}`

Altera a descrição do grupo.

#### Body
```json
{
    "groupJid": "123456789@g.us",
    "description": "Nova descrição do grupo"
}
```

---

### 13. Obter Link de Convite
**GET** `/group/inviteCode/{groupJid}/{instance}`

Obtém o código de convite do grupo.

#### Resposta
```json
{
    "inviteCode": "ABC123DEF456",
    "inviteUrl": "https://chat.whatsapp.com/ABC123DEF456"
}
```

---

### 14. Revogar Link de Convite
**POST** `/group/revokeInviteCode/{instance}`

Revoga o link de convite atual e gera um novo.

#### Body
```json
{
    "groupJid": "123456789@g.us"
}
```

#### Resposta
```json
{
    "inviteCode": "NEW123CODE456",
    "inviteUrl": "https://chat.whatsapp.com/NEW123CODE456"
}
```

---

### 15. Aceitar Convite por Código
**POST** `/group/acceptInviteCode/{instance}`

Entra em um grupo usando código de convite.

#### Body
```json
{
    "inviteCode": "ABC123DEF456"
}
```

---

### 16. Enviar Convite por Mensagem
**POST** `/group/sendInvite/{instance}`

Envia convite do grupo para números específicos.

#### Body
```json
{
    "groupJid": "123456789@g.us",
    "numbers": [
        "5511999999999",
        "5511888888888"
    ],
    "inviteMessage": "Você foi convidado para o grupo!"
}
```

## 🔧 Funcionalidades Avançadas

### Gerenciamento de Administradores

#### Verificar Status de Admin
```json
{
    "id": "5511999999999@s.whatsapp.net",
    "admin": "admin" // admin, superadmin, null
}
```

#### Tipos de Administrador
- `admin`: Administrador comum
- `superadmin`: Super administrador (criador)
- `null`: Participante comum

### Configurações de Privacidade

#### Modo Anúncio
- **Ativado**: Apenas administradores podem enviar mensagens
- **Desativado**: Todos os participantes podem enviar mensagens

#### Edição de Informações
- **Restrito**: Apenas administradores podem editar
- **Aberto**: Todos os participantes podem editar

## 📱 Formatos de Identificação

### Group JID
- **Formato**: `123456789@g.us`
- **Exemplo**: `120363025343298765@g.us`

### Participant ID
- **Formato**: `5511999999999@s.whatsapp.net`
- **Exemplo**: `5511999999999@s.whatsapp.net`

## 💡 Dicas de Uso

1. **Sempre use o Group JID completo** com `@g.us`
2. **Verifique permissões** antes de executar ações administrativas
3. **Valide números** antes de adicionar participantes
4. **Use batch operations** para múltiplos participantes
5. **Configure webhooks** para receber eventos de grupo
6. **Mantenha backup** dos códigos de convite importantes
7. **Monitore mudanças** de administradores

## ⚠️ Limitações e Considerações

### Limites do WhatsApp
- **Máximo de participantes**: 1024 (pode variar)
- **Máximo de administradores**: Sem limite específico
- **Tamanho da descrição**: 512 caracteres
- **Tamanho do nome**: 100 caracteres

### Permissões Necessárias
- **Criar grupo**: Qualquer usuário
- **Adicionar participantes**: Administrador ou configuração do grupo
- **Remover participantes**: Administrador
- **Promover/rebaixar**: Administrador
- **Alterar configurações**: Administrador
- **Alterar nome/descrição**: Depende das configurações

### Códigos de Erro Comuns
- `not_on_whatsapp`: Número não está no WhatsApp
- `privacy_settings`: Configurações de privacidade impedem a ação
- `not_admin`: Usuário não tem permissões de administrador
- `group_not_found`: Grupo não encontrado
- `participant_not_found`: Participante não encontrado no grupo

## 🔔 Eventos de Webhook Relacionados

- `GROUPS_UPSERT`: Criação ou atualização de grupo
- `GROUP_UPDATE`: Mudanças nas configurações do grupo
- `GROUP_PARTICIPANTS_UPDATE`: Mudanças nos participantes