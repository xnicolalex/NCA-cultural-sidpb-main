import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SIDPB - Sistema de Informação de Doenças Parasitárias no Brasil',
  description: 'Plataforma científica para monitoramento da distribuição de doenças parasitárias no Brasil',
  generator: 'SIDPB'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
