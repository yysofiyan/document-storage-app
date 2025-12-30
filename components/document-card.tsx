"use client"

import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, Trash2, Calendar } from "lucide-react"

interface Document {
  id: number
  name: string
  category: string
  description: string
  driveLink: string
  uploadDate: string
  fileSize: string
}

interface DocumentCardProps {
  document: Document
  onDelete: (id: number) => void
}

export function DocumentCard({ document, onDelete }: DocumentCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Bisnis: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Keuangan: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Hukum: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Medis: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      Pendidikan: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      Umum: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      Lainnya: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
    }
    return colors[category] || colors["Umum"]
  }

  return (
    <div className="bg-card border border-border rounded p-6 hover:border-primary transition-colors">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-primary/10 p-2 rounded">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground truncate">{document.name}</h3>
          <span
            className={`inline-block text-xs font-medium px-2 py-1 rounded mt-2 ${getCategoryColor(document.category)}`}
          >
            {document.category}
          </span>
        </div>
      </div>

      {/* Description */}
      {document.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{document.description}</p>
      )}

      {/* Metadata */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
        <Calendar className="w-3.5 h-3.5" />
        <span>{document.uploadDate}</span>
        {document.fileSize !== "--" && (
          <>
            <span>•</span>
            <span>{document.fileSize}</span>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button asChild variant="default" size="sm" className="flex-1 gap-1.5">
          <a href={document.driveLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
            Buka
          </a>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (confirm("Apakah Anda yakin ingin menghapus dokumen ini dari daftar?")) {
              onDelete(document.id)
            }
          }}
          className="px-3"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
