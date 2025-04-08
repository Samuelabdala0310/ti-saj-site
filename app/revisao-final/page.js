"use client";
import { useEffect, useState } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import { useRouter } from "next/navigation";

export default function RevisaoFinal() {
    const { carrinho } = useCarrinho();
    const [endereco, setEndereco] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const enderecoSalvo = localStorage.getItem("endereco");
        if (enderecoSalvo) {
            setEndereco(JSON.parse(enderecoSalvo));
        }
    }, []);

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Revisão Final</h1>

            {carrinho.length === 0 ? (
                <p className="text-gray-500">Seu carrinho está vazio.</p>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-2">Itens do Pedido:</h2>
                    <ul>
                        {carrinho.map((item, index) => (
                            <li key={index} className="border-b py-4">
                                <span>{item.nome} ({item.tamanho}) - {item.quantidade}x</span>
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-xl font-bold mt-4 mb-2">Endereço de Entrega:</h2>
                    {endereco ? (
                        <p>
                            {endereco.rua}, Nº {endereco.numero}, {endereco.bairro} <br />
                            {endereco.cidade} - {endereco.estado} <br />
                            CEP: {endereco.cep}
                        </p>
                    ) : (
                        <p className="text-red-500">Endereço não informado.</p>
                    )}

                    {/* Botão atualizado para ir para a página de pagamento */}
                    <div className="mt-6 flex justify-end">
                        <button 
                            onClick={() => router.push("/pagamento")}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-600"
                        >
                            Confirmar Pedido
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}