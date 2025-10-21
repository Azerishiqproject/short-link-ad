import Image from "next/image";
import { Reveal } from "@/components/Animated";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-10" style={{backgroundImage:"radial-gradient(#0ea5e9 1px, transparent 1px)", backgroundSize:"24px 24px"}} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-sky-700 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            12K+ Kısaltılan Link • 3.2M+ Toplam Tıklama • %99.9 Uptime
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Linklerinizi Kısaltın, Gelir Elde Edin
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-8 max-w-2xl">
            Uzun linklerinizi kısa ve akıllı linklere dönüştürün. Gelişmiş analitik, yüksek CPM oranları ve anında ödeme sistemi ile linklerinizden gelir elde edin.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="#pricing" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 px-8 py-4 text-white font-semibold shadow-lg hover:from-sky-700 hover:to-sky-800 hover:shadow-xl transition-all duration-200">
              Hemen Başla
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-8 py-4 text-slate-800 font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200">
              Demo İzle
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Milisaniye yönlendirme
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Yüksek CPM oranları
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Anında ödeme
            </div>
          </div>
        </Reveal>
        <div className="relative">
          <Reveal delay={0.1}>
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Link Klikleme Hizmeti"
                width={1000}
                height={666}
                className="w-full h-auto max-w-lg object-cover"
                priority
              />
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}











