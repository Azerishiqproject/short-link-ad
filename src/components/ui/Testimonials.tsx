import { Reveal } from "@/components/Animated";

export default function Testimonials() {
  return (
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
  );
}















