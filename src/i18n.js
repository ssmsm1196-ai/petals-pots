import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationAR from "./locales/ar/translation.json";

// المحتوى
const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

// إعداد اللغات
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // اللغة الافتراضية
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
