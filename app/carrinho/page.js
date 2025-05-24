"use client";
import { useEffect, useState } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import Link from "next/link";

export default function Carrinho() {
    const { carrinho, removerDoCarrinho, freteSelecionado } = useCarrinho();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [carrinho]);

    // 🧠 Calcular subtotal dos produtos
    const subtotal = carrinho.reduce((total, item) => {
        return total + (item.preco * item.quantidade);
    }, 0);

    // 🚚 Pega o valor do frete (se tiver selecionado)
    const valorFrete = freteSelecionado ? freteSelecionado.valor : 0;

    // 💰 Total geral
    const total = subtotal + valorFrete;

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Seu Carrinho</h1>

            {isLoading ? (
                <p className="text-gray-500">Carregando carrinho...</p>
            ) : carrinho.length === 0 ? (
                <p className="text-gray-500">Seu carrinho está vazio.</p>
            ) : (
                <>
                    <ul>
                        {carrinho.map((item, index) => (
                            <li
                                key={index}
                                className="border-b py-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium">
                                        {item.nome} - {item.tamanho}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Quantidade: {item.quantidade}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Preço: R$ {Number(item.preco).toFixed(2)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removerDoCarrinho(item.nome, item.tamanho)}
                                    className="bg-red-500 text-white px-3 py-2 rounded-lg"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* 🧾 Resumo dos valores */}
                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal:</span>
                            <span>R$ {subtotal.toFixed(2)}</span>
                        </div>

                        {freteSelecionado && (
                            <div className="flex justify-between mb-2">
                                <span>Frete ({freteSelecionado.nome}):</span>
                                <span>R$ {Number(freteSelecionado.valor).toFixed(2)}</span>
                            </div>
                        )}

                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Link href="/checkout">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-600">
                                Finalizar Compra
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}