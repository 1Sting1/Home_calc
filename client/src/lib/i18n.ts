import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./translations";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "ru", // default language
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false, // not needed for React
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
