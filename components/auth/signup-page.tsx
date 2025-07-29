"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Recycle, ArrowLeft } from "lucide-react"
import Navbar from "@/components/elements/navbar";

export default function SignupPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    cpf: "",
    login: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }

    setGeneralError("")
  }

  const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, "")
    return cleanCPF.length === 11
  }

  const formatCPF = (value: string) => {
    const cleanValue = value.replace(/\D/g, "")
    return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(e.target.value)
    setFormData((prev) => ({
      ...prev,
      cpf: formattedValue,
    }))
    if (errors.cpf) {
      setErrors((prev) => ({
        ...prev,
        cpf: "",
      }))
    }

    setGeneralError("")
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) newErrors.email = "Email é obrigatório"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido"

    if (!formData.cpf) newErrors.cpf = "CPF é obrigatório"
    else if (!validateCPF(formData.cpf)) newErrors.cpf = "CPF deve ter 11 dígitos"

    if (!formData.login) newErrors.login = "Login é obrigatório"

    if (!formData.password) newErrors.password = "Senha é obrigatória"
    else if (formData.password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres"

    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirmação de senha é obrigatória"
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Senhas não coincidem"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateForm()) return

    setErrors({})
    setGeneralError("")

    const requestBody = {
      user: {
        email: formData.email,
        cpf: formData.cpf.replace(/\D/g, "")
      },
      credential: {
        login: formData.login,
        password: formData.password
      }
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${apiUrl}user/cad`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        credentials: "include",
      })

      const contentType = response.headers.get("Content-Type") || ""

      if (!response.ok) {
        let message = "Erro ao cadastrar"

        if (contentType.includes("application/json")) {
          const data = await response.json()
          if (data.messages) {
            const newErrors: Record<string, string> = {}
            data.messages.forEach((error: { field: string; message: string }) => {
              newErrors[error.field] = error.message
            })
            setErrors(newErrors)
            message = "Verifique os campos destacados"
          }
        } else {
          message = await response.text()
        }

        setGeneralError(message)
        return
      }

      router.push("/")

    } catch (error) {
      console.error("Erro ao cadastrar:", error)
      setGeneralError("Erro inesperado. Tente novamente.")
    }
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar/>

        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <Card className="shadow-lg">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-gray-900">Criar Conta</CardTitle>
                <p className="text-gray-600 mt-2">Junte-se ao Recicle-Me e faça a diferença</p>
              </CardHeader>

              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                        id="cpf"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={handleCPFChange}
                        maxLength={14}
                        className={`w-full border rounded-lg ${errors.cpf ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login">Login *</Label>
                    <Input
                        id="login"
                        name="login"
                        type="text"
                        placeholder="Digite seu login"
                        value={formData.login}
                        onChange={handleInputChange}
                        className={`w-full border rounded-lg ${errors.login ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.login && <p className="text-red-500 text-sm">{errors.login}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha *</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Digite sua senha"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full border rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirme sua senha"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full border rounded-lg ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                  </div>

                  {generalError && (
                      <p className="text-center text-sm text-red-600 font-medium">{generalError}</p>
                  )}

                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg">
                    Criar Conta
                  </Button>

                  <div className="text-center">
                  <span className="text-sm text-gray-500">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="text-green-500 hover:text-green-600 font-medium">
                      Faça login
                    </Link>
                  </span>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <Link href="/login">
                <Button variant="outline" className="flex items-center space-x-2 px-6 py-3">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Voltar ao Início</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}
