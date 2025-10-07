"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAdMetrics } from "@/lib/useAdMetrics";
import { ImpressionMetricsPayload, ImpressionStage, postImpression } from "@/lib/api";

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
  // Removed fixed 5s waiting rule. We switch to stage-2 immediately after stage-1 validation.

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

  const submitStage = async () => {
    if (!token || submitting || done) return;
    try {
      setSubmitting(true);
      setError(null);
      const res = await postImpression({ token, metrics: metricsPayload, stage });
      if (res.done) {
        setDone(true);
        setRedirect(res.redirect ?? null);
        if (res.redirect) {
          setTimeout(() => {
            // Click logging is now handled in the backend impression endpoint
            window.location.href = res.redirect as string;
          }, 500);
        } else {
          router.replace("/thanks");
        }
      } else {
        // Move to second ad immediately once stage-1 validated
        setStage(2);
        reset();
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Gönderim hatası";
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
          {/* Büyük, izlenen alan */}
          <div className="lg:col-span-2">
            <div ref={setDivRef} className="rounded-xl border border-black/10 bg-neutral-50 text-neutral-50 h-[320px] flex items-center justify-center">
              <span className="text-sm">{stage === 1 ? "Reklam Alanı #1 (izleniyor)" : "Reklam Alanı #2 (izleniyor)"}</span>
            </div>
          </div>
          {/* İkincil alanlar (placeholder) */}
          <div className="grid grid-rows-2 gap-4">
            <div className="rounded-xl border border-black/10 bg-neutral-50 text-neutral-500 h-[148px] flex items-center justify-center">
              <span className="text-xs">Yan Banner</span>
            </div>
            <div className="rounded-xl border border-black/10 bg-neutral-50 text-neutral-500 h-[148px] flex items-center justify-center">
              <span className="text-xs">Yan Banner</span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-black/10 bg-white">
            <div>Görünür Süre: {state.visibleMs} ms</div>
            <div>Etkileşim (ilk): {state.firstInteractionMs ?? "-"} ms</div>
            <div>Görünürlük Oranı: {Math.round((state.viewabilityRatio ?? 0) * 100)}%</div>
          </div>
          <div className="p-4 rounded-xl border border-black/10 bg-white flex items-center gap-3">
            <button
              onClick={submitStage}
              disabled={!passedThreshold || submitting || done}
              className={`px-4 py-2 rounded-lg text-white text-sm ${!passedThreshold || submitting || done ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {submitting ? 'Gönderiliyor...' : stage === 1 ? 'Geç (Aşama 1)' : 'Geç (Aşama 2)'}
            </button>
            {!passedThreshold && <div className="text-slate-500">Eşiği geçmek için alanı en az 5 sn görünür tutun ve etkileşim yapın.</div>}
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


