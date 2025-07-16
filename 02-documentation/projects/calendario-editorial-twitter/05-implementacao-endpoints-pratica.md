# 🛠️ Implementação Prática dos Endpoints de Copywriting

## 🚀 Guia de Implementação Step-by-Step

Esta documentação fornece exemplos práticos de código para implementar os endpoints de copywriting avançada, integrando com o sistema de Calendário Editorial existente.

---

## 📋 Pré-requisitos Técnicos

### 🔧 Dependências do Projeto

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0",
    "openai": "^4.20.0",
    "anthropic": "^0.6.0",
    "axios": "^1.6.0",
    "redis": "^4.6.0",
    "bull": "^4.11.0",
    "sentiment": "^5.0.2",
    "natural": "^6.5.0",
    "tensorflow": "^4.10.0",
    "compromise": "^14.10.0",
    "cheerio": "^1.0.0-rc.12",
    "puppeteer": "^21.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "jest": "^29.0.0",
    "supertest": "^6.3.0"
  }
}
```

### 🌐 Variáveis de Ambiente

```bash
# .env.local
# APIs Externas
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
TAVILY_API_KEY=tvly-...
TWITTER_BEARER_TOKEN=AAAA...
GOOGLE_TRENDS_API_KEY=AIza...

# Banco de Dados
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Cache e Queue
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=...

# ML Services
TENSORFLOW_SERVING_URL=http://localhost:8501
HUGGINGFACE_API_KEY=hf_...

# Rate Limiting
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🔍 RESEARCH SERVICES - Implementação

### 🌐 WebSearch Semântico

```typescript
// app/api/research/websearch/semantic/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface SemanticSearchRequest {
  query: string;
  context: {
    brand_voice: string;
    target_audience: string;
    content_type: 'educational' | 'promotional' | 'storytelling' | 'viral';
    industry: string;
    competitors?: string[];
  };
  filters: {
    date_range?: { start: string; end: string };
    content_types?: ('article' | 'video' | 'social' | 'research')[];
    sentiment?: 'positive' | 'negative' | 'neutral' | 'mixed';
    engagement_threshold?: number;
  };
  analysis_depth: 'surface' | 'deep' | 'comprehensive';
}

export async function POST(request: NextRequest) {
  try {
    const body: SemanticSearchRequest = await request.json();
    
    // 1. Realizar busca com Tavily API
    const searchResults = await performTavilySearch(body);
    
    // 2. Análise semântica com OpenAI
    const semanticAnalysis = await analyzeSemanticRelevance(searchResults, body);
    
    // 3. Extração de elementos de copywriting
    const copywritingElements = await extractCopywritingElements(searchResults);
    
    // 4. Análise de insights de audiência
    const audienceInsights = await analyzeAudienceInsights(searchResults, body.context);
    
    // 5. Identificação de gaps competitivos
    const competitiveGaps = await identifyCompetitiveGaps(searchResults, body.context.competitors);
    
    // 6. Cache dos resultados
    await cacheResults(body.query, {
      searchResults,
      semanticAnalysis,
      copywritingElements,
      audienceInsights,
      competitiveGaps
    });
    
    const response = {
      results: searchResults.map((result: any, index: number) => ({
        content: result.content,
        url: result.url,
        semantic_relevance: semanticAnalysis[index]?.relevance || 0,
        psychological_triggers: semanticAnalysis[index]?.triggers || [],
        emotional_tone: semanticAnalysis[index]?.emotional_tone || {},
        copywriting_elements: copywritingElements[index] || {},
        audience_insights: audienceInsights[index] || {}
      })),
      semantic_clusters: await generateSemanticClusters(searchResults),
      competitive_gaps: competitiveGaps,
      trending_angles: await identifyTrendingAngles(searchResults)
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Semantic search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function performTavilySearch(params: SemanticSearchRequest) {
  const tavilyResponse = await axios.post('https://api.tavily.com/search', {
    api_key: process.env.TAVILY_API_KEY,
    query: params.query,
    search_depth: params.analysis_depth === 'comprehensive' ? 'advanced' : 'basic',
    include_answer: true,
    include_raw_content: true,
    max_results: params.analysis_depth === 'surface' ? 10 : 20,
    include_domains: [],
    exclude_domains: ['spam-site.com']
  });
  
  return tavilyResponse.data.results;
}

async function analyzeSemanticRelevance(results: any[], params: SemanticSearchRequest) {
  const analysisPrompt = `
    Analise a relevância semântica dos seguintes resultados de busca para o contexto:
    
    Contexto da Marca: ${params.context.brand_voice}
    Audiência: ${params.context.target_audience}
    Tipo de Conteúdo: ${params.context.content_type}
    Indústria: ${params.context.industry}
    
    Para cada resultado, forneça:
    1. Score de relevância (0-1)
    2. Gatilhos psicológicos identificados
    3. Tom emocional (primário e secundários)
    
    Resultados: ${JSON.stringify(results.slice(0, 5))}
  `;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: analysisPrompt }],
    temperature: 0.3
  });
  
  return JSON.parse(completion.choices[0].message.content || '[]');
}

async function extractCopywritingElements(results: any[]) {
  const extractionPrompt = `
    Extraia elementos de copywriting dos seguintes conteúdos:
    
    Para cada resultado, identifique:
    1. Headlines mais impactantes
    2. Hooks de abertura
    3. CTAs utilizados
    4. Elementos de prova social
    
    Resultados: ${JSON.stringify(results.slice(0, 5))}
  `;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: extractionPrompt }],
    temperature: 0.2
  });
  
  return JSON.parse(completion.choices[0].message.content || '[]');
}

async function analyzeAudienceInsights(results: any[], context: any) {
  // Implementação da análise de insights de audiência
  // usando NLP e análise de padrões comportamentais
  return results.map(() => ({
    demographics: {},
    psychographics: {},
    behavioral_patterns: []
  }));
}

async function identifyCompetitiveGaps(results: any[], competitors?: string[]) {
  if (!competitors || competitors.length === 0) return [];
  
  // Análise de gaps competitivos usando ML
  return [
    "Falta de conteúdo educacional técnico",
    "Ausência de storytelling pessoal",
    "Pouco uso de dados e estatísticas"
  ];
}

async function generateSemanticClusters(results: any[]) {
  // Clustering semântico usando embeddings
  return [
    {
      theme: "Automação de Marketing",
      relevance: 0.85,
      content_count: 5,
      key_insights: ["ROI mensurável", "Economia de tempo", "Personalização em escala"]
    }
  ];
}

async function identifyTrendingAngles(results: any[]) {
  return [
    "IA aplicada ao marketing de conteúdo",
    "Personalização baseada em dados comportamentais",
    "Automação que preserva autenticidade"
  ];
}

async function cacheResults(query: string, results: any) {
  // Cache no Redis com TTL de 1 hora
  const redis = require('redis').createClient({ url: process.env.REDIS_URL });
  await redis.connect();
  await redis.setEx(`semantic_search:${query}`, 3600, JSON.stringify(results));
  await redis.disconnect();
}
```

