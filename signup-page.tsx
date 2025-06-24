"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Recycle, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateCPF = (cpf: string) => {
    // Remove non-numeric characters
    const cleanCPF = cpf.replace(/\D/g, "")
    return cleanCPF.length === 11
  }

  const formatCPF = (value: string) => {
    const cleanValue = value.replace(/\D/g, "")
    if (cleanValue.length <= 11) {
      return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    return value
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(e.target.value)
    setFormData((prev) => ({
      ...prev,
      cpf: formattedValue,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.cpf) {
      newErrors.cpf = "CPF é obrigatório"
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF deve ter 11 dígitos"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Create the payload in the requested format
      const payload = {
        user: {
          email: formData.email,
          cpf: formData.cpf.replace(/\D/g, ""), // Remove formatting for submission
        },
        credential: {
          login: formData.email, // Use email as login
          password: formData.password,
        },
      }

      console.log("Dados do cadastro:", payload)

      // Simulate successful registration
      alert("Cadastro realizado com sucesso!")
      window.location.href = "/login"
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
            <Link href="/login">
              <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-gray-900">Criar Conta</CardTitle>
              <p className="text-gray-600 mt-2">Junte-se ao Recicle-Me e faça a diferença</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* CPF Field */}
                <div className="space-y-2">
                  <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                    CPF *
                  </Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleCPFChange}
                    maxLength={14}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.cpf ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Senha *
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirmar Senha *
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Criar Conta
                </Button>

                {/* Login Link */}
                <div className="text-center">
                  <span className="text-sm text-gray-500">
                    {"Já tem uma conta? "}
                    <Link href="/login" className="text-green-500 hover:text-green-600 font-medium transition-colors">
                      Faça login
                    </Link>
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center space-x-2 px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
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
