"use client";

import { useLocale } from "@/context/LocaleContext";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LanguageCurrencyPopup({ onClose }) {
  const { language, currency, rates, updateLanguage, updateCurrency, t } =
    useLocale();

  const router = useRouter();
  const popupRef = useRef(null);

  const [selectedLang, setSelectedLang] = useState(language);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const currencyOptions = Object.keys(rates || {});

  const handleSave = () => {
    updateLanguage(selectedLang);
    updateCurrency(selectedCurrency);

    toast.success(t("preferencesUpdated") || "Preferences updated");

    onClose();

    // Refresh the current page
    router.refresh();
  };

  return (
    <div
      ref={popupRef}
      className="fixed md:absolute right-2 md:right-0 top-[80px] md:top-[120%] 
      w-[92vw] max-w-[340px]
      z-[999] 
      bg-[var(--component-bg)]
      border border-black/10
      shadow-2xl rounded-lg
      p-4 md:p-6"
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
            className="w-full mt-2 bg-white border border-black/20
                       p-3 text-sm focus:outline-none
                       focus:border-black transition"
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
            className="w-full mt-2 bg-white border border-black/20
                       p-3 text-sm focus:outline-none
                       focus:border-black transition"
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
          className="w-full mt-4
            bg-black text-white
            py-3 text-sm tracking-wide
            hover:bg-[#2D2319]
            transition"
        >
          {t("save") || "Save"}
        </button>
      </div>
    </div>
  );
}
