import { ScentProduct, ScentQuizQuestion } from "./types";

const santalImage = new URL("./assets/images/regenerated_image_1780295930617.jpg", import.meta.url).href;
const matchaImage = new URL("./assets/images/regenerated_image_1780295931994.jpg", import.meta.url).href;
const noirImage = new URL("./assets/images/regenerated_image_1780295932621.jpg", import.meta.url).href;
const anotherImage = new URL("./assets/images/regenerated_image_1780296385016.jpg", import.meta.url).href;
const roseImage = new URL("./assets/images/regenerated_image_1780296386004.jpg", import.meta.url).href;
const bergamoteImage = new URL("./assets/images/regenerated_image_1780296387085.jpg", import.meta.url).href;

export const SCENT_PRODUCTS: ScentProduct[] = [
  {
    id: "santal-33",
    name: "SANTAL 33",
    subtitle: "Cardamom, Iris, Violet, Ambrox",
    price: 440000,
    description: "A signature fragrance of the American West. An open fire, the soft drift of smoke, where sensuality rises after the light has gone. It's a perfume that touches the vast and wild freedom of this country, with a rich layer of smoky woods, spices, and leathery undertones.",
    image: santalImage,
    mainNotes: ["Sandalwood", "Cedarwood", "Cardamom", "Violet", "Papyrus", "Leather"],
    character: "Woody, Smoky, Leathery",
    strength: "Eau de Parfum (Concentrated)",
    details: "Hand-blended freshly in our laboratories. Formula remains stable for up to 36 months when stored away from direct sunlight.",
    batchNumber: "BATCH #SZ-2026.06"
  },
  {
    id: "the-matcha-26",
    name: "THÉ MATCHA 26",
    subtitle: "Matcha tea, Fig, Vetiver, Cedar woods",
    price: 440000,
    description: "Much more than a scent, Thé Matcha is an introverted fragrance. It is a moment of self, of quiet contemplation, offering a noble silence that is both warm and refreshing. A delicate accord of matcha green tea enriched by a soft, milky fig note, grounded by vetiver and structural cedar woods.",
    image: matchaImage,
    mainNotes: ["Matcha Accord", "Fig Note", "Bitter Orange", "Vetiver", "Cedarwood"],
    character: "Green, Woody, Tea-infused",
    strength: "Eau de Parfum (Clean / Intimate)",
    details: "Specially mixed directly at the extraction counter using high-pressure cold maceration. Formulated with 18% essential oil compounds.",
    batchNumber: "BATCH #MT-2026.06"
  },
  {
    id: "the-noir-29",
    name: "THÉ NOIR 29",
    subtitle: "Bergamot, Fig, Bay leaves, Cedar wood",
    price: 440000,
    description: "An ode to the noble leaf of black tea and the craft that surrounds it. Thé Noir 29 combines depth and freshness, softness and strength through the permanent contrast between the light of bergamot, fig, and bay leaves and the depth of cedarwood, vetiver, and musk.",
    image: noirImage,
    mainNotes: ["Black Tea Extract", "Bergamot", "Fig", "Bay Leaves", "Cedarwood", "Vetiver", "Musk"],
    character: "Rich, Sensual, Fresh-Deep",
    strength: "Eau de Parfum (Multi-layered)",
    details: "Matured for 6 months in oak barrels prior to cold filtration. Extremely long-lasting skin sillage with dry down of deep pipe tobacco.",
    batchNumber: "BATCH #TN-2026.06"
  },
  {
    id: "another-13",
    name: "ANOTHER 13",
    subtitle: "Ambrette, Jasmine, Moss, Musk",
    price: 440000,
    description: "An hypnotic and unique scent of ambergris, designed in collaboration with AnOther Magazine. Composed of ambroxan, a synthetic animal musk, making it an addictive dirty-fresh potion that blends seamlessly with your personal body heat, creating a mesmerizing second-skin aura.",
    image: anotherImage,
    mainNotes: ["Ambroxan", "Ambrette Seeds", "Jasmine Petals", "Green Moss", "Musk"],
    character: "Animalic, Musky, Second-skin",
    strength: "Eau de Parfum (Hypnotic)",
    details: "Commissioned as an exclusive laboratory batch. Designed to develop differently on every individual's skin pH level.",
    batchNumber: "BATCH #AN-2026.06"
  },
  {
    id: "rose-31",
    name: "ROSE 31",
    subtitle: "Rose, Cumin, Vetiver, Cedar",
    price: 440000,
    description: "Designed with the aim of transforming the famous Grasse rose, a symbol of absolute femininity, into an assertively virile and unisex scent. The result is a model of duality: vibrant rose centifolia is rapidly backed by a chorus of warm, spicy, and woodsy notes like cumin, olibanum, cedar, and amber.",
    image: roseImage,
    mainNotes: ["Centifolia Rose", "Cumin Wood", "Vetiver", "Cedarwood", "Ambergris", "Olibanum"],
    character: "Floral, Warm Spicy, Woody",
    strength: "Eau de Parfum (Androgynous)",
    details: "Hand-blended with absolute rose oil sourced sustainably from high-altitude valleys in Grasse, France.",
    batchNumber: "BATCH #RO-2026.06"
  },
  {
    id: "bergamote-22",
    name: "BERGAMOTE 22",
    subtitle: "Bergamot, Grapefruit, Amber, Musk",
    price: 440000,
    description: "This dazzling perfume combines freshness, sweetness, and complexity with acrobatic talent. Bergamot is surrounded by delicate floral notes, sweet vanilla elements, amber warmth, and the sheer power of vetiver and musk, delivering an astonishing citrus vitality.",
    image: bergamoteImage,
    mainNotes: ["Bergamot", "Grapefruit", "Petitgrain", "Amber", "Musk", "Vetiver"],
    character: "Citrus, Fresh, Sparkling-Warm",
    strength: "Eau de Parfum (Energetic)",
    details: "Formulated with hand-pressed Calabrian Bergamot essential oils, cold-extracted during the winter winter harvest.",
    batchNumber: "BATCH #BE-2026.06"
  }
];

