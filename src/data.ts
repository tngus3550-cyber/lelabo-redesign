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
    question: "어디에서 가장 고요함과 존재감을 느끼나요?",
    options: [
      { label: "나무 오두막", value: "woody", description: "거대한 소나무 숲 속에서 장작난로로 데워진 삼나무 오두막." },
      { label: "해안 숲", value: "citrus", description: "짭짤한 바다 절벽을 바라보는 햇빛 가득 오렌지와 베르가못 나무." },
      { label: "고요한 온실", value: "matcha", description: "비 온 뒤의 유리온실, 촉촉한 이끼와 흙, 김이 나는 차의 향." },
      { label: "한밤의 라운지", value: "smoky", description: "가죽 안락의자, 연기, 오래된 책이 어우러진 은은한 공간." }
    ]
  },
  {
    id: "texture",
    question: "어떤 질감이 감각적 안락함과 가장 잘 맞나요?",
    options: [
      { label: "린넨", value: "linen", description: "거칠고 통기성 좋은 손으로 짠 린넨, 상쾌하고 순수한 느낌." },
      { label: "스웨이드", value: "suede", description: "부드럽고 묵직한 빈티지 가죽, 개인적인 역사와 따뜻함을 품은." },
      { label: "물방울 맺힌 유리", value: "glass", description: "차가운 연구용 유리병, 응결된 물방울과 선명한 클리어함." },
      { label: "촉촉한 이끼", value: "moss", description: "생기있는 깊이와 자연의 역사를 담은 푹신한 숲속 이끼." }
    ]
  },
  {
    id: "presence",
    question: "당신의 향기는 타인에게 어떻게 전달되길 하나요?",
    options: [
      { label: "나만의 비밀", value: "intimate", description: "가까운 사람만 발견할 수 있는 은은한 스킨 센트." },
      { label: "신비한 잔향", value: "mysterious", description: "걸을 때마다 흥미로운 흔적을 남기는 복합적인 오라." },
      { label: "깨끗한 선명함", value: "vibrant", description: "신선하고 지적인 힘이 느껴지는 또렷한 빔." },
      { label: "따뜻한 포옹", value: "magnetic", description: "깊고 수지 같은 우드 앰버의 포근함." }
    ]
  },
  {
    id: "purpose",
    question: "이 조합의 주된 목적은 무엇인가요?",
    options: [
      { label: "지적 집중", value: "grounding", description: "내면의 집중, 고요한 글쓰기, 차분한 사유를 위한." },
      { label: "감각적 표현", value: "creative", description: "미니멀 스튜디오에서 아이디어를 그릴 감각적 스파크." },
      { label: "도시 감각", value: "urban", description: "콘크리트와 빽빽한 이동 환경을 지나도 보호해주는 듯한." },
      { label: "모임과 친밀감", value: "gathering", description: "캔들빛 방에서 천천히 대화를 나누며 함께하는 시간." }
    ]
  }
];

// Custom formula generator logic
export function generateScentFormula(answers: { [key: string]: string }, userName: string) {
  const envVal = answers["environment"] || "woody";
  const texVal = answers["texture"] || "linen";
  const presVal = answers["presence"] || "intimate";
  
  // Decide target base scent
  let baseScent = SCENT_PRODUCTS[0]; // SANTAL 33 default
  if (envVal === "matcha" || texVal === "glass") {
    baseScent = SCENT_PRODUCTS[1]; // THE MATCHA
  } else if (envVal === "citrus") {
    baseScent = SCENT_PRODUCTS[5]; // BERGAMOTE 22
  } else if (envVal === "smoky" || presVal === "mysterious") {
    baseScent = SCENT_PRODUCTS[2]; // THE NOIR
  } else if (texVal === "moss") {
    baseScent = SCENT_PRODUCTS[3]; // ANOTHER 13
  } else if (presVal === "magnetic") {
    baseScent = SCENT_PRODUCTS[4]; // ROSE 31
  }

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
    concentration: `${concentrationPct}% (EAU DE PARFUM)`,
    ingredients: [
      { name: baseScent.mainNotes[0], percentage: `${rand1}%` },
      { name: baseScent.mainNotes[1] || "Natural Ambroxan", percentage: `${rand2}%` },
      { name: baseScent.mainNotes[2] || "Organic Cedrol", percentage: `${rand3}%` },
      { name: "Scent-stabilizing Organic Emulsion (BASE-9)", percentage: "45%" }
    ],
    wearAdvice: `Apply sparingly to dynamic pulse points—the base of the throat, wrists, and behind the neck. This artisanal compound reacts uniquely with your skin chemistry, revealing its full structural depth of ${baseScent.character.toLowerCase()} notes over a detailed 6-hour dry down.`,
    labelName: userName.toUpperCase(),
    dateCreated: labelDate,
    location: "SOHO LAB, NEW YORK",
    notes: `${baseScent.character}`
  };
}
