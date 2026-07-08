"use client"

import { useState, useEffect } from "react"
import { StepIndicator } from "./step-indicator"
import { UploadStep } from "./upload-step"
import { MetadataStep } from "./metadata-step"
import { LicenseStep } from "./license-step"
import { ReviewStep } from "./review-step"

export type ImageFile = {
  id: string
  file: File
  preview: string
  metadata?: {
    title: string
    description: string
    manifestation: string
    customManifestation?: string 
    municipality: string
    date?: string
    tags: string[]
    latitude?: string
    longitude?: string
  }
  license?: {
    type: string
    consentProvided: boolean
  }
}

const STEPS = [
  { number: 1, title: "Upload de Imagens", description: "Envie suas fotos" },
  { number: 2, title: "Metadados", description: "Adicione contexto" },
  { number: 3, title: "Licenciamento", description: "Escolha a licença" },
  { number: 4, title: "Revisão", description: "Confirme e envie" },
]

export function ContributionFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [images, setImages] = useState<ImageFile[]>([])

  useEffect(() => {
    const section = document.getElementById("flow-container")
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100, 
        behavior: "smooth"
      })
    }
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <section id="flow-container" className="py-16 md:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <StepIndicator steps={STEPS} currentStep={currentStep} />
          <div className="mt-12">
            {currentStep === 1 && <UploadStep images={images} setImages={setImages} onNext={handleNext} />}
            {currentStep === 2 && <MetadataStep images={images} setImages={setImages} onNext={handleNext} onBack={handleBack} />}
            {currentStep === 3 && <LicenseStep images={images} setImages={setImages} onNext={handleNext} onBack={handleBack} />}
            {currentStep === 4 && <ReviewStep images={images} onBack={handleBack} />}
          </div>
        </div>
      </div>
    </section>
  )
}