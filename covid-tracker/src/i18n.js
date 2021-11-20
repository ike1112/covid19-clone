import i18n from "i18next";
import { initReactI18next } from "react-i18next";
 import Backend from "i18next-xhr-backend";
import LanguageDetector  from "i18next-browser-languagedetector";


/**
 * Here we can specify the languages that we want to support.
 */


const fallbackLng = ['en'];
const availableLanguages = ['en', 'zh'];

i18n.use(Backend)
    .use(LanguageDetector )
    .use(initReactI18next)
    .init({
        fallbackLng,
        detection: {
            checkWhitelist: true
        },
        debug: false,
        whitelist: availableLanguages,
        interpolation: {
            escapeValue: false // no need for react. it escapes by default
        }
    })
