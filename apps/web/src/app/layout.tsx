import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marketplace - Tiendas y Productos",
  description: "Explora tiendas locales y descubre sus productos. Marketplace de tiendas con amplio catálogo de productos disponibles.",
  openGraph: {
    title: "Marketplace - Tiendas y Productos",
    description: "Explora tiendas locales y descubre sus productos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <div className="min-h-screen bg-background">
              <Navbar />
              {children}
            </div>
            <Toaster />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
