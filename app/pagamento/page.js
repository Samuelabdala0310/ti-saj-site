"use client";
import { useState, useEffect } from "react";
import { useCarrinho } from "@/context/CarrinhoContext";
import { FreteContext } from "@/context/FreteContext";

export default function Pagamento() {
    const { carrinho, limparCarrinho } = useCarrinho();
    const [metodoPagamento, setMetodoPagamento] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [qrCodePix, setQrCodePix] = useState(false);
    const [endereco, setEndereco] = useState(null);
    const [frete, setFrete] = useState(0);

    useEffect(() => {
        const enderecoSalvo = localStorage.getItem("endereco");
        if (enderecoSalvo) {
            setEndereco(JSON.parse(enderecoSalvo));
        }

        const freteSalvo = localStorage.getItem("frete");
        if (freteSalvo) {
            setFrete(parseFloat(freteSalvo));
        }
    }, []);

    const totalProdutos = carrinho.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
    );
    const total = totalProdutos + frete;

    const finalizarPagamento = async () => {
        if (!metodoPagamento) {
            setMensagem("⚠️ Selecione um método de pagamento!");
            return;
        }

        setMensagem("✅ Redirecionando para o pagamento...");

        const produtosCarrinho = carrinho.map((item) => ({
            nome: item.nome,
            quantidade: item.quantidade,
            preco: item.preco,
            tamanho: item.tamanho,
        }));

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: produtosCarrinho,
                    metodoPagamento,
                    frete,
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
        <div style={{
            padding: "30px 20px",
            maxWidth: "600px",
            margin: "auto",
            fontFamily: "Arial, sans-serif",
            color: "#f1f1f1",
            backgroundColor: "#121212",
            borderRadius: "12px",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.05)"
        }}>
            <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>🧾 Pagamento</h1>

            <section style={{ marginBottom: "25px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Resumo do Pedido</h2>
                {carrinho.map((item, index) => (
                    <p key={index} style={{ margin: "5px 0" }}>
                        {item.nome} ({item.tamanho}) - Quantidade: {item.quantidade} - <strong>R$ {item.preco.toFixed(2)}</strong>
                    </p>
                ))}
                <p style={{ marginTop: "10px" }}>
                    Frete: <strong>R$ {frete.toFixed(2)}</strong>
                </p>
                <h3 style={{ marginTop: "15px", fontSize: "18px", color: "#4caf50" }}>
                    Total: R$ {total.toFixed(2)}
                </h3>
            </section>

            <section style={{ marginBottom: "25px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>📦 Endereço de Entrega</h2>
                {endereco ? (
                    <div style={{ lineHeight: "1.6" }}>
                        {endereco.rua}, Nº {endereco.numero}, {endereco.bairro} <br />
                        {endereco.cidade} - {endereco.estado} <br />
                        CEP: {endereco.cep}
                    </div>
                ) : (
                    <p style={{ color: "red" }}>Endereço não informado.</p>
                )}
            </section>

            <section style={{ marginBottom: "25px" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>💳 Escolha o Método de Pagamento</h2>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    {["pix", "boleto", "cartao"].map((metodo) => (
                        <label key={metodo} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                            <input
                                type="radio"
                                name="pagamento"
                                value={metodo}
                                checked={metodoPagamento === metodo}
                                onChange={() => {
                                    setMetodoPagamento(metodo);
                                    setQrCodePix(metodo === "pix");
                                }}
                            />
                            {metodo === "pix" && "Pix"}
                            {metodo === "boleto" && "Boleto"}
                            {metodo === "cartao" && "Cartão de Crédito"}
                        </label>
                    ))}
                </div>
            </section>

            {qrCodePix && (
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h3>Escaneie o QR Code para pagamento:</h3>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Pix-QRCode.png"
                        alt="QR Code Pix"
                        width="160"
                        style={{ marginTop: "10px" }}
                    />
                </div>
            )}

            {mensagem && (
                <p style={{
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#333",
                    borderRadius: "6px",
                    color: mensagem.includes("⚠️") ? "#ff9800" : "#4caf50"
                }}>
                    {mensagem}
                </p>
            )}

            <button
                onClick={finalizarPagamento}
                style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#4caf50",
                    color: "white",
                    fontSize: "18px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "0.3s"
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = "#45a049"}
                onMouseOut={e => e.currentTarget.style.backgroundColor = "#4caf50"}
            >
                Finalizar Pagamento
            </button>
        </div>
    );
}