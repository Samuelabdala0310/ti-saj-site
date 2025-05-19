"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]);
    const [carrinhoCarregado, setCarrinhoCarregado] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const carrinhoSalvo = localStorage.getItem("carrinho");
            if (carrinhoSalvo) {
                setCarrinho(JSON.parse(carrinhoSalvo));
            }
            setCarrinhoCarregado(true);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && carrinhoCarregado) {
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }
    }, [carrinho, carrinhoCarregado]);

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
        localStorage.removeItem("carrinho");
    }

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                carrinhoCarregado,
                adicionarAoCarrinho,
                removerDoCarrinho,
                limparCarrinho,
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
}

export function useCarrinho() {
    return useContext(CarrinhoContext);
}