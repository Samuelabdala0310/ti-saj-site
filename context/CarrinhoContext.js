"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]);
    const [freteSelecionado, setFreteSelecionado] = useState(null);
    const [carrinhoCarregado, setCarrinhoCarregado] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const carrinhoSalvo = localStorage.getItem("carrinho");
            const freteSalvo = localStorage.getItem("frete");

            if (carrinhoSalvo) {
                setCarrinho(JSON.parse(carrinhoSalvo));
            }
            if (freteSalvo) {
                setFreteSelecionado(JSON.parse(freteSalvo));
            }

            setCarrinhoCarregado(true);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && carrinhoCarregado) {
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            localStorage.setItem("frete", JSON.stringify(freteSelecionado));
        }
    }, [carrinho, freteSelecionado, carrinhoCarregado]);

    function adicionarAoCarrinho(produto) {
        setCarrinho((prevCarrinho) => {
            const produtoExistente = prevCarrinho.find(
                (item) => item.nome === produto.nome && item.tamanho === produto.tamanho
            );

            let novoCarrinho;

            if (produtoExistente) {
                novoCarrinho = prevCarrinho.map((item) =>
                    item.nome === produto.nome && item.tamanho === produto.tamanho
                        ? { ...item, quantidade: item.quantidade + produto.quantidade }
                        : item
                );
            } else {
                novoCarrinho = [...prevCarrinho, produto];
            }

            return novoCarrinho;
        });
    }

    function removerDoCarrinho(nomeProduto, tamanho) {
        setCarrinho((prevCarrinho) => {
            return prevCarrinho.filter(
                (item) => !(item.nome === nomeProduto && item.tamanho === tamanho)
            );
        });
    }

    function limparCarrinho() {
        setCarrinho([]);
        setFreteSelecionado(null);
        localStorage.removeItem("carrinho");
        localStorage.removeItem("frete");
    }

    function selecionarFrete(opcao) {
        setFreteSelecionado(opcao);
    }

    const totalCarrinho = carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
    );

    const totalComFrete = freteSelecionado
        ? totalCarrinho + Number(freteSelecionado.valor)
        : totalCarrinho;

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                carrinhoCarregado,
                adicionarAoCarrinho,
                removerDoCarrinho,
                limparCarrinho,
                freteSelecionado,
                selecionarFrete,
                totalCarrinho,
                totalComFrete,
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
}

export function useCarrinho() {
    return useContext(CarrinhoContext);
}