"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface Question {
  id: number
  question: string
  options: string[]
  correctIndex: number
}

interface QuizContextType {
  questions: Question[]
  updateQuestion: (id: number, updatedQuestion: Question) => void
  resetQuestions: () => void
}

const defaultQuestions: Question[] = [
  {
    id: 1,
    question: "Em que ano surgiu o primeiro desafio do Cicada 3301?",
    options: ["2008", "2012", "2015", "2010"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "Qual plataforma foi usada para divulgar o primeiro enigma?",
    options: ["Twitter", "Fórum 4chan", "Reddit", "Pastebin"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "Um dos formatos usados para transmitir pistas foi:",
    options: ["Vídeos no YouTube", "Pôsteres físicos com QR codes", "Mensagens de texto", "Códigos Morse por rádio"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "Um dos temas principais do Cicada 3301 é:",
    options: ["Criptografia", "Moda", "Fotografia", "Programação de jogos"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "Em que mês o primeiro desafio foi lançado?",
    options: ["Dezembro", "Janeiro", "Julho", "Março"],
    correctIndex: 1,
  },
  {
    id: 6,
    question: "Qual o nome de um dos ciphers usados no desafio?",
    options: ["Vigenère", "Enigma", "ROT26", "Atbash"],
    correctIndex: 0,
  },
  {
    id: 7,
    question: "O grupo nunca revelou oficialmente:",
    options: ["Seu objetivo real", "Que era do governo", "Que queria programadores", "Que usava a deep web"],
    correctIndex: 0,
  },
  {
    id: 8,
    question: "A sigla PGP usada no Cicada significa:",
    options: [
      "Pretty Good Privacy",
      "Private Global Protocol",
      "Protected Government Project",
      "Privacy Guard Protocol",
    ],
    correctIndex: 0,
  },
  {
    id: 9,
    question: "Uma pista do Cicada 3301 levou a:",
    options: ["Google Maps", "Coordenadas geográficas reais", "Vídeos secretos", "Sites bloqueados"],
    correctIndex: 1,
  },
  {
    id: 10,
    question: "Muitos acreditam que o grupo busca:",
    options: ["Hackers e criptógrafos talentosos", "Jornalistas", "Atores", "Artistas plásticos"],
    correctIndex: 0,
  },
]

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions)

  useEffect(() => {
    const savedQuestions = localStorage.getItem("cicada-quiz-questions")
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions))
    }
  }, [])

  const updateQuestion = (id: number, updatedQuestion: Question) => {
    const newQuestions = questions.map((q) => (q.id === id ? updatedQuestion : q))
    setQuestions(newQuestions)
    localStorage.setItem("cicada-quiz-questions", JSON.stringify(newQuestions))
  }

  const resetQuestions = () => {
    setQuestions(defaultQuestions)
    localStorage.setItem("cicada-quiz-questions", JSON.stringify(defaultQuestions))
  }

  return <QuizContext.Provider value={{ questions, updateQuestion, resetQuestions }}>{children}</QuizContext.Provider>
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error("useQuiz deve ser usado dentro de QuizProvider")
  }
  return context
}
