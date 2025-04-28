import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log('Recebendo requisição de cotação...');

  const body = await req.json();
  console.log('Body recebido:', body);

  const accessToken = process.env.MELHOR_ENVIO_ACCESS_TOKEN;
  console.log('Access Token carregado:', accessToken);

  // Ajuste aqui - retransformar o body
  const payload = {
    from: {
      postal_code: body.de?.código_postal || body.from?.postal_code,
    },
    to: {
      postal_code: body.para?.código_postal || body.to?.postal_code,
    },
    products: (body.produtos || body.products || []).map((produto) => ({
      weight: produto.peso || produto.weight,
      width: produto.largura || produto.width,
      height: produto.altura || produto.height,
      length: produto.comprimento || produto.length,
      insurance_value: produto.valor_seguro || produto.insurance_value,
    })),
    options: {
      receipt: body.opções?.recibo ?? body.options?.receipt ?? false,
      own_hand: body.opções?.própria_mão ?? body.options?.own_hand ?? false,
      collect: body.opções?.a_cobrar ?? body.options?.collect ?? false,
    },
    services: body.serviços ?? body.services ?? [],
  };

  console.log('Payload enviado para Melhor Envio:', payload);

  try {
    const response = await fetch('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Resposta recebida da Melhor Envio, status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro da API Melhor Envio:', errorData);
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data = await response.json();
    console.log('Dados de cotação recebidos:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}