import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Pedido } from '@/models/Pedido';
import { Usuario } from '@/models/Usuario';

await connectDB();

// 🚀 Atualizar status do pedido (PUT)
export async function PUT(req, { params }) {
  const { id } = params;
  const { novoStatus } = await req.json();

  if (!novoStatus) {
    return NextResponse.json({ error: 'Status não informado' }, { status: 400 });
  }

  try {
    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 });
    }

    pedido.status = novoStatus;
    await pedido.save();

    return NextResponse.json({ message: 'Status atualizado com sucesso', pedido });
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

// 🚀 Buscar um pedido específico (GET)
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const pedido = await Pedido.findById(id).populate('usuarioId', 'nome email');

    if (!pedido) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ pedido });
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}