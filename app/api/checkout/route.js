import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items, metodoPagamento, frete } = await req.json();

    const line_items = items.map(item => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: `${item.nome} (${item.tamanho})`,
        },
        unit_amount: item.preco * 100, // Stripe trabalha em centavos
      },
      quantity: item.quantidade,
    }));

    // Adiciona o frete como um item no carrinho
    if (frete && frete > 0) {
      line_items.push({
        price_data: {
          currency: "brl",
          product_data: {
            name: "Frete",
          },
          unit_amount: frete * 100,
        },
        quantity: 1,
      });
    }

    const metodosPermitidos = {
      pix: ["pix"],
      boleto: ["boleto"],
      cartao: ["card"],
    };

    const payment_method_types = metodosPermitidos[metodoPagamento] || ["card"];

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
    return new Response(
      JSON.stringify({ error: "Erro ao criar sessão" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}