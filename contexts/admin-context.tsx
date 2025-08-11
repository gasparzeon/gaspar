"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface AdminContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  addLog: (action: string) => void
  logs: string[]
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const authStatus = localStorage.getItem("cicada-admin-auth")
    const savedLogs = localStorage.getItem("cicada-admin-logs")

    if (authStatus === "true") {
      setIsAuthenticated(true)
    }

    if (savedLogs) {
      setLogs(JSON.parse(savedLogs))
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    // Credenciais fixas (em produção, isso deveria estar no backend)
    const validCredentials = btoa("gaspar:Gaspar@1010")
    const inputCredentials = btoa(`${username}:${password}`)

    if (inputCredentials === validCredentials) {
      setIsAuthenticated(true)
      localStorage.setItem("cicada-admin-auth", "true")
      addLog(`Login realizado por ${username}`)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("cicada-admin-auth")
    addLog("Logout realizado")
  }

  const addLog = (action: string) => {
    const timestamp = new Date().toLocaleString("pt-BR")
    const logEntry = `${action} em ${timestamp}`
    const newLogs = [logEntry, ...logs].slice(0, 50) // Manter apenas os últimos 50 logs
    setLogs(newLogs)
    localStorage.setItem("cicada-admin-logs", JSON.stringify(newLogs))
  }

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, addLog, logs }}>{children}</AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin deve ser usado dentro de AdminProvider")
  }
  return context
}
