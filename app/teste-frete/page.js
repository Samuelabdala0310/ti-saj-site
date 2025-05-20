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
        body: JSON.stringify([
          {
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
            services: [], // vazio para receber todas as opções
          }
        ]),
      });

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error('Erro:', error);
      setResultado({ error: 'Erro ao calcular o frete' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        onClick={calcularFrete}
        disabled={loading}
        className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
      >
        {loading ? 'Calculando...' : 'Calcular Frete'}
      </button>

      {resultado && Array.isArray(resultado) && (
        <div className="mt-8 space-y-4">
          {resultado.map((frete, idx) => (
            <div key={idx} className="border p-4 rounded bg-gray-100">
              <p><strong>Transportadora:</strong> {frete.name}</p>
              <p><strong>Preço:</strong> R$ {(frete.price || 0).toFixed(2)}</p>
              <p><strong>Prazo de Entrega:</strong> {frete.delivery_time.days} dias úteis</p>
              <p><strong>Serviço:</strong> {frete.company?.name}</p>
            </div>
          ))}
        </div>
      )}

      {resultado && resultado.error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Erro: {resultado.error}
        </div>
      )}
    </div>
  );
}