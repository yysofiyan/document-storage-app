"use client"

import { DocumentCard } from "./document-card"

interface Document {
  id: string
  name: string
  category: string
  description: string
  driveLink: string
  uploadDate: string
  fileSize: string
}

interface DocumentListProps {
  documents: Document[]
  onDelete: (id: string) => void
}

export function DocumentList({ documents, onDelete }: DocumentListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} onDelete={onDelete} />
      ))}
    </div>
  )
}
