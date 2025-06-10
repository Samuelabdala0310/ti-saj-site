"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Carrega o usuário salvo no localStorage ao abrir o site
  useEffect(() => {
    const userSalvo = localStorage.getItem("usuarioLogado");
    if (userSalvo) {
      setUsuario(JSON.parse(userSalvo));
    }
  }, []);

  const cadastrar = (nome, email, senha) => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExiste = usuariosSalvos.find(u => u.email === email);
    if (usuarioExiste) {
      return { erro: "Email já cadastrado" };
    }

    const novoUsuario = { nome, email, senha };
    localStorage.setItem("usuarios", JSON.stringify([...usuariosSalvos, novoUsuario]));

    // Login automático após cadastro
    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
    setUsuario(novoUsuario);
    return { sucesso: true };
  };

  const login = (email, senha) => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuariosSalvos.find(u => u.email === email && u.senha === senha);
    if (!usuarioEncontrado) {
      return { erro: "Email ou senha inválidos" };
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