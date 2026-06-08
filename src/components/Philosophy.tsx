import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Tag, PenTool, RotateCcw, X } from "lucide-react";

export default function Philosophy() {
  const [activeDetail, setActiveDetail] = useState<string | null>(null);

  const services = [
    {
      id: "fresh-blending",
      title: "FRESH BLENDING",
      titleKo: "프레쉬 블렌딩",
      image: "/assets/images/fresh_blending_1780544160550.png",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      desc: "원하는 르 라보의 향을 선택하고, 수작업으로 신선하게 블렌딩된 향수를 만날 수 있습니다.",
      details: "대량 생산된 제품을 재고로 쌓아두지 않습니다. 오직 당신의 주문이 확정되는 즉시, 전문 조향사가 숙성된 원료에서 에센셜 오일을 계량하여 신선하게 정제수와 알코올에 배합합니다. 블렌딩 시점의 환경(온도, 습도)까지 계측하여 최적의 발향을 만들어냅니다."
    },
    {
      id: "personal-labeling",
      title: "PERSONAL LABELING",
      titleKo: "퍼스널 라벨링",
      image: "/assets/images/personal_labeling_1780544176452.png",
      icon: <Tag className="w-3.5 h-3.5" />,
      desc: "18자의 원하는 문구를 크리에이션에 담을 수 있습니다. 이 경험은 전 세계 르 라보 매장에서 동일하게 제공됩니다.",
      details: "라벨은 향수의 진정한 소유권을 의미합니다. 조향 단계가 끝난 향수의 보틀에는 원료 구성 정보, 조향 장소, 조향 일자와 함께 영문 대소문자, 숫자, 마침표를 사용하여 당신이 지정한 23자 이내의 메모가 빈티지 면라벨 직조지에 인쇄되어 붙여집니다."
    },
    {
      id: "engraving-service",
      title: "ENGRAVING SERVICE",
      titleKo: "각인 서비스",
      image: "/assets/images/engraving_service_1780544190540.png",
      icon: <PenTool className="w-3.5 h-3.5" />,
      desc: "트래블 튜브 케이스에 이니셜을 새길 수 있습니다.",
      details: "소중한 사람에게 전하는 특별한 순간. 보틀의 메탈 캡 혹은 글라스 본체에 다이아몬드 에칭 도구로 세밀하게 이니셜이나 특별한 숫자를 수작업으로 마킹해 드립니다. 장인의 손끝에 전해지는 조절된 압력으로 각인되므로 수공예 아날로그 감성을 한층 더해줍니다."
    },
    {
      id: "refill-system",
      title: "REFILL SYSTEM",
      titleKo: "리필",
      image: "/assets/images/refill_service_1780544203594.png",
      icon: <RotateCcw className="w-3.5 h-3.5" />,
      desc: "원하는 르 라보의 향을 선택하고, 수작업으로 신선하게 블렌딩된 향수를 만날 수 있습니다.",
      details: "다 사용한 오리지널 보틀을 가지고 전 세계의 모든 ESSENCE LAB 매장에 방문하시면, 기존 라벨을 가치 있게 보존한 상태에서 신선한 동일 향을 20% 할인된 가격에 간편하게 충전해 드립니다. 유리를 버리지 않고 순환시키는 지속 가능한 럭셔리 실천입니다."
    }
  ];

  return (
    <section
      id="philosophy"
      className="pb-24 pt-32 md:pb-32 md:pt-40 border-b border-[#efeded] relative"
      style={{
        backgroundImage: "url('/src/assets/images/speckled_paper_1780458430027.png')",
        backgroundSize: "500px",
        backgroundRepeat: "repeat",
        backgroundColor: "#fbf9f9"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="w-full">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#747878] font-mono mb-3 block">
              ESTABLISHED IN 2006
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1b1c1c] mb-6">
              The Philosophy
            </h2>
            <p className="text-[#444748] text-sm md:text-base leading-relaxed mb-12 font-light max-w-4xl">
              2006년 뉴욕에서 탄생한 핸드 메이드 퍼퓸 하우스 르 라보를 소개합니다. 르 라보는 향수를 만드는 실험실을 테마로 하며, 단순한 향수가 아닌, 장인정신과 감성을 담은 브랜드 경험을 추구합니다. 핸드메이드 방식과 불완전함의 아름다움을 중요하게 생각하며, 익숙함과 새로움이 공존하는 향을 통해 사람들에게 특별한 감각과 여유를 전달하고자 합니다.
            </p>

            {/* Services Grid matching style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
              {services.map((svc, idx) => (
                <motion.button
                  key={svc.id}
                  id={`btn-service-${svc.id}`}
                  onClick={() => setActiveDetail(svc.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col text-left transition-all duration-300 group cursor-pointer w-full focus:outline-none"
                >
                  {/* Image container mimicking the reference layout */}
                  <div className="w-full aspect-square overflow-hidden bg-[#e9e8e7] border border-[#e5e4e2] relative shadow-xs">
                    <img
                      src={svc.image}
                      alt={svc.titleKo}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                    />
                    
                    {/* Tiny spec overlay button for detail awareness */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-[2px] text-black font-mono text-[7px] tracking-widest px-2.5 py-1.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-neutral-300/40 shadow-xs">
                      {svc.icon}
                      <span>SPEC 0{idx + 1}</span>
                    </div>
                  </div>

                  {/* Text meta */}
                  <div className="mt-5 flex flex-col w-full">
                    <h3 className="text-sm font-bold tracking-[0.02em] text-[#1b1c1c] border-b border-[#e5e4e2] pb-2 transition-colors duration-300 font-sans">
                      {svc.titleKo}
                    </h3>
                    <p className="text-xs text-[#555a5b] leading-relaxed mt-3.5 font-sans font-light">
                      {svc.desc}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal Popover */}
      <AnimatePresence>
        {activeDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-[#fbf9f9] border border-[#dbdad9] max-w-lg w-full p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setActiveDetail(null)}
                className="absolute top-6 right-6 text-[#747878] hover:text-black hover:rotate-90 transition-all duration-300 pointer-events-auto"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {services
                .filter((s) => s.id === activeDetail)
                .map((svc) => (
                  <div key={svc.id} className="text-[#1b1c1c]">
                    <span className="text-[10px] font-mono tracking-widest text-[#747878] block mb-2">
                      LABORATORY HANDWORK SPEC
                    </span>
                    <h3 className="text-xl font-bold tracking-wider font-sans mb-5 border-b border-[#e9e8e7] pb-3">
                      {svc.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#1b1c1c] mb-4">
                      {svc.desc}
                    </p>
                    <p className="text-xs leading-relaxed text-[#444748] bg-[#f5f3f3] p-4 border border-[#e9e8e7] font-sans">
                      {svc.details}
                    </p>
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => setActiveDetail(null)}
                        className="border border-[#1b1c1c] text-xs font-mono uppercase tracking-widest px-6 py-2 bg-black text-white hover:bg-transparent hover:text-black transition-colors"
                      >
                        Acknowledge
                      </button>
                    </div>
                  </div>
                ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
