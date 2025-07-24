"use client"

import Link from "next/link"
import { Recycle } from "lucide-react"
import {isAuthenticated} from "@/components/auth/utils";
import {useEffect, useState} from "react";

export default function Navbar() {
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        setAuthenticated(isAuthenticated())
    }, [])
    return (
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
                    <Link href="/materials" className="text-gray-600 hover:text-gray-800 transition-colors">
                        Pontos de Coleta
                    </Link>
                    <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
                        Sobre Nós
                    </Link>
                    <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors">
                        Contato
                    </Link>

                    {!authenticated ? (
                        <Link href="/login" className="text-gray-600 hover:text-gray-800 transition-colors">
                            Login
                        </Link>
                    ) : (
                        <Link href="/logout" className="text-gray-600 hover:text-gray-800 transition-colors">
                            Logout
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
