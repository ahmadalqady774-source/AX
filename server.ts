import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { 
  handleAgentRequest, 
  handleAnalyzeRequest,
  handleGeneratePlacementTest,
  handleAnalyzeGaps,
  handleGenerateCatchUpPlanAI
} from "./src/server/agent";
import { aiEngineManager, executeAIRequest } from "./src/server/aiCoreEngine";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for the Agent
  app.post("/api/agent", handleAgentRequest);
  app.post("/api/analyze", handleAnalyzeRequest);
  app.post("/api/placement/generate-test", handleGeneratePlacementTest);
  app.post("/api/placement/analyze-gaps", handleAnalyzeGaps);
  app.post("/api/placement/catchup-plan", handleGenerateCatchUpPlanAI);

  // University AI Core API Endpoints
  app.post("/api/ai/execute", async (req, res) => {
    const { userId, userEmail, task, input, context, preferredProviderId, preferredModel, responseMimeType } = req.body;
    if (!task || !input) {
      return res.status(400).json({ error: "Missing required fields: task and input" });
    }
    const result = await executeAIRequest({
      userId: userId || 'anonymous',
      userEmail: userEmail || 'student@taiz.edu',
      task,
      input,
      context,
      preferredProviderId,
      preferredModel,
      responseMimeType
    });
    if (!result.success) {
      return res.status(500).json(result);
    }
    res.json(result);
  });

  app.get("/api/ai/config", (req, res) => {
    res.json({
      providers: aiEngineManager.getProviders(),
      routing: aiEngineManager.getRoutingRules(),
      templates: aiEngineManager.getTemplates(),
      metrics: aiEngineManager.getMetrics(),
      logs: aiEngineManager.getUsageLogs(30)
    });
  });

  app.post("/api/ai/config", (req, res) => {
    const { providers, routing, templates } = req.body;
    if (providers && Array.isArray(providers)) {
      providers.forEach(p => aiEngineManager.saveProvider(p));
    }
    if (routing && Array.isArray(routing)) {
      routing.forEach(r => aiEngineManager.saveRoutingRule(r));
    }
    if (templates && Array.isArray(templates)) {
      templates.forEach(t => aiEngineManager.saveTemplate(t));
    }
    res.json({ success: true, message: "تم تحديث إعدادات الذكاء الاصطناعي بنجاح" });
  });

  app.post("/api/ai/test-connection", async (req, res) => {
    const { providerId, apiKey } = req.body;
    const keyToTest = apiKey || process.env.GEMINI_API_KEY;
    if (!keyToTest) {
      return res.json({ success: false, error: "مفتاح الربط غير متوفر للاختبار" });
    }
    try {
      const client = new GoogleGenAI({ apiKey: keyToTest });
      const testRes = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Ping test connection. Reply with 'OK'."
      });
      if (testRes.text) {
        return res.json({ success: true, message: "تم الاتصال بنجاح واستجابة النموذج سليمة." });
      }
      res.json({ success: false, error: "لم يتم استلام استجابة صحيحة من النموذج." });
    } catch (err: any) {
      res.json({ success: false, error: err.message || "فشل الاتصال بالمزود." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

