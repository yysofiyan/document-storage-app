"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, AlertCircle } from "lucide-react"

interface DocumentUploadFormProps {
  onDocumentAdded: (document: any) => void
}

export function DocumentUploadForm({ onDocumentAdded }: DocumentUploadFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "Umum",
    description: "",
    driveLink: "",
  })

  const categories = ["Umum", "Bisnis", "Keuangan", "Hukum", "Medis", "Pendidikan", "Lainnya"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.driveLink) {
      alert("Silakan isi nama dokumen dan link Google Drive")
      return
    }

    setIsLoading(true)

    // Simulasi proses unggah
    setTimeout(() => {
      const newDocument = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        description: formData.description,
        driveLink: formData.driveLink,
        uploadDate: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        fileSize: "--",
      }

      onDocumentAdded(newDocument)
      setFormData({
        name: "",
        category: "Umum",
        description: "",
        driveLink: "",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-3 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Unggah dokumen Anda ke Google Drive terlebih dahulu, kemudian salin link shareable di sini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Nama Dokumen *</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="contoh: Proposal Bisnis 2024"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Kategori</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded bg-background text-foreground"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Deskripsi</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Berikan deskripsi singkat tentang dokumen ini..."
          rows={3}
          className="w-full px-3 py-2 border border-input rounded bg-background text-foreground resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Link Google Drive *</label>
        <Input
          type="url"
          name="driveLink"
          value={formData.driveLink}
          onChange={handleChange}
          placeholder="https://drive.google.com/file/d/..."
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Buka file di Google Drive → Klik kanan → Dapatkan link → Salin link shareable
        </p>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full gap-2">
        <Upload className="w-4 h-4" />
        {isLoading ? "Menyimpan..." : "Simpan Dokumen"}
      </Button>
    </form>
  )
}
