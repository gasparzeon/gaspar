"use client"

import type React from "react"

import { useState } from "react"
import { useAdmin } from "@/contexts/admin-context"
import { useQuiz } from "@/contexts/quiz-context"
import { useTheme } from "@/components/theme-provider"
import { LogOut, Trash2, Save, Edit3 } from "lucide-react"

export default function AdminPage() {
  const { isAuthenticated, login, logout, addLog, logs } = useAdmin()
  const { questions, updateQuestion, resetQuestions } = useQuiz()
  const { theme } = useTheme()
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctIndex: 0,
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(loginForm.username, loginForm.password)
    if (!success) {
      alert("Credenciais inválidas!")
    }
    setLoginForm({ username: "", password: "" })
  }

  const handleResetRanking = () => {
    if (confirm("Tem certeza que deseja resetar todo o ranking? Esta ação não pode ser desfeita.")) {
      localStorage.removeItem("cicada-ranking")
      addLog("Ranking resetado por gaspar")
      alert("Ranking resetado com sucesso!")
    }
  }

  const startEditQuestion = (questionId: number) => {
    const question = questions.find((q) => q.id === questionId)
    if (question) {
      setEditForm({
        question: question.question,
        options: [...question.options],
        correctIndex: question.correctIndex,
      })
      setEditingQuestion(questionId)
    }
  }

  const saveQuestion = () => {
    if (editingQuestion) {
      const updatedQuestion = {
        id: editingQuestion,
        question: editForm.question,
        options: [...editForm.options],
        correctIndex: editForm.correctIndex,
      }
      updateQuestion(editingQuestion, updatedQuestion)
      addLog(`Pergunta ${editingQuestion} editada por gaspar`)
      setEditingQuestion(null)
      alert("Pergunta salva com sucesso!")
    }
  }

  const cancelEdit = () => {
    setEditingQuestion(null)
    setEditForm({
      question: "",
      options: ["", "", "", ""],
      correctIndex: 0,
    })
  }

  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-black text-green-400" : "bg-white text-green-600"
        }`}
      >
        <div
          className={`max-w-md w-full p-8 rounded-lg border ${
            theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
          }`}
        >
          <h1 className="font-mono text-2xl font-bold mb-6 text-center">ACESSO ADMINISTRATIVO</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-sm mb-2">Usuário:</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className={`w-full p-3 font-mono rounded border ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400"
                    : "bg-white border-green-600/20 text-green-600"
                } focus:outline-none focus:border-green-400`}
                required
              />
            </div>
            <div>
              <label className="block font-mono text-sm mb-2">Senha:</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className={`w-full p-3 font-mono rounded border ${
                  theme === "dark"
                    ? "bg-black border-green-400/20 text-green-400"
                    : "bg-white border-green-600/20 text-green-600"
                } focus:outline-none focus:border-green-400`}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full p-3 font-mono rounded border-2 transition-all ${
                theme === "dark"
                  ? "border-green-400 hover:bg-green-400 hover:text-black"
                  : "border-green-600 hover:bg-green-600 hover:text-white"
              }`}
            >
              ENTRAR
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black text-green-400" : "bg-white text-green-600"}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-mono text-3xl font-bold">PAINEL ADMINISTRATIVO</h1>
          <button
            onClick={logout}
            className={`flex items-center space-x-2 px-4 py-2 font-mono rounded border transition-all ${
              theme === "dark"
                ? "border-red-400 text-red-400 hover:bg-red-400 hover:text-black"
                : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            }`}
          >
            <LogOut size={16} />
            <span>SAIR</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Actions Panel */}
          <div
            className={`p-6 rounded-lg border ${
              theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
            }`}
          >
            <h2 className="font-mono text-xl mb-4">Ações Rápidas</h2>

            <button
              onClick={handleResetRanking}
              className={`w-full mb-4 p-3 font-mono rounded border-2 transition-all flex items-center justify-center space-x-2 ${
                theme === "dark"
                  ? "border-red-400 text-red-400 hover:bg-red-400 hover:text-black"
                  : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              }`}
            >
              <Trash2 size={16} />
              <span>RESETAR RANKING</span>
            </button>

            <div
              className={`p-4 rounded border ${
                theme === "dark" ? "bg-black/50 border-green-400/10" : "bg-white border-green-600/10"
              }`}
            >
              <h3 className="font-mono text-sm mb-2">Estatísticas:</h3>
              <div className="font-mono text-xs space-y-1 opacity-80">
                <p>• Ranking atual: {JSON.parse(localStorage.getItem("cicada-ranking") || "[]").length} jogadores</p>
                <p>• Perguntas do quiz: {questions.length}</p>
                <p>• Logs de ações: {logs.length}</p>
              </div>
            </div>
          </div>

          {/* Logs Panel */}
          <div
            className={`p-6 rounded-lg border ${
              theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
            }`}
          >
            <h2 className="font-mono text-xl mb-4">Log de Ações</h2>
            <div
              className={`max-h-64 overflow-y-auto p-3 rounded border ${
                theme === "dark" ? "bg-black/50 border-green-400/10" : "bg-white border-green-600/10"
              }`}
            >
              {logs.length === 0 ? (
                <p className="font-mono text-sm opacity-60">Nenhuma ação registrada</p>
              ) : (
                logs.map((log, index) => (
                  <p key={index} className="font-mono text-xs mb-1 opacity-80">
                    {log}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quiz Editor */}
        <div
          className={`mt-8 p-6 rounded-lg border ${
            theme === "dark" ? "bg-gray-900/50 border-green-400/20" : "bg-gray-50 border-green-600/20"
          }`}
        >
          <h2 className="font-mono text-xl mb-6">Editor de Perguntas do Quiz</h2>

          <div className="space-y-4">
            {questions.map((question) => (
              <div
                key={question.id}
                className={`p-4 rounded border ${
                  theme === "dark" ? "bg-black/30 border-green-400/10" : "bg-white border-green-600/10"
                }`}
              >
                {editingQuestion === question.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.question}
                      onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                      className={`w-full p-2 font-mono text-sm rounded border ${
                        theme === "dark"
                          ? "bg-black border-green-400/20 text-green-400"
                          : "bg-white border-green-600/20 text-green-600"
                      }`}
                    />

                    {editForm.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="correct"
                          checked={editForm.correctIndex === index}
                          onChange={() => setEditForm({ ...editForm, correctIndex: index })}
                          className="text-green-400"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...editForm.options]
                            newOptions[index] = e.target.value
                            setEditForm({ ...editForm, options: newOptions })
                          }}
                          className={`flex-1 p-2 font-mono text-sm rounded border ${
                            theme === "dark"
                              ? "bg-black border-green-400/20 text-green-400"
                              : "bg-white border-green-600/20 text-green-600"
                          }`}
                        />
                      </div>
                    ))}

                    <div className="flex space-x-2">
                      <button
                        onClick={saveQuestion}
                        className={`px-4 py-2 font-mono text-sm rounded border transition-all flex items-center space-x-1 ${
                          theme === "dark"
                            ? "border-green-400 hover:bg-green-400 hover:text-black"
                            : "border-green-600 hover:bg-green-600 hover:text-white"
                        }`}
                      >
                        <Save size={14} />
                        <span>SALVAR</span>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className={`px-4 py-2 font-mono text-sm rounded border transition-all ${
                          theme === "dark"
                            ? "border-gray-400 hover:bg-gray-400 hover:text-black"
                            : "border-gray-600 hover:bg-gray-600 hover:text-white"
                        }`}
                      >
                        CANCELAR
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-mono text-sm font-bold">
                        {question.id}. {question.question}
                      </h3>
                      <button
                        onClick={() => startEditQuestion(question.id)}
                        className={`p-1 rounded hover:bg-green-400/10 transition-colors`}
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono opacity-80">
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded ${
                            index === question.correctIndex
                              ? theme === "dark"
                                ? "bg-green-400/20"
                                : "bg-green-600/20"
                              : theme === "dark"
                                ? "bg-gray-800/50"
                                : "bg-gray-100"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}) {option}
                          {index === question.correctIndex && " ✓"}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
