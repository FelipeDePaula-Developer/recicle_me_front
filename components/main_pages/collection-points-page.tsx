"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Recycle, Search, ChevronUp, ChevronDown } from "lucide-react"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { LatLngTuple } from "leaflet"
import Navbar from "@/components/elements/navbar";


// Dynamic imports for Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 flex items-center justify-center">Carregando mapa...</div>,
})
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

export default function CollectionPointsPage() {
  // Configure Leaflet icons
  const searchParams = useSearchParams()
  const material = searchParams.get("material") || "Vidro" // fallback para "Vidro" se não vier nada
  const [collectionPoints, setCollectionPoints] = useState<CollectionPoint[]>([])
  const [loading, setLoading] = useState(true)

  type CollectionPoint = {
    id: number
    name: string
    address: string
    position: LatLngTuple
  }

  useEffect(() => {
    const setupLeafletIcons = async () => {
      const L = await import("leaflet")

      // Import Leaflet CSS
      await import("leaflet/dist/leaflet.css")

      // Fix for default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })
    }

    const fetchCollectionPoints = async () => {
      try {
        const res = await fetch(`http://localhost:8080/pontos/list/${material}`)
        if (!res.ok) throw new Error("Erro ao buscar pontos de coleta")

        const data = await res.json()

        const mapped: CollectionPoint[] = data.map((item: any) => ({
          id: item.idPontoColeta,
          name: item.nome,
          address: item.endereco,
          position: [
            parseFloat(item.geoLocalizacao[0]),
            parseFloat(item.geoLocalizacao[1]),
          ] as LatLngTuple,
        }))

        setCollectionPoints(mapped)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    setupLeafletIcons()
    fetchCollectionPoints()
  }, [material])

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <Navbar />

        {/* Main Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar - Collection Points List */}
          <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
            {/* Header with Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Pontos de Coleta</h1>
              <div className="flex flex-col">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Collection Points List */}
            <div className="space-y-4">
              {collectionPoints.map((point) => (
                  <Link key={point.id} href={`/collection-points/${point.id}`} className="block mt-4">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1">
                            <Recycle className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{point.name}</h3>
                            <p className="text-sm text-gray-600">{point.address}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Interactive Map */}
          <div className="flex-1 relative">
            {/* Leaflet Map */}
            <div className="w-full h-full">
              <MapContainer
                  center={[-23.55052, -46.633308]}
                  zoom={13}
                  scrollWheelZoom={true}
                  style={{ height: "100%", width: "100%" }}
                  className="z-0"
              >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {collectionPoints.map((point) => (
                    <Marker key={point.id} position={point.position}>
                      <Popup>
                        <div className="text-center">
                          <strong className="text-gray-900">{point.name}</strong>
                          <br />
                          <span className="text-gray-600">{point.address}</span>
                          <br />
                          <Link
                              href={`/collection-points/${point.id}`}
                              className="text-green-600 hover:text-green-700 font-medium mt-2 inline-block"
                          >
                            Ver detalhes
                          </Link>
                        </div>
                      </Popup>
                    </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
  )
}