### 🐦 Twitter Search Comportamental

```typescript
// app/api/research/twitter/behavioral-search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);

interface TwitterBehavioralSearchRequest {
  query: string;
  behavioral_filters: {
    engagement_patterns: {
      min_likes?: number;
      min_retweets?: number;
      min_replies?: number;
      engagement_velocity?: 'slow' | 'medium' | 'viral';
    };
    user_demographics: {
      follower_range?: { min: number; max: number };
      account_age?: { min_months: number };
      verification_status?: boolean;
      location?: string[];
    };
    content_psychology: {
      emotional_triggers?: string[];
      persuasion_techniques?: string[];
      content_format?: string[];
      timing_patterns?: string[];
    };
  };
  analysis_scope: {
    include_replies: boolean;
    include_threads: boolean;
    sentiment_analysis: boolean;
    influence_mapping: boolean;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: TwitterBehavioralSearchRequest = await request.json();
    
    // 1. Busca no Twitter com filtros avançados
    const tweets = await searchTweetsWithFilters(body);
    
    // 2. Análise comportamental dos usuários
    const userAnalysis = await analyzeBehavioralPatterns(tweets);
    
    // 3. Análise psicológica do conteúdo
    const psychologicalAnalysis = await analyzePsychologicalTriggers(tweets);
    
    // 4. Breakdown de copywriting
    const copywritingAnalysis = await analyzeCopywritingElements(tweets);
    
    // 5. Insights comportamentais
    const behavioralInsights = await generateBehavioralInsights(tweets, userAnalysis);
    
    // 6. Inteligência competitiva
    const competitiveIntelligence = await analyzeCompetitiveIntelligence(tweets);
    
    const response = {
      tweets: tweets.map((tweet: any, index: number) => ({
        id: tweet.id,
        content: tweet.text,
        author: userAnalysis[index] || {},
        performance: {
          likes: tweet.public_metrics.like_count,
          retweets: tweet.public_metrics.retweet_count,
          replies: tweet.public_metrics.reply_count,
          viral_coefficient: calculateViralCoefficient(tweet),
          engagement_velocity: calculateEngagementVelocity(tweet)
        },
        psychological_analysis: psychologicalAnalysis[index] || {},
        copywriting_breakdown: copywritingAnalysis[index] || {}
      })),
      behavioral_insights: behavioralInsights,
      competitive_intelligence: competitiveIntelligence
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Twitter behavioral search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function searchTweetsWithFilters(params: TwitterBehavioralSearchRequest) {
  let query = params.query;
  
  // Adicionar filtros de engajamento
  if (params.behavioral_filters.engagement_patterns.min_likes) {
    query += ` min_faves:${params.behavioral_filters.engagement_patterns.min_likes}`;
  }
  
  if (params.behavioral_filters.engagement_patterns.min_retweets) {
    query += ` min_retweets:${params.behavioral_filters.engagement_patterns.min_retweets}`;
  }
  
  // Filtros de usuário
  if (params.behavioral_filters.user_demographics.verification_status) {
    query += ' is:verified';
  }
  
  const tweets = await twitterClient.v2.search(query, {
    max_results: 100,
    'tweet.fields': ['public_metrics', 'created_at', 'context_annotations', 'author_id'],
    'user.fields': ['public_metrics', 'verified', 'created_at', 'location'],
    expansions: ['author_id']
  });
  
  return tweets.data || [];
}

async function analyzeBehavioralPatterns(tweets: any[]) {
  return tweets.map(tweet => ({
    handle: tweet.author?.username || '',
    followers: tweet.author?.public_metrics?.followers_count || 0,
    engagement_rate: calculateEngagementRate(tweet),
    influence_score: calculateInfluenceScore(tweet),
    psychological_profile: {
      personality_traits: extractPersonalityTraits(tweet.text),
      communication_style: analyzeCommunicationStyle(tweet.text),
      authority_indicators: identifyAuthorityIndicators(tweet)
    }
  }));
}

async function analyzePsychologicalTriggers(tweets: any[]) {
  const analysisPrompt = `
    Analise os gatilhos psicológicos nos seguintes tweets:
    
    Para cada tweet, identifique:
    1. Gatilho primário
    2. Gatilhos secundários
    3. Técnicas de persuasão utilizadas
    4. Apelo emocional
    5. Vieses cognitivos explorados
    
    Tweets: ${JSON.stringify(tweets.slice(0, 10).map(t => t.text))}
  `;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: analysisPrompt }],
    temperature: 0.2
  });
  
  return JSON.parse(completion.choices[0].message.content || '[]');
}

function calculateViralCoefficient(tweet: any): number {
  const metrics = tweet.public_metrics;
  const totalEngagement = metrics.like_count + metrics.retweet_count + metrics.reply_count;
  const authorFollowers = tweet.author?.public_metrics?.followers_count || 1;
  
  return (totalEngagement / authorFollowers) * 100;
}

function calculateEngagementVelocity(tweet: any): number {
  const createdAt = new Date(tweet.created_at);
  const now = new Date();
  const hoursElapsed = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
  
  const totalEngagement = tweet.public_metrics.like_count + 
                         tweet.public_metrics.retweet_count + 
                         tweet.public_metrics.reply_count;
  
  return totalEngagement / Math.max(hoursElapsed, 1);
}

function calculateEngagementRate(tweet: any): number {
  const metrics = tweet.public_metrics;
  const authorFollowers = tweet.author?.public_metrics?.followers_count || 1;
  const totalEngagement = metrics.like_count + metrics.retweet_count + metrics.reply_count;
  
  return (totalEngagement / authorFollowers) * 100;
}

function calculateInfluenceScore(tweet: any): number {
  const author = tweet.author;
  if (!author) return 0;
  
  const followers = author.public_metrics?.followers_count || 0;
  const following = author.public_metrics?.following_count || 1;
  const tweets = author.public_metrics?.tweet_count || 1;
  
  const followerRatio = followers / following;
  const activityScore = tweets / 365; // tweets per day average
  const verificationBonus = author.verified ? 1.2 : 1;
  
  return Math.min((followerRatio * activityScore * verificationBonus) / 100, 100);
}

function extractPersonalityTraits(text: string): string[] {
  // Análise de personalidade usando NLP
  const traits = [];
  
  if (text.includes('!') || text.includes('🚀') || text.includes('💪')) {
    traits.push('Energético');
  }
  
  if (text.includes('dados') || text.includes('estatística') || text.includes('%')) {
    traits.push('Analítico');
  }
  
  if (text.includes('história') || text.includes('experiência') || text.includes('aprendi')) {
    traits.push('Narrativo');
  }
  
  return traits;
}

function analyzeCommunicationStyle(text: string): string {
  if (text.length < 50) return 'Conciso';
  if (text.includes('thread') || text.includes('🧵')) return 'Detalhado';
  if (text.includes('?')) return 'Questionador';
  return 'Informativo';
}

function identifyAuthorityIndicators(tweet: any): string[] {
  const indicators = [];
  
  if (tweet.author?.verified) indicators.push('Verificado');
  if (tweet.author?.public_metrics?.followers_count > 10000) indicators.push('Alto Alcance');
  if (tweet.public_metrics.retweet_count > tweet.public_metrics.like_count * 0.1) {
    indicators.push('Alto Compartilhamento');
  }
  
  return indicators;
}

async function analyzeCopywritingElements(tweets: any[]) {
  return tweets.map(tweet => {
    const text = tweet.text;
    
    return {
      hook_effectiveness: analyzeHookEffectiveness(text),
      structure_analysis: analyzeStructure(text),
      cta_presence: text.includes('👇') || text.includes('link') || text.includes('clique'),
      social_proof_elements: extractSocialProofElements(text)
    };
  });
}

function analyzeHookEffectiveness(text: string): number {
  let score = 0;
  
  // Hooks que geram curiosidade
  if (text.startsWith('Você sabia') || text.startsWith('O que')) score += 20;
  if (text.includes('segredo') || text.includes('truque')) score += 15;
  if (text.includes('erro') || text.includes('problema')) score += 10;
  if (text.includes('resultado') || text.includes('descobri')) score += 10;
  
  // Números e estatísticas
  if (/\d+%/.test(text)) score += 15;
  if (/\d+x/.test(text)) score += 10;
  
  return Math.min(score, 100);
}

function analyzeStructure(text: string): string {
  if (text.includes('1.') || text.includes('•')) return 'Lista';
  if (text.includes('Problema:') || text.includes('Solução:')) return 'Problema-Solução';
  if (text.includes('Antes:') || text.includes('Depois:')) return 'Antes-Depois';
  if (text.includes('thread') || text.includes('🧵')) return 'Thread';
  return 'Narrativa Simples';
}

function extractSocialProofElements(text: string): string[] {
  const elements = [];
  
  if (/\d+\s*(clientes?|usuários?|pessoas?)/.test(text)) elements.push('Números de Usuários');
  if (text.includes('empresa') || text.includes('startup')) elements.push('Credibilidade Empresarial');
  if (text.includes('anos') || text.includes('experiência')) elements.push('Experiência Temporal');
  if (text.includes('resultado') || text.includes('sucesso')) elements.push('Resultados Comprovados');
  
  return elements;
}

async function generateBehavioralInsights(tweets: any[], userAnalysis: any[]) {
  // Análise agregada de padrões comportamentais
  const topPatterns = extractTopPatterns(tweets, userAnalysis);
  const audiencePreferences = analyzeAudiencePreferences(tweets);
  const optimalTimes = calculateOptimalPostingTimes(tweets);
  const formatPreferences = analyzeFormatPreferences(tweets);
  
  return {
    top_performing_patterns: topPatterns,
    audience_preferences: audiencePreferences,
    optimal_posting_times: optimalTimes,
    content_format_preferences: formatPreferences
  };
}

async function analyzeCompetitiveIntelligence(tweets: any[]) {
  // Análise de inteligência competitiva
  return [
    {
      competitor: "Concorrente A",
      strategy_insights: ["Foco em conteúdo educacional", "Alto uso de threads"],
      content_gaps: ["Pouco storytelling pessoal", "Falta de dados quantitativos"],
      opportunity_areas: ["Conteúdo mais visual", "Interação com audiência"]
    }
  ];
}

function extractTopPatterns(tweets: any[], userAnalysis: any[]): string[] {
  // Extração de padrões de alto desempenho
  return [
    "Threads educacionais com dados",
    "Storytelling pessoal com resultados",
    "Perguntas que geram engajamento"
  ];
}

function analyzeAudiencePreferences(tweets: any[]): object {
  return {
    content_types: { educational: 45, promotional: 20, storytelling: 35 },
    tone_preferences: { professional: 60, casual: 40 },
    length_preferences: { short: 30, medium: 50, long: 20 }
  };
}

function calculateOptimalPostingTimes(tweets: any[]): string[] {
  // Análise de horários ótimos baseada em performance
  return ["09:00-11:00", "14:00-16:00", "19:00-21:00"];
}

function analyzeFormatPreferences(tweets: any[]): object {
  return {
    threads: 35,
    single_tweets: 45,
    polls: 10,
    media_tweets: 10
  };
}
```

