import { useEffect, useState } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import { useRouter } from "next/navigation"; 

export default function CarrinhoModal({ isOpen, onClose }) {
    const { 
        carrinho, 
        removerDoCarrinho, 
        limparCarrinho, 
        totalCarrinho
    } = useCarrinho();

    const [clientLoaded, setClientLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setClientLoaded(true);
    }, []);

    if (!clientLoaded) return null;

    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start p-4 z-50">
            <div className="bg-white p-6 rounded-lg w-80 shadow-lg mt-14 mr-4 border border-gray-300 relative">
                <h2 className="text-xl font-bold mb-4 text-black">Seu Carrinho</h2>

                {carrinho.length === 0 ? (
                    <p className="text-gray-500">Seu carrinho está vazio.</p>
                ) : (
                    <>
                        <ul>
                            {carrinho.map((item) => (
                                <li 
                                    key={`${item.nome}-${item.tamanho}`} 
                                    className="border-b py-2 flex justify-between items-center text-black"
                                >
                                    <div>
                                        <p className="text-sm font-medium">{item.nome}</p>
                                        <p className="text-xs text-gray-500">
                                            Tamanho: {item.tamanho} — {item.quantidade}x
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => removerDoCarrinho(item.nome, item.tamanho)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Remover
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 space-y-1 text-sm text-black">
                            <div className="flex justify-between font-bold text-base">
                                <span>Subtotal:</span>
                                <span>R$ {totalCarrinho.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button 
                                onClick={() => {
                                    onClose();
                                    router.push("/checkout");
                                }}
                                className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    </>
                )}

                {/* Botão de fechar - sempre visível */}
                <button 
                    onClick={onClose}
                    className="mt-4 bg-gray-700 text-white px-4 py-2 rounded w-full hover:bg-gray-800"
                >
                    Fechar
                </button>
            </div>
        </div>
    ) : null;
}
