"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]); // Começa vazio
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== "undefined") {
            const carrinhoSalvo = localStorage.getItem("carrinho");
            if (carrinhoSalvo) {
                setCarrinho(JSON.parse(carrinhoSalvo));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
        }
    }, [carrinho]);

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

            localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
            return novoCarrinho;
        });
    }

    function removerDoCarrinho(nomeProduto, tamanho) {
        console.log("Tentando remover:", nomeProduto, tamanho);
        setCarrinho((prevCarrinho) => {
            console.log("Carrinho antes:", prevCarrinho);
            const novoCarrinho = prevCarrinho.filter(
                (item) => !(item.nome === nomeProduto && item.tamanho === tamanho)
            );
            console.log("Carrinho depois:", novoCarrinho);
            localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
            return novoCarrinho;
        });
    }

    function limparCarrinho() {
        setCarrinho([]);
        localStorage.removeItem("carrinho");
    }

    if (!isMounted) return null;

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export function useCarrinho() {
    return useContext(CarrinhoContext);
}