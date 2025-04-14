"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Confirmacao() {
    const router = useRouter();
    const [endereco, setEndereco] = useState(null);

    useEffect(() => {
        const enderecoSalvo = localStorage.getItem("endereco");
        if (enderecoSalvo) {
            setEndereco(JSON.parse(enderecoSalvo));
        }
    }, []);

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", color: "white" }}>
            <h1 style={{ fontSize: "28px" }}>✅ Compra Confirmada</h1>
            <p style={{ fontSize: "18px" }}>
                Obrigado por sua compra! Seu pedido foi processado com sucesso.
            </p>

            {endereco && (
                <div style={{ marginTop: "20px" }}>
                    <h3>📦 Entrega para:</h3>
                    <p>
                        {endereco.rua}, Nº {endereco.numero}, {endereco.bairro}<br />
                        {endereco.cidade} - {endereco.estado}<br />
                        CEP: {endereco.cep}
                    </p>
                </div>
            )}

            <button 
                onClick={() => router.push("/")} 
                style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer", fontSize: "16px", marginTop: "30px" }}>
                Voltar para a Home
            </button>
        </div>
    );
}