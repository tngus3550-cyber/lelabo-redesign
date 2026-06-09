import { useState } from "react";
import { motion } from "motion/react";
import { X, Sliders, FlaskConical, Sparkles, ShoppingBag } from "lucide-react";

interface ScentMixerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomToCart: (item: {
    id: string;
    name: string;
    labelFor: string;
    labelDate: string;
    labelAt: string;
    price: number;
    image: string;
    isCustomFormulation: boolean;
  }) => void;
}

export default function ScentMixer({ isOpen, onClose, onAddCustomToCart }: ScentMixerProps) {
  if (!isOpen) return null;

  const [notes, setNotes] = useState({
    woody: 40,
    citrus: 20,
    herbal: 10,
    floral: 10,
    musky: 20
  });

  const [userName, setUserName] = useState("");
  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, "/");

  // Simple clamping: ensures value is always between 0 and 100
  const clampPercent = (value: number): number => {
    const num = Number(value);
    if (!Number.isFinite(num)) return 0;
    return Math.min(100, Math.max(0, Math.round(num)));
  };

  // Proportional distribution: adjust all other values to maintain 100% total
  const handleSliderChange = (changedKey: keyof typeof notes, newValue: number) => {
    const clampedValue = clampPercent(newValue);
    
    setNotes((prev) => {
      // If the new value equals the current value, no change needed
      if (prev[changedKey] === clampedValue) {
        return prev;
      }

      // Calculate the change amount
      const change = clampedValue - prev[changedKey];
      
      // Create a new state object
      const updated = { ...prev, [changedKey]: clampedValue };
      
      // Get all other keys
      const otherKeys = (Object.keys(updated) as Array<keyof typeof notes>).filter(k => k !== changedKey);
      
      // Calculate total of other values
      const otherTotal = otherKeys.reduce((sum, k) => sum + updated[k], 0);
      
      // If others sum to 0, distribute the remaining proportionally by default split
      if (otherTotal === 0) {
        const evenSplit = Math.floor((100 - clampedValue) / otherKeys.length);
        const remainder = (100 - clampedValue) % otherKeys.length;
        otherKeys.forEach((k, idx) => {
          updated[k] = evenSplit + (idx < remainder ? 1 : 0);
        });
      } else {
        // Distribute the change proportionally to others
        const ratio = (otherTotal - change) / otherTotal;
        otherKeys.forEach((k) => {
          const newOtherValue = Math.round(updated[k] * ratio);
          updated[k] = clampPercent(newOtherValue);
        });
      }

      // Ensure total is exactly 100%
      const total = Object.values(updated).reduce((sum, v) => sum + v, 0);
      const diff = 100 - total;
      
      if (diff !== 0) {
        // Find the value with the largest amount and adjust it
        let maxKey = changedKey;
        let maxValue = updated[changedKey];
        
        otherKeys.forEach((k) => {
          if (updated[k] > maxValue) {
            maxValue = updated[k];
            maxKey = k;
          }
        });
        
        updated[maxKey] = clampPercent(updated[maxKey] + diff);
      }

      // Final validation: clamp all values
      const final = {
        woody: clampPercent(updated.woody),
        citrus: clampPercent(updated.citrus),
        herbal: clampPercent(updated.herbal),
        floral: clampPercent(updated.floral),
        musky: clampPercent(updated.musky)
      };

      return final;
    });
  };

  // Determine dynamic scent profile based on proportions
  const getDynamicName = () => {
    const sorted = (Object.entries(notes) as [keyof typeof notes, number][]).sort((a, b) => b[1] - a[1]);
    const dominant = sorted[0][0];
    const secondary = sorted[1][0];

    const indexNumber = Math.min(99, Math.max(10, Math.floor(notes.woody + notes.citrus + notes.musky)));

    if (dominant === "woody") {
      if (secondary === "musky") return { name: `SANDALWOOD ${indexNumber}`, char: "Woody, Animalic, Warm" };
      if (secondary === "citrus") return { name: `CEDRE SPARKLING ${indexNumber}`, char: "Woody, Fresh-Citrus" };
      return { name: `SANTAL SMOKE ${indexNumber}`, char: "Smoky, Intense Woods" };
    }
    if (dominant === "citrus") {
      if (secondary === "herbal") return { name: `BERGAMOTE VERTE ${indexNumber}`, char: "Citrus, Crisp-Tea" };
      return { name: `CITRON FLEURIE ${indexNumber}`, char: "Bright Citrus, Delicate Floral" };
    }
    if (dominant === "musky") {
      return { name: `AMBRETTE SECOND-SKIN ${indexNumber}`, char: "Warm Musky, Hypnotic Aura" };
    }
    if (dominant === "floral") {
      return { name: `ROSE DU SACRE ${indexNumber}`, char: "Floral Duality, Warm Spicy Rose" };
    }
    return { name: `THE VERT VERBENA ${indexNumber}`, char: "Fresh Green, Herbaceous Tea" };
  };

  const profile = getDynamicName();

  const handleAdd = () => {
    onAddCustomToCart({
      id: `mixer-${profile.name.replace(/\s+/g, "-").toLowerCase()}`,
      name: profile.name,
      labelFor: userName.trim().toUpperCase() || "SOHO LAB SPECIMEN",
      labelDate: currentDate,
      labelAt: "SOHO LAB MIXER",
      price: 440000,
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600",
      isCustomFormulation: true
    });
    onClose();
  };

  return (
    <div id="mixer-full-viewport" className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#fbf9f9] border border-[#dbdad9] max-w-3xl w-full p-8 shadow-2xl flex flex-col md:flex-row gap-8 overflow-hidden h-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#747878] hover:text-black hover:rotate-90 transition-all cursor-pointer pointer-events-auto"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Sliders */}
        <div className="flex-1 space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#747878] block">
              EXPERIMENT COMPOSITION SYSTEM
            </span>
            <h3 className="text-xl font-bold tracking-tight text-[#1b1c1c] uppercase flex items-center mt-1">
              <FlaskConical className="w-5 h-5 mr-2 text-neutral-800" />
              Scent Lab Mixer
            </h3>
            <p className="text-xs text-[#747878] mt-2 font-light leading-relaxed">
              조향 슬라이더를 조정하여 고유한 오일 비율을 시험해 보세요. 변경 사항이 수치와 향의 캐릭터 명칭에 실시간 반영됩니다.
            </p>
          </div>

          <div className="space-y-4 font-mono text-[10px]">
            {Object.entries(notes).map(([key, val]) => {
              const displayValue = clampPercent(val);
              return (
                <div key={key} className="space-y-1.5 uppercase">
                  <div className="flex justify-between items-baseline font-semibold">
                    <span className="text-[#1b1c1c] tracking-widest">{key} Essences</span>
                    <span className="text-[#747878]">{displayValue}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={displayValue}
                    onChange={(e) => {
                      const inputValue = parseInt(e.target.value, 10);
                      if (!Number.isNaN(inputValue)) {
                        handleSliderChange(key as keyof typeof notes, inputValue);
                      }
                    }}
                    className="w-full h-1 bg-[#efeded] appearance-none cursor-pointer accent-black outline-none transition-all focus:outline-none"
                  />
                </div>
              );
            })}
          </div>

          {/* Recipient Input */}
          <div className="space-y-2 pt-2">
            <label htmlFor="mixer-owner-input" className="text-[9px] font-mono uppercase tracking-widest text-[#1b1c1c] font-bold block">
              Label Engraved Name
            </label>
            <input
              id="mixer-owner-input"
              type="text"
              maxLength={20}
              placeholder="e.g. MARC Jacob"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-[#fbf9f9] border border-[#dbdad9] focus:border-black font-mono tracking-widest text-[#1b1c1c] focus:outline-none focus:ring-0 p-3 text-xs uppercase"
            />
          </div>
        </div>

        {/* Right Side: Render Result Label */}
        <div className="w-full md:w-[280px] shrink-0 border border-[#dbdad9] p-5 bg-[#fbfbfb] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-center pb-3 border-b border-dashed border-[#dbdad9]">
              <span className="text-[9px] font-mono text-[#747878] tracking-widest uppercase">
                STABILIZED MIX RECORD
              </span>
              <h4 className="text-lg font-bold text-black uppercase font-mono tracking-wider mt-1.5">
                {profile.name}
              </h4>
              <span className="text-[8px] font-mono tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 py-0.5 px-2 mt-2 inline-block">
                EAU DE PARFUM (FORM {notes.woody}-{notes.citrus}-{notes.musky})
              </span>
            </div>

            {/* Simulated apothecary paper label */}
            <div className="bg-[#f0ece5] border border-[#b2afaa] p-3.5 font-mono text-[8px] text-[#222] select-none uppercase shadow-sm">
              <div className="border-b border-[#b2afaa] pb-1 font-bold text-center text-black">
                SPECIMEN LABEL
              </div>
              <div className="mt-2.5 space-y-1 text-gray-700">
                <div className="flex justify-between">
                  <span>NAME:</span>
                  <span className="font-bold text-black">{userName ? userName.trim().toUpperCase() : "SPECIMEN S-18"}</span>
                </div>
                <div className="flex justify-between">
                  <span>DATE:</span>
                  <span className="font-bold text-black">{currentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>LOCATION:</span>
                  <span>SOHO MIXER DEPT</span>
                </div>
              </div>
              <div className="border-t border-dashed border-[#b2afaa] mt-2 pt-1.5">
                <span className="text-gray-400 block text-[6px]">COMPOSITION:</span>
                {Object.entries(notes).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-[7px]">
                    <span>{key} oil</span>
                    <span>{val}%</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-[#747878] font-light leading-normal leading-[1.4] text-center italic">
              "Scent category: {profile.char.toLowerCase()}"
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={handleAdd}
              className="w-full bg-black text-white hover:bg-neutral-800 transition-all font-mono py-3 px-4 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Add Blend to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
