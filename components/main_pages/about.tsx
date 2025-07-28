import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Recycle, Target, Eye, Heart, Award, MapPin, GraduationCap, Bell } from "lucide-react"
import Navbar from "@/components/elements/navbar";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
           <Navbar/>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center mb-6">
                        <Recycle className="h-16 w-16 text-white mr-4" />
                        <h1 className="text-4xl md:text-5xl font-bold">Sobre o Recicle-Me</h1>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                        Uma plataforma desenvolvida para facilitar o descarte responsável de lixo eletrônico e reciclável,
                        contribuindo para a conscientização ambiental e preservação do meio ambiente.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Nossa História */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nossa História</h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                O Recicle-Me nasceu como um projeto acadêmico na{" "}
                                <strong>UNINTER (Centro Universitário Internacional)</strong>, desenvolvido no curso de{" "}
                                <strong>Bacharelado em Engenharia de Software</strong> como parte das Atividades Extensionistas focadas
                                em Tecnologia Aplicada à Inclusão Digital.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Nosso objetivo é fornecer uma plataforma acessível e intuitiva onde os usuários possam encontrar
                                informações sobre como descartar corretamente materiais eletrônicos e recicláveis, além de localizar
                                pontos de coleta próximos.
                            </p>
                            <div className="flex items-center space-x-4">
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    Diadema - SP
                                </Badge>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                    <GraduationCap className="h-4 w-4 mr-1" />
                                    Projeto Acadêmico
                                </Badge>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 text-center">
                                <Recycle className="h-24 w-24 text-green-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tecnologia para o Bem</h3>
                                <p className="text-gray-700">Utilizando tecnologia moderna para resolver problemas ambientais reais</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Missão, Visão e Valores */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nossos Pilares</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Missão */}
                        <Card className="text-center">
                            <CardHeader>
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <Target className="h-8 w-8 text-green-600" />
                                </div>
                                <CardTitle className="text-xl text-gray-900">Nossa Missão</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed">
                                    Facilitar o descarte responsável de resíduos eletrônicos e recicláveis, fornecendo uma plataforma
                                    acessível que conecta usuários a pontos de coleta e informações educativas.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Visão */}
                        <Card className="text-center">
                            <CardHeader>
                                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Eye className="h-8 w-8 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl text-gray-900">Nossa Visão</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed">
                                    Ser referência em soluções digitais para reciclagem, contribuindo para cidades mais sustentáveis e
                                    conscientização ambiental em toda a sociedade.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Valores */}
                        <Card className="text-center">
                            <CardHeader>
                                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                    <Heart className="h-8 w-8 text-purple-600" />
                                </div>
                                <CardTitle className="text-xl text-gray-900">Nossos Valores</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-gray-700 leading-relaxed space-y-2">
                                    <li>• Sustentabilidade ambiental</li>
                                    <li>• Acessibilidade digital</li>
                                    <li>• Educação e conscientização</li>
                                    <li>• Inovação tecnológica</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Objetivos de Desenvolvimento Sustentável */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Compromisso com os ODS</h2>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
                        <p className="text-lg text-gray-700 mb-6 text-center">
                            O Recicle-Me está alinhado com os Objetivos de Desenvolvimento Sustentável da ONU:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border-green-200 bg-green-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                            11
                                        </div>
                                        <h3 className="font-semibold text-green-800">Cidades e Comunidades Sustentáveis</h3>
                                    </div>
                                    <p className="text-green-700 text-sm">
                                        Promovendo práticas sustentáveis de descarte e reciclagem em áreas urbanas.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-blue-200 bg-blue-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                            12
                                        </div>
                                        <h3 className="font-semibold text-blue-800">Consumo e Produção Responsáveis</h3>
                                    </div>
                                    <p className="text-blue-700 text-sm">
                                        Educando sobre descarte responsável e redução do impacto ambiental.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Tecnologia */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nossa Tecnologia</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Award className="h-5 w-5 text-green-600" />
                                    <span>Arquitetura Moderna</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Front-end:</span>
                                        <Badge variant="outline">React</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Back-end:</span>
                                        <Badge variant="outline">Java + Spring Boot</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Padrão:</span>
                                        <Badge variant="outline">MVC</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Target className="h-5 w-5 text-blue-600" />
                                    <span>Características</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span>Interface intuitiva e acessível</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span>Performance otimizada</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span>Segurança de dados</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span>Escalabilidade garantida</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Desenvolvedor */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Desenvolvedor</h2>
                    <Card className="max-w-2xl mx-auto">
                        <CardContent className="p-8 text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">FS</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Felipe de Paula Silva</h3>
                            <p className="text-gray-600 mb-4">Estudante de Engenharia de Software</p>
                            <div className="space-y-2 text-sm text-gray-700">
                                <p>
                                    <strong>Instituição:</strong> Centro Universitário Internacional UNINTER
                                </p>
                                <p>
                                    <strong>Escola:</strong> Escola Superior Politécnica - ESP
                                </p>
                                <p>
                                    <strong>RU:</strong> 4152747
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Call to Action */}
                <section className="text-center bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Junte-se ao Movimento</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Faça parte da mudança! Utilize nossa plataforma para descartar seus resíduos de forma responsável e
                        contribua para um futuro mais sustentável.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/materials">
                            <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium">
                                Encontrar Pontos de Coleta
                            </Button>
                        </Link>
                        <Link href="/guides">
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-medium bg-transparent"
                            >
                                Ver Guias de Reciclagem
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
}
