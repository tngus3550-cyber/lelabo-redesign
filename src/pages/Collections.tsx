import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import { motion } from "motion/react";

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

interface CollectionsProps {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
  onRemoveItem: (id: string, labelFor: string) => void;
  onUpdateQuantity: (id: string, labelFor: string, q: number) => void;
}

const discoverySetImage = new URL("../assets/images/regenerated_image_1780295930617.jpg", import.meta.url).href;
const classicCollectionImage = new URL("../assets/images/regenerated_image_1780295931994.jpg", import.meta.url).href;
const speckledPaper = new URL("../assets/images/speckled_paper_1780458430027.png", import.meta.url).href;

export default function Collections({
  cartItems,
  isCartOpen,
  setIsCartOpen,
  currentUser,
  onLogout,
  onRemoveItem,
  onUpdateQuantity,
}: CollectionsProps) {
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

  const collections = [
    {
      id: "discovery-set",
      name: "Discovery Set",
      description: "여섯 가지 시그니처 향기의 미니어처 컬렉션으로 당신의 향취를 발견하세요. 완벽한 여행용 세트.",
      image: discoverySetImage,
      route: "/collections/discovery-set",
    },
    {
      id: "classic-collection",
      name: "Classic Collection",
      description: "르라보의 클래식 향기들을 모은 영구 컬렉션. 시간을 초월한 향기의 조화.",
      image: classicCollectionImage,
      route: "/collections/classic-collection",
    },
  ];

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
              COLLECTIONS
            </span>
            <h1 className="text-4xl md:text-5xl font-sans tracking-wide text-[#1b1c1c] font-light mb-6">
              컬렉션 탐색
            </h1>
            <p className="text-sm text-[#555] max-w-2xl mx-auto leading-relaxed">
              르라보의 특별한 컬렉션을 발견하세요. 각 컬렉션은 고유한 향기의 이야기를 담고 있습니다.
            </p>
          </motion.div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {collections.map((collection, idx) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => navigate(collection.route)}
                className="cursor-pointer group"
              >
                <div className="relative h-96 w-full overflow-hidden border border-[#dbdad9] bg-white">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                </div>

                <div className="mt-6 px-2">
                  <h2 className="text-2xl font-sans font-light tracking-wide text-[#1b1c1c] mb-3">
                    {collection.name}
                  </h2>
                  <p className="text-sm text-[#555] leading-relaxed mb-4">
                    {collection.description}
                  </p>
                  <button className="text-xs uppercase tracking-widest font-mono font-bold border-b border-[#1b1c1c] text-[#1b1c1c] hover:text-white hover:border-white group-hover:text-black transition-colors py-2">
                    컬렉션 보기 →
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
    </div>
  );
}
