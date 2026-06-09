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
    let archetype = "\uC870\uC6A9\uD55C \uC5F0\uAE08\uC220\uC0AC";
    let story = "\uACE0\uC694\uD558\uAC8C \uC228\uC26C\uB294 \uC6B0\uB514 \uD5A5\uC774 \uC874\uC7AC\uAC10\uC744 \uBD80\uB4DC\uB7FD\uAC8C \uB4DC\uB7EC\uB0C5\uB2C8\uB2E4. \uC624\uB798\uB41C \uB808\uB4DC\uC6B0\uB4DC\uC640 \uB530\uB73B\uD55C \uB9B0\uB128, \uCE5C\uBC00\uD55C \uC794\uD5A5\uC774 \uC5B4\uC6B0\uB7EC\uC9D1\uB2C8\uB2E4.";
    let topNotes = ["Cardamom", "Bergamot"];
    let heartNotes = ["Smoky Cedarwood", "Iris Petals"];
    let baseNotes = ["Warm Amber", "Ambroxan", "Papyrus"];
    let advice = "\uB530\uB73B\uD55C \uB9E5\uBC15 \uBD80\uC704\uC5D0 \uBC1C\uB77C\uC8FC\uC138\uC694. \uD53C\uBD80 \uD654\uD559\uACFC \uC5B4\uC6B0\uB7EC\uC838 \uB098\uB9CC\uC758 \uC6B0\uB514\uD55C \uC794\uD5A5\uC774 \uCC28\uBD84\uD788 \uC644\uC131\uB429\uB2C8\uB2E4.";
    if (envVal === "citrus") {
      scentName = "BERGAMOTE 18";
      archetype = "\uD574\uC548\uC758 \uC720\uBAA9\uBBFC";
      story = "\uC9ED\uC9E4\uD55C \uD574\uC548 \uC808\uBCBD\uACFC \uB530\uB73B\uD55C \uC570\uBC84 \uBE5B \uBAA8\uB798, \uD587\uC0B4\uC5D0 \uC555\uCC29\uB41C \uC624\uB80C\uC9C0 \uAECD\uC9C8\uC758 \uC0DD\uB3D9\uAC10\uC774 \uAC10\uB3C4\uB294 \uC2DC\uD2B8\uB7EC\uC2A4 \uD5A5\uAE30\uC785\uB2C8\uB2E4.";
      topNotes = ["Calabrian Bergamot", "Bitter Grapefruit"];
      heartNotes = ["Petitgrain", "Jasmine Accord"];
      baseNotes = ["Salty Vetiver", "Clean White Musk"];
      advice = "\uC544\uCE68 \uC0E4\uC6CC \uD6C4 \uB109\uB109\uD788 \uBC1C\uB77C\uC8FC\uC138\uC694. \uB9D1\uACE0 \uC0C1\uCF8C\uD55C \uC9C0\uC801\uC778 \uC5D0\uB108\uC9C0\uAC00 \uBD80\uB4DC\uB7FD\uAC8C \uD37C\uC9D1\uB2C8\uB2E4.";
    } else if (envVal === "matcha") {
      scentName = "MATCHA 22";
      archetype = "\uACE0\uC694\uD55C \uBA85\uC0C1\uAC00";
      story = "\uBE44\uC5D0 \uC816\uC740 \uC720\uB9AC\uC628\uC2E4 \uC548\uC758 \uC548\uAC1C \uB080 \uC544\uCE68\uCC98\uB7FC, \uC6B0\uC720\uBE5B \uB179\uCC28\uC758 \uC704\uB85C\uC640 \uC628\uD654\uD55C \uCE68\uBB35\uC744 \uC804\uD569\uB2C8\uB2E4.";
      topNotes = ["Matcha Powder", "Bitter Orange"];
      heartNotes = ["Fleshy Sweet Fig", "Steaming Water Accord"];
      baseNotes = ["Rich Vetiver", "Sandalwood", "Cedarwood"];
      advice = "\uBAA9 \uB4B7\uBD80\uBD84\uC5D0 \uBC1C\uB77C\uC8FC\uC138\uC694. \uAC00\uAE4C\uC774 \uBA38\uBB34\uB974\uB294 \uBD80\uB4DC\uB7EC\uC6B4 \uACE0\uC694\uAC00 \uC624\uB798 \uB0A8\uC2B5\uB2C8\uB2E4.";
    } else if (envVal === "smoky") {
      scentName = "NOIR 27";
      archetype = "\uBCA8\uBCB3 \uADF8\uB9BC\uC790";
      story = "\uD55C\uBC24\uC758 \uB2F4\uBC30\uC78E\uACFC \uC624\uB798\uB41C \uB3C4\uC11C\uAD00 \uAC00\uC8FD, \uAC80\uC740 \uCC28\uC758 \uAE40\uC774 \uC5B4\uC6B0\uB7EC\uC9C4 \uAE4A\uACE0 \uB9E4\uD639\uC801\uC778 \uD5A5\uC785\uB2C8\uB2E4. \uAC15\uB82C\uD568\uACFC \uBD80\uB4DC\uB7EC\uC6C0\uC774 \uACF5\uC874\uD569\uB2C8\uB2E4.";
      topNotes = ["Bergamot", "Black Tea Extract"];
      heartNotes = ["Suede Leather", "Dry Fig", "Bay Leaves"];
      baseNotes = ["Damp Vetiver", "Cedarwood", "Dark Sweet Musk"];
      advice = "\uD574\uC9C8\uB158\uC5D0 \uC1C4\uACE8 \uBD80\uC704\uC5D0 \uBC1C\uB77C\uC8FC\uC138\uC694. 10\uC2DC\uAC04 \uC774\uC0C1 \uD48D\uBD80\uD558\uACE0 \uBCF5\uD569\uC801\uC778 \uC794\uD5A5\uC774 \uC644\uC131\uB429\uB2C8\uB2E4.";
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
