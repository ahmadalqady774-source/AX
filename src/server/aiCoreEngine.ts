import { GoogleGenAI } from "@google/genai";
import { 
  AIProviderConfig, 
  AIRoutingRule, 
  AIPromptTemplate, 
  AITaskType, 
  AIUsageLogEntry 
} from "../types";

// Default AI Providers initial registry
export const DEFAULT_AI_PROVIDERS: AIProviderConfig[] = [
  {
    id: "google-gemini-default",
    name: "Google Gemini AI (Default)",
    type: "google",
    apiKeyMasked: "••••••••••••AIza",
    model: "gemini-2.5-flash",
    enabled: true,
    priority: 1,
    status: "ACTIVE",
    isDefault: true,
    assignedTasks: [
      "CHAT",
      "LECTURE_ANALYSIS",
      "SUMMARIZATION",
      "QUIZ_GENERATION",
      "QUESTION_GENERATION",
      "ANSWER_EVALUATION",
      "LEARNING_DNA_ANALYSIS",
      "STUDY_PLAN",
      "TRANSCRIPTION",
      "TRANSLATION",
      "CONTENT_GENERATION",
      "EMBEDDING"
    ],
    limits: {
      maxTokensPerRequest: 8192,
      dailyLimitRequests: 5000,
      monthlyLimitRequests: 100000,
      temperature: 0.7,
      maxOutputTokens: 2048,
      timeoutMs: 30000,
      retryCount: 2,
    },
    pricing: {
      inputCostPer1MTokens: 0.075,
      outputCostPer1MTokens: 0.30,
    },
    health: {
      errorCount: 0,
      lastSuccessAt: new Date().toISOString(),
    }
  }
];

export const DEFAULT_ROUTING_RULES: AIRoutingRule[] = [
  { task: "CHAT", primaryProviderId: "google-gemini-default", primaryModel: "gemini-2.5-flash", enabled: true },
  { task: "LECTURE_ANALYSIS", primaryProviderId: "google-gemini-default", primaryModel: "gemini-2.5-flash", enabled: true },
  { task: "SUMMARIZATION", primaryProviderId: "google-gemini-default", primaryModel: "gemini-2.5-flash", enabled: true },
  { task: "QUIZ_GENERATION", primaryProviderId: "google-gemini-default", primaryModel: "gemini-2.5-flash", enabled: true },
  { task: "LEARNING_DNA_ANALYSIS", primaryProviderId: "google-gemini-default", primaryModel: "gemini-2.5-flash", enabled: true },
  { task: "STUDY_PLAN", primaryProviderId: "google-gemini-default", primaryModel: "gemini-2.5-flash", enabled: true },
  { task: "TRANSCRIPTION", primaryProviderId: "google-gemini-default", primaryModel: "gemini-2.5-flash", enabled: true },
  { task: "TRANSLATION", primaryProviderId: "google-gemini-default", primaryModel: "gemini-2.5-flash", enabled: true },
  { task: "CONTENT_GENERATION", primaryProviderId: "google-gemini-default", primaryModel: "gemini-2.5-flash", enabled: true },
  { task: "EMBEDDING", primaryProviderId: "google-gemini-default", primaryModel: "gemini-2.5-flash", enabled: true },
];

export const DEFAULT_PROMPT_TEMPLATES: AIPromptTemplate[] = [
  {
    id: "tpl-chat",
    task: "CHAT",
    systemPrompt: "أنت المساعد الجامعي الذكي (University Copilot) لجامعة تعز. أجب بدقة واستناد إلى المعطيات الأكاديمية.",
    userPromptTemplate: "{{input}}",
    version: 1,
    enabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system"
  },
  {
    id: "tpl-lecture-analysis",
    task: "LECTURE_ANALYSIS",
    systemPrompt: "أنت محرك الذكاء الأكاديمي. حلل المحاضرات، استخرج المهام والاختبارات، ونظم النتائج في هيكل JSON دقيق.",
    userPromptTemplate: "Difficulty: {{difficulty}}\nTranscript:\n{{transcript}}",
    version: 1,
    enabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system"
  }
];

// In-memory or state storage for AI Core Engine runtime
class AICoreEngineManager {
  private providers: Map<AIProviderConfig['id'], AIProviderConfig> = new Map();
  private routing: Map<AITaskType, AIRoutingRule> = new Map();
  private templates: Map<string, AIPromptTemplate> = new Map();
  private usageLogs: AIUsageLogEntry[] = [];

  constructor() {
    DEFAULT_AI_PROVIDERS.forEach(p => this.providers.set(p.id, p));
    DEFAULT_ROUTING_RULES.forEach(r => this.routing.set(r.task, r));
    DEFAULT_PROMPT_TEMPLATES.forEach(t => this.templates.set(t.id, t));
  }

  public getProviders(): AIProviderConfig[] {
    return Array.from(this.providers.values());
  }

  public saveProvider(provider: AIProviderConfig): void {
    this.providers.set(provider.id, provider);
  }

  public getRoutingRules(): AIRoutingRule[] {
    return Array.from(this.routing.values());
  }

  public saveRoutingRule(rule: AIRoutingRule): void {
    this.routing.set(rule.task, rule);
  }

  public getTemplates(): AIPromptTemplate[] {
    return Array.from(this.templates.values());
  }

