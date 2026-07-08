"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import type { ImageFile } from "./contribution-flow"
import { cn } from "@/lib/utils"

type MetadataStepProps = {
  images: ImageFile[]
  setImages: (images: ImageFile[]) => void
  onNext: () => void
  onBack: () => void
}

export function MetadataStep({ images, setImages, onNext, onBack }: MetadataStepProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const currentImage = images[currentImageIndex]
  const [dominios, setDominios] = useState<{ id: string | number; nome_categoria: string }[]>([])
  const [isLoadingDominios, setIsLoadingDominios] = useState(true)

  useEffect(() => {
    const fetchDominios = async () => {
      try {
        const res = await fetch('/api/dominios')
        if (res.ok) {
          const data = await res.json()
          setDominios(data)
        } else {
          toast.error("Falha ao carregar as categorias culturais.")
        }
      } catch (error) {
        toast.error("Erro de conexão ao buscar categorias.")
      } finally {
        setIsLoadingDominios(false)
      }
    }
    fetchDominios()
  }, [])

  const isCustomManifestation = currentImage.metadata?.manifestation === "Outro"

  const updateMetadata = <K extends keyof NonNullable<ImageFile["metadata"]>>(field: K, value: NonNullable<ImageFile["metadata"]>[K]) => {
    const updatedImages = [...images]
    const current = updatedImages[currentImageIndex]
    updatedImages[currentImageIndex] = { ...current, metadata: { title: "", description: "", manifestation: "", municipality: "", tags: [], ...current.metadata, [field]: value } }
    setImages(updatedImages)
  }

  const handleManifestationChange = (value: string) => {
    const updatedImages = [...images]
    const current = updatedImages[currentImageIndex]
    updatedImages[currentImageIndex] = { ...current, metadata: { title: "", description: "", municipality: "", tags: [], ...current.metadata, manifestation: value, customManifestation: value === "Outro" ? (current.metadata?.customManifestation ?? "") : undefined } }
    setImages(updatedImages)
  }

  const handleNextWithValidation = () => {
    let hasError = false
    images.forEach((img, index) => {
      const hasTitle = !!img.metadata?.title
      const hasManifestation = !!img.metadata?.manifestation
      const customIsValid = img.metadata?.manifestation !== "Outro" || (img.metadata?.customManifestation?.trim() ?? "").length > 0
      if (!hasTitle || !hasManifestation || !customIsValid) {
        hasError = true
        if (images.length === 1) toast.warning("Preencha o Título e a Manifestação Cultural antes de avançar.")
        else toast.warning(`A Imagem ${index + 1} possui campos obrigatórios em branco.`)
      }
    })
    if (!hasError) onNext()
  }

  function prevImage() { setCurrentImageIndex((idx) => Math.max(0, idx - 1)) }
  function nextImage() { setCurrentImageIndex((idx) => Math.min(images.length - 1, idx + 1)) }

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowLeft") setCurrentImageIndex((idx) => Math.max(0, idx - 1))
      else if (ev.key === "ArrowRight") setCurrentImageIndex((idx) => Math.min(images.length - 1, idx + 1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [images.length])

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">Adicione Contexto Cultural</h2>
        <p className="text-muted-foreground leading-relaxed">Preencha os metadados para cada imagem. Informações detalhadas garantem qualidade e respeito ao contexto cultural.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Button variant={currentImageIndex === 0 ? "ghost" : "outline"} size="lg" onClick={prevImage} disabled={currentImageIndex === 0} aria-label="Imagem anterior" className="min-h-[44px] min-w-[44px]"><ChevronLeft className="h-5 w-5" /></Button>
          <div className="flex-1 text-center">
            <p className="text-sm font-medium">Imagem {currentImageIndex + 1} de {images.length}</p>
            <p className="text-xs text-muted-foreground hidden sm:block">Use as setas do teclado para navegar</p>
          </div>
          <Button variant={currentImageIndex === images.length - 1 ? "ghost" : "outline"} size="lg" onClick={nextImage} disabled={currentImageIndex === images.length - 1} aria-label="Próxima imagem" className="min-h-[44px] min-w-[44px]"><ChevronRight className="h-5 w-5" /></Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          {images.map((img, i) => (
            <button key={img.id} type="button" onClick={() => setCurrentImageIndex(i)} className={cn("h-3 w-3 rounded-full transition-all", i === currentImageIndex ? "scale-110 bg-primary" : "bg-muted/40 hover:scale-105 border-2")} aria-label={`Ir para a imagem ${i + 1}`} />
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2">
        <div>
          <div className="rounded-xl overflow-hidden border border-border bg-card aspect-square sticky top-24">
            <img src={currentImage.preview || "/placeholder.svg"} alt="Preview da imagem" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="space-y-5 md:space-y-6">
          <div>
            <Label htmlFor="manifestation">Manifestação Cultural *</Label>
            <Select value={currentImage.metadata?.manifestation || ""} onValueChange={handleManifestationChange} disabled={isLoadingDominios}>
              <SelectTrigger className="mt-2 min-h-[44px]"><SelectValue placeholder={isLoadingDominios ? "Carregando categorias..." : "Selecione a manifestação"} /></SelectTrigger>
              <SelectContent> {dominios.map((d) => ( <SelectItem key={d.id} value={d.nome_categoria}> {d.nome_categoria.replace(/-/g, " ")} </SelectItem> ))}</SelectContent>
            </Select>
            {isCustomManifestation && (
              <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <Input id="customManifestation" type="text" placeholder="Descreva a manifestação cultural..." value={currentImage.metadata?.customManifestation || ""} onChange={(e) => updateMetadata("customManifestation", e.target.value)} autoFocus className="min-h-[44px]" />
                <p className="text-xs text-muted-foreground mt-1">Nossa equipe irá classificar essa categoria. Obrigado por ajudar a expandir nosso vocabulário cultural!</p>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="title">Título da Imagem *</Label>
            <Input id="title" type="text" placeholder="Ex: Apresentação do Bumba-meu-boi de Matraca" value={currentImage.metadata?.title || ""} onChange={(e) => updateMetadata("title", e.target.value)} className="mt-2 min-h-[44px]" />
          </div>

          <div>
            <Label htmlFor="description">Descrição Detalhada</Label>
            <Textarea id="description" placeholder="Descreva o contexto cultural..." value={currentImage.metadata?.description || ""} onChange={(e) => updateMetadata("description", e.target.value)} className="mt-2 min-h-[120px]" />
            <p className="text-xs text-muted-foreground mt-1">{currentImage.metadata?.description?.length || 0} caracteres</p>
          </div>

          <div>
            <Label htmlFor="municipality">Local</Label>
            <Input id="municipality" type="text" placeholder="Ex: São Luís" value={currentImage.metadata?.municipality || ""} onChange={(e) => updateMetadata("municipality", e.target.value)} className="mt-2 min-h-[44px]" />
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Orientação Cultural</p>
                <p className="text-amber-800 dark:text-amber-200">Se não tiver certeza sobre informações culturais específicas, indique isso na descrição. Nossa equipe consultará especialistas locais.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 md:gap-4 pt-4 border-t border-border">
        <Button variant="outline" size="lg" onClick={onBack} className="w-full sm:w-auto min-h-[50px]">Voltar</Button>
        <Button size="lg" onClick={handleNextWithValidation} className="w-full sm:w-auto min-h-[50px]">Continuar para Licenciamento</Button>
      </div>
    </div>
  )
}