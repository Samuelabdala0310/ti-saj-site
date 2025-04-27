import axios from 'axios';

export async function melhorEnvioRequest(endpoint, method = 'GET', data = null) {
  const token = process.env.MELHOR_ENVIO_ACCESS_TOKEN;

  if (!token) {
    throw new Error('Access Token não encontrado!');
  }

  const options = {
    method,
    url: `https://www.melhorenvio.com.br${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer requisição para Melhor Envio:', error.response?.data || error.message);
    throw error;
  }
}