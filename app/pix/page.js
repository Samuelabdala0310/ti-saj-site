'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PixPage() {
  const searchParams = useSearchParams();
  const valor = searchParams?.get('valor');

  const [qrCode, setQrCode] = useState('');
  const [codigoPix, setCodigoPix] = useState('');
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function gerar() {
      setLoading(true);
      try {
        const res = await fetch(`/api/gerar-qrcode?valor=${valor}`);
        const data = await res.json();

        if (data.error) {
          setErro(data.error);
          setQrCode('');
          setCodigoPix('');
        } else {
          setQrCode(data.qr);
          setCodigoPix(data.payload);
          setErro(null);
        }
      } catch (e) {
        console.error('Erro gerando Pix:', e);
        setErro('Erro ao gerar código Pix. Verifique os dados.');
        setQrCode('');
        setCodigoPix('');
      }
      setLoading(false);
    }

    if (valor) {
      gerar();
    }
  }, [valor]);

  if (!valor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-zinc-900">
        <p>
          ⚠️ Valor não especificado. Use <code>?valor=10.00</code> na URL.
        </p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-zinc-900">
        <p>❌ {erro}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">Pagamento via PIX</h1>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
        {loading ? (
          <p className="text-green-400">🔄 Gerando código PIX...</p>
        ) : (
          <>
            {qrCode && (
              <img src={qrCode} alt="QR Code Pix" className="w-64 h-64" />
            )}
            <p className="mt-6 text-center max-w-md break-words">
              📱 Escaneie o QR Code ou copie o código abaixo:
            </p>
            <textarea
              readOnly
              className="mt-4 p-2 rounded-md bg-zinc-900 text-green-400 w-full max-w-md select-all"
              value={codigoPix}
              rows={4}
            />
          </>
        )}
      </div>
    </div>
  );
}