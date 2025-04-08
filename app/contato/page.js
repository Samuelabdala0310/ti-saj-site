export default function Contato() {
  return (
    <div className="min-h-screen flex flex-col items-center text-center p-6 bg-black">
      {/* Informações de Contato */}
      <h1 className="text-4xl font-bold mb-6 text-white">Entre em Contato</h1>
      <div className="mb-6 text-gray-300">
        <p className="text-lg">📍 Rua Wilhelm Buztke Sênior, 171 - Timbó, SC</p>
        <p className="text-lg">📧 contato.tisaj@gmail.com</p>
        <p className="text-lg">📷 Instagram: @ti.saj</p>
      </div>

      {/* Formulário de Contato */}
      <div className="w-full max-w-lg bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-white text-left">Envie sua mensagem</h2>
        <form className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Seu nome"
            className="p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            className="p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Escreva sua mensagem..."
            className="p-3 border border-gray-700 bg-gray-800 text-white rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <button
            type="submit"
            className="bg-indigo-500 text-white font-bold py-3 rounded-lg hover:bg-indigo-600 transition-all"
          >
            Enviar
          </button>
        </form>
      </div>

      {/* Perguntas Frequentes */}
      <div className="w-full max-w-2xl mt-10 text-left">
        <h2 className="text-3xl font-semibold mb-4 text-white">Perguntas Frequentes</h2>
        <div className="space-y-3">
          <details className="p-3 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer text-gray-300">Quanto tempo leva para a entrega?</summary>
            <p className="mt-2 text-gray-400">O prazo médio de entrega é de 5 a 10 dias úteis.</p>
          </details>
          <details className="p-3 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer text-gray-300">Quais formas de pagamento aceitam?</summary>
            <p className="mt-2 text-gray-400">Aceitamos Pix, cartão de crédito e boleto bancário.</p>
          </details>
          <details className="p-3 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer text-gray-300">Como faço para trocar um produto?</summary>
            <p className="mt-2 text-gray-400">Basta entrar em contato pelo e-mail informando o motivo da troca.</p>
          </details>
        </div>
      </div>
    </div>
  );
}
