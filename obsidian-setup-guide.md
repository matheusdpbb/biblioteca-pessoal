# 🔮 Tutorial Completo: Configuração do Obsidian para Iniciantes

Este guia didático te levará do zero ao domínio básico do Obsidian, configurando-o especificamente para maximizar a produtividade com sua biblioteca de prompts, documentações e templates.

## 📥 1. Instalação do Obsidian

### Download e Instalação
1. Acesse [obsidian.md](https://obsidian.md)
2. Clique em "Download" e escolha sua plataforma (Windows/Mac/Linux)
3. Execute o instalador baixado
4. Abra o Obsidian após a instalação

### Primeira Execução
- O Obsidian abrirá com uma tela de boas-vindas
- Você verá opções para criar um novo vault ou abrir um existente
- **Não crie um vault ainda** - faremos isso no próximo passo

## 🏠 2. Criação do Vault

### O que é um Vault?
Um vault é como uma "biblioteca" no Obsidian - uma pasta que contém todos os seus arquivos markdown e configurações.

### Configurando Seu Vault
1. **Clique em "Open folder as vault"**
2. **Navegue até a pasta do seu projeto** (`prompts-docs-templates`)
3. **Selecione a pasta e clique "Select Folder"**
4. O Obsidian abrirá com sua biblioteca como vault

### Primeira Visualização
- Você verá o README.md na lista de arquivos à esquerda
- O painel central mostrará o conteúdo do arquivo
- À direita, você verá o outline (estrutura) do documento

## ⚙️ 3. Configurações Essenciais de Interface

### Acessando Configurações
- Pressione `Ctrl+,` (Windows/Linux) ou `Cmd+,` (Mac)
- Ou clique no ícone de engrenagem no canto inferior esquerdo

### Configurações Recomendadas

#### **Editor**
```
✅ Show line numbers (Mostrar números de linha)
✅ Readable line length (Comprimento de linha legível)
✅ Strict line breaks (Quebras de linha rígidas)
✅ Use tabs (Usar tabs)
Tab size: 2
```

#### **Files & Links**
```
✅ Automatically update internal links
✅ Use [[Wikilinks]]
New file location: "Same folder as current file"
Attachment folder path: "05-resources/assets"
```

#### **Appearance**
```
Theme: Escolha entre Light/Dark conforme preferência
Base color scheme: Adaptive (se adapta ao sistema)
```

#### **Hotkeys (Atalhos)**
Configurações importantes:
- `Ctrl+N`: New note (Nova nota)
- `Ctrl+O`: Quick switcher (Alternador rápido)
- `Ctrl+Shift+F`: Search in all files (Buscar em todos os arquivos)
- `Ctrl+E`: Toggle edit/preview (Alternar edição/visualização)

## 🔌 4. Plugins Recomendados para Produtividade

### Acessando Community Plugins
1. Vá em Settings → Community plugins
2. Clique em "Turn on community plugins"
3. Clique em "Browse" para ver plugins disponíveis

### Plugins Essenciais

#### **1. Templater** ⭐⭐⭐
**Para que serve**: Criar templates dinâmicos com variáveis
**Como instalar**:
1. Busque "Templater" na lista
2. Clique "Install" → "Enable"
3. Configure em Settings → Templater:
   - Template folder location: `03-templates`
   - ✅ Trigger Templater on new file creation

#### **2. Dataview** ⭐⭐⭐
**Para que serve**: Criar índices automáticos e consultas
**Como instalar**:
1. Busque "Dataview"
2. Install → Enable
3. Permite criar listas automáticas de arquivos por tags

#### **3. Tag Wrangler** ⭐⭐
**Para que serve**: Gerenciar tags facilmente
**Como instalar**:
1. Busque "Tag Wrangler"
2. Install → Enable
3. Permite renomear e organizar tags em massa

#### **4. Advanced Tables** ⭐⭐
**Para que serve**: Formatação avançada de tabelas
**Como instalar**:
1. Busque "Advanced Tables"
2. Install → Enable
3. Facilita criação e edição de tabelas markdown

#### **5. Quick Switcher++** ⭐⭐
**Para que serve**: Navegação super rápida
**Como instalar**:
1. Busque "Quick Switcher++"
2. Install → Enable
3. Melhora a busca e navegação entre arquivos

### Plugins Opcionais (Para Usuários Avançados)

#### **Git** (Se usar controle de versão)
- Sincronização automática com repositório
- Backup automático das mudanças

#### **Calendar** (Para organização temporal)
- Visualização de notas por data
- Daily notes automáticas

## 🎨 5. Personalização de Temas

### Temas Recomendados para Produtividade

#### **Para Iniciantes**:
- **Default**: Limpo e simples
- **Minimal**: Foco no conteúdo

#### **Para Desenvolvedores**:
- **Obsidian Nord**: Cores suaves, boa para código
- **Things**: Interface limpa e moderna

### Como Instalar Temas
1. Settings → Appearance → Themes
2. Clique "Manage"
3. Escolha um tema e clique "Install and use"

### Personalização de CSS (Avançado)
- Crie arquivo `snippets.css` em `.obsidian/snippets/`
- Ative em Settings → Appearance → CSS snippets

## 📝 6. Configuração de Templates Básicos

### Criando Pasta de Templates
1. Crie a pasta `03-templates` se não existir
2. Configure em Templater settings: Template folder location

### Template Básico para Prompts
Crie arquivo `03-templates/prompt-template.md`:

```markdown
---
title: "{{title}}"
category: "prompt/{{category}}"
tags: [prompt, {{tags}}]
created: {{date:YYYY-MM-DD}}
difficulty: "{{difficulty}}"
---

# {{title}}

## 📋 Contexto
Descreva quando usar este prompt

## 🎯 Objetivo
O que este prompt deve alcançar

## 📝 Prompt
```
[Seu prompt aqui]
```

## 💡 Variações
- Variação 1: 
- Variação 2:

## 🔗 Links Relacionados
- [[Link para prompt relacionado]]

## 📊 Uso
- Última utilização: 
- Efetividade: ⭐⭐⭐⭐⭐
```

### Template para Documentação
Crie arquivo `03-templates/doc-template.md`:

```markdown
---
title: "{{title}}"
category: "documentation/{{category}}"
tags: [doc, {{tags}}]
created: {{date:YYYY-MM-DD}}
status: "draft"
---

# {{title}}

## 📖 Resumo
Breve descrição do que este documento cobre

## 🎯 Público-Alvo
Para quem este documento é útil

## 📚 Conteúdo

### Seção 1


### Seção 2


## 🔗 Referências
- [Link 1](url)
- [Link 2](url)

## 📝 Notas
Observações adicionais
```

## 🧭 7. Dicas de Navegação e Organização

### Navegação Eficiente

#### **Atalhos Essenciais**
- `Ctrl+O`: Quick switcher (busca rápida de arquivos)
- `Ctrl+Shift+O`: Quick switcher para headings
- `Ctrl+G`: Graph view (visualização de conexões)
- `Ctrl+E`: Alternar entre edição e visualização
- `Ctrl+[` / `Ctrl+]`: Navegar histórico (voltar/avançar)

#### **Usando Tags Efetivamente**
```markdown
#prompt/ai/claude
#template/code/react
#doc/api/rest
#resource/tool/vscode
```

#### **Links Internos**
- Use `[[Nome do Arquivo]]` para criar links
- Use `[[Arquivo#Seção]]` para linkar seções específicas
- Use `[[Arquivo|Texto Personalizado]]` para texto customizado

### Organização por Cores e Ícones

#### **Sistema de Tags Coloridas**
Configure em Settings → Appearance → CSS snippets:

```css
/* Tags coloridas por categoria */
.tag[href="#prompt"] { background-color: #4CAF50; }
.tag[href="#template"] { background-color: #2196F3; }
.tag[href="#doc"] { background-color: #FF9800; }
.tag[href="#resource"] { background-color: #9C27B0; }
```

### Workflow Diário Recomendado

#### **Manhã (5 minutos)**
1. Abra o Obsidian
2. Pressione `Ctrl+O` e digite o que precisa
3. Use templates para criar novos conteúdos

#### **Durante o Trabalho**
1. `Ctrl+N` para novas notas rápidas
2. Use `[[links]]` para conectar ideias
3. Adicione tags relevantes

#### **Final do Dia (5 minutos)**
1. Revise notas criadas
2. Organize tags se necessário
3. Conecte conteúdos relacionados

## 🚀 8. Primeiros Passos Práticos

### Exercício 1: Criar Seu Primeiro Prompt
1. Pressione `Ctrl+N`
2. Use o template de prompt
3. Preencha com um prompt que você usa frequentemente
4. Adicione tags apropriadas
5. Salve com nome descritivo

### Exercício 2: Explorar Graph View
1. Pressione `Ctrl+G`
2. Observe as conexões entre arquivos
3. Clique nos nós para navegar
4. Use filtros para focar em categorias específicas

### Exercício 3: Busca Avançada
1. Pressione `Ctrl+Shift+F`
2. Teste buscas por:
   - Texto: `template`
   - Tags: `tag:#prompt`
   - Combinações: `tag:#prompt "claude"`

## 🔧 9. Solução de Problemas Comuns

### Problema: "Não consigo ver meus arquivos"
**Solução**: Verifique se abriu a pasta correta como vault

### Problema: "Links não funcionam"
**Solução**: Certifique-se de usar `[[Nome do Arquivo]]` sem extensão .md

### Problema: "Templates não aparecem"
**Solução**: Configure a pasta de templates em Templater settings

### Problema: "Obsidian está lento"
**Solução**: Desative plugins desnecessários em Community plugins

## 📚 10. Recursos Adicionais

### Documentação Oficial
- [Obsidian Help](https://help.obsidian.md/)
- [Community Forum](https://forum.obsidian.md/)

### Canais YouTube Recomendados
- "Obsidian Office Hours" (oficial)
- "FromSergio" (português)
- "Linking Your Thinking"

### Comunidades
- Discord oficial do Obsidian
- Reddit r/ObsidianMD
- Telegram grupos em português

---

## 🎯 Próximos Passos

Após dominar este tutorial:

1. **Semana 1**: Configure tudo e crie seus primeiros 5 prompts
2. **Semana 2**: Explore Graph View e conexões entre conteúdos
3. **Semana 3**: Personalize com CSS e plugins avançados
4. **Semana 4**: Desenvolva seu workflow pessoal

**Lembre-se**: O Obsidian é uma ferramenta poderosa, mas a magia acontece com o uso consistente. Comece simples e evolua gradualmente!

---

*Este tutorial foi criado especificamente para maximizar sua produtividade com a biblioteca de prompts, documentações e templates. Adapte as configurações às suas necessidades específicas.*