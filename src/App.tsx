import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import DiscoverySetPage from "./pages/DiscoverySetPage";
import ClassicCollectionPage from "./pages/ClassicCollectionPage";
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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            cartItems={cartItems}
            setCartItems={setCartItems}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            isLoginOpen={isLoginOpen}
            setIsLoginOpen={setIsLoginOpen}
            isQuizOpen={isQuizOpen}
            setIsQuizOpen={setIsQuizOpen}
            isMixerOpen={isMixerOpen}
            setIsMixerOpen={setIsMixerOpen}
          />
        }
      />
      <Route
        path="/collections"
        element={
          <Collections
            cartItems={cartItems}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            currentUser={currentUser}
            onLogout={handleLogout}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        }
      />
      <Route
        path="/collections/discovery-set"
        element={
          <DiscoverySetPage
            cartItems={cartItems}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            currentUser={currentUser}
            onLogout={handleLogout}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            onAddToCart={handleAddToCart}
          />
        }
      />
      <Route
        path="/collections/classic-collection"
        element={
          <ClassicCollectionPage
            cartItems={cartItems}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            currentUser={currentUser}
            onLogout={handleLogout}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            onAddToCart={handleAddToCart}
          />
        }
      />
    </Routes>
  );
}
