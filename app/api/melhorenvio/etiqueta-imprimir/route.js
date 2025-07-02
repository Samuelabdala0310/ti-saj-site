import { NextResponse } from 'next/server';

export async function POST(req) {
  const { etiquetaIds } = await req.json();

  if (!etiquetaIds || !Array.isArray(etiquetaIds) || etiquetaIds.length === 0) {
    return NextResponse.json({ error: 'IDs das etiquetas não informados corretamente.' }, { status: 400 });
  }

  try {
    const response = await fetch('https://www.melhorenvio.com.br/api/v2/me/shipment/print', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ shipments: etiquetaIds }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro ao gerar impressão:', errorText);
      return NextResponse.json({ error: 'Erro ao gerar impressão da etiqueta.' }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json({ url: data.pdf });
  } catch (error) {
    console.error('Erro geral na impressão:', error);
    return NextResponse.json({ error: 'Erro inesperado ao gerar impressão da etiqueta.' }, { status: 500 });
  }
}