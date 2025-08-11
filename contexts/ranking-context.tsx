"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface RankingEntry {
  nickname: string
  score: number
  timeSpent: number
  correctAnswers: number
  totalQuestions: number
  timestamp: number
  id: string
}

interface RankingContextType {
  ranking: RankingEntry[]
  addEntry: (entry: Omit<RankingEntry, "id">) => void
  clearRanking: () => void
  syncRanking: () => void
}

const RankingContext = createContext<RankingContextType | undefined>(undefined)

// Simulação de API compartilhada usando localStorage + sincronização
const RANKING_KEY = "cicada-global-ranking"
const SYNC_KEY = "cicada-ranking-sync"

export function RankingProvider({ children }: { children: React.ReactNode }) {
  const [ranking, setRanking] = useState<RankingEntry[]>([])

  useEffect(() => {
    loadRanking()
    // Sincronizar a cada 30 segundos
    const interval = setInterval(syncRanking, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadRanking = () => {
    const saved = localStorage.getItem(RANKING_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      setRanking(parsed.sort((a: RankingEntry, b: RankingEntry) => b.score - a.score || a.timeSpent - b.timeSpent))
    }
  }

  const saveRanking = (newRanking: RankingEntry[]) => {
    const sorted = newRanking.sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent)
    localStorage.setItem(RANKING_KEY, JSON.stringify(sorted))
    localStorage.setItem(SYNC_KEY, Date.now().toString())
    setRanking(sorted)
  }

  const addEntry = (entry: Omit<RankingEntry, "id">) => {
    const newEntry: RankingEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
    const newRanking = [...ranking, newEntry]
    saveRanking(newRanking)
  }

  const clearRanking = () => {
    localStorage.removeItem(RANKING_KEY)
    localStorage.removeItem(SYNC_KEY)
    setRanking([])
  }

  const syncRanking = () => {
    // Em uma implementação real, isso faria uma chamada para API
    // Por enquanto, apenas recarrega do localStorage
    loadRanking()
  }

  return (
    <RankingContext.Provider value={{ ranking, addEntry, clearRanking, syncRanking }}>
      {children}
    </RankingContext.Provider>
  )
}

export function useRanking() {
  const context = useContext(RankingContext)
  if (context === undefined) {
    throw new Error("useRanking deve ser usado dentro de RankingProvider")
  }
  return context
}
