# Evolution API v2.2.2 - Documentação Completa

Esta documentação foi gerada a partir da coleção oficial do Postman da Evolution API v2.2.2.

## 📋 Índice

- [Configuração Inicial](#configuração-inicial)
- [Autenticação](#autenticação)
- [Endpoints Principais](#endpoints-principais)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Exemplos de Uso](#exemplos-de-uso)
- [Guias e Recursos](#guias-e-recursos)

## 🚀 Configuração Inicial

### URL Base
```
https://sub.domain.com
```

### Variáveis Necessárias
- `baseUrl`: URL do seu servidor Evolution API
- `globalApikey`: Chave API global (obtida do arquivo ENV)
- `instance`: Nome da instância
- `apikey`: Chave API da instância

## 🔐 Autenticação

A Evolution API utiliza autenticação via API Key no header:

```
apikey: YOUR_API_KEY
```

## 📚 Endpoints Principais

### [🏠 Instance (Instância)](endpoints/instance/)
Gerenciamento completo de instâncias do WhatsApp:
- Criar, conectar e gerenciar instâncias
- QR Code e autenticação
- Status de conexão
- Configurações de webhook
- Integrações (Baileys, Business, Evolution)

### [⚙️ Settings (Configurações)](endpoints/settings/)
Configurações de comportamento da instância:
- Rejeitar chamadas automaticamente
- Configurar mensagens automáticas
- Controlar leitura de mensagens
- Configurar presença online
- Sincronização de histórico

### [💬 Send Message (Envio de Mensagens)](endpoints/send-message/)
Todos os tipos de mensagens suportadas:
- **Texto**: Mensagens simples e formatadas
- **Mídia**: Imagens, vídeos, documentos, áudios
- **Interativas**: Listas, botões, enquetes
- **Especiais**: Localização, contatos, reações, stickers
- **Status**: Stories e status do WhatsApp

### [📞 Call (Chamadas)](endpoints/call/)
Funcionalidades de chamadas:
- Simulação de chamadas (fake calls)
- Chamadas de voz e vídeo
- Eventos de chamada via webhook
- Configurações de rejeição automática

### [💭 Chat](endpoints/chat/)
Funcionalidades de chat e mensagens:
- Verificar números no WhatsApp
- Buscar mensagens e chats
- Marcar como lida, arquivar
- Gerenciar contatos
- Bloquear/desbloquear
- Status de mensagens

### [👤 Profile Settings (Configurações de Perfil)](endpoints/profile-settings/)
Configurações de privacidade e perfil:
- Configurações de privacidade
- Controle de visibilidade do perfil
- Configurações de "visto por último"
- Controle de adição em grupos
- Confirmações de leitura

### [👥 Groups (Grupos)](endpoints/groups/)
Gerenciamento completo de grupos:
- Criar e configurar grupos
- Gerenciar participantes e administradores
- Configurações de privacidade
- Links de convite
- Atualizar informações do grupo
- Mensagens efêmeras

### [🔗 Integrations (Integrações)](endpoints/integrations/)
Sistema completo de integrações:
- **Eventos**: Webhook, WebSocket, RabbitMQ, AWS SQS
- **Chatbots**: Chatwoot, Typebot
- Configuração de eventos personalizados
- Gerenciamento de sessões de bot

## 🔧 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `baseUrl` | URL base da API | `https://api.evolution.com` |
| `instance` | Nome da instância | `minha-instancia` |
| `globalApikey` | Chave API global | `global-key-123` |
| `apikey` | Chave API da instância | `instance-key-456` |
| `webhookUrl` | URL do webhook | `https://meusite.com/webhook` |
| `groupJid` | ID do grupo | `123456789@g.us` |
| `remoteJid` | Número do destinatário | `5511999999999` |
| `number` | Número com código do país | `5511999999999` |

Para uma lista completa de variáveis, consulte [.env.example](.env.example).

## 📖 Exemplos de Uso

### 💻 Código
- [JavaScript/Node.js](examples/javascript-examples.js) - Cliente completo com bot de atendimento
- [Python](examples/python-examples.py) - Implementação com classes e type hints

### 🎯 Casos de Uso
- **Bots de Atendimento**: Respostas automáticas e fluxos de conversação
- **Notificações**: Envio de alertas e confirmações
- **Grupos**: Gerenciamento automático de comunidades
- **Integrações**: Conectar com CRM, helpdesk e outras plataformas

## 📚 Guias e Recursos

### 📖 Documentação Detalhada
- [🚀 Guia de Início Rápido](quick-start.md) - Tutorial passo-a-passo
- [🔧 Troubleshooting](troubleshooting.md) - Solução de problemas comuns
- [📋 Índice Completo](SUMMARY.md) - Navegação por toda a documentação

### 🛠️ Ferramentas
- [Arquivo de Configuração](.env.example) - Template de variáveis de ambiente
- [Coleção Postman](../Evolution%20API%20-%20v2.2.2.postman_collection.json) - Coleção original

## 🌟 Funcionalidades Principais

### ✅ Gerenciamento de Instâncias
- Criação e configuração automática
- QR Code para autenticação
- Monitoramento de status
- Reconexão automática

### ✅ Envio de Mensagens
- 13+ tipos de mensagens diferentes
- Mensagens interativas (listas, botões)
- Mídia (imagens, vídeos, documentos)
- Agendamento e delays

### ✅ Automação Avançada
- Bots de atendimento
- Respostas automáticas
- Fluxos de conversação
- Integração com chatbots

### ✅ Integrações Empresariais
- Webhook para eventos em tempo real
- Chatwoot para atendimento
- Typebot para automação
- RabbitMQ e SQS para filas

### ✅ Gerenciamento de Grupos
- Criação e administração
- Controle de participantes
- Configurações de privacidade
- Automação de moderação

## 🔍 Busca Rápida

### Por Funcionalidade
- **Autenticar**: [Criar Instância](endpoints/instance/#1-criar-instância) → [Conectar QR](endpoints/instance/#3-conectar-instância)
- **Enviar Mensagem**: [Texto](endpoints/send-message/#1-enviar-texto) → [Mídia](endpoints/send-message/#2-enviar-mídia-url) → [Botões](endpoints/send-message/#13-enviar-botões)
- **Criar Grupo**: [Novo Grupo](endpoints/groups/#1-criar-grupo) → [Adicionar Membros](endpoints/groups/#5-adicionar-participante)
- **Configurar Bot**: [Typebot](endpoints/integrations/#typebot) → [Chatwoot](endpoints/integrations/#chatwoot)

### Por Problema
- **Não conecta**: [Troubleshooting - Conexão](troubleshooting.md#problemas-de-conexão)
- **Mensagem não envia**: [Troubleshooting - Mensagens](troubleshooting.md#problemas-de-mensagens)
- **Webhook não funciona**: [Troubleshooting - Webhook](troubleshooting.md#problemas-de-webhook)

## 📊 Estrutura da Documentação

```
evolution-api-docs/
├── README.md                           # Este arquivo
├── SUMMARY.md                          # Índice completo
├── quick-start.md                      # Guia de início rápido
├── troubleshooting.md                  # Solução de problemas
├── .env.example                        # Configurações de ambiente
├── endpoints/                          # Documentação dos endpoints
│   ├── instance/README.md             # Gerenciamento de instâncias
│   ├── settings/README.md             # Configurações da instância
│   ├── send-message/README.md         # Envio de mensagens
│   ├── call/README.md                 # Funcionalidades de chamada
│   ├── chat/README.md                 # Funcionalidades de chat
│   ├── profile-settings/README.md     # Configurações de perfil
│   ├── groups/README.md               # Gerenciamento de grupos
│   └── integrations/README.md         # Integrações e chatbots
└── examples/                           # Exemplos de código
    ├── javascript-examples.js          # Exemplos em JavaScript
    └── python-examples.py              # Exemplos em Python
```

## 🔗 Links Úteis

- **Coleção Postman Original**: [Evolution API v2.2.2](https://www.postman.com/agenciadgcode/evolution-api/collection/jn0bbzv/evolution-api-v2-2-2)
- **Site Oficial**: [evolution-api.com](https://evolution-api.com)
- **GitHub**: [EvolutionAPI/evolution-api](https://github.com/EvolutionAPI/evolution-api)
- **Documentação Oficial**: [docs.evolution-api.com](https://docs.evolution-api.com)

## 🤝 Contribuições

Esta documentação foi gerada automaticamente a partir da coleção oficial do Postman. Para sugestões:

1. Verifique se a informação está atualizada na coleção oficial
2. Reporte problemas ou sugestões
3. Contribua com exemplos adicionais
4. Ajude a manter a documentação atualizada

## 🏷️ Versão e Compatibilidade

- **Versão da API**: Evolution API v2.2.2
- **Data da Documentação**: Janeiro 2025
- **Compatibilidade**: WhatsApp Business API, Baileys
- **Linguagens Suportadas**: JavaScript/Node.js, Python
- **Formatos**: Markdown, JSON (Postman)

---

📚 **Esta documentação é um recurso completo para desenvolvedores que desejam integrar a Evolution API em seus projetos. Use os links acima para navegar rapidamente para a seção que precisa!**