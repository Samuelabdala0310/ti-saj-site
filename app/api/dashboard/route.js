import { connectDB } from "@/lib/mongodb";
import { Pedido } from "@/models/Pedido";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const agora = new Date();
  const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);

  const pedidosMes = await Pedido.find({ criadoEm: { $gte: inicioMes } });

  const totalPedidos = pedidosMes.length;
  const faturamento = pedidosMes.reduce(
    (total, p) => total + (p.status !== "aguardando_pagamento" ? p.valorTotal : 0),
    0
  );

  const pedidosPorStatus = pedidosMes.reduce((acc, pedido) => {
    acc[pedido.status] = (acc[pedido.status] || 0) + 1;
    return acc;
  }, {});

  const grafico = pedidosMes.reduce((acc, pedido) => {
    const dia = pedido.criadoEm.getDate();
    const item = acc.find((i) => i.dia === dia);
    const valor = pedido.status !== "aguardando_pagamento" ? pedido.valorTotal : 0;

    if (item) {
      item.valor += valor;
    } else {
      acc.push({ dia, valor });
    }
    return acc;
  }, []);

  grafico.sort((a, b) => a.dia - b.dia);

  return NextResponse.json({
    totalPedidos,
    faturamento,
    pedidosPorStatus,
    grafico,
  });
}