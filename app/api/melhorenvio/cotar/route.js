import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log('🟡 Recebendo requisição de cotação...');

  const accessToken = process.env.SANDBOX_ACCESS_TOKEN;
  if (!accessToken) {
    console.error('❌ Token de acesso não encontrado no .env');
    return NextResponse.json({ error: 'Access token não encontrado' }, { status: 500 });
  }

  const isSandboxToken = accessToken.startsWith('sandbox_');
  const baseUrl = isSandboxToken
    ? 'https://sandbox.melhorenvio.com.br/api/v2'
    : 'https://www.melhorenvio.com.br/api/v2';

  console.log('🔵 Base URL escolhida:', baseUrl);

  let body;
  try {
    body = await req.json();
    console.log('📦 Body recebido:', JSON.stringify(body, null, 2));
  } catch (err) {
    console.error('❌ Erro ao ler o body da requisição:', err);
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 });
  }

  try {
    const response = await fetch(`${baseUrl}/me/shipment/calculate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify([body]), // A API espera um array
    });

    console.log('📨 Status da resposta da Melhor Envio:', response.status);

    const responseText = await response.text();

    if (!response.ok) {
      console.error('❌ Erro da API Melhor Envio:', responseText);
      return NextResponse.json({ error: responseText }, { status: response.status });
    }

    try {
      const data = JSON.parse(responseText);
      console.log('✅ Dados de cotação recebidos:', data);
      return NextResponse.json(data);
    } catch (jsonError) {
      console.error('❌ Erro ao parsear JSON da resposta:', jsonError);
      return NextResponse.json({ error: 'Resposta inválida da Melhor Envio' }, { status: 502 });
    }
  } catch (error) {
    console.error('❌ Erro no servidor:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}