"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Carrega o usuário salvo no localStorage ao abrir o site
  useEffect(() => {
    const userSalvo = localStorage.getItem("usuarioLogado");
    if (userSalvo) {
      const parsed = JSON.parse(userSalvo);
      // Garante que tenha _id
      if (!parsed._id) parsed._id = crypto.randomUUID();
      setUsuario(parsed);
    }
  }, []);

  const cadastrar = (nome, email, senha) => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExiste = usuariosSalvos.find((u) => u.email === email);
    if (usuarioExiste) {
      return { erro: "Email já cadastrado" };
    }

    const novoUsuario = {
      _id: crypto.randomUUID(),
      nome,
      email,
      senha,
      telefone: "",
    };

    localStorage.setItem(
      "usuarios",
      JSON.stringify([...usuariosSalvos, novoUsuario])
    );

    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
    setUsuario(novoUsuario);
    return { sucesso: true };
  };

  const login = (email, senha) => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioEncontrado = usuariosSalvos.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuarioEncontrado) {
      return { erro: "Email ou senha inválidos" };
    }

    // Se não tiver _id, adiciona agora
    if (!usuarioEncontrado._id) {
      usuarioEncontrado._id = crypto.randomUUID();
      const atualizados = usuariosSalvos.map((u) =>
        u.email === usuarioEncontrado.email ? usuarioEncontrado : u
      );
      localStorage.setItem("usuarios", JSON.stringify(atualizados));
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    setUsuario(usuarioEncontrado);
    return { sucesso: true };
  };

  const logout = () => {
    localStorage.removeItem("usuarioLogado");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cadastrar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);