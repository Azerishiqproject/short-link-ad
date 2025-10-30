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

declare global {
  interface Window { adsbygoogle?: unknown[] }
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

  const adsInitialized = useRef(false);

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

  // Initialize AdSense in this page once
  useEffect(() => {
    if (adsInitialized.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adsInitialized.current = true;
    } catch (_) {}
  }, []);

  const mainSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_MAIN || "1234567890";
  const side1Slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDE1 || "1234567891";
  const side2Slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDE2 || "1234567892";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9175540655125327"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script src="https://publisher.linkvertise.com/cdn/linkvertise.js" strategy="afterInteractive" />
      <Script id="linkvertise-init-adview" strategy="afterInteractive">{`
        try { linkvertise(1415315, { whitelist: ["glorta.com","glorta.link"] }); } catch (_) {}
      `}</Script>
      <div className="w-full max-w-5xl rounded-2xl border border-black/10 bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Reklam Görüntüleme</h1>
            <p className="text-xs text-slate-500">Reklam {stage}/2 • Eşik: {passedThreshold ? "Geçildi" : "Bekleniyor"}</p>
          </div>
          <span className={`px-2 py-1 rounded-md text-xs ${stage===1? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>Aşama {stage}</span>
        </div>

        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
        </div>

        {/* Reklam alanları grid: 1 büyük (izlenen) + 2 küçük placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Büyük, izlenen alan */
          }
          <div className="lg:col-span-2">
            <div ref={setDivRef} className="rounded-xl border border-black/10 bg-white h-[320px] flex items-center justify-center p-3">
              <div id="lv-ad-main" className="w-full h-full flex items-center justify-center">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  data-ad-client="ca-pub-9175540655125327"
                  data-ad-slot={mainSlot}
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
            </div>
          </div>
          {/* İkincil alanlar (placeholder) */}
          <div className="grid grid-rows-2 gap-4">
            <div className="rounded-xl border border-black/10 bg-white h-[148px] flex items-center justify-center p-3">
              <div id="lv-ad-side-1" className="w-full h-full flex items-center justify-center">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  data-ad-client="ca-pub-9175540655125327"
                  data-ad-slot={side1Slot}
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
            </div>
            <div className="rounded-xl border border-black/10 bg-white h-[148px] flex items-center justify-center p-3">
              <div id="lv-ad-side-2" className="w-full h-full flex items-center justify-center">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  data-ad-client="ca-pub-9175540655125327"
                  data-ad-slot={side2Slot}
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="p-4 rounded-xl border border-black/10 bg-white flex items-center gap-3 text-sm">
            <button
              onClick={submitStage}
              disabled={!passedThreshold || submitting || done || !canProceed}
              className={`px-4 py-2 rounded-lg text-white text-sm ${!passedThreshold || submitting || done || !canProceed ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {submitting ? 'Gönderiliyor...' : 
               !canProceed ? `Bekleyin... (${countdown}s)` :
               stage === 1 ? 'Geç (Aşama 1)' : 'Geç (Aşama 2)'}
            </button>
            {!passedThreshold && <div className="text-slate-500">Eşiği geçmek için alanı en az 5 sn görünür tutun ve etkileşim yapın.</div>}
            {!canProceed && passedThreshold && !isPageVisible && <div className="text-red-500">⚠️ Sayfa görünür değil! Lütfen sayfaya geri dönün.</div>}
            {!canProceed && passedThreshold && !isPageFocused && <div className="text-red-500">⚠️ Sayfa odakta değil! Lütfen sayfaya odaklanın.</div>}
            {!canProceed && passedThreshold && isPageVisible && isPageFocused && <div className="text-slate-500">Lütfen 5 saniye bekleyin... ({countdown}s)</div>}
            {error && <div className="text-red-600">{error}</div>}
            {done && !redirect && <div className="text-emerald-600">Tamamlandı, yönlendiriliyor...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdViewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center">Yükleniyor...</div>}>
      <AdViewClient />
    </Suspense>
  );
}


