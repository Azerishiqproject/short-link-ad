"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface VisibilitySample {
  timestamp: number; // ms
  ratio: number; // 0..1
}

export interface AdMetricsState {
  visibleMs: number;
  firstInteractionMs?: number;
  viewabilityRatio?: number;
}

export interface UseAdMetricsOptions {
  minimumVisibleMs?: number; // default 3000
  minimumVisibilityRatio?: number; // default 0.5
}

export interface UseAdMetricsResult {
  ref: (node: HTMLElement | null) => void;
  state: AdMetricsState;
  passedThreshold: boolean;
  reset: () => void;
}

export function useAdMetrics(
  options?: UseAdMetricsOptions
): UseAdMetricsResult {
  const minimumVisibleMs = options?.minimumVisibleMs ?? 3000;
  const minimumVisibilityRatio = options?.minimumVisibilityRatio ?? 0.5;

  const elementRef = useRef<HTMLElement | null>(null);
  const startVisibleRef = useRef<number | null>(null);
  const accumulatedVisibleMsRef = useRef<number>(0);
  const lastVisibilityRatioRef = useRef<number>(0);
  const [firstInteractionMs, setFirstInteractionMs] = useState<number | undefined>(
    undefined
  );
  const [visibleMs, setVisibleMs] = useState<number>(0);

  const computeViewabilityRatio = useCallback((samples: VisibilitySample[]) => {
    if (samples.length === 0) return 0;
    const sum = samples.reduce((acc, s) => acc + s.ratio, 0);
    return sum / samples.length;
  }, []);

  const visibilitySamplesRef = useRef<VisibilitySample[]>([]);

  const passedThreshold = useMemo(() => {
    const ratio = computeViewabilityRatio(visibilitySamplesRef.current);
    return visibleMs >= minimumVisibleMs && ratio >= minimumVisibilityRatio;
  }, [visibleMs, computeViewabilityRatio, minimumVisibleMs, minimumVisibilityRatio]);

  const reset = useCallback(() => {
    accumulatedVisibleMsRef.current = 0;
    startVisibleRef.current = null;
    visibilitySamplesRef.current = [];
    setFirstInteractionMs(undefined);
    setVisibleMs(0);
  }, []);

  const ref = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    let rafId: number | null = null;
    let isVisible = false;
    let lastTs = performance.now();

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
        lastVisibilityRatioRef.current = ratio;
        visibilitySamplesRef.current.push({ timestamp: performance.now(), ratio });

        if (ratio >= minimumVisibilityRatio && document.visibilityState === "visible") {
          if (!isVisible) {
            isVisible = true;
            startVisibleRef.current = performance.now();
          }
        } else {
          if (isVisible) {
            isVisible = false;
            const now = performance.now();
            const diff = now - (startVisibleRef.current ?? now);
            accumulatedVisibleMsRef.current += diff;
            setVisibleMs(accumulatedVisibleMsRef.current);
            startVisibleRef.current = null;
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    io.observe(node);

    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible" && startVisibleRef.current !== null) {
        // Tab hidden while visible; accumulate
        const now = performance.now();
        const diff = now - startVisibleRef.current;
        accumulatedVisibleMsRef.current += diff;
        setVisibleMs(accumulatedVisibleMsRef.current);
        startVisibleRef.current = null;
      } else if (
        document.visibilityState === "visible" &&
        lastVisibilityRatioRef.current >= minimumVisibilityRatio
      ) {
        // Resume counting
        startVisibleRef.current = performance.now();
      }
    };

    const tick = () => {
      const now = performance.now();
      if (startVisibleRef.current !== null) {
        const diff = now - (lastTs ?? now);
        accumulatedVisibleMsRef.current += diff;
        setVisibleMs(accumulatedVisibleMsRef.current);
        lastTs = now;
      }
      rafId = requestAnimationFrame(tick);
    };

    const onFirstInteraction = () => {
      if (firstInteractionMs === undefined) {
        setFirstInteractionMs(Math.round(accumulatedVisibleMsRef.current));
        window.removeEventListener("pointerdown", onFirstInteraction, true);
        window.removeEventListener("scroll", onFirstInteraction, true);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pointerdown", onFirstInteraction, true);
    window.addEventListener("scroll", onFirstInteraction, true);
    rafId = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointerdown", onFirstInteraction, true);
      window.removeEventListener("scroll", onFirstInteraction, true);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [firstInteractionMs, minimumVisibilityRatio]);

  // Derive viewability ratio without unnecessary memo dependency warning
  const viewabilityRatio = (() => {
    const samples = visibilitySamplesRef.current;
    return samples.length ? samples.reduce((a, b) => a + b.ratio, 0) / samples.length : 0;
  })();

  return {
    ref,
    state: {
      visibleMs: Math.round(visibleMs),
      firstInteractionMs,
      viewabilityRatio,
    },
    passedThreshold,
    reset,
  };
}


