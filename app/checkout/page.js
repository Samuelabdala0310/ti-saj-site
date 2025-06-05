"use client";

import { useCarrinho } from "@/context/CarrinhoContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, DollarSign } from "lucide-react";

export default function Checkout() {
  const { carrinho, totalCarrinho } = useCarrinho();
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (carrinho) {
      setCarregando(false);
    }
  }, [carrinho]);

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-gray-400 text-lg">Carregando carrinho...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 py-10">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-800 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-1">
            <ShoppingCart className="w-6 h-6 text-purple-400" />
            Finalizar Pedido
          </h1>
          <p className="text-gray-400 text-sm">
            Revise seus produtos antes de prosseguir.
          </p>
        </div>

        {carrinho.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">Seu carrinho está vazio.</p>
          </div>
        ) : (
          <>
            {/* Itens do Carrinho */}
            <div className="space-y-4">
              {carrinho.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-zinc-800 rounded-xl px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-white">{item.nome}</p>
                    <p className="text-sm text-gray-400">
                      Tamanho: {item.tamanho} | Quantidade: {item.quantidade}
                    </p>
                  </div>
                  <span className="text-green-400 font-semibold">
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totais */}
            <div className="border-t border-zinc-700 pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-lg font-semibold">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Total:
                </span>
                <span className="text-2xl font-bold text-green-500">
                  R$ {totalCarrinho.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Botão de prosseguir */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => router.push("/revisao")}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition"
              >
                Prosseguir para Revisão
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}