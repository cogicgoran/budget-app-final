import styles from "./language.module.scss";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { ChangeEvent } from "react";
import { englishDictionary } from "../../config/languages/en";
import { frenchDictionary } from "../../config/languages/fr";

const prefLanguage = getPreferedLanguage() || "en";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: englishDictionary },
    fr: { translation: frenchDictionary },
  },
  lng: prefLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function Language() {
  function languageChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
    i18next.changeLanguage(event.target.value);
    document.cookie = `language=${event.target.value}; expires=Tue, 19 Jan 2038 03:14:07 UTC`;
  }

  return (
    <div className={styles.appLanguage}>
      <select
        name="language"
        id=""
        defaultValue={prefLanguage}
        onChange={languageChangeHandler}
      >
        <option value="en">ENG</option>
        <option value="fr">FRA</option>
      </select>
    </div>
  );
}

export function getPreferedLanguage() {
  const cookiesSplit = window.document.cookie.split("; ");
  const cookies: any = {};

  cookiesSplit.forEach((cookie) => {
    const array = cookie.split("=");
    const key = array[0];
    const value = array[1];
    cookies[key] = value;
  });
  return cookies.language || "en";
}

export default Language;
