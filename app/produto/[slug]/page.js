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

  if (!produto) return <div>Produto não encontrado</div>;

  const calcularFrete = async () => {
    if (!cep || cep.length !== 8) {
      alert("Digite um CEP válido com 8 dígitos.");
      return;
    }

    setCarregandoFrete(true);
    setOpcoesFrete([]);

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
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagens */}
        <div>
          <Image
            src={imagemPrincipal}
            alt={produto.nome}
            width={600}
            height={600}
            className="rounded-xl w-full object-cover"
          />
          <div className="flex gap-4 mt-4">
            {produto.imagens.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Imagem ${idx}`}
                width={100}
                height={100}
                className={`rounded-lg cursor-pointer border ${
                  imagemPrincipal === img ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setImagemPrincipal(img)}
              />
            ))}
          </div>
        </div>

        {/* Detalhes */}
        <div>
          <h1 className="text-3xl font-bold">{produto.nome}</h1>
          <p className="text-xl text-gray-700 mt-2">
            R$ {produto.preco.toFixed(2)}
          </p>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: Math.round(produto.avaliacao) }).map(
              (_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              )
            )}
            <span className="text-sm text-gray-600">
              ({produto.numAvaliacoes} avaliações)
            </span>
          </div>

          {/* Tamanho */}
          <div className="mt-4">
            <h3 className="font-semibold">Tamanho:</h3>
            <div className="flex gap-2 mt-1">
              {produto.tamanhos.map((t) => (
                <button
                  key={t}
                  onClick={() => setTamanhoSelecionado(t)}
                  className={`border px-4 py-2 rounded-lg ${
                    tamanhoSelecionado === t
                      ? "border-black bg-black text-white"
                      : "border-gray-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Quantidade */}
          <div className="mt-4">
            <h3 className="font-semibold">Quantidade:</h3>
            <input
              type="number"
              min={1}
              value={quantidade}
              onChange={(e) => setQuantidade(parseInt(e.target.value))}
              className="border rounded-lg px-4 py-2 w-20"
            />
          </div>

          {/* Frete */}
          <div className="mt-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FaTruck /> Calcular frete:
            </h3>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="border rounded-lg px-4 py-2"
                maxLength={8}
              />
              <button
                onClick={calcularFrete}
                className="bg-black text-white px-4 py-2 rounded-lg"
                disabled={carregandoFrete}
              >
                {carregandoFrete ? "Calculando..." : "Calcular"}
              </button>
            </div>

            {opcoesFrete.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Opções de frete:</h4>
                <ul className="space-y-2">
                  {opcoesFrete.map((opcao, idx) => (
                    <li
                      key={idx}
                      className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer ${
                        freteSelecionado?.nome === opcao.nome
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      onClick={() => {
                        setFrete(Number(opcao.valor));
                        setNomeFrete(opcao.nome);
                        setFreteSelecionado(opcao);
                      }}
                    >
                      <div>
                        <p className="font-medium">{opcao.nome}</p>
                        <p className="text-sm text-gray-600">
                          Prazo: {opcao.prazo} dias úteis
                        </p>
                      </div>
                      <div className="font-semibold">
                        R$ {Number(opcao.valor).toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {opcoesFrete.length === 0 && !carregandoFrete && (
              <div className="mt-2 text-sm text-red-600">
                Não foi possível calcular o frete para este CEP.
              </div>
            )}
          </div>

          {/* Botão adicionar */}
          <button
            onClick={handleAdicionarCarrinho}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg mt-6 hover:opacity-90"
          >
            <FaShoppingCart /> Adicionar ao carrinho
          </button>
        </div>
      </div>

      {/* Descrição e medidas */}
      <div className="mt-10">
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setAbaAtiva("descricao")}
            className={`pb-2 ${
              abaAtiva === "descricao"
                ? "border-b-2 border-black font-semibold"
                : "text-gray-500"
            }`}
          >
            Descrição
          </button>
          <button
            onClick={() => setAbaAtiva("medidas")}
            className={`pb-2 ${
              abaAtiva === "medidas"
                ? "border-b-2 border-black font-semibold"
                : "text-gray-500"
            }`}
          >
            Tabela de Medidas
          </button>
        </div>

        {abaAtiva === "descricao" && (
          <div className="mt-4">
            <p>{produto.descricao}</p>
            <p className="mt-2 text-gray-600">
              <strong>Tecido:</strong> {produto.tecido}
            </p>
          </div>
        )}

        {abaAtiva === "medidas" && (
          <div className="mt-4">
            <table className="w-full text-left border border-gray-300">
              <thead>
                <tr>
                  <th className="border p-2">Tamanho</th>
                  <th className="border p-2">Largura</th>
                  <th className="border p-2">Altura</th>
                </tr>
              </thead>
              <tbody>
                {produto.tabelaMedidas.map((medida) => (
                  <tr key={medida.tamanho}>
                    <td className="border p-2">{medida.tamanho}</td>
                    <td className="border p-2">{medida.largura}</td>
                    <td className="border p-2">{medida.altura}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}