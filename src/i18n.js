import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./language/uz.json";
import ru from "./language/ru.json";
import en from "./language/en.json";

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: localStorage.getItem("lang") || "uz",
  fallbackLng: "uz",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
