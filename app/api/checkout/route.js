import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items, metodoPagamento } = await req.json();

    const line_items = items.map(item => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: `${item.nome} (${item.tamanho})`,
        },
        unit_amount: item.preco * 100,
      },
      quantity: item.quantidade,
    }));

    const metodosPermitidos = {
      pix: ["pix"],
      boleto: ["boleto"],
      card: ["card"],
    };

    const payment_method_types = metodosPermitidos[metodoPagamento] || ["card"];

    // Define a URL base (usa variável de ambiente em produção e localhost no dev)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types,
      line_items,
      mode: "payment",
      success_url: `${baseUrl}/sucesso`,
      cancel_url: `${baseUrl}/erro`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("❌ Erro na criação da sessão de checkout:", err);
    return new Response(JSON.stringify({ error: "Erro ao criar sessão" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
