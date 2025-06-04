"use client";

import { useCarrinho } from "@/context/CarrinhoContext";
import { useFrete } from "@/context/FreteContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, DollarSign, Truck, Search } from "lucide-react";

export default function Checkout() {
  const { carrinho, totalCarrinho } = useCarrinho();
  const { frete, nomeFrete, setFrete, setNomeFrete } = useFrete();
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);

  const [cep, setCep] = useState("");
  const [carregandoFrete, setCarregandoFrete] = useState(false);
  const [opcoesFrete, setOpcoesFrete] = useState([]);

  // Calcula total incluindo frete
  const totalComFrete = totalCarrinho + (frete || 0);

  useEffect(() => {
    if (carrinho) {
      setCarregando(false);
    }
  }, [carrinho]);

  const calcularFrete = async () => {
    if (!cep || cep.length !== 8) {
      alert("Digite um CEP válido (somente números, 8 dígitos).");
      return;
    }

    setCarregandoFrete(true);
    setOpcoesFrete([]);
    setFrete(0);
    setNomeFrete("");

    try {
      const response = await fetch("/api/melhorenvio/cotar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cep }),
      });

      if (!response.ok) {
        throw new Error("Erro na cotação de frete.");
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setOpcoesFrete(data);
      } else {
        setOpcoesFrete([]);
        alert("Nenhuma opção de frete disponível para esse CEP.");
      }
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
      alert("Erro ao calcular frete. Verifique o CEP e tente novamente.");
    } finally {
      setCarregandoFrete(false);
    }
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
      <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-800 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-1">
            <ShoppingCart className="w-6 h-6 text-purple-400" />
            Finalizar Pedido
          </h1>
          <p className="text-gray-400 text-sm">
            Revise seus produtos e calcule o frete antes de prosseguir.
          </p>
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

            {/* Seção de Frete */}
            <div className="bg-zinc-800 rounded-xl p-4 space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-400" />
                Calcular Frete
              </h2>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  maxLength={8}
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={calcularFrete}
                  disabled={carregandoFrete}
                  className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                  <Search className="w-4 h-4" />
                  {carregandoFrete ? "Calculando..." : "Calcular"}
                </button>
              </div>

              {opcoesFrete.length > 0 && (
                <div className="space-y-2">
                  {opcoesFrete.map((opcao, index) => {
                    // Ajuste para garantir que preco seja número válido
                    const precoFormatado = opcao.preco.replace(",", ".");
                    const precoLimpo = precoFormatado.replace(/[^\d.]/g, "");
                    const precoNumero = parseFloat(precoLimpo);

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (!isNaN(precoNumero) && precoNumero > 0) {
                            setFrete(precoNumero);
                            setNomeFrete(opcao.nome || "");
                          } else {
                            setFrete(0);
                            setNomeFrete("");
                          }
                        }}
                        className={`flex justify-between items-center px-4 py-2 rounded-xl border cursor-pointer ${
                          nomeFrete === opcao.nome
                            ? "border-blue-400 bg-zinc-700"
                            : "border-zinc-700 hover:bg-zinc-800"
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{opcao.nome}</p>
                          <p className="text-sm text-gray-400">{opcao.prazo} dias úteis</p>
                        </div>
                        <span className="font-bold text-blue-400">
                          R$ {isNaN(precoNumero) ? "0.00" : precoNumero.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Totais */}
            <div className="border-t border-zinc-700 pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-lg font-semibold">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Produtos:
                </span>
                <span className="text-lg font-bold text-green-500">
                  R$ {totalCarrinho.toFixed(2)}
                </span>
              </div>

              {frete > 0 ? (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-lg font-semibold">
                    <Truck className="w-5 h-5 text-blue-400" />
                    Frete: {nomeFrete}
                  </span>
                  <span className="text-lg font-bold text-blue-400">
                    R$ {frete.toFixed(2)}
                  </span>
                </div>
              ) : (
                <div className="text-sm text-gray-400 italic">
                  Selecione uma opção de frete para o cálculo do total.
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-zinc-700">
                <span className="flex items-center gap-2 text-xl font-semibold">Total:</span>
                <span className="text-2xl font-bold text-green-500">
                  R$ {totalComFrete.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => router.push("/revisao")}
                disabled={frete <= 0} // bloqueia se frete não selecionado
                className={`${
                  frete > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-600 cursor-not-allowed"
                } text-white px-6 py-3 rounded-full font-semibold transition`}
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