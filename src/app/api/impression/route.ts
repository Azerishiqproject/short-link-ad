export async function POST(req: Request) {
  try {
    const apiBase = process.env.API_BASE_URL;
    if (!apiBase) {
      return new Response(JSON.stringify({ error: "missing-API_BASE_URL" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    const upstream = await fetch(`${apiBase}/api/links/impression`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward useful headers (best-effort)
        "user-agent": req.headers.get("user-agent") || "",
        referer: req.headers.get("referer") || "",
      },
      body: JSON.stringify(body),
    });

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json",
      },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "proxy-failed";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


