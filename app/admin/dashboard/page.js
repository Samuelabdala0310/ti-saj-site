"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, ShoppingCart, Truck, CheckCheck } from "lucide-react";

export default function Dashboard() {
  const { usuario, loading } = useAuth();
  const router = useRouter();

  const [dados, setDados] = useState({
    totalPedidos: 0,
    faturamento: 0,
    pedidosPorStatus: {},
    grafico: [],
  });

  useEffect(() => {
    if (!loading) {
      if (!usuario || usuario.role !== "admin") {
        router.push("/");
      } else {
        carregarDashboard();
      }
    }
  }, [usuario, loading]);

  const carregarDashboard = async () => {
    const res = await fetch("/api/dashboard");
    const data = await res.json();
    setDados(data);
  };

  const coresStatus = {
    aguardando_pagamento: "bg-yellow-400",
    pago: "bg-green-500",
    enviado: "bg-blue-500",
    concluido: "bg-purple-500",
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-700">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="text-purple-400" />
            <p className="text-lg font-semibold">Pedidos no mês</p>
          </div>
          <p className="text-3xl font-bold">{dados.totalPedidos}</p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-700">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="text-green-400" />
            <p className="text-lg font-semibold">Faturamento</p>
          </div>
          <p className="text-3xl font-bold">
            R$ {dados.faturamento.toFixed(2)}
          </p>
        </div>

        {Object.entries(dados.pedidosPorStatus).map(([status, quantidade]) => (
          <div
            key={status}
            className={`rounded-xl p-5 border border-zinc-700 ${
              coresStatus[status] || "bg-zinc-900"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              {status === "enviado" ? (
                <Truck />
              ) : status === "concluido" ? (
                <CheckCheck />
              ) : (
                <ShoppingCart />
              )}
              <p className="text-lg font-semibold capitalize">
                {status.replace("_", " ")}
              </p>
            </div>
            <p className="text-3xl font-bold">{quantidade}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-700">
        <h2 className="text-xl font-semibold mb-4">Faturamento Diário</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dados.grafico}>
            <XAxis dataKey="dia" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="valor" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}