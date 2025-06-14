import { NextResponse } from 'next/server';

// Remove acentos
function sanitize(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

// Formata campo EMV
function format(id, value) {
  const length = String(value).length.toString().padStart(2, '0');
  return `${id}${length}${value}`;
}

// Gera payload Pix padrão Bacen + CEP
function gerarPayload({ chave, nome, cidade, cep, valor, descricao = 'Pagamento' }) {
  nome = sanitize(nome).substring(0, 25);
  cidade = sanitize(cidade).substring(0, 15);
  descricao = sanitize(descricao).substring(0, 30);
  cep = sanitize(cep).replace('-', '').substring(0, 8);

  const gui = format('00', 'br.gov.bcb.pix');
  const chavePix = format('01', chave);
  const descricaoStr = descricao ? format('02', descricao) : '';

  const merchantAccountInfo = format('26', `${gui}${chavePix}${descricaoStr}`);

  const locationInfo = cep ? format('61', cep) : '';

  const payloadSemCRC = [
    '000201',
    merchantAccountInfo,
    '52040000',
    '5303986',
    format('54', valor.toFixed(2)),
    '5802BR',
    format('59', nome),
    format('60', cidade),
    locationInfo,
    '62070503***', // txid
    '6304'
  ].join('');

  const crc = crc16(payloadSemCRC).toUpperCase();

  return `${payloadSemCRC}${crc}`;
}

// Calcula CRC16-CCITT
function crc16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).padStart(4, '0');
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const valor = parseFloat(searchParams.get('valor'));

  if (!valor) {
    return NextResponse.json({ error: 'Valor não informado' }, { status: 400 });
  }

  try {
    const payload = gerarPayload({
      chave: '07175676999', // ✔️ Substituir por sua chave real
      nome: 'SAMUEL ABDALA JOSE',
      cidade: 'TIMBO',
      cep: '80215202', // ✔️ Seu CEP sem traço
      valor: valor,
      descricao: 'Pagamento TI-SAJ',
    });

    return NextResponse.json({ payload });
  } catch (error) {
    console.error('Erro na API Pix:', error);
    return NextResponse.json({ error: 'Erro ao gerar PIX' }, { status: 500 });
  }
}