import { motion } from "motion/react";

const speckledPaper = new URL("../assets/images/speckled_paper_1780458430027.png", import.meta.url).href;
const discoveryImage = new URL("../assets/images/regenerated_image_1780295933719.webp", import.meta.url).href;

interface DiscoveryBoxProps {
  onOpenQuiz: () => void;
  onOpenMixer: () => void;
}

export default function DiscoveryBox({ onOpenQuiz, onOpenMixer }: DiscoveryBoxProps) {
  return (
    <section
      id="discovery"
      className="py-2"
      style={{
        backgroundImage: `url(${speckledPaper})`,
        backgroundSize: "500px",
        backgroundRepeat: "repeat",
        backgroundColor: "#fbf9f9"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Immersive discovery banner matching the visual reference */}
        <div id="discovery-collection-banner" className="relative h-[450px] min-h-[350px] w-full overflow-hidden border border-[#dbdad9] flex items-center justify-center p-8 md:p-16">
          {/* Wooden workbench with discovery elements */}
          <div className="absolute inset-0 z-0">
            <img
              src={discoveryImage}
              alt="Artisanal glass dropper and bottles on work bench"
              className="w-full h-full object-cover filter contrast-105 brightness-90"
            />
            {/* Dark glass backdrop filter to raise text contrast */}
            <div className="absolute inset-0 bg-[#1b1c1c]/45 backdrop-brightness-75" />
          </div>

          {/* Overlaid Content styled exactly like screen reference */}
          <div className="relative z-10 text-center max-w-xl text-white flex flex-col items-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#dbdad9] mb-4 block">
              SIGNATURE COMPENDIUM
            </span>
            <h2 className="text-3xl md:text-5xl font-sans tracking-wide text-white font-medium mb-5">
              Discovery Collection
            </h2>
            <p className="text-sm text-[#efeded] leading-relaxed mb-8 max-w-md font-light">
              여섯 가지 시그니처 향기를 경험하며, 당신만의 완벽한 향을 찾아가는 여정.
            </p>
            <button
              id="btn-discover-more-quiz"
              onClick={onOpenQuiz}
              className="border border-white hover:bg-white hover:text-black transition-all duration-300 text-xs uppercase tracking-widest font-mono font-bold px-8 py-4 bg-transparent cursor-pointer"
            >
              자세히 보기
            </button>
          </div>
        </div>

        {/* Minimalist lower callout block matching the beige element in the reference */}
        <div
          id="identity-aesthetic-banner"
          className="mt-16 bg-[#efeded]/70 border border-[#dbdad9] py-16 px-8 flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-sans font-light tracking-wide text-[#1b1c1c] mb-6">
            More than a fragrance, a personal identity.
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              id="btn-goto-mixer"
              onClick={onOpenMixer}
              className="bg-black text-white hover:bg-neutral-800 transition-colors text-xs uppercase tracking-widest font-mono px-8 py-3.5 cursor-pointer font-bold"
            >
              Analyze Scent Profile (AI Labs)
            </button>
            <button
              id="btn-quiz-direct"
              onClick={onOpenQuiz}
              className="border border-[#1b1c1c]/30 text-[#1b1c1c] hover:bg-black hover:text-white hover:border-black transition-all text-xs uppercase tracking-widest font-mono px-8 py-3.5 cursor-pointer"
            >
              맞춤 보틀 제작
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
