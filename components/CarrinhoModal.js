import { useEffect, useState } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import { useRouter } from "next/navigation";

export default function CarrinhoModal({ isOpen, onClose }) {
    const { carrinho, removerDoCarrinho } = useCarrinho();
    const [clientLoaded, setClientLoaded] = useState(false);
    const router = useRouter();

    const frete = 15; // 💰 valor fixo do frete (você pode mudar aqui)

    useEffect(() => {
        setClientLoaded(true);
    }, []);

    if (!clientLoaded) return null;

    const calcularSubtotal = () => {
        return carrinho.reduce((total, item) => {
            return total + item.preco * item.quantidade;
        }, 0);
    };

    const subtotal = calcularSubtotal();
    const totalGeral = subtotal + frete;

    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start p-4 z-50">
            <div className="bg-white p-6 rounded-lg w-80 shadow-lg mt-14 mr-4 border border-gray-300">
                <h2 className="text-xl font-bold mb-4 text-black">Seu Carrinho</h2>

                {carrinho.length === 0 ? (
                    <p className="text-gray-500">Seu carrinho está vazio.</p>
                ) : (
                    <>
                        <ul className="mb-4">
                            {carrinho.map((item) => (
                                <li
                                    key={`${item.nome}-${item.tamanho}`}
                                    className="border-b py-2"
                                >
                                    <div className="flex justify-between text-black">
                                        <div>
                                            <p className="font-medium">
                                                {item.nome} ({item.tamanho})
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {item.quantidade}x R${item.preco.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="font-semibold">
                                                R${(item.preco * item.quantidade).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    removerDoCarrinho(item.nome, item.tamanho)
                                                }
                                                className="bg-red-500 text-white px-2 py-1 rounded text-sm mt-1"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t pt-2 text-black text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>R${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Frete:</span>
                                <span>R${frete.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base mt-2">
                                <span>Total:</span>
                                <span>R${totalGeral.toFixed(2)}</span>
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