import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initiated successfully");
  } catch (err) {
    console.error("Failed to initialize Gemini SDK:", err);
  }
} else {
  console.log("No valid GEMINI_API_KEY found, fallback engine will be used.");
}

// Full-stack API: Formulate personalized scent
app.post("/api/formulate", async (req: express.Request, res: express.Response): Promise<void> => {
  const { name, answers } = req.body;

  if (!name) {
    res.status(400).json({ error: "Name is parameter requirement" });
    return;
  }

  // Fallback data generator in case Gemini is unavailable
  const runFallback = () => {
    const envVal = answers?.environment || "woody";
    const textVal = answers?.texture || "linen";
    const presVal = answers?.presence || "intimate";

    let scentName = "SANTAL 31";
    let archetype = "조용한 연금술사";
    let story = "고요하게 숨쉬는 우디 향이 존재감을 부드럽게 드러냅니다. 오래된 레드우드와 따뜻한 린넨, 친밀한 잔향이 어우러집니다.";
    let topNotes = ["Cardamom", "Bergamot"];
    let heartNotes = ["Smoky Cedarwood", "Iris Petals"];
    let baseNotes = ["Warm Amber", "Ambroxan", "Papyrus"];
    let advice = "따뜻한 맥박 부위에 발라주세요. 피부 화학과 어우러져 나만의 우디한 잔향이 차분히 완성됩니다.";

    if (envVal === "citrus") {
      scentName = "BERGAMOTE 18";
      archetype = "해안의 유목민";
      story = "짭짤한 해안 절벽과 따뜻한 앰버 빛 모래, 햇살에 압착된 오렌지 껍질의 생동감이 감도는 시트러스 향기입니다.";
      topNotes = ["Calabrian Bergamot", "Bitter Grapefruit"];
      heartNotes = ["Petitgrain", "Jasmine Accord"];
      baseNotes = ["Salty Vetiver", "Clean White Musk"];
      advice = "아침 샤워 후 넉넉히 발라주세요. 맑고 상쾌한 지적인 에너지가 부드럽게 퍼집니다.";
    } else if (envVal === "matcha") {
      scentName = "MATCHA 22";
      archetype = "고요한 명상가";
      story = "비에 젖은 유리온실 안의 안개 낀 아침처럼, 우유빛 녹차의 위로와 온화한 침묵을 전합니다.";
      topNotes = ["Matcha Powder", "Bitter Orange"];
      heartNotes = ["Fleshy Sweet Fig", "Steaming Water Accord"];
      baseNotes = ["Rich Vetiver", "Sandalwood", "Cedarwood"];
      advice = "목 뒷부분에 발라주세요. 가까이 머무르는 부드러운 고요가 오래 남습니다.";
    } else if (envVal === "smoky") {
      scentName = "NOIR 27";
      archetype = "벨벳 그림자";
      story = "한밤의 담배잎과 오래된 도서관 가죽, 검은 차의 김이 어우러진 깊고 매혹적인 향입니다. 강렬함과 부드러움이 공존합니다.";
      topNotes = ["Bergamot", "Black Tea Extract"];
      heartNotes = ["Suede Leather", "Dry Fig", "Bay Leaves"];
      baseNotes = ["Damp Vetiver", "Cedarwood", "Dark Sweet Musk"];
      advice = "해질녘에 쇄골 부위에 발라주세요. 10시간 이상 풍부하고 복합적인 잔향이 완성됩니다.";
    }

    return { scentName, archetype, story, topNotes, heartNotes, baseNotes, advice };
  };

  if (!ai) {
    const responseData = runFallback();
    res.json({ ...responseData, source: "fallback-engine" });
    return;
  }

  try {
    const systemPrompt = `You are a sensory analyst and master perfumer for ESSENCE LAB.
Analyze the user's name (${name}) and their lifestyle answers of environment, texture, presence and purpose.
Generate a highly personalized, poetic, and premium fragrance formulation that fits their soul.
The response must follow the strict JSON schema provided.
Keep the 'scentName' in the format 'WORDS [NUMBER]' where [NUMBER] matches their name code or is an evocative prime number like 33, 26, 29, 13, 22, 31, 42. e.g., 'SANTAL 42', 'SILT 17', 'CEDRELLE 26', 'AURA 13'.
Keep the 'story' to 2 beautiful, evocative sentences.
All fields must be in Korean, but the 'scentName', 'topNotes', 'heartNotes', and 'baseNotes' should be provided with original English names inside parenthesis (e.g., "샌달우드 (Sandalwood)").`;

    const userPrompt = `Name: ${name}
Scent Answers:
- Preferred Scent Environment: ${answers?.environment || "Wood cabin amidst towering giant redwoods"}
- Texture Comfort: ${answers?.texture || "Raw hand-woven linens"}
- Presence / Skin Aura: ${answers?.presence || "Intimate secret signature"}
- Primary Purpose: ${answers?.purpose || "Intellectual focus and calm contemplation"}`;

    const geminiRes = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["scentName", "archetype", "story", "topNotes", "heartNotes", "baseNotes", "advice"],
          properties: {
            scentName: {
              type: Type.STRING,
              description: "The name of the custom fragrance, like 'SANDAL 42' or 'MATCHA 19'"
            },
            archetype: {
              type: Type.STRING,
              description: "The artistic archetype of the scent owner, e.g. '고요한 아키텍트' or '새벽의 서기'"
            },
            story: {
              type: Type.STRING,
              description: "Poetic 2-sentence story of the scent in Korean"
            },
            topNotes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 top notes with English in parenthesis"
            },
            heartNotes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 heart notes with English in parenthesis"
            },
            baseNotes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 base notes with English in parenthesis"
            },
            advice: {
              type: Type.STRING,
              description: "Wearing advice styled poetically in Korean"
            }
          }
        }
      }
    });

    const textResult = geminiRes.text;
    if (textResult) {
      const parsed = JSON.parse(textResult.trim());
      res.json({ ...parsed, source: "gemini-api" });
    } else {
      throw new Error("No text returned from Gemini");
    }

  } catch (error) {
    console.error("Gemini formulation failure:", error);
    const fallback = runFallback();
    res.json({ ...fallback, source: "fallback-engine-safety" });
  }
});


// Dev vs production setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ESSENCE LAB dev server running at http://localhost:${PORT}`);
  });
}

startServer();
