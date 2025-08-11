"use client"

import { useTheme } from "@/components/theme-provider"

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer
      className={`mt-16 border-t py-8 ${
        theme === "dark" ? "border-green-400/20 bg-black/50" : "border-green-600/20 bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="font-mono text-sm opacity-60 mb-2">
            "A verdade está lá fora, esperando para ser descoberta."
          </div>
          <div className="font-mono text-xs opacity-40">
            Desenvolvido por <span className="text-green-400 font-bold">Gaspar</span> • 2025 •
            <span className="ml-2">Em memória dos mistérios não resolvidos</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
