import { useEffect, useState } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import { useRouter } from "next/navigation"; 

export default function CarrinhoModal({ isOpen, onClose }) {
    const { carrinho, removerDoCarrinho, limparCarrinho } = useCarrinho(); // ✅ uso de limparCarrinho no lugar de setCarrinho
    const [clientLoaded, setClientLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setClientLoaded(true);
    }, []);

    if (!clientLoaded) return null;

    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start p-4 z-50">
            <div className="bg-white p-6 rounded-lg w-80 shadow-lg mt-14 mr-4 border border-gray-300">
                <h2 className="text-xl font-bold mb-4 text-black">Seu Carrinho</h2>

                {carrinho.length === 0 ? (
                    <p className="text-gray-500">Seu carrinho está vazio.</p>
                ) : (
                    <ul>
                        {carrinho.map((item) => (
                            <li key={`${item.nome}-${item.tamanho}`} className="border-b py-2 flex justify-between items-center text-black">
                                <span>{item.nome} ({item.tamanho}) - {item.quantidade}x</span>
                                <button 
                                    onClick={() => removerDoCarrinho(item.nome, item.tamanho)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-4">
                    <button 
                        onClick={() => {
                            limparCarrinho(); // ✅ uso correto da função do contexto
                            onClose();
                            router.push("/checkout");
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded w-full"
                    >
                        Finalizar Compra
                    </button>
                </div>

                <button 
                    onClick={onClose}
                    className="mt-4 bg-gray-700 text-white px-4 py-2 rounded w-full"
                >
                    Fechar
                </button>
            </div>
        </div>
    ) : null;
}