import { connectDB } from '@/lib/mongodb';
import { Pedido } from '@/models/Pedido';
import { Usuario } from '@/models/Usuario';
import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/email';

export async function POST(req) {
  await connectDB();

  try {
    const dados = await req.json();

    const novoPedido = await Pedido.create(dados);

    // 🔥 Envia e-mail de notificação
    try {
      const itensHtml = novoPedido.itens
        .map(
          (item) =>
            `<li>${item.quantidade}x ${item.nome} (${item.tamanho}) - R$ ${(item.preco * item.quantidade).toFixed(2)}</li>`
        )
        .join('');

      await transporter.sendMail({
        ...mailOptions,
        subject: `🛒 Novo Pedido #${novoPedido._id.slice(-5).toUpperCase()}`,
        html: `
          <h2>🛍️ Novo Pedido Recebido</h2>
          <p><strong>Cliente ID:</strong> ${novoPedido.usuarioId}</p>
          <p><strong>Endereço:</strong> ${novoPedido.endereco?.rua}, ${novoPedido.endereco?.numero} - ${novoPedido.endereco?.bairro}, ${novoPedido.endereco?.cidade} - ${novoPedido.endereco?.estado} | CEP: ${novoPedido.endereco?.cep}</p>
          <h3>Itens:</h3>
          <ul>${itensHtml}</ul>
          <p><strong>Valor Total:</strong> R$ ${novoPedido.valorTotal.toFixed(2)}</p>
          <p><strong>Status:</strong> ${novoPedido.status}</p>
          <p><strong>Pagamento via:</strong> ${novoPedido.metodoPagamento}</p>
        `,
      });

      console.log('📧 E-mail de notificação enviado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao enviar e-mail:', error);
    }

    return NextResponse.json(novoPedido);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return NextResponse.json({ error: 'Erro ao criar pedido' }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();

  try {
    const pedidos = await Pedido.find().sort({ criadoEm: -1 }).populate('usuarioId', 'nome email');
    return NextResponse.json({ pedidos }); // Retorna com { pedidos: [...] }
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return NextResponse.json({ error: 'Erro ao buscar pedidos' }, { status: 500 });
  }
}