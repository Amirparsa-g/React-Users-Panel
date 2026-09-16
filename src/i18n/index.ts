import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// وارد کردن فایل‌های ترجمه
import enTranslation from "./locales/en.json";
import faTranslation from "./locales/fa.json";

const resources = {
  en: { translation: enTranslation },
  fa: { translation: faTranslation },
};

i18n
  .use(initReactI18next) // اتصال به ریکت
  .init({
    resources,
    lng: localStorage.getItem("lng") ?? "en", // همون زبان پیش‌فرضی که درست حدس زدی
    fallbackLng: "en", // اگر کلیدی در زبان فارسی پیدا نشد، معادل انگلیسی‌اش رو نشون بده
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
