"use client";
import { useState } from "react";

export default function Produto() {
  const [quantidade, setQuantidade] = useState(1);

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Nome da Camisa</h1>
      
      {/* Galeria de Imagens e Vídeo */}
      <div className="flex gap-4 mb-6">
        <img src="/camisa1.jpg" alt="Camisa 1" className="w-48 h-48 rounded-lg shadow-md" />
        <img src="/camisa2.jpg" alt="Camisa 2" className="w-48 h-48 rounded-lg shadow-md" />
        <video className="w-48 h-48 rounded-lg shadow-md" controls>
          <source src="/video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      </div>

      {/* Informações do Produto */}
      <p className="text-lg mb-2">Preço: <strong>R$ 79,90</strong></p>
      <p className="text-gray-600 mb-4">Frete: Calculado no checkout</p>
      
      {/* Seletor de Quantidade */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))} className="px-3 py-1 bg-gray-300 rounded">
          -
        </button>
        <span className="text-lg">{quantidade}</span>
        <button onClick={() => setQuantidade(quantidade + 1)} className="px-3 py-1 bg-gray-300 rounded">
          +
        </button>
      </div>

      {/* Botão de Comprar */}
      <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600">
        Comprar Agora
      </button>
      
      {/* Avaliações */}
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Avaliações</h2>
        <p className="italic">"Ótima qualidade, recomendo!" - Cliente Satisfeito</p>
        <p className="italic">"Melhor compra que fiz esse mês." - Comprador</p>
      </div>
    </div>
  );
}