export const QUIZ_QUESTIONS: ScentQuizQuestion[] = [
  {
    id: "environment",
    question: "어디에서 완전한 고요와 존재감을 느끼시나요?",
    options: [
      { label: "우드 캐빈", value: "woody", description: "우뚝 솟은 소나무 숲속, 장작불로 데운 외딴 삼나무 오두막." },
      { label: "해안의 숲", value: "citrus", description: "짭짤한 바다 절벽을 내려다보는, 햇살 가득한 야생 오렌지와 베르가못 나무." },
      { label: "고요한 온실", value: "matcha", description: "비 온 뒤 잊힌 유리온실, 축축한 이끼와 흙, 김 오르는 차 향이 가득한 곳." },
      { label: "한밤의 라운지", value: "smoky", description: "가죽 안락의자와 연기, 오래된 책이 있는 어슴푸레한 서재나 라운지." }
    ]
  },
  {
    id: "texture",
    question: "어떤 질감의 소재가 당신의 감각에 편안한가요?",
    options: [
      { label: "생 린넨", value: "linen", description: "거칠고 통기성 좋은 수직 린넨. 정갈하고 날것 그대로의 순수함." },
      { label: "길든 스웨이드", value: "suede", description: "개인의 시간이 밴, 부드럽고 묵직한 빈티지 가죽의 잔잔한 온기." },
      { label: "서린 유리", value: "glass", description: "물방울이 맺힌 차갑고 정밀한 실험실 바이알의 또렷한 선명함." },
      { label: "젖은 이끼", value: "moss", description: "유기적인 깊이와 살아있는 시간을 머금은, 폭신하고 축축한 숲속 이끼." }
    ]
  },
  {
    id: "presence",
    question: "당신의 향이 타인에게 어떻게 말 걸기를 바라나요?",
    options: [
      { label: "은밀한 비밀", value: "intimate", description: "허락한 이들만 아주 가까이서 발견하는 은은한 피부의 향." },
      { label: "수수께끼 같은 잔향", value: "mysterious", description: "지나간 자리에 흥미로운 흔적을 남기는, 복합적이고 변화하는 아우라." },
      { label: "맑은 선명함", value: "vibrant", description: "산뜻하고 지적인 기운과 자연스러운 집중을 일깨우는 또렷한 빛줄기." },
      { label: "따뜻한 포옹", value: "magnetic", description: "깊고 수지 같은 우드와 앰버의 온기가 더없이 포근한 향." }
    ]
  },
  {
    id: "purpose",
    question: "이 조향의 가장 중요한 목적은 무엇인가요?",
    options: [
      { label: "지적인 안정", value: "grounding", description: "내면의 집중, 홀로 쓰는 글, 차분한 사색을 위해." },
      { label: "창의적 표현", value: "creative", description: "미니멀한 작업실에서 아이디어를 그려내는 감각의 불씨." },
      { label: "도시의 풍경", value: "urban", description: "콘크리트 격자와 빽빽한 이동 속에서 나를 지키는 강렬한 방패." },
      { label: "모임과 친밀함", value: "gathering", description: "촛불 켜진 아늑한 방에서 느릿한 대화를 나누기 위해." }
    ]
  }
];

