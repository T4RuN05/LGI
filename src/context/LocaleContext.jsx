"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState({ USD: 1 });
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    const savedCurrency = localStorage.getItem("currency") || "USD";

    setLanguage(savedLang);
    setCurrency(savedCurrency);
  }, []);

  useEffect(() => {
    async function loadMessages() {
      const msgs = await import(`../../messages/${language}.json`);
      setMessages(msgs.default);
    }
    loadMessages();
  }, [language]);

  useEffect(() => {
    async function fetchRates() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/exchange-rates`
      );
      const data = await res.json();
      if (data?.rates) setRates(data.rates);
    }
    fetchRates();
  }, []);

  const updateLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const updateCurrency = (cur) => {
    setCurrency(cur);
    localStorage.setItem("currency", cur);
  };

  const t = (key) => messages[key] || key;

  return (
    <LocaleContext.Provider
      value={{
        language,
        currency,
        rates,
        updateLanguage,
        updateCurrency,
        t,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);