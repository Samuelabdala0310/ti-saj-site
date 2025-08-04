import { NextResponse } from "next/server";

// Tokens armazenados em memória (inicializados com variáveis de ambiente)
let accessToken = process.env.MELHOR_ENVIO_ACCESS_TOKEN;
let refreshToken = process.env.MELHOR_ENVIO_REFRESH_TOKEN;

async function renovarToken() {
  console.log("🚀 Tentando renovar token com refresh_token...");

  const url = "https://api.melhorenvio.com.br/oauth/token";

  const body = {
    grant_type: "refresh_token",
    client_id: process.env.MELHOR_ENVIO_CLIENT_ID,
    client_secret: process.env.MELHOR_ENVIO_CLIENT_SECRET,
    refresh_token: refreshToken,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Falha ao renovar token:", errorText);
    throw new Error("Falha ao renovar token Melhor Envio");
  }

  const data = await response.json();

  accessToken = data.access_token;
  refreshToken = data.refresh_token || refreshToken;

  console.log("✅ Token renovado com sucesso!");
  console.log("Novo accessToken:", accessToken);
  // Aqui você pode salvar os tokens em banco/arquivo para persistência

  return accessToken;
}

async function fazerRequisicao(url, options = {}) {
  if (!options.headers) options.headers = {};
  options.headers["Authorization"] = `Bearer ${accessToken}`;
  options.headers["Content-Type"] = "application/json";
  options.headers["Accept"] = "application/json";

  console.log("👉 Fazendo requisição com token:", accessToken);

  let response = await fetch(url, options);

  if (response.status === 401) {
    console.log("⚠️ Token expirado, tentando renovar...");
    try {
      await renovarToken();
      console.log("✅ Token renovado, tentando a requisição novamente...");
    } catch (e) {
      console.error("❌ Erro ao renovar token:", e);
      throw e;
    }

    options.headers["Authorization"] = `Bearer ${accessToken}`;
    response = await fetch(url, options);
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Erro na resposta da API Melhor Envio:", errorText);
    throw new Error(`Erro na requisição Melhor Envio: ${errorText}`);
  }

  return response.json();
}

export async function POST(req) {
  try {
    const { cep } = await req.json();

    if (!cep) {
      return NextResponse.json({ error: "CEP não informado." }, { status: 400 });
    }

    const url = "https://api.melhorenvio.com.br/api/v2/me/shipment/calculate";

    const body = {
      from: {
        postal_code: "89120000", // seu CEP de origem
      },
      to: {
        postal_code: cep,
      },
      products: [
        {
          id: "1",
          width: 15,
          height: 20,
          length: 20,
          weight: 0.5,
          insurance_value: 100,
          quantity: 1,
        },
      ],
      options: {
        own_hand: false,
        receipt: false,
        insurance_value: 100,
      },
    };

    console.log("📦 Solicitando cálculo de frete para CEP:", cep);

    const data = await fazerRequisicao(url, {
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log("📬 Resposta da Melhor Envio:", data);

    const resultado = data.map((opcao) => ({
      nome: opcao.name,
      prazo: opcao.delivery_time.days,
      valor: parseFloat(opcao.price),
    }));

    return NextResponse.json(resultado);
  } catch (error) {
    console.error("❌ Erro geral na API de frete:", error);
    return NextResponse.json({ error: "Erro ao calcular frete." }, { status: 500 });
  }
}