// Pick the base scent product that best matches the quiz answers.
// Shared by the offline fallback and the AI branch so the cart image always
// matches the formulation regardless of which engine produced it.
export function selectBaseScent(answers: { [key: string]: string }): ScentProduct {
  const envVal = answers["environment"] || "woody";
  const texVal = answers["texture"] || "linen";
  const presVal = answers["presence"] || "intimate";

  if (envVal === "matcha" || texVal === "glass") return SCENT_PRODUCTS[1]; // THE MATCHA
  if (envVal === "citrus") return SCENT_PRODUCTS[5]; // BERGAMOTE 22
  if (envVal === "smoky" || presVal === "mysterious") return SCENT_PRODUCTS[2]; // THE NOIR
  if (texVal === "moss") return SCENT_PRODUCTS[3]; // ANOTHER 13
  if (presVal === "magnetic") return SCENT_PRODUCTS[4]; // ROSE 31
  return SCENT_PRODUCTS[0]; // SANTAL 33 default
}

// Custom formula generator logic
export function generateScentFormula(answers: { [key: string]: string }, userName: string) {
  const envVal = answers["environment"] || "woody";

  // Decide target base scent
  const baseScent = selectBaseScent(answers);

  // Calculate high-precision ratios
  const rand1 = Math.floor(15 + (userName.charCodeAt(0) || 10) % 15);
  const rand2 = Math.floor(10 + (userName.charCodeAt(userName.length - 1) || 5) % 12);
  const rand3 = 100 - (rand1 + rand2 + 45); // total 100

  const concentrationPct = envVal === "citrus" ? 18.2 : 23.4;
  
  const labelDate = new Date().toISOString().split('T')[0].replace(/-/g, '/');
  
  // Custom lab label representation
  return {
    formulaId: `${userName.slice(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 89)}`,
    baseScent: baseScent.name,
    baseScentId: baseScent.id,
    image: baseScent.image,
    concentration: `${concentrationPct}% (오 드 파르팜)`,
    ingredients: [
      { name: baseScent.mainNotes[0], percentage: `${rand1}%` },
      { name: baseScent.mainNotes[1] || "천연 앰브록산", percentage: `${rand2}%` },
      { name: baseScent.mainNotes[2] || "유기 세드롤", percentage: `${rand3}%` },
      { name: "천연 향료 안정화 에멀전 (BASE-9)", percentage: "45%" }
    ],
    wearAdvice: `목 밑, 손목, 귀 뒤 등 맥박이 뛰는 부위에 소량 스프레이해주세요. 이 수제 향료는 당신의 피부 화학과 반응하여 ${baseScent.character.toLowerCase()} 노트의 깊이 있는 변화를 6시간 이상 선사합니다.`,
    labelName: userName.toUpperCase(),
    dateCreated: labelDate,
    location: "뉴욕 소호 연구소",
    notes: `${baseScent.character}`
  };
}
