// 🔧 Remove acentos e deixa maiúsculo
export function sanitize(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

// 🔧 Formata os campos no padrão EMV
export function format(id, value) {
  const length = String(value).length.toString().padStart(2, '0');
  return `${id}${length}${value}`;
}

// 🔧 Calcula o CRC16 padrão Bacen
export function crc16(str) {
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

// 🚀 Função principal para gerar o payload Pix
export function gerarPayload({
  chave,
  nome,
  cidade,
  cep,
  valor,
  descricao = 'Pagamento'
}) {
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