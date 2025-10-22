import { Reveal } from "@/components/Animated";

export default function Platforms() {
  return (
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
  );
}














