import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log('Recebendo requisição de cotação...');

  const body = await req.json();
  console.log('Body recebido:', body);

  const accessToken = process.env.MELHOR_ENVIO_ACCESS_TOKEN;
  console.log('Access Token carregado:', accessToken);

  // Função que identifica se o token é sandbox ou produção (pelo formato ou prefixo)
  const isSandboxToken = accessToken.startsWith('sandbox_');

  // Definir a URL base dependendo se for sandbox ou produção
  const baseUrl = isSandboxToken 
    ? 'https://sandbox.melhorenvio.com.br/api/v2'
    : 'https://www.melhorenvio.com.br/api/v2';

  console.log('Base URL escolhida:', baseUrl);

  try {
    const response = await fetch(`${baseUrl}/me/shipment/calculate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Resposta recebida da Melhor Envio, status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro da API Melhor Envio:', errorData);
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data = await response.json();
    console.log('Dados de cotação recebidos:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}