# 📚 Evolution API v2.2.2 - Índice Completo da Documentação

Documentação completa e organizada da Evolution API v2.2.2, gerada a partir da coleção oficial do Postman.

## 🏠 Documentação Principal

### [📖 README Principal](README.md)
Visão geral da Evolution API, configuração inicial e links para toda a documentação.

### [🚀 Guia de Início Rápido](quick-start.md)
Tutorial passo-a-passo para começar a usar a Evolution API rapidamente, com exemplos práticos.

### [🔧 Troubleshooting](troubleshooting.md)
Guia completo para solução de problemas comuns, códigos de erro e otimização.

### [⚙️ Configurações de Ambiente](.env.example)
Arquivo de exemplo com todas as variáveis de ambiente necessárias.

## 📋 Endpoints da API (Organizados por Categoria)

### [🏠 Instance (Instância)](endpoints/instance/)
**Gerenciamento completo de instâncias do WhatsApp**
- Criar, conectar e gerenciar instâncias
- QR Code e autenticação
- Status de conexão e monitoramento
- Configurações de webhook
- Integrações (Baileys, Business, Evolution)

**Endpoints principais:**
- `POST /instance/create` - Criar nova instância
- `GET /instance/connect/{instance}` - Conectar via QR Code
- `GET /instance/connectionState/{instance}` - Verificar status
- `POST /instance/restart/{instance}` - Reiniciar instância
- `DELETE /instance/delete/{instance}` - Deletar instância

### [⚙️ Settings (Configurações)](endpoints/settings/)
**Configurações de comportamento da instância**
- Rejeitar chamadas automaticamente
- Configurar mensagens automáticas
- Controlar leitura de mensagens
- Configurar presença online
- Sincronização de histórico

**Endpoints principais:**
- `POST /settings/set/{instance}` - Definir configurações
- `GET /settings/find/{instance}` - Buscar configurações

### [💬 Send Message (Envio de Mensagens)](endpoints/send-message/)
**Todos os tipos de mensagens suportadas**
- **Texto**: Mensagens simples e formatadas
- **Mídia**: Imagens, vídeos, documentos, áudios
- **Interativas**: Listas, botões, enquetes
- **Especiais**: Localização, contatos, reações, stickers
- **Status**: Stories e status do WhatsApp

**Endpoints principais:**
- `POST /message/sendText/{instance}` - Enviar texto
- `POST /message/sendMedia/{instance}` - Enviar mídia
- `POST /message/sendList/{instance}` - Enviar lista interativa
- `POST /message/sendButtons/{instance}` - Enviar botões
- `POST /message/sendLocation/{instance}` - Enviar localização
- `POST /message/sendContact/{instance}` - Enviar contato
- `POST /message/sendPoll/{instance}` - Enviar enquete
- `POST /message/sendReaction/{instance}` - Enviar reação

### [📞 Call (Chamadas)](endpoints/call/)
**Funcionalidades de chamadas**
- Simulação de chamadas (fake calls)
- Chamadas de voz e vídeo
- Eventos de chamada via webhook
- Configurações de rejeição automática

**Endpoints principais:**
- `POST /call/offer/{instance}` - Simular chamada

### [💭 Chat](endpoints/chat/)
**Funcionalidades de chat e mensagens**
- Verificar números no WhatsApp
- Buscar mensagens e chats
- Marcar como lida, arquivar
- Gerenciar contatos
- Bloquear/desbloquear
- Status de mensagens

**Endpoints principais:**
- `POST /chat/whatsappNumbers/{instance}` - Verificar números
- `GET /chat/findMessages/{instance}` - Buscar mensagens
- `GET /chat/findChats/{instance}` - Buscar chats
- `POST /chat/markMessageAsRead/{instance}` - Marcar como lida
- `POST /chat/archiveChat/{instance}` - Arquivar chat
- `DELETE /chat/deleteMessage/{instance}` - Deletar mensagem

### [👤 Profile Settings (Configurações de Perfil)](endpoints/profile-settings/)
**Configurações de privacidade e perfil**
- Configurações de privacidade
- Controle de visibilidade do perfil
- Configurações de "visto por último"
- Controle de adição em grupos
- Confirmações de leitura

**Endpoints principais:**
- `POST /chat/updatePrivacySettings/{instance}` - Atualizar privacidade

### [👥 Groups (Grupos)](endpoints/groups/)
**Gerenciamento completo de grupos**
- Criar e configurar grupos
- Gerenciar participantes e administradores
- Configurações de privacidade
- Links de convite
- Atualizar informações do grupo
- Mensagens efêmeras

**Endpoints principais:**
- `POST /group/create/{instance}` - Criar grupo
- `GET /group/fetchAllGroups/{instance}` - Listar grupos
- `POST /group/updateParticipant/{instance}` - Gerenciar participantes
- `POST /group/updateSetting/{instance}` - Configurações do grupo
- `GET /group/inviteCode/{instance}` - Obter link de convite
- `POST /group/revokeInviteCode/{instance}` - Revogar convite
- `DELETE /group/leaveGroup/{instance}` - Sair do grupo

