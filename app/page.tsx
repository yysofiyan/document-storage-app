"use client"

import { Suspense, useState } from "react"
import { DocumentUploadForm } from "@/components/document-upload-form"
import { DocumentList } from "@/components/document-list"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Document {
  id: string
  name: string
  category: string
  description: string
  driveLink: string
  uploadDate: string
  fileSize: string
}

function DocumentManagerContent() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Proposal Bisnis Q1 2024",
      category: "Bisnis",
      description: "Proposal pengembangan bisnis untuk kuartal pertama",
      driveLink: "https://drive.google.com/file/d/example1",
      uploadDate: "15 Des 2024",
      fileSize: "2.5 MB",
    },
    {
      id: "2",
      name: "Invoice Klien ABC",
      category: "Keuangan",
      description: "Faktur pembayaran klien ABC bulan Desember",
      driveLink: "https://drive.google.com/file/d/example2",
      uploadDate: "10 Des 2024",
      fileSize: "1.2 MB",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [showUploadForm, setShowUploadForm] = useState(false)

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDocumentAdded = (newDocument: Document) => {
    setDocuments([newDocument, ...documents])
    setShowUploadForm(false)
  }

  const handleDocumentDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
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

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <DocumentManagerContent />
      </Suspense>
    </main>
  )
}
