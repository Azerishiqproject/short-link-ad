import { Reveal } from "@/components/Animated";
import ControlPanelDemo from "@/components/ControlPanelDemo";

export default function LinkPanel() {
  return (
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
  );
}














