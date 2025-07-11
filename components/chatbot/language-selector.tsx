"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"
import type { Language } from "@/lib/i18n/translations"

export function LanguageSelector() {
  const { currentLanguage, changeLanguage, getLanguageName, getLanguageFlag } = useLanguage()

  const languages: Language[] = ["fr", "en", "es"]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <span className="text-sm">{getLanguageFlag(currentLanguage)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => changeLanguage(language)}
            className={currentLanguage === language ? "bg-blue-50" : ""}
          >
            <span className="mr-2">{getLanguageFlag(language)}</span>
            {getLanguageName(language)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
