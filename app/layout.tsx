import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminProvider } from "@/contexts/admin-context"
import { QuizProvider } from "@/contexts/quiz-context"
import { RankingProvider } from "@/contexts/ranking-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cicada 3301 - O Mistério Continua",
  description: "Entre no mundo enigmático do Cicada 3301. Teste seus conhecimentos e desvende os segredos.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AdminProvider>
            <QuizProvider>
              <RankingProvider>{children}</RankingProvider>
            </QuizProvider>
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
