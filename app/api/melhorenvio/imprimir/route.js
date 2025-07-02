import { NextResponse } from 'next/server';

export async function POST(req) {
  const { etiquetas } = await req.json();

  if (!etiquetas || !Array.isArray(etiquetas) || etiquetas.length === 0) {
    return NextResponse.json({ error: 'Você deve informar ao menos uma etiqueta.' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://www.melhorenvio.com.br/api/v2/me/shipment/print`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_ACCESS_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shipments: etiquetas }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro ao gerar link de impressão:', errorText);
      return NextResponse.json({ error: 'Erro ao gerar link de impressão.' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro geral ao gerar impressão:', error);
    return NextResponse.json({ error: 'Erro inesperado ao gerar impressão.' }, { status: 500 });
  }
}