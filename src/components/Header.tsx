import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Menu, X, LogOut } from "lucide-react";

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  onOpenCart: () => void;
  cartCount: number;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
}

export default function Header({ 
  onNavClick, 
  onOpenCart, 
  cartCount,
  onOpenSearch,
  onOpenLogin,
  currentUser,
  onLogout
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLink = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavClick(id);
  };

  const textClass = isScrolled ? "text-[#1b1c1c]" : "text-white";
  const navLinkClass = isScrolled ? "text-[#444748] hover:text-[#1b1c1c]" : "text-white/80 hover:text-white";
  const hoverLineClass = isScrolled ? "after:bg-[#1b1c1c]" : "after:bg-white";

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans ${
        isScrolled
          ? "bg-white border-b border-[#e9e8e7]/80 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Name */}
        <button
          id="btn-brand-logo"
          onClick={() => handleLink("hero")}
          className={`text-xl md:text-2xl font-semibold tracking-widest transition-all duration-300 hover:opacity-80 font-sans ${textClass}`}
        >
          LE LABO
        </button>

        {/* Navigation Menu - Desktop */}
        <nav id="desktop-navbar" className="hidden md:flex items-center space-x-10 text-xs tracking-widest font-medium uppercase text-neutral-800">
          <button
            id="nav-link-philosophy"
            onClick={() => handleLink("philosophy")}
            className={`relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:transition-all after:duration-300 pointer-events-auto cursor-pointer transition-colors duration-300 ${navLinkClass} ${hoverLineClass}`}
          >
            Philosophy
          </button>
          <button
            id="nav-link-archive"
            onClick={() => handleLink("archive")}
            className={`relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:transition-all after:duration-300 pointer-events-auto cursor-pointer transition-colors duration-300 ${navLinkClass} ${hoverLineClass}`}
          >
            Archive
          </button>
          <button
            id="nav-link-discovery"
            onClick={() => handleLink("discovery")}
            className={`relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:transition-all after:duration-300 pointer-events-auto cursor-pointer transition-colors duration-300 ${navLinkClass} ${hoverLineClass}`}
          >
            Discovery
          </button>
          <button
            id="nav-link-contact"
            onClick={() => handleLink("footer")}
            className={`relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:transition-all after:duration-300 pointer-events-auto cursor-pointer transition-colors duration-300 ${navLinkClass} ${hoverLineClass}`}
          >
            Contact
          </button>
        </nav>

        {/* Action Elements */}
        <div id="nav-action-wrapper" className={`flex items-center space-x-4 md:space-x-5 transition-colors duration-300 ${textClass}`}>
          <button
            id="btn-search-nav"
            onClick={onOpenSearch}
            className="p-1 hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Search"
            title="Search Products"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2 border border-current/20 py-0.5 px-2 font-mono text-[9px] relative select-none animate-fade-in group">
              <span className="font-bold tracking-wider">{currentUser.name}</span>
              <button
                onClick={onLogout}
                className="hover:scale-110 text-neutral-400 hover:text-red-500 transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Log Out"
                id="btn-logout-header"
              >
                <LogOut className="w-[11px] h-[11px]" />
              </button>
            </div>
          ) : (
            <button
              id="btn-profile-nav"
              onClick={onOpenLogin}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Profile"
              title="Scent Profile"
            >
              <User className="w-[18px] h-[18px]" />
            </button>
          )}

          <button
            id="btn-cart-nav"
            onClick={onOpenCart}
            className="p-1 hover:opacity-60 transition-opacity relative flex items-center cursor-pointer"
            aria-label="Shopping Cart"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-[18px] h-[18px]" />
            {cartCount > 0 && (
              <span
                id="cart-badge-indicator"
                className={`absolute -top-1 -right-1 text-[9px] font-mono rounded-full w-4 h-4 flex items-center justify-center font-bold ${
                  isScrolled ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1 hover:opacity-60 transition-opacity"
            aria-label="Menu"
            title="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-overlay"
          className="md:hidden absolute top-full left-0 w-full bg-[#fbf9f9] border-b border-[#e9e8e7] py-6 px-8 flex flex-col space-y-4 shadow-lg animate-fade-in"
        >
          <button
            id="mobile-nav- философии"
            onClick={() => handleLink("philosophy")}
            className="text-left text-xs uppercase tracking-widest text-[#444748] font-medium py-2 border-b border-[#efeded]/50"
          >
            Philosophy
          </button>
          <button
            id="mobile-nav-archive"
            onClick={() => handleLink("archive")}
            className="text-left text-xs uppercase tracking-widest text-[#444748] font-medium py-2 border-b border-[#efeded]/50"
          >
            Archive
          </button>
          <button
            id="mobile-nav-discovery"
            onClick={() => handleLink("discovery")}
            className="text-left text-xs uppercase tracking-widest text-[#444748] font-medium py-2 border-b border-[#efeded]/50"
          >
            Discovery
          </button>
          <button
            id="mobile-nav-contact"
            onClick={() => handleLink("footer")}
            className="text-left text-xs uppercase tracking-widest text-[#444748] font-medium py-2"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}
