import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import Footer from "./_components/footer"
import AuthProvider from "./_providers/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "M-Barber",
  description:
    "Agende nos melhores barbeiros com M-Barber - Sistema completo de barbearia",
  openGraph: {
    title: "M-Barber - Sistemas para Barbearias",
    description: "Agende nos melhores barbeiros com M-Barber",
    url: "https://m-barber.vercel.app",
    siteName: "M-Barber",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "M-Barber - Sistemas para Barbearias",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M-Barber",
    description: "Agende nos melhores barbeiros com M-Barber",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "barbearia",
    "barbeiro",
    "agendamento",
    "corte de cabelo",
    "barba",
  ],
  authors: [{ name: "M-Barber" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className="dark">
      <body className={`${inter.className} bg-black`}>
        <div className="min-h-screen w-full bg-background xl:mx-auto xl:max-w-6xl xl:shadow-2xl">
          <AuthProvider>
            <div className="flex h-full min-h-screen flex-col">
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </AuthProvider>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
