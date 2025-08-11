"use client"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { useRanking } from "@/contexts/ranking-context"

interface RankingEntry {
  nickname: string
  score: number
  timeSpent: number
  correctAnswers: number
  totalQuestions: number
  timestamp: number
}

export default function RankingPage() {
  const { ranking } = useRanking()
  const { theme } = useTheme()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return "🥇"
      case 1:
        return "🥈"
      case 2:
        return "🥉"
      default:
        return `#${index + 1}`
    }
  }

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-mono text-3xl font-bold mb-8 text-center">Ranking dos Iniciados</h1>

          {ranking.length === 0 ? (
            <div className="text-center">
              <div
                className={`p-8 rounded-lg border ${
                  theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
                }`}
              >
                <p className="font-mono text-xl mb-4">Nenhum resultado encontrado</p>
                <p className="font-mono opacity-60 mb-6">Seja o primeiro a completar o desafio do Cicada 3301</p>
                <Link
                  href="/quiz"
                  className={`inline-block px-8 py-3 font-mono rounded border-2 transition-all ${
                    theme === "dark"
                      ? "border-green-400 hover:bg-green-400 hover:text-black"
                      : "border-green-600 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  INICIAR QUIZ
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Summary */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div
                  className={`p-4 rounded-lg border text-center ${
                    theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                  }`}
                >
                  <div className="font-mono text-2xl font-bold">{ranking.length}</div>
                  <div className="font-mono text-sm opacity-60">Total de Jogadores</div>
                </div>
                <div
                  className={`p-4 rounded-lg border text-center ${
                    theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                  }`}
                >
                  <div className="font-mono text-2xl font-bold">{ranking.filter((r) => r.score >= 80).length}</div>
                  <div className="font-mono text-sm opacity-60">Iniciados (≥80%)</div>
                </div>
                <div
                  className={`p-4 rounded-lg border text-center ${
                    theme === "dark" ? "bg-gray-900/30 border-green-400/20" : "bg-gray-50 border-green-600/20"
                  }`}
                >
                  <div className="font-mono text-2xl font-bold">
                    {ranking.length > 0 ? Math.round(ranking.reduce((acc, r) => acc + r.score, 0) / ranking.length) : 0}
                    %
                  </div>
                  <div className="font-mono text-sm opacity-60">Pontuação Média</div>
                </div>
              </div>

              {/* Ranking Table */}
              <div
                className={`rounded-lg border overflow-hidden ${
                  theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
                }`}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${theme === "dark" ? "border-green-400/20" : "border-green-600/20"}`}>
                        <th className="font-mono text-left p-4">Posição</th>
                        <th className="font-mono text-left p-4">Jogador</th>
                        <th className="font-mono text-center p-4">Pontuação</th>
                        <th className="font-mono text-center p-4">Acertos</th>
                        <th className="font-mono text-center p-4">Tempo</th>
                        <th className="font-mono text-center p-4">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ranking.map((entry, index) => (
                        <tr
                          key={index}
                          className={`border-b transition-colors ${
                            theme === "dark"
                              ? "border-green-400/10 hover:bg-green-400/5"
                              : "border-green-600/10 hover:bg-green-600/5"
                          } ${entry.score >= 80 ? "bg-green-400/10" : ""}`}
                        >
                          <td className="font-mono p-4">
                            <span className="text-lg">{getRankIcon(index)}</span>
                          </td>
                          <td className="font-mono p-4 font-bold">
                            {entry.nickname}
                            {entry.score >= 80 && (
                              <span className="ml-2 text-xs px-2 py-1 rounded bg-green-400/20">INICIADO</span>
                            )}
                          </td>
                          <td className="font-mono p-4 text-center">
                            <span className={`font-bold ${entry.score >= 80 ? "text-green-400" : ""}`}>
                              {entry.score}%
                            </span>
                          </td>
                          <td className="font-mono p-4 text-center">
                            {entry.correctAnswers}/{entry.totalQuestions}
                          </td>
                          <td className="font-mono p-4 text-center">{formatTime(entry.timeSpent)}</td>
                          <td className="font-mono p-4 text-center text-sm opacity-60">
                            {formatDate(entry.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div className="text-center mt-8">
                <Link
                  href="/quiz"
                  className={`inline-block px-8 py-3 font-mono rounded border-2 transition-all mr-4 ${
                    theme === "dark"
                      ? "border-green-400 hover:bg-green-400 hover:text-black"
                      : "border-green-600 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  FAZER QUIZ
                </Link>
                <Link
                  href="/"
                  className={`inline-block px-8 py-3 font-mono rounded border-2 transition-all ${
                    theme === "dark"
                      ? "border-green-400/50 hover:border-green-400"
                      : "border-green-600/50 hover:border-green-600"
                  }`}
                >
                  INÍCIO
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}