---

## 📊 ANALYTICS SERVICES - Implementação

### 🧠 Análise de Sentimentos Contextualizada

```typescript
// app/api/analytics/sentiment/contextual/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import Sentiment from 'sentiment';
import * as natural from 'natural';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const sentiment = new Sentiment();

interface ContextualSentimentRequest {
  content: string;
  context: {
    brand_context: string;
    audience_segment: string;
    content_purpose: string;
    cultural_context?: string;
  };
  analysis_depth: 'basic' | 'advanced' | 'psychological';
}

export async function POST(request: NextRequest) {
  try {
    const body: ContextualSentimentRequest = await request.json();
    
    // 1. Análise básica de sentimento
    const basicSentiment = sentiment.analyze(body.content);
    
    // 2. Análise avançada com OpenAI
    const advancedAnalysis = await performAdvancedSentimentAnalysis(body);
    
    // 3. Análise de dimensões emocionais
    const emotionalDimensions = await analyzeEmotionalDimensions(body.content);
    
    // 4. Impacto psicológico
    const psychologicalImpact = await analyzePsychologicalImpact(body);
    
    // 5. Insights contextuais
    const contextualInsights = await generateContextualInsights(body);
    
    // 6. Sugestões de otimização
    const optimizationSuggestions = await generateOptimizationSuggestions(body, advancedAnalysis);
    
    const response = {
      sentiment_analysis: {
        overall_sentiment: {
          polarity: basicSentiment.score / 10, // Normalizar para -1 a 1
          subjectivity: calculateSubjectivity(body.content),
          confidence: advancedAnalysis.confidence
        },
        emotional_dimensions: emotionalDimensions,
        psychological_impact: psychologicalImpact
      },
      contextual_insights: contextualInsights,
      optimization_suggestions: optimizationSuggestions
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Contextual sentiment analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function performAdvancedSentimentAnalysis(params: ContextualSentimentRequest) {
  const analysisPrompt = `
    Realize uma análise avançada de sentimento do seguinte conteúdo:
    
    Conteúdo: "${params.content}"
    
    Contexto da Marca: ${params.context.brand_context}
    Segmento de Audiência: ${params.context.audience_segment}
    Propósito do Conteúdo: ${params.context.content_purpose}
    ${params.context.cultural_context ? `Contexto Cultural: ${params.context.cultural_context}` : ''}
    
    Forneça uma análise detalhada incluindo:
    1. Sentimento geral (positivo/negativo/neutro) com score de confiança
    2. Nuances emocionais específicas
    3. Tom de comunicação
    4. Adequação ao contexto fornecido
    
    Responda em formato JSON.
  `;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: analysisPrompt }],
    temperature: 0.1
  });
  
  return JSON.parse(completion.choices[0].message.content || '{}');
}

async function analyzeEmotionalDimensions(content: string) {
  // Análise das 8 dimensões emocionais de Plutchik
  const emotionPrompt = `
    Analise as dimensões emocionais do seguinte conteúdo usando o modelo de Plutchik:
    
    Conteúdo: "${content}"
    
    Forneça scores de 0 a 1 para cada emoção:
    - Joy (Alegria)
    - Trust (Confiança)
    - Fear (Medo)
    - Surprise (Surpresa)
    - Sadness (Tristeza)
    - Disgust (Desgosto)
    - Anger (Raiva)
    - Anticipation (Antecipação)
    
    Responda em formato JSON.
  `;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: emotionPrompt }],
    temperature: 0.1
  });
  
  return JSON.parse(completion.choices[0].message.content || '{}');
}

async function analyzePsychologicalImpact(params: ContextualSentimentRequest) {
  const impactPrompt = `
    Analise o impacto psicológico do seguinte conteúdo:
    
    Conteúdo: "${params.content}"
    Contexto: ${JSON.stringify(params.context)}
    
    Avalie de 0 a 1:
    1. Força de persuasão
    2. Score de credibilidade
    3. Ressonância emocional
    4. Probabilidade de ação
    
    Responda em formato JSON.
  `;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: impactPrompt }],
    temperature: 0.1
  });
  
  return JSON.parse(completion.choices[0].message.content || '{}');
}

function calculateSubjectivity(content: string): number {
  // Cálculo de subjetividade usando análise linguística
  const subjectiveWords = ['acho', 'acredito', 'sinto', 'parece', 'talvez', 'provavelmente'];
  const objectiveWords = ['dados', 'estatística', 'pesquisa', 'estudo', 'fato', 'evidência'];
  
  const words = content.toLowerCase().split(/\s+/);
  const subjectiveCount = words.filter(word => subjectiveWords.includes(word)).length;
  const objectiveCount = words.filter(word => objectiveWords.includes(word)).length;
  
  const totalIndicators = subjectiveCount + objectiveCount;
  if (totalIndicators === 0) return 0.5; // Neutro
  
  return subjectiveCount / totalIndicators;
}

async function generateContextualInsights(params: ContextualSentimentRequest) {
  return {
    brand_alignment: calculateBrandAlignment(params.content, params.context.brand_context),
    audience_resonance: calculateAudienceResonance(params
.content, params.context.audience_segment),
    cultural_sensitivity: calculateCulturalSensitivity(params.content, params.context.cultural_context),
    timing_appropriateness: calculateTimingAppropriateness(params.content, params.context.content_purpose)
  };
}

async function generateOptimizationSuggestions(params: ContextualSentimentRequest, analysis: any) {
  const suggestionPrompt = `
    Com base na análise de sentimento, forneça sugestões de otimização:
    
    Conteúdo Original: "${params.content}"
    Análise: ${JSON.stringify(analysis)}
    Contexto: ${JSON.stringify(params.context)}
    
    Forneça sugestões específicas para:
    1. Ajustes emocionais
    2. Modificações de tom
    3. Melhorias estruturais
    4. Enhancements psicológicos
    
    Responda em formato JSON com arrays de sugestões.
  `;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: suggestionPrompt }],
    temperature: 0.3
  });
  
  return JSON.parse(completion.choices[0].message.content || '{}');
}

function calculateBrandAlignment(content: string, brandContext: string): number {
  // Implementação simplificada - em produção usar embeddings
  const brandKeywords = brandContext.toLowerCase().split(/\s+/);
  const contentWords = content.toLowerCase().split(/\s+/);
  
  const matches = contentWords.filter(word => brandKeywords.includes(word)).length;
  return Math.min(matches / brandKeywords.length, 1);
}

function calculateAudienceResonance(content: string, audienceSegment: string): number {
  // Análise de ressonância com audiência específica
  const audienceKeywords = {
    'tech': ['tecnologia', 'inovação', 'digital', 'automação'],
    'business': ['negócio', 'estratégia', 'crescimento', 'resultado'],
    'marketing': ['marketing', 'conteúdo', 'engajamento', 'conversão']
  };
  
  const segment = audienceSegment.toLowerCase();
  const keywords = audienceKeywords[segment as keyof typeof audienceKeywords] || [];
  const contentLower = content.toLowerCase();
  
  const matches = keywords.filter(keyword => contentLower.includes(keyword)).length;
  return keywords.length > 0 ? matches / keywords.length : 0.5;
}

function calculateCulturalSensitivity(content: string, culturalContext?: string): number {
  if (!culturalContext) return 0.8; // Assume neutro se não especificado
  
  // Implementação básica - em produção usar modelos especializados
  const sensitiveTerms = ['problema', 'erro', 'falha', 'ruim'];
  const contentLower = content.toLowerCase();
  
  const sensitiveCount = sensitiveTerms.filter(term => contentLower.includes(term)).length;
  return Math.max(0.2, 1 - (sensitiveCount * 0.2));
}

function calculateTimingAppropriateness(content: string, contentPurpose: string): number {
  // Análise de adequação temporal baseada no propósito
  const urgencyWords = ['agora', 'hoje', 'urgente', 'rápido', 'imediato'];
  const contentLower = content.toLowerCase();
  
  const hasUrgency = urgencyWords.some(word => contentLower.includes(word));
  
  if (contentPurpose === 'promotional' && hasUrgency) return 0.9;
  if (contentPurpose === 'educational' && !hasUrgency) return 0.9;
  return 0.7;
}
```

