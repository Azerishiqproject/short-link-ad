import { Reveal } from "@/components/Animated";

export default function Pricing() {
  return (
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
              <a href="#" className="inline-flex w-full items-center justify-center rounded-3xl bg-white/95 backdrop-blur-sm p-8 border-2 border-sky-300 ring-4 ring-sky-100 text-slate-900 font-semibold transition-all duration-200 group/btn">
                Hemen Başla
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
  );
}











