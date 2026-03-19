"use client";

import { useLocale } from "@/context/LocaleContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

export default function LanguageCurrencyPopup({ onClose, anchorRef }) {
  const { language, currency, rates, updateLanguage, updateCurrency, t } =
    useLocale();

  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(language);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);
  const [desktopRight, setDesktopRight] = useState(16);
  const [desktopTop, setDesktopTop] = useState(80);
  const [isMobile, setIsMobile] = useState(false);

  const currencyOptions = Object.keys(rates || {});

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    if (!mobile && anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setDesktopRight(window.innerWidth - rect.right);
      setDesktopTop(rect.bottom + 8);
    }

    const handleScroll = () => {
      if (!mobile && anchorRef?.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        setDesktopRight(window.innerWidth - rect.right);
        setDesktopTop(rect.bottom + 8);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [anchorRef]);

  const handleSave = () => {
    updateLanguage(selectedLang);
    updateCurrency(selectedCurrency);
    toast.success(t("preferencesUpdated") || "Preferences updated");
    onClose();
    router.refresh();
  };

  // Navbar is sticky with my-[1rem] (16px top margin) and 70px height
  // So on mobile the navbar bottom is always at ~102px from viewport top
  const MOBILE_TOP = 102;

  const popup = (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        ...(isMobile
          ? {
              top: 78, // shifted up from 102
              left: 12,
              right: 12,
              width: 340, // same as desktop
              margin: "0 auto",
            }
          : {
              top: desktopTop,
              right: desktopRight,
              width: 340,
            }),
      }}
      className="bg-[#F2F1EC]/80 border border-black/10 shadow-2xl rounded-lg p-4 md:p-6"
    >
      {/* Header */}
      <h3 className="text-lg font-medium mb-1">
        {t("setLanguageCurrency") || "Set language and currency"}
      </h3>

      <p className="text-sm text-gray-500 mb-5">
        {t("updateAnytime") ||
          "Select your preferred language and currency. You can update the settings at any time."}
      </p>

      <div className="space-y-5">
        {/* Language */}
        <div>
          <label className="text-sm font-medium">
            {t("language") || "Language"}
          </label>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="w-full mt-2 bg-white/60 border border-black/20
                       p-3 text-sm focus:outline-none focus:border-black transition"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="nl">Dutch</option>
            <option value="tr">Turkish</option>
            <option value="ru">Russian</option>
          </select>
        </div>

        {/* Currency */}
        <div>
          <label className="text-sm font-medium">
            {t("currency") || "Currency"}
          </label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="w-full mt-2 bg-white/60 border border-black/20
                       p-3 text-sm focus:outline-none focus:border-black transition"
          >
            {currencyOptions.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full mt-4 bg-black text-white
            py-3 text-sm tracking-wide hover:bg-[#2D2319] transition"
        >
          {t("save") || "Save"}
        </button>
      </div>
    </div>
  );

  return createPortal(popup, document.body);
}
