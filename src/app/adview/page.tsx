"use client";

import { Suspense, useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAdMetrics } from "@/lib/useAdMetrics";
import { ImpressionMetricsPayload, ImpressionStage, postImpression, consumeAdminAdOnce } from "@/lib/api";
import Script from "next/script";

function buildHints(): Record<string, unknown> {
  if (typeof window === "undefined") {
    return { webdriver: false, plugins: 0, touch: false, platform: "", ua: "", online: false };
  }
  const nav = navigator as Navigator & { webdriver?: boolean };
  return {
    webdriver: !!nav?.webdriver,
    plugins: nav?.plugins?.length ?? 0,
    touch: typeof matchMedia !== 'undefined' ? matchMedia?.("(pointer: coarse)")?.matches ?? false : false,
    platform: nav?.platform ?? "",
    ua: nav?.userAgent ?? "",
    online: typeof navigator !== 'undefined' ? navigator.onLine : false,
  };
}

function buildViewport() {
  if (typeof window === "undefined") {
    return { w: 0, h: 0, dpr: 1 };
  }
  return {
    w: window.innerWidth,
    h: window.innerHeight,
    dpr: window.devicePixelRatio ?? 1,
  };
}

function AdViewClient() {
  const search = useSearchParams();
  const router = useRouter();
  const token = search.get("t") ?? "";

  const isMobileDevice = typeof navigator !== 'undefined'
    ? (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (typeof window !== 'undefined' && window.innerWidth < 768))
    : false;

  const { ref, state, passedThreshold, reset } = useAdMetrics({
    minimumVisibleMs: 10000,
    minimumVisibilityRatio: isMobileDevice ? 0.35 : 0.5,
  });

  const [stage, setStage] = useState<ImpressionStage>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [redirect, setRedirect] = useState<string | null>(null);
  const [canProceed, setCanProceed] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isPageFocused, setIsPageFocused] = useState(true);
  const [activeTime, setActiveTime] = useState(0);
  const [adminAdTried, setAdminAdTried] = useState(false);
  const [stageClickCount, setStageClickCount] = useState(0);
  const hasInitialPopunderFired = useRef(false);
  const [showEntryModal, setShowEntryModal] = useState(false);

  // Popunder script yükleme fonksiyonu (cache-bust + body'ye ekle + throttle)
  const lastPopFire = useRef(0);
  const loadPopunder = (force: boolean = false) => {
    const now = Date.now();
    if (!force && now - lastPopFire.current < 800) {
      return; // Çok hızlı ardışık çağrıları engelle
    }
    lastPopFire.current = now;

    try {
      // Cleanup previously injected popunder scripts to avoid accumulation
      const existing = document.querySelectorAll('script[data-popunder-script="true"]');
      existing.forEach((el) => el.parentElement?.removeChild(el as HTMLElement));
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://stopperscared.com/3c/8d/a8/3c8da8282fcf948c3c585c6de04a3f97.js?cb=${now}`;
      script.setAttribute('data-popunder-script', 'true');
      script.crossOrigin = 'anonymous';
      (document.body || document.head).appendChild(script);
    } catch (_) {
      // Yedek: head'e deneyelim
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://stopperscared.com/3c/8d/a8/3c8da8282fcf948c3c585c6de04a3f97.js?cb=${now + 1}`;
      script.setAttribute('data-popunder-script', 'true');
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  };

  const metricsPayload: ImpressionMetricsPayload = useMemo(
    () => ({
      visible_ms: state.visibleMs,
      first_interaction_ms: state.firstInteractionMs,
      viewability_ratio: state.viewabilityRatio,
      viewport: buildViewport(),
      lang: typeof navigator !== 'undefined' ? navigator.language : 'en',
      tz: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC',
      ref: typeof document !== 'undefined' ? document.referrer : '',
      hints: buildHints(),
    }),
    [state]
  );

  const setDivRef = (node: HTMLDivElement | null) => {
    // Bridge HTMLDivElement to the hook's HTMLElement ref
    (ref as (el: HTMLElement | null) => void)(node);
  };

  // Aşama değiştiğinde timer'ı ve tıklama sayacını sıfırla; popunder yükle
  useEffect(() => {
    setCanProceed(false);
    setCountdown(10);
    setActiveTime(0);
    setStageClickCount(0);
    loadPopunder();
    // Mobilde görünürlük eşiğine daha hızlı ulaşmak için reklam alanını görünür yap
    try {
      const el = document.getElementById('lv-ad-main');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 600);
      }
    } catch (_) { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // Sayfa yüklendiğinde: ilk girişte modal göster; onay varsa burst + ilk gesture
  useEffect(() => {
    let shouldBurst = true;
    try {
      const shown = typeof window !== 'undefined' ? sessionStorage.getItem('adview_entry_modal_shown') : '1';
      if (!shown) {
        setShowEntryModal(true);
        shouldBurst = false;
      }
    } catch (_) { /* ignore */ }

    if (shouldBurst && !hasInitialPopunderFired.current) {
      hasInitialPopunderFired.current = true;
      // Küçük bir burst: bazı tarayıcılarda ilk çağrı yutulursa takip edenler çalışsın
      loadPopunder();
      setTimeout(loadPopunder, 300);
      setTimeout(loadPopunder, 900);
    }

    // İlk kullanıcı jestinde bir kez daha tetikle (gesture-required tarayıcılar için)
    const handleFirstGesture = () => {
      loadPopunder();
      document.removeEventListener('pointerdown', handleFirstGesture);
      document.removeEventListener('touchstart', handleFirstGesture);
    };
    document.addEventListener('pointerdown', handleFirstGesture, { passive: true });
    document.addEventListener('touchstart', handleFirstGesture, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', handleFirstGesture);
      document.removeEventListener('touchstart', handleFirstGesture);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Page visibility ve focus kontrolü
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsPageVisible(visible);
      if (visible) {
        // iOS Safari odak bilgisini geri vermeyebilir; görünür olduysa odak kabul et
        setIsPageFocused(true);
        // Sekme tekrar görünür olduğunda bir kez daha dene
        setTimeout(loadPopunder, 100);
      }
    };

    const handleFocus = () => {
      setIsPageFocused(true);
    };

    const handleBlur = () => {
      setIsPageFocused(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Sayfadaki her tıklamada popunder yükle
  useEffect(() => {
    const handleClick = () => {
      loadPopunder();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll'da popunder yükle (throttled - her 1 saniyede bir)
  useEffect(() => {
    let lastScrollTime = 0;
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime > 1000) {
        loadPopunder();
        lastScrollTime = now;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gerçek zamanlı countdown - sayfa yüklenir yüklenmez başlar; buton ancak eşik + zaman sağlanınca açılır
  useEffect(() => {
    if (!canProceed) {
      const interval = setInterval(() => {
        const canTick = isPageVisible && (isPageFocused || isMobileDevice);
        if (canTick) {
          setActiveTime(prev => {
            const newActiveTime = prev + 0.1; // 100ms artır
            const remaining = Math.max(0, 10 - newActiveTime);
            setCountdown(Math.ceil(remaining));
            if (remaining <= 0 && passedThreshold) {
              setCanProceed(true);
            }
            return newActiveTime;
          });
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [canProceed, passedThreshold, isPageVisible, isPageFocused, isMobileDevice]);

  // Eşik sonradan geçilirse ve süre tamamlanmışsa butonu aç
  useEffect(() => {
    if (!canProceed && passedThreshold && activeTime >= 10) {
      setCanProceed(true);
    }
  }, [passedThreshold, activeTime, canProceed]);

  const submitStage = async () => {
    if (!token || submitting || done || !canProceed) return;
    try {
      setSubmitting(true);
      setError(null);
      // Attempt to open admin-configured site in a new tab once (stage 1 only), triggered by user gesture
      if (!adminAdTried && stage === 1) {
        setAdminAdTried(true);
        try {
          const resp = await consumeAdminAdOnce();
          if (resp?.openUrl && resp.url) {
            window.open(resp.url as string, "_blank", "noopener");
          }
        } catch (_) { /* ignore */ }
      }
      const res = await postImpression({ token, metrics: metricsPayload, stage });
      console.log("Impression response:", res);
      
      if (res.done) {
        setDone(true);
        setRedirect(res.redirect ?? null);
        console.log("Final redirect URL:", res.redirect);
        
        if (res.redirect) {
          console.log("Redirecting to:", res.redirect);
          setTimeout(() => {
            // Click logging is now handled in the backend impression endpoint
            window.location.href = res.redirect as string;
          }, 500);
        } else {
          console.error("No redirect URL received from server. Full response:", res);
          setError("Yönlendirme URL'si alınamadı. Lütfen tekrar deneyin.");
          setTimeout(() => {
            router.replace("/thanks");
          }, 2000);
        }
      } else {
        // Move to second ad immediately once stage-1 validated
        setStage(2);
        reset();
      }
    } catch (e: unknown) {
      console.error("Impression submission error:", e);
      let message = "Gönderim hatası";
      
      if (e instanceof Error) {
        if (e.message.includes('redirect-url-missing')) {
          message = "Hedef URL bulunamadı. Lütfen link sahibi ile iletişime geçin.";
        } else if (e.message.includes('link-not-found')) {
          message = "Link bulunamadı. Link silinmiş olabilir.";
        } else if (e.message.includes('impression-failed-404')) {
          message = "Link bulunamadı. Link silinmiş olabilir.";
        } else if (e.message.includes('impression-failed-500')) {
          message = "Sunucu hatası. Lütfen tekrar deneyin.";
        } else {
          message = e.message;
        }
      }
      
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // İlerleme tıklaması: İlk iki tıklamada sadece popunder; üçüncüde ilerle
  const handleProceedClick = async () => {
    if (submitting || done) return;
    if (!canProceed) return; // Eşik/sayaç tamamlanmadan ilerleme yok

    const nextCount = stageClickCount + 1;
    setStageClickCount(nextCount);

    if (nextCount <= 2) {
      // İlk iki tıklama: popunder tetikle ve dur
      loadPopunder();
      return;
    }

    // Üçüncü tıklama: gerçek ilerleme
    await submitStage();
  };

  // Remove auto-submit; require explicit user click on the button once threshold is passed

  // Simple visibility progress indicator for UX
  const progress = Math.min(100, Math.round(((state.visibleMs || 0) / 10000) * 100));

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <Script src="https://publisher.linkvertise.com/cdn/linkvertise.js" strategy="afterInteractive" crossOrigin="anonymous" />
      <Script id="linkvertise-init-adview" strategy="afterInteractive">{`
        try { linkvertise(1415315, { whitelist: ["glorta.com","glorta.link"] }); } catch (_) {}
      `}</Script>
      <div className="w-full max-w-7xl">
        {showEntryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl border border-black/10 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Teklifi Aç</h2>
              <p className="text-sm text-slate-600 mb-4">Devam ettiğinizde yeni bir pencerede teklif açılacaktır.</p>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    try { sessionStorage.setItem('adview_entry_modal_shown', '1'); } catch (_) {}
                    setShowEntryModal(false);
                  }}
                  className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium"
                >
                  Vazgeç
                </button>
                <button
                  onClick={() => {
                    // Kullanıcı onayı ile popunder tetikle ve küçük bir ek burst yap
                    loadPopunder(true);
                    setTimeout(() => loadPopunder(true), 200);
                    setTimeout(() => loadPopunder(true), 700);
                    try { sessionStorage.setItem('adview_entry_modal_shown', '1'); } catch (_) {}
                    setShowEntryModal(false);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
                >
                  Geç ve Aç
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Grid layout: sol reklamlar - ortada kontrol - sağ reklamlar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Sol taraf reklamlar - mobilde üstte, desktop'ta solda */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Sol tarafta popunder butonu - mobilde gizle */}
            <div className="hidden lg:flex justify-center">
              <button
                onClick={() => loadPopunder()}
                className="px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                }}
              >
                🎯 Şansını Dene
              </button>
            </div>
            {/* 160x600 iframe - mobilde gizle, desktop'ta göster */}
            <div className="hidden lg:flex rounded-xl border border-black/10 bg-neutral-50 items-center justify-center p-2">
              <AdsterraIframe
                options={{ key: '330827705bb5350a894aee8ca1e0a40a', format: 'iframe', height: 600, width: 160, params: {} }}
                src="https://www.highperformanceformat.com/330827705bb5350a894aee8ca1e0a40a/invoke.js"
                style={{ width: 160, height: 600 }}
              />
            </div>
            {/* Sol tarafta alt popunder butonu */}
            <div className="hidden lg:flex justify-center">
              <button
                onClick={() => loadPopunder()}
                className="px-4 py-2 bg-gradient-to-r from-rose-400 to-orange-500 text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                }}
              >
                💎 Özel Avantaj
              </button>
            </div>
          </div>

          {/* Orta kısım: Kontrol Paneli */}
          <div className="lg:col-span-7 rounded-2xl border border-black/10 bg-white shadow-sm p-6">
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="w-full flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">Reklam Görüntüleme</h1>
                  <p className="text-xs text-slate-500">Reklam {stage}/2 • Eşik: {passedThreshold ? "Geçildi" : "Bekleniyor"}</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Header yanında popunder butonu */}
                  <button
                    onClick={() => loadPopunder()}
                    className="px-3 py-1.5 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-xs rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    }}
                  >
                    💰 Kazan
                  </button>
                  <span className={`px-2 py-1 rounded-md text-xs ${stage===1? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>Aşama {stage}</span>
                </div>
              </div>

              <div className="w-full mb-4">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
                </div>
                {/* Progress bar altında küçük buton */}
                <div className="flex justify-center">
                  <button
                    onClick={() => loadPopunder()}
                    className="px-4 py-1.5 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold text-xs rounded-md shadow-sm hover:shadow-md transform hover:scale-105 transition-all"
                  >
                    🔥 Özel Fırsat
                  </button>
                </div>
              </div>
            </div>

            {/* Büyük cazibeli buton - popunder için */}
            <div className="w-full mb-4 flex justify-center">
              <button
                onClick={() => loadPopunder()}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse hover:animate-none"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
                }}
              >
                🎁 Özel Teklifi Görüntüle 🎁
              </button>
            </div>

            {/* Ana izlenen alan: Adsterra Native */}
            <div ref={setDivRef} className="w-full rounded-xl border border-black/10 bg-neutral-50 mb-4">
              <div id="lv-ad-main" className="w-full h-full flex items-center justify-center p-2 min-h-[320px]">
                <div id="container-7cf6ae2b4489f51ec0162164b881837d" className="w-full flex items-center justify-center" />
                <Script
                  id="adsterra-native"
                  async
                  data-cfasync="false"
                  src="https://pl27961098.effectivegatecpm.com/7cf6ae2b4489f51ec0162164b881837d/invoke.js"
                  strategy="afterInteractive"
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            {/* Reklam alanının altında buton */}
            <div className="w-full mb-4 flex justify-center">
              <button
                onClick={() => loadPopunder()}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                }}
              >
                ⭐ Premium Teklif İçin Tıkla ⭐
              </button>
            </div>

            {/* Buton ve sayaç: yan yana ve altta tek satır */}
            <div className="p-4 rounded-xl border border-black/10 bg-white flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="text-slate-600">
                {error ? (
                  <span className="text-red-600">{error}</span>
                ) : done && !redirect ? (
                  <span className="text-emerald-600">Tamamlandı, yönlendiriliyor...</span>
                ) : !passedThreshold ? (
                  <span>Önce reklam alanını görünür ve etkileşimli tutarak eşiği geçin.</span>
                ) : !canProceed && !isPageVisible ? (
                  <span className="text-red-500">⚠️ Sayfa görünür değil! Lütfen sayfaya geri dönün.</span>
                ) : !canProceed && !isPageFocused ? (
                  <span className="text-red-500">⚠️ Sayfa odakta değil! Lütfen sayfaya odaklanın.</span>
                ) : !canProceed ? (
                  <span>Eşik geçildi. Lütfen 10 saniye bekleyin... ({countdown}s)</span>
                ) : (
                  <span>Hazır.</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* Küçük cazibeli buton - popunder için */}
                <button
                  onClick={() => loadPopunder()}
                  className="px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-xs rounded-lg shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-150"
                  style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)',
                  }}
                >
                  ⚡ Hemen Bak
                </button>
                {/* Ana buton (Geç) - görünüm diğer butonlara benzer */}
                <button
                  onClick={handleProceedClick}
                  disabled={submitting || done || !canProceed}
                  className={`px-5 py-2 rounded-lg text-white text-sm font-semibold shadow-md transition-all duration-150 ${
                    !passedThreshold || submitting || done || !canProceed
                      ? 'bg-slate-400 cursor-not-allowed opacity-80'
                      : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {submitting ? 'Gönderiliyor...' : canProceed ? (stage === 1 ? 'Geç (Aşama 1)' : 'Geç (Aşama 2)') : `Bekleyin... (${countdown}s)`}
                </button>
              </div>
            </div>
          </div>

          {/* Sağ taraf reklamlar - mobilde altta, desktop'ta sağda */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Sağ tarafta üst popunder butonu */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => loadPopunder()}
                className="px-5 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                🚀 Hızlı Geçiş
              </button>
            </div>

            {/* 300x250 iframe */}
            <div className="w-full rounded-xl border border-black/10 bg-neutral-50 flex items-center justify-center p-2">
              <AdsterraIframe
                options={{ key: '208e66d41cfa6e22469da9df59ae57fc', format: 'iframe', height: 250, width: 300, params: {} }}
                src="https://stopperscared.com/208e66d41cfa6e22469da9df59ae57fc/invoke.js"
                style={{ width: 300, height: 250 }}
              />
            </div>

            {/* Sağ tarafta orta popunder butonu */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => loadPopunder()}
                className="px-5 py-3 bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #3494E6 0%, #EC6EAD 100%)',
                }}
              >
                🎪 Süpriz Kutusu
              </button>
            </div>

            {/* Sağ tarafta alt popunder butonu */}
            <div className="w-full flex justify-center">
              <button
                onClick={() => loadPopunder()}
                className="px-5 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                }}
              >
                🏆 Bonus Al
              </button>
            </div>

            {/* Popunder script artık dinamik olarak yükleniyor (sayfa yükleme, aşama değişimi, buton tıklaması) */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple queue to load Adsterra units sequentially to avoid atOptions clobbering
let adsterraQueue: Promise<void> = Promise.resolve();

function AdsterraIframe({ options, src, style }: { options: Record<string, unknown>; src: string; style?: React.CSSProperties }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let isCancelled = false;
    adsterraQueue = adsterraQueue.then(() => new Promise<void>((resolve) => {
      if (!hostRef.current) { resolve(); return; }
      // Clear previous content
      hostRef.current.innerHTML = "";
      // Options script (must be global name atOptions for Adsterra)
      const opts = document.createElement('script');
      opts.type = 'text/javascript';
      opts.text = `atOptions = ${JSON.stringify(options)};`;
      // Invoke script (synchronous to preserve order)
      const invoke = document.createElement('script') as HTMLScriptElement;
      invoke.type = 'text/javascript';
      invoke.src = src;
      invoke.async = false;
      invoke.onload = () => { if (!isCancelled) resolve(); };
      invoke.onerror = () => { if (!isCancelled) resolve(); };
      hostRef.current.appendChild(opts);
      hostRef.current.appendChild(invoke);
    }));
    return () => { isCancelled = true; };
  }, [options, src]);
  return <div ref={hostRef} style={style} />;
}

export default function AdViewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center">Yükleniyor...</div>}>
      <AdViewClient />
    </Suspense>
  );
}


