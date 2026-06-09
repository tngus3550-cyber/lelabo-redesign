import { motion } from "motion/react";

const heroImage = new URL("../assets/images/perfumer_lab_hero_1780294612666.png", import.meta.url).href;
const heroVideo = new URL("../assets/images/hero-video.mp4", import.meta.url).href;

interface HeroProps {
  onExploreClick: () => void;
  onViewCollectionClick: () => void;
}

export default function Hero({ onExploreClick, onViewCollectionClick }: HeroProps) {
  return (
    <section id="hero" className="relative w-full h-[100vh] min-h-[600px] overflow-hidden bg-[#1b1c1c] text-white flex items-end pb-16 md:pb-24">
      {/* Immersive Lab Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Hero Video Background */}
        <motion.video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          initial={{ scale: 1.05, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="w-full h-full object-cover filter contrast-115 brightness-95"
        />
        {/* Fallback Image for browsers that don't support video */}
        <motion.img
          src={heroImage}
          alt="Artisanal Fragrance Laboratory Formulation background"
          initial={{ scale: 1.05, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 0.55 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover filter contrast-115 brightness-95"
        />
        {/* Soft shadow gradients to elevate technical text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-between h-full pt-28">
        {/* Technical Top-Left Branding Block */}
        <motion.div
          id="hero-branding-stamp"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col items-start"
        >
          <span className="text-2xl md:text-3xl font-bold tracking-[0.25em] text-[#efeded]">
            LE LABO<span className="text-[12px] align-super font-normal select-none">TM</span>
          </span>
          <span className="text-[10px] md:text-sm font-mono tracking-[0.45em] text-[#dbdad9] mt-2 block uppercase">
            Grasse — New York
          </span>
        </motion.div>

        {/* Big Bottom Headlines & Navigation Actions */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-auto">
          <motion.div
            id="hero-caption-texts"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-white">
              Crafted slowly,<br />remembered deeply
            </h1>
            <p className="mt-5 text-sm md:text-base text-[#dbdad9] font-sans font-light leading-relaxed max-w-[500px]">
              시간과 정성을 담아 완성되는 고유한 향기.<br />
              당신만의 아이덴티티를 발견하세요.
            </p>
          </motion.div>

          <motion.div
            id="hero-action-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 shrink-0 font-sans"
          >
            <button
              id="btn-explore-identity"
              onClick={onExploreClick}
              className="bg-white text-black hover:bg-black hover:text-white hover:border-white border border-transparent transition-all duration-300 text-xs uppercase tracking-widest font-semibold px-8 py-4 cursor-pointer text-center"
            >
              Explore the Identity
            </button>
            <button
              id="btn-view-collection-hero"
              onClick={onViewCollectionClick}
              className="border border-white/60 hover:bg-white hover:text-black transition-all duration-300 text-xs uppercase tracking-widest font-semibold px-8 py-4 backdrop-blur-[2px] cursor-pointer text-center"
            >
              View Collection
            </button>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Down Connecting Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
        />
      </div>
    </section>
  );
}
