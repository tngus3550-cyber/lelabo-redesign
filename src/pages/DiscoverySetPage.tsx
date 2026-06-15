import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import ProductDetailModal from "../components/ProductDetailModal";
import { motion } from "motion/react";
import { SCENT_PRODUCTS } from "../data";
import { ScentProduct } from "../types";

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

interface DiscoverySetPageProps {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: ScentProduct | null;
  setSelectedProduct: (product: ScentProduct | null) => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
  onRemoveItem: (id: string, labelFor: string) => void;
  onUpdateQuantity: (id: string, labelFor: string, q: number) => void;
  onAddToCart: (item: {
    id: string;
    name: string;
    labelFor: string;
    labelDate: string;
    labelAt: string;
    price: number;
    image: string;
    isCustomFormulation?: boolean;
  }) => void;
}

const speckledPaper = new URL("../assets/images/speckled_paper_1780458430027.png", import.meta.url).href;

export default function DiscoverySetPage({
  cartItems,
  isCartOpen,
  setIsCartOpen,
  selectedProduct,
  setSelectedProduct,
  currentUser,
  onLogout,
  onRemoveItem,
  onUpdateQuantity,
  onAddToCart,
}: DiscoverySetPageProps) {
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    // Logo click (hero) should navigate home
    if (sectionId === "hero") {
      navigate("/");
    }
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
        onNavClick={handleNavClick}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        onOpenSearch={() => {}}
        onOpenLogin={() => {}}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      <main className="relative py-20">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${speckledPaper})`,
            backgroundSize: "500px",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#999] mb-4 block">
              DISCOVERY SET
            </span>
            <h1 className="text-4xl md:text-5xl font-sans tracking-wide text-[#1b1c1c] font-light mb-6">
              시그니처 컬렉션
            </h1>
            <p className="text-sm text-[#555] max-w-2xl mx-auto leading-relaxed">
              여섯 가지 시그니처 향기로 당신만의 향을 찾아가세요. 각각의 향기는 고유한 이야기와 특성을 담고 있습니다.
            </p>
            <button
              onClick={() => navigate("/collections")}
              className="mt-6 text-xs uppercase tracking-widest font-mono border-b border-[#1b1c1c] text-[#1b1c1c] hover:text-black py-2"
            >
              ← 컬렉션으로 돌아가기
            </button>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SCENT_PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer"
              >
                <div className="relative h-80 w-full overflow-hidden border border-[#dbdad9] bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-[#999] font-light">
                    {product.character}
                  </h3>
                  <h2 className="text-lg font-sans font-light tracking-wide text-[#1b1c1c] mt-2 mb-1">
                    {product.name}
                  </h2>
                  <p className="text-xs text-[#555] mb-3">
                    {product.subtitle}
                  </p>
                  <p className="text-[13px] text-[#1b1c1c] font-mono tracking-wider mb-4">
                    ₩{product.price.toLocaleString()}
                  </p>
                  <button className="text-xs uppercase tracking-widest font-mono font-bold border border-[#1b1c1c] text-[#1b1c1c] hover:bg-[#1b1c1c] hover:text-white transition-all duration-300 px-4 py-2 w-full">
                    상세 보기
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={onRemoveItem}
        onUpdateQuantity={onUpdateQuantity}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
        currentUser={currentUser}
      />
    </div>
  );
}
