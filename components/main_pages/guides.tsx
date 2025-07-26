"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Recycle, ArrowLeft, CheckCircle, AlertTriangle, Info, Bell } from "lucide-react"
import { useState } from "react"
import Navbar from "@/components/elements/navbar";

export default function GuidesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const categories = [
        {
            id: "electronics",
            name: "Eletrônicos",
            icon: "💻",
            color: "bg-blue-500",
            description: "Computadores, celulares, tablets e dispositivos eletrônicos",
        },
        {
            id: "paper",
            name: "Papel",
            icon: "📄",
            color: "bg-yellow-500",
            description: "Jornais, revistas, papelão e papel de escritório",
        },
        {
            id: "plastic",
            name: "Plástico",
            icon: "🥤",
            color: "bg-red-500",
            description: "Garrafas, embalagens, sacolas e recipientes plásticos",
        },
        {
            id: "glass",
            name: "Vidro",
            icon: "🍶",
            color: "bg-green-500",
            description: "Garrafas, potes e recipientes de vidro",
        },
        {
            id: "metal",
            name: "Metal",
            icon: "🥫",
            color: "bg-gray-500",
            description: "Latas de alumínio, aço e sucata metálica",
        },
        {
            id: "batteries",
            name: "Baterias",
            icon: "🔋",
            color: "bg-orange-500",
            description: "Pilhas, baterias e células de energia",
        },
        {
            id: "textiles",
            name: "Têxteis",
            icon: "👕",
            color: "bg-purple-500",
            description: "Roupas, tecidos e materiais têxteis",
        },
        {
            id: "organic",
            name: "Orgânicos",
            icon: "🍎",
            color: "bg-green-600",
            description: "Restos de comida e materiais compostáveis",
        },
    ]

    const guides = {
        electronics: {
            title: "Guia de Reciclagem de Eletrônicos",
            steps: [
                {
                    title: "Preparação",
                    icon: <Info className="h-5 w-5 text-blue-500" />,
                    content: [
                        "Faça backup de todos os dados importantes",
                        "Remova cartões de memória, SIM cards e baterias removíveis",
                        "Limpe o dispositivo e remova acessórios pessoais",
                        "Desconecte todos os cabos e acessórios",
                    ],
                },
                {
                    title: "Segurança de Dados",
                    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
                    content: [
                        "Execute formatação completa do disco rígido",
                        "Remova ou destrua fisicamente discos rígidos com dados sensíveis",
                        "Desconecte-se de todas as contas online",
                        "Remova informações pessoais armazenadas",
                    ],
                },
                {
                    title: "Descarte Correto",
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                    content: [
                        "Leve a pontos de coleta especializados em e-lixo",
                        "Nunca descarte no lixo comum",
                        "Procure programas de logística reversa dos fabricantes",
                        "Considere doação se o equipamento ainda funciona",
                    ],
                },
            ],
            tips: [
                "Eletrônicos contêm metais preciosos que podem ser recuperados",
                "Alguns componentes podem ser reutilizados em outros equipamentos",
                "Baterias de dispositivos devem ser descartadas separadamente",
            ],
            warnings: [
                "Nunca queime dispositivos eletrônicos",
                "Não tente desmontar equipamentos sem conhecimento técnico",
                "Cuidado com vazamentos de baterias antigas",
            ],
        },
        paper: {
            title: "Guia de Reciclagem de Papel",
            steps: [
                {
                    title: "Separação",
                    icon: <Info className="h-5 w-5 text-blue-500" />,
                    content: [
                        "Separe papéis limpos dos sujos",
                        "Remova grampos, clipes e fitas adesivas",
                        "Retire plásticos e outros materiais não-papel",
                        "Mantenha papéis secos e limpos",
                    ],
                },
                {
                    title: "Tipos Aceitos",
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                    content: [
                        "Jornais e revistas",
                        "Papel de escritório e cadernos",
                        "Caixas de papelão limpas",
                        "Embalagens de papel",
                    ],
                },
                {
                    title: "Não Recicláveis",
                    icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
                    content: [
                        "Papel higiênico e guardanapos usados",
                        "Papel carbono e papel laminado",
                        "Papéis plastificados ou encerados",
                        "Papéis com restos de comida",
                    ],
                },
            ],
            tips: [
                "Uma tonelada de papel reciclado economiza 17 árvores",
                "Papéis podem ser reciclados até 7 vezes",
                "Remover grampos facilita o processo de reciclagem",
            ],
            warnings: ["Papéis molhados podem contaminar outros materiais", "Não misture papel com outros tipos de resíduos"],
        },
        plastic: {
            title: "Guia de Reciclagem de Plástico",
            steps: [
                {
                    title: "Identificação",
                    icon: <Info className="h-5 w-5 text-blue-500" />,
                    content: [
                        "Procure pelo símbolo de reciclagem com número",
                        "Tipos 1 (PET) e 2 (PEAD) são mais facilmente recicláveis",
                        "Verifique se o plástico está limpo",
                        "Remova tampas e rótulos quando possível",
                    ],
                },
                {
                    title: "Limpeza",
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                    content: [
                        "Lave recipientes com água",
                        "Remova restos de comida e líquidos",
                        "Seque completamente antes do descarte",
                        "Não é necessário remover todos os rótulos",
                    ],
                },
                {
                    title: "Descarte",
                    icon: <Recycle className="h-5 w-5 text-green-600" />,
                    content: [
                        "Coloque em lixeiras de recicláveis",
                        "Não amasse garrafas PET excessivamente",
                        "Mantenha tampas junto com as garrafas",
                        "Evite misturar diferentes tipos de plástico",
                    ],
                },
            ],
            tips: [
                "Plásticos tipo 1 (PET) podem virar novas garrafas ou roupas",
                "Sacolas plásticas devem ir para pontos específicos em supermercados",
                "Plásticos escuros são mais difíceis de reciclar",
            ],
            warnings: [
                "Plásticos sujos podem contaminar outros recicláveis",
                "Nem todos os plásticos são recicláveis",
                "Evite plásticos de uso único quando possível",
            ],
        },
        glass: {
            title: "Guia de Reciclagem de Vidro",
            steps: [
                {
                    title: "Preparação",
                    icon: <Info className="h-5 w-5 text-blue-500" />,
                    content: [
                        "Remova tampas e rótulos",
                        "Lave recipientes com água",
                        "Seque completamente",
                        "Separe por cores se solicitado",
                    ],
                },
                {
                    title: "Tipos Aceitos",
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                    content: [
                        "Garrafas de bebidas",
                        "Potes de conservas e geleias",
                        "Frascos de perfume e cosméticos",
                        "Recipientes de vidro em geral",
                    ],
                },
                {
                    title: "Cuidados",
                    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
                    content: [
                        "Cuidado com vidros quebrados",
                        "Embale fragmentos em papel ou caixa",
                        "Não misture com outros tipos de vidro",
                        "Vidros temperados precisam de descarte especial",
                    ],
                },
            ],
            tips: [
                "Vidro pode ser reciclado infinitas vezes sem perder qualidade",
                "Reciclagem de vidro economiza energia e matéria-prima",
                "Vidros coloridos devem ser separados quando possível",
            ],
            warnings: [
                "Espelhos e vidros de janela não são recicláveis com vidros comuns",
                "Lâmpadas precisam de descarte especial",
                "Vidros de automóveis têm composição diferente",
            ],
        },
        metal: {
            title: "Guia de Reciclagem de Metal",
            steps: [
                {
                    title: "Separação",
                    icon: <Info className="h-5 w-5 text-blue-500" />,
                    content: [
                        "Separe alumínio de outros metais",
                        "Remova rótulos e restos de comida",
                        "Lave latas e recipientes",
                        "Amasse latas para economizar espaço",
                    ],
                },
                {
                    title: "Tipos Comuns",
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                    content: [
                        "Latas de alumínio (refrigerantes, cervejas)",
                        "Latas de aço (conservas, tinta)",
                        "Tampas metálicas",
                        "Utensílios domésticos de metal",
                    ],
                },
                {
                    title: "Valor Agregado",
                    icon: <Recycle className="h-5 w-5 text-green-600" />,
                    content: [
                        "Alumínio tem alto valor de reciclagem",
                        "Separe fios de cobre quando possível",
                        "Metais ferrosos podem ser testados com ímã",
                        "Procure sucateiros para grandes quantidades",
                    ],
                },
            ],
            tips: [
                "Reciclagem de alumínio economiza 95% da energia necessária para produção",
                "Uma lata de alumínio pode virar nova lata em 60 dias",
                "Metais são 100% recicláveis sem perda de qualidade",
            ],
            warnings: [
                "Cuidado com bordas cortantes de latas abertas",
                "Não misture metais com outros materiais",
                "Aerossóis devem estar completamente vazios",
            ],
        },
        batteries: {
            title: "Guia de Descarte de Baterias",
            steps: [
                {
                    title: "Identificação",
                    icon: <Info className="h-5 w-5 text-blue-500" />,
                    content: [
                        "Identifique o tipo de bateria",
                        "Verifique se há vazamentos",
                        "Mantenha terminais isolados",
                        "Separe por tipo quando possível",
                    ],
                },
                {
                    title: "Armazenamento Seguro",
                    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
                    content: [
                        "Mantenha em local seco e fresco",
                        "Evite contato entre terminais",
                        "Use fita isolante nos terminais",
                        "Não armazene por muito tempo",
                    ],
                },
                {
                    title: "Pontos de Coleta",
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                    content: [
                        "Leve a pontos de coleta especializados",
                        "Muitas lojas de eletrônicos aceitam baterias",
                        "Nunca descarte no lixo comum",
                        "Procure programas de logística reversa",
                    ],
                },
            ],
            tips: [
                "Baterias contêm metais pesados que podem ser recuperados",
                "Algumas baterias podem ser recondicionadas",
                "Baterias de carro têm pontos específicos de coleta",
            ],
            warnings: [
                "Baterias podem vazar substâncias tóxicas",
                "Nunca queime ou perfure baterias",
                "Evite contato com líquidos de baterias vazadas",
                "Mantenha longe de crianças",
            ],
        },
        textiles: {
            title: "Guia de Reciclagem de Têxteis",
            steps: [
                {
                    title: "Avaliação",
                    icon: <Info className="h-5 w-5 text-blue-500" />,
                    content: [
                        "Avalie se a peça ainda pode ser usada",
                        "Separe roupas em bom estado das danificadas",
                        "Lave as peças antes da doação",
                        "Remova botões e zíperes se necessário",
                    ],
                },
                {
                    title: "Doação",
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                    content: [
                        "Doe roupas em bom estado para instituições",
                        "Procure brechós e bazares beneficentes",
                        "Considere trocas com amigos e família",
                        "Use aplicativos de doação e troca",
                    ],
                },
                {
                    title: "Reciclagem",
                    icon: <Recycle className="h-5 w-5 text-green-600" />,
                    content: [
                        "Roupas muito danificadas podem virar trapos",
                        "Alguns tecidos podem ser compostados",
                        "Procure pontos de coleta de têxteis",
                        "Considere upcycling e customização",
                    ],
                },
            ],
            tips: [
                "Roupas de algodão podem ser compostadas se 100% naturais",
                "Tecidos sintéticos podem ser reciclados em novos produtos",
                "Sapatos têm pontos específicos de coleta",
            ],
            warnings: [
                "Roupas muito sujas ou mofadas podem não ser aceitas",
                "Tecidos mistos são mais difíceis de reciclar",
                "Roupas íntimas geralmente não são aceitas para doação",
            ],
        },
        organic: {
            title: "Guia de Compostagem de Orgânicos",
            steps: [
                {
                    title: "Separação",
                    icon: <Info className="h-5 w-5 text-blue-500" />,
                    content: [
                        "Separe restos de frutas e vegetais",
                        "Inclua cascas de ovos",
                        "Adicione borra de café e filtros",
                        "Evite carnes e laticínios",
                    ],
                },
                {
                    title: "Compostagem Caseira",
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                    content: [
                        "Use uma composteira ou faça uma pilha",
                        "Alterne camadas de materiais secos e úmidos",
                        "Mantenha umidade adequada",
                        "Vire o composto regularmente",
                    ],
                },
                {
                    title: "Coleta Seletiva",
                    icon: <Recycle className="h-5 w-5 text-green-600" />,
                    content: [
                        "Use lixeira específica para orgânicos",
                        "Mantenha em local arejado",
                        "Troque sacos regularmente",
                        "Procure programas de coleta de orgânicos",
                    ],
                },
            ],
            tips: [
                "Compostagem reduz até 30% do lixo doméstico",
                "Composto pronto é excelente adubo para plantas",
                "Minhocas aceleram o processo de decomposição",
            ],
            warnings: [
                "Evite carnes, peixes e laticínios na compostagem",
                "Óleos e gorduras podem atrair pragas",
                "Mantenha longe de animais domésticos",
            ],
        },
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <Navbar/>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {!selectedCategory ? (
                    <>
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Guias de Reciclagem</h1>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Aprenda como descartar adequadamente diferentes tipos de materiais e faça sua parte na preservação do
                                meio ambiente. Selecione uma categoria para ver o guia detalhado.
                            </p>
                        </div>

                        {/* Categories Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {categories.map((category) => (
                                <Card
                                    key={category.id}
                                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <CardContent className="p-6 text-center">
                                        <div className="text-4xl mb-4">{category.icon}</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Back Button */}
                        <div className="text-center">
                            <Link href="/">
                                <Button
                                    variant="outline"
                                    className="flex items-center space-x-2 px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    <span>Voltar ao Dashboard</span>
                                </Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Guide Detail View */}
                        <div className="mb-8">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedCategory(null)}
                                className="flex items-center space-x-2 mb-6"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Voltar aos Guias</span>
                            </Button>

                            <div className="flex items-center space-x-4 mb-6">
                                <div className="text-4xl">{categories.find((cat) => cat.id === selectedCategory)?.icon}</div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {guides[selectedCategory as keyof typeof guides]?.title}
                                    </h1>
                                    <p className="text-gray-600">{categories.find((cat) => cat.id === selectedCategory)?.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Guide Steps */}
                        <div className="grid gap-8 mb-12">
                            {guides[selectedCategory as keyof typeof guides]?.steps.map((step, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-3">
                                            {step.icon}
                                            <span>{step.title}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {step.content.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-start space-x-2">
                                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Tips and Warnings */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Tips */}
                            <Card className="border-green-200 bg-green-50">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2 text-green-800">
                                        <Info className="h-5 w-5" />
                                        <span>Dicas Importantes</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {guides[selectedCategory as keyof typeof guides]?.tips.map((tip, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <Badge variant="secondary" className="bg-green-100 text-green-800 mt-0.5">
                                                    💡
                                                </Badge>
                                                <span className="text-green-800 text-sm">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Warnings */}
                            <Card className="border-yellow-200 bg-yellow-50">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2 text-yellow-800">
                                        <AlertTriangle className="h-5 w-5" />
                                        <span>Cuidados e Avisos</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {guides[selectedCategory as keyof typeof guides]?.warnings.map((warning, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 mt-0.5">
                                                    ⚠️
                                                </Badge>
                                                <span className="text-yellow-800 text-sm">{warning}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
