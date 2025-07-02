import { NextResponse } from 'next/server';

export async function POST(req) {
  const dados = await req.json();

  if (!dados || !Array.isArray(dados)) {
    return NextResponse.json({ error: 'Dados inválidos para geração da etiqueta.' }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.MELHORENVIO_API}/api/v2/me/shipment/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(dados),
    });

    const resposta = await response.json();

    if (!response.ok) {
      console.error('Erro ao gerar etiqueta:', resposta);
      return NextResponse.json({ error: 'Erro ao gerar etiqueta', detalhes: resposta }, { status: 500 });
    }

    return NextResponse.json(resposta);
  } catch (error) {
    console.error('Erro interno ao gerar etiqueta:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
