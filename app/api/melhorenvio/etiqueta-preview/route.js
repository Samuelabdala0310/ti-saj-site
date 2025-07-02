import { NextResponse } from 'next/server';

export async function POST(req) {
  const dados = await req.json();

  const url = 'https://www.melhorenvio.com.br/api/v2/me/shipment/preview';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_ACCESS_TOKEN}`,
        Accept: 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na pré-visualização da etiqueta:', errorText);
      return NextResponse.json({ error: 'Erro na pré-visualização.' }, { status: 500 });
    }

    const resultado = await response.json();
    return NextResponse.json(resultado);
  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}