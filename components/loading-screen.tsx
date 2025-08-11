"use client"

import { useEffect, useState } from "react"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("Searching for clues...")
  const [matrixChars, setMatrixChars] = useState<string[][]>([])

  useEffect(() => {
    // Gerar caracteres da matrix apenas no cliente
    const generateMatrixChars = () => {
      const chars: string[][] = []
      for (let i = 0; i < 20; i++) {
        const column: string[] = []
        for (let j = 0; j < 10; j++) {
          column.push(Math.random() > 0.5 ? "1" : "0")
        }
        chars.push(column)
      }
      return chars
    }

    setMatrixChars(generateMatrixChars())

    const messages = [
      "Searching for clues...",
      "Decrypting messages...",
      "Analyzing patterns...",
      "Connecting to the network...",
      "Welcome, seeker of truth.",
    ]

    let messageIndex = 0
    let progressInterval: NodeJS.Timeout
    let textInterval: NodeJS.Timeout

    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    textInterval = setInterval(() => {
      if (messageIndex < messages.length - 1) {
        messageIndex++
        setText(messages[messageIndex])
      }
    }, 1000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-green-400 font-mono text-xl mb-4 typing-animation">{text}</div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-green-400 font-mono text-sm mt-2">{progress}%</div>
        </div>
        {matrixChars.length > 0 && (
          <div className="matrix-rain">
            {matrixChars.map((column, i) => (
              <div key={i} className="matrix-column" style={{ left: `${i * 5}%` }}>
                {column.map((char, j) => (
                  <span key={j} className="matrix-char">
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
