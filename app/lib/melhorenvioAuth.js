import axios from 'axios';

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

    return response.data; // Contém access_token e refresh_token
  } catch (error) {
    console.error('Erro ao obter token:', error.response?.data || error.message);
    return null;
  }
}