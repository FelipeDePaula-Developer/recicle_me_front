"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Recycle } from "lucide-react"
import React from "react";
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState("")
  const formRef = React.useRef<HTMLFormElement>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const login = formData.get("login") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
        credentials: "include",
      }).then(function(response) {
        return response.json()
      })

      if (response.status == "UNAUTHORIZED") {
        throw new Error(response.messages[0])
      }

      router.push("/")
    } catch (error: unknown) {
      console.error("Login error:", error)

      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }

      if (formRef.current) {
        formRef.current.reset()
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Recycle className="h-6 w-6 text-gray-800" />
            <span className="text-xl font-semibold text-gray-800">Recicle-Me</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
              Início
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-800 transition-colors">
              Serviços
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
              Sobre Nós
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors">
              Contato
            </Link>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">Login</Button>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md space-y-8">
          {/* Welcome Back Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Bem-vindo de Volta</h1>
          </div>

          {/* Login Form */}
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              // Simulate login success and redirect to dashboard
              window.location.href = "/dashboard"
            }}
          >
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Esqueceu a Senha?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Entrar
            </Button>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-sm text-gray-500">
                {"Não tem uma conta? "}
                <Link href="/signup" className="text-green-500 hover:text-green-600 font-medium transition-colors">
                  Cadastre-se
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
