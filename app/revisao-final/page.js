"use client";

import { useEffect, useState } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import { useFrete } from "@/context/FreteContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { MapPin, ShoppingBag, DollarSign, Truck } from "lucide-react";

export default function RevisaoFinal() {
    const { carrinho, limparCarrinho } = useCarrinho();
    const { frete, nomeFrete, calcularFrete, cep, setCep } = useFrete();
    const { usuario } = useAuth();
    const [endereco, setEndereco] = useState(null);
    const [valorProdutos, setValorProdutos] = useState(0);
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const enderecoSalvo = localStorage.getItem("endereco");
        if (enderecoSalvo) {
            const enderecoObj = JSON.parse(enderecoSalvo);
            setEndereco(enderecoObj);
            if (enderecoObj.cep) {
                setCep(enderecoObj.cep);
                calcularFrete(enderecoObj.cep);
            }
        }

        const total = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0
        );
        setValorProdutos(total);
    }, [carrinho, calcularFrete, setCep]);

    const valorTotalGeral = valorProdutos + (frete || 0);
    console.log("Usuário atual:", usuario);

    const handleConfirmarPedido = async () => {
        if (!usuario || !usuario._id) {
            alert("Você precisa estar logado para finalizar o pedido.");
            return;
        }

        if (!endereco) {
            alert("Endereço não encontrado.");
            return;
        }

        if (!frete || frete === 0) {
            alert("O frete precisa ser calculado antes de confirmar o pedido.");
            return;
        }

        setCarregando(true);

        const pedido = {
            usuarioId: usuario._id,
            itens: carrinho.map((item) => ({
                produtoId: item.id,
                nome: item.nome,
                tamanho: item.tamanho,
                quantidade: item.quantidade,
                preco: item.preco,
            })),
            valorTotal: valorTotalGeral,
            endereco,
            status: "aguardando_pagamento",
            metodoPagamento: "pix", // ou "stripe"
        };

        try {
            const res = await fetch("/api/pedido", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pedido),
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/pagamento?id=${data._id}`);
            } else {
                const erro = await res.json();
                console.error("Erro no servidor:", erro);
                alert("Erro ao criar o pedido. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            alert("Erro ao criar o pedido.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white flex items-center justify-center px-4 py-10">
            <div className="backdrop-blur-lg bg-white/5 border border-zinc-700 p-10 rounded-3xl shadow-2xl w-full max-w-3xl">
                <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">
                    🧾 Revisão Final
                </h1>

                {carrinho.length === 0 ? (
                    <p className="text-gray-400 text-center text-lg">
                        Seu carrinho está vazio.
                    </p>
                ) : (
                    <>
                        {/* Itens do Pedido */}
                        <div className="mb-10">
                            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
                                <ShoppingBag className="text-green-400" />
                                Itens do Pedido
                            </h2>
                            <ul className="space-y-3">
                                {carrinho.map((item, index) => (
                                    <li
                                        key={index}
                                        className="bg-zinc-700/50 p-4 rounded-xl border border-zinc-600 flex justify-between items-center"
                                    >
                                        <span className="font-medium text-lg">
                                            {item.nome} ({item.tamanho})
                                        </span>
                                        <span className="text-green-400 font-semibold">
                                            {item.quantidade}x
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Endereço */}
                        <div className="mb-10">
                            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
                                <MapPin className="text-blue-400" />
                                Endereço de Entrega
                            </h2>
                            {endereco ? (
                                <div className="bg-zinc-700/50 p-4 rounded-xl border border-zinc-600 leading-relaxed space-y-1">
                                    <p>
                                        {endereco.rua}, Nº {endereco.numero},{" "}
                                        {endereco.bairro}
                                    </p>
                                    <p>
                                        {endereco.cidade} - {endereco.estado}
                                    </p>
                                    <p>CEP: {endereco.cep}</p>
                                </div>
                            ) : (
                                <p className="text-red-400">
                                    Endereço não informado.
                                </p>
                            )}
                        </div>

                        {/* Resumo dos Valores */}
                        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4 mb-8">
                            <h2 className="flex items-center gap-2 text-2xl font-semibold mb-2">
                                <DollarSign className="text-yellow-400" />
                                Resumo do Pedido
                            </h2>

                            <div className="flex justify-between text-gray-300">
                                <span>Valor dos produtos:</span>
                                <span className="text-white font-semibold">
                                    R$ {valorProdutos.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between text-gray-300">
                                <span className="flex items-center gap-1">
                                    <Truck className="w-4 h-4 text-blue-400" />
                                    {nomeFrete ? nomeFrete : "Frete"}:
                                </span>
                                <span className="text-white font-semibold">
                                    {frete > 0
                                        ? `R$ ${frete.toFixed(2)}`
                                        : "Grátis"}
                                </span>
                            </div>

                            <div className="border-t border-zinc-600 pt-3 flex justify-between">
                                <span className="text-lg font-semibold">
                                    Total Geral:
                                </span>
                                <span className="text-2xl text-green-500 font-bold">
                                    R$ {valorTotalGeral.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Botão Confirmar */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleConfirmarPedido}
                                disabled={carregando}
                                className={`${
                                    carregando
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-green-500 hover:bg-green-600"
                                } text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl`}
                            >
                                {carregando
                                    ? "Processando..."
                                    : "Confirmar Pedido"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}