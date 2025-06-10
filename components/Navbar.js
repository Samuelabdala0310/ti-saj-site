"use client";
import "./Navbar.css";
import Link from "next/link";
import { useCarrinho } from "@/context/CarrinhoContext";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import CarrinhoModal from "@/components/CarrinhoModal";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/context/AuthContext"; // 👈 Importa o contexto de autenticação

export default function Navbar() {
  const { carrinho } = useCarrinho();
  const { usuario, logout } = useAuth(); // 👈 Pega o usuário logado e a função logout
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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

          {/* Se estiver logado, mostra o nome e botão de sair */}
          {usuario ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-purple-300 font-medium">
                Olá, {usuario.nome.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="text-red-400 hover:underline text-sm"
              >
                Sair
              </button>
            </div>
          ) : (
            // Se não estiver logado, mostra o botão de login
            <button onClick={() => setMostrarLogin(true)} className="relative">
              <UserIcon className="h-6 w-6 text-white" />
            </button>
          )}

          {/* Botão do carrinho */}
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

      {/* Modais */}
      {mostrarCarrinho && (
        <CarrinhoModal
          isOpen={mostrarCarrinho}
          onClose={() => setMostrarCarrinho(false)}
        />
      )}
      {mostrarLogin && (
        <LoginModal onClose={() => setMostrarLogin(false)} />
      )}
    </>
  );
}