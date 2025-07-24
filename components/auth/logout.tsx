"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        // Limpa o token e outros dados do localStorage
        localStorage.removeItem("jwt")

        // Redireciona para login ou home
        router.push("/")
    }, [router])

    return (
        <div className="p-6 text-center">
            <p>Saindo...</p>
        </div>
    )
}
