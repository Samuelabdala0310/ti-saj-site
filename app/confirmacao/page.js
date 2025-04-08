"use client";
import { useRouter } from "next/navigation";

export default function Confirmacao() {
    const router = useRouter();

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", color: "white" }}>
            <h1>Compra Confirmada ✅</h1>
            <p>Obrigado por sua compra! Seu pedido foi processado com sucesso.</p>
            <button 
                onClick={() => router.push("/")} 
                style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}>
                Voltar para a Home
            </button>
        </div>
    );
}