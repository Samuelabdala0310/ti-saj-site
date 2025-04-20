// /app/login-melhor-envio/page.js ou /pages/login-melhor-envio.js

"use client"; // só se for App Router

import React from "react";

export default function LoginMelhorEnvio() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_MELHOR_ENVIO_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_MELHOR_ENVIO_REDIRECT_URI;

  const loginUrl = `https://sandbox.melhorenvio.com.br/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => window.location.href = loginUrl}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition"
      >
        Conectar com Melhor Envio
      </button>
    </div>
  );
}