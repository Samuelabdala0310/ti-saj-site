'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

export default function MelhorEnvioCallback() {
  const [code, setCode] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const receivedCode = params.get('code');
    if (receivedCode) {
      console.log("Código recebido:", receivedCode);
      setCode(receivedCode);
    }
  }, []);

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1>Callback do Melhor Envio</h1>
      <p>Código de autorização: {code || 'Nenhum código encontrado.'}</p>
    </div>
  );
}