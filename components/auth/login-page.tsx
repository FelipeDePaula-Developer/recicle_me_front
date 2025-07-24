"use client"

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Recycle} from "lucide-react"
import React from "react"
import {useRouter} from "next/navigation"
import Navbar from "@/components/elements/navbar";

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
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({login, password}),
                credentials: "include",
            });

            const contentType = response.headers.get("Content-Type") || "";

            if (!response.ok) {
                let errorMessage = "Erro desconhecido";

                if (contentType.includes("application/json")) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
                } else {
                    errorMessage = await response.text(); // por exemplo: "Login Fail"
                }

                throw new Error(errorMessage);
            }

            let ret = await response.json();
            console.log(ret);
            localStorage.setItem("jwt", ret.token)
            router.push("/");
        } catch (error: unknown) {
            console.error("Login error:", error);

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocorreu um erro desconhecido.");
            }

            if (formRef.current) {
                formRef.current.reset();
            }
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <Navbar/>

            {/* Login Form */}
            <div className="flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-md space-y-8">
                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Bem-vindo de Volta</h1>
                    </div>

                    <form ref={formRef} className="space-y-6" onSubmit={onSubmit}>
                        {/* Login Field */}
                        <div className="space-y-2">
                            <Label htmlFor="login" className="text-sm font-medium text-gray-700">
                                Email ou Login
                            </Label>
                            <Input
                                id="login"
                                name="login"
                                type="text"
                                placeholder="Digite seu login"
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
                                name="password"
                                type="password"
                                placeholder="Digite sua senha"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                required
                            />
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <Link href="/forgot-password"
                                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                                Esqueceu a Senha?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? "Entrando..." : "Entrar"}
                        </Button>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

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
