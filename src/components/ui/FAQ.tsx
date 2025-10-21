import { Reveal } from "@/components/Animated";

export default function FAQ() {
  return (
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
  );
}











