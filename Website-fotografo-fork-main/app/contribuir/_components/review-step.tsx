"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { BadgeCultural } from "@/components/ui/badge-cultural"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import type { ImageFile } from "./contribution-flow"
import { useAuth } from "@/contexts/auth-context"
import { apiPath, withBasePath } from "@/lib/paths"

type ReviewStepProps = {
  images: ImageFile[]
  onBack: () => void
}

export function ReviewStep({ images, onBack }: ReviewStepProps) {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [dominios, setDominios] = useState<any[]>([])
  const [imagensSemExif, setImagensSemExif] = useState<number[]>([])

  useEffect(() => {
    const fetchDominios = async () => {
      try {
        const res = await fetch(apiPath('/api/dominios'))
        if (res.ok) {
          const data = await res.json()
          setDominios(data)
        }
      } catch (error) {
        console.error("Erro ao carregar domínios:", error)
        toast.error("Não foi possível carregar as categorias culturais.")
      }
    }
    fetchDominios()
  }, [])

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para enviar imagens.')
      return
    }

    setIsSubmitting(true)
    const semExif: number[] = []

    const uploadProcess = async () => {
      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        const formData = new FormData()

        formData.append('imagem', image.file)
        formData.append('titulo', image.metadata?.title || 'Sem título')
        formData.append('descricao', image.metadata?.description || '')
        formData.append('municipio', image.metadata?.municipality || '')
        formData.append('licenca', image.license?.type || 'CC-BY-4.0')
        formData.append('data_foto', image.metadata?.date || '')
        formData.append('usuarioId', String(user.id))

        const manifestacaoForm = image.metadata?.manifestation || ""
        const dominioEncontrado = dominios.find(d => d.nome_categoria.toLowerCase() === manifestacaoForm.toLowerCase())
        const dominioOutros = dominios.find(d => d.nome_categoria.toLowerCase() === "outro")
        const dominioIdFinal = dominioEncontrado ? dominioEncontrado.id : (dominioOutros?.id || '1')
        formData.append('dominioId', String(dominioIdFinal))

        if (!dominioEncontrado) {
          formData.append('categoria_sugerida', manifestacaoForm)
        }

        const response = await fetch(apiPath('/api/upload'), { method: 'POST', body: formData })

        if (!response.ok) {
          throw new Error(`Falha no upload de "${image.metadata?.title || image.file.name}".`)
        }

        const data = await response.json()
        if (!data.registro?.exif_camera) {
          semExif.push(i)
        }
      }
      if (semExif.length > 0) setImagensSemExif(semExif)
    }

    toast.promise(uploadProcess(), {
      loading: images.length > 1 ? `Enviando ${images.length} imagens...` : 'Enviando imagem...',
      success: () => {
        setIsSubmitted(true)
        setIsSubmitting(false)
        return 'Registro iconográfico submetido com sucesso!'
      },
      error: (err) => {
        setIsSubmitting(false)
        return err instanceof Error ? err.message : 'Ocorreu um erro no envio das imagens.'
      }
    })
  }

  const formatDate = (dateStr: string) => new Date(`${dateStr}T12:00:00`).toLocaleDateString("pt-BR")

  if (isSubmitted) {
    return (
      <div className="text-center py-12 animate-in fade-in zoom-in duration-500 px-4">
        <div className="mx-auto rounded-full bg-green-100 dark:bg-green-900/30 p-6 w-fit mb-6">
          <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Contribuição Enviada!</h2>
        <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">Suas {images.length} {images.length === 1 ? "imagem foi enviada" : "imagens foram enviadas"} para revisão. Nossa equipe analisará em até 5 dias úteis.</p>
        {imagensSemExif.length > 0 && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-left max-w-lg mx-auto">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-1">Metadados de câmera não detectados</p>
                <p>{imagensSemExif.length === 1 ? "A imagem enviada" : `${imagensSemExif.length} imagens enviadas`} não possuem dados EXIF de câmera. Se forem fotos originais, elas ainda serão aceitas normalmente. Imagens sem EXIF podem incluir screenshots, downloads da web ou arquivos processados por outros aplicativos.</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="min-h-[44px]"><Link href="/perfil">Ver Minhas Contribuições</Link></Button>
          <Button variant="outline" size="lg" onClick={() => window.location.reload()} className="min-h-[44px]">Enviar Outra Imagem</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">Revise Sua Contribuição</h2>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Confira as informações antes de enviar. Você poderá editar depois pelo seu painel.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
          <div className="text-center sm:text-left"><p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Total de Imagens</p><p className="text-2xl md:text-3xl font-bold">{images.length}</p></div>
          <div className="text-center sm:text-left"><p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Licença</p><p className="text-2xl md:text-3xl font-bold">{images[0]?.license?.type || "N/A"}</p></div>
          <div className="text-center sm:text-left"><p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Status</p><BadgeCultural variant="default">Aguardando</BadgeCultural></div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Imagens e Metadados</h3>
        {images.map((image, index) => (
          <div key={image.id} className="rounded-xl border border-border bg-card p-5 md:p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-[200px] flex-shrink-0">
                <div className="rounded-lg overflow-hidden border border-border aspect-square bg-muted">
                  <img src={image.preview || withBasePath("/placeholder.svg")} alt={image.metadata?.title || "Preview"} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Imagem {index + 1}</p>
                  <h4 className="font-semibold text-lg">{image.metadata?.title}</h4>
                </div>
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 text-sm">
                  <div><span className="text-muted-foreground">Manifestação:</span> <span className="font-medium block">{image.metadata?.manifestation?.replace(/-/g, " ")}</span></div>
                  <div><span className="text-muted-foreground">Local:</span> <span className="font-medium block">{image.metadata?.municipality}</span></div>
                  <div><span className="text-muted-foreground">Data:</span> <span className="font-medium block">{image.metadata?.date ? formatDate(image.metadata.date) : "N/A"}</span></div>
                  <div><span className="text-muted-foreground">Licença:</span> <span className="font-medium block">{image.license?.type}</span></div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 mt-2">{image.metadata?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
        <Button variant="outline" size="lg" onClick={onBack} disabled={isSubmitting} className="w-full sm:w-auto min-h-[44px]">Voltar e Editar</Button>
        <Button size="lg" onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto min-h-[44px] px-8">
          {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...</>) : ("Confirmar e Enviar")}
        </Button>
      </div>
    </div>
  )
}
