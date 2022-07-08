import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, ar } from "./translations/translations";
import languageDetectorPlugin from "./translations/utils/languageDetection.js";
import "intl-pluralrules";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
	.use(initReactI18next)
	.use(languageDetectorPlugin)
	.init({
		fallbackLng: "en",
		debug: true,
		resources: {
			en: { translation: en },
			ar: { translation: ar },
		},
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
	});

export default i18n;
