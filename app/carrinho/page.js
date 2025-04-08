"use client";
import { useEffect, useState } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import Link from "next/link";

export default function Carrinho() {
    const { carrinho, removerDoCarrinho } = useCarrinho();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [carrinho]);

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
                            <li key={index} className="border-b py-4 flex justify-between items-center">
                                <span>{item.nome} - {item.tamanho} - {item.quantidade}x</span>
                                <button 
                                    onClick={() => removerDoCarrinho(item.nome, item.tamanho)}
                                    className="bg-red-500 text-white px-3 py-2 rounded-lg"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
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