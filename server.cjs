var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var apiKey = process.env.GEMINI_API_KEY;
var ai = null;
if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
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
app.post("/api/formulate", async (req, res) => {
  const { name, answers } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name is parameter requirement" });
    return;
  }
  const runFallback = () => {
    const envVal = answers?.environment || "woody";
    const textVal = answers?.texture || "linen";
    const presVal = answers?.presence || "intimate";
    let scentName = "SANTAL 31";
    let archetype = "The Silent Alchemist";
    let story = "A quiet, slow-breathing woody fragrance representing absolute presence and structural solace. It carries notes of old redwoods, warm linen, and intimate embers.";
    let topNotes = ["Cardamom", "Bergamot"];
    let heartNotes = ["Smoky Cedarwood", "Iris Petals"];
    let baseNotes = ["Warm Amber", "Ambroxan", "Papyrus"];
    let advice = "Deploy to warm pulse points. This formula merges with your distinct skin chemistry to reveal a personalized, woody scent envelope.";
    if (envVal === "citrus") {
      scentName = "BERGAMOTE 18";
      archetype = "The Coastal Nomad";
      story = "A dazzling and sparkling citrus vitality that carries whispers of salted sea cliffs, warm amber sands, and fresh-pressed sunlit orange peel.";
      topNotes = ["Calabrian Bergamot", "Bitter Grapefruit"];
      heartNotes = ["Petitgrain", "Jasmine Accord"];
      baseNotes = ["Salty Vetiver", "Clean White Musk"];
      advice = "Apply liberally following a morning shower. Prompts a bright, refreshing cloud of intellectual energy.";
    } else if (envVal === "matcha") {
      scentName = "MATCHA 22";
      archetype = "The Quiet Meditator";
      story = "An introverted, milky green tea solace inspired by foggy mornings inside rain-dampened glasshouses. It encourages moments of absolute presence.";
      topNotes = ["Matcha Powder", "Bitter Orange"];
      heartNotes = ["Fleshy Sweet Fig", "Steaming Water Accord"];
      baseNotes = ["Rich Vetiver", "Sandalwood", "Cedarwood"];
      advice = "Apply to the base of the neck. Offers a noble, soft silence that rests close to you.";
    } else if (envVal === "smoky") {
      scentName = "NOIR 27";
      archetype = "The Velvet Shadow";
      story = "A deep, hypnotic tribute to midnight tobacco leaves, old library leather, and black tea steam. It bridges raw power with exceptional softness.";
      topNotes = ["Bergamot", "Black Tea Extract"];
      heartNotes = ["Suede Leather", "Dry Fig", "Bay Leaves"];
      baseNotes = ["Damp Vetiver", "Cedarwood", "Dark Sweet Musk"];
      advice = "Apply directly to collarbones before nightfall. Develops rich, complex sillage over 10 hours.";
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
All fields must be in Korean, but the 'scentName', 'topNotes', 'heartNotes', and 'baseNotes' should be provided with original English names inside parenthesis (e.g., "\uC0CC\uB2EC\uC6B0\uB4DC (Sandalwood)").`;
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
          type: import_genai.Type.OBJECT,
          required: ["scentName", "archetype", "story", "topNotes", "heartNotes", "baseNotes", "advice"],
          properties: {
            scentName: {
              type: import_genai.Type.STRING,
              description: "The name of the custom fragrance, like 'SANDAL 42' or 'MATCHA 19'"
            },
            archetype: {
              type: import_genai.Type.STRING,
              description: "The artistic archetype of the scent owner, e.g. '\uACE0\uC694\uD55C \uC544\uD0A4\uD14D\uD2B8' or '\uC0C8\uBCBD\uC758 \uC11C\uAE30'"
            },
            story: {
              type: import_genai.Type.STRING,
              description: "Poetic 2-sentence story of the scent in Korean"
            },
            topNotes: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "2 top notes with English in parenthesis"
            },
            heartNotes: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "2 heart notes with English in parenthesis"
            },
            baseNotes: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "2 base notes with English in parenthesis"
            },
            advice: {
              type: import_genai.Type.STRING,
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
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ESSENCE LAB dev server running at http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
