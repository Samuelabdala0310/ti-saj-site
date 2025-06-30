import mongoose, { Schema } from 'mongoose';

const PedidoSchema = new Schema({
  usuarioId: { type: String, required: true },
  itens: [
    {
      produtoId: String,
      nome: String,
      tamanho: String,
      quantidade: Number,
      preco: Number,
    },
  ],
  valorTotal: Number,
  endereco: {
    cep: String,
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    estado: String,
    complemento: String,
  },
  status: {
    type: String,
    enum: ['aguardando_pagamento', 'pago', 'em_producao', 'enviado', 'concluido'],
    default: 'aguardando_pagamento',
  },
  metodoPagamento: String,
  criadoEm: { type: Date, default: Date.now },
});

export const Pedido = mongoose.models.Pedido || mongoose.model('Pedido', PedidoSchema);