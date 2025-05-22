export async function POST(request) {
  const { cepDestino } = await request.json();

  try {
    const response = await fetch('https://sandbox.melhorenvio.com.br/api/v2/me/shipping/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1OTcwIiwianRpIjoiNzEyMGY1Nzc0MzVhZTczODJhZjIxMGJkYTM5ZTJkYzU3ZWI0YTBiMmJiMDEzMWQ0MWMzZTRjNmIxNWVlOWVjZjM3MDUwOWFiMzI1MmYxOTgiLCJpYXQiOjE3NDc3NTc5MDYuMTA0NTk0LCJuYmYiOjE3NDc3NTc5MDYuMTA0NTk4LCJleHAiOjE3NTAzNDk5MDYuMDY3MTExLCJzdWIiOiI5ZWIyZDQ1MS0yMTljLTQ4YjUtOGMwMS1hNTIwOTE2ZDM1YjQiLCJzY29wZXMiOlsiY2FydC1yZWFkIiwiY2FydC13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiY29tcGFuaWVzLXdyaXRlIiwiY291cG9ucy1yZWFkIiwiY291cG9ucy13cml0ZSIsIm5vdGlmaWNhdGlvbnMtcmVhZCIsIm9yZGVycy1yZWFkIiwicHJvZHVjdHMtcmVhZCIsInByb2R1Y3RzLXdyaXRlIiwicHVyY2hhc2VzLXJlYWQiLCJzaGlwcGluZy1jYWxjdWxhdGUiLCJzaGlwcGluZy1jYW5jZWwiLCJzaGlwcGluZy1jaGVja291dCIsInNoaXBwaW5nLWNvbXBhbmllcyIsInNoaXBwaW5nLWdlbmVyYXRlIiwic2hpcHBpbmctcHJldmlldyIsInNoaXBwaW5nLXByaW50Iiwic2hpcHBpbmctc2hhcmUiLCJzaGlwcGluZy10cmFja2luZyIsImVjb21tZXJjZS1zaGlwcGluZyIsInRyYW5zYWN0aW9ucy1yZWFkIiwidXNlcnMtcmVhZCIsInVzZXJzLXdyaXRlIl19.vdRyrHUyazciUoXIbz6-dahgGdW8pQ1M3Ala0z8aMD_z6PCgT36UJl61tSjq9NrnosSNgr0BZ31aIazL-J9TXFCEOkZyPATAyVogG8GbLsrGPoZKcYlOnRTvvM6XEPOSGy9kmTssNXRWMB5-BnRAL-UGabnTCYneQiWa2saLfmL3LJMXGC2VwNV4y8ZGzHkrWtTbydFZh4Ze-iDz7-FSpFbi6TL73KYLSNF6yOdeoq7j2GeRvgRIRiXhzNR2ov_Qy45FEaMubzb4g_9tqK5s9LGUwnv7oAIxJRg8jvDgRlHnrnF-00ZQkrquBDJFkTd0e1R42I1pXtSFvvsZUQKDKFcNxfify4DsRb_Aq3rYooUXygDmhjAzpY3ajffCuowV8K7a5BDjHfWbLkK-938hqYT_7jTsSF_-lWE7ZTFv8bAk75zSDjcmhm5YpH-UG6F6uccd1Ex8R4A6FUqozRG43Vy6CGsduxIvlLrNZFMlzym7Ql-xO9N5UjGalu2yMkDQLAJnyIo-pCeaJ6bJg-MP1v8b_wvOCb3PyR5gjXXlZhqPI194_j7gUIadpXOAkQ6dMny3Ayiw9CW4KzOsjLRhuqgepD6S3hXpFMK3aMGiLxsb2H8Tm3D0jIuHBFsdSnu9Ac6nqdUACdvSGc6S-HB93lazOvtUnbDseNx2tZ0r-zA`, // 🔥 Coloca seu token real aqui
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        from: { postal_code: '89120-000' }, // 🔥 Coloca seu CEP de origem
        to: { postal_code: cepDestino },
        package: {
          weight: 1,
          width: 15,
          height: 10,
          length: 20
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro na API Melhor Envio:', errorData);
      return new Response(JSON.stringify({ error: 'Erro na cotação de frete' }), { status: 500 });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (error) {
    console.error('Erro geral na API:', error);
    return new Response(JSON.stringify({ error: 'Erro interno' }), { status: 500 });
  }
}