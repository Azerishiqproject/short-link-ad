export type ImpressionStage = 1 | 2;

export interface ImpressionMetricsPayload {
  visible_ms: number;
  first_interaction_ms?: number;
  viewability_ratio?: number;
  viewport?: { w: number; h: number; dpr?: number };
  lang?: string;
  tz?: string;
  ref?: string;
  hints?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ImpressionRequestBody {
  token: string;
  metrics: ImpressionMetricsPayload;
  stage: ImpressionStage;
}

export interface ImpressionResponseSingleStage {
  ok: true;
  done: false;
  suspicious?: boolean;
  already?: boolean;
}

export interface ImpressionResponseFinalStage {
  ok: true;
  done: true;
  redirect: string | null;
  linkId?: string;
  suspicious?: boolean;
}

export type ImpressionResponse =
  | ImpressionResponseSingleStage
  | ImpressionResponseFinalStage;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const DEFAULT_IMPRESSION_ENDPOINT = `${API_BASE}/api/links/impression`;
const ADMIN_AD_CONSUME_ENDPOINT = `${API_BASE}/api/admin-ads/consume`;

export async function postImpression(
  body: ImpressionRequestBody,
  endpoint: string = DEFAULT_IMPRESSION_ENDPOINT,
  options?: { retries?: number; retryDelayMs?: number }
): Promise<ImpressionResponse> {
  const retries = options?.retries ?? 2;
  const retryDelayMs = options?.retryDelayMs ?? 500;

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        // No credentials needed; simplify CORS
        mode: "cors",
      });

      if (!res.ok) {
        // Surface known error statuses to the caller, but allow retry on 5xx
        if (res.status >= 400 && res.status < 500) {
          const errBody = await res.text().catch(() => "");
          throw new Error(`impression-failed-${res.status}: ${errBody}`);
        }
      }

      return (await res.json()) as ImpressionResponse;
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, retryDelayMs * (attempt + 1)));
        continue;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("impression-post-unknown-error");
}

export async function consumeAdminAdOnce(): Promise<{ openUrl: boolean; url?: string | null; remaining?: number }>
{
  const res = await fetch(ADMIN_AD_CONSUME_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, mode: "cors" });
  if (!res.ok) return { openUrl: false };
  try { return await res.json(); } catch { return { openUrl: false }; }
}


