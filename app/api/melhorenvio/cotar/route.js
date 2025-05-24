import { NextResponse } from 'next/server';

export async function POST(req) {
  const { cep } = await req.json();

  if (!cep) {
    return NextResponse.json({ error: 'CEP não informado.' }, { status: 400 });
  }

  const url = `https://www.melhorenvio.com.br/api/v2/me/shipment/calculate`;

  const body = {
    from: {
      postal_code: '04534011' // CEP de origem (ajuste para o seu)
    },
    to: {
      postal_code: cep
    },
    products: [
      {
        id: '1',
        width: 15,
        height: 20,
        length: 20,
        weight: 0.5,
        insurance_value: 100,
        quantity: 1
      }
    ],
    services: [], // Deixa vazio para retornar todas as opções possíveis
    options: {
      own_hand: false,
      receipt: false,
      insurance_value: 100
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_TOKEN}` // Seu token da Melhor Envio
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.error(await response.text());
      return NextResponse.json({ error: 'Erro na cotação.' }, { status: 500 });
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const resultado = data.map(opcao => ({
      nome: opcao.name,
      prazo: opcao.delivery_time,
      valor: parseFloat(opcao.price)
    }));

    return NextResponse.json(resultado);
  } catch (error) {
    console.error('Erro na API do Melhor Envio:', error);
    return NextResponse.json({ error: 'Erro ao calcular frete.' }, { status: 500 });
  }
}