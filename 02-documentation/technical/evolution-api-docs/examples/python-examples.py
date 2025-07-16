"""
Evolution API - Exemplos em Python

Este arquivo contém exemplos práticos de como usar a Evolution API
com Python usando a biblioteca requests.

Instalação das dependências:
pip install requests python-dotenv

Uso:
python python-examples.py
"""

import requests
import json
import time
import os
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

@dataclass
class EvolutionConfig:
    """Configurações da Evolution API"""
    base_url: str = os.getenv('EVOLUTION_BASE_URL', 'https://sua-api.evolution.com')
    global_apikey: str = os.getenv('EVOLUTION_GLOBAL_APIKEY', 'sua-chave-global')
    instance: str = os.getenv('EVOLUTION_INSTANCE', 'minha-instancia')
    apikey: str = os.getenv('EVOLUTION_APIKEY', 'chave-da-instancia')
    webhook_url: str = os.getenv('EVOLUTION_WEBHOOK_URL', 'https://seu-webhook.com/evolution')

class EvolutionAPI:
    """Cliente para Evolution API"""
    
    def __init__(self, config: EvolutionConfig):
        self.config = config
        self.session = requests.Session()
        
    def _make_request(self, endpoint: str, method: str = 'GET', 
                     data: Optional[Dict] = None, use_global_key: bool = False) -> Dict:
        """Fazer requisição para a API"""
        url = f"{self.config.base_url}{endpoint}"
        
        headers = {
            'Content-Type': 'application/json',
            'apikey': self.config.global_apikey if use_global_key else self.config.apikey
        }
        
        try:
            if method.upper() == 'GET':
                response = self.session.get(url, headers=headers)
            elif method.upper() == 'POST':
                response = self.session.post(url, headers=headers, json=data)
            elif method.upper() == 'PUT':
                response = self.session.put(url, headers=headers, json=data)
            elif method.upper() == 'DELETE':
                response = self.session.delete(url, headers=headers, json=data)
            else:
                raise ValueError(f"Método HTTP não suportado: {method}")
            
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            print(f"Erro na requisição: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"Resposta do servidor: {e.response.text}")
            raise
    
    # ========================================
    # GERENCIAMENTO DE INSTÂNCIAS
    # ========================================
    
    def create_instance(self, webhook_events: Optional[List[str]] = None) -> Dict:
        """Criar uma nova instância"""
        if webhook_events is None:
            webhook_events = [
                'QRCODE_UPDATED',
                'CONNECTION_UPDATE',
                'MESSAGES_UPSERT'
            ]
        
        instance_data = {
            'instanceName': self.config.instance,
            'qrcode': True,
            'integration': 'WHATSAPP-BAILEYS',
            'webhook': {
                'url': self.config.webhook_url,
                'byEvents': False,
                'base64': True,
                'events': webhook_events
            }
        }
        
        result = self._make_request('/instance/create', 'POST', instance_data, use_global_key=True)
        
        # Atualizar a chave da instância
        if 'hash' in result:
            self.config.apikey = result['hash']
            print(f"⚠️ IMPORTANTE: Salve esta chave: {result['hash']}")
        
        return result
    
    def check_connection_status(self) -> Dict:
        """Verificar status da conexão"""
        return self._make_request(f'/instance/connectionState/{self.config.instance}')
    
    def connect_instance(self) -> Dict:
        """Conectar instância (gerar QR Code)"""
        return self._make_request(f'/instance/connect/{self.config.instance}')
    
    def restart_instance(self) -> Dict:
        """Reiniciar instância"""
        return self._make_request(f'/instance/restart/{self.config.instance}', 'POST')
    
    def delete_instance(self) -> Dict:
        """Deletar instância"""
        return self._make_request(f'/instance/delete/{self.config.instance}', 'DELETE', use_global_key=True)
    
    # ========================================
    # ENVIO DE MENSAGENS
    # ========================================
    
    def send_text_message(self, number: str, text: str, **options) -> Dict:
        """Enviar mensagem de texto"""
        message_data = {
            'number': number,
            'text': text,
            **options
        }
        
        return self._make_request(f'/message/sendText/{self.config.instance}', 'POST', message_data)
    
    def send_image(self, number: str, image_url: str, caption: str = '', 
                   filename: str = 'image.jpg') -> Dict:
        """Enviar imagem"""
        message_data = {
            'number': number,
            'mediatype': 'image',
            'mimetype': 'image/jpeg',
            'caption': caption,
            'media': image_url,
            'fileName': filename
        }
        
        return self._make_request(f'/message/sendMedia/{self.config.instance}', 'POST', message_data)
    
    def send_video(self, number: str, video_url: str, caption: str = '', 
                   filename: str = 'video.mp4') -> Dict:
        """Enviar vídeo"""
        message_data = {
            'number': number,
            'mediatype': 'video',
            'mimetype': 'video/mp4',
            'caption': caption,
            'media': video_url,
            'fileName': filename
        }
        
        return self._make_request(f'/message/sendMedia/{self.config.instance}', 'POST', message_data)
    
    def send_document(self, number: str, document_url: str, filename: str) -> Dict:
        """Enviar documento"""
        message_data = {
            'number': number,
            'mediatype': 'document',
            'mimetype': 'application/pdf',
            'media': document_url,
            'fileName': filename
        }
        
        return self._make_request(f'/message/sendMedia/{self.config.instance}', 'POST', message_data)
    
    def send_audio(self, number: str, audio_url: str) -> Dict:
        """Enviar áudio"""
        message_data = {
            'number': number,
            'audio': audio_url,
            'encoding': True
        }
        
        return self._make_request(f'/message/sendWhatsAppAudio/{self.config.instance}', 'POST', message_data)
    
    def send_location(self, number: str, name: str, address: str, 
                     latitude: float, longitude: float) -> Dict:
        """Enviar localização"""
        message_data = {
            'number': number,
            'name': name,
            'address': address,
            'latitude': latitude,
            'longitude': longitude
        }
        
        return self._make_request(f'/message/sendLocation/{self.config.instance}', 'POST', message_data)
    
    def send_contact(self, number: str, contacts: List[Dict]) -> Dict:
        """Enviar contato"""
        message_data = {
            'number': number,
            'contact': contacts
        }
        
        return self._make_request(f'/message/sendContact/{self.config.instance}', 'POST', message_data)
    
    def send_reaction(self, message_key: Dict, reaction: str) -> Dict:
        """Enviar reação"""
        message_data = {
            'key': message_key,
            'reaction': reaction
        }
        
        return self._make_request(f'/message/sendReaction/{self.config.instance}', 'POST', message_data)
    
    def send_poll(self, number: str, name: str, values: List[str], 
                  selectable_count: int = 1) -> Dict:
        """Enviar enquete"""
        message_data = {
            'number': number,
            'name': name,
            'selectableCount': selectable_count,
            'values': values
        }
        
        return self._make_request(f'/message/sendPoll/{self.config.instance}', 'POST', message_data)
    
    def send_list(self, number: str, title: str, description: str, 
                  sections: List[Dict], button_text: str = 'Ver Opções') -> Dict:
        """Enviar lista interativa"""
        message_data = {
            'number': number,
            'title': title,
            'description': description,
            'buttonText': button_text,
            'footerText': 'Evolution API',
            'sections': sections
        }
        
        return self._make_request(f'/message/sendList/{self.config.instance}', 'POST', message_data)
    
    def send_buttons(self, number: str, title: str, description: str, 
                    buttons: List[Dict], footer: str = 'Evolution API') -> Dict:
        """Enviar botões interativos"""
        message_data = {
            'number': number,
            'title': title,
            'description': description,
            'footer': footer,
            'buttons': buttons
        }
        
        return self._make_request(f'/message/sendButtons/{self.config.instance}', 'POST', message_data)
    
    # ========================================
    # GERENCIAMENTO DE GRUPOS
    # ========================================
    
    def create_group(self, subject: str, description: str, participants: List[str]) -> Dict:
        """Criar grupo"""
        group_data = {
            'subject': subject,
            'description': description,
            'participants': participants
        }
        
        return self._make_request(f'/group/create/{self.config.instance}', 'POST', group_data)
    
    def list_groups(self, get_participants: bool = True) -> List[Dict]:
        """Listar todos os grupos"""
        endpoint = f'/group/fetchAllGroups/{self.config.instance}'
        if get_participants:
            endpoint += '?getParticipants=true'
        
        return self._make_request(endpoint)
    
    def get_group_participants(self, group_jid: str) -> Dict:
        """Obter participantes do grupo"""
        return self._make_request(f'/group/participants/{group_jid}/{self.config.instance}')
    
    def add_participants(self, group_jid: str, numbers: List[str]) -> Dict:
        """Adicionar participantes ao grupo"""
        data = {
            'groupJid': group_jid,
            'numbers': numbers
        }
        
        return self._make_request(f'/group/addParticipant/{self.config.instance}', 'POST', data)
    
    def remove_participants(self, group_jid: str, numbers: List[str]) -> Dict:
        """Remover participantes do grupo"""
        data = {
            'groupJid': group_jid,
            'numbers': numbers
        }
        
        return self._make_request(f'/group/removeParticipant/{self.config.instance}', 'POST', data)
    
    def promote_participants(self, group_jid: str, numbers: List[str]) -> Dict:
        """Promover participantes a administradores"""
        data = {
            'groupJid': group_jid,
            'numbers': numbers
        }
        
        return self._make_request(f'/group/promoteParticipant/{self.config.instance}', 'POST', data)
    
    def demote_participants(self, group_jid: str, numbers: List[str]) -> Dict:
        """Rebaixar administradores"""
        data = {
            'groupJid': group_jid,
            'numbers': numbers
        }
        
        return self._make_request(f'/group/demoteParticipant/{self.config.instance}', 'POST', data)
    
    def update_group_subject(self, group_jid: str, subject: str) -> Dict:
        """Atualizar nome do grupo"""
        data = {
            'groupJid': group_jid,
            'subject': subject
        }
        
        return self._make_request(f'/group/updateGroupSubject/{self.config.instance}', 'POST', data)
    
    def update_group_description(self, group_jid: str, description: str) -> Dict:
        """Atualizar descrição do grupo"""
        data = {
            'groupJid': group_jid,
            'description': description
        }
        
        return self._make_request(f'/group/updateGroupDescription/{self.config.instance}', 'POST', data)
    
    def get_invite_code(self, group_jid: str) -> Dict:
        """Obter código de convite do grupo"""
        return self._make_request(f'/group/inviteCode/{group_jid}/{self.config.instance}')
    
    def revoke_invite_code(self, group_jid: str) -> Dict:
        """Revogar código de convite"""
        data = {'groupJid': group_jid}
        return self._make_request(f'/group/revokeInviteCode/{self.config.instance}', 'POST', data)
    
    def leave_group(self, group_jid: str) -> Dict:
        """Sair do grupo"""
        data = {'groupJid': group_jid}
        return self._make_request(f'/group/leaveGroup/{self.config.instance}', 'DELETE', data)
    
    # ========================================
    # GERENCIAMENTO DE CHATS
    # ========================================
    
    def check_whatsapp_numbers(self, numbers: List[str]) -> List[Dict]:
        """Verificar se números estão no WhatsApp"""
        data = {'numbers': numbers}
        return self._make_request(f'/chat/whatsappNumbers/{self.config.instance}', 'POST', data)
    
    def get_messages(self, remote_jid: str, limit: int = 20, page: int = 1) -> Dict:
        """Buscar mensagens de um chat"""
        endpoint = f'/chat/findMessages/{self.config.instance}?remoteJid={remote_jid}&limit={limit}&page={page}'
        return self._make_request(endpoint)
    
    def get_chats(self, limit: int = 20, page: int = 1, archived: bool = False) -> Dict:
        """Buscar chats"""
        endpoint = f'/chat/findChats/{self.config.instance}?limit={limit}&page={page}&archived={archived}'
        return self._make_request(endpoint)
    
    def get_contacts(self, limit: int = 20, page: int = 1) -> Dict:
        """Buscar contatos"""
        endpoint = f'/chat/findContacts/{self.config.instance}?limit={limit}&page={page}'
        return self._make_request(endpoint)
    
    def mark_as_read(self, messages: List[Dict]) -> Dict:
        """Marcar mensagens como lidas"""
        data = {'readMessages': messages}
        return self._make_request(f'/chat/markMessageAsRead/{self.config.instance}', 'POST', data)
    
    def archive_chat(self, chat_jid: str, last_message: Dict, archive: bool = True) -> Dict:
        """Arquivar/desarquivar chat"""
        data = {
            'lastMessage': last_message,
            'chat': chat_jid,
            'archive': archive
        }
        
        return self._make_request(f'/chat/archiveChat/{self.config.instance}', 'POST', data)
    
    def delete_message(self, message_key: Dict) -> Dict:
        """Deletar mensagem"""
        data = {'key': message_key}
        return self._make_request(f'/chat/deleteMessage/{self.config.instance}', 'DELETE', data)

class EvolutionBot:
    """Bot simples para Evolution API"""
    
    def __init__(self, api: EvolutionAPI):
        self.api = api
        self.responses = {
            'oi': 'Olá! Como posso ajudar você hoje?',
            'horario': 'Nosso horário de funcionamento é de segunda a sexta, das 9h às 18h.',
            'preço': 'Para informações sobre preços, fale com nosso vendedor.',
            'suporte': 'Para suporte técnico, envie um email para suporte@empresa.com',
            'tchau': 'Até logo! Tenha um ótimo dia! 👋'
        }
    
    def add_response(self, keyword: str, response: str):
        """Adicionar nova resposta"""
        self.responses[keyword.lower()] = response
    
    def process_message(self, from_number: str, message: str) -> bool:
        """Processar mensagem recebida"""
        text = message.lower()
        
        # Buscar resposta baseada em palavras-chave
        for keyword, response in self.responses.items():
            if keyword in text:
                self.api.send_text_message(from_number, response)
                return True
        
        return False

# ========================================
# UTILITÁRIOS
# ========================================

def is_valid_whatsapp_number(number: str) -> bool:
    """Validar número do WhatsApp"""
    clean_number = ''.join(filter(str.isdigit, number))
    return 10 <= len(clean_number) <= 15

def format_whatsapp_number(number: str) -> str:
    """Formatar número para WhatsApp"""
    return ''.join(filter(str.isdigit, number))

def send_bulk_messages(api: EvolutionAPI, contacts: List[str], 
                      message: str, delay_seconds: int = 2) -> List[Dict]:
    """Enviar mensagens em lote com delay"""
    results = []
    
    for contact in contacts:
        try:
            result = api.send_text_message(contact, message)
            results.append({'contact': contact, 'success': True, 'result': result})
            print(f"✅ Mensagem enviada para {contact}")
        except Exception as e:
            results.append({'contact': contact, 'success': False, 'error': str(e)})
            print(f"❌ Erro ao enviar para {contact}: {e}")
        
        # Delay entre envios
        if delay_seconds > 0:
            time.sleep(delay_seconds)
    
    return results

# ========================================
# EXEMPLOS DE USO
# ========================================

def exemplo_basico():
    """Exemplo básico de uso"""
    config = EvolutionConfig()
    api = EvolutionAPI(config)
    
    try:
        print("🚀 Iniciando exemplo básico da Evolution API...")
        
        # Verificar status da conexão
        status = api.check_connection_status()
        print(f"Status da conexão: {status}")
        
        if status.get('state') != 'open':
            print("📱 Instância não conectada. Gerando QR Code...")
            qr_result = api.connect_instance()
            print("QR Code gerado. Escaneie com seu WhatsApp.")
            return
        
        # Enviar mensagem de texto
        result = api.send_text_message('5511999999999', 'Olá! Esta é uma mensagem de teste! 🚀')
        print(f"Mensagem enviada: {result}")
        
        # Verificar números no WhatsApp
        numbers = ['5511999999999', '5511888888888']
        valid_numbers = api.check_whatsapp_numbers(numbers)
        print(f"Números verificados: {valid_numbers}")
        
        print("✅ Exemplo básico concluído!")
        
    except Exception as e:
        print(f"❌ Erro no exemplo: {e}")

def exemplo_grupo():
    """Exemplo de gerenciamento de grupos"""
    config = EvolutionConfig()
    api = EvolutionAPI(config)
    
    try:
        print("👥 Exemplo de gerenciamento de grupos...")
        
        # Criar grupo
        participants = ['5511999999999', '5511888888888']
        group = api.create_group(
            'Grupo de Teste Python',
            'Grupo criado via Python com Evolution API',
            participants
        )
        print(f"Grupo criado: {group}")
        
        group_jid = group.get('groupJid')
        if group_jid:
            # Obter código de convite
            invite = api.get_invite_code(group_jid)
            print(f"Código de convite: {invite}")
            
            # Enviar mensagem para o grupo
            api.send_text_message(group_jid, 'Olá pessoal! Grupo criado via API! 🎉')
        
        print("✅ Exemplo de grupos concluído!")
        
    except Exception as e:
        print(f"❌ Erro no exemplo de grupos: {e}")

def exemplo_bot():
    """Exemplo de bot de atendimento"""
    config = EvolutionConfig()
    api = EvolutionAPI(config)
    bot = EvolutionBot(api)
    
    # Adicionar respostas personalizadas
    bot.add_response('python', 'Python é uma linguagem incrível! 🐍')
    bot.add_response('api', 'A Evolution API é muito poderosa!')
    
    # Simular mensagem recebida
    bot.process_message('5511999999999', 'Oi, preciso de suporte')
    
    print("🤖 Bot de exemplo configurado!")

def exemplo_lista_interativa():
    """Exemplo de lista interativa"""
    config = EvolutionConfig()
    api = EvolutionAPI(config)
    
    sections = [
        {
            'title': 'Serviços',
            'rows': [
                {
                    'title': 'Suporte Técnico',
                    'description': 'Precisa de ajuda técnica?',
                    'rowId': 'suporte'
                },
                {
                    'title': 'Vendas',
                    'description': 'Interessado em nossos produtos?',
                    'rowId': 'vendas'
                }
            ]
        },
        {
            'title': 'Informações',
            'rows': [
                {
                    'title': 'Horário de Funcionamento',
                    'description': 'Consulte nossos horários',
                    'rowId': 'horario'
                }
            ]
        }
    ]
    
    try:
        result = api.send_list(
            '5511999999999',
            'Como podemos ajudar?',
            'Selecione uma das opções abaixo:',
            sections
        )
        print(f"Lista enviada: {result}")
        
    except Exception as e:
        print(f"❌ Erro ao enviar lista: {e}")

def exemplo_completo():
    """Exemplo completo com todas as funcionalidades"""
    config = EvolutionConfig()
    api = EvolutionAPI(config)
    
    try:
        print("🚀 Iniciando exemplo completo da Evolution API...")
        
        # 1. Verificar/criar instância
        try:
            status = api.check_connection_status()
        except:
            print("Criando nova instância...")
            api.create_instance()
            return
        
        if status.get('state') != 'open':
            print("Conectando instância...")
            api.connect_instance()
            return
        
        # 2. Verificar números
        numbers = ['5511999999999']
        valid_numbers = api.check_whatsapp_numbers(numbers)
        print(f"Números válidos: {valid_numbers}")
        
        # 3. Enviar diferentes tipos de mensagem
        target_number = '5511999999999'
        
        # Texto
        api.send_text_message(target_number, 'Olá! Teste da Evolution API com Python! 🐍')
        time.sleep(2)
        
        # Imagem
        api.send_image(
            target_number,
            'https://picsum.photos/800/600',
            'Imagem aleatória enviada via Python! 📸'
        )
        time.sleep(2)
        
        # Localização
        api.send_location(
            target_number,
            'Cristo Redentor',
            'Rio de Janeiro, RJ',
            -22.951916,
            -43.210487
        )
        time.sleep(2)
        
        # Enquete
        api.send_poll(
            target_number,
            'Qual sua linguagem favorita?',
            ['Python', 'JavaScript', 'Java', 'C++'],
            1
        )
        
        print("✅ Exemplo completo concluído!")
        
    except Exception as e:
        print(f"❌ Erro no exemplo completo: {e}")

if __name__ == "__main__":
    # Executar exemplos
    print("Evolution API - Exemplos em Python")
    print("=" * 40)
    
    # Descomente o exemplo que deseja executar:
    exemplo_basico()
    # exemplo_grupo()
    # exemplo_bot()
    # exemplo_lista_interativa()
    # exemplo_completo()