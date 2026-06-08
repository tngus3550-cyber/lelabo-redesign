import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Calendar, ShoppingCart, Info, Compass } from "lucide-react";
import { ScentProduct } from "../types";

interface ProductDetailModalProps {
  product: ScentProduct | null;
  onClose: () => void;
  onAddToCart: (item: {
    id: string;
    name: string;
    labelFor: string;
    labelDate: string;
    labelAt: string;
    price: number;
    image: string;
  }) => void;
  currentUser: { name: string; email: string } | null;
}

export default function ProductDetailModal({ product, onClose, onAddToCart, currentUser }: ProductDetailModalProps) {
  if (!product) return null;

  const [labelName, setLabelName] = useState(currentUser ? currentUser.name : "");

  useEffect(() => {
    if (currentUser) {
      setLabelName(currentUser.name);
    } else {
      setLabelName("");
    }
  }, [currentUser]);

  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, "/");
  const defaultLocation = "SOHO LAB, NYC";

  const handleAdd = () => {
    const finalLabel = labelName.trim() || "GUEST";
    onAddToCart({
      id: product.id,
      name: product.name,
      labelFor: finalLabel,
      labelDate: currentDate,
      labelAt: defaultLocation,
      price: product.price,
      image: product.image
    });
    onClose();
  };

  return (
    <div id="product-modal-viewport" className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#fbf9f9] border border-[#dbdad9] max-w-4xl w-full flex flex-col md:flex-row shadow-2xl overflow-hidden pointer-events-auto h-auto max-h-[90vh]"
      >
        {/* Close Button top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-[#747878] hover:text-black hover:rotate-90 transition-all cursor-pointer pointer-events-auto"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Image & Simulated Label Presentation */}
        <div id="modal-side-visual" className="md:w-[45%] bg-[#e3e2e2] relative flex flex-col min-h-[250px] md:min-h-[450px]">
          <div className="flex-1 w-full relative overflow-hidden h-72 md:h-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover brightness-95"
            />
          </div>

          {/* Dynamic Paper Label Replica representing real formulation aesthetics */}
          <div className="absolute bottom-6 left-6 right-6 bg-amber-50/95 border border-[#c4c4c2] p-4 font-mono select-none shadow-md">
            <div className="text-[8px] font-bold text-center tracking-widest text-[#747878] border-b border-[#c4c4c2] pb-1.5 uppercase">
              ESSENCE LAB — SPECIMEN LABEL
            </div>
            <div className="mt-2 text-xs font-bold text-black tracking-wide uppercase flex justify-between">
              <span>{product.name}</span>
              <span className="text-[10px] text-gray-500">{product.strength.split(" ")[0]}</span>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-[8px] text-[#444748] uppercase">
              <div>
                <span className="text-gray-400 block text-[6px]">COMPRESSED CODES:</span>
                <span className="font-semibold">{product.batchNumber}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[6px]">BOTTLED ON:</span>
                <span className="font-semibold">{currentDate}</span>
              </div>
              <div className="col-span-2 mt-1">
                <span className="text-gray-400 block text-[6px]">CUSTOM MEMO / INTENDED RECIPIENT:</span>
                <span className="font-bold text-black tracking-widest text-[9px]">
                  {labelName.toUpperCase() || "INTENDED FOR USER / GUEST"}
                </span>
              </div>
            </div>

            <div className="mt-3.5 border-t border-[#c4c4c2] pt-1.5 flex justify-between text-[7px] text-gray-400 uppercase">
              <span>EST. 2006</span>
              <span>SOHO BOTTLED CODY CONTROLLER</span>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed copy & Formulation customization options */}
        <div id="modal-side-details" className="md:w-[55%] p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-none">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#747878] block">
                FLAGSHIP PERMANENT ARCHIVE
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#1b1c1c] uppercase mt-1">
                {product.name}
              </h3>
              <p className="text-xs font-mono text-[#747878] mt-1.5 select-all">
                {product.character} — {product.strength}
              </p>
            </div>

            {/* Price Line */}
            <div className="text-lg font-bold font-mono text-black">
              ₩ {product.price.toLocaleString("ko-KR")}
            </div>

            {/* Description Narrative */}
            <p className="text-xs md:text-sm text-[#444748] font-light leading-relaxed leading-[1.6]">
              {product.description}
            </p>

            {/* Sensory Ingredients List */}
            <div className="space-y-2 border-t border-b border-[#e9e8e7] py-4">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#747878] block">
                Olfactory Ingredients Compand
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.mainNotes.map((note) => (
                  <span
                    key={note}
                    className="bg-[#efeded] text-[#444748] text-[9px] font-mono uppercase px-2.5 py-1"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Hand-labeling memo inputs */}
            <div className="space-y-2.5">
              <label htmlFor="modal-label-input" className="text-[10px] font-mono uppercase tracking-widest text-[#1b1c1c] flex items-center font-bold">
                <Compass className="w-3.5 h-3.5 mr-1.5" />
                Personalize This Bottle's Label
              </label>
              <p className="text-[10px] text-[#747878] leading-normal font-sans">
                보틀 전면에 부착될 아날로그 종이라벨에 당신의 이름 혹은 소중한 문구를 남겨주세요. (최대 23자)
              </p>
              <div className="relative">
                <input
                  id="modal-label-input"
                  type="text"
                  maxLength={23}
                  placeholder="e.g. SAM / HAPPY BIRTHDAY"
                  value={labelName}
                  onChange={(e) => setLabelName(e.target.value)}
                  className="w-full bg-[#fbf9f9] border border-[#dbdad9] focus:border-[#1b1c1c] tracking-widest font-mono text-xs uppercase px-4 py-3 outline-none focus:ring-0 transition-colors"
                />
                <span className="absolute right-3 top-3 font-mono text-[9px] text-[#747878]">
                  {23 - labelName.length}
                </span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-8 pt-4 border-t border-[#e9e8e7] flex items-center gap-4">
            <button
              onClick={handleAdd}
              className="flex-1 bg-black text-white hover:bg-neutral-800 py-4 px-6 text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Bottle & Add To Cart
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
