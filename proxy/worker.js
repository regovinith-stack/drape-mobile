// OPTIONAL: a tiny Cloudflare Worker that keeps YOUR Claude API key off the phone.
// Deploy:  npm create cloudflare  →  paste this file  →  set secrets:
//   wrangler secret put ANTHROPIC_KEY      (your Claude API key)
//   wrangler secret put APP_TOKEN          (any long random string)
// Then in the app: Settings → AI connection → "Use my own server": URL + token.
//
// IMPORTANT: a token shipped inside a public app can be extracted. Before releasing to the public
// add per-user sign-in, per-user daily limits and Google Play Integrity checks, or you may pay
// for other people's usage.
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'POST, OPTIONS' };
export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (req.method !== 'POST') return new Response('POST only', { status: 405, headers: CORS });
    if (req.headers.get('x-app-token') !== env.APP_TOKEN) return new Response('forbidden', { status: 403, headers: CORS });
    const raw = await req.text();
    if (raw.length > 6_000_000) return new Response('too large', { status: 413, headers: CORS });
    let body;
    try { body = JSON.parse(raw); } catch { return new Response('bad json', { status: 400, headers: CORS }); }
    body.model = 'claude-sonnet-5-5';                       // you choose the model
    body.max_tokens = Math.min(Number(body.max_tokens) || 2000, 4000); // you cap the cost
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify(body)
    });
    return new Response(r.body, { status: r.status, headers: { 'content-type': 'application/json', ...CORS } });
  }
};