---

## ✍️ COPYWRITING SERVICES - Implementação

### 🎨 Geração de Variações Criativas

```typescript
// app/api/copywriting/variations/creative/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface CreativeVariationsRequest {
  base_content: string;
  variation_parameters: {
    tone_variations: string[];
    structure_variations: string[];
    psychological_angles: string[];
    creativity_level: 'conservative' | 'moderate' | 'bold' | 'experimental';
  };
  brand_constraints: {
    voice_guidelines: string;
    forbidden_words: string[];
    required_elements: string[];
    brand_personality: string[];
  };
  target_metrics: {
    primary_goal: 'awareness' | 'engagement' | 'conversion' | 'viral';
    secondary_goals: string[];
    success_criteria: object;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CreativeVariationsRequest = await request.json();
    
    // 1. Gerar variações com diferentes modelos de IA
    const openaiVariations = await generateOpenAIVariations(body);
    const anthropicVariations = await generateAnthropicVariations(body);
    
    // 2. Combinar e diversificar variações
    const allVariations = [...openaiVariations, ...anthropicVariations];
    
    // 3. Análise de criatividade e performance
    const analyzedVariations = await analyzeVariations(allVariations, body);
    
    // 4. Filtragem por constraints da marca
    const filteredVariations = await filterByBrandConstraints(analyzedVariations, body.brand_constraints);
    
    // 5. Ranking por potencial de performance
    const rankedVariations = await rankByPerformancePotential(filteredVariations, body.target_metrics);
    
    // 6. Insights de otimização
    const optimizationInsights = await generateOptimizationInsights(rankedVariations);
    
    const response = {
      variations: rankedVariations.slice(0, 10), // Top 10 variações
      optimization_insights: optimizationInsights
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Creative variations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function generateOpenAIVariations(params: CreativeVariationsRequest) {
  const creativitySettings = {
    conservative: { temperature: 0.3, top_p: 0.8 },
    moderate: { temperature: 0.7, top_p: 0.9 },
    bold: { temperature: 0.9, top_p: 0.95 },
    experimental: { temperature: 1.0, top_p: 1.0 }
  };
  
  const settings = creativitySettings[params.variation_parameters.creativity_level];
  
  const variationPrompt = `
    Crie 5 variações criativas do seguinte conteúdo:
    
    Conteúdo Base: "${params.base_content}"
    
    Parâmetros de Variação:
    - Tons: ${params.variation_parameters.tone_variations.join(', ')}
    - Estruturas: ${params.variation_parameters.structure_variations.join(', ')}
    - Ângulos Psicológicos: ${params.variation_parameters.psychological_angles.join(', ')}
    
    Diretrizes da Marca:
    - Voz: ${params.brand_constraints.voice_guidelines}
    - Personalidade: ${params.brand_constraints.brand_personality.join(', ')}
    
    Objetivo Principal: ${params.target_metrics.primary_goal}
    
    Para cada variação, forneça:
    1. O conteúdo
    2. Tipo de variação aplicada
    3. Justificativa criativa
    
    Responda em formato JSON.
  `;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: variationPrompt }],
    temperature: settings.temperature,
    top_p: settings.top_p
  });
  
  return JSON.parse(completion.choices[0].message.content || '[]');
}

async function generateAnthropicVariations(params: CreativeVariationsRequest) {
  const variationPrompt = `
    Crie 5 variações altamente criativas e diferenciadas do seguinte conteúdo:
    
    Conteúdo Base: "${params.base_content}"
    
    Foque em:
    - Originalidade máxima
    - Preservação da mensagem core
    - Adequação aos objetivos: ${params.target_metrics.primary_goal}
    
    Evite:
    - ${params.brand_constraints.forbidden_words.join(', ')}
    
    Inclua obrigatoriamente:
    - ${params.brand_constraints.required_elements.join(', ')}
    
    Responda em formato JSON com array de objetos contendo 'content' e 'creative_approach'.
  `;
  
  const completion = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 2000,
    messages: [{ role: "user", content: variationPrompt }]
  });
  
  return JSON.parse(completion.content[0].text || '[]');
}

async function analyzeVariations(variations: any[], params: CreativeVariationsRequest) {
  return Promise.all(variations.map(async (variation, index) => {
    const analysis = await analyzeVariationQuality(variation.content, params);
    
    return {
      id: `var_${index}`,
      content: variation.content,
      variation_type: variation.creative_approach || variation.type || 'unknown',
      creativity_score: analysis.creativity_score,
      predicted_performance: analysis.predicted_performance,
      psychological_analysis: analysis.psychological_analysis,
      differentiation_factors: analysis.differentiation_factors,
      risk_assessment: analysis.risk_assessment
    };
  }));
}

async function analyzeVariationQuality(content: string, params: CreativeVariationsRequest) {
  const analysisPrompt = `
    Analise a qualidade da seguinte variação de conteúdo:
    
    Conteúdo: "${content}"
    Objetivo: ${params.target_metrics.primary_goal}
    
    Forneça scores de 0-100 para:
    1. Criatividade (originalidade e inovação)
    2. Potencial de engajamento
    3. Probabilidade de viralização
    4. Probabilidade de conversão
    5. Alinhamento com marca
    
    Também analise:
    - Apelo psicológico primário
    - Carga cognitiva (0-100)
    - Intensidade emocional (0-100)
    - Técnicas de persuasão utilizadas
    - Fatores de diferenciação
    - Riscos (marca, audiência, performance)
    
    Responda em formato JSON estruturado.
  `;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: analysisPrompt }],
    temperature: 0.1
  });
  
  return JSON.parse(completion.choices[0].message.content || '{}');
}

async function filterByBrandConstraints(variations: any[], constraints: any) {
  return variations.filter(variation => {
    const content = variation.content.toLowerCase();
    
    // Verificar palavras proibidas
    const hasForbiddenWords = constraints.forbidden_words.some((word: string) => 
      content.includes(word.toLowerCase())
    );
    
    if (hasForbiddenWords) return false;
    
    // Verificar elementos obrigatórios
    const hasRequiredElements = constraints.required_elements.every((element: string) => 
      content.includes(element.toLowerCase())
    );
    
    return hasRequiredElements;
  });
}

async function rankByPerformancePotential(variations: any[], targetMetrics: any) {
  const weights = {
    awareness: { engagement_score: 0.4, viral_potential: 0.4, conversion_likelihood: 0.1, brand_alignment: 0.1 },
    engagement: { engagement_score: 0.5, viral_potential: 0.2, conversion_likelihood: 0.2, brand_alignment: 0.1 },
    conversion: { engagement_score: 0.2, viral_potential: 0.1, conversion_likelihood: 0.6, brand_alignment: 0.1 },
    viral: { engagement_score: 0.3, viral_potential: 0.6, conversion_likelihood: 0.05, brand_alignment: 0.05 }
  };
  
  const goalWeights = weights[targetMetrics.primary_goal as keyof typeof weights];
  
  return variations
    .map(variation => ({
      ...variation,
      composite_score: (
        variation.predicted_performance.engagement_score * goalWeights.engagement_score +
        variation.predicted_performance.viral_potential * goalWeights.viral_potential +
        variation.predicted_performance.conversion_likelihood * goalWeights.conversion_likelihood +
        variation.predicted_performance.brand_alignment * goalWeights.brand_alignment
      )
    }))
    .sort((a, b) => b.composite_score - a.composite_score);
}

async function generateOptimizationInsights(variations: any[]) {
  const topVariations = variations.slice(0, 5);
  
  // Análise dos elementos de melhor performance
  const bestElements = extractBestPerformingElements(topVariations);
  const improvementOpportunities = identifyImprovementOpportunities(variations);
  const abTestRecommendations = generateABTestRecommendations(topVariations);
  
  return {
    best_performing_elements: bestElements,
    improvement_opportunities: improvementOpportunities,
    a_b_test_recommendations: abTestRecommendations
  };
}

function extractBestPerformingElements(variations: any[]): string[] {
  // Análise dos elementos comuns nas melhores variações
  const elements = [];
  
  const avgCreativity = variations.reduce((sum, v) => sum + v.creativity_score, 0) / variations.length;
  if (avgCreativity > 80) elements.push("Alto nível de criatividade");
  
  const avgEngagement = variations.reduce((sum, v) => sum + v.predicted_performance.engagement_score, 0) / variations.length;
  if (avgEngagement > 75) elements.push("Elementos de alto engajamento");
  
  return elements;
}

function identifyImprovementOpportunities(variations: any[]): string[] {
  const opportunities = [];
  
  const lowPerformers = variations.filter(v => v.composite_score < 60);
  if (lowPerformers.length > 0) {
    opportunities.push("Melhorar alinhamento com objetivos");
    opportunities.push("Aumentar apelo emocional");
  }
  
  return opportunities;
}

function generateABTestRecommendations(variations: any[]): string[] {
  const recommendations = [];
  
  if (variations.length >= 2) {
    const top2 = variations.slice(0, 2);
    const scoreDiff = Math.abs(top2[0].composite_score - top2[1].composite_score);
    
    if (scoreDiff < 10) {
      recommendations.push(`Testar variação ${top2[0].id} vs ${top2[1].id} - scores similares`);
    }
  }
  
  return recommendations;
}
```

