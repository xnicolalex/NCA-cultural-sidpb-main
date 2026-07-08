"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAddImage } from "./_hooks/useAddImage";
import { ImageUploader } from "./_components/image-uploader";
import { MetadataForm } from "./_components/metadata-form";
import { AIDetailsForm } from "./_components/ai-details-form";
import { LicenseCard } from "./_components/license-card";
import { FormActions } from "./_components/form-actions";

export default function AdicionarImagemPage() {
  const {
    formData,
    setField,
    dominios,
    loadingDominios,
    isSubmitting,
    handleFileChange,
    handleSubmit,
  } = useAddImage();

  const [expandedLicense, setExpandedLicense] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao painel
          </Link>
          <h1 className="text-2xl font-semibold text-slate-900">Adicionar Imagem IA</h1>
          <p className="text-sm text-slate-500 mt-1">
            Envie uma imagem gerada por inteligência artificial para o dataset.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <ImageUploader
              preview={formData.preview}
              onFileChange={handleFileChange}
            />
            <MetadataForm
              titulo={formData.titulo}
              setTitulo={(value) => setField("titulo", value)}
              descricao={formData.descricao}
              setDescricao={(value) => setField("descricao", value)}
              municipio={formData.municipio}
              setMunicipio={(value) => setField("municipio", value)}
              dominioId={formData.dominioId}
              setDominioId={(value) => setField("dominioId", value)}
              dominios={dominios}
              loadingDominios={loadingDominios}
            />
          </div>

          <div className="border-t border-slate-100 pt-6">
            <AIDetailsForm
              modeloIa={formData.modeloIa}
              setModeloIa={(value) => setField("modeloIa", value)}
              promptIa={formData.promptIa}
              setPromptIa={(value) => setField("promptIa", value)}
              detalhesIa={formData.detalhesIa}
              setDetalhesIa={(value) => setField("detalhesIa", value)}
            />
          </div>

          <div className="border-t border-slate-100 pt-6">
            <LicenseCard
              accepted={formData.licencaAccepted}
              onAcceptChange={(value) => setField("licencaAccepted", value)}
              expanded={expandedLicense}
              onExpandedChange={setExpandedLicense}
            />
          </div>

          <FormActions
            isSubmitting={isSubmitting}
            disabled={!formData.licencaAccepted}
          />
        </form>
      </div>
    </div>
  );
}