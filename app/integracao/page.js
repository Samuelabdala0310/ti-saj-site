'use client';

const melhorEnvioLoginUrl = `${process.env.NEXT_PUBLIC_MELHOR_ENVIO_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_MELHOR_ENVIO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_MELHOR_ENVIO_REDIRECT_URI}&response_type=code&scope=cart:create cart:read shipping_calculator`;

export default function Integracao() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Integração com Melhor Envio</h1>
      <p>Clique abaixo para conectar sua conta com o Melhor Envio:</p>
      <button
        onClick={() => window.location.href = melhorEnvioLoginUrl}
        style={{
          background: '#3f51b5',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          marginTop: '1rem',
          cursor: 'pointer',
        }}
      >
        Conectar com Melhor Envio
      </button>
    </div>
  );
}