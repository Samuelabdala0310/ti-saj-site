"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FreteContext = createContext();

export const FreteProvider = ({ children }) => {
  const [frete, setFreteState] = useState(0);
  const [nomeFrete, setNomeFreteState] = useState("");
  const [cep, setCepState] = useState("");
  const [opcoesFrete, setOpcoesFrete] = useState([]);

  // Carregar do localStorage no início
  useEffect(() => {
    const freteSalvo = localStorage.getItem("frete");
    const nomeFreteSalvo = localStorage.getItem("nomeFrete");
    const cepSalvo = localStorage.getItem("cep");

    if (freteSalvo) setFreteState(Number(freteSalvo));
    if (nomeFreteSalvo) setNomeFreteState(nomeFreteSalvo);
    if (cepSalvo) setCepState(cepSalvo);
  }, []);

  // Salvar sempre que mudar
  useEffect(() => {
    localStorage.setItem("frete", frete.toString());
  }, [frete]);

  useEffect(() => {
    localStorage.setItem("nomeFrete", nomeFrete);
  }, [nomeFrete]);

  useEffect(() => {
    localStorage.setItem("cep", cep);
  }, [cep]);

  // Encapsular os setters para manter o controle
  const setFrete = (valor) => setFreteState(valor);
  const setNomeFrete = (valor) => setNomeFreteState(valor);
  const setCep = (valor) => setCepState(valor);

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