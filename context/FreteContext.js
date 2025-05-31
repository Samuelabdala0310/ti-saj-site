"use client";
import { createContext, useContext, useState } from "react";

const FreteContext = createContext();

export const FreteProvider = ({ children }) => {
    const [frete, setFrete] = useState(0);
    const [nomeFrete, setNomeFrete] = useState("");
    const [cep, setCep] = useState(""); // <-- ADICIONA ISSO
    const [opcoesFrete, setOpcoesFrete] = useState([]); // Se quiser guardar as opções

    const calcularFrete = async (cepDestino) => {
        try {
            const response = await fetch("/api/melhorenvio/cotar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cep: cepDestino }),
            });

            if (!response.ok) {
                throw new Error("Erro na cotação de frete.");
            }

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                setOpcoesFrete(data);
            } else {
                setOpcoesFrete([]);
            }
        } catch (error) {
            console.error("Erro ao calcular frete:", error);
        }
    };

    return (
        <FreteContext.Provider
            value={{
                frete,
                setFrete,
                nomeFrete,
                setNomeFrete,
                calcularFrete,
                cep,         // <-- Exporta
                setCep,      // <-- Exporta
                opcoesFrete,
                setOpcoesFrete,
            }}
        >
            {children}
        </FreteContext.Provider>
    );
};

export const useFrete = () => useContext(FreteContext);