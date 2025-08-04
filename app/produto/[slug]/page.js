"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCarrinho } from "@/context/CarrinhoContext";
import { FaStar, FaShoppingCart, FaTruck } from "react-icons/fa";
import { useFrete } from "@/context/FreteContext";
import { produtos } from "@/data/produto";

export default function Produto() {
  const { slug } = useParams();
  const { adicionarAoCarrinho } = useCarrinho();

  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("descricao");
  const [freteSelecionado, setFreteSelecionado] = useState(null);

  const {
    setFrete,
    setNomeFrete,
    calcularFrete: calcularFreteContext,
    cep,
    setCep,
    opcoesFrete,
    setOpcoesFrete,
  } = useFrete();

  const [carregandoFrete, setCarregandoFrete] = useState(false);

  useEffect(() => {
    const produtoSelecionado = produtos[slug];
    if (produtoSelecionado) {
      setProduto(produtoSelecionado);
      setImagemPrincipal(produtoSelecionado.imagens[0]);
    }
  }, [slug]);

  if (!produto) return <div className="flex justify-center items-center h-screen text-xl text-gray-300">Produto não encontrado</div>;

  const calcularFrete = async () => {
    if (!cep || cep.length !== 8) {
      alert("Digite um CEP válido com 8 dígitos.");
      return;
    }

    setCarregandoFrete(true);
    setOpcoesFrete([]);
    setCarregandoFrete(true);

    try {
      const response = await fetch("/api/melhorenvio/cotar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cep }),
      });

      if (!response.ok) {
        throw new Error("Erro na cotação de frete.");
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setOpcoesFrete(data);
      } else {
        setOpcoesFrete([]);
      }
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
      alert("Erro ao calcular frete. Verifique o CEP e tente novamente.");
    } finally {
      setCarregandoFrete(false);
    }
  };

  const handleAdicionarCarrinho = () => {
    if (!tamanhoSelecionado) {
      alert("Selecione um tamanho.");
      return;
    }

    adicionarAoCarrinho({
      slug,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagens[0],
      quantidade,
      tamanho: tamanhoSelecionado,
    });

    alert("Produto adicionado ao carrinho!");
  };

  return (
    // Fundo da página totalmente preto (ou cinza bem escuro)
    <div className="min-h-screen bg-gray-950 text-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      {/* Card principal com fundo escuro e bordas suaves */}
      <div className="max-w-6xl mx-auto bg-gray-900 shadow-xl rounded-xl p-6 md:p-8 border border-gray-800">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Imagens */}
          <div className="flex flex-col items-center">
            <Image
              src={imagemPrincipal}
              alt={produto.nome}
              width={600}
              height={600}
              className="rounded-xl w-full max-w-md object-cover shadow-lg border border-gray-700"
            />
            <div className="flex flex-wrap justify-center gap-3 mt-4 w-full max-w-md">
              {produto.imagens.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`Imagem ${idx}`}
                  width={90}
                  height={90}
                  className={`rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                    imagemPrincipal === img
                      ? "border-blue-500 ring-2 ring-blue-500 transform scale-105" // Cor de destaque no modo escuro
                      : "border-gray-700 hover:border-blue-400 hover:scale-105" // Cores para o modo escuro
                  }`}
                  onClick={() => setImagemPrincipal(img)}
                />
              ))}
            </div>
          </div>

          {/* Detalhes */}
          <div className="flex flex-col">
            {/* Nome do Produto */}
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-2">
              {produto.nome}
            </h1>

            {/* Preço */}
            <p className="text-4xl font-bold text-green-400 mb-4"> {/* Verde mais claro para destaque no escuro */}
              R$ {produto.preco.toFixed(2)}
            </p>

            {/* Avaliação */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: Math.round(produto.avaliacao) }).map(
                (_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" /> // Amarelo ligeiramente mais claro - COMENTÁRIO CORRIGIDO AQUI
                )
              )}
              <span className="text-base text-gray-400 ml-1">
                ({produto.numAvaliacoes} avaliações)
              </span>
            </div>

            <hr className="my-6 border-t border-gray-700" /> {/* Linha divisória mais escura */}

            {/* Tamanho */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg text-gray-100 mb-2">Selecione o Tamanho:</h3>
              <div className="flex flex-wrap gap-3">
                {produto.tamanhos.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTamanhoSelecionado(t)}
                    className={`border-2 px-5 py-2 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      tamanhoSelecionado === t
                        ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                        : "border-gray-700 bg-gray-800 text-gray-200 hover:border-blue-500 hover:bg-gray-700" // Ajustado para tema escuro
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantidade */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg text-gray-100 mb-2">Quantidade:</h3>
              <input
                type="number"
                min={1}
                value={quantidade}
                onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
                className="border border-gray-700 bg-gray-800 text-gray-200 rounded-lg px-4 py-2 w-24 text-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" // Ajustado para tema escuro
              />
            </div>

            <hr className="my-6 border-t border-gray-700" /> {/* Linha divisória mais escura */}

            {/* Frete */}
            <div className="mb-6 p-4 border border-gray-700 rounded-xl bg-gray-800"> {/* Card de frete escuro */}
              <h3 className="font-semibold text-lg text-gray-100 flex items-center gap-3 mb-3">
                <FaTruck className="text-xl text-blue-500" /> Calcular Frete: {/* Cor de ícone ajustada */}
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                  className="flex-grow border border-gray-700 bg-gray-900 text-gray-200 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" // Ajustado para tema escuro
                  maxLength={8}
                />
                <button
                  onClick={calcularFrete}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={carregandoFrete}
                >
                  {carregandoFrete ? "Calculando..." : "Calcular"}
                </button>
              </div>

              {opcoesFrete.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-base text-gray-300 mb-2">Opções de Frete Disponíveis:</h4>
                  <ul className="space-y-3">
                    {opcoesFrete.map((opcao, idx) => (
                      <li
                        key={idx}
                        className={`border rounded-xl p-4 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                          freteSelecionado?.nome === opcao.nome
                            ? "border-blue-600 bg-blue-900 shadow-md text-white" // Opção selecionada mais escura
                            : "border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300" // Opção não selecionada mais escura
                        }`}
                        onClick={() => {
                          console.log("Opção selecionada:", opcao);
                          setFrete(Number(opcao.valor));
                          setNomeFrete(opcao.nome);
                          setFreteSelecionado(opcao);
                        }}
                      >
                        <div>
                          <p className="font-semibold text-gray-100">{opcao.nome}</p>
                          <p className="text-sm text-gray-400 mt-0.5">
                            Prazo: {opcao.prazo} dias úteis
                          </p>
                        </div>
                        <div className="font-bold text-lg text-green-500"> {/* Cor ajustada para valor */}
                          R$ {Number(opcao.valor).toFixed(2)}
                        </div>
                      </li>
                    ))}
                    {/* Opção de retirada pessoalmente */}
                    <li
                      className={`border rounded-xl p-4 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                        freteSelecionado?.nome === "Retirar pessoalmente"
                          ? "border-blue-600 bg-blue-900 shadow-md text-white"
                          : "border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300"
                      }`}
                      onClick={() => {
                        const opcaoRetirada = {
                          nome: "Retirar pessoalmente",
                          valor: 0,
                          prazo: "a combinar",
                        };
                        setFrete(0);
                        setNomeFrete("Retirar pessoalmente");
                        setFreteSelecionado(opcaoRetirada);
                      }}
                    >
                      <div>
                        <p className="font-semibold text-gray-100">Retirar pessoalmente</p>
                        <p className="text-sm text-gray-400 mt-0.5">Sem custo de frete</p>
                      </div>
                      <div className="font-bold text-lg text-green-500">R$ 0,00</div>
                    </li>  
                  </ul>
                </div>
              )}

              {opcoesFrete.length === 0 && !carregandoFrete && cep.length === 8 && (
                <div className="mt-4 text-sm text-red-400 p-2 bg-red-900 rounded-lg border border-red-700"> {/* Mensagem de erro ajustada para tema escuro */}
                  Não foi possível calcular o frete para este CEP. Por favor, verifique o CEP e tente novamente.
                </div>
              )}
            </div>

            {/* Botão Adicionar ao Carrinho */}
            <button
              onClick={handleAdicionarCarrinho}
              className="flex items-center justify-center gap-3 bg-indigo-600 text-white text-xl font-bold px-8 py-4 rounded-xl mt-6 shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 active:scale-100"
            >
              <FaShoppingCart className="text-2xl" /> Adicionar ao Carrinho
            </button>
          </div>
        </div>

        <hr className="my-10 border-t-2 border-gray-700" /> {/* Linha divisória mais escura */}

        {/* Descrição e Medidas */}
        <div className="mt-10">
          <div className="flex border-b border-gray-700 mb-6"> {/* Borda da aba mais escura */}
            <button
              onClick={() => setAbaAtiva("descricao")}
              className={`py-3 px-6 text-lg font-medium transition-all duration-300 ${
                abaAtiva === "descricao"
                  ? "border-b-4 border-blue-500 text-blue-400" // Cores de aba ativa ajustadas para escuro
                  : "text-gray-400 hover:text-blue-300" // Cores de aba inativa ajustadas para escuro
              }`}
            >
              Descrição
            </button>
            <button
              onClick={() => setAbaAtiva("medidas")}
              className={`py-3 px-6 text-lg font-medium transition-all duration-300 ${
                abaAtiva === "medidas"
                  ? "border-b-4 border-blue-500 text-blue-400" // Cores de aba ativa ajustadas para escuro
                  : "text-gray-400 hover:text-blue-300" // Cores de aba inativa ajustadas para escuro
              }`}
            >
              Tabela de Medidas
            </button>
          </div>

          {abaAtiva === "descricao" && (
            <div className="mt-6 text-gray-300 leading-relaxed"> {/* Texto da descrição ajustado */}
              <p className="mb-4">{produto.descricao}</p>
              <p className="text-lg">
                <strong>Tecido:</strong> {produto.tecido}
              </p>
            </div>
          )}

          {abaAtiva === "medidas" && (
            <div className="mt-6 overflow-x-auto rounded-lg shadow-md border border-gray-700"> {/* Borda da tabela ajustada */}
              <table className="w-full text-left text-base text-gray-300"> {/* Texto da tabela ajustado */}
                <thead className="bg-blue-900 text-blue-200 uppercase"> {/* Cabeçalho da tabela mais escuro */}
                  <tr>
                    <th className="p-3 border-b border-gray-700">Tamanho</th>
                    <th className="p-3 border-b border-gray-700">Largura</th>
                    <th className="p-3 border-b border-gray-700">Altura</th>
                  </tr>
                </thead>
                <tbody>
                  {produto.tabelaMedidas.map((medida, idx) => (
                    <tr key={medida.tamanho} className={`${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-850'} hover:bg-gray-700 transition-colors`}> {/* Linhas da tabela ajustadas */}
                      <td className="p-3 border-b border-gray-700">{medida.tamanho}</td>
                      <td className="p-3 border-b border-gray-700">{medida.largura}</td>
                      <td className="p-3 border-b border-gray-700">{medida.altura}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}