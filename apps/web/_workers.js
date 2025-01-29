export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control':
            'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      });
    }

    if (url.pathname.startsWith('/_next/static/')) {
      const response = await env.ASSETS.fetch(request);
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    }

    if (url.pathname.startsWith('/api/')) {
      const response = await env.ASSETS.fetch(request);
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Access-Control-Allow-Origin', '*');
      newHeaders.set('Cache-Control', 'no-store');
      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
