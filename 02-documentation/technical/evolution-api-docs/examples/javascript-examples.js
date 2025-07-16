/**
 * Evolution API - Exemplos em JavaScript/Node.js
 * 
 * Este arquivo contém exemplos práticos de como usar a Evolution API
 * com JavaScript/Node.js usando fetch API.
 */

// Configurações da API
const CONFIG = {
    baseUrl: 'https://sua-api.evolution.com',
    globalApikey: 'sua-chave-global',
    instance: 'minha-instancia',
    apikey: 'chave-da-instancia'
};

// Função auxiliar para fazer requisições
async function apiRequest(endpoint, method = 'GET', body = null, useGlobalKey = false) {
    const url = `${CONFIG.baseUrl}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        'apikey': useGlobalKey ? CONFIG.globalApikey : CONFIG.apikey
    };

    const options = {
        method,
        headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

// ========================================
// GERENCIAMENTO DE INSTÂNCIAS
// ========================================

/**
 * Criar uma nova instância
 */
async function createInstance() {
    const instanceData = {
        instanceName: CONFIG.instance,
        qrcode: true,
        integration: 'WHATSAPP-BAILEYS',
        webhook: {
            url: 'https://seu-webhook.com/evolution',
            byEvents: false,
            base64: true,
            events: [
                'QRCODE_UPDATED',
                'CONNECTION_UPDATE',
                'MESSAGES_UPSERT'
            ]
        }
    };

    try {
        const result = await apiRequest('/instance/create', 'POST', instanceData, true);
        console.log('Instância criada:', result);
        
        // Salvar a chave da instância
        CONFIG.apikey = result.hash;
        console.log('⚠️ IMPORTANTE: Salve esta chave:', result.hash);
        
        return result;
    } catch (error) {
        console.error('Erro ao criar instância:', error);
    }
}

/**
 * Verificar status da conexão
 */
async function checkConnectionStatus() {
    try {
        const status = await apiRequest(`/instance/connectionState/${CONFIG.instance}`);
        console.log('Status da conexão:', status);
        return status;
    } catch (error) {
        console.error('Erro ao verificar status:', error);
    }
}

/**
 * Conectar instância (gerar QR Code)
 */
async function connectInstance() {
    try {
        const result = await apiRequest(`/instance/connect/${CONFIG.instance}`);
        console.log('QR Code gerado:', result);
        return result;
    } catch (error) {
        console.error('Erro ao conectar instância:', error);
    }
}

// ========================================
// ENVIO DE MENSAGENS
// ========================================

/**
 * Enviar mensagem de texto
 */
async function sendTextMessage(number, text, options = {}) {
    const messageData = {
        number,
        text,
        ...options
    };

    try {
        const result = await apiRequest(`/message/sendText/${CONFIG.instance}`, 'POST', messageData);
        console.log('Mensagem enviada:', result);
        return result;
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}

/**
 * Enviar imagem
 */
async function sendImage(number, imageUrl, caption = '', fileName = 'image.jpg') {
    const messageData = {
        number,
        mediatype: 'image',
        mimetype: 'image/jpeg',
        caption,
        media: imageUrl,
        fileName
    };

    try {
        const result = await apiRequest(`/message/sendMedia/${CONFIG.instance}`, 'POST', messageData);
        console.log('Imagem enviada:', result);
        return result;
    } catch (error) {
        console.error('Erro ao enviar imagem:', error);
    }
}

/**
 * Enviar lista interativa
 */
async function sendInteractiveList(number, title, description, sections) {
    const messageData = {
        number,
        title,
        description,
        buttonText: 'Ver Opções',
        footerText: 'Evolution API',
        sections
    };

    try {
        const result = await apiRequest(`/message/sendList/${CONFIG.instance}`, 'POST', messageData);
        console.log('Lista enviada:', result);
        return result;
    } catch (error) {
        console.error('Erro ao enviar lista:', error);
    }
}

/**
 * Enviar botões interativos
 */
async function sendButtons(number, title, description, buttons) {
    const messageData = {
        number,
        title,
        description,
        footer: 'Evolution API',
        buttons
    };

    try {
        const result = await apiRequest(`/message/sendButtons/${CONFIG.instance}`, 'POST', messageData);
        console.log('Botões enviados:', result);
        return result;
    } catch (error) {
        console.error('Erro ao enviar botões:', error);
    }
}

// ========================================
// GERENCIAMENTO DE GRUPOS
// ========================================

/**
 * Criar grupo
 */
async function createGroup(subject, description, participants) {
    const groupData = {
        subject,
        description,
        participants
    };

    try {
        const result = await apiRequest(`/group/create/${CONFIG.instance}`, 'POST', groupData);
        console.log('Grupo criado:', result);
        return result;
    } catch (error) {
        console.error('Erro ao criar grupo:', error);
    }
}

/**
 * Adicionar participantes ao grupo
 */
async function addParticipants(groupJid, numbers) {
    const data = {
        groupJid,
        numbers
    };

    try {
        const result = await apiRequest(`/group/addParticipant/${CONFIG.instance}`, 'POST', data);
        console.log('Participantes adicionados:', result);
        return result;
    } catch (error) {
        console.error('Erro ao adicionar participantes:', error);
    }
}

/**
 * Listar todos os grupos
 */
async function listGroups() {
    try {
        const groups = await apiRequest(`/group/fetchAllGroups/${CONFIG.instance}?getParticipants=true`);
        console.log('Grupos encontrados:', groups);
        return groups;
    } catch (error) {
        console.error('Erro ao listar grupos:', error);
    }
}

// ========================================
// GERENCIAMENTO DE CHATS
// ========================================

/**
 * Verificar se números estão no WhatsApp
 */
async function checkWhatsAppNumbers(numbers) {
    const data = { numbers };

    try {
        const result = await apiRequest(`/chat/whatsappNumbers/${CONFIG.instance}`, 'POST', data);
        console.log('Verificação de números:', result);
        return result;
    } catch (error) {
        console.error('Erro ao verificar números:', error);
    }
}

/**
 * Buscar mensagens de um chat
 */
async function getMessages(remoteJid, limit = 20, page = 1) {
    try {
        const messages = await apiRequest(`/chat/findMessages/${CONFIG.instance}?remoteJid=${remoteJid}&limit=${limit}&page=${page}`);
        console.log('Mensagens encontradas:', messages);
        return messages;
    } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
    }
}

/**
 * Marcar mensagens como lidas
 */
async function markAsRead(messages) {
    const data = {
        readMessages: messages
    };

    try {
        const result = await apiRequest(`/chat/markMessageAsRead/${CONFIG.instance}`, 'POST', data);
        console.log('Mensagens marcadas como lidas:', result);
        return result;
    } catch (error) {
        console.error('Erro ao marcar como lidas:', error);
    }
}

// ========================================
// UTILITÁRIOS E HELPERS
// ========================================

/**
 * Delay entre operações
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validar número do WhatsApp
 */
function isValidWhatsAppNumber(number) {
    const cleanNumber = number.replace(/\D/g, '');
    return cleanNumber.length >= 10 && cleanNumber.length <= 15;
}

/**
 * Formatar número para WhatsApp
 */
function formatWhatsAppNumber(number) {
    return number.replace(/\D/g, '');
}

/**
 * Envio em lote com delay
 */
async function sendBulkMessages(contacts, message, delayMs = 2000) {
    const results = [];
    
    for (const contact of contacts) {
        try {
            const result = await sendTextMessage(contact, message);
            results.push({ contact, success: true, result });
            console.log(`✅ Mensagem enviada para ${contact}`);
        } catch (error) {
            results.push({ contact, success: false, error: error.message });
            console.log(`❌ Erro ao enviar para ${contact}:`, error.message);
        }
        
        // Delay entre envios
        if (delayMs > 0) {
            await sleep(delayMs);
        }
    }
    
    return results;
}

// ========================================
// BOT DE ATENDIMENTO SIMPLES
// ========================================

/**
 * Bot de resposta automática
 */
class SimpleBot {
    constructor() {
        this.responses = {
            'oi': 'Olá! Como posso ajudar você hoje?',
            'horario': 'Nosso horário de funcionamento é de segunda a sexta, das 9h às 18h.',
            'preço': 'Para informações sobre preços, fale com nosso vendedor.',
            'suporte': 'Para suporte técnico, envie um email para suporte@empresa.com',
            'tchau': 'Até logo! Tenha um ótimo dia! 👋'
        };
    }

    /**
     * Processar mensagem recebida
     */
    async processMessage(from, message) {
        const text = message.toLowerCase();
        
        // Buscar resposta baseada em palavras-chave
        const keyword = Object.keys(this.responses).find(key => 
            text.includes(key)
        );

        if (keyword) {
            await sendTextMessage(from, this.responses[keyword]);
            return true;
        }

        return false;
    }

    /**
     * Adicionar nova resposta
     */
    addResponse(keyword, response) {
        this.responses[keyword.toLowerCase()] = response;
    }
}

// ========================================
// WEBHOOK HANDLER
// ========================================

/**
 * Processar eventos do webhook
 */
async function handleWebhookEvent(event, instance, data) {
    console.log(`Evento recebido: ${event} da instância: ${instance}`);

    switch (event) {
        case 'MESSAGES_UPSERT':
            await handleNewMessage(data);
            break;
        case 'CONNECTION_UPDATE':
            await handleConnectionUpdate(data);
            break;
        case 'QRCODE_UPDATED':
            await handleQRCodeUpdate(data);
            break;
        default:
            console.log('Evento não tratado:', event);
    }
}

/**
 * Tratar nova mensagem
 */
async function handleNewMessage(data) {
    const message = data.messages[0];
    
    if (!message.key.fromMe && message.message?.conversation) {
        const from = message.key.remoteJid.replace('@s.whatsapp.net', '');
        const text = message.message.conversation;
        
        console.log(`Nova mensagem de ${from}: ${text}`);
        
        // Usar bot para responder
        const bot = new SimpleBot();
        await bot.processMessage(from, text);
    }
}

/**
 * Tratar atualização de conexão
 */
async function handleConnectionUpdate(data) {
    console.log('Status da conexão atualizado:', data);
    
    if (data.state === 'close') {
        console.log('⚠️ Conexão perdida! Tentando reconectar...');
        await connectInstance();
    }
}

/**
 * Tratar atualização do QR Code
 */
async function handleQRCodeUpdate(data) {
    console.log('QR Code atualizado');
    // Aqui você pode salvar o QR Code ou exibi-lo
}

// ========================================
// EXEMPLOS DE USO
// ========================================

/**
 * Exemplo completo de uso
 */
async function exemploCompleto() {
    try {
        console.log('🚀 Iniciando exemplo da Evolution API...');

        // 1. Verificar status da instância
        const status = await checkConnectionStatus();
        
        if (status.state !== 'open') {
            console.log('📱 Instância não conectada. Gerando QR Code...');
            await connectInstance();
            return;
        }

        // 2. Verificar se números estão no WhatsApp
        const numbersToCheck = ['5511999999999', '5511888888888'];
        const validNumbers = await checkWhatsAppNumbers(numbersToCheck);
        
        // 3. Enviar mensagem de texto
        await sendTextMessage('5511999999999', 'Olá! Esta é uma mensagem de teste da Evolution API! 🚀');

        // 4. Enviar imagem
        await sendImage(
            '5511999999999',
            'https://picsum.photos/800/600',
            'Imagem aleatória enviada via API! 📸'
        );

        // 5. Enviar lista interativa
        const sections = [
            {
                title: 'Serviços',
                rows: [
                    {
                        title: 'Suporte Técnico',
                        description: 'Precisa de ajuda técnica?',
                        rowId: 'suporte'
                    },
                    {
                        title: 'Vendas',
                        description: 'Interessado em nossos produtos?',
                        rowId: 'vendas'
                    }
                ]
            }
        ];

        await sendInteractiveList(
            '5511999999999',
            'Como podemos ajudar?',
            'Selecione uma das opções abaixo:',
            sections
        );

        // 6. Criar grupo
        const group = await createGroup(
            'Grupo de Teste API',
            'Grupo criado automaticamente via Evolution API',
            ['5511999999999', '5511888888888']
        );

        console.log('✅ Exemplo concluído com sucesso!');

    } catch (error) {
        console.error('❌ Erro no exemplo:', error);
    }
}

// ========================================
// EXPORTAR FUNÇÕES
// ========================================

module.exports = {
    // Configuração
    CONFIG,
    
    // Instâncias
    createInstance,
    checkConnectionStatus,
    connectInstance,
    
    // Mensagens
    sendTextMessage,
    sendImage,
    sendInteractiveList,
    sendButtons,
    
    // Grupos
    createGroup,
    addParticipants,
    listGroups,
    
    // Chats
    checkWhatsAppNumbers,
    getMessages,
    markAsRead,
    
    // Utilitários
    sleep,
    isValidWhatsAppNumber,
    formatWhatsAppNumber,
    sendBulkMessages,
    
    // Bot
    SimpleBot,
    
    // Webhook
    handleWebhookEvent,
    
    // Exemplo
    exemploCompleto
};

// Executar exemplo se arquivo for chamado diretamente
if (require.main === module) {
    exemploCompleto();
}