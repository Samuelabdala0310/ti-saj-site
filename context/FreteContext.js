"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FreteContext = createContext();

export const FreteProvider = ({ children }) => {
  const [frete, setFreteState] = useState(null);
  const [nomeFrete, setNomeFreteState] = useState("");
  const [cep, setCepState] = useState("");
  const [opcoesFrete, setOpcoesFrete] = useState([]);
  const [carregado, setCarregado] = useState(false); // controle de carregamento

  // Carregar do localStorage no início
  useEffect(() => {
    const freteSalvo = localStorage.getItem("frete");
    const nomeFreteSalvo = localStorage.getItem("nomeFrete");
    const cepSalvo = localStorage.getItem("cep");

    if (freteSalvo !== null) setFreteState(Number(freteSalvo));
    if (nomeFreteSalvo) setNomeFreteState(nomeFreteSalvo);
    if (cepSalvo) setCepState(cepSalvo);

    setCarregado(true); // agora está pronto para uso
  }, []);

  // Salvar sempre que mudar
  useEffect(() => {
    if (frete !== null && nomeFrete) {
      localStorage.setItem(
        "frete",
        JSON.stringify({ valor: frete, nome: nomeFrete })
      );
    }
  }, [frete, nomeFrete]);

  useEffect(() => {
    localStorage.setItem("cep", cep);
  }, [cep]);

  // Encapsular os setters
  const setFrete = (valor) => setFreteState(valor);
  const setNomeFrete = (valor) => setNomeFreteState(valor);
  const setCep = (valor) => setCepState(valor);

  // Cálculo de frete (usando sua API)
  const calcularFrete = async (cepDestino) => {
    try {
      const response = await fetch("/api/melhorenvio/cotar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cep: cepDestino }),
      });

      if (!response.ok) throw new Error("Erro na cotação de frete.");

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

  // Evita expor o contexto antes do carregamento
  if (!carregado) return null;

  return (
    <FreteContext.Provider
      value={{
        frete,
        setFrete,
        nomeFrete,
        setNomeFrete,
        calcularFrete,
        cep,
        setCep,
        opcoesFrete,
        setOpcoesFrete,
      }}
    >
      {children}
    </FreteContext.Provider>
  );
};

export const useFrete = () => useContext(FreteContext);