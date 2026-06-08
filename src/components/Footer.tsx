export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="border-t border-[#dbdad9] py-16 md:py-24 font-sans text-xs"
      style={{
        backgroundImage: "url('/src/assets/images/speckled_paper_1780458430027.png')",
        backgroundSize: "500px",
        backgroundRepeat: "repeat",
        backgroundColor: "#fbf9f9"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start border-b border-[#dbdad9] pb-16">
          {/* Logo Brand Title */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="text-sm font-semibold tracking-[0.3em] uppercase text-[#1b1c1c]">
              ESSENCE LAB
            </h2>
            <p className="text-[#747878] leading-relaxed max-w-[280px] font-light">
              Slow-crafted artisanal fragrance and apothecary laboratory. Hand-poured freshly on demand in small batches.
            </p>
          </div>

          {/* Navigation link elements inside visual cols */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-4 justify-items-stretch md:justify-items-end">
            <div className="space-y-4 text-left md:text-right">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#747878] font-bold">
                COMPENDIUM
              </h3>
              <ul className="space-y-2.5 text-[#1b1c1c] uppercase tracking-wider font-mono text-[9px]">
                <li><a href="#philosophy" className="hover:opacity-60 transition-opacity">Philosophy</a></li>
                <li><a href="#archive" className="hover:opacity-60 transition-opacity">Permanent Archive</a></li>
                <li><a href="#discovery" className="hover:opacity-60 transition-opacity">Discovery Collections</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity" onClick={(e) => { e.preventDefault(); alert("🔬 SOHO LAB NYC — Counter details: Monday to Sunday, 10:00AM - 7:00PM"); }}>Counter Locations</a></li>
              </ul>
            </div>

            <div className="space-y-4 text-left md:text-right">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#747878] font-bold">
                SUPPORT OFFICE
              </h3>
              <ul className="space-y-2.5 text-[#1b1c1c] uppercase tracking-wider font-mono text-[9px]">
                <li><a href="#" className="hover:opacity-60 transition-opacity">Shipping & Returns</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Product Refills</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Formula Customizer</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Private Concierge</a></li>
              </ul>
            </div>

            <div className="space-y-4 text-left md:text-right col-span-2 sm:col-span-1">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#747878] font-bold">
                LAB ADDRESS
              </h3>
              <p className="text-[#1b1c1c] leading-relaxed font-mono text-[9.5px] uppercase">
                233 Elizabeth Street<br />
                SoHo, New York, NY 10012<br />
                <span className="text-[#747878] block mt-1 select-all">soho@essencelab.ai</span>
              </p>
            </div>
          </div>
        </div>

        {/* Lower footer copyright details */}
        <div id="footer-bottom-bar" className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 uppercase tracking-wider text-[9px] font-mono text-[#747878]">
          <div className="text-center sm:text-left flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-start">
            <span>© {currentYear} ESSENCE LABORATORY. SILENT CODY PREVIEW.</span>
            <a href="#" className="hover:opacity-60 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Terms of Use</a>
          </div>
          <span className="text-center select-none tracking-[0.15em]">
            FORMULATED IN SMALL BATCHES SOHO NYC.
          </span>
        </div>
      </div>
    </footer>
  );
}
