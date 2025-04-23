export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return new Response(JSON.stringify({ error: 'Código de autorização não encontrado.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_MELHOR_ENVIO_CLIENT_ID,
    client_secret: process.env.MELHOR_ENVIO_CLIENT_SECRET,
    redirect_uri: process.env.MELHOR_ENVIO_REDIRECT_URI,
    code,
  });

  const url = `${process.env.MELHORENVIO_API}/oauth/token`;
  console.log('Enviando requisição para:', url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      const raw = await response.text();
      console.error('Resposta inesperada do servidor (não é JSON):', raw);
      return new Response(JSON.stringify({
        error: 'Resposta inesperada do servidor (não é JSON)',
        raw,
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro ao obter token:', data);
      return new Response(JSON.stringify({
        error: 'Erro ao obter token',
        details: data,
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Token recebido com sucesso:', data);

    return new Response(JSON.stringify({
      success: true,
      token: data,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro inesperado:', error);
    return new Response(JSON.stringify({
      error: 'Falha ao trocar código por token.',
      details: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}