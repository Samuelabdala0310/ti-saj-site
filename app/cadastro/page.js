"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Cadastro() {
  const { login } = useAuth();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");

  const handleCadastro = (e) => {
    e.preventDefault();

    const usuariosExistentes = JSON.parse(localStorage.getItem("usuarios")) || [];

    const jaExiste = usuariosExistentes.some((user) => user.email === email);

    if (jaExiste) {
      setErro("Já existe uma conta com esse e-mail.");
      return;
    }

    const novoUsuario = { nome, email, senha, telefone };
    const novosUsuarios = [...usuariosExistentes, novoUsuario];

    localStorage.setItem("usuarios", JSON.stringify(novosUsuarios));

    // Faz login automático após cadastro
    login({ nome, email });

    // Redireciona
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4 py-10">
      <div className="bg-zinc-900 p-8 rounded-2xl max-w-lg w-full border border-zinc-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Cadastre-se na TI-SAJ
        </h1>

        {erro && (
          <p className="text-red-500 text-sm text-center mb-4">{erro}</p>
        )}

        <form className="space-y-4" onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="text"
            placeholder="Telefone (opcional)"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}