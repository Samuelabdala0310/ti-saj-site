export default function Cadastro() {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4 py-10">
      <div className="bg-zinc-900 p-8 rounded-2xl max-w-lg w-full border border-zinc-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Cadastre-se na TI-SAJ
        </h1>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nome completo"
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="text"
            placeholder="Telefone (opcional)"
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}