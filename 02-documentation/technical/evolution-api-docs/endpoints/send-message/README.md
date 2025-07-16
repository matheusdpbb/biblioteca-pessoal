# Send Message (Envio de Mensagens) - Evolution API

Funcionalidades completas para envio de diferentes tipos de mensagens via WhatsApp.

## 📋 Endpoints Disponíveis

### 1. Enviar Texto
**POST** `/message/sendText/{instance}`

Envia mensagens de texto simples ou com formatação.

#### Body
```json
{
    "number": "5511999999999",
    "text": "Olá! Esta é uma mensagem de teste.",
    
    // Opções adicionais
    "delay": 1200,
    "quoted": {
        "key": {
            "id": "MESSAGE_ID"
        },
        "message": {
            "conversation": "CONTENT_MESSAGE"
        }
    },
    "linkPreview": false,
    "mentionsEveryOne": false,
    "mentioned": [
        "5511999999999"
    ]
}
```

#### Parâmetros

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `number` | string | ✅ | Número do destinatário com código do país |
| `text` | string | ✅ | Texto da mensagem |
| `delay` | number | ❌ | Delay em milissegundos antes do envio |
| `linkPreview` | boolean | ❌ | Exibir preview de links |
| `mentionsEveryOne` | boolean | ❌ | Mencionar todos no grupo |
| `mentioned` | array | ❌ | Lista de números para mencionar |

---

### 2. Enviar Mídia (URL)
**POST** `/message/sendMedia/{instance}`

Envia imagens, vídeos ou documentos via URL.

#### Body
```json
{
    "number": "5511999999999",
    "mediatype": "image",
    "mimetype": "image/png",
    "caption": "Legenda da imagem",
    "media": "https://exemplo.com/imagem.png",
    "fileName": "Imagem.png",
    
    // Opções adicionais
    "delay": 1200,
    "quoted": {
        "key": {
            "id": "MESSAGE_ID"
        },
        "message": {
            "conversation": "CONTENT_MESSAGE"
        }
    },
    "mentionsEveryOne": false,
    "mentioned": [
        "5511999999999"
    ]
}
```

#### Tipos de Mídia Suportados
- `image`: Imagens (JPG, PNG, GIF)
- `video`: Vídeos (MP4, AVI, MOV)
- `document`: Documentos (PDF, DOC, XLS, etc.)

---

### 3. Enviar Mídia (Arquivo)
**POST** `/message/sendMedia/{instance}`

Envia arquivos através de upload direto (form-data).

#### Content-Type
```
multipart/form-data
```

#### Form Data
- `number`: Número do destinatário
- `file`: Arquivo para upload

---

### 4. Enviar PTV (Vídeo Circular)
**POST** `/message/sendPtv/{instance}`

Envia vídeos no formato circular (PTV - Picture-in-Picture Video).

#### Body
```json
{
    "number": "5511999999999",
    "video": "https://exemplo.com/video.mp4",
    "delay": 1200
}
```

---

### 5. Enviar Áudio Narrado
**POST** `/message/sendWhatsAppAudio/{instance}`

Envia áudios no formato de mensagem de voz do WhatsApp.

#### Body
```json
{
    "number": "5511999999999",
    "audio": "https://exemplo.com/audio.mp3",
    "encoding": true
}
```

---

### 6. Enviar Status/Stories
**POST** `/message/sendStatus/{instance}`

Publica status/stories no WhatsApp.

#### Body
```json
{
    "type": "text",
    "content": "Olá! Como vocês estão hoje?",
    "caption": "Legenda do status",
    "backgroundColor": "#008000",
    "font": 1,
    "allContacts": false,
    "statusJidList": [
        "5511999999999@s.whatsapp.net"
    ]
}
```

#### Tipos de Status
- `text`: Texto simples
- `image`: Imagem
- `video`: Vídeo
- `audio`: Áudio

#### Fontes Disponíveis (para texto)
1. `SERIF`
2. `NORICAN_REGULAR`
3. `BRYNDAN_WRITE`
4. `BEBASNEUE_REGULAR`
5. `OSWALD_HEAVY`

---

### 7. Enviar Sticker
**POST** `/message/sendSticker/{instance}`

Envia stickers/figurinhas.

#### Body
```json
{
    "number": "5511999999999",
    "sticker": "https://exemplo.com/sticker.png"
}
```

---

### 8. Enviar Localização
**POST** `/message/sendLocation/{instance}`

Envia localização geográfica.

#### Body
```json
{
    "number": "5511999999999",
    "name": "Bora Bora",
    "address": "Polinésia Francesa",
    "latitude": -16.505538233564373,
    "longitude": -151.7422770494996
}
```

---

### 9. Enviar Contato
**POST** `/message/sendContact/{instance}`

Envia informações de contato.

