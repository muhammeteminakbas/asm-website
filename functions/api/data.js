// Cloudflare Pages Functions API endpoint
// Verileri Cloudflare KV'den okuyup yazmak için

export async function onRequest(context) {
  const { request, env } = context;
  const method = request.method;
  const url = new URL(request.url);

  // KV namespace (Cloudflare dashboard'dan oluşturulacak)
  const KV = env.ASM_WEBSITE_DATA;

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // OPTIONS request (CORS preflight)
  if (method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    // GET: Verileri oku
    if (method === 'GET') {
      const data = await KV.get('website_data', 'json');
      return new Response(JSON.stringify(data || []), { headers });
    }

    // POST/PUT: Verileri kaydet
    if (method === 'POST' || method === 'PUT') {
      const body = await request.json();
      await KV.put('website_data', JSON.stringify(body));
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405, 
      headers 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers 
    });
  }
}
