"use client"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Copy, Check } from "lucide-react"

export function HackerTools() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("cpf")
  const [copied, setCopied] = useState("")

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  // Geradores
  const generateCPF = () => {
    const randomDigits = () => Math.floor(Math.random() * 9)
    let cpf = ""
    for (let i = 0; i < 9; i++) {
      cpf += randomDigits()
    }

    // Calcular dígitos verificadores
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += Number.parseInt(cpf[i]) * (10 - i)
    }
    let digit1 = 11 - (sum % 11)
    if (digit1 >= 10) digit1 = 0

    sum = 0
    for (let i = 0; i < 9; i++) {
      sum += Number.parseInt(cpf[i]) * (11 - i)
    }
    sum += digit1 * 2
    let digit2 = 11 - (sum % 11)
    if (digit2 >= 10) digit2 = 0

    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${digit1}${digit2}`
  }

  const generateCNPJ = () => {
    const randomDigits = () => Math.floor(Math.random() * 9)
    let cnpj = ""
    for (let i = 0; i < 12; i++) {
      cnpj += randomDigits()
    }

    // Calcular dígitos verificadores
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += Number.parseInt(cnpj[i]) * weights1[i]
    }
    const digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11)

    sum = 0
    for (let i = 0; i < 12; i++) {
      sum += Number.parseInt(cnpj[i]) * weights2[i]
    }
    sum += digit1 * weights2[12]
    const digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11)

    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${digit1}${digit2}`
  }

  const generateEmail = () => {
    const domains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com", "protonmail.com"]
    const names = ["user", "admin", "test", "demo", "sample", "example", "temp"]
    const numbers = Math.floor(Math.random() * 9999)
    const name = names[Math.floor(Math.random() * names.length)]
    const domain = domains[Math.floor(Math.random() * domains.length)]
    return `${name}${numbers}@${domain}`
  }

  const generatePassword = (length = 12) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const generateHash = (text: string, type: string) => {
    // Simulação de hash (em produção, usar biblioteca real)
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }

    const hashStr = Math.abs(hash).toString(16)

    switch (type) {
      case "md5":
        return hashStr.padStart(32, "0").slice(0, 32)
      case "sha1":
        return hashStr.padStart(40, "0").slice(0, 40)
      case "sha256":
        return hashStr.padStart(64, "0").slice(0, 64)
      default:
        return hashStr
    }
  }

  const encodeBase64 = (text: string) => {
    try {
      return btoa(unescape(encodeURIComponent(text)))
    } catch {
      return "Erro na codificação"
    }
  }

  const decodeBase64 = (text: string) => {
    try {
      return decodeURIComponent(escape(atob(text)))
    } catch {
      return "Erro na decodificação"
    }
  }

  const encodeURL = (text: string) => {
    return encodeURIComponent(text)
  }

  const decodeURL = (text: string) => {
    try {
      return decodeURIComponent(text)
    } catch {
      return "Erro na decodificação"
    }
  }

  const tabs = [
    { id: "cpf", label: "CPF/CNPJ" },
    { id: "email", label: "Email/Senha" },
    { id: "hash", label: "Hash" },
    { id: "base64", label: "Base64" },
    { id: "url", label: "URL Encode" },
    { id: "json", label: "JSON" },
    { id: "regex", label: "RegEx" },
    { id: "color", label: "Cores" },
  ]

  const [inputs, setInputs] = useState({
    hashText: "",
    hashType: "md5",
    base64Text: "",
    base64Mode: "encode",
    urlText: "",
    urlMode: "encode",
    jsonText: "",
    regexText: "",
    regexPattern: "",
    colorHex: "#00FF00",
  })

  const [results, setResults] = useState({
    cpf: "",
    cnpj: "",
    email: "",
    password: "",
    hash: "",
    base64: "",
    url: "",
    json: "",
    regex: [],
    color: { rgb: "", hsl: "" },
  })

  const handleGenerate = (type: string) => {
    switch (type) {
      case "cpf":
        setResults((prev) => ({ ...prev, cpf: generateCPF() }))
        break
      case "cnpj":
        setResults((prev) => ({ ...prev, cnpj: generateCNPJ() }))
        break
      case "email":
        setResults((prev) => ({ ...prev, email: generateEmail() }))
        break
      case "password":
        setResults((prev) => ({ ...prev, password: generatePassword() }))
        break
      case "hash":
        setResults((prev) => ({ ...prev, hash: generateHash(inputs.hashText, inputs.hashType) }))
        break
      case "base64":
        const base64Result =
          inputs.base64Mode === "encode" ? encodeBase64(inputs.base64Text) : decodeBase64(inputs.base64Text)
        setResults((prev) => ({ ...prev, base64: base64Result }))
        break
      case "url":
        const urlResult = inputs.urlMode === "encode" ? encodeURL(inputs.urlText) : decodeURL(inputs.urlText)
        setResults((prev) => ({ ...prev, url: urlResult }))
        break
      case "json":
        try {
          const formatted = JSON.stringify(JSON.parse(inputs.jsonText), null, 2)
          setResults((prev) => ({ ...prev, json: formatted }))
        } catch {
          setResults((prev) => ({ ...prev, json: "JSON inválido" }))
        }
        break
      case "regex":
        try {
          const regex = new RegExp(inputs.regexPattern, "g")
          const matches = inputs.regexText.match(regex) || []
          setResults((prev) => ({ ...prev, regex: matches }))
        } catch {
          setResults((prev) => ({ ...prev, regex: ["RegEx inválido"] }))
        }
        break
      case "color":
        const hex = inputs.colorHex
        const r = Number.parseInt(hex.slice(1, 3), 16)
        const g = Number.parseInt(hex.slice(3, 5), 16)
        const b = Number.parseInt(hex.slice(5, 7), 16)
        const rgb = `rgb(${r}, ${g}, ${b})`
        const hsl = `hsl(${Math.round((Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180) / Math.PI)}, ${Math.round(((Math.max(r, g, b) - Math.min(r, g, b)) / Math.max(r, g, b)) * 100)}%, ${Math.round(((Math.max(r, g, b) + Math.min(r, g, b)) / 2 / 255) * 100)}%)`
        setResults((prev) => ({ ...prev, color: { rgb, hsl } }))
        break
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "cpf":
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <button
                  onClick={() => handleGenerate("cpf")}
                  className={`w-full p-3 font-mono rounded border-2 transition-all ${
                    theme === "dark"
                      ? "border-green-400 hover:bg-green-400 hover:text-black"
                      : "border-green-600 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  GERAR CPF
                </button>
                {results.cpf && (
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      value={results.cpf}
                      readOnly
                      className={`flex-1 p-2 font-mono text-sm rounded border ${
                        theme === "dark"
                          ? "bg-black border-green-400/20 text-green-400"
                          : "bg-white border-green-600/20 text-green-600"
                      }`}
                    />
                    <button
                      onClick={() => copyToClipboard(results.cpf, "cpf")}
                      className="p-2 hover:bg-green-400/10 rounded"
                    >
                      {copied === "cpf" ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => handleGenerate("cnpj")}
                  className={`w-full p-3 font-mono rounded border-2 transition-all ${
                    theme === "dark"
                      ? "border-green-400 hover:bg-green-400 hover:text-black"
                      : "border-green-600 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  GERAR CNPJ
                </button>
                {results.cnpj && (
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      value={results.cnpj}
                      readOnly
                      className={`flex-1 p-2 font-mono text-sm rounded border ${
                        theme === "dark"
                          ? "bg-black border-green-400/20 text-green-400"
                          : "bg-white border-green-600/20 text-green-600"
                      }`}
                    />
                    <button
                      onClick={() => copyToClipboard(results.cnpj, "cnpj")}
                      className="p-2 hover:bg-green-400/10 rounded"
                    >
                      {copied === "cnpj" ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case "email":
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <button
                  onClick={() => handleGenerate("email")}
                  className={`w-full p-3 font-mono rounded border-2 transition-all ${
                    theme === "dark"
                      ? "border-green-400 hover:bg-green-400 hover:text-black"
                      : "border-green-600 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  GERAR EMAIL
                </button>
                {results.email && (
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      value={results.email}
                      readOnly
                      className={`flex-1 p-2 font-mono text-sm rounded border ${
                        theme === "dark"
                          ? "bg-black border-green-400/20 text-green-400"
                          : "bg-white border-green-600/20 text-green-600"
                      }`}
                    />
                    <button
                      onClick={() => copyToClipboard(results.email, "email")}
                      className="p-2 hover:bg-green-400/10 rounded"
                    >
                      {copied === "email" ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => handleGenerate("password")}
                  className={`w-full p-3 font-mono rounded border-2 transition-all ${
                    theme === "dark"
                      ? "border-green-400 hover:bg-green-400 hover:text-black"
                      : "border-green-600 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  GERAR SENHA
                </button>
                {results.password && (
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      value={results.password}
                      readOnly
                      className={`flex-1 p-2 font-mono text-sm rounded border ${
                        theme === "dark"
                          ? "bg-black border-green-400/20 text-green-400"
                          : "bg-white border-green-600/20 text-green-600"
                      }`}
                    />
                    <button
                      onClick={() => copyToClipboard(results.password, "password")}
                      className="p-2 hover:bg-green-400/10 rounded"
                    >
                      {copied === "password" ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case "hash":
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-sm mb-2">Texto para Hash:</label>
              <textarea
                value={inputs.hashText}
                onChange={(e) => setInputs((prev) => ({ ...prev, hashText: e.target.value }))}
                placeholder="Digite o texto..."
                className={`w-full p-3 font-mono rounded border h-24 ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400 placeholder-green-400/50"
                    : "bg-white border-green-600/20 text-green-600 placeholder-green-600/50"
                }`}
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={inputs.hashType}
                onChange={(e) => setInputs((prev) => ({ ...prev, hashType: e.target.value }))}
                className={`p-2 font-mono rounded border ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400"
                    : "bg-white border-green-600/20 text-green-600"
                }`}
              >
                <option value="md5">MD5</option>
                <option value="sha1">SHA1</option>
                <option value="sha256">SHA256</option>
              </select>

              <button
                onClick={() => handleGenerate("hash")}
                className={`px-6 py-2 font-mono rounded border-2 transition-all ${
                  theme === "dark"
                    ? "border-green-400 hover:bg-green-400 hover:text-black"
                    : "border-green-600 hover:bg-green-600 hover:text-white"
                }`}
              >
                GERAR HASH
              </button>
            </div>

            {results.hash && (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={results.hash}
                  readOnly
                  className={`flex-1 p-2 font-mono text-sm rounded border ${
                    theme === "dark"
                      ? "bg-black border-green-400/20 text-green-400"
                      : "bg-white border-green-600/20 text-green-600"
                  }`}
                />
                <button
                  onClick={() => copyToClipboard(results.hash, "hash")}
                  className="p-2 hover:bg-green-400/10 rounded"
                >
                  {copied === "hash" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            )}
          </div>
        )

      case "base64":
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-sm mb-2">Texto:</label>
              <textarea
                value={inputs.base64Text}
                onChange={(e) => setInputs((prev) => ({ ...prev, base64Text: e.target.value }))}
                placeholder="Digite o texto..."
                className={`w-full p-3 font-mono rounded border h-24 ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400 placeholder-green-400/50"
                    : "bg-white border-green-600/20 text-green-600 placeholder-green-600/50"
                }`}
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={inputs.base64Mode}
                onChange={(e) => setInputs((prev) => ({ ...prev, base64Mode: e.target.value }))}
                className={`p-2 font-mono rounded border ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400"
                    : "bg-white border-green-600/20 text-green-600"
                }`}
              >
                <option value="encode">Codificar</option>
                <option value="decode">Decodificar</option>
              </select>

              <button
                onClick={() => handleGenerate("base64")}
                className={`px-6 py-2 font-mono rounded border-2 transition-all ${
                  theme === "dark"
                    ? "border-green-400 hover:bg-green-400 hover:text-black"
                    : "border-green-600 hover:bg-green-600 hover:text-white"
                }`}
              >
                PROCESSAR
              </button>
            </div>

            {results.base64 && (
              <div className="flex items-center space-x-2">
                <textarea
                  value={results.base64}
                  readOnly
                  className={`flex-1 p-2 font-mono text-sm rounded border h-24 ${
                    theme === "dark"
                      ? "bg-black border-green-400/20 text-green-400"
                      : "bg-white border-green-600/20 text-green-600"
                  }`}
                />
                <button
                  onClick={() => copyToClipboard(results.base64, "base64")}
                  className="p-2 hover:bg-green-400/10 rounded"
                >
                  {copied === "base64" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            )}
          </div>
        )

      case "url":
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-sm mb-2">URL/Texto:</label>
              <textarea
                value={inputs.urlText}
                onChange={(e) => setInputs((prev) => ({ ...prev, urlText: e.target.value }))}
                placeholder="Digite a URL ou texto..."
                className={`w-full p-3 font-mono rounded border h-24 ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400 placeholder-green-400/50"
                    : "bg-white border-green-600/20 text-green-600 placeholder-green-600/50"
                }`}
              />
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={inputs.urlMode}
                onChange={(e) => setInputs((prev) => ({ ...prev, urlMode: e.target.value }))}
                className={`p-2 font-mono rounded border ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400"
                    : "bg-white border-green-600/20 text-green-600"
                }`}
              >
                <option value="encode">Codificar</option>
                <option value="decode">Decodificar</option>
              </select>

              <button
                onClick={() => handleGenerate("url")}
                className={`px-6 py-2 font-mono rounded border-2 transition-all ${
                  theme === "dark"
                    ? "border-green-400 hover:bg-green-400 hover:text-black"
                    : "border-green-600 hover:bg-green-600 hover:text-white"
                }`}
              >
                PROCESSAR
              </button>
            </div>

            {results.url && (
              <div className="flex items-center space-x-2">
                <textarea
                  value={results.url}
                  readOnly
                  className={`flex-1 p-2 font-mono text-sm rounded border h-24 ${
                    theme === "dark"
                      ? "bg-black border-green-400/20 text-green-400"
                      : "bg-white border-green-600/20 text-green-600"
                  }`}
                />
                <button
                  onClick={() => copyToClipboard(results.url, "url")}
                  className="p-2 hover:bg-green-400/10 rounded"
                >
                  {copied === "url" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            )}
          </div>
        )

      case "json":
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-sm mb-2">JSON:</label>
              <textarea
                value={inputs.jsonText}
                onChange={(e) => setInputs((prev) => ({ ...prev, jsonText: e.target.value }))}
                placeholder='{"exemplo": "json", "numero": 123}'
                className={`w-full p-3 font-mono rounded border h-32 ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400 placeholder-green-400/50"
                    : "bg-white border-green-600/20 text-green-600 placeholder-green-600/50"
                }`}
              />
            </div>

            <button
              onClick={() => handleGenerate("json")}
              className={`px-6 py-2 font-mono rounded border-2 transition-all ${
                theme === "dark"
                  ? "border-green-400 hover:bg-green-400 hover:text-black"
                  : "border-green-600 hover:bg-green-600 hover:text-white"
              }`}
            >
              FORMATAR JSON
            </button>

            {results.json && (
              <div className="flex items-center space-x-2">
                <textarea
                  value={results.json}
                  readOnly
                  className={`flex-1 p-2 font-mono text-sm rounded border h-48 ${
                    theme === "dark"
                      ? "bg-black border-green-400/20 text-green-400"
                      : "bg-white border-green-600/20 text-green-600"
                  }`}
                />
                <button
                  onClick={() => copyToClipboard(results.json, "json")}
                  className="p-2 hover:bg-green-400/10 rounded"
                >
                  {copied === "json" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            )}
          </div>
        )

      case "regex":
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-sm mb-2">Texto:</label>
              <textarea
                value={inputs.regexText}
                onChange={(e) => setInputs((prev) => ({ ...prev, regexText: e.target.value }))}
                placeholder="Digite o texto para buscar..."
                className={`w-full p-3 font-mono rounded border h-24 ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400 placeholder-green-400/50"
                    : "bg-white border-green-600/20 text-green-600 placeholder-green-600/50"
                }`}
              />
            </div>

            <div>
              <label className="block font-mono text-sm mb-2">Padrão RegEx:</label>
              <input
                type="text"
                value={inputs.regexPattern}
                onChange={(e) => setInputs((prev) => ({ ...prev, regexPattern: e.target.value }))}
                placeholder="Ex: \d+|\w+@\w+\.\w+"
                className={`w-full p-2 font-mono rounded border ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400 placeholder-green-400/50"
                    : "bg-white border-green-600/20 text-green-600 placeholder-green-600/50"
                }`}
              />
            </div>

            <button
              onClick={() => handleGenerate("regex")}
              className={`px-6 py-2 font-mono rounded border-2 transition-all ${
                theme === "dark"
                  ? "border-green-400 hover:bg-green-400 hover:text-black"
                  : "border-green-600 hover:bg-green-600 hover:text-white"
              }`}
            >
              BUSCAR
            </button>

            {results.regex.length > 0 && (
              <div>
                <label className="block font-mono text-sm mb-2">Resultados ({results.regex.length}):</label>
                <div
                  className={`p-3 font-mono text-sm rounded border max-h-32 overflow-y-auto ${
                    theme === "dark"
                      ? "bg-black border-green-400/20 text-green-400"
                      : "bg-white border-green-600/20 text-green-600"
                  }`}
                >
                  {results.regex.map((match, index) => (
                    <div key={index} className="mb-1">
                      • {match}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case "color":
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-sm mb-2">Cor (HEX):</label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={inputs.colorHex}
                  onChange={(e) => setInputs((prev) => ({ ...prev, colorHex: e.target.value }))}
                  className="w-16 h-10 rounded border"
                />
                <input
                  type="text"
                  value={inputs.colorHex}
                  onChange={(e) => setInputs((prev) => ({ ...prev, colorHex: e.target.value }))}
                  className={`flex-1 p-2 font-mono rounded border ${
                    theme === "dark"
                      ? "bg-black border-green-400/20 text-green-400"
                      : "bg-white border-green-600/20 text-green-600"
                  }`}
                />
                <button
                  onClick={() => handleGenerate("color")}
                  className={`px-6 py-2 font-mono rounded border-2 transition-all ${
                    theme === "dark"
                      ? "border-green-400 hover:bg-green-400 hover:text-black"
                      : "border-green-600 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  CONVERTER
                </button>
              </div>
            </div>

            {results.color.rgb && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="font-mono text-sm w-12">RGB:</label>
                  <input
                    type="text"
                    value={results.color.rgb}
                    readOnly
                    className={`flex-1 p-2 font-mono text-sm rounded border ${
                      theme === "dark"
                        ? "bg-black border-green-400/20 text-green-400"
                        : "bg-white border-green-600/20 text-green-600"
                    }`}
                  />
                  <button
                    onClick={() => copyToClipboard(results.color.rgb, "rgb")}
                    className="p-2 hover:bg-green-400/10 rounded"
                  >
                    {copied === "rgb" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="font-mono text-sm w-12">HSL:</label>
                  <input
                    type="text"
                    value={results.color.hsl}
                    readOnly
                    className={`flex-1 p-2 font-mono text-sm rounded border ${
                      theme === "dark"
                        ? "bg-black border-green-400/20 text-green-400"
                        : "bg-white border-green-600/20 text-green-600"
                    }`}
                  />
                  <button
                    onClick={() => copyToClipboard(results.color.hsl, "hsl")}
                    className="p-2 hover:bg-green-400/10 rounded"
                  >
                    {copied === "hsl" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div
      className={`p-6 rounded-lg border ${
        theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
      }`}
    >
      <h3 className="font-mono text-lg mb-6">Ferramentas Hacker</h3>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-mono text-sm rounded border transition-all ${
              activeTab === tab.id
                ? theme === "dark"
                  ? "border-green-400 bg-green-400/10 text-green-400"
                  : "border-green-600 bg-green-600/10 text-green-600"
                : theme === "dark"
                  ? "border-green-400/20 hover:border-green-400/50"
                  : "border-green-600/20 hover:border-green-600/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  )
}
