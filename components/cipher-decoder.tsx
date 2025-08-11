"use client"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"

export function CipherDecoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [cipherType, setCipherType] = useState("caesar")
  const [shift, setShift] = useState(13)
  const { theme } = useTheme()

  const decodeCaesar = (text: string, shift: number) => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0)
          const base = code >= 65 && code <= 90 ? 65 : 97
          return String.fromCharCode(((code - base - shift + 26) % 26) + base)
        }
        return char
      })
      .join("")
  }

  const decodeAtbash = (text: string) => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0)
          const base = code >= 65 && code <= 90 ? 65 : 97
          return String.fromCharCode(25 - (code - base) + base)
        }
        return char
      })
      .join("")
  }

  const decodeROT13 = (text: string) => {
    return decodeCaesar(text, 13)
  }

  const handleDecode = () => {
    let result = ""
    switch (cipherType) {
      case "caesar":
        result = decodeCaesar(input, shift)
        break
      case "atbash":
        result = decodeAtbash(input)
        break
      case "rot13":
        result = decodeROT13(input)
        break
      default:
        result = input
    }
    setOutput(result)
  }

  return (
    <div
      className={`p-6 rounded-lg border ${
        theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
      }`}
    >
      <h3 className="font-mono text-lg mb-4">Decodificador de Cifras</h3>

      <div className="space-y-4">
        <div>
          <label className="block font-mono text-sm mb-2">Tipo de Cifra:</label>
          <select
            value={cipherType}
            onChange={(e) => setCipherType(e.target.value)}
            className={`w-full p-2 font-mono rounded border ${
              theme === "dark"
                ? "bg-black border-green-400/20 text-green-400"
                : "bg-white border-green-600/20 text-green-600"
            }`}
          >
            <option value="caesar">Cifra de César</option>
            <option value="atbash">Cifra Atbash</option>
            <option value="rot13">ROT13</option>
          </select>
        </div>

        {cipherType === "caesar" && (
          <div>
            <label className="block font-mono text-sm mb-2">Deslocamento:</label>
            <input
              type="number"
              value={shift}
              onChange={(e) => setShift(Number.parseInt(e.target.value))}
              className={`w-full p-2 font-mono rounded border ${
                theme === "dark"
                  ? "bg-black border-green-400/20 text-green-400"
                  : "bg-white border-green-600/20 text-green-600"
              }`}
              min="1"
              max="25"
            />
          </div>
        )}

        <div>
          <label className="block font-mono text-sm mb-2">Texto Criptografado:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite o texto para decodificar..."
            className={`w-full p-3 font-mono rounded border h-24 ${
              theme === "dark"
                ? "bg-black border-green-400/20 text-green-400 placeholder-green-400/50"
                : "bg-white border-green-600/20 text-green-600 placeholder-green-600/50"
            }`}
          />
        </div>

        <button
          onClick={handleDecode}
          className={`w-full p-3 font-mono rounded border-2 transition-all ${
            theme === "dark"
              ? "border-green-400 hover:bg-green-400 hover:text-black"
              : "border-green-600 hover:bg-green-600 hover:text-white"
          }`}
        >
          DECODIFICAR
        </button>

        {output && (
          <div>
            <label className="block font-mono text-sm mb-2">Resultado:</label>
            <div
              className={`p-3 font-mono rounded border ${
                theme === "dark" ? "bg-black/50 border-green-400/10" : "bg-white border-green-600/10"
              }`}
            >
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
