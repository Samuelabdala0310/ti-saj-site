// app/melhorenvio/callback/page.js
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function MelhorEnvioCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      // Aqui você pode enviar esse código para uma rota API que vai trocar por token
      console.log("Código recebido:", code);
    }
  }, [code]);

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1>Callback do Melhor Envio</h1>
      <p>Código de autorização: {code || 'Nenhum código encontrado.'}</p>
    </div>
  );
}