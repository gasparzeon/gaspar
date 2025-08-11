"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { useQuiz } from "@/contexts/quiz-context"
import { useRanking } from "@/contexts/ranking-context"

export default function QuizPage() {
  const [nickname, setNickname] = useState("")
  const [showNicknameForm, setShowNicknameForm] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [startTime, setStartTime] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const { theme } = useTheme()
  const { questions } = useQuiz()
  const router = useRouter()
  const { addEntry } = useRanking()

  const handleStartQuiz = () => {
    if (nickname.trim()) {
      setShowNicknameForm(false)
      setStartTime(Date.now())
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)
      setSelectedAnswer(null)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Quiz completed
        const endTime = Date.now()
        const timeSpent = Math.floor((endTime - startTime) / 1000)

        // Calcular pontuação usando índices (não texto)
        const correctAnswers = newAnswers.reduce((count, answer, index) => {
          const q = questions[index]
          return count + (answer === q.correctIndex ? 1 : 0)
        }, 0)

        const score = Math.floor((correctAnswers / questions.length) * 100)

        // Salvar resultado
        const result = {
          nickname,
          score,
          timeSpent,
          correctAnswers,
          totalQuestions: questions.length,
          timestamp: Date.now(),
        }

        // Salvar resultado local para a página de resultado
        localStorage.setItem("quiz-result", JSON.stringify(result))

        // Salvar no ranking usando context
        addEntry(result)

        router.push("/resultado")
      }
    }
  }

  if (showNicknameForm) {
    return (
      <>
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div
              className={`p-8 rounded-lg border ${
                theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
              }`}
            >
              <h1 className="font-mono text-2xl font-bold mb-6 text-center">Iniciar Quiz</h1>
              <p className="font-mono mb-6 opacity-80 text-center">
                Digite seu nick do Habblet Hotel para começar o desafio:
              </p>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Seu nick no Habblet Hotel"
                className={`w-full p-3 font-mono rounded border ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400 placeholder-green-400/50"
                    : "bg-white border-green-600/20 text-green-600 placeholder-green-600/50"
                } focus:outline-none focus:border-green-400`}
                onKeyPress={(e) => e.key === "Enter" && handleStartQuiz()}
              />
              <button
                onClick={handleStartQuiz}
                disabled={!nickname.trim()}
                className={`w-full mt-4 p-3 font-mono rounded border-2 transition-all ${
                  nickname.trim()
                    ? theme === "dark"
                      ? "border-green-400 hover:bg-green-400 hover:text-black"
                      : "border-green-600 hover:bg-green-600 hover:text-white"
                    : "border-gray-500 opacity-50 cursor-not-allowed"
                }`}
              >
                COMEÇAR QUIZ
              </button>
            </div>
          </div>
        </main>
      </>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between font-mono text-sm mb-2">
              <span>
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span>{nickname}</span>
            </div>
            <div className={`w-full h-2 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
              <div
                className="h-full bg-green-400 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div
            className={`p-8 rounded-lg border mb-6 ${
              theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
            }`}
          >
            <h2 className="font-mono text-xl mb-6">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left font-mono rounded border-2 transition-all ${
                    selectedAnswer === index
                      ? theme === "dark"
                        ? "border-green-400 bg-green-400/10"
                        : "border-green-600 bg-green-600/10"
                      : theme === "dark"
                        ? "border-green-400/20 hover:border-green-400/50"
                        : "border-green-600/20 hover:border-green-600/50"
                  }`}
                >
                  <span className="mr-3 opacity-60">{String.fromCharCode(65 + index)})</span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`px-8 py-3 font-mono rounded border-2 transition-all ${
                selectedAnswer !== null
                  ? theme === "dark"
                    ? "border-green-400 hover:bg-green-400 hover:text-black"
                    : "border-green-600 hover:bg-green-600 hover:text-white"
                  : "border-gray-500 opacity-50 cursor-not-allowed"
              }`}
            >
              {currentQuestion < questions.length - 1 ? "PRÓXIMA" : "FINALIZAR"}
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
