import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tr.link — Link Kısaltma ve Gelir Elde Etme",
  description: "Uzun linklerinizi kısa ve akıllı linklere dönüştürün. Gelişmiş analitik, yüksek CPM oranları ve anında ödeme sistemi ile linklerinizden gelir elde edin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-white to-slate-50 min-h-screen`}>
        <div className="fixed inset-0 pointer-events-none" style={{backgroundImage:"radial-gradient(#0ea5e9 1px, transparent 1px)", backgroundSize:"22px 22px", opacity:0.06}} />
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/AppImage/logo_dark.jpeg" alt="tr.link" width={140} height={36} priority />
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#top" className="hover:text-slate-900 transition-colors duration-200 relative group">
                Anasayfa
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
             
              <a href="#features" className="hover:text-slate-900 transition-colors duration-200 relative group">
                Özellikler
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#stats" className="hover:text-slate-900 transition-colors duration-200 relative group">
                Kazanç Oranları
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              
              <a href="#pricing" className="hover:text-slate-900 transition-colors duration-200 relative group">
                Fiyatlandırma
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
             
              <a href="#contact" className="hover:text-slate-900 transition-colors duration-200 relative group">
                İletişim
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="#pricing" className="hidden sm:inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200">Kazanç Oranları</a>
              <a href="#contact" className="inline-flex rounded-lg bg-gradient-to-r from-sky-600 to-sky-700 px-5 py-2 text-sm font-medium text-white hover:from-sky-700 hover:to-sky-800 shadow-lg hover:shadow-xl transition-all duration-200">Hemen Başla</a>
            </div>
          </div>
        </header>
        <main className="relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}
