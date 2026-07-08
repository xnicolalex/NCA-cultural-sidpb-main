"use client"

import type React from "react"
import { useCallback, useState } from "react"
import { Upload, X, ImageIcon } from "lucide-react" 
import { toast } from "sonner" 
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ImageFile } from "./contribution-flow"

type UploadStepProps = {
  images: ImageFile[]
  setImages: (images: ImageFile[]) => void
  onNext: () => void
}

const validarImagem = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const formatosPermitidos = ['image/jpeg', 'image/png']
    if (!formatosPermitidos.includes(file.type)) {
      reject(`"${file.name}" possui formato inválido. Apenas JPEG, JPG e PNG são aceitos.`)
      return
    }
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      if (img.width < 800 || img.height < 600) reject(`"${file.name}" tem resolução baixa (${img.width}x${img.height}). O mínimo é 800x600.`)
      else resolve(file)
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(`O arquivo "${file.name}" está corrompido ou não é válido.`)
    }
    img.src = objectUrl
  })
}

export function UploadStep({ images, setImages, onNext }: UploadStepProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const processFiles = useCallback(async (files: File[]) => {
    setIsProcessing(true)
    const validFiles: File[] = []
    for (const file of files) {
      try {
        const validFile = await validarImagem(file)
        validFiles.push(validFile)
      } catch (error) {
        toast.error(error as string)
      }
    }
    if (validFiles.length > 0) {
      const newImages: ImageFile[] = validFiles.map((file) => ({
        id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36),
        file,
        preview: URL.createObjectURL(file),
      }))
      setImages([...images, ...newImages])
      if (validFiles.length === 1) toast.success("Imagem adicionada e validada com sucesso.")
      else toast.success(`${validFiles.length} imagens adicionadas com sucesso.`)
    }
    setIsProcessing(false)
  }, [images, setImages])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(Array.from(e.dataTransfer.files))
  }, [processFiles])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files ? Array.from(e.target.files) : [])
    e.target.value = ''
  }

  const removeImage = (id: string) => {
    const target = images.find((img) => img.id === id)
    if (target) URL.revokeObjectURL(target.preview)
    setImages(images.filter((img) => img.id !== id))
  }

  const clearAllImages = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview))
    setImages([])
    toast.info("Todas as imagens foram removidas.")
  }

  const canProceed = images.length > 0 && !isProcessing

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">Envie Suas Imagens</h2>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Arraste e solte ou clique para selecionar imagens de manifestações culturais maranhenses. Formatos aceitos: JPEG, PNG.</p>
      </div>

      <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }} onDragLeave={() => setIsDragging(false)} className={cn("relative rounded-xl border-2 border-dashed transition-colors p-8 md:p-12", isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50", isProcessing && "opacity-50 cursor-not-allowed pointer-events-none")}>
        <input type="file" multiple accept="image/jpeg, image/png" onChange={handleFileInput} disabled={isProcessing} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
        <div className="text-center">
          <div className="mx-auto rounded-full bg-primary/10 p-3 md:p-4 w-fit mb-4"><Upload className="h-6 w-6 md:h-8 md:w-8 text-primary" /></div>
          <p className="text-base md:text-lg font-semibold mb-2">{isProcessing ? "Validando resoluções..." : "Arraste imagens ou clique aqui"}</p>
          <p className="text-xs md:text-sm text-muted-foreground">Suportamos múltiplos arquivos simultaneamente</p>
        </div>
      </div>

      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium">{images.length} {images.length === 1 ? "imagem selecionada" : "imagens selecionadas"}</p>
            <Button variant="destructive" size="sm" onClick={clearAllImages}>Limpar todas</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group rounded-lg overflow-hidden border border-border bg-card aspect-square">
                <img src={image.preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" variant="destructive" onClick={() => removeImage(image.id)} className="h-8 text-xs"><X className="h-3 w-3 mr-1" /> Remover</Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2"><p className="text-[10px] text-white truncate">{image.file.name}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-border bg-muted/30 p-5 md:p-6">
        <div className="flex items-start gap-3">
          <ImageIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-2 text-sm md:text-base">Requisitos Técnicos</p>
            <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
              <li>• Resolução mínima: 800 x 600px</li>
              <li>• Formatos: JPEG, PNG</li>
              <li>• Imagens nítidas e culturalmente respeitosas</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button size="lg" onClick={onNext} disabled={!canProceed} className="w-full sm:w-auto min-h-[44px]">Continuar para Metadados</Button>
      </div>
    </div>
  )
}