"use client"

import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

const LoginAlert = () => {
  const searchParams = useSearchParams()
  const message = searchParams.get("message")
  const hasShownToast = useRef(false)

  useEffect(() => {
    if (message === "login-required" && !hasShownToast.current) {
      hasShownToast.current = true
      toast.error("É necessário fazer login para consultar agendamentos")

      // Limpa o parâmetro da URL sem recarregar a página
      const url = new URL(window.location.href)
      url.searchParams.delete("message")
      window.history.replaceState({}, "", url.toString())
    }
  }, [message])

  return null
}

export default LoginAlert
