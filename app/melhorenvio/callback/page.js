'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function MelhorEnvioCallback() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState(null);

  useEffect(() => {
    const receivedCode = searchParams.get('code');
    if (receivedCode) {
      console.log("Código recebido:", receivedCode);
      setCode(receivedCode);
    }
  }, [searchParams]);

  return (
    <div style={{ color: 'white', padding: '2rem' }}>
      <h1>Callback do Melhor Envio</h1>
      <p>Código de autorização: {code || 'Nenhum código encontrado.'}</p>
    </div>
  );
}