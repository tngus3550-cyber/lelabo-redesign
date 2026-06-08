import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchModal from "./components/SearchModal";
import LoginModal from "./components/LoginModal";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Archive from "./components/Archive";
import DiscoveryBox from "./components/DiscoveryBox";
import CartDrawer from "./components/CartDrawer";
import ProductDetailModal from "./components/ProductDetailModal";
import LabFormulationQuiz from "./components/LabFormulationQuiz";
import ScentMixer from "./components/ScentMixer";
import Footer from "./components/Footer";
import { ScentProduct } from "./types";

interface CartItem {
  id: string;
  name: string;
  labelFor: string;
  labelDate: string;
  labelAt: string;
  price: number;
  quantity: number;
  image: string;
  isCustomFormulation?: boolean;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ScentProduct | null>(null);
  
  // Custom interactive experiences
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isMixerOpen, setIsMixerOpen] = useState(false);

  // User Authentication & Modals
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Load active user session on start
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("essence-lab-user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Failed to read user session:", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("essence-lab-user");
    setCurrentUser(null);
  };

  // Load cart from client-side local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("essence-lab-cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to read local cart storage:", err);
    }
  }, []);

  // Sync cart shifts
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem("essence-lab-cart", JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save local cart storage:", err);
    }
  };

  const handleAddToCart = (newItem: {
    id: string;
    name: string;
    labelFor: string;
    labelDate: string;
    labelAt: string;
    price: number;
    image: string;
    isCustomFormulation?: boolean;
  }) => {
    const existingIdx = cartItems.findIndex(
      (item) => item.id === newItem.id && item.labelFor === newItem.labelFor
    );

    if (existingIdx > -1) {
      const updated = [...cartItems];
      updated[existingIdx].quantity += 1;
      saveCart(updated);
    } else {
      saveCart([...cartItems, { ...newItem, quantity: 1 }]);
    }
    
    // Automatically trigger cart show to give gorgeous reinforcement feedback
    setIsCartOpen(true);
  };

  const handleRemoveItem = (id: string, labelFor: string) => {
    const filtered = cartItems.filter((i) => !(i.id === id && i.labelFor === labelFor));
    saveCart(filtered);
  };

  const handleUpdateQuantity = (id: string, labelFor: string, q: number) => {
    if (q <= 0) {
      handleRemoveItem(id, labelFor);
      return;
    }
    const updated = cartItems.map((item) => {
      if (item.id === id && item.labelFor === labelFor) {
        return { ...item, quantity: q };
      }
      return item;
    });
    saveCart(updated);
  };

  // Smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fbf9f9] text-[#1b1c1c] selection:bg-black selection:text-white antialiased">
      {/* Header element */}
      <Header
        onNavClick={handleScrollToSection}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main sections */}
      <main className="relative">
        <Hero
          onExploreClick={() => setIsQuizOpen(true)}
          onViewCollectionClick={() => handleScrollToSection("archive")}
        />

        {/* Section divider wrapper */}
        <div className="relative">
          <Philosophy />
          <Archive onProductClick={(prod) => setSelectedProduct(prod)} />
          <DiscoveryBox
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenMixer={() => setIsMixerOpen(true)}
          />
        </div>
      </main>

      {/* Footer element */}
      <Footer />

      {/* Slide-out Cart Drawer overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Product Customizer Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        currentUser={currentUser}
      />

      {/* Dynamic Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductClick={(prod) => {
          setSelectedProduct(prod);
          setIsSearchOpen(false);
        }}
      />

      {/* Dynamic Sign-In Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsLoginOpen(false);
        }}
      />

      {/* Scent Formulation (Discovery Collection) Quiz */}
      <LabFormulationQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddCustomToCart={handleAddToCart}
      />

      {/* Olfactory Scent Sliders Composition Sandbox */}
      <ScentMixer
        isOpen={isMixerOpen}
        onClose={() => setIsMixerOpen(false)}
        onAddCustomToCart={handleAddToCart}
      />
    </div>
  );
}
