export default function Stats() {
  return (
    <section id="stats" className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{backgroundImage: "radial-gradient(#0ea5e9 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Hizmet İstatistiklerimiz</h3>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">Rakamlarla kanıtlanmış başarı ve güvenilirlik</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  {[...Array(11)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 10 ? 'bg-purple-300' : 'bg-purple-500 opacity-60'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </section>
  );
}











