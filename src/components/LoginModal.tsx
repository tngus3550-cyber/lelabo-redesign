import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User, CheckCircle2, ShieldAlert } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  if (!isOpen) return null;

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Reset state on open/close
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setName("");
  }, [isRegister, isOpen]);

  const handleDemoLogin = () => {
    const demoUser = { name: "HELENA", email: "helena@lab.lelabo" };
    localStorage.setItem("essence-lab-user", JSON.stringify(demoUser));
    onLoginSuccess(demoUser);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    if (isRegister) {
      if (!name) {
        setError("이름을 입력해 주세요.");
        return;
      }

      // Read existing users list
      const existingUserStr = localStorage.getItem("essence-lab-accounts") || "[]";
      let accounts = [];
      try {
        accounts = JSON.parse(existingUserStr);
      } catch (err) {
        accounts = [];
      }

      const userExists = accounts.some((acc: any) => acc.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        setError("이미 가입된 이메일 계정입니다.");
        return;
      }

      const newAccount = { name: name.toUpperCase(), email, password };
      accounts.push(newAccount);
      localStorage.setItem("essence-lab-accounts", JSON.stringify(accounts));
      
      setSuccess("가입 성공! 가입하신 정보로 로그인합니다.");
      setTimeout(() => {
        // Auto sign in
        localStorage.setItem("essence-lab-user", JSON.stringify({ name: name.toUpperCase(), email }));
        onLoginSuccess({ name: name.toUpperCase(), email });
        onClose();
      }, 1200);

    } else {
      // Login flow
      // 1. Check demo/staff accounts
      if (email === "helena@lab.lelabo" && password === "santal33") {
        const demoUser = { name: "HELENA", email };
        localStorage.setItem("essence-lab-user", JSON.stringify(demoUser));
        onLoginSuccess(demoUser);
        onClose();
        return;
      }

      // 2. Check local registered accounts
      const existingUserStr = localStorage.getItem("essence-lab-accounts") || "[]";
      let accounts = [];
      try {
        accounts = JSON.parse(existingUserStr);
      } catch (err) {
        accounts = [];
      }

      const matchedAccount = accounts.find(
        (acc: any) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
      );

      if (matchedAccount) {
        setSuccess("로그인 성공!");
        setTimeout(() => {
          const matchedUser = { name: matchedAccount.name, email: matchedAccount.email };
          localStorage.setItem("essence-lab-user", JSON.stringify(matchedUser));
          onLoginSuccess(matchedUser);
          onClose();
        }, 800);
      } else {
        setError("일치하는 계정 정보가 없습니다. (데모 로그인은 비번 입력 없이 '테스터 데모 로그인'을 클릭하세요)");
      }
    }
  };

  return (
    <div id="login-modal-viewport" className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-md w-full border border-[#dbdad9] p-8 shadow-2xl overflow-hidden pointer-events-auto"
        style={{
          backgroundImage: "url('/src/assets/images/speckled_paper_1780458430027.png')",
          backgroundSize: "350px",
          backgroundRepeat: "repeat",
          backgroundColor: "#fbf9f9"
        }}
      >
        {/* Decorative corner tag matching Le Labo lab aesthetics */}
        <div className="absolute top-0 right-0 bg-[#1b1c1c] text-white text-[7px] font-mono tracking-[0.2em] px-3.5 py-1 uppercase select-none">
          LAB GUEST REGISTRY
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-[#747878] hover:text-black hover:scale-110 transition-transform cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title block */}
        <div className="text-center mt-6 mb-8">
          <span className="text-[9px] font-mono tracking-[0.3em] text-[#747878] uppercase block">
            {isRegister ? "Join the Lab Directory" : "Access Your Olfactory Account"}
          </span>
          <h3 className="text-xl font-bold text-[#1b1c1c] tracking-wider uppercase mt-1">
            {isRegister ? "REGISTER GUEST" : "LOG IN"}
          </h3>
          <div className="w-12 h-[1px] bg-[#1b1c1c] mx-auto mt-3" />
        </div>

        {/* Feedback Messages */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mb-5 bg-red-50 border border-red-200 text-[11px] text-red-700 py-2.5 px-3 font-mono flex items-center gap-2"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mb-5 bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 py-2.5 px-3 font-mono flex items-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#747878] block">
                LAB GUEST NAME
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-[#a3a19f]" />
                <input
                  type="text"
                  placeholder="e.g. EMMA"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/70 border border-[#dbdad9] focus:border-black tracking-widest font-mono text-xs uppercase pl-10 pr-4 py-3 outline-none transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#747878] block">
              EMAIL ID
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-[#a3a19f]" />
              <input
                type="email"
                placeholder="EMMA@EXAMPLE.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/70 border border-[#dbdad9] focus:border-black font-mono text-xs pl-10 pr-4 py-3 outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 font-mono">
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#747878] block">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-[#a3a19f]" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/70 border border-[#dbdad9] focus:border-black text-xs pl-10 pr-4 py-3 outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-black text-white hover:bg-neutral-800 py-3.5 tracking-widest font-mono text-xs uppercase font-bold transition-all flex items-center justify-center cursor-pointer shadow-sm"
          >
            {isRegister ? "Complete Laboratory Account" : "Access Laboratory Account"}
          </button>
        </form>

        {/* Dynamic switcher & Helper */}
        <div className="mt-6 flex justify-between items-center text-[10px] text-[#747878] font-sans border-t border-[#dbdad9]/60 pt-4">
          <span>
            {isRegister ? "이미 계정이 있으신가요?" : "처음 방문이신가요?"}
          </span>
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-bold underline text-black hover:text-[#747878] transition-colors cursor-pointer"
          >
            {isRegister ? "로그인하기" : "회원가입하기"}
          </button>
        </div>

        {/* Simulated quick testing / Demo section */}
        {!isRegister && (
          <div className="mt-4 border-t border-dashed border-[#dbdad9] pt-4 text-center">
            <p className="text-[9px] font-mono text-[#a3a19f] uppercase mb-2">
              OR FOR IMMEDIATE EVALUATION
            </p>
            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full py-2 border border-black/30 text-black hover:bg-black hover:text-white transition-all font-mono text-[9px] uppercase tracking-wider cursor-pointer"
            >
              테스터 데모 로그인 (HELENA로 간편 로그인)
            </button>
          </div>
        )}

        {/* Micro-label footer */}
        <div className="mt-8 text-center text-[7px] font-mono text-[#a3a19f] uppercase tracking-widest">
          SOHO NY — ESTABLISHED 2006
        </div>
      </motion.div>
    </div>
  );
}
