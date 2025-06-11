"use client";

import { useEffect, useState } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import { useFrete } from "@/context/FreteContext";
import { useRouter } from "next/navigation";
import { DollarSign, MapPin, Truck, CreditCard, QrCode, Barcode } from "lucide-react";

export default function Pagamento() {
    const { carrinho } = useCarrinho();
    const { frete, nomeFrete } = useFrete();

    const [endereco, setEndereco] = useState(null);
    const [valorProdutos, setValorProdutos] = useState(0);
    const [metodoPagamento, setMetodoPagamento] = useState("");
    const [freteLocal, setFreteLocal] = useState(null);
    const [nomeFreteLocal, setNomeFreteLocal] = useState("");
    const [freteCarregado, setFreteCarregado] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const enderecoSalvo = localStorage.getItem("endereco");
        if (enderecoSalvo) {
            setEndereco(JSON.parse(enderecoSalvo));
        }

        const total = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0
        );
        setValorProdutos(total);

        const freteSalvo = localStorage.getItem("frete");
        const nomeFreteSalvo = localStorage.getItem("nomeFrete");

        if (frete === null && freteSalvo) {
            setFreteLocal(parseFloat(freteSalvo));
            setNomeFreteLocal(nomeFreteSalvo || "");
        }

        setFreteCarregado(true);
    }, [carrinho, frete]);

    useEffect(() => {
        // Redireciona caso o frete esteja ausente depois do carregamento
        if (freteCarregado && frete === null && !localStorage.getItem("frete")) {
            alert("Frete não calculado. Você será redirecionado.");
            router.push("/checkout");
        }
    }, [freteCarregado, frete, router]);

    const freteFinal = frete ?? freteLocal;
    const nomeFreteFinal = nomeFrete || nomeFreteLocal;
    const valorTotalGeral = valorProdutos + (freteFinal ?? 0);

    const handlePagamento = async () => {
        if (!metodoPagamento) {
            alert("Selecione um método de pagamento.");
            return;
        }

        if (freteFinal == null) {
            alert("Frete não está calculado. Volte para calcular o frete.");
            return;
        }

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: carrinho,
                    metodoPagamento,
                    frete: freteFinal,
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar checkout");
            }

            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            console.error("Erro no checkout:", error);
            alert("Erro ao processar o pagamento.");
        }
    };

    const freteIndefinido = freteFinal == null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white flex items-center justify-center px-4 py-10">
            <div className="backdrop-blur-lg bg-white/5 border border-zinc-700 p-10 rounded-3xl shadow-2xl w-full max-w-3xl">
                <h1 className="text-4xl font-extrabold text-center mb-10">
                    💳 Pagamento
                </h1>

                <div className="space-y-6 mb-10">
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-3">
                            <MapPin className="text-blue-400" />
                            Endereço de Entrega
                        </h2>
                        {endereco ? (
                            <div className="bg-zinc-700/50 p-4 rounded-xl border border-zinc-600 leading-relaxed">
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
                    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4">
                        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-2">
                            <DollarSign className="text-yellow-400" />
                            Resumo do Pedido
                        </h2>

                        <div className="flex justify-between">
                            <span className="text-gray-300">
                                Valor dos produtos:
                            </span>
                            <span className="text-white font-semibold">
                                R$ {valorProdutos.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-300 flex items-center gap-1">
                                <Truck className="w-4 h-4 text-blue-400" />
                                {nomeFreteFinal || "Frete"}:
                            </span>
                            <span className="text-white font-semibold">
                                {freteFinal != null
                                    ? `R$ ${freteFinal.toFixed(2)}`
                                    : (
                                        <span className="text-red-400">
                                            Não calculado
                                        </span>
                                    )}
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
                </div>

                {/* Métodos de Pagamento */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">
                        Selecione o Método de Pagamento
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                        <button
                            onClick={() => setMetodoPagamento("pix")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl border ${
                                metodoPagamento === "pix"
                                    ? "border-green-500 bg-green-600"
                                    : "border-zinc-600 bg-zinc-700/50"
                            }`}
                        >
                            <QrCode className="w-5 h-5" />
                            PIX
                        </button>

                        <button
                            onClick={() => setMetodoPagamento("cartao")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl border ${
                                metodoPagamento === "cartao"
                                    ? "border-green-500 bg-green-600"
                                    : "border-zinc-600 bg-zinc-700/50"
                            }`}
                        >
                            <CreditCard className="w-5 h-5" />
                            Cartão
                        </button>

                        <button
                            onClick={() => setMetodoPagamento("boleto")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl border ${
                                metodoPagamento === "boleto"
                                    ? "border-green-500 bg-green-600"
                                    : "border-zinc-600 bg-zinc-700/50"
                            }`}
                        >
                            <Barcode className="w-5 h-5" />
                            Boleto
                        </button>
                    </div>
                </div>

                {/* Botão Finalizar */}
                <div className="flex justify-end">
                    <button
                        onClick={handlePagamento}
                        disabled={freteIndefinido}
                        className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl ${
                            freteIndefinido
                                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                    >
                        {freteIndefinido
                            ? "Calcule o Frete para Finalizar"
                            : "Finalizar Pedido"}
                    </button>
                </div>
            </div>
        </div>
    );
}