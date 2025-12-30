"use client"

import { useState } from "react"
import { DocumentUploadForm } from "@/components/document-upload-form"
import { DocumentList } from "@/components/document-list"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { deleteDocument } from "@/app/actions"

export interface Document {
  id: number
  name: string
  category: string
  description: string
  driveLink: string
  uploadDate: string
  fileSize: string
}

interface DocumentManagerProps {
  initialDocuments: Document[]
}

export function DocumentManager({ initialDocuments }: DocumentManagerProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showUploadForm, setShowUploadForm] = useState(false)

  // We use the props as the source of truth, assuming the parent passes updated data on refresh
  const documents = initialDocuments

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDocumentAdded = () => {
    setShowUploadForm(false)
    router.refresh()
  }

  const handleDocumentDelete = async (id: number) => {
    const result = await deleteDocument(id)
    if (result.success) {
      router.refresh()
    } else {
      alert("Failed to delete document")
    }
  }

  return (
    <>
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Pengelola Dokumen</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Simpan dan kelola dokumen Anda dengan rapi di Google Drive
              </p>
            </div>
            <Button onClick={() => setShowUploadForm(!showUploadForm)} className="gap-2">
              <Plus className="w-4 h-4" />
              {showUploadForm ? "Tutup" : "Unggah Dokumen"}
            </Button>
          </div>

          {/* Search */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari dokumen berdasarkan nama, kategori, atau deskripsi..."
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {showUploadForm && (
          <div className="mb-8 bg-card border border-border rounded p-6">
            <DocumentUploadForm onDocumentAdded={handleDocumentAdded} />
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded p-4">
            <p className="text-muted-foreground text-sm font-medium">Total Dokumen</p>
            <p className="text-3xl font-bold text-foreground mt-2">{documents.length}</p>
          </div>
          <div className="bg-card border border-border rounded p-4">
            <p className="text-muted-foreground text-sm font-medium">Kategori Aktif</p>
            <p className="text-3xl font-bold text-foreground mt-2">{new Set(documents.map((d) => d.category)).size}</p>
          </div>
          <div className="bg-card border border-border rounded p-4">
            <p className="text-muted-foreground text-sm font-medium">Hasil Pencarian</p>
            <p className="text-3xl font-bold text-foreground mt-2">{filteredDocuments.length}</p>
          </div>
        </div>

        {/* Documents List */}
        <DocumentList documents={filteredDocuments} onDelete={handleDocumentDelete} />

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12 bg-card border border-dashed border-border rounded">
            <p className="text-muted-foreground text-lg">Tidak ada dokumen yang ditemukan</p>
            <Button variant="outline" onClick={() => setShowUploadForm(true)} className="mt-4 gap-2">
              <Plus className="w-4 h-4" />
              Mulai dengan mengunggah dokumen
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