### [🔗 Integrations (Integrações)](endpoints/integrations/)
**Sistema completo de integrações**
- **Eventos**: Webhook, WebSocket, RabbitMQ, AWS SQS
- **Chatbots**: Chatwoot, Typebot
- Configuração de eventos personalizados
- Gerenciamento de sessões de bot

**Endpoints principais:**
- `POST /webhook/set/{instance}` - Configurar webhook
- `POST /chatwoot/set/{instance}` - Configurar Chatwoot
- `POST /typebot/create/{instance}` - Criar Typebot
- `POST /rabbitmq/set/{instance}` - Configurar RabbitMQ
- `POST /sqs/set/{instance}` - Configurar AWS SQS

## 💻 Exemplos de Código

### [🟨 JavaScript/Node.js](examples/javascript-examples.js)
**Implementação completa em JavaScript com:**
- Cliente completo da API
- Bot de atendimento automático
- Gerenciamento de webhooks
- Envio em lote com rate limiting
- Tratamento de erros robusto
- Exemplos práticos de todos os endpoints

**Funcionalidades incluídas:**
- Classe `SimpleBot` para respostas automáticas
- Funções para todos os tipos de mensagem
- Gerenciamento completo de grupos
- Sistema de webhook com processamento de eventos
- Utilitários para validação e formatação

### [🐍 Python](examples/python-examples.py)
**Implementação completa em Python com:**
- Classe `EvolutionAPI` com type hints
- Bot de resposta automática
- Exemplos de todos os endpoints
- Tratamento de exceções
- Configuração via variáveis de ambiente

**Funcionalidades incluídas:**
- Dataclass `EvolutionConfig` para configurações
- Classe `EvolutionBot` para automação
- Métodos para todos os endpoints
- Exemplos de uso prático
- Integração com python-dotenv

## 🎯 Guias por Caso de Uso

