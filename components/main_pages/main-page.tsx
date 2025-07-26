"use client"

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Recycle, Leaf, MapPin, Plus} from "lucide-react"
import Navbar from "@/components/elements/navbar";
import PrivateRoute from "@/components/PrivateRoute"
import {useEffect, useState} from "react";
import {isAuthenticated} from "@/components/auth/utils";

export default function MainPage() {

    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        setAuthenticated(isAuthenticated())
    }, [])

    return (

        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <Navbar/>

            {/* Hero Section */}
            <section
                className="bg-gradient-to-br from-green-600 to-green-700 text-white py-20 px-6 mx-6 mt-6 rounded-2xl relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Large Recycling Symbol Background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <Recycle className="h-96 w-96 text-white"/>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 relative z-20">
                        Recicle de Forma Responsável com o Recicle-Me
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed relative z-20">
                        Junte-se à nossa comunidade e faça a diferença descartando adequadamente seus resíduos
                        eletrônicos e
                        recicláveis. Encontre pontos de coleta, acesse guias e acompanhe seu impacto.
                    </p>
                    <Link href="/materials">
                        <Button
                            className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-lg font-medium text-lg relative z-20">
                            Explorar Pontos de Coleta
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Quick Access Section */}
            <section className="px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Acesso Rápido</h2>
                    <div
                        className={`grid gap-6 "md:grid-cols-3" ${authenticated ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
                        {/* Find Collection Points */}
                        <Link href="/materials">
                            <Card
                                className="bg-gradient-to-br from-green-200 to-green-300 border-0 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                <CardContent className="p-6 h-48 flex flex-col justify-between">
                                    <div className="flex space-x-2 mb-4">
                                        <div className="bg-green-700 p-2 rounded">
                                            <Leaf className="h-6 w-6 text-white"/>
                                        </div>
                                        <div className="bg-green-700 p-2 rounded">
                                            <Recycle className="h-6 w-6 text-white"/>
                                        </div>
                                        <div className="bg-green-700 p-2 rounded">
                                            <Recycle className="h-6 w-6 text-white"/>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Encontrar Pontos de
                                            Coleta</h3>
                                        <p className="text-sm text-gray-700">
                                            Localize pontos de coleta próximos para resíduos eletrônicos e
                                            recicláveis.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Access Recycling Guides */}
                        <Link href="/guides">
                            <Card
                                className="bg-gradient-to-br from-green-600 to-green-700 border-0 text-white overflow-hidden">
                                <CardContent className="p-6 h-48 flex flex-col justify-between">
                                    <div className="flex justify-center mb-4">
                                        <div className="relative">
                                            <Recycle className="h-12 w-12 text-white opacity-80"/>
                                            <Leaf className="h-6 w-6 text-green-300 absolute -top-1 -right-1"/>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs mb-2 opacity-80">Esforço Mínimo</p>
                                        <p className="text-xs mb-3 opacity-80">Impacto Máximo</p>
                                        <h3 className="font-semibold mb-2">Acessar Guias de Reciclagem</h3>
                                        <p className="text-sm opacity-90">
                                            Aprenda como descartar adequadamente diferentes tipos de resíduos.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        {authenticated && (
                            <Link href="/register-collection-point">
                                <Card
                                    className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardContent className="p-6 h-48 flex flex-col justify-between">
                                        <div className="flex justify-center mb-4">
                                            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                                                <MapPin className="h-8 w-8 text-white"/>
                                                <Plus className="h-4 w-4 text-white absolute ml-6 -mt-2"/>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-semibold mb-2">Cadastrar Ponto de Coleta</h3>
                                            <p className="text-sm opacity-90">Registre seu ponto de coleta e ajude a
                                                comunidade a reciclar.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="px-6 py-16 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Pronto para Fazer a Diferença?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Junte-se ao Recicle-Me hoje e comece sua jornada rumo ao descarte responsável de resíduos.
                    </p>
                    <Button
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium text-lg">
                        Saiba Mais Sobre o Recicle-Me
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex space-x-8">
                            <Link href="/contact" className="text-gray-500 hover:text-gray-700 transition-colors">
                                Fale Conosco
                            </Link>
                            <Link href="/privacy" className="text-gray-500 hover:text-gray-700 transition-colors">
                                Política de Privacidade
                            </Link>
                            <Link href="/terms" className="text-gray-500 hover:text-gray-700 transition-colors">
                                Termos de Serviço
                            </Link>
                        </div>
                        <p className="text-gray-500 text-sm">©2024 Recicle-Me. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>

    )
}
