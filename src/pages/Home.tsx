import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchModal from "../components/SearchModal";
import LoginModal from "../components/LoginModal";
import Hero from "../components/Hero";
import Philosophy from "../components/Philosophy";
import Archive from "../components/Archive";
import DiscoveryBox from "../components/DiscoveryBox";
import CartDrawer from "../components/CartDrawer";
import ProductDetailModal from "../components/ProductDetailModal";
import LabFormulationQuiz from "../components/LabFormulationQuiz";
import ScentMixer from "../components/ScentMixer";
import Footer from "../components/Footer";
import { ScentProduct } from "../types";
import { useNavigate } from "react-router-dom";

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

interface HomeProps {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: ScentProduct | null;
  setSelectedProduct: (product: ScentProduct | null) => void;
  currentUser: { name: string; email: string } | null;
  setCurrentUser: (user: { name: string; email: string } | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  isMixerOpen: boolean;
  setIsMixerOpen: (open: boolean) => void;
}

export default function Home({
  cartItems,
  setCartItems,
  isCartOpen,
  setIsCartOpen,
  selectedProduct,
  setSelectedProduct,
  currentUser,
  setCurrentUser,
  isSearchOpen,
  setIsSearchOpen,
  isLoginOpen,
  setIsLoginOpen,
  isQuizOpen,
  setIsQuizOpen,
  isMixerOpen,
  setIsMixerOpen,
}: HomeProps) {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("essence-lab-user");
    setCurrentUser(null);
  };

  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fbf9f9] text-[#1b1c1c] selection:bg-black selection:text-white antialiased">
      <Header
        onNavClick={handleScrollToSection}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="relative">
        <Hero
          onExploreClick={() => setIsQuizOpen(true)}
          onViewCollectionClick={() => handleScrollToSection("archive")}
        />

        <div className="relative">
          <Philosophy />
          <Archive onProductClick={(prod) => setSelectedProduct(prod)} />
          <DiscoveryBox
            onOpenQuiz={() => setIsQuizOpen(true)}
            onOpenMixer={() => setIsMixerOpen(true)}
            onViewCollections={() => navigate("/collections")}
          />
        </div>
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        currentUser={currentUser}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductClick={(prod) => {
          setSelectedProduct(prod);
          setIsSearchOpen(false);
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsLoginOpen(false);
        }}
      />

      <LabFormulationQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddCustomToCart={handleAddToCart}
      />

      <ScentMixer
        isOpen={isMixerOpen}
        onClose={() => setIsMixerOpen(false)}
        onAddCustomToCart={handleAddToCart}
      />
    </div>
  );
}
