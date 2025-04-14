'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutButton() {
  const handleClick = async () => {
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!data.id) {
        console.error('Erro: ID da sessão não recebido');
        return;
      }

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        console.error('Erro no redirecionamento:', result.error.message);
      }
    } catch (error) {
      console.error('Erro geral no handleClick:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
    >
      Comprar agora
    </button>
  );
}