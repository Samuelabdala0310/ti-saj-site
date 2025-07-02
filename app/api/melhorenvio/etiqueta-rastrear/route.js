import { NextResponse } from 'next/server';

export async function POST(req) {
  const { etiquetaId } = await req.json();

  if (!etiquetaId) {
    return NextResponse.json({ error: 'ID da etiqueta não informado.' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://www.melhorenvio.com.br/api/v2/me/shipment/tracking/${etiquetaId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_ACCESS_TOKEN}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro ao rastrear etiqueta:', errorText);
      return NextResponse.json({ error: 'Erro ao rastrear etiqueta.' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro geral no rastreamento:', error);
    return NextResponse.json({ error: 'Erro inesperado ao rastrear etiqueta.' }, { status: 500 });
  }
}