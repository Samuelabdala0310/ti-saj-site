// app/api/melhorenvio/callback/route.js

import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Código de autorização não encontrado.' }, { status: 400 });
  }

  try {
    const response = await axios.post('https://api.melhorenvio.com.br/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_MELHOR_ENVIO_CLIENT_ID,
      client_secret: process.env.MELHOR_ENVIO_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_MELHOR_ENVIO_REDIRECT_URI,
      code,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    console.log('Access Token:', response.data.access_token);

    return NextResponse.json({ message: 'Autenticado com sucesso!', tokens: response.data });
  } catch (error) {
    console.error('Erro ao obter token:', error?.response?.data || error.message);
    return NextResponse.json({ error: 'Falha ao trocar código por token.' }, { status: 500 });
  }
}