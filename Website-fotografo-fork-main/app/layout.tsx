import type React from "react"
import type { Metadata } from "next"
import { Alegreya_Sans, Quicksand } from "next/font/google"
import { Toaster } from "sonner" 
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
})

const alegreya = Alegreya_Sans({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400"
})

export const metadata: Metadata = {
  title: "Cultura Maranhense - Dataset Multimodal",
  description:
    "Preservando e compartilhando a riqueza cultural do Maranhão através de imagens e metadados. Contribua para a documentação do Bumba-meu-boi, Tambor de Crioula, festas do Divino e muito mais.",
  keywords: ["Maranhão", "cultura", "dataset", "Bumba-meu-boi", "Tambor de Crioula", "patrimônio cultural", "São Luís", "Inovação Tecnológica no Maranhão", "UFMA Cultura"],
  authors: [{ name: "Camilly Moraes Campos" }],
  openGraph: {
    title: "Dataset Multimodal Maranhense",
    description: "Preservando e compartilhando a riqueza cultural do Maranhão",
    type: "website",
    locale: "pt_BR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${quicksand.variable} ${alegreya.variable}`}>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}