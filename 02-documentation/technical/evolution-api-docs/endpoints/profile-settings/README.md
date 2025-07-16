# Profile Settings (Configurações de Perfil) - Evolution API

Gerenciamento de configurações de perfil e privacidade do WhatsApp.

## 📋 Endpoints Disponíveis

### 1. Atualizar Configurações de Privacidade
**POST** `/chat/updatePrivacySettings/{instance}`

Define as configurações de privacidade da conta.

#### Body
```json
{
    "readreceipts": "all",
    "profile": "all",
    "status": "contacts",
    "online": "all",
    "last": "contacts",
    "groupadd": "none"
}
```

#### Parâmetros

| Campo | Tipo | Opções | Descrição |
|-------|------|--------|-----------|
| `readreceipts` | string | `all`, `none` | Confirmação de leitura |
| `profile` | string | `all`, `contacts`, `contact_blacklist`, `none` | Quem pode ver seu perfil |
| `status` | string | `all`, `contacts`, `contact_blacklist`, `none` | Quem pode ver seu status |
| `online` | string | `all`, `match_last_seen` | Quem pode ver quando você está online |
| `last` | string | `all`, `contacts`, `contact_blacklist`, `none` | Quem pode ver seu "visto por último" |
| `groupadd` | string | `all`, `contacts`, `contact_blacklist` | Quem pode te adicionar em grupos |

#### Resposta
```json
{
    "status": "success",
    "privacy": {
        "readreceipts": "all",
        "profile": "all",
        "status": "contacts",
        "online": "all",
        "last": "contacts",
        "groupadd": "none"
    }
}
```

## 🔒 Configurações de Privacidade Detalhadas

### Read Receipts (Confirmação de Leitura)
Controla se outros podem ver quando você leu suas mensagens.

```json
{
    "readreceipts": "all"    // Todos veem quando você leu
}
```

```json
{
    "readreceipts": "none"   // Ninguém vê quando você leu
}
```

### Profile (Perfil)
Controla quem pode ver sua foto de perfil e informações.

```json
{
    "profile": "all"              // Todos podem ver
}
```

```json
{
    "profile": "contacts"         // Apenas contatos podem ver
}
```

```json
{
    "profile": "contact_blacklist" // Contatos exceto bloqueados
}
```

```json
{
    "profile": "none"             // Ninguém pode ver
}
```

### Status
Controla quem pode ver seus status/stories.

```json
{
    "status": "all"              // Todos podem ver
}
```

```json
{
    "status": "contacts"         // Apenas contatos podem ver
}
```

```json
{
    "status": "contact_blacklist" // Contatos exceto bloqueados
}
```

```json
{
    "status": "none"             // Ninguém pode ver
}
```

### Online
Controla quem pode ver quando você está online.

```json
{
    "online": "all"              // Todos podem ver
}
```

```json
{
    "online": "match_last_seen"  // Mesmo nível do "visto por último"
}
```

### Last Seen (Visto por Último)
Controla quem pode ver quando você foi visto por último.

```json
{
    "last": "all"              // Todos podem ver
}
```

```json
{
    "last": "contacts"         // Apenas contatos podem ver
}
```

```json
{
    "last": "contact_blacklist" // Contatos exceto bloqueados
}
```

```json
{
    "last": "none"             // Ninguém pode ver
}
```

### Group Add (Adicionar em Grupos)
Controla quem pode te adicionar em grupos.

```json
{
    "groupadd": "all"              // Qualquer um pode adicionar
}
```

```json
{
    "groupadd": "contacts"         // Apenas contatos podem adicionar
}
```

```json
{
    "groupadd": "contact_blacklist" // Contatos exceto bloqueados
}
```

## 🎯 Perfis de Privacidade Pré-definidos

### Perfil Público
Máxima visibilidade para todos.

```json
{
    "readreceipts": "all",
    "profile": "all",
    "status": "all",
    "online": "all",
    "last": "all",
    "groupadd": "all"
}
```

### Perfil Privado
Máxima privacidade, apenas contatos.

```json
{
    "readreceipts": "none",
    "profile": "contacts",
    "status": "contacts",
    "online": "match_last_seen",
    "last": "contacts",
    "groupadd": "contacts"
}
```

### Perfil Empresarial
Balanceado para uso comercial.

```json
{
    "readreceipts": "all",
    "profile": "all",
    "status": "contacts",
    "online": "all",
    "last": "contacts",
    "groupadd": "contacts"
}
```

### Perfil Bot/Automação
Configuração para bots e automações.

```json
{
    "readreceipts": "all",
    "profile": "all",
    "status": "none",
    "online": "all",
    "last": "none",
    "groupadd": "none"
}
```

## 💻 Exemplos de Implementação

### Aplicar Perfil de Privacidade
```javascript
async function applyPrivacyProfile(profileType) {
    const profiles = {
        public: {
            readreceipts: "all",
            profile: "all",
            status: "all",
            online: "all",
            last: "all",
            groupadd: "all"
        },
        private: {
            readreceipts: "none",
            profile: "contacts",
            status: "contacts",
            online: "match_last_seen",
            last: "contacts",
            groupadd: "contacts"
        },
        business: {
            readreceipts: "all",
            profile: "all",
            status: "contacts",
            online: "all",
            last: "contacts",
            groupadd: "contacts"
        },
        bot: {
            readreceipts: "all",
            profile: "all",
            status: "none",
            online: "all",
            last: "none",
            groupadd: "none"
        }
    };
    
    const settings = profiles[profileType];
    if (!settings) {
        throw new Error('Perfil de privacidade não encontrado');
    }
    
    try {
        const response = await fetch(`${baseUrl}/chat/updatePrivacySettings/${instance}`, {
            method: 'POST',
            headers: {
                'apikey': apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        
        const result = await response.json();
        console.log(`Perfil ${profileType} aplicado:`, result);
        return result;
    } catch (error) {
        console.error('Erro ao aplicar perfil:', error);
        throw error;
    }
}
```

