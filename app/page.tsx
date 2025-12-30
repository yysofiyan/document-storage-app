import { Suspense } from "react"
import { DocumentManager } from "@/components/document-manager"
import { getDocuments } from "@/app/actions"

export const runtime = "edge"
export const dynamic = "force-dynamic"

export default async function Home() {
  const documents = await getDocuments()

  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <DocumentManager initialDocuments={documents} />
      </Suspense>
    </main>
  )
}
