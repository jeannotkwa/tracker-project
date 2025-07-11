"use client"

import { useState, useEffect, useCallback } from "react"
import type { Language, Translations } from "@/lib/i18n/translations"
import { getTranslation, detectLanguage } from "@/lib/i18n/translations"

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("fr")
  const [translations, setTranslations] = useState<Translations>(getTranslation("fr"))

  // Charger la langue sauvegardée
  useEffect(() => {
    const savedLanguage = localStorage.getItem("constructpro-language") as Language
    if (savedLanguage && ["fr", "en", "es"].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage)
      setTranslations(getTranslation(savedLanguage))
    } else {
      // Détecter la langue du navigateur
      const browserLanguage = navigator.language.split("-")[0] as Language
      if (["fr", "en", "es"].includes(browserLanguage)) {
        setCurrentLanguage(browserLanguage)
        setTranslations(getTranslation(browserLanguage))
      }
    }
  }, [])

  // Changer de langue
  const changeLanguage = useCallback((language: Language) => {
    setCurrentLanguage(language)
    setTranslations(getTranslation(language))
    localStorage.setItem("constructpro-language", language)
  }, [])

  // Détecter automatiquement la langue d'un message
  const detectMessageLanguage = useCallback((message: string) => {
    return detectLanguage(message)
  }, [])

  // Obtenir le nom de la langue
  const getLanguageName = useCallback((language: Language) => {
    const names = {
      fr: "Français",
      en: "English",
      es: "Español",
    }
    return names[language]
  }, [])

  // Obtenir le drapeau de la langue
  const getLanguageFlag = useCallback((language: Language) => {
    const flags = {
      fr: "🇫🇷",
      en: "🇬🇧",
      es: "🇪🇸",
    }
    return flags[language]
  }, [])

  return {
    currentLanguage,
    translations,
    changeLanguage,
    detectMessageLanguage,
    getLanguageName,
    getLanguageFlag,
    t: translations, // Alias pour faciliter l'utilisation
  }
}
