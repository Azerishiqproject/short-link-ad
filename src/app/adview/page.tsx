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

  const { ref, state, passedThreshold, reset } = useAdMetrics({
    minimumVisibleMs: 5000,
    minimumVisibilityRatio: 0.5,
  });

  const [stage, setStage] = useState<ImpressionStage>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [redirect, setRedirect] = useState<string | null>(null);
  const [canProceed, setCanProceed] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isPageFocused, setIsPageFocused] = useState(true);
  const [activeTime, setActiveTime] = useState(0);
  const [adminAdTried, setAdminAdTried] = useState(false);

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

  // Aşama değiştiğinde timer'ı sıfırla
  useEffect(() => {
    setCanProceed(false);
    setCountdown(5);
    setActiveTime(0);
  }, [stage]);

  // Page visibility ve focus kontrolü
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
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

  // Gerçek zamanlı countdown - sadece sayfa görünür ve odakta olduğunda
  useEffect(() => {
    if (!canProceed) {
      const interval = setInterval(() => {
        // Sadece sayfa görünür ve odakta olduğunda zamanı say
        if (isPageVisible && isPageFocused) {
          setActiveTime(prev => {
            const newActiveTime = prev + 0.1; // 100ms artır
            const remaining = Math.max(0, 5 - newActiveTime);
            setCountdown(Math.ceil(remaining));
            
            if (remaining <= 0) {
              setCanProceed(true);
            }
            
            return newActiveTime;
          });
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [canProceed, isPageVisible, isPageFocused]);

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

  // Remove auto-submit; require explicit user click on the button once threshold is passed

  // Simple visibility progress indicator for UX
  const progress = Math.min(100, Math.round(((state.visibleMs || 0) / 5000) * 100));

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <Script src="https://publisher.linkvertise.com/cdn/linkvertise.js" strategy="afterInteractive" />
      <Script id="linkvertise-init-adview" strategy="afterInteractive">{`
        try { linkvertise(1415315, { whitelist: ["glorta.com","glorta.link"] }); } catch (_) {}
      `}</Script>
      <div className="w-full max-w-7xl">
        {/* Grid layout: sol reklamlar - ortada kontrol - sağ reklamlar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Sol taraf reklamlar - mobilde üstte, desktop'ta solda */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* 160x600 iframe - mobilde gizle, desktop'ta göster */}
            <div className="hidden lg:flex rounded-xl border border-black/10 bg-neutral-50 items-center justify-center p-2">
              <AdsterraIframe
                options={{ key: '330827705bb5350a894aee8ca1e0a40a', format: 'iframe', height: 600, width: 160, params: {} }}
                src="//www.highperformanceformat.com/330827705bb5350a894aee8ca1e0a40a/invoke.js"
                style={{ width: 160, height: 600 }}
              />
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
                <span className={`px-2 py-1 rounded-md text-xs ${stage===1? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>Aşama {stage}</span>
              </div>

              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Ana izlenen alan: Adsterra Native */}
            <div ref={setDivRef} className="w-full rounded-xl border border-black/10 bg-neutral-50 mb-4">
              <div id="lv-ad-main" className="w-full h-full flex items-center justify-center p-2 min-h-[320px]">
                <div id="container-7cf6ae2b4489f51ec0162164b881837d" className="w-full flex items-center justify-center" />
                <Script
                  id="adsterra-native"
                  async
                  data-cfasync="false"
                  src="//pl27961098.effectivegatecpm.com/7cf6ae2b4489f51ec0162164b881837d/invoke.js"
                  strategy="afterInteractive"
                />
              </div>
            </div>

            {/* Buton ve durum mesajları */}
            <div className="p-4 rounded-xl border border-black/10 bg-white flex flex-col gap-3 text-sm">
              <button
                onClick={submitStage}
                disabled={!passedThreshold || submitting || done || !canProceed}
                className={`px-4 py-2 rounded-lg text-white text-sm ${!passedThreshold || submitting || done || !canProceed ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {submitting ? 'Gönderiliyor...' : 
                 !canProceed ? `Bekleyin... (${countdown}s)` :
                 stage === 1 ? 'Geç (Aşama 1)' : 'Geç (Aşama 2)'}
              </button>
              {!passedThreshold && <div className="text-slate-500 text-center">Eşiği geçmek için alanı en az 5 sn görünür tutun ve etkileşim yapın.</div>}
              {!canProceed && passedThreshold && !isPageVisible && <div className="text-red-500 text-center">⚠️ Sayfa görünür değil! Lütfen sayfaya geri dönün.</div>}
              {!canProceed && passedThreshold && !isPageFocused && <div className="text-red-500 text-center">⚠️ Sayfa odakta değil! Lütfen sayfaya odaklanın.</div>}
              {!canProceed && passedThreshold && isPageVisible && isPageFocused && <div className="text-slate-500 text-center">Lütfen 5 saniye bekleyin... ({countdown}s)</div>}
              {error && <div className="text-red-600 text-center">{error}</div>}
              {done && !redirect && <div className="text-emerald-600 text-center">Tamamlandı, yönlendiriliyor...</div>}
            </div>
          </div>

          {/* Sağ taraf reklamlar - mobilde altta, desktop'ta sağda */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* 300x250 iframe */}
            <div className="w-full rounded-xl border border-black/10 bg-neutral-50 flex items-center justify-center p-2">
              <AdsterraIframe
                options={{ key: '208e66d41cfa6e22469da9df59ae57fc', format: 'iframe', height: 250, width: 300, params: {} }}
                src="//stopperscared.com/208e66d41cfa6e22469da9df59ae57fc/invoke.js"
                style={{ width: 300, height: 250 }}
              />
            </div>

            {/* Ek script (Adsterra) */}
            <div className="w-full rounded-xl border border-black/10 bg-neutral-50 p-2">
              <Script id="adsterra-extra" src="//stopperscared.com/3c/8d/a8/3c8da8282fcf948c3c585c6de04a3f97.js" strategy="afterInteractive" />
            </div>
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
      const invoke = document.createElement('script');
      invoke.type = 'text/javascript';
      invoke.src = src;
      (invoke as any).async = false;
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


