import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://www.melhorenvio.com.br/api/v2/me/shipment/companies', {
      headers: {
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_ACCESS_TOKEN}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro ao buscar transportadoras:', errorText);
      return NextResponse.json({ error: 'Erro ao buscar transportadoras.' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro geral ao buscar transportadoras:', error);
    return NextResponse.json({ error: 'Erro inesperado.' }, { status: 500 });
  }
}