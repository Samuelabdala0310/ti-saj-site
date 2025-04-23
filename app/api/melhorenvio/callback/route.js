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

  try {
    console.log('🔍 Enviando parâmetros para Melhor Envio:', params.toString());

    const response = await fetch(`${process.env.MELHORENVIO_API}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    console.log('📡 Status da resposta:', response.status);

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonError) {
      console.error('❌ Resposta não é JSON. Conteúdo bruto:', text);
      return new Response(JSON.stringify({
        error: 'Resposta inesperada do servidor (não é JSON)',
        raw: text
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!response.ok) {
      console.error('⚠️ Erro ao obter token:', data);
      return new Response(JSON.stringify({ error: 'Erro ao obter token', details: data }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('✅ Token recebido com sucesso:', data);

    return new Response(JSON.stringify({ success: true, token: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 Erro inesperado na requisição:', error);
    return new Response(JSON.stringify({ error: 'Falha ao trocar código por token.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
