import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { SCENT_PRODUCTS } from "../data";
import { ScentProduct } from "../types";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

interface ArchiveProps {
  onProductClick: (product: ScentProduct) => void;
}

export default function Archive({ onProductClick }: ArchiveProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filters = ["ALL", "WOODY", "CITRUS", "GREEN", "FLORAL", "MUSKY"];

  const filteredProducts = SCENT_PRODUCTS.filter((product) => {
    if (selectedFilter === "ALL") return true;
    return product.character.toUpperCase().includes(selectedFilter);
  });

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);

      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
      } else {
        setScrollProgress(0);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
    const timer = setTimeout(() => {
      handleScroll();
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedFilter]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      const scrollAmount = firstChild ? firstChild.clientWidth + 32 : clientWidth * 0.75;

      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW"
    }).format(price);
  };

  return (
    <section
      id="archive"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/speckled_paper_1780458430027.png')",
        backgroundSize: "500px",
        backgroundRepeat: "repeat",
        backgroundColor: "#faf9f8"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Header Block matching simple and clean premium style */}
        <div className="flex justify-between items-end mb-12 border-b border-[#e5e4e2] pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#747878] font-mono mb-2 block">
              THE PERMANENT ARCHIVE
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1b1c1c]">
              The Archive
            </h2>
          </div>
          
          {/* Subtle info label instead of showAll */}
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#747878] hidden sm:block">
            {filteredProducts.length} Fragrances Collected
          </span>
        </div>

        {/* Filter Navigation for richer engagement */}
        <div id="archive-filter-pillbox" className="flex flex-wrap gap-2 mb-12 font-mono text-[10px]">
          {filters.map((filter) => (
            <button
              key={filter}
              id={`filter-btn-${filter.toLowerCase()}`}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 border transition-all duration-300 uppercase tracking-widest cursor-pointer ${
                selectedFilter === filter
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-[#747878] border-[#dbdad9] hover:border-black hover:text-black"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Slider Frame */}
        <div className="relative group/slider">
          {/* Left Navigation Arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-2 md:-left-6 top-[180px] -translate-x-1/2 z-20 w-12 h-12 rounded-full border border-[#dbdad9] bg-white text-[#1b1c1c] flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
              canScrollLeft 
                ? "opacity-100 hover:bg-[#1b1c1c] hover:text-white hover:border-[#1b1c1c]" 
                : "opacity-0 pointer-events-none scale-90"
            }`}
            title="이전 상품"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-2 md:-right-6 top-[180px] translate-x-1/2 z-20 w-12 h-12 rounded-full border border-[#dbdad9] bg-white text-[#1b1c1c] flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
              canScrollRight 
                ? "opacity-100 hover:bg-[#1b1c1c] hover:text-white hover:border-[#1b1c1c]" 
                : "opacity-0 pointer-events-none scale-90"
            }`}
            title="다음 상품"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Horizontal scrollable track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-x-8 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                id={`product-card-${prod.id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-[85%] sm:w-[400px] md:w-[330px] lg:w-[calc(33.333%-21.333px)] flex-shrink-0 snap-start snap-always group flex flex-col cursor-pointer"
                onClick={() => onProductClick(prod)}
              >
                {/* Image Frame with background slate/neutral tone */}
                <div className="aspect-square w-full overflow-hidden bg-[#e9e8e7] border border-[#e5e4e2] relative">
                  <motion.img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover brightness-95 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-750 ease-out"
                  />
                  
                  {/* Visual Hover Actions Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <div className="p-3 bg-white text-black hover:bg-black hover:text-white rounded-none transition-colors shadow-lg">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Batch Code Stamp upper right */}
                  <span className="absolute top-4 right-4 font-mono text-[9px] bg-black/85 text-white py-1 px-2 uppercase tracking-wider">
                    {prod.batchNumber.split(" ")[1] || "EL-2026"}
                  </span>
                </div>

                {/* Product Info Block */}
                <div className="mt-5 flex flex-col">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold tracking-wider text-[#1b1c1c] uppercase font-mono group-hover:underline dec decoration-1 decoration-[#747878]">
                      {prod.name}
                    </h3>
                    <span className="text-xs font-semibold text-[#1b1c1c] font-mono whitespace-nowrap ml-4">
                      {formatPrice(prod.price)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-[#747878] leading-relaxed font-sans line-clamp-1 font-light block">
                    {prod.subtitle}
                  </p>
                  <div className="mt-3 flex items-center text-[10px] uppercase font-mono tracking-widest text-[#747878] group-hover:text-black transition-colors">
                    <span>View Details & Personalize Label</span>
                    <span className="ml-[6px] translate-x-0 group-hover:translate-x-[4px] transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Minimalist Slide Progress Bar Indicator */}
        {filteredProducts.length > 3 && (
          <div className="w-full max-w-[160px] h-[1px] bg-[#e5e4e2] mx-auto mt-12 relative">
            <div
              className="absolute top-0 h-[2px] bg-[#1b1c1c] transition-all duration-150"
              style={{
                width: "40px",
                left: `${scrollProgress * (160 - 40)}px`
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
