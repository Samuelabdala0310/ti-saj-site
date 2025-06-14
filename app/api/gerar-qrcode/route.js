import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

// 🔥 Reaproveita seu gerador de payload Pix
import { gerarPayload } from '../gerar-pix/gerar-payload';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const valor = parseFloat(searchParams.get('valor'));

  if (!valor) {
    return NextResponse.json({ error: 'Valor não informado' }, { status: 400 });
  }

  try {
    const payload = gerarPayload({
      chave: '07175676999', // Sua chave
      nome: 'SAMUEL ABDALA JOSE',
      cidade: 'TIMBO',
      cep: '80215202',
      valor: valor,
      descricao: 'Pagamento TI-SAJ',
    });

    const qr = await QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      margin: 4,
      scale: 8,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    return NextResponse.json({ qr, payload });
  } catch (error) {
    console.error('Erro gerando QRCode:', error);
    return NextResponse.json({ error: 'Erro ao gerar QRCode' }, { status: 500 });
  }
}