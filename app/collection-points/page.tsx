import { Suspense } from "react"
import CollectionPointsPage from "../../components/main_pages/collection-points-page"

export default function Page() {
  return (
      <div className="min-h-screen bg-gray-100">
        <Suspense fallback={<div className="p-6">Carregando...</div>}>
          <CollectionPointsPage />
        </Suspense>
      </div>
  )
}
