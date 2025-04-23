export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return new Response(JSON.stringify({ error: 'Código de autorização não encontrado.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const query = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_MELHOR_ENVIO_CLIENT_ID,
    client_secret: process.env.MELHOR_ENVIO_CLIENT_SECRET,
    redirect_uri: process.env.MELHOR_ENVIO_REDIRECT_URI,
    code,
  });

  try {
    const response = await fetch(`${process.env.MELHORENVIO_API}/oauth/token?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro ao obter token:', data);
      return new Response(JSON.stringify({ error: 'Erro ao obter token', details: data }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Token recebido:', data);

    return new Response(JSON.stringify({ success: true, token: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro inesperado:', error);
    return new Response(JSON.stringify({ error: 'Falha ao trocar código por token.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}