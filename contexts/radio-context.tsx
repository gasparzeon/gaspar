"use client"

import type React from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"

interface RadioContextType {
  isPlaying: boolean
  volume: number
  isLoading: boolean
  play: () => void
  pause: () => void
  setVolume: (volume: number) => void
  audioLevels: number[]
}

const RadioContext = createContext<RadioContextType | undefined>(undefined)

export function RadioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [isLoading, setIsLoading] = useState(false)
  const [audioLevels, setAudioLevels] = useState<number[]>(Array(20).fill(0))
  const animationRef = useRef<number>()

  useEffect(() => {
    // Criar elemento de áudio
    audioRef.current = new Audio("https://panel-slave.dedicado.stream/8480/stream")
    audioRef.current.crossOrigin = "anonymous"
    audioRef.current.volume = volume
    audioRef.current.preload = "none"

    // Event listeners
    const audio = audioRef.current

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      console.error("Erro ao carregar rádio")
    }

    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("error", handleError)
      audio.pause()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Animação do equalizador
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setAudioLevels((prev) => prev.map(() => Math.random() * 100))
        animationRef.current = requestAnimationFrame(animate)
      }
      animate()
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setAudioLevels(Array(20).fill(0))
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  const play = async () => {
    if (audioRef.current) {
      try {
        setIsLoading(true)
        await audioRef.current.play()
      } catch (error) {
        console.error("Erro ao reproduzir:", error)
        setIsLoading(false)
      }
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <RadioContext.Provider
      value={{
        isPlaying,
        volume,
        isLoading,
        play,
        pause,
        setVolume,
        audioLevels,
      }}
    >
      {children}
    </RadioContext.Provider>
  )
}

export function useRadio() {
  const context = useContext(RadioContext)
  if (context === undefined) {
    throw new Error("useRadio deve ser usado dentro de RadioProvider")
  }
  return context
}
