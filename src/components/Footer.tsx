import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Truck, Recycle, FlaskConical, Sparkles } from "lucide-react";

const footerBackground = new URL("../assets/images/speckled_paper_1780458430027.png", import.meta.url).href;

// Support office topics rendered in a popup modal when clicked.
const SUPPORT_TOPICS = {
  shipping: {
    label: "Shipping & Returns",
    tag: "물류 안내",
    icon: Truck,
    title: "배송 및 반품",
    body: [
      "모든 향료는 주문 후 소호 연구소에서 소량으로 직접 조향·충전되어 발송까지 영업일 기준 2~4일이 소요됩니다.",
      "국내 5만원 이상 주문 시 무료 배송이며, 그 외에는 3,500원의 정밀 포장비가 부과됩니다.",
      "개봉하지 않은 제품은 수령 후 14일 이내 반품 가능합니다. 다만 개인 각인·맞춤 조향 제품은 위생상 반품이 불가합니다.",
    ],
  },
  refills: {
    label: "Product Refills",
    tag: "리필 프로그램",
    icon: Recycle,
    title: "제품 리필",
    body: [
      "기존 보틀을 연구소 카운터로 가져오시면 세척·소독 후 동일 향료로 다시 충전해 드립니다.",
      "리필 시 신규 구매가의 약 20%가 절감되며, 매 10회 리필마다 한 번의 무료 충전 혜택이 적립됩니다.",
      "우편 리필도 가능합니다. 빈 보틀을 보내주시면 충전 후 회송해 드립니다 (왕복 배송비 별도).",
    ],
  },
  customizer: {
    label: "Formula Customizer",
    tag: "맞춤 조향",
    icon: FlaskConical,
    title: "포뮬러 커스터마이저",
    body: [
      "디스커버리 퀴즈 또는 향 조합 슬라이더를 통해 당신만의 고유한 향료 비율을 설계할 수 있습니다.",
      "완성된 포뮬러에는 이름·날짜·연구소 정보가 새겨진 맞춤 라벨이 부착되어 보관됩니다.",
      "조향한 포뮬러는 계정에 저장되며, 언제든 동일한 배합으로 재주문할 수 있습니다.",
    ],
  },
  concierge: {
    label: "Private Concierge",
    tag: "프라이빗 컨시어지",
    icon: Sparkles,
    title: "프라이빗 컨시어지",
    body: [
      "전담 조향사가 1:1로 상담하여 특별한 순간을 위한 비공개 맞춤 향을 설계해 드립니다.",
      "선물 포장, 기업 단체 주문, 웨딩·기념일 한정 에디션 제작을 지원합니다.",
      "예약은 soho@essencelab.ai 로 문의해 주세요. 영업일 기준 24시간 이내에 회신드립니다.",
    ],
  },
} as const;

type TopicKey = keyof typeof SUPPORT_TOPICS;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeTopic, setActiveTopic] = useState<TopicKey | null>(null);

  const topic = activeTopic ? SUPPORT_TOPICS[activeTopic] : null;

  return (
    <footer
      id="footer"
      className="border-t border-[#dbdad9] py-16 md:py-24 font-sans text-xs"
      style={{
        backgroundImage: `url(${footerBackground})`,
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
                {(Object.keys(SUPPORT_TOPICS) as TopicKey[]).map((key) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setActiveTopic(key)}
                      className="uppercase tracking-wider hover:opacity-60 transition-opacity cursor-pointer md:text-right"
                    >
                      {SUPPORT_TOPICS[key].label}
                    </button>
                  </li>
                ))}
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

      {/* Support office topic modal */}
      <AnimatePresence>
        {topic && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setActiveTopic(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-md w-full border border-[#dbdad9] p-8 shadow-2xl overflow-hidden pointer-events-auto"
              style={{
                backgroundImage: `url(${footerBackground})`,
                backgroundSize: "350px",
                backgroundRepeat: "repeat",
                backgroundColor: "#fbf9f9"
              }}
            >
              {/* Decorative corner tag */}
              <div className="absolute top-0 right-0 bg-[#1b1c1c] text-white text-[7px] font-mono tracking-[0.2em] px-3.5 py-1 uppercase select-none">
                {topic.tag}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveTopic(null)}
                className="absolute top-6 left-6 text-[#747878] hover:text-black hover:scale-110 transition-transform cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title block */}
              <div className="text-center mt-6 mb-8">
                <topic.icon className="w-5 h-5 mx-auto text-[#1b1c1c] mb-3" />
                <span className="text-[9px] font-mono tracking-[0.3em] text-[#747878] uppercase block">
                  {topic.label}
                </span>
                <h3 className="text-xl font-bold text-[#1b1c1c] tracking-wider mt-1">
                  {topic.title}
                </h3>
                <div className="w-12 h-[1px] bg-[#1b1c1c] mx-auto mt-3" />
              </div>

              {/* Body copy */}
              <div className="space-y-4">
                {topic.body.map((paragraph, idx) => (
                  <p key={idx} className="text-[#1b1c1c] text-[13px] leading-relaxed font-light flex gap-2.5">
                    <span className="font-mono text-[10px] text-[#a3a19f] mt-0.5 select-none">0{idx + 1}</span>
                    <span>{paragraph}</span>
                  </p>
                ))}
              </div>

              {/* Micro-label footer */}
              <div className="mt-8 text-center text-[7px] font-mono text-[#a3a19f] uppercase tracking-widest">
                SOHO NY — ESTABLISHED 2006
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
