import { motion } from "motion/react";
import { X, Trash2, ShoppingBag } from "lucide-react";

interface CartItem {
  id: string; // product-id or custom-formula-id
  name: string;
  labelFor: string;
  labelDate: string;
  labelAt: string;
  price: number;
  quantity: number;
  image: string;
  isCustomFormulation?: boolean;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string, labelFor: string) => void;
  onUpdateQuantity: (id: string, labelFor: string, q: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW"
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black pointer-events-auto cursor-pointer"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
          className="w-screen max-w-md bg-[#fbf9f9] border-l border-[#dbdad9] flex flex-col shadow-2xl h-full"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#e9e8e7] flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest font-mono text-[#1b1c1c] flex items-center">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Laboratory Cart ({cartItems.length})
            </h2>
            <button
              onClick={onClose}
              className="text-[#747878] hover:text-black hover:rotate-90 transition-all pointer-events-auto"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#747878] mb-4">
                  EMPTY BATCHES
                </span>
                <p className="text-sm text-[#444748] font-light">
                  당신의 카트가 비어 있습니다.<br />
                  세상에 단 하나뿐인 시그니처 향수를 보틀링하세요.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.labelFor}`}
                  className="flex gap-4 pb-6 border-b border-[#efeded]/70 items-start"
                >
                  {/* Package Bottle Image */}
                  <div className="w-20 h-20 bg-[#e9e8e7] border border-[#dbdad9] shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover brightness-95"
                    />
                  </div>

                  {/* Details with Laboratory Custom Labels */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-semibold tracking-wider text-[#1b1c1c] font-mono uppercase">
                          {item.name}
                        </h3>
                        <span className="text-xs font-semibold text-[#1b1c1c] font-mono">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-[#747878] mt-1 uppercase">
                        {item.isCustomFormulation ? "Custom Formula Blend" : "Signature Blend"}
                      </p>

                      {/* Custom Printed Label display - Typewriter Mock */}
                      <div className="mt-2.5 p-2 bg-[#f5f3f3] border border-[#dbdad9] font-mono text-[9px] text-[#444748] leading-tight flex flex-col select-none uppercase">
                        <div className="border-b border-[#dbdad9]/60 pb-1 flex justify-between">
                          <span>Label For:</span>
                          <span className="font-bold text-black">{item.labelFor || "GUEST"}</span>
                        </div>
                        <div className="pt-1 flex justify-between text-[8px] text-[#747878]">
                          <span>{item.labelDate}</span>
                          <span>{item.labelAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Adjustment & Remove */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#dbdad9] text-xs font-mono">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.labelFor, item.quantity - 1)}
                          className="px-2 py-1 text-[#747878] hover:text-black hover:bg-[#efeded] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.labelFor, item.quantity + 1)}
                          className="px-2 py-1 text-[#747878] hover:text-black hover:bg-[#efeded] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id, item.labelFor)}
                        className="text-[#747878] hover:text-[#ba1a1a] p-1.5 transition-colors"
                        title="Remove Bottle"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer controls */}
          {cartItems.length > 0 && (
            <div className="border-t border-[#e9e8e7] p-6 space-y-4 bg-[#fbf9f9]">
              <div className="flex justify-between items-baseline font-mono uppercase text-xs">
                <span className="text-[#747878]">BATCH SUBTOTAL</span>
                <span className="text-base font-bold text-[#1b1c1c]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[10px] text-[#747878] text-center font-mono uppercase tracking-widest leading-normal">
                Includes complimentary custom labeling & express cooling dispatch.
              </p>
              <button
                onClick={() => {
                  alert("🔬 [ESSENCE LAB] 주문 및 결제가 데모 서버에 성공적으로 접수되었습니다. 당신의 보틀 처리가 즉시 개시됩니다.");
                }}
                className="w-full bg-[#1b1c1c] text-white hover:bg-neutral-800 transition-colors py-4 text-xs font-mono font-semibold uppercase tracking-widest cursor-pointer text-center"
              >
                PROCEED TO DISPATCH
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
