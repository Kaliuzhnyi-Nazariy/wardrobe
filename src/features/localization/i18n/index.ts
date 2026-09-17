import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import pl from "./pl.json";
import ru from "./ru.json";
import ua from "./ua.json";

const systemLanguage = Localization.getLocales()[0]?.languageCode ?? "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pl: { translation: pl },
    uk: { translation: ua },
    ru: { translation: ru },
  },
  lng: systemLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
