// app/lib/melhorenvioAuth.js
import axios from 'axios';

// Função para obter novo access_token usando o refresh_token
export async function refreshAccessToken() {
  const clientId = process.env.MELHOR_ENVIO_CLIENT_ID;
  const clientSecret = process.env.MELHOR_ENVIO_CLIENT_SECRET;
  const refreshToken = process.env.MELHOR_ENVIO_REFRESH_TOKEN;

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });

  try {
    const response = await axios.post('https://www.melhorenvio.com.br/oauth/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });

    return response.data; // { access_token, refresh_token, expires_in, etc }
  } catch (error) {
    console.error('Erro ao renovar token:', error.response?.data || error.message);
    return null;
  }
}

// Continua existindo o getAccessToken normalmente
export async function getAccessToken(code) {
  const clientId = process.env.MELHORENVIO_CLIENT_ID;
  const clientSecret = process.env.MELHORENVIO_CLIENT_SECRET;
  const redirectUri = process.env.MELHORENVIO_REDIRECT_URI;

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    code: code,
  });

  try {
    const response = await axios.post('https://www.melhorenvio.com.br/oauth/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao obter token:', error.response?.data || error.message);
    return null;
  }
}