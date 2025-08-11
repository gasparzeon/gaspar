"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"

interface QuizResult {
  nickname: string
  score: number
  timeSpent: number
  correctAnswers: number
  totalQuestions: number
  timestamp: number
}

export default function ResultadoPage() {
  const [result, setResult] = useState<QuizResult | null>(null)
  const [showSecret, setShowSecret] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    const loadResult = () => {
      try {
        const savedResult = localStorage.getItem("quiz-result")
        if (savedResult) {
          const parsedResult = JSON.parse(savedResult)
          setResult(parsedResult)

          // Mostrar segredo após delay se pontuação for alta o suficiente
          if (parsedResult.score >= 80) {
            setTimeout(() => setShowSecret(true), 2000)
          }
        } else {
          // Redirecionar para quiz se não houver resultado após um delay
          setTimeout(() => {
            router.push("/quiz")
          }, 1000)
        }
      } catch (error) {
        console.error("Erro ao carregar resultado:", error)
        setTimeout(() => {
          router.push("/quiz")
        }, 1000)
      } finally {
        setIsLoading(false)
      }
    }

    loadResult()
  }, [router])

  if (isLoading) {
    return (
      <>
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="font-mono text-xl">Carregando resultado...</p>
          </div>
        </main>
      </>
    )
  }

  if (!result) {
    return (
      <>
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="font-mono text-xl mb-4">Nenhum resultado encontrado</p>
            <Link
              href="/quiz"
              className={`inline-block px-8 py-3 font-mono rounded border-2 transition-all ${
                theme === "dark"
                  ? "border-green-400 hover:bg-green-400 hover:text-black"
                  : "border-green-600 hover:bg-green-600 hover:text-white"
              }`}
            >
              FAZER QUIZ
            </Link>
          </div>
        </main>
      </>
    )
  }

  const isSuccess = result.score >= 80
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Result Header */}
          <div className="mb-8">
            <h1 className="font-mono text-3xl font-bold mb-4">{isSuccess ? "ACESSO CONCEDIDO" : "ACESSO NEGADO"}</h1>
            <div className={`text-6xl mb-4 ${isSuccess ? "text-green-400" : "text-red-400"}`}>
              {isSuccess ? "✓" : "✗"}
            </div>
          </div>

          {/* Stats */}
          <div
            className={`p-8 rounded-lg border mb-8 ${
              theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
            }`}
          >
            <h2 className="font-mono text-xl mb-6">Estatísticas</h2>
            <div className="grid grid-cols-2 gap-4 font-mono">
              <div>
                <div className="text-2xl font-bold">{result.nickname}</div>
                <div className="opacity-60">Jogador</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{result.score}%</div>
                <div className="opacity-60">Pontuação</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="opacity-60">Acertos</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{formatTime(result.timeSpent)}</div>
                <div className="opacity-60">Tempo</div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {isSuccess ? (
            <div
              className={`p-8 rounded-lg border mb-8 ${
                theme === "dark" ? "bg-green-900/20 border-green-400/50" : "bg-green-50 border-green-600/50"
              }`}
            >
              <h2 className="font-mono text-xl mb-4">Parabéns, Iniciado</h2>
              <p className="font-mono mb-6 opacity-90">
                Você demonstrou conhecimento suficiente sobre os mistérios do Cicada 3301. A verdade está mais próxima
                do que imagina.
              </p>

              {showSecret && (
                <div className="typing-animation">
                  <div
                    className={`p-6 rounded border-2 ${
                      theme === "dark" ? "border-green-400 bg-black" : "border-green-600 bg-white"
                    }`}
                  >
                    <p className="font-mono text-sm mb-2 opacity-60">CHAVE DE ACESSO:</p>
                    <p className="font-mono text-lg font-bold tracking-wider">CICADA-RadioHabblet-2025</p>
                    <p className="font-mono text-xs mt-4 opacity-80">"Instar emergere. A jornada apenas começou."</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={`p-8 rounded-lg border mb-8 ${
                theme === "dark" ? "bg-red-900/20 border-red-400/50" : "bg-red-50 border-red-600/50"
              }`}
            >
              <h2 className="font-mono text-xl mb-4">Continue Buscando</h2>
              <p className="font-mono mb-4 opacity-90">
                O conhecimento é a chave. Estude mais sobre os mistérios do Cicada 3301 e retorne quando estiver
                preparado.
              </p>
              <p className="font-mono text-sm opacity-70">"A paciência é uma virtude. A sabedoria, uma necessidade."</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-4">
            <Link
              href="/quiz"
              className={`inline-block px-8 py-3 font-mono rounded border-2 transition-all mr-4 ${
                theme === "dark"
                  ? "border-green-400 hover:bg-green-400 hover:text-black"
                  : "border-green-600 hover:bg-green-600 hover:text-white"
              }`}
            >
              TENTAR NOVAMENTE
            </Link>
            <Link
              href="/ranking"
              className={`inline-block px-8 py-3 font-mono rounded border-2 transition-all ${
                theme === "dark"
                  ? "border-green-400/50 hover:border-green-400"
                  : "border-green-600/50 hover:border-green-600"
              }`}
            >
              VER RANKING
            </Link>
          </div>

          <div className="mt-8">
            <Link href="/" className="font-mono opacity-60 hover:opacity-100 transition-opacity">
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
