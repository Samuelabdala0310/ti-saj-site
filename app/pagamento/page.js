"use client";
import { useState, useEffect } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";

export default function Pagamento() {
    const { carrinho, limparCarrinho } = useCarrinho();
    const [metodoPagamento, setMetodoPagamento] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [qrCodePix, setQrCodePix] = useState(false);
    const [endereco, setEndereco] = useState(null);

    useEffect(() => {
        const enderecoSalvo = localStorage.getItem("endereco");
        if (enderecoSalvo) {
            setEndereco(JSON.parse(enderecoSalvo));
        }
    }, []);

    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    const finalizarPagamento = async () => {
        if (!metodoPagamento) {
            setMensagem("⚠️ Selecione um método de pagamento!");
            return;
        }

        setMensagem("✅ Redirecionando para o pagamento...");

        const produtosCarrinho = carrinho.map(item => ({
            nome: item.nome,
            quantidade: item.quantidade,
            preco: item.preco,
            tamanho: item.tamanho,
        }));

        try {
            const res = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: produtosCarrinho,
                    total,
                    metodoPagamento,
                }),
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                setMensagem("⚠️ Algo deu errado, tente novamente.");
            }
        } catch (error) {
            console.error("❌ Erro ao processar pagamento:", error);
            setMensagem("⚠️ Não foi possível processar o pagamento.");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", color: "white" }}>
            <h1>Pagamento</h1>

            <h2>Resumo do Pedido</h2>
            {carrinho.map((item, index) => (
                <p key={index}>
                    {item.nome} ({item.tamanho}) - Quantidade: {item.quantidade} - R$ {item.preco.toFixed(2)}
                </p>
            ))}
            <h3>Total: R$ {total.toFixed(2)}</h3>

            <h2>Endereço de Entrega</h2>
            {endereco ? (
                <p>
                    {endereco.rua}, Nº {endereco.numero}, {endereco.bairro} <br />
                    {endereco.cidade} - {endereco.estado} <br />
                    CEP: {endereco.cep}
                </p>
            ) : (
                <p style={{ color: "red" }}>Endereço não informado.</p>
            )}

            <h2>Escolha o Método de Pagamento</h2>
            <label>
                <input type="radio" name="pagamento" value="pix" onChange={() => { setMetodoPagamento("pix"); setQrCodePix(true); }} /> Pix
            </label>
            <label>
                <input type="radio" name="pagamento" value="boleto" onChange={() => { setMetodoPagamento("boleto"); setQrCodePix(false); }} /> Boleto
            </label>
            <label>
                <input type="radio" name="pagamento" value="cartao" onChange={() => { setMetodoPagamento("cartao"); setQrCodePix(false); }} /> Cartão de Crédito
            </label>

            {qrCodePix && (
                <div>
                    <h3>Escaneie o QR Code para pagamento:</h3>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Pix-QRCode.png" alt="QR Code Pix" width="150" />
                </div>
            )}

            {mensagem && <p>{mensagem}</p>}

            <button
                onClick={finalizarPagamento}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginTop: "10px",
                }}
            >
                Finalizar Pagamento
            </button>
        </div>
    );
}