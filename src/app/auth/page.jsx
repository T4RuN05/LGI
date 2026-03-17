// frontend/src/app/auth/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";

const blurReveal = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
  visible: (delay = 0) => ({
    opacity: 1, filter: "blur(0px)", y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
};

const inputCls =
  "w-full px-4 py-3 border border-[#e0dad2] rounded-lg bg-[#ebe2db] text-xs md:text-sm text-[#2D2319] placeholder-[#c4bbb2] outline-none focus:border-[#2D2319] focus:ring-2 focus:ring-[#2D2319]/10 transition box-border font-[inherit]";
const labelCls = "block text-xs text-[#7a6e65] mb-1.5 tracking-wide";
const btnCls =
  "w-full py-3 mt-2 border-[1.5px] border-[#2D2319] rounded-lg bg-transparent text-xs font-bold tracking-[0.16em] uppercase text-[#2D2319] cursor-pointer font-[inherit] transition duration-300 hover:bg-[#2D2319] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed";
const googleCls =
  "w-full flex items-center justify-center gap-3 py-3 border-[1.5px] border-[#ddd7d0] rounded-lg bg-transparent text-xs font-medium tracking-wide text-[#2D2319] no-underline font-[inherit] transition duration-300 hover:bg-[#2D2319] hover:text-white hover:border-[#2D2319]";
const switchBtnCls =
  "underline text-[#2D2319] text-xs bg-transparent border-none p-0 cursor-pointer font-[inherit] transition hover:opacity-60";

// FormCard is defined OUTSIDE AuthPage — prevents remount on every parent re-render
function FormCard({
  isRegister, t,
  loginForm, registerForm,
  handleLoginChange, handleRegisterChange,
  handleLoginSubmit, handleRegisterSubmit,
  loading, showPassword, setShowPassword, switchMode,
}) {
  return (
    <div className="w-full max-w-[420px] bg-[#f2f1ec] rounded-2xl px-6 py-8 lg:px-10 lg:py-10 shadow-[0_8px_48px_rgba(45,35,25,0.11)] box-border">
      <h1 className="text-[1.4rem] font-bold tracking-[0.18em] text-center text-[#2D2319] uppercase mb-7">
        {isRegister ? t("register") : t("login")}
      </h1>
      <form onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit} className="flex flex-col gap-4">
        {isRegister && (
          <div>
            <label className={labelCls}>{t("fullName")}</label>
            <input type="text" name="name" placeholder={t("enterYourName")}
              value={registerForm.name} onChange={handleRegisterChange}
              required className={inputCls} />
          </div>
        )}
        <div>
          <label className={labelCls}>{t("email")}</label>
          <input type="email" name="email" placeholder={t("enterYourEmail")}
            value={isRegister ? registerForm.email : loginForm.email}
            onChange={isRegister ? handleRegisterChange : handleLoginChange}
            required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{t("password")}</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} name="password"
              placeholder={isRegister ? t("createPassword") : t("enterYourPassword")}
              value={isRegister ? registerForm.password : loginForm.password}
              onChange={isRegister ? handleRegisterChange : handleLoginChange}
              required className={inputCls + " pr-10"} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a8e84] bg-transparent border-none p-0 cursor-pointer flex items-center">
              {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={loading} className={btnCls}>
          {loading
            ? (isRegister ? t("registering") : t("loggingIn"))
            : (isRegister ? t("register") : t("logIn"))}
        </button>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#ddd7d0]" />
          <span className="text-[11px] text-[#a09488]">{t("or")}</span>
          <div className="flex-1 h-px bg-[#ddd7d0]" />
        </div>
        <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`} className={googleCls}>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-4 h-4" />
          {t("continueWithGoogle")}
        </a>
      </form>
      <p className="mt-5 text-center text-xs text-[#7a6e65]">
        {isRegister ? t("alreadyHaveAccount") : t("newUser")}
        <button className={switchBtnCls}
          onClick={() => { setShowPassword(false); switchMode(isRegister ? "login" : "register"); }}>
          {isRegister ? t("loginHere") : t("createAccount")}
        </button>
      </p>
    </div>
  );
}

export default function AuthPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useLocale();
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);

  const [mode, setMode] = useState("login");
  const [transitioning, setTransitioning] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  
if (isMobile) {
  return (
    <div className="min-h-screen bg-[#ebe2db] flex items-center justify-center px-4">
      <FormCard
        isRegister={mode === "register"}
        t={t}
        loginForm={loginForm}
        registerForm={registerForm}
        handleLoginChange={handleLoginChange}
        handleRegisterChange={handleRegisterChange}
        handleLoginSubmit={handleLoginSubmit}
        handleRegisterSubmit={handleRegisterSubmit}
        loading={loading}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        switchMode={switchMode}
      />
    </div>
  );
}

  const isLogin = mode === "login";

  const switchMode = (next) => {
    setTransitioning(true);
    setMode(next);
    setTimeout(() => setTransitioning(false), 750);
  };

  const handleLoginChange = (e) => setLoginForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleRegisterChange = (e) => setRegisterForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) { toast.error(t("fillAllFields")); return; }
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "include", body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message || t("invalidCredentials")); return; }
      login(data); toast.success(t("loginSuccess")); router.push("/");
    } catch { toast.error(t("somethingWrong")); }
    finally { setLoading(false); }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) { toast.error(t("allFieldsRequired")); return; }
    if (registerForm.password.length < 6) { toast.error(t("passwordMinLength")); return; }
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message || t("registrationFailed")); return; }
      toast.success(t("registeredSuccess")); setMode("login");
    } catch { toast.error(t("somethingWrong")); }
    finally { setLoading(false); }
  };

  const sharedCardProps = {
    t, loginForm, registerForm,
    handleLoginChange, handleRegisterChange,
    handleLoginSubmit, handleRegisterSubmit,
    loading, showPassword, setShowPassword, switchMode,
  };

  const panelColor = "#f2f1ec";

  const animStyles = `
    .slide-panel { transition: left .75s cubic-bezier(.77,0,.175,1); }

    .login-card-active   { left: 60%; opacity: 1; pointer-events: auto;
                           transition: left .75s cubic-bezier(.77,0,.175,1), opacity .35s ease .4s; }
    .login-card-inactive { left: 40%; opacity: 1; pointer-events: none;
                           transition: left .75s cubic-bezier(.77,0,.175,1); }

    .reg-card-active     { left: 0%;  opacity: 1; pointer-events: auto;
                           transition: left .75s cubic-bezier(.77,0,.175,1), opacity .35s ease .4s; }
    .reg-card-inactive   { left: 10%; opacity: 1; pointer-events: none;
                           transition: left .75s cubic-bezier(.77,0,.175,1); }
  `;

  return (
    <>
      <style>{animStyles}</style>
      <div
        className="relative overflow-hidden bg-[#ebe2db] flex items-stretch"
        style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", minHeight: "calc(100vh - 120px)", marginTop: 0 }}
      >
        {/* ── SLIDING PANEL ── */}
        <div className={`slide-panel absolute top-0 h-full w-[60%] z-[2] ${isLogin ? "left-0" : "left-[40%]"}`}>
          <div className="absolute inset-0 bg-[#f2f1ec]" />

          {/* Right curve */}
          <div className="absolute top-0 h-full z-[3] pointer-events-none overflow-hidden" style={{ right: "-40px", width: "40px" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "100%", filter: "drop-shadow(3px 0 5px rgba(45,35,25,0.18))" }}>
              <svg viewBox="0 0 80 100" preserveAspectRatio="none" style={{ width: "80px", height: "100%", position: "absolute", right: 0 }}>
                <path d="M 0 0 L 40 0 Q 80 50 40 100 L 0 100 Z" fill={panelColor} />
              </svg>
            </div>
          </div>

          {/* Left curve */}
          <div className="absolute top-0 h-full z-[3] pointer-events-none overflow-hidden" style={{ left: "-40px", width: "40px" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "80px", height: "100%", filter: "drop-shadow(-3px 0 5px rgba(45,35,25,0.18))" }}>
              <svg viewBox="0 0 80 100" preserveAspectRatio="none" style={{ width: "80px", height: "100%", position: "absolute", left: 0 }}>
                <path d="M 80 0 L 40 0 Q 0 50 40 100 L 80 100 Z" fill={panelColor} />
              </svg>
            </div>
          </div>

          {/* Idol + logo */}
          <div className="absolute inset-0 flex flex-row items-center justify-center gap-[4%] px-[8%] pointer-events-none z-[4]">
            <motion.img
              src="https://res.cloudinary.com/dc2qtmg05/image/upload/v1772379811/Untitled_design_39_amblox.png"
              alt="Lord Ganesha"
              className="h-auto object-contain min-w-0"
              style={{ width: "clamp(220px, 38%, 600px)", filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.16))" }}
              variants={blurReveal} initial="hidden" animate="visible" custom={0.1}
            />
            <motion.img
              src="https://res.cloudinary.com/dijssimbb/image/upload/v1771186076/LGI_1_awfgfe.png"
              alt="Lord Ganesha Impex"
              className="h-auto object-contain opacity-90 min-w-0"
              style={{ width: "clamp(90px, 28%, 400px)" }}
              variants={blurReveal} initial="hidden" animate="visible" custom={0.25}
            />
          </div>
        </div>

        {/* ── LOGIN card ── */}
        <motion.div
          className={`absolute top-0 h-full w-[40%] flex items-center justify-center px-3 md:px-6 lg:px-8 box-border overflow-y-auto ${isLogin ? "login-card-active" : "login-card-inactive"}`}
          style={{ zIndex: transitioning ? 1 : (isLogin ? 3 : 1) }}
          variants={blurReveal} initial="hidden" animate="visible" custom={0.4}
        >
          <FormCard isRegister={false} {...sharedCardProps} />
        </motion.div>

        {/* ── REGISTER card ── */}
        <div
          className={`absolute top-0 h-full w-[40%] flex items-center justify-center px-3 md:px-6 lg:px-8 box-border overflow-y-auto ${!isLogin ? "reg-card-active" : "reg-card-inactive"}`}
          style={{ zIndex: transitioning ? 1 : (!isLogin ? 3 : 1) }}
        >
          <FormCard isRegister={true} {...sharedCardProps} />
        </div>

      </div>
    </>
  );
}