"use client";
import { useCarrinho } from "@/context/CarrinhoContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Checkout() {
    const { carrinho } = useCarrinho();
    const router = useRouter();
    const [valorTotal, setValorTotal] = useState(0);

    useEffect(() => {
        // Calcula o valor total do carrinho
        const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        setValorTotal(total);
    }, [carrinho]);

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <p className="text-gray-600 mb-4">Revise os itens do seu carrinho antes de continuar.</p>

            {carrinho.length === 0 ? (
                <p className="text-gray-500">Seu carrinho está vazio.</p>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-2">Itens do Pedido:</h2>
                    <ul className="mb-4">
                        {carrinho.map((item, index) => (
                            <li key={index} className="border-b py-2 flex justify-between">
                                <span>{item.nome} ({item.tamanho}) - {item.quantidade}x</span>
                                <span className="text-gray-700">R$ {item.preco.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-lg font-bold mt-4">Total: <span className="text-green-600">R$ {valorTotal.toFixed(2)}</span></h2>

                    {/* Botão para continuar para a página de revisão do endereço */}
                    <div className="mt-6 flex justify-end">
                        <button 
                            onClick={() => router.push("/revisao")}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-600"
                        >
                            Continuar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}