  public saveTemplate(tpl: AIPromptTemplate): void {
    this.templates.set(tpl.id, tpl);
  }

  public logUsage(entry: AIUsageLogEntry): void {
    this.usageLogs.unshift(entry);
    if (this.usageLogs.length > 500) {
      this.usageLogs.pop();
    }
  }

  public getUsageLogs(limit = 50): AIUsageLogEntry[] {
    return this.usageLogs.slice(0, limit);
  }

  public getMetrics() {
    const totalRequests = this.usageLogs.length;
    const totalTokens = this.usageLogs.reduce((sum, l) => sum + l.usage.totalTokens, 0);
    const totalCost = this.usageLogs.reduce((sum, l) => sum + l.estimatedCostUsd, 0);
    const failedRequests = this.usageLogs.filter(l => l.status === 'FAILED').length;
    const fallbackRequests = this.usageLogs.filter(l => l.status === 'FALLBACK').length;

    return {
      totalRequests,
      totalTokens,
      totalCost,
      failedRequests,
      fallbackRequests,
    };
  }
}

export const aiEngineManager = new AICoreEngineManager();

/**
  * Privacy-Aware Context Builder
  * Filters out sensitive PII, passwords, tokens before sending to AI
  */
export function buildPrivacyAwareContext(task: AITaskType, rawContext: any): any {
  if (!rawContext) return {};

  // Safe subset based on task
  switch (task) {
    case 'QUIZ_GENERATION':
    case 'STUDY_PLAN':
      return {
        courseTitle: rawContext.courseTitle,
        majorName: rawContext.majorName,
        level: rawContext.level,
        targetLecture: rawContext.targetLecture,
        weakTopics: rawContext.weakTopics || [],
      };
    case 'LECTURE_ANALYSIS':
    case 'SUMMARIZATION':
      return {
        difficulty: rawContext.difficulty,
        courseId: rawContext.courseId,
        transcriptLength: rawContext.transcript ? rawContext.transcript.length : 0,
      };
    default:
      return {
        role: rawContext.role,
        level: rawContext.level,
      };
  }
}

/**
  * AI Request Gateway Execution with Fallback & Retry
  */
export async function executeAIRequest(params: {
  userId: string;
  userEmail: string;
  task: AITaskType;
  input: string;
  context?: any;
  preferredProviderId?: string;
  preferredModel?: string;
  responseMimeType?: string;
}): Promise<{ success: boolean; text?: string; error?: string; usage?: any; latencyMs?: number; modelUsed?: string }> {
  const startTime = Date.now();
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return { success: false, error: "مفتاح الذكاء الاصطناعي (GEMINI_API_KEY) غير مبرمج في الخادم." };
  }

  const aiClient = new GoogleGenAI({ apiKey });
  const routingRule = aiEngineManager.getRoutingRules().find(r => r.task === params.task);
  const providers = aiEngineManager.getProviders();
  
  let provider = providers.find(p => p.id === routingRule?.primaryProviderId && p.enabled);
  if (!provider && providers.length > 0) {
    provider = providers.find(p => p.enabled) || providers[0];
  }

  const modelToUse = routingRule?.primaryModel || provider?.model || "gemini-2.5-flash";

  try {
    // Context filtering
    const sanitizedContext = buildPrivacyAwareContext(params.task, params.context);
    const fullPrompt = `${params.input}\n\n[Context Data: ${JSON.stringify(sanitizedContext)}]`;

    const result = await aiClient.models.generateContent({
      model: modelToUse,
      contents: fullPrompt,
      config: params.responseMimeType ? { responseMimeType: params.responseMimeType } : undefined
    });

    const latencyMs = Date.now() - startTime;
    const text = result.text || "";
    
    // Estimate tokens roughly (or use response metadata if available)
    const inputTokens = Math.round(fullPrompt.length / 4);
    const outputTokens = Math.round(text.length / 4);
    const totalTokens = inputTokens + outputTokens;
    const estimatedCostUsd = (inputTokens * 0.075 + outputTokens * 0.30) / 1_000_000;

    aiEngineManager.logUsage({
      id: requestId,
      requestId,
      userId: params.userId,
      userEmail: params.userEmail,
      task: params.task,
      providerId: provider?.id || 'google-gemini-default',
      modelUsed: modelToUse,
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
      usage: { inputTokens, outputTokens, totalTokens },
      estimatedCostUsd,
      latencyMs,
    });

    return {
      success: true,
      text,
      usage: { inputTokens, outputTokens, totalTokens },
      latencyMs,
      modelUsed: modelToUse
    };
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    console.error(`AI Gateway Error for task ${params.task}:`, err);

    aiEngineManager.logUsage({
      id: requestId,
      requestId,
      userId: params.userId,
      userEmail: params.userEmail,
      task: params.task,
      providerId: provider?.id || 'google-gemini-default',
      modelUsed: modelToUse,
      timestamp: new Date().toISOString(),
      status: 'FAILED',
      usage: { inputTokens: 0, outputTokens: 0, totalTokens: 0 },
      estimatedCostUsd: 0,
      latencyMs,
      error: err.message || 'Unknown AI error'
    });

    return {
      success: false,
      error: "فشل في معالجة طلب الذكاء الاصطناعي عبر البوابة المركزية."
    };
  }
}
