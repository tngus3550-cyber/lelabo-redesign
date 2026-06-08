import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, ChevronRight, Compass } from "lucide-react";
import { SCENT_PRODUCTS } from "../data";
import { ScentProduct } from "../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: ScentProduct) => void;
}

export default function SearchModal({ isOpen, onClose, onProductClick }: SearchModalProps) {
  if (!isOpen) return null;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ScentProduct[]>(SCENT_PRODUCTS);

  // Filter products by search query
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults(SCENT_PRODUCTS);
      return;
    }

    const filtered = SCENT_PRODUCTS.filter((prod) => {
      return (
        prod.name.toLowerCase().includes(trimmed) ||
        prod.subtitle.toLowerCase().includes(trimmed) ||
        prod.character.toLowerCase().includes(trimmed) ||
        prod.description.toLowerCase().includes(trimmed) ||
        prod.mainNotes.some((note) => note.toLowerCase().includes(trimmed))
      );
    });

    setResults(filtered);
  }, [query]);

  return (
    <div id="search-modal-viewport" className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm font-sans pt-16 md:pt-24">
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-2xl w-full border border-[#dbdad9] p-6 md:p-8 shadow-2xl overflow-hidden pointer-events-auto"
        style={{
          backgroundImage: "url('/assets/images/speckled_paper_1780458430027.png')",
          backgroundSize: "320px",
          backgroundRepeat: "repeat",
          backgroundColor: "#fbf9f9"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#747878] hover:text-black hover:scale-110 transition-transform cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search header info */}
        <div className="mb-6">
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#747878] uppercase block">
            LAB DATABASE SEARCH ENGINE
          </span>
          <h3 className="text-xl font-bold text-[#1b1c1c] tracking-wider uppercase mt-1">
            Search Formula Archive
          </h3>
          <p className="text-[10px] text-[#747878] leading-relaxed mt-1 font-sans">
            르 라보 영구 아카이브 데이터베이스를 검색하세요. 향수 이름, 메인 어코드(성분), 분위기 등으로 검색하실 수 있습니다.
          </p>
        </div>

        {/* Input area */}
        <div className="relative">
          <Search className="absolute left-4 top-4 w-4 h-4 text-[#a3a19f]" />
          <input
            autoFocus
            type="text"
            placeholder="e.g. SANTAL, MATCHA, WOODY, FIG..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/70 border border-[#dbdad9] focus:border-black font-mono text-xs uppercase pl-11 pr-10 py-4 outline-none transition-colors border-b-2"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-4.5 text-[9px] font-mono text-neutral-400 hover:text-black cursor-pointer uppercase"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Fast Tag suggestions */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono uppercase text-[#747878]">검색 추천어:</span>
          {["SANTAL", "MATCHA", "ROSE", "WOODY", "CITRUS", "FIG"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-[9px] font-mono uppercase bg-neutral-200/50 hover:bg-black hover:text-white px-2 py-0.5 border border-transparent hover:border-black transition-all cursor-pointer"
            >
              #{tag.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Performance count */}
        <div className="mt-6 border-b border-[#dbdad9] pb-2 flex justify-between items-center">
          <span className="text-[9px] font-mono text-gray-400 uppercase">
            QUERY MATCH SCORE
          </span>
          <span className="text-[9px] font-mono text-black font-semibold">
            {results.length} Formulae Found
          </span>
        </div>

        {/* Results layout */}
        <div className="max-h-[320px] overflow-y-auto mt-4 space-y-3 pr-2 scrollbar-thin">
          <AnimatePresence>
            {results.length > 0 ? (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="flex items-center gap-4 p-3 bg-white/40 hover:bg-white border border-[#dbdad9]/40 hover:border-black/50 transition-all duration-300 cursor-pointer group"
                >
                  {/* Thumbnail Image */}
                  <div className="w-14 h-14 bg-gray-200 border border-neutral-300 overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                    />
                  </div>

                  {/* Text attributes */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-black tracking-wider uppercase">
                        {product.name}
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-black shrink-0">
                        ₩{product.price.toLocaleString("ko-KR")}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5 truncate uppercase">
                      {product.subtitle}
                    </p>
                    <div className="flex gap-1.5 mt-1">
                      <span className="text-[7.5px] font-mono text-[#a3a19f] bg-neutral-100 border px-1.5 py-0.2 uppercase">
                        {product.character.split(",")[0]}
                      </span>
                      <span className="text-[7.5px] font-mono text-gray-400">
                        {product.strength.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Micro action button */}
                  <div className="p-1 hover:bg-neutral-100 rounded-none text-neutral-400 group-hover:text-black transition-colors shrink-0">
                    <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-gray-400 bg-white/20 border border-dashed border-[#dbdad9]">
                <Compass className="w-8 h-8 mx-auto stroke-1 stroke-neutral-300 mb-2.5 animate-spin" style={{ animationDuration: '6s' }} />
                <p className="text-[10px] font-mono uppercase tracking-widest">
                  No Archival Matches Found for "{query}"
                </p>
                <button
                  onClick={() => setQuery("")}
                  className="mt-3 text-[9px] font-mono uppercase tracking-wide underline text-black hover:opacity-60 cursor-pointer"
                >
                  Show All Formulations
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Ambient bottom brand line */}
        <div className="mt-6 text-center text-[7.5px] font-mono text-gray-400 tracking-widest uppercase">
          LE LABO ARCHIVES — INGREDIENT & COMPACT ANALYZER
        </div>
      </motion.div>
    </div>
  );
}
