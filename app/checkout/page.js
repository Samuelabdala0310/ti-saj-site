"use client";

import { useCarrinho } from "@/context/CarrinhoContext";
import { useFrete } from "@/context/FreteContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, DollarSign, Truck } from "lucide-react";
import LoginModal from "@/components/LoginModal";

export default function Checkout() {
  const { carrinho = [], totalCarrinho } = useCarrinho(); // Garantir que carrinho é array
  const freteCtx = useFrete();
  const { usuario } = useAuth();
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [mostrarLoginModal, setMostrarLoginModal] = useState(false);

  useEffect(() => {
    if (!usuario) {
      setMostrarLoginModal(true);
    } else {
      setMostrarLoginModal(false);
    }

    if (carrinho) {
      setCarregando(false);
    }

    const freteLocal = localStorage.getItem("frete");
    if (!freteLocal || parseFloat(freteLocal) === 0) {
      console.warn("Frete não encontrado no localStorage.");
    }
  }, [usuario, carrinho]);

  if (!freteCtx) return null;

  const { frete, nomeFrete } = freteCtx;

  const valorFrete = frete || 0;
  const totalFinal = totalCarrinho + valorFrete;

  const handleAvancar = () => {
    if (!frete || parseFloat(frete) === 0) {
      alert("Por favor, calcule o frete antes de continuar.");
      return;
    }

    router.push("/revisao");
  };

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-gray-400 text-lg">Carregando carrinho...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 py-10">
      {mostrarLoginModal && <LoginModal onClose={() => setMostrarLoginModal(false)} />}

      <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-800 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-1">
            <ShoppingCart className="w-6 h-6 text-purple-400" />
            Finalizar Pedido
          </h1>
          <p className="text-gray-400 text-sm">Revise seus produtos antes de prosseguir.</p>
        </div>

        {carrinho.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">Seu carrinho está vazio.</p>
          </div>
        ) : (
          <>
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

            <div className="border-t border-zinc-700 pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-lg font-semibold">
                  <Truck className="w-5 h-5 text-blue-400" />
                  Frete: {nomeFrete && <span className="text-sm text-gray-400">({nomeFrete})</span>}
                </span>
                <span className="text-lg font-medium text-blue-300">R$ {valorFrete.toFixed(2)}</span>
              </div>

              {valorFrete === 0 && (
                <p className="text-sm text-yellow-400">
                  O frete ainda não foi selecionado. Volte e selecione um método de envio.
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-lg font-semibold">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Total com frete:
                </span>
                <span className="text-2xl font-bold text-green-500">R$ {totalFinal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleAvancar}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  usuario
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                }`}
                disabled={!usuario}
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