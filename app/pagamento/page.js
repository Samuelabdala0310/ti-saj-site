"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCarrinho } from "@/context/CarrinhoContext";

export default function Pagamento() {
    const { carrinho, limparCarrinho } = useCarrinho();
    const router = useRouter();
    const [metodoPagamento, setMetodoPagamento] = useState("");
    const [dadosCartao, setDadosCartao] = useState({ numero: "", validade: "", cvv: "" });
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

    const finalizarPagamento = () => {
        if (!metodoPagamento) {
            setMensagem("⚠️ Selecione um método de pagamento!");
            return;
        }

        if (metodoPagamento === "cartao") {
            if (!dadosCartao.numero || !dadosCartao.validade || !dadosCartao.cvv) {
                setMensagem("⚠️ Preencha todos os dados do cartão!");
                return;
            }
            if (dadosCartao.numero.length < 16 || isNaN(dadosCartao.numero)) {
                setMensagem("⚠️ Número do cartão inválido!");
                return;
            }
            if (dadosCartao.validade.length < 5 || !/\d{2}\/\d{2}/.test(dadosCartao.validade)) {
                setMensagem("⚠️ Validade inválida! Use o formato MM/AA.");
                return;
            }
            if (dadosCartao.cvv.length < 3 || isNaN(dadosCartao.cvv)) {
                setMensagem("⚠️ CVV inválido!");
                return;
            }
        }

        setMensagem("✅ Pagamento realizado com sucesso!");
        setTimeout(() => {
            limparCarrinho();
            router.push("/confirmacao"); // Redireciona para a página de confirmação
        }, 2000);
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

            {metodoPagamento === "cartao" && (
                <div>
                    <h3>Dados do Cartão</h3>
                    <input type="text" placeholder="Número do Cartão (16 dígitos)" maxLength="16" onChange={(e) => setDadosCartao({ ...dadosCartao, numero: e.target.value })} />
                    <input type="text" placeholder="Validade (MM/AA)" maxLength="5" onChange={(e) => setDadosCartao({ ...dadosCartao, validade: e.target.value })} />
                    <input type="text" placeholder="CVV (3 dígitos)" maxLength="3" onChange={(e) => setDadosCartao({ ...dadosCartao, cvv: e.target.value })} />
                </div>
            )}

            {mensagem && <p>{mensagem}</p>}

            <button 
                onClick={finalizarPagamento} 
                style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}>
                Finalizar Pagamento
            </button>
        </div>
    );
}