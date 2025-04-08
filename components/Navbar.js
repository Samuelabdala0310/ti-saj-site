"use client";
import './Navbar.css';
import Link from "next/link";
import { useCarrinho } from "@/context/CarrinhoContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import CarrinhoModal from "@/components/CarrinhoModal";

export default function Navbar() {
    const { carrinho } = useCarrinho(); // Removido setCarrinho
    const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Evita erro de hidratação

    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    return (
        <>
            <nav className="flex justify-between items-center p-4 bg-gray-900 text-white relative">
                <Link href="/">
                    <span className="text-xl font-bold cursor-pointer">TI-SAJ</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/loja" className="hover:text-gray-300">Loja</Link>
                    <Link href="/contato" className="hover:text-gray-300">Contato</Link>
                    <Link href="/sobre" className="hover:text-gray-300">Sobre</Link>

                    {/* Botão do carrinho com indicador de itens */}
                    <button onClick={() => setMostrarCarrinho(true)} className="relative">
                        <ShoppingCartIcon className="h-6 w-6 text-white" />
                        {totalItens > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                                {totalItens}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Modal do carrinho corrigido e ajustado */}
            {mostrarCarrinho && <CarrinhoModal isOpen={mostrarCarrinho} onClose={() => setMostrarCarrinho(false)} />}
        </>
    );
}