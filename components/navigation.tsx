"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Building2, Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "À Propos" },
    {
      href: "/services",
      label: "Services",
      hasSubmenu: true,
      submenu: [
        { href: "/services#construction", label: "Construction Neuve" },
        { href: "/services#renovation", label: "Rénovation" },
        { href: "/services#architecture", label: "Architecture" },
      ],
    },
    { href: "/portfolio", label: "Réalisations" },
    { href: "/blog", label: "Actualités" },
    { href: "/careers", label: "Carrières" },
    { href: "/contact", label: "Contact" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsServicesOpen(false)
  }

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById("mobile-menu")
      if (nav && !nav.contains(event.target as Node)) {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  // Empêcher le scroll quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ConstructPro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium flex items-center ${
                      pathname === item.href ? "text-blue-600 hover:text-blue-800" : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                    {item.hasSubmenu && <ChevronDown className="ml-1 h-4 w-4" />}
                  </Link>

                  {/* Desktop Submenu */}
                  {item.hasSubmenu && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-1">
                        {item.submenu?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <Button asChild>
              <Link href="/contact">Demander un Devis</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Menu principal"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={closeMenu} />}

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-16 left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ maxHeight: "calc(100vh - 4rem)", overflowY: "auto" }}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navItems.map((item) => (
            <div key={item.href}>
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  className={`flex-1 block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                  onClick={item.hasSubmenu ? undefined : closeMenu}
                >
                  {item.label}
                </Link>
                {item.hasSubmenu && (
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="p-2 text-gray-500 hover:text-blue-600"
                    aria-label={`${isServicesOpen ? "Fermer" : "Ouvrir"} le sous-menu ${item.label}`}
                  >
                    <ChevronDown
                      className={`h-5 w-5 transform transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>

              {/* Mobile Submenu */}
              {item.hasSubmenu && isServicesOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.submenu?.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                      onClick={closeMenu}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile CTA Button */}
          <div className="pt-4 border-t border-gray-200">
            <Button asChild className="w-full">
              <Link href="/contact" onClick={closeMenu}>
                Demander un Devis
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
