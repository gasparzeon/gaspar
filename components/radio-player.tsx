"use client"

import type React from "react"

import { useState } from "react"
import { useRadio } from "@/contexts/radio-context"
import { useTheme } from "@/components/theme-provider"
import { Play, Pause, Volume2, VolumeX, Radio } from "lucide-react"

export function RadioPlayer() {
  const { isPlaying, volume, isLoading, play, pause, setVolume, audioLevels } = useRadio()
  const { theme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const handlePlayPause = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.7)
      setIsMuted(false)
    } else {
      setVolume(0)
      setIsMuted(true)
    }
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        theme === "dark" ? "bg-black/95 border-t border-green-400/20" : "bg-white/95 border-t border-green-600/20"
      } backdrop-blur-sm ${isExpanded ? "h-32" : "h-16"}`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo e Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Radio size={20} className="text-green-400" />
            <span className="font-mono text-sm font-bold">RÁDIO HABBLET</span>
          </div>

          {isExpanded && (
            <div className="flex items-center space-x-1">
              {audioLevels.slice(0, 10).map((level, index) => (
                <div
                  key={index}
                  className={`w-1 bg-green-400 transition-all duration-75 ${
                    theme === "dark" ? "bg-green-400" : "bg-green-600"
                  }`}
                  style={{ height: `${Math.max(2, level * 0.3)}px` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Controles Principais */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePlayPause}
            disabled={isLoading}
            className={`p-3 rounded-full border-2 transition-all hover:scale-105 ${
              theme === "dark"
                ? "border-green-400 hover:bg-green-400 hover:text-black"
                : "border-green-600 hover:bg-green-600 hover:text-white"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause size={20} />
            ) : (
              <Play size={20} />
            )}
          </button>

          <div className="flex items-center space-x-2">
            <button onClick={toggleMute} className="p-1 hover:text-green-300 transition-colors">
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className={`w-20 h-1 rounded-lg appearance-none cursor-pointer ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-300"
              }`}
              style={{
                background: `linear-gradient(to right, ${theme === "dark" ? "#00FF00" : "#16a34a"} 0%, ${theme === "dark" ? "#00FF00" : "#16a34a"} ${volume * 100}%, ${theme === "dark" ? "#374151" : "#d1d5db"} ${volume * 100}%, ${theme === "dark" ? "#374151" : "#d1d5db"} 100%)`,
              }}
            />
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="font-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
          >
            {isExpanded ? "▼" : "▲"}
          </button>
        </div>
      </div>

      {/* Status expandido */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="text-center">
            <p className="font-mono text-sm opacity-80">
              {isLoading ? "Carregando..." : isPlaying ? "Tocando ao vivo" : "Pausado"}
            </p>
            <p className="font-mono text-xs opacity-60 mt-1">www.radiohabblet.com.br</p>
          </div>
        </div>
      )}
    </div>
  )
}
