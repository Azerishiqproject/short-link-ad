import { redirect } from "next/navigation";
import ControlPanelDemo from "../components/ControlPanelDemo";
import { Reveal } from "../components/Animated";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const tParam = sp?.t;
  const token = Array.isArray(tParam) ? tParam[0] : tParam;
  if (token) {
    redirect(`/adview?t=${encodeURIComponent(token)}`);
  }
  return (
    <div className="min-h-[calc(100vh-56px)]" id="top">
      {/* Hero */}
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
            {/* Server Image */}
            <Reveal delay={0.1}>
            <div className="flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Link Klikleme Hizmeti" 
                  className="w-full h-auto max-w-lg object-cover"
                />
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Özellikler */}
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

      {/* İstatistikler */}
      <section id="stats" className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{backgroundImage: "radial-gradient(#0ea5e9 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Hizmet İstatistiklerimiz</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Rakamlarla kanıtlanmış başarı ve güvenilirlik</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Başarı Oranı Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 hover:border-green-500/50 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900">99.8%</div>
                    <div className="text-xs text-green-600 font-medium">Başarı Oranı</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-800">Başarılı Teslimat</div>
                  <div className="text-xs text-slate-500">Garantili hizmet</div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{width: '99.8%'}}></div>
          </div>
          </div>
          
          </div>
        
        </div>

            {/* Hız Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 hover:border-blue-500/50 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900">2dk</div>
                    <div className="text-xs text-blue-600 font-medium">Ortalama Süre</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-800">Hızlı Başlatma</div>
                  <div className="text-xs text-slate-500">Anında işlem</div>
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="text-xs text-slate-500">Gerçek zamanlı</div>
                  </div>
                </div>
          </div>
            </div>

            {/* Müşteri Sayısı Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 hover:border-purple-500/50 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900">50K+</div>
                    <div className="text-xs text-purple-600 font-medium">Müşteri</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-800">Aktif Müşteri</div>
                  <div className="text-xs text-slate-500">Memnun kullanıcılar</div>
                  <div className="flex space-x-1 mt-3">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-60"></div>
                    ))}
                    <div className="w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Klik Sayısı Card */}
            <Reveal>
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 hover:border-orange-500/50 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900">1M+</div>
                    <div className="text-xs text-orange-600 font-medium">Klik</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-slate-800">Toplam Klik</div>
                  <div className="text-xs text-slate-500">Bu ay</div>
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <div className="text-xs text-slate-500">Canlı durum</div>
                  </div>
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Link Yönetim Paneli */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Reveal>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Gelişmiş Link Yönetimi</h3>
              <p className="text-lg text-slate-600 leading-relaxed">Kolay link ekleme, anlık istatistikler, detaylı analitik ve kampanya yönetimi.
              Tüm linklerinizi tek panelden kontrol edin ve performanslarını takip edin.</p>
            </div>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-center gap-3 group">
                <div className="w-2 h-2 bg-sky-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                <span className="group-hover:text-slate-900 transition-colors duration-200">Canlı klik istatistikleri</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-2 h-2 bg-sky-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                <span className="group-hover:text-slate-900 transition-colors duration-200">Detaylı analitik raporlar</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-2 h-2 bg-sky-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                <span className="group-hover:text-slate-900 transition-colors duration-200">Kampanya yönetimi ve planlama</span>
              </li>
            </ul>
          </div>
          </Reveal>
          <Reveal delay={0.1}>
          <div className="relative">
            <ControlPanelDemo />
          </div>
          </Reveal>
        </div>
        </Reveal>
      </section>

      {/* Hizmet Özellikleri */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors duration-300">Gerçek Klikler</div>
              </div>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">%100 gerçek kullanıcılardan organik klikler. Bot değil, insan klikleri.</p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">Hızlı Teslimat</div>
              </div>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">Siparişiniz onaylandıktan sonra 2 dakika içinde başlar.</p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-xl font-bold text-slate-900 group-hover:text-orange-700 transition-colors duration-300">Detaylı Raporlama</div>
              </div>
              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">Klik sayısı, coğrafi dağılım ve zaman analizi ile detaylı raporlar.</p>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Desteklenen Platformlar */}
      <section className="bg-white">
        <Reveal>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h3 className="text-2xl font-semibold text-slate-900 text-center">Desteklenen Platformlar</h3>
          <p className="text-slate-600 text-center mt-2">Tüm sosyal medya platformları, web siteleri ve uygulamalar için klikleme hizmeti.</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              '📱 Instagram','📘 Facebook','🐦 Twitter','💼 LinkedIn',
              '🎵 TikTok','📺 YouTube','🌐 Web Sitesi','📧 E-posta'
            ].map((platform)=> (
              <div key={platform} className="rounded-lg border border-black/10 bg-slate-50 p-4 text-center text-sm text-slate-700">{platform}</div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* Fiyatlandırma */}
      <section id="pricing" className="relative bg-gradient-to-b from-white to-slate-50 border-t border-slate-200/60 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{backgroundImage: "radial-gradient(#0ea5e9 1px, transparent 1px)", backgroundSize: "24px 24px"}}></div>
        <Reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-sky-700 mb-6 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse"></span>
              Şeffaf Fiyatlandırma • Gizli Ücret Yok
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">İhtiyaca göre esnek paketler</h2>
            <p className="text-xl text-slate-600 leading-relaxed">Küçük kampanyalardan büyük projelere kadar, ölçeklenebilir klikleme hizmeti.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Başlangıç Paketi */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-400 to-slate-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative rounded-3xl border border-slate-200/60 bg-white/90 backdrop-blur-sm p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Başlangıç</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-5xl font-bold text-slate-900 mb-2">₺25<span className="text-xl font-normal text-slate-500">/paket</span></div>
                  <div className="text-sm text-slate-500">Küçük kampanyalar için ideal</div>
                </div>
                <ul className="space-y-4 text-slate-600 mb-8">
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/item:text-slate-900 transition-colors duration-200">1,000 Gerçek Klik</span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/item:text-slate-900 transition-colors duration-200">2-24 Saat Teslimat</span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                      <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/item:text-slate-900 transition-colors duration-200">Temel Raporlama</span>
                  </li>
              </ul>
                <a href="#" className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-4 text-white font-semibold hover:bg-slate-800 transition-all duration-200 group/btn">
                  Başla
                  <svg className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Popüler Paket */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative rounded-3xl border-2 border-sky-300 bg-white/95 backdrop-blur-sm p-8 ring-4 ring-sky-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-sky-600 to-sky-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">Popüler</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm font-semibold text-sky-700 uppercase tracking-wide">Popüler</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-5xl font-bold text-slate-900 mb-2">₺75<span className="text-xl font-normal text-slate-500">/paket</span></div>
                  <div className="text-sm text-slate-500">En çok tercih edilen paket</div>
                </div>
                <ul className="space-y-4 text-slate-600 mb-8">
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-sky-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                      <svg className="h-3 w-3 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/item:text-slate-900 transition-colors duration-200">5,000 Gerçek Klik</span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-sky-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                      <svg className="h-3 w-3 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/item:text-slate-900 transition-colors duration-200">1-12 Saat Teslimat</span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-sky-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                      <svg className="h-3 w-3 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/item:text-slate-900 transition-colors duration-200">Detaylı Raporlama</span>
                  </li>
              </ul>
                <a href="#" className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 px-6 py-4 text-white font-semibold hover:from-sky-700 hover:to-sky-800 transition-all duration-200 group/btn shadow-lg">
                  Hemen Başla
                  <svg className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Profesyonel Paket */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-violet-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative rounded-3xl border border-slate-200/60 bg-white/90 backdrop-blur-sm p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Profesyonel</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-5xl font-bold text-slate-900 mb-2">₺150<span className="text-xl font-normal text-slate-500">/paket</span></div>
                  <div className="text-sm text-slate-500">Büyük kampanyalar için</div>
                </div>
                <ul className="space-y-4 text-slate-600 mb-8">
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                      <svg className="h-3 w-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/item:text-slate-900 transition-colors duration-200">10,000 Gerçek Klik</span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                      <svg className="h-3 w-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/item:text-slate-900 transition-colors duration-200">30 Dakika - 6 Saat</span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                      <svg className="h-3 w-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="group-hover/item:text-slate-900 transition-colors duration-200">Premium Raporlama</span>
                  </li>
              </ul>
                <a href="#" className="inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-6 py-4 text-slate-900 font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 group/btn">
                  Teklif Al
                  <svg className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Hizmet Garantisi ve Destek */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Reveal>
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Hizmet Garantisi ve Destek</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Müşteri memnuniyeti ve hizmet kalitesi bizim önceliğimiz</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative rounded-3xl border border-slate-200/60 bg-white/90 backdrop-blur-sm p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Hizmet Garantisi</h4>
                  <p className="text-slate-600">Klikleme hizmeti taahhüdü</p>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="group-hover/item:text-slate-900 transition-colors duration-200 font-medium">%100 Gerçek Klik Garantisi</span>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="group-hover/item:text-slate-900 transition-colors duration-200 font-medium">Eksik klik iade politikası</span>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="group-hover/item:text-slate-900 transition-colors duration-200 font-medium">30 dakika içinde başlatma</span>
                </li>
            </ul>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative rounded-3xl border border-slate-200/60 bg-white/90 backdrop-blur-sm p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">7/24 Destek</h4>
                  <p className="text-slate-600">Kesintisiz müşteri hizmetleri</p>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                    <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="group-hover/item:text-slate-900 transition-colors duration-200 font-medium">7/24 canlı destek</span>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                    <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="group-hover/item:text-slate-900 transition-colors duration-200 font-medium">Anlık kampanya takibi</span>
                </li>
                <li className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200">
                    <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="group-hover/item:text-slate-900 transition-colors duration-200 font-medium">Ücretsiz kampanya danışmanlığı</span>
                </li>
            </ul>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Müşteri Yorumları */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 border-y border-slate-200/60 overflow-hidden">
        <Reveal>
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(#0ea5e9 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Müşterilerimiz Ne Diyor?</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Binlerce memnun müşterimizin deneyimleri</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Kampanyalarımızda çok etkili oldu. Gerçek klikler sayesinde organik büyüme sağladık.",
                author: "Ahmet Yılmaz",
                role: "Pazarlama Müdürü, E-ticaret",
                rating: 5
              },
              {
                quote: "Hızlı teslimat ve kaliteli hizmet. Sosyal medya hesaplarımızda fark edilir artış oldu.",
                author: "Elif Demir",
                role: "Sosyal Medya Uzmanı",
                rating: 5
              },
              {
                quote: "Fiyat performans açısından çok uygun. Büyük projelerimizde güvenle kullanıyoruz.",
                author: "Mehmet Kaya",
                role: "Dijital Ajans Sahibi",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative rounded-3xl border border-slate-200/60 bg-white/90 backdrop-blur-sm p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-slate-700 text-lg leading-relaxed mb-6 group-hover:text-slate-900 transition-colors duration-200">
                    {`“${testimonial.quote}”`}
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg group-hover:scale-110 transition-transform duration-300">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-sky-700 transition-colors duration-200">{testimonial.author}</div>
                      <div className="text-sm text-slate-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* SSS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Reveal>
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Sık Sorulan Sorular</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Merak ettiğiniz soruların cevapları burada</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              question: "Klikler ne kadar sürede başlar?",
              answer: "Siparişiniz onaylandıktan sonra 30 dakika ile 24 saat arasında başlar. Paket büyüklüğüne göre süre değişir.",
              icon: "⚡"
            },
            {
              question: "Klikler gerçek mi?",
              answer: "Evet, %100 gerçek kullanıcılardan organik klikler. Bot veya sahte hesaplar kullanmayız.",
              icon: "✅"
            },
            {
              question: "Hangi platformları destekliyorsunuz?",
              answer: "Instagram, Facebook, Twitter, LinkedIn, TikTok, YouTube ve web siteleri dahil tüm platformları destekliyoruz.",
              icon: "🌐"
            },
            {
              question: "Raporlama nasıl yapılır?",
              answer: "Detaylı analitik raporlar ile klik sayısı, coğrafi dağılım ve zaman analizi sunuyoruz.",
              icon: "📊"
            }
          ].map((faq, i) => (
            <div key={i} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-400 to-slate-600 rounded-2xl blur opacity-0 group-hover:opacity-10 transition duration-500"></div>
              <div className="relative rounded-2xl border border-slate-200/60 bg-white/90 backdrop-blur-sm p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {faq.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors duration-200">
                      {faq.question}
                    </h4>
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-200">
                      {faq.answer}
                    </p>
          </div>
          </div>
          </div>
          </div>
          ))}
        </div>
        </Reveal>
      </section>

      {/* İletişim Kısmı */}
      <section id="contact" className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(#0ea5e9 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
        <Reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">İletişim</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Sorularınız için bizimle iletişime geçin</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Sol taraf - Bilgiler */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative rounded-2xl border border-slate-200/60 bg-white/90 backdrop-blur-sm p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 group-hover:text-sky-700 transition-colors duration-200">E-posta</h4>
                        <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-200">info@tr.link</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative rounded-2xl border border-slate-200/60 bg-white/90 backdrop-blur-sm p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 group-hover:text-green-700 transition-colors duration-200">Telefon</h4>
                        <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-200">+90 (212) 555-0123</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative rounded-2xl border border-slate-200/60 bg-white/90 backdrop-blur-sm p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors duration-200">Adres</h4>
                        <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-200">İstanbul, Türkiye</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sağ taraf - Form */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-400 to-slate-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative rounded-3xl border border-slate-200/60 bg-white/90 backdrop-blur-sm p-8 hover:shadow-2xl transition-all duration-300">
                <h4 className="text-xl font-semibold text-slate-900 mb-6">Mesaj Gönder</h4>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-slate-300"
                        placeholder="Ad Soyad"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-slate-300"
                        placeholder="E-posta"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-slate-300"
                      placeholder="Konu"
                    />
                  </div>
                  
                  <div>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 hover:border-slate-300 resize-none"
                      placeholder="Mesajınız"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-sky-700 hover:to-sky-800 transition-all duration-200 shadow-lg hover:shadow-xl group-hover:scale-105"
                  >
                    Mesaj Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>
      </div>
      </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo ve Açıklama */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-600 to-sky-700 grid place-items-center text-white font-bold text-xl shadow-lg">T</div>
                <div className="font-bold text-2xl text-white tracking-tight">tr.link</div>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Profesyonel link klikleme hizmeti ile kampanyalarınızı güçlendirin. 
                7/24 destek ve %100 gerçek klik garantisi.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div>
              <h5 className="text-base font-semibold mb-4">Hızlı Linkler</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Anasayfa</a></li>
                <li><a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Fiyatlandırma</a></li>
                <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">İletişim</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">SSS</a></li>
              </ul>
            </div>

            {/* Hizmetler */}
            <div>
              <h5 className="text-base font-semibold mb-4">Hizmetler</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Instagram Klikleri</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Facebook Klikleri</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Twitter Klikleri</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">LinkedIn Klikleri</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Web Site Klikleri</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                © 2024 tr.link. Tüm hakları saklıdır.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Gizlilik Politikası</a>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Kullanım Şartları</a>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Çerez Politikası</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
