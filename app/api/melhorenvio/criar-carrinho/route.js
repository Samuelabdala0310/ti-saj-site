import { NextResponse } from 'next/server';

export async function POST(req) {
  const { cepDestino, produtos } = await req.json();

  if (!cepDestino || !Array.isArray(produtos)) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
  }

  const url = `${process.env.MELHORENVIO_API}/api/v2/me/cart`;

  const body = {
    from: {
      postal_code: '89120000' // Seu CEP de origem real
    },
    to: {
      postal_code: cepDestino
    },
    products: produtos,
    options: {
      own_hand: false,
      receipt: false,
      insurance_value: 100
    },
    services: "", // Vazio = incluir todas as transportadoras disponíveis
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_ACCESS_TOKEN}`,
        Accept: 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro criando carrinho:', errorText);
      return NextResponse.json({ error: 'Erro ao criar carrinho.' }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json(data); // Pode conter ID do carrinho e os serviços
  } catch (error) {
    console.error('Erro inesperado:', error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}