'use client';
import { useState } from 'react';

export default function TesteFrete() {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const calcularFrete = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/melhorenvio/cotar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: { postal_code: '89010025' }, // CEP de origem (exemplo)
          to: { postal_code: '88015600' },   // CEP de destino (exemplo)
          products: [
            {
              weight: 1,        // peso em KG
              width: 20,        // largura em CM
              height: 10,       // altura em CM
              length: 30,       // comprimento em CM
              insurance_value: 100, // valor declarado (R$)
            },
          ],
          options: { receipt: false, own_hand: false, collect: false },
          services: [], // podemos especificar transportadoras depois
        }),
      });

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={calcularFrete}
        disabled={loading}
        className="bg-blue-500 text-white p-3 rounded"
      >
        {loading ? 'Calculando...' : 'Calcular Frete'}
      </button>

      {resultado && (
        <pre className="mt-8 bg-gray-100 p-4 rounded overflow-x-auto">
          {JSON.stringify(resultado, null, 2)}
        </pre>
      )}
    </div>
  );
}