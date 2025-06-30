"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Download, Trash2 } from "lucide-react";

export default function AdminPedidos() {
  const { usuario, loading } = useAuth();
  const router = useRouter();
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    if (!loading) {
      console.log("Usuário logado:", usuario); // 👈 Adicione aqui
      if (!usuario || usuario.role !== "admin") {
        router.push("/");
      } else {
        carregarPedidos();
      }
    }
  }, [usuario, loading]);

  const carregarPedidos = async () => {
    try {
      const res = await fetch("/api/pedido");
      const data = await res.json();
      setPedidos(data.pedidos);
    } catch (error) {
      console.error("Erro carregando pedidos:", error);
    } finally {
      setCarregando(false);
    }
  };

  const atualizarStatus = async (id, novoStatus) => {
    try {
      const res = await fetch(`/api/pedido/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ novoStatus }),
      });

      if (res.ok) {
        carregarPedidos();
      } else {
        alert("Erro ao atualizar status");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const excluirPedido = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este pedido?")) return;

    try {
      const res = await fetch(`/api/pedido/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        carregarPedidos();
      } else {
        alert("Erro ao excluir pedido");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const exportarCSV = () => {
    const header = [
      "ID",
      "Status",
      "Data",
      "Itens",
      "Total",
      "Endereço",
    ];

    const linhas = pedidos.map((pedido) => [
      pedido._id,
      pedido.status,
      new Date(pedido.criadoEm).toLocaleString(),
      pedido.itens
        .map((i) => `${i.quantidade}x ${i.nome} (${i.tamanho})`)
        .join(" | "),
      pedido.valorTotal.toFixed(2),
      `${pedido.endereco?.rua}, ${pedido.endereco?.numero}, ${pedido.endereco?.bairro}, ${pedido.endereco?.cidade} - ${pedido.endereco?.estado}, CEP ${pedido.endereco?.cep}`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...linhas].map((e) => e.join(";")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pedidos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pedidosFiltrados = (pedidos || []).filter((pedido) => {
    const buscaLower = busca.toLowerCase();

    const matchBusca =
      pedido.usuarioId?.toLowerCase().includes(buscaLower) ||
      pedido._id.toLowerCase().includes(buscaLower);

    const matchStatus =
      filtroStatus === "todos" || pedido.status === filtroStatus;

    return matchBusca && matchStatus;
  });

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Carregando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Painel Administrativo - Pedidos
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por ID ou Usuário ID..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 w-full md:w-1/3"
        />

        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
        >
          <option value="todos">Todos os status</option>
          <option value="aguardando_pagamento">Aguardando pagamento</option>
          <option value="pago">Pago</option>
          <option value="em_producao">Em produção</option>
          <option value="enviado">Enviado</option>
          <option value="concluido">Concluído</option>
        </select>

        <button
          onClick={exportarCSV}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg"
        >
          <Download size={18} /> Exportar CSV
        </button>
      </div>

      {pedidosFiltrados.length === 0 ? (
        <p className="text-center">Nenhum pedido encontrado.</p>
      ) : (
        <div className="space-y-6">
          {pedidosFiltrados.map((pedido) => (
            <div
              key={pedido._id}
              className="bg-zinc-900 p-5 rounded-xl border border-zinc-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">
                  Pedido #{pedido._id.slice(-5).toUpperCase()}
                </h2>
                <div className="flex gap-2 items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      pedido.status === "aguardando_pagamento"
                        ? "bg-yellow-500 text-black"
                        : pedido.status === "pago"
                        ? "bg-green-500 text-black"
                        : pedido.status === "enviado"
                        ? "bg-blue-500 text-white"
                        : pedido.status === "concluido"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-600"
                    }`}
                  >
                    {pedido.status.toUpperCase()}
                  </span>
                  <button
                    onClick={() => excluirPedido(pedido._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Excluir pedido"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-2">
                Criado em: {new Date(pedido.criadoEm).toLocaleString()}
              </p>

              <div className="space-y-1 mb-2">
                {pedido.itens.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm text-gray-300"
                  >
                    <span>
                      {item.quantidade}x {item.nome} ({item.tamanho})
                    </span>
                    <span>
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm mb-2">
                <strong>Total:</strong> R$ {pedido.valorTotal.toFixed(2)} <br />
                <strong>Endereço:</strong>{" "}
                {pedido.endereco?.rua}, {pedido.endereco?.numero},{" "}
                {pedido.endereco?.bairro}, {pedido.endereco?.cidade} -{" "}
                {pedido.endereco?.estado}, CEP {pedido.endereco?.cep}
              </p>

              <div className="flex gap-2 pt-2 flex-wrap">
                <button
                  onClick={() => atualizarStatus(pedido._id, "pago")}
                  className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-full text-sm"
                >
                  Marcar como Pago
                </button>
                <button
                  onClick={() => atualizarStatus(pedido._id, "enviado")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
                >
                  Marcar como Enviado
                </button>
                <button
                  onClick={() => atualizarStatus(pedido._id, "concluido")}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm"
                >
                  Concluir Pedido
                </button>
                <button
                  onClick={() =>
                    atualizarStatus(pedido._id, "aguardando_pagamento")
                  }
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full text-sm"
                >
                  Aguardando Pagamento
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}