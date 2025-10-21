import { Reveal } from "@/components/Animated";

export default function Features() {
  return (
    <section id="features" className="border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">Hizmetimizin Avantajları</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">Profesyonel link klikleme hizmetimizin sunduğu özellikler</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          <Reveal>
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="#10B981"/>
              </svg>
            </div>
            <div className="text-sm font-semibold text-slate-800">Gerçek Klikler</div>
            <div className="text-xs text-slate-500 mt-1">%100 Organik</div>
          </div>
          </Reveal>
          <Reveal delay={0.05}>
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="#3B82F6"/>
              </svg>
            </div>
            <div className="text-sm font-semibold text-slate-800">Hızlı Teslimat</div>
            <div className="text-xs text-slate-500 mt-1">Anında Başlatma</div>
          </div>
          </Reveal>
          <Reveal delay={0.1}>
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" fill="#8B5CF6"/>
              </svg>
            </div>
            <div className="text-sm font-semibold text-slate-800">Detaylı Rapor</div>
            <div className="text-xs text-slate-500 mt-1">Analitik Veriler</div>
          </div>
          </Reveal>
          <Reveal delay={0.15}>
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M12 15l-3-3h6l-3 3z" fill="#F59E0B"/>
                <path d="M12 2l3 3h-6l3-3z" fill="#F59E0B"/>
              </svg>
            </div>
            <div className="text-sm font-semibold text-slate-800">Güvenli</div>
            <div className="text-xs text-slate-500 mt-1">Gizlilik Korumalı</div>
          </div>
          </Reveal>
          <Reveal delay={0.2}>
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#EF4444"/>
              </svg>
            </div>
            <div className="text-sm font-semibold text-slate-800">7/24 Destek</div>
            <div className="text-xs text-slate-500 mt-1">Kesintisiz Hizmet</div>
          </div>
          </Reveal>
          <Reveal delay={0.25}>
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#06B6D4"/>
              </svg>
            </div>
            <div className="text-sm font-semibold text-slate-800">Uygun Fiyat</div>
            <div className="text-xs text-slate-500 mt-1">Ekonomik Paketler</div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}