### 🤖 Bots e Automação
**Recursos cobertos:**
- [Bot de atendimento automático](examples/javascript-examples.js#bot-de-atendimento-simples)
- [Respostas baseadas em palavras-chave](examples/python-examples.py#evolutionbot)
- [Processamento de webhooks](quick-start.md#configurando-webhooks)
- [Envio de notificações em massa](examples/javascript-examples.js#envio-em-lote)

**Integrações:**
- [Typebot para fluxos avançados](endpoints/integrations/#typebot)
- [Chatwoot para atendimento humano](endpoints/integrations/#chatwoot)

### 👥 Gerenciamento de Grupos
**Funcionalidades:**
- [Criação automática de grupos](endpoints/groups/#1-criar-grupo)
- [Moderação de participantes](endpoints/groups/#gerenciamento-de-administradores)
- [Envio de convites](endpoints/groups/#16-enviar-convite-por-mensagem)
- [Configuração de permissões](endpoints/groups/#10-atualizar-configurações-do-grupo)

### 💼 Aplicações Empresariais
**Casos de uso:**
- [Notificações de sistema](endpoints/send-message/#exemplos-de-uso)
- [Confirmações de pedidos](quick-start.md#exemplo-de-bot)
- [Suporte ao cliente](endpoints/integrations/#chatwoot)
- [Marketing via WhatsApp](endpoints/send-message/#12-enviar-lista)

### 🔧 Integrações Avançadas
**Plataformas suportadas:**
- [Webhook para eventos em tempo real](endpoints/integrations/#webhook)
- [RabbitMQ para filas](endpoints/integrations/#rabbitmq)
- [AWS SQS para processamento](endpoints/integrations/#aws-sqs)
- [WebSocket para conexões persistentes](endpoints/integrations/#websocket)

## 📊 Estrutura Organizada

```
evolution-api-docs/
├── README.md                           # Documentação principal
├── SUMMARY.md                          # Este arquivo (índice completo)
├── quick-start.md                      # Guia de início rápido
├── troubleshooting.md                  # Solução de problemas
├── .env.example                        # Configurações de ambiente
├── endpoints/                          # Documentação por categoria
│   ├── instance/README.md             # 🏠 Instâncias (8 endpoints)
│   ├── settings/README.md             # ⚙️ Configurações (2 endpoints)
│   ├── send-message/README.md         # 💬 Mensagens (13 tipos)
│   ├── call/README.md                 # 📞 Chamadas (1 endpoint)
│   ├── chat/README.md                 # 💭 Chat (16 endpoints)
│   ├── profile-settings/README.md     # 👤 Perfil (1 endpoint)
│   ├── groups/README.md               # 👥 Grupos (16 endpoints)
│   └── integrations/README.md         # 🔗 Integrações (20+ endpoints)
└── examples/                           # Exemplos práticos
    ├── javascript-examples.js          # Cliente completo em JS
    └── python-examples.py              # Cliente completo em Python
```

## 🔍 Navegação Rápida

### Por Funcionalidade
| Funcionalidade | Endpoint Principal | Documentação |
|----------------|-------------------|--------------|
| **Autenticar** | `POST /instance/create` | [Instance](endpoints/instance/) |
| **Enviar Texto** | `POST /message/sendText/{instance}` | [Send Message](endpoints/send-message/) |
| **Enviar Mídia** | `POST /message/sendMedia/{instance}` | [Send Message](endpoints/send-message/) |
| **Criar Grupo** | `POST /group/create/{instance}` | [Groups](endpoints/groups/) |
| **Configurar Bot** | `POST /typebot/create/{instance}` | [Integrations](endpoints/integrations/) |
| **Webhook** | `POST /webhook/set/{instance}` | [Integrations](endpoints/integrations/) |

### Por Problema
| Problema | Solução | Link |
|----------|---------|------|
| **Não conecta** | Verificar QR Code e status | [Troubleshooting](troubleshooting.md#problemas-de-conexão) |
| **Mensagem não envia** | Validar número e formato | [Troubleshooting](troubleshooting.md#problemas-de-mensagens) |
| **Webhook não funciona** | Verificar URL e eventos | [Troubleshooting](troubleshooting.md#problemas-de-webhook) |
| **Grupo não criado** | Validar participantes | [Troubleshooting](troubleshooting.md#problemas-de-grupos) |

### Por Linguagem
| Linguagem | Arquivo | Recursos |
|-----------|---------|----------|
| **JavaScript** | [javascript-examples.js](examples/javascript-examples.js) | Cliente completo, Bot, Webhook handler |
| **Python** | [python-examples.py](examples/python-examples.py) | Classes com type hints, Bot, Configuração |

## 📈 Estatísticas da Documentação

### Endpoints Documentados
- **Instance**: 8 endpoints
- **Settings**: 2 endpoints  
- **Send Message**: 13 tipos de mensagem
- **Call**: 1 endpoint
- **Chat**: 16 endpoints
- **Profile Settings**: 1 endpoint
- **Groups**: 16 endpoints
- **Integrations**: 20+ endpoints

**Total**: 75+ endpoints documentados

### Exemplos de Código
- **JavaScript**: 485+ linhas de código
- **Python**: 598+ linhas de código
- **Total**: 1000+ linhas de exemplos práticos

### Recursos Adicionais
- **Guia de início rápido**: Tutorial completo
- **Troubleshooting**: 20+ problemas comuns
- **Configurações**: 50+ variáveis de ambiente
- **Casos de uso**: 10+ cenários práticos

## 🔗 Links Úteis

- **Coleção Postman Original**: [Evolution API v2.2.2](https://www.postman.com/agenciadgcode/evolution-api/collection/jn0bbzv/evolution-api-v2-2-2)
- **Site Oficial**: [evolution-api.com](https://evolution-api.com)
- **GitHub**: [EvolutionAPI/evolution-api](https://github.com/EvolutionAPI/evolution-api)
- **Documentação Oficial**: [docs.evolution-api.com](https://docs.evolution-api.com)

## 📝 Como Usar Esta Documentação

### 1. **Iniciantes** 🚀
1. Leia o [README Principal](README.md)
2. Siga o [Guia de Início Rápido](quick-start.md)
3. Use os [Exemplos de Código](examples/) na sua linguagem
4. Consulte o [Troubleshooting](troubleshooting.md) se necessário

### 2. **Desenvolvedores Experientes** 💻
1. Vá direto para os [Endpoints](endpoints/) específicos
2. Use os exemplos como referência
3. Configure as [Variáveis de Ambiente](.env.example)
4. Implemente tratamento de erros baseado no [Troubleshooting](troubleshooting.md)

### 3. **Administradores de Sistema** 🔧
1. Configure o ambiente usando [.env.example](.env.example)
2. Implemente monitoramento baseado no [Troubleshooting](troubleshooting.md)
3. Configure [Integrações](endpoints/integrations/) para sua infraestrutura
4. Use os exemplos para criar scripts de automação

### 4. **Integradores** 🔗
1. Estude as [Integrações](endpoints/integrations/) disponíveis
2. Configure [Webhooks](endpoints/integrations/#webhook) para eventos
3. Implemente [Chatbots](endpoints/integrations/#chatbots) se necessário
4. Use [Filas](endpoints/integrations/#rabbitmq) para processamento assíncrono

## 🏷️ Versão e Compatibilidade

- **Versão da API**: Evolution API v2.2.2
- **Data da Documentação**: Janeiro 2025
- **Compatibilidade**: WhatsApp Business API, Baileys
- **Linguagens Documentadas**: JavaScript/Node.js, Python
- **Formatos**: Markdown, JSON (Postman)
- **Estrutura**: Organizada por categorias funcionais

---

📚 **Esta documentação é um recurso completo e organizado para desenvolvedores que desejam integrar a Evolution API em seus projetos. Use o índice acima para navegar rapidamente para a seção que precisa!**