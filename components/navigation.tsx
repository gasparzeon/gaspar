"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "./theme-provider"
import { Moon, Sun } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  // Não mostrar navegação na página admin
  if (pathname.startsWith("/admin")) {
    return null
  }

  const links = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre" },
    { href: "/artigos", label: "Artigos" },
    { href: "/funcoes", label: "Funções" },
    { href: "/quiz", label: "Quiz" },
    { href: "/ranking", label: "Ranking" },
  ]

  return (
    <nav
      className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
        theme === "dark"
          ? "bg-black/90 border-green-400/20 backdrop-blur-sm"
          : "bg-white/90 border-green-600/20 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-mono text-xl font-bold hover:text-green-300 transition-colors">
            CICADA 3301
          </Link>

          <div className="flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono transition-colors hover:text-green-300 ${
                  pathname === link.href ? "text-green-300" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-green-400/10 transition-colors"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
