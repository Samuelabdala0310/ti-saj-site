"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginModal({ onClose }) {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const resultado = login(email, senha);

    if (resultado.sucesso) {
      setMensagem("Bem-vindo de volta!");
      setTimeout(() => {
        setMensagem("");
        onClose(); // fecha o modal
        router.push("/loja"); // redireciona para a loja
      }, 1500);
    } else {
      setMensagem("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-md relative border border-zinc-700">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Entrar na TI-SAJ
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-400 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold transition"
          >
            Entrar
          </button>
        </form>

        {mensagem && (
          <p className="text-center mt-4 text-sm text-purple-400">{mensagem}</p>
        )}

        <div className="text-center mt-6 text-sm text-gray-400">
          Ainda não faz parte da TI-SAJ?{" "}
          <button
            onClick={() => {
              onClose();
              router.push("/cadastro");
            }}
            className="text-purple-400 hover:underline"
          >
            Cadastre-se e comece a vestir suas ideias
          </button>
        </div>
      </div>
    </div>
  );
}