import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowLeft, RefreshCw, Sparkles, Printer, ShoppingBag } from "lucide-react";
import { QUIZ_QUESTIONS, generateScentFormula } from "../data";

interface LabFormulationQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomToCart: (item: {
    id: string;
    name: string;
    labelFor: string;
    labelDate: string;
    labelAt: string;
    price: number;
    image: string;
    isCustomFormulation: boolean;
  }) => void;
}

export default function LabFormulationQuiz({ isOpen, onClose, onAddCustomToCart }: LabFormulationQuizProps) {
  if (!isOpen) return null;

  const [step, setStep] = useState<"name" | "questions" | "formulating" | "result">("name");
  const [userName, setUserName] = useState("");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // Formulation outcomes elements from backend / fallback
  const [loadingStepText, setLoadingStepText] = useState("조향 준비 중...");
  const [formulationResult, setFormulationResult] = useState<any>(null);
  const [isLoadingScent, setIsLoadingScent] = useState(false);

  // Question helpers
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleNextQuestion = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      runBlendingSimulation();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    } else {
      setStep("name");
    }
  };

  const selectOption = (questionId: string, optionValue: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionValue }));
  };

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // Simulated laboratory synthesis animation sequence before rendering results
  const runBlendingSimulation = async () => {
    setStep("formulating");
    setIsLoadingScent(true);

    const simulationSteps = [
      "🔬 디지털 정밀 분주기 초기화 중...",
      "🧪 식물 농도 측정 중...",
      "🧬 에센스 기반 혼합 전 준비 중...",
      "⚗️ 진공 압력 하에서 배치 여과 중...",
      "🖨️ 라벨링용 아날로그 프린터 준비 중..."
    ];

    // Trigger full API request in parallel
    const apiPromise = fetch("/api/formulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName || "GUEST", answers })
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error("API Error - running local synthesis fallback:", err);
        return null;
      });

    // Run typewriter visual simulation stages
    for (let i = 0; i < simulationSteps.length; i++) {
      setLoadingStepText(simulationSteps[i]);
      await delay(800);
    }

    const apiResponse = await apiPromise;
    setIsLoadingScent(false);

    if (apiResponse) {
      const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, "/");
      // Format response to conform to UI representation
      setFormulationResult({
        formulaId: `LAB-${Math.floor(100 + Math.random() * 899)}`,
        baseScent: apiResponse.scentName,
        archetype: apiResponse.archetype,
        concentration: "23.4% (EAU DE PARFUM)",
        ingredients: [
          { name: apiResponse.topNotes[0], percentage: "25%" },
          { name: apiResponse.heartNotes[0], percentage: "15%" },
          { name: apiResponse.baseNotes[0], percentage: "15%" },
          { name: "Organic Emulsion Core (SOHO-9 Base)", percentage: "45%" }
        ],
        wearAdvice: apiResponse.advice || apiResponse.story,
        labelName: userName.toUpperCase(),
        dateCreated: currentDate,
        location: "SOHO LAB, NEW YORK",
        notes: apiResponse.story
      });
    } else {
      // Offline fallback
      const localBlend = generateScentFormula(answers, userName || "GUEST");
      setFormulationResult(localBlend);
    }

    setStep("result");
  };

  const handleAddToCart = () => {
    if (!formulationResult) return;
    onAddCustomToCart({
      id: `custom-${formulationResult.formulaId}`,
      name: formulationResult.baseScent,
      labelFor: formulationResult.labelName,
      labelDate: formulationResult.dateCreated,
      labelAt: formulationResult.location,
      price: 440000,
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      isCustomFormulation: true
    });
    onClose();
  };

  const resetQuiz = () => {
    setUserName("");
    setAnswers({});
    setCurrentQuestionIdx(0);
    setFormulationResult(null);
    setStep("name");
  };

  return (
    <div id="quiz-full-viewport" className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#fbf9f9] border border-[#dbdad9] max-w-xl w-full p-8 shadow-2xl flex flex-col justify-between overflow-hidden h-auto max-h-[90vh]"
      >
        {/* Close icon button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#747878] hover:text-black hover:rotate-90 transition-all cursor-pointer pointer-events-auto"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Transition elements */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Enter User Name */}
          {step === "name" && (
            <motion.div
              key="step-name"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6 flex flex-col justify-between h-full"
            >
              <div className="space-y-6">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#747878]">
                    가상 향기 탐색
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-[#1b1c1c] mt-2">
                    조향 시작하기
                  </h3>
                  <p className="text-xs text-[#444748] mt-3 font-light leading-relaxed">
                    조향 단계를 개시합니다. 세상에 존재하지 않았던 당신만을 위한 고유한 향을 만들기 위해, 아래에 라벨에 새겨질 이름을 입력해주세요.
                  </p>
                </div>

                <div className="space-y-2 pt-4">
                  <label htmlFor="quiz-name-input" className="text-[10px] font-mono uppercase tracking-widest text-[#1b1c1c] font-bold block">
                    이름 / 라벨
                  </label>
                  <input
                    id="quiz-name-input"
                    type="text"
                    maxLength={15}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="예: ELEANOR"
                    className="w-full bg-[#fbf9f9] border border-[#dbdad9] focus:border-black font-mono tracking-widest text-[#1b1c1c] focus:outline-none focus:ring-0 p-3.5 text-sm uppercase"
                  />
                  <span className="text-[9px] font-mono text-[#747878] block text-right">
                    {15 - userName.length} 글자 남음
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  disabled={!userName.trim()}
                  onClick={() => setStep("questions")}
                  className="bg-black text-white hover:bg-neutral-800 disabled:bg-[#efeded] disabled:text-[#747878] py-3.5 px-8 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center"
                >
                  프로필 구성
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Evocative Questionnaire */}
          {step === "questions" && (
            <motion.div
              key="step-questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-4 flex flex-col justify-between h-full"
            >
              <div>
                {/* Progress Indicators */}
                <div className="flex items-center justify-between border-b border-[#e9e8e7] pb-3 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#747878]">
                    질문 {currentQuestionIdx + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="flex gap-1.5">
                    {QUIZ_QUESTIONS.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-4 h-1 transition-colors ${
                          idx === currentQuestionIdx ? "bg-black" : "bg-[#efeded]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question and custom selector options */}
                <div className="space-y-4">
                  <h4 className="text-base font-semibold tracking-tight text-[#1b1c1c] font-sans">
                    {currentQuestion.question}
                  </h4>

                  <div className="space-y-2.5 pt-2">
                    {currentQuestion.options.map((opt) => (
                      <button
                        key={opt.value}
                        id={`quiz-option-${opt.value}`}
                        onClick={() => selectOption(currentQuestion.id, opt.value)}
                        className={`w-full p-4 border text-left transition-all duration-300 font-sans cursor-pointer group flex items-start gap-3.5 relative ${
                          answers[currentQuestion.id] === opt.value
                            ? "border-black bg-white shadow-sm"
                            : "border-[#dbdad9] bg-transparent hover:border-black/60"
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 border rounded-full mt-1 flex items-center justify-center transition-all ${
                            answers[currentQuestion.id] === opt.value
                              ? "border-black bg-black scale-105"
                              : "border-[#747878] bg-transparent group-hover:scale-105"
                          }`}
                        >
                          {answers[currentQuestion.id] === opt.value && (
                            <span className="w-1.5 h-1.5 bg-white rounded-full" />
                          )}
                        </span>
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-[#1b1c1c]">
                            {opt.label}
                          </span>
                          <span className="block text-[10px] text-[#747878] mt-1 uppercase font-mono tracking-tight leading-normal">
                            {opt.description}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation row */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={handlePrevQuestion}
                  className="border border-[#dbdad9] text-[#1b1c1c] hover:bg-neutral-100 py-3 px-6 font-mono text-xs uppercase tracking-widest cursor-pointer flex items-center"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-2" />
                  이전
                </button>
                <button
                  disabled={!answers[currentQuestion.id]}
                  onClick={handleNextQuestion}
                  className="bg-black text-white hover:bg-neutral-800 disabled:bg-[#efeded] disabled:text-[#747878] py-3.5 px-8 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center"
                >
                  {currentQuestionIdx === QUIZ_QUESTIONS.length - 1 ? "향기 생성" : "다음"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Automated Synthesis Visual Simulator */}
          {step === "formulating" && (
            <motion.div
              key="step-formulating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center flex flex-col items-center justify-center space-y-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                className="w-12 h-12 border-2 border-dashed border-black rounded-full mb-4 flex items-center justify-center font-mono text-[9px] text-gray-500 font-bold"
              >
                🔬
              </motion.div>

              <span className="text-[10px] font-mono tracking-[0.2em] text-[#747878] uppercase">
                합성 파이프라인 작동 중
              </span>
              <p className="text-xs font-mono font-bold tracking-widest text-[#1b1c1c] max-w-sm font-bold uppercase transition-all duration-300">
                {loadingStepText}
              </p>
              <div className="w-44 h-[2px] bg-[#efeded] mx-auto overflow-hidden relative">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-2/3 bg-[#1b1c1c]"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 4: Beautiful Typewritten Scent Result */}
          {step === "result" && formulationResult && (
            <motion.div
              key="step-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-2 flex flex-col justify-between h-full"
            >
              <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-1 scrollbar-thin">
                <div className="text-center">
                  <span className="text-[9px] font-mono tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200/50 py-1 px-3 uppercase rounded-full">
                    ✔ 조향이 완료되었습니다
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-black uppercase mt-3.5 mb-1 text-center font-sans">
                    {formulationResult.baseScent}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#747878]">
                    아키타입: {formulationResult.archetype}
                  </span>
                </div>

                {/* Styled replica of full lab paper label */}
                <div className="bg-[#f0ece5]/90 border border-[#b2afaa] p-5 font-mono text-[9px] text-[#222] select-text uppercase shadow-inner relative">
                  <div className="absolute top-3.5 right-4 font-bold text-black border border-black/30 px-1 py-0.5 rounded-[1px] text-[8px]">
                    {formulationResult.formulaId}
                  </div>
                  <div className="border-b border-[#b2afaa] pb-2 font-bold tracking-wider text-black text-center text-[10px]">
                    에센스 연구 기록
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 pb-3 border-b border-[#b2afaa]/60">
                    <div>
                      <span className="text-gray-500 block text-[7px] font-semibold">배치 번호:</span>
                      <span className="font-bold text-black">{formulationResult.formulaId}-RAW-2026</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[7px] font-semibold">농도:</span>
                      <span className="font-bold text-black">{formulationResult.concentration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[7px] font-semibold">원산지:</span>
                      <span className="font-bold text-[#444748]">{formulationResult.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[7px] font-semibold">제조일:</span>
                      <span className="font-bold text-[#444748]">{formulationResult.dateCreated}</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5 pb-3.5 border-b border-[#b2afaa]/60">
                    <span className="text-gray-500 block text-[7px] font-semibold">원료 구성 비율:</span>
                    {formulationResult.ingredients.map((ing: any) => (
                      <div key={ing.name} className="flex justify-between font-mono">
                        <span className="text-[#333] font-medium">{ing.name}</span>
                        <span className="font-bold text-black">{ing.percentage}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 leading-normal">
                    <span className="text-gray-500 block text-[7px] font-semibold">향기 서사:</span>
                    <p className="mt-1 normal-case leading-relaxed font-sans text-[10.5px] tracking-wide text-[#333] font-light">
                      {formulationResult.notes}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-[#b2afaa] pt-2.5 text-center text-[7px] text-gray-500 select-none">
                    * HAND-BOTTLED FRESH IN OUR NYC COMPLEX LAB COUNTER *
                  </div>
                </div>

                {/* Scent integration wearer review block */}
                <div className="bg-[#f5f3f3] p-4 text-[11px] leading-relaxed border border-[#dbdad9] font-light text-[#444748]">
                  <strong className="text-xs text-[#1b1c1c] font-semibold block mb-1">착용 안내:</strong>
                  {formulationResult.wearAdvice}
                </div>
              </div>

              {/* Reset/Checkout Buttons */}
              <div className="mt-8 pt-4 border-t border-[#e9e8e7] flex items-center justify-between gap-4 font-mono">
                <button
                  onClick={resetQuiz}
                  className="flex items-center text-[#747878] hover:text-black underline underline-offset-4 text-xs tracking-wider cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  다시 조향하기
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white hover:bg-neutral-800 transition-colors py-3.5 px-6 text-xs uppercase tracking-widest font-semibold flex items-center cursor-pointer font-bold"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  맞춤 보틀 주문하기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