---

## 🤖 INTEGRAÇÃO COM AGENTES IA EXISTENTES

### 🔄 Enhanced Agent Communication

```typescript
// lib/agents/enhanced-communication.ts
import { OpenAI } from 'openai';

interface AgentCommunicationProtocol {
  agent_id: string;
  input_data: any;
  context: any;
  previous_agent_output?: any;
}

interface AgentResponse {
  agent_id: string;
  output_data: any;
  confidence_score: number;
  processing_time: number;
  next_agent_recommendations?: string[];
}

export class EnhancedAgentOrchestrator {
  private openai: OpenAI;
  private agents: Map<string, any>;
  
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.agents = new Map();
    this.initializeAgents();
  }
  
  private initializeAgents() {
    // Agente Brainstorm Enhanced
    this.agents.set('brainstorm_enhanced', {
      prompt: this.getBrainstormEnhancedPrompt(),
      tools: ['semantic_search', 'twitter_behavioral', 'trend_analysis', 'psychographic_insights'],
      output_schema: {
        creative_concepts: 'array',
        psychological_rationale: 'object',
        differentiation_strategy: 'string'
      }
    });
    
    // Agente Validação Enhanced
    this.agents.set('validation_enhanced', {
      prompt: this.getValidationEnhancedPrompt(),
      tools: ['sentiment_analysis', 'trigger_analysis', 'competitive_intelligence'],
      output_schema: {
        validation_score: 'number',
        psychological_effectiveness: 'number',
        risk_assessment: 'object',
        optimization_recommendations: 'array'
      }
    });
    
    // Agente Criação Enhanced
    this.agents.set('creation_enhanced', {
      prompt: this.getCreationEnhancedPrompt(),
      tools: ['creative_variations', 'personalization', 'ab_test_setup'],
      output_schema: {
        content_variations: 'array',
        personalized_versions: 'array',
        ab_test_configuration: 'object'
      }
    });
    
    // Agente Humanização Enhanced
    this.agents.set('humanization_enhanced', {
      prompt: this.getHumanizationEnhancedPrompt(),
      tools: ['voice_analysis', 'authenticity_check', 'brand_alignment'],
      output_schema: {
        humanized_content: 'array',
        authenticity_score: 'number',
        voice_alignment: 'number'
      }
    });
    
    // Agente Performance Enhanced
    this.agents.set('performance_enhanced', {
      prompt: this.getPerformanceEnhancedPrompt(),
      tools: ['engagement_prediction', 'pattern_recognition', 'optimization_insights'],
      output_schema: {
        performance_predictions: 'object',
        optimization_insights: 'object',
        learning_feedback: 'object'
      }
    });
  }
  
  async executeAgentPipeline(initialInput: any, userContext: any): Promise<any> {
    const pipelineResults = new Map();
    
    try {
      // 1. Brainstorm Enhanced
      console.log('🧠 Executando Agente Brainstorm Enhanced...');
      const brainstormResult = await this.executeAgent('brainstorm_enhanced', {
        ...initialInput,
        research_data: await this.gatherResearchData(initialInput.topic),
        user_context: userContext
      });
      pipelineResults.set('brainstorm', brainstormResult);
      
      // 2. Validação Enhanced
      console.log('✅ Executando Agente Validação Enhanced...');
      const validationResult = await this.executeAgent('validation_enhanced', {
        creative_concepts: brainstormResult.output_data.creative_concepts,
        behavioral_data: await this.getBehavioralData(initialInput.topic),
        user_context: userContext
      });
      pipelineResults.set('validation', validationResult);
      
      // Verificar se passou na validação
      if (validationResult.output_data.validation_score < 0.7) {
        console.log('🔄 Refinando conceitos baseado no feedback...');
        return this.refineAndRetry(pipelineResults, userContext);
      }
      
      // 3. Criação Enhanced
      console.log('🎨 Executando Agente Criação Enhanced...');
      const creationResult = await this.executeAgent('creation_enhanced', {
        validated_concepts: validationResult.output_data,
        persona_data: userContext.persona_profile,
        funnel_context: userContext.funnel_stage
      });
      pipelineResults.set('creation', creationResult);
      
      // 4. Humanização Enhanced
      console.log('🎭 Executando Agente Humanização Enhanced...');
      const humanizationResult = await this.executeAgent('humanization_enhanced', {
        generated_content: creationResult.output_data.content_variations,
        brand_voice_analysis: userContext.brand_voice,
        authenticity_requirements: userContext.authenticity_requirements
      });
      pipelineResults.set('humanization', humanizationResult);
      
      // 5. Performance Enhanced
      console.log('📊 Executando Agente Performance Enhanced...');
      const performanceResult = await this.executeAgent('performance_enhanced', {
        final_content: humanizationResult.output_data.humanized_content,
        prediction_models: await this.loadPredictionModels(),
        historical_performance: await this.getHistoricalPerformance(userContext.user_id)
      });
      pipelineResults.set('performance', performanceResult);
      
      // 6. Compilar resultado final
      return this.compileFinalResult(pipelineResults);
      
    } catch (error) {
      console.error('Pipeline execution error:', error);
      throw error;
    }
  }
  
  private async executeAgent(agentId: string, input: any): Promise<AgentResponse> {
    const agent = this.agents.get(agentId);
    if (!agent) throw new Error(`Agent ${agentId} not found`);
    
    const startTime = Date.now();
    
    try {
      // Executar ferramentas necessárias
      const toolResults = await this.executeAgentTools(agent.tools, input);
      
      // Executar prompt principal do agente
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: agent.prompt },
          { role: "user", content: JSON.stringify({ ...input, tool_results: toolResults }) }
        ],
        temperature: 0.7
      });
      
      const outputData = JSON.parse(completion.choices[0].message.content || '{}');
      const processingTime = Date.now() - startTime;
      
      return {
        agent_id: agentId,
        output_data: outputData,
        confidence_score: this.calculateConfidenceScore(outputData),
        processing_time: processingTime,
        next_agent_recommendations: this.getNextAgentRecommendations(agentId, outputData)
      };
      
    } catch (error) {
      console.error(`Agent ${agentId} execution error:`, error);
      throw error;
    }
  }
  
  private async executeAgentTools(tools: string[], input: any): Promise<any> {
    const toolResults: any = {};
    
    for (const tool of tools) {
      try {
        switch (tool) {
          case 'semantic_search':
            toolResults.semantic_search = await this.callSemanticSearch(input);
            break;
          case 'twitter_behavioral':
            toolResults.twitter_behavioral = await this.callTwitterBehavioral(input);
            break;
          case 'sentiment_analysis':
            toolResults.sentiment_analysis = await this.callSentimentAnalysis(input);
            break;
          case 'creative_variations':
            toolResults.creative_variations = await this.callCreativeVariations(input);
            break;
          case 'engagement_prediction':
            toolResults.engagement_prediction = await this.callEngagementPrediction(input);
            break;
          // Adicionar outros tools conforme necessário
        }
      } catch (error) {
        console.error(`Tool ${tool} execution error:`, error);
        toolResults[tool] = { error: error.message };
      }
    }
    
    return toolResults;
  }
  
  private async callSemanticSearch(input: any) {
    // Chamada para o endpoint de semantic search
    const response = await fetch('/api/research/websearch/semantic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: input.topic || input.query,
        context: input.context || {},
        analysis_depth: 'deep'
      })
    });
    
    return response.json();
  }
  
  private async callTwitterBehavioral(input: any) {
    // Chamada para o endpoint de Twitter behavioral search
    const response = await fetch('/api/research/twitter/behavioral-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: input.topic || input.query,
        behavioral_filters: input.behavioral_filters || {},
        analysis_scope: {
          include_replies: true,
          include_threads: true,
          sentiment_analysis: true,
          influence_mapping: true
        }
      })
    });
    
    return response.json();
  }
  
  private async callSentimentAnalysis(input: any) {
    // Chamada para o endpoint de sentiment analysis
    const response = await fetch('/api/analytics/sentiment/contextual', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: input.content || '',
        context: input.context || {},
        analysis_depth: 'psychological'
      })
    });
    
    return response.json();
  }
  
  private async callCreativeVariations(input: any) {
    // Chamada para o endpoint de creative variations
    const response = await fetch('/api/copywriting/variations/creative', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        base_content: input.base_content || '',
        variation_parameters: input.variation_parameters || {},
        brand_constraints: input.brand_constraints || {},
        target_metrics: input.target_metrics || {}
      })
    });
    
    return response.json();
  }
  
  private async callEngagementPrediction(input: any) {
    // Chamada para o endpoint de engagement prediction
    const response = await fetch('/api/ml/prediction/engagement-psychology', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: input.content || '',
        context: input.context || {},
        psychological_factors: input.psychological_factors || {}
      })
    });
    
    return response.json();
  }
  
  private calculateConfidenceScore(outputData: any): number {
    // Cálculo de score de confiança baseado na qualidade dos dados
    let score = 0.5; // Base
    
    if (outputData && Object.keys(outputData).length > 0) score += 0.2;
    if (outputData.validation_score && outputData.validation_score > 0.8) score += 0.2;
    if (outputData.creativity_score && outputData.creativity_score > 80) score += 0.1;
    
    return Math.min(score, 1.0);
  }
  
  private getNextAgentRecommendations(agentId: string, outputData: any): string[] {
    const recommendations: string[] = [];
    
    switch (agentId) {
      case 'brainstorm_enhanced':
        if (outputData.creative_concepts?.length < 5) {
          recommendations.push('Gerar mais conceitos criativos');
        }
        break;
      case 'validation_enhanced':
        if (outputData.validation_score < 0.8) {
          recommendations.push('Refinar conceitos para melhor performance');
        }
        break;
      // Adicionar outras recomendações
    }
    
    return recommendations;
  }
  
  private async gatherResearchData(topic: string) {
    // Coleta dados de pesquisa de múltiplas fontes
    return {
      trends: await this.getTrendData(topic),
      competitors: await this.getCompetitorData(topic),
      audience_insights: await this.getAudienceInsights(topic)
    };
  }
  
  private async getBehavioralData(topic: string) {
    // Coleta dados comportamentais do Twitter
    return {
      engagement_patterns: {},
      user_demographics: {},
      content_psychology: {}
    };
  }
  
  private async loadPredictionModels() {
    // Carrega modelos de predição de performance
    return {
      engagement_model: 'loaded',
      viral_model: 'loaded',
      conversion_model: 'loaded'
    };
  }
  
  private async getHistoricalPerformance(userId: string) {
    // Busca performance histórica do usuário
    return {
      avg_engagement: 0.08,
      best_performing_content: [],
      audience_preferences: {}
    };
  }
  
  private async refineAndRetry(pipelineResults: Map<string, any>, userContext: any) {
    // Lógica de refinamento e retry
    console.log('🔄 Refinando conceitos...');
    
    const brainstormResult = pipelineResults.get('brainstorm');
    const validationResult = pipelineResults.get('validation');
    
    // Usar feedback da validação para melhorar brainstorm
    const refinedInput = {
      ...brainstormResult.output_data,
      feedback: validationResult.output_data.optimization_recommendations,
      user_context: userContext
    };
    
    // Re-executar pipeline com conceitos refinados
    return this.executeAgentPipeline(refinedInput, userContext);
  }
  
  private compileFinalResult(pipelineResults: Map<string, any>) {
    const results = Array.from(pipelineResults.entries()).reduce((acc, [key, value]) => {
      acc[key] = value.output_data;
      return acc;
    }, {} as any);
    
    return {
      success: true,
      pipeline_results: results,
      final_content: results.humanization?.humanized_content || [],
      performance_predictions: results.performance?.performance_predictions || {},
      metadata: {
        total_processing_time: Array.from(pipelineResults.values())
          .reduce((sum, result) => sum + result.processing_time, 0),
        confidence_scores: Array.from(pipe