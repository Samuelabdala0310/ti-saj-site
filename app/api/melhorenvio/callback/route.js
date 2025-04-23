export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response(
      JSON.stringify({ error: "Código de autorização não encontrado." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_MELHOR_ENVIO_CLIENT_ID,
    client_secret: process.env.MELHOR_ENVIO_CLIENT_SECRET,
    redirect_uri: process.env.MELHOR_ENVIO_REDIRECT_URI,
    code,
  });

  try {
    const url = `${process.env.MELHORENVIO_API}/oauth/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json", // <- isso é importante!
      },
      body: params.toString(),
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);

      if (!response.ok) {
        console.error("Erro ao obter token:", data);
        return new Response(
          JSON.stringify({ error: "Erro ao obter token", details: data }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      console.log("Token recebido:", data);

      return new Response(JSON.stringify({ success: true, token: data }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (parseError) {
      console.error("Resposta inesperada do servidor (não é JSON)", text);
      return new Response(
        JSON.stringify({
          error: "Resposta inesperada do servidor (não é JSON)",
          raw: text,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Erro inesperado:", error);
    return new Response(
      JSON.stringify({ error: "Falha ao trocar código por token." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
