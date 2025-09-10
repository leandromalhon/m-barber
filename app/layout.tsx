import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import Footer from "./_components/footer"
import AuthProvider from "./_providers/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "M-Barber",
  description: "Sistema de barbearia",
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
