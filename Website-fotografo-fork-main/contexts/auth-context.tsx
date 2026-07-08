"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface UsuarioSessao {
  id: string
  nome: string
  email: string
  papel_acesso: string
}

interface AuthContextType {
  user: UsuarioSessao | null
  loading: boolean
  loginSessao: (usuario: UsuarioSessao) => void
  logoutSessao: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsuarioSessao | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/me")
      .then((res) => {
        if (res.ok) return res.json()
        throw new Error("Not authenticated")
      })
      .then((data: UsuarioSessao) => {
        setUser(data)
        localStorage.setItem("UsuarioAtual", JSON.stringify(data))
      })
      .catch(() => {
        limparSessaoLocal()
      })
      .finally(() => setLoading(false))
  }, [])

  const limparSessaoLocal = () => {
    localStorage.removeItem("UsuarioAtual")
    document.cookie = "usuario_papel=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    setUser(null)
  }

  const loginSessao = (usuario: UsuarioSessao) => {
    localStorage.setItem("UsuarioAtual", JSON.stringify(usuario))
    setUser(usuario)
  }

  const logoutSessao = async () => {
    await fetch("/api/logout", { method: "POST" })
    limparSessaoLocal()
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginSessao, logoutSessao }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}