### Configuração Personalizada
```javascript
async function setCustomPrivacy(options) {
    const defaultSettings = {
        readreceipts: "all",
        profile: "contacts",
        status: "contacts",
        online: "all",
        last: "contacts",
        groupadd: "contacts"
    };
    
    const settings = { ...defaultSettings, ...options };
    
    try {
        const response = await fetch(`${baseUrl}/chat/updatePrivacySettings/${instance}`, {
            method: 'POST',
            headers: {
                'apikey': apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao definir privacidade:', error);
        throw error;
    }
}

// Exemplo de uso
await setCustomPrivacy({
    readreceipts: "none",
    groupadd: "none"
});
```

### Verificar Configurações Atuais
```javascript
async function getCurrentPrivacySettings() {
    try {
        // Nota: Este endpoint pode não estar disponível na API atual
        // Você pode precisar armazenar as configurações localmente
        const response = await fetch(`${baseUrl}/chat/getPrivacySettings/${instance}`, {
            headers: { 'apikey': apikey }
        });
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao obter configurações:', error);
        return null;
    }
}
```

## 🔄 Gerenciamento de Configurações

### Classe para Gerenciar Privacidade
```javascript
class PrivacyManager {
    constructor(apiClient) {
        this.api = apiClient;
        this.currentSettings = null;
    }
    
    async applyProfile(profileName) {
        const profiles = {
            public: {
                readreceipts: "all",
                profile: "all",
                status: "all",
                online: "all",
                last: "all",
                groupadd: "all"
            },
            private: {
                readreceipts: "none",
                profile: "contacts",
                status: "contacts",
                online: "match_last_seen",
                last: "contacts",
                groupadd: "contacts"
            },
            business: {
                readreceipts: "all",
                profile: "all",
                status: "contacts",
                online: "all",
                last: "contacts",
                groupadd: "contacts"
            }
        };
        
        if (!profiles[profileName]) {
            throw new Error(`Perfil '${profileName}' não encontrado`);
        }
        
        const result = await this.updateSettings(profiles[profileName]);
        this.currentSettings = profiles[profileName];
        return result;
    }
    
    async updateSettings(settings) {
        return await this.api.updatePrivacySettings(settings);
    }
    
    async toggleReadReceipts() {
        const newSetting = this.currentSettings?.readreceipts === "all" ? "none" : "all";
        return await this.updateSettings({ readreceipts: newSetting });
    }
    
    async setGroupAddPermission(permission) {
        return await this.updateSettings({ groupadd: permission });
    }
    
    getCurrentSettings() {
        return this.currentSettings;
    }
}
```

## 📊 Monitoramento e Logs

### Log de Mudanças de Privacidade
```javascript
class PrivacyLogger {
    constructor() {
        this.changes = [];
    }
    
    logChange(oldSettings, newSettings) {
        const change = {
            timestamp: new Date().toISOString(),
            changes: this.getChanges(oldSettings, newSettings)
        };
        
        this.changes.push(change);
        console.log('Configuração de privacidade alterada:', change);
    }
    
    getChanges(oldSettings, newSettings) {
        const changes = {};
        
        for (const key in newSettings) {
            if (oldSettings[key] !== newSettings[key]) {
                changes[key] = {
                    from: oldSettings[key],
                    to: newSettings[key]
                };
            }
        }
        
        return changes;
    }
    
    getChangeHistory() {
        return this.changes;
    }
}
```

## ⚠️ Considerações Importantes

### Impacto nas Funcionalidades
- `readreceipts: "none"` pode afetar a experiência do usuário
- `groupadd: "none"` impede adição automática em grupos
- `last: "none"` pode afetar recursos que dependem do status online

### Compatibilidade
- Algumas configurações podem não estar disponíveis em todas as versões
- Configurações podem ser sobrescritas pelo cliente WhatsApp oficial

### Segurança
- Configurações de privacidade são importantes para proteção de dados
- Sempre documente mudanças em configurações de privacidade
- Considere o impacto em automações e bots

## 🛠️ Troubleshooting

### Configurações não aplicadas
1. Verificar se a instância está conectada
2. Confirmar formato dos parâmetros
3. Verificar se a conta tem permissões necessárias

### Erro de parâmetros inválidos
1. Verificar valores permitidos para cada campo
2. Confirmar sintaxe JSON
3. Testar com configurações mínimas primeiro

### Comportamento inconsistente
1. Aguardar sincronização com servidores WhatsApp
2. Verificar se outras aplicações não estão alterando configurações
3. Reiniciar instância se necessário

## 💡 Dicas de Uso

1. **Teste gradual**: Aplique configurações uma por vez para identificar problemas
2. **Backup**: Mantenha registro das configurações anteriores
3. **Monitoramento**: Implemente logs para rastrear mudanças
4. **Documentação**: Documente o motivo de cada mudança de configuração
5. **Reversão**: Tenha um plano para reverter configurações se necessário

## 🔗 Integração com Outros Endpoints

### Configurações Relacionadas
- [Settings](../settings/README.md): Configurações gerais da instância
- [Instance](../instance/README.md): Gerenciamento da instância
- [Chat](../chat/README.md): Funcionalidades de chat que podem ser afetadas

### Webhooks Relacionados
- `CONNECTION_UPDATE`: Pode ser afetado por mudanças de privacidade
- `MESSAGES_UPSERT`: Comportamento pode mudar com configurações de leitura