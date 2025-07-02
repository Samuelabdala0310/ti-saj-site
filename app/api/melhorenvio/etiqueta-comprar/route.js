import { NextResponse } from 'next/server';

export async function POST(req) {
  const { etiqueta_id } = await req.json();

  if (!etiqueta_id) {
    return NextResponse.json({ error: 'ID da etiqueta não informado.' }, { status: 400 });
  }

  const url = 'https://www.melhorenvio.com.br/api/v2/me/shipment/checkout';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_ACCESS_TOKEN}`,
        Accept: 'application/json'
      },
      body: JSON.stringify([etiqueta_id]) // A API espera um array com os IDs das etiquetas a serem compradas
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na compra da etiqueta:', errorText);
      return NextResponse.json({ error: 'Erro ao comprar a etiqueta.' }, { status: 500 });
    }

    const resultado = await response.json();
    return NextResponse.json(resultado);
  } catch (error) {
    console.error('Erro interno ao comprar etiqueta:', error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}