#### Body
```json
{
    "number": "5511999999999",
    "contact": [
        {
            "fullName": "Nome do Contato",
            "wuid": "5511999999999",
            "phoneNumber": "+55 11 9 9999-9999",
            "organization": "Nome da Empresa",
            "email": "email@exemplo.com",
            "url": "https://site.com"
        }
    ]
}
```

---

### 10. Enviar Reação
**POST** `/message/sendReaction/{instance}`

Adiciona reação a uma mensagem específica.

#### Body
```json
{
    "key": {
        "remoteJid": "5511999999999@s.whatsapp.net",
        "fromMe": true,
        "id": "BAE5A75CB0F39712"
    },
    "reaction": "🚀"
}
```

---

### 11. Enviar Enquete
**POST** `/message/sendPoll/{instance}`

Cria enquetes interativas.

#### Body
```json
{
    "number": "5511999999999",
    "name": "Qual sua cor favorita?",
    "selectableCount": 1,
    "values": [
        "Azul",
        "Vermelho",
        "Verde",
        "Amarelo"
    ]
}
```

---

### 12. Enviar Lista
**POST** `/message/sendList/{instance}`

Cria listas interativas com múltiplas opções.

#### Body
```json
{
    "number": "5511999999999",
    "title": "Título da Lista",
    "description": "Descrição da lista",
    "buttonText": "Clique Aqui",
    "footerText": "Rodapé da lista",
    "sections": [
        {
            "title": "Seção 1",
            "rows": [
                {
                    "title": "Opção 1",
                    "description": "Descrição da opção 1",
                    "rowId": "opcao_1"
                },
                {
                    "title": "Opção 2",
                    "description": "Descrição da opção 2",
                    "rowId": "opcao_2"
                }
            ]
        }
    ]
}
```

---

### 13. Enviar Botões
**POST** `/message/sendButtons/{instance}`

Cria mensagens com botões interativos.

#### Body
```json
{
    "number": "5511999999999",
    "title": "Título dos Botões",
    "description": "Descrição da mensagem",
    "footer": "Rodapé da mensagem",
    "buttons": [
        {
            "type": "reply",
            "displayText": "Resposta",
            "id": "btn_1"
        },
        {
            "type": "copy",
            "displayText": "Copiar Código",
            "copyCode": "CODIGO123"
        },
        {
            "type": "url",
            "displayText": "Visitar Site",
            "url": "https://evolution-api.com"
        },
        {
            "type": "call",
            "displayText": "Ligar",
            "phoneNumber": "5511999999999"
        },
        {
            "type": "pix",
            "currency": "BRL",
            "name": "Nome do Recebedor",
            "keyType": "random",
            "key": "0ea59ac5-f001-4f0e-9785-c772200f1b1e"
        }
    ]
}
```

#### Tipos de Botões
- `reply`: Botão de resposta rápida
- `copy`: Botão para copiar texto
- `url`: Botão com link
- `call`: Botão para fazer ligação
- `pix`: Botão PIX (Brasil)

#### Tipos de Chave PIX
- `phone`: Telefone
- `email`: E-mail
- `cpf`: CPF
- `cnpj`: CNPJ
- `random`: Chave aleatória

## 🎯 Opções Comuns

### Delay
Adiciona um atraso antes do envio da mensagem:
```json
{
    "delay": 1200 // em milissegundos
}
```

### Quoted (Responder Mensagem)
Responde a uma mensagem específica:
```json
{
    "quoted": {
        "key": {
            "id": "MESSAGE_ID"
        },
        "message": {
            "conversation": "CONTENT_MESSAGE"
        }
    }
}
```

### Menções
Menciona usuários específicos:
```json
{
    "mentionsEveryOne": false, // mencionar todos
    "mentioned": [
        "5511999999999" // números específicos
    ]
}
```

## 📱 Formatos de Número

### Formato Correto
- **Individual**: `5511999999999` (código do país + DDD + número)
- **Grupo**: `123456789@g.us`
- **Status**: `5511999999999@s.whatsapp.net`

### Exemplos por País
- **Brasil**: `5511999999999`
- **Estados Unidos**: `1234567890`
- **Argentina**: `5491123456789`

## 💡 Dicas de Uso

1. **Sempre inclua o código do país** no número
2. **Use delay** para evitar bloqueios por spam
3. **Teste os formatos** de mídia antes do uso em produção
4. **Configure webhooks** para receber confirmações de entrega
5. **Respeite os limites** de tamanho de arquivo
6. **Use quoted** para manter contexto em conversas
7. **Valide URLs** de mídia antes do envio

## ⚠️ Limitações

- **Tamanho máximo de arquivo**: Varia por tipo de mídia
- **Formatos suportados**: Consulte documentação oficial do WhatsApp
- **Rate limiting**: Respeite os limites de envio
- **Números válidos**: Apenas números registrados no WhatsApp