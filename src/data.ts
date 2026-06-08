import { ScentProduct, ScentQuizQuestion } from "./types";

export const SCENT_PRODUCTS: ScentProduct[] = [
  {
    id: "santal-33",
    name: "SANTAL 33",
    subtitle: "Cardamom, Iris, Violet, Ambrox",
    price: 440000,
    description: "A signature fragrance of the American West. An open fire, the soft drift of smoke, where sensuality rises after the light has gone. It's a perfume that touches the vast and wild freedom of this country, with a rich layer of smoky woods, spices, and leathery undertones.",
    image: "./assets/images/regenerated_image_1780295930617.jpg",
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
    image: "./assets/images/regenerated_image_1780295931994.jpg",
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
    image: "./assets/images/regenerated_image_1780295932621.jpg",
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
    image: "./assets/images/regenerated_image_1780296385016.jpg",
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
    image: "./assets/images/regenerated_image_1780296386004.jpg",
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
    image: "./assets/images/regenerated_image_1780296387085.jpg",
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
    question: "Where do you find absolute quiet and presence?",
    options: [
      { label: "Wood Cabin", value: "woody", description: "A remote cedar cabin heated by a woodfire amidst towering pines." },
      { label: "Coastal Grove", value: "citrus", description: "Sun-drenched wild orange and bergamot trees overlooking a salty sea cliff." },
      { label: "Quiet Greenhouse", value: "matcha", description: "A forgotten glasshouse after rain, rich with damp moss, soil, and steaming tea." },
      { label: "Midnight Lounge", value: "smoky", description: "A dimly lit library or lounge with leather armchairs, smoke, and old books." }
    ]
  },
  {
    id: "texture",
    question: "Which textured material fits your sensory comfort?",
    options: [
      { label: "Raw Linen", value: "linen", description: "Course, breathable hand-woven linen that feels crisp, raw, and pure." },
      { label: "Worn Suede", value: "suede", description: "Soft, heavy vintage leather that retains personal history and quiet warmth." },
      { label: "Misted Glass", value: "glass", description: "Cool, precise laboratory vials carrying condensation and sharp clarity." },
      { label: "Damp Moss", value: "moss", description: "Spongy, wet forest moss filled with organic depth and living history." }
    ]
  },
  {
    id: "presence",
    question: "How do you want your fragrance to speak to others?",
    options: [
      { label: "A Private Secret", value: "intimate", description: "A subtle skin-scent only discovered by those you permit to draw very close." },
      { label: "An Enigmatic Trail", value: "mysterious", description: "A complex, shifting aura that leaves an intriguing trail as you walk by." },
      { label: "Clean Clarity", value: "vibrant", description: "A sharp, uplifting beam of fresh intellectual force and natural focus." },
      { label: "A Warm Embrace", value: "magnetic", description: "A deep, resinous wood-and-amber glow that feels extremely comforting." }
    ]
  },
  {
    id: "purpose",
    question: "What is the primary intention of this formulation?",
    options: [
      { label: "Intellectual Grounding", value: "grounding", description: "For internal focus, solitary writing, or calm critical thinking." },
      { label: "Creative Expression", value: "creative", description: "A spark of sensory texture to outline ideas in a minimalist studio." },
      { label: "Metropolitan Sights", value: "urban", description: "A protective, high-contrast shield against concrete grids and dense transit." },
      { label: "Gathering and Intimacy", value: "gathering", description: "To share in slow conversations in cozy candlelit rooms." }
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
