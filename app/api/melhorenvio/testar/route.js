import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Testando ambiente do token...');

  const accessToken = process.env.MELHOR_ENVIO_ACCESS_TOKEN;

  try {
    const response = await fetch('https://www.melhorenvio.com.br/api/v2/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    console.log('Resposta recebida:', data);

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao testar o ambiente:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}