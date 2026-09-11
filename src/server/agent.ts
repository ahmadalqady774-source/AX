import { GoogleGenAI, FunctionDeclaration, Tool, Type } from "@google/genai";
import { Request, Response } from "express";

// 1. System Instructions (Safety & Behavior)
const SYSTEM_INSTRUCTION = `أنت المساعد الجامعي الذكي (University Copilot) لجامعة تعز.
مهمتك مساعدة الطلاب في تنظيم وقتهم، شرح المفاهيم، وتحليل المهام الأكاديمية.
القواعد الصارمة:
1. لا تخترع أي معلومات (مواعيد، درجات، مواد، أسماء دكاترة). إذا لم تجد المعلومة في الأدوات، قل صراحة أنك لا تملك هذه المعلومة.
2. استخدم الأدوات المتاحة فقط عند الضرورة القصوى.
3. التزم باللغة العربية الأكاديمية الواضحة، مع الحفاظ على المصطلحات التقنية الإنجليزية عند الحاجة.
4. اطلب التأكيد قبل القيام بأي إجراء حساس (حذف، تعديل بيانات).
`;

// 2. Define Tools (Contracts)
const tools: Tool[] = [{
  functionDeclarations: [
    {
      name: "getAcademicSchedule",
      description: "جلب الجدول الدراسي للطالب.",
    },
    {
      name: "getTasks",
      description: "جلب قائمة المهام الدراسية للطالب.",
    },
    {
      name: "addTask",
      description: "إضافة مهمة دراسية جديدة.",
      parameters: {
        type: Type.OBJECT,
        properties: { 
            title: { type: Type.STRING },
            date: { type: Type.STRING },
            type: { type: Type.STRING, enum: ['Exam', 'Quiz', 'Deadline', 'Task'] }
        },
        required: ["title", "date", "type"]
      }
    },
    {
      name: "analyzeCourseTasks",
      description: "تحليل المهام الدراسية لمقرر معين.",
      parameters: {
        type: Type.OBJECT,
        properties: { courseId: { type: Type.STRING } },
        required: ["courseId"]
      }
    }
  ]
}];

// 3. Lazy Initialize AI
let aiInstance: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY || "";
    aiInstance = new GoogleGenAI({ 
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// 4. API Handlers
export async function handleAgentRequest(req: Request, res: Response) {
  const { message } = req.body;
  
  try {
    const ai = getAI();
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: tools,
      },
    });
    
    const result = await chat.sendMessage({ message: message });
    
    // Check for tool calls
    const functionCalls = result.functionCalls;
    if (functionCalls && functionCalls.length > 0) {
      return res.json({ toolCalls: functionCalls });
    }

    res.json({ reply: result.text });
  } catch (error) {
    console.error('Agent error:', error);
    res.status(500).json({ error: "فشل في معالجة الطلب." });
  }
}

export async function handleAnalyzeRequest(req: Request, res: Response) {
  const { transcript, difficulty } = req.body;
  
  try {
    const prompt = `You are an Academic Intelligence Engine. Analyze lecture transcripts, extract academic events (Exams, Quizzes, Deadlines), and structure the result into a clean JSON format. Include a daily study plan with Focus Room sessions (duration in minutes) and XP points for each session.
    
    Difficulty Level: ${difficulty}
    
    Transcript:
    ${transcript}
    
    Return ONLY JSON.`;
    
    const ai = getAI();
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const text = result.text;
    
    // Simple extraction of JSON from response if needed (Gemini sometimes adds markdown)
    const jsonStr = text?.replace(/```json/g, '').replace(/```/g, '').trim();
    
    res.json({ result: jsonStr });
  } catch (error) {
    console.error('Analyze error:', error);
    res.status(500).json({ error: "فشل في تحليل المحاضرة." });
  }
}

export async function handleGeneratePlacementTest(req: Request, res: Response) {
  const { courseTitle, majorName, targetLecture } = req.body;

  try {
    const prompt = `أنت محرك الذكاء الأكاديمي لجامعة تعز. قم بتوليد اختبار تشخيصي دقيق لتحديد مستوى الطالب في مقرر "${courseTitle}" (تخصص: ${majorName || 'حاسوب وتكنولوجيا'}) للمحاضرات من 1 إلى ${targetLecture}.
المطلوب:
توليد سؤالين لكل محاضرة (من المحاضرة 1 حتى المحاضرة ${targetLecture}):
- سؤال اختيارات من متعدد (4 خيارات)
- سؤال صح وخطأ أو سؤال تطبيقي سريع
مع تحديد الإجابة الصحيحة وشرح السبب الأكاديمي المختصر.

أرجع النتيجة بصيغة JSON حصراً بهذا الهيكل:
{
  "questions": [
    {
      "id": "q1",
      "lectureNumber": 1,
      "topic": "عنوان المفهوم",
      "question": "نص السؤال الدقيق",
      "options": ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
      "correctIndex": 0,
      "explanation": "شرح لماذا هذا الخيار صحيح",
      "type": "multiple_choice"
    }
  ]
}`;

    const ai = getAI();
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = result.text;
    const data = JSON.parse(text || '{"questions":[]}');
    res.json(data);
  } catch (error) {
    console.error('Generate placement test error:', error);
    res.status(500).json({ error: "فشل في إنشاء الاختبار التشخيصي." });
  }
}

export async function handleAnalyzeGaps(req: Request, res: Response) {
  const { courseTitle, targetLecture, answers, questions } = req.body;

  try {
    const prompt = `أنت خبير تشخيص أكاديمي ذكي. حلل إجابات الطالب في اختبار تحديد المستوى لمقرر "${courseTitle}" لتغطية المحاضرات حتى ${targetLecture}.
الأسئلة وإجابات الطالب:
${JSON.stringify({ questions, answers })}

المطلوب:
1. حساب النسبة المئوية الدقيقة.
2. تحديد المحاضرات المتقنة والمحاضرات الضعيفة.
3. استخراج المفاهيم الضعيفة بدقة، وإعداد وحدة علاجية فورية (شرح مختصر دقيق للمفهوم، القاعدة الجوهرية، وسؤال إعادة اختبار تأكيدي مع خياراته).
4. تحديد رقم المحاضرة المقترحة لبدء دراسته فوراً.

أرجع النتيجة بصيغة JSON حصراً بهذا الهيكل:
{
  "score": 75,
  "totalQuestions": 10,
  "correctCount": 7,
  "masteredLectures": [1, 2, 4],
  "weakLectures": [3, 5],
  "recommendedStartLecture": 3,
  "weakTopics": [
    {
      "lectureNumber": 3,
      "topic": "اسم المفهوم غير المتقن",
      "conceptSummary": "شرح مركز ودقيق يصحح الفهم الخاطئ لدى الطالب",
      "keyRule": "القاعدة الذهبية التي يجب تذكرها",
      "remedialQuestion": {
        "question": "سؤال إتقان جديد",
        "options": ["أ", "ب", "ج", "د"],
        "correctIndex": 0,
        "explanation": "التفسير الأكاديمي"
      }
    }
  ]
}`;

    const ai = getAI();
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = result.text;
    const data = JSON.parse(text || '{}');
    res.json(data);
  } catch (error) {
    console.error('Analyze gaps error:', error);
    res.status(500).json({ error: "فشل في تحليل الفجوات الأكاديمية." });
  }
}

export async function handleGenerateCatchUpPlanAI(req: Request, res: Response) {
  const { courseTitle, targetLecture, startLecture, dailyHours, intensity } = req.body;

  try {
    const prompt = `أنت مستشار استراتيجي أكاديمي للطلاب الجامعيين. صمم خطة مذاكرة ولحاق مكثفة وصارمة لمقرر "${courseTitle}".
معطيات الطالب:
- المحاضرة التي وصل إليها الفصل: ${targetLecture}
- المحاضرة التي سيبدأ منها المذاكرة: ${startLecture || 1}
- عدد الساعات المتاحة يومياً: ${dailyHours || 2} ساعات
- وتيرة الخطة المطلوبة: ${intensity || 'balanced'} (turbo=مكثف صاعق, balanced=متوازن سريع, steady=مرن تدريجي)

المطلوب:
توزيع الساعات المتاحة يومياً إلى جلسات دراسية دقيقة (نظري، حل مسائل، تلخيص، كويز يومي)، مع تحديد المحاضرات المغطاة لكل يوم وملاحظات الذاكرة الخاصة بالتزام الطالب.

أرجع النتيجة بصيغة JSON حصراً بالهيكل:
{
  "totalDays": 4,
  "days": [
    {
      "dayNumber": 1,
      "date": "اليوم 1",
      "lecturesCovered": [1, 2],
      "totalMinutes": 120,
      "dailyObjective": "الهدف الأكاديمي لليوم",
      "sessions": [
        {
          "id": "s1",
          "timeSlot": "الجلسة 1 (45 دقيقة)",
          "title": "استيعاب مفاهيم المحاضرة 1 وتدوين القواعد",
          "lectureNum": 1,
          "durationMinutes": 45,
          "type": "theory",
          "xp": 60,
          "completed": false
        }
      ]
    }
  ],
  "memoryNotes": [
    "ملاحظة توجيهية للذاكرة الأكاديمية للطالب"
  ]
}`;

    const ai = getAI();
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = result.text;
    const data = JSON.parse(text || '{}');
    res.json(data);
  } catch (error) {
    console.error('Generate catchup plan error:', error);
    res.status(500).json({ error: "فشل في توليد خطة اللحاق بالذكاء الاصطناعي." });
  }
}

