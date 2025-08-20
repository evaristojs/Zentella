import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zentella - Agencia Creativa Integral",
  description: "Especialistas en marketing, fotografía, diseño gráfico, videografía y animación. Transformamos ideas en experiencias visuales impactantes.",
  keywords: "agencia creativa, marketing, fotografía, diseño gráfico, videografía, animación, República Dominicana",
  authors: [{ name: "Zentella" }],
  openGraph: {
    title: "Zentella - Agencia Creativa Integral",
    description: "Especialistas en marketing, fotografía, diseño gráfico, videografía y animación.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentella - Agencia Creativa Integral",
    description: "Especialistas en marketing, fotografía, diseño gráfico, videografía y animación.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-dark-950 text-white min-h-screen`}>
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
