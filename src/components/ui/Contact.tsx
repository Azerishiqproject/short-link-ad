import { Reveal } from "@/components/Animated";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(#0ea5e9 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
      <Reveal>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">İletişim</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Sorularınız için bizimle iletişime geçin</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
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
  );
}















