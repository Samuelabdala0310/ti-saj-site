// app/lib/melhorEnvio.js
import axios from 'axios';
import { refreshAccessToken } from './melhorenvioAuth';

let accessToken = process.env.MELHOR_ENVIO_ACCESS_TOKEN;

export async function melhorEnvioRequest(endpoint, method = 'GET', data = null) {
  if (!accessToken) {
    throw new Error('Access Token não encontrado!');
  }

  const makeRequest = async () => {
    const options = {
      method,
      url: `https://www.melhorenvio.com.br${endpoint}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    };

    return axios(options);
  };

  try {
    const response = await makeRequest();
    return response.data;
  } catch (error) {
    // Se o erro for 401, tenta fazer refresh
    if (error.response && error.response.status === 401) {
      console.warn('Access token expirado, tentando renovar...');

      const newTokens = await refreshAccessToken();
      if (newTokens && newTokens.access_token) {
        accessToken = newTokens.access_token; // Atualiza o token na memória
        console.log('Access token renovado com sucesso!');

        // Tenta fazer a requisição novamente
        const retryResponse = await makeRequest();
        return retryResponse.data;
      } else {
        throw new Error('Falha ao renovar o access token.');
      }
    }

    console.error('Erro ao fazer requisição para Melhor Envio:', error.response?.data || error.message);
    throw error;
  }
}
