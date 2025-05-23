"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCarrinho } from "@/context/CarrinhoContext";
import { FaStar, FaShoppingCart, FaTruck } from "react-icons/fa";

export default function Produto() {
  const { slug } = useParams();
  const { adicionarAoCarrinho } = useCarrinho();

  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("descricao");
  const [frete, setFrete] = useState(null);
  const [cep, setCep] = useState("");
  const [carregandoFrete, setCarregandoFrete] = useState(false);

  const produtos = {
    "camisa-ekleticus": {
      nome: "Camisa Ekleticus",
      imagens: ["/camisa-ekleticus.png", "/produtos/foto1-2.png"],
      preco: 35.0,
      descricao: "Camisa confortável e estilosa, perfeita para qualquer ocasião.",
      tecido: "Algodão 100%",
      tabelaMedidas: [
        { tamanho: "P", largura: "50cm", altura: "70cm" },
        { tamanho: "M", largura: "52cm", altura: "72cm" },
        { tamanho: "G", largura: "54cm", altura: "74cm" },
        { tamanho: "GG", largura: "56cm", altura: "76cm" },
      ],
      tamanhos: ["P", "M", "G", "GG"],
      avaliacao: 4.5,
      numAvaliacoes: 23,
      comentarios: [
        { usuario: "João", texto: "Ótima qualidade, recomendo!" },
        { usuario: "Maria", texto: "Material excelente, muito confortável." },
      ],
    },
        "camiseta-emyeges": {
            nome: "Camiseta Emyeges",
            imagens: ["/camisa-emyeges.png", "/camisa-emyeges2.png"],
            preco: 40.00,
            descricao: "Camisa básica e versátil para qualquer ocasião.",
            tecido: "Algodão 100%",
            tabelaMedidas: [
                    { tamanho: "P", largura: "50cm", altura: "70cm" },
                    { tamanho: "M", largura: "52cm", altura: "72cm" },
                    { tamanho: "G", largura: "54cm", altura: "74cm" },
                    { tamanho: "GG", largura: "56cm", altura: "76cm" }
                ],
            tamanhos: ["P", "M", "G", "GG"],
            avaliacao: 4.3,
            numAvaliacoes: 15,
            comentarios: [
                    { usuario: "João", texto: "Ótima qualidade, recomendo!" },
                    { usuario: "Maria", texto: "Material excelente, muito confortável." }
                ]
            },
        "camisa-angyal": {
            nome: "Camisa Angyal",
            imagens: ["/camisa-angyal.png", "/camisa-angyal2.png"],
            preco: 60.00,
            descricao: "Camisa Oversized para mais conforto e estilo nas suas resenhas.",
            tecido: "Algodão 100%",
            tabelaMedidas: [
                    { tamanho: "P", largura: "50cm", altura: "70cm" },
                    { tamanho: "M", largura: "52cm", altura: "72cm" },
                    { tamanho: "G", largura: "54cm", altura: "74cm" },
                    { tamanho: "GG", largura: "56cm", altura: "76cm" }
                ],
            tamanhos: ["PP","P", "M", "G", "GG"],
            avaliacao: 4.3,
            numAvaliacoes: 15,
            comentarios: [
                    { usuario: "João", texto: "Ótima qualidade, recomendo!" },
                    { usuario: "Maria", texto: "Material excelente, muito confortável." }
                ]
            },
        "camisa-lihtsus": { 
            nome: "Camisa Lithsus", 
            imagens: ["/camisa-lithsus.png", "/camisa-lithsus2.png"], 
            preco: 55.00, 
            descricao: "Camisa básica ideal para garantir estilo e conforto em qualquer ocasião.", 
            tecido: "Algodão 100%",
            tabelaMedidas: [
                    { tamanho: "P", largura: "50cm", altura: "70cm" },
                    { tamanho: "M", largura: "52cm", altura: "72cm" },
                    { tamanho: "G", largura: "54cm", altura: "74cm" },
                    { tamanho: "GG", largura: "56cm", altura: "76cm" }
                ],
            tamanhos: ["P", "M", "G", "GG","G1"],
            avaliacao: 4.3,
            numAvaliacoes: 15,
            comentarios: [
                    { usuario: "João", texto: "Ótima qualidade, recomendo!" },
                    { usuario: "Maria", texto: "Material excelente, muito confortável." }
                ]
            },
        "camisa-memento": { 
            nome: "Camisa Memento", 
            imagens: ["/camisa-memento.png", "/camisa-memento2.png"], 
            preco: 80.00, 
            descricao: "Com sua modelagem oversized e estampa remetendo à criatividade e memória da arte, nossa camisa produzida juntamente com a quest se torna um belo diferencial em seu guarda roupa para você se destacar em qualquer rolê.", 
            tecido: "Algodão 100%",
            tabelaMedidas: [
                    { tamanho: "P", largura: "50cm", altura: "70cm" },
                    { tamanho: "M", largura: "52cm", altura: "72cm" },
                    { tamanho: "G", largura: "54cm", altura: "74cm" },
                    { tamanho: "GG", largura: "56cm", altura: "76cm" }
                ],
            tamanhos: ["P", "M", "G", "GG"],
            avaliacao: 4.3,
            numAvaliacoes: 15,
            comentarios: [
                    { usuario: "João", texto: "Ótima qualidade, recomendo!" },
                    { usuario: "Maria", texto: "Material excelente, muito confortável." }
                ]
            },
        "camisa-royal-fire": { 
            nome: "Camisa Royal Fire", 
            imagens: ["/camisa-royalfire.png", "/camisa-royalfire2.png"], 
            preco: 55.00, 
            descricao: "Camisa básica com estampa minimalista, mas com estilo grandioso.", 
            tecido: "Algodão 100%",
            tabelaMedidas: [
                    { tamanho: "P", largura: "50cm", altura: "70cm" },
                    { tamanho: "M", largura: "52cm", altura: "72cm" },
                    { tamanho: "G", largura: "54cm", altura: "74cm" },
                    { tamanho: "GG", largura: "56cm", altura: "76cm" }
                ],
            tamanhos: ["P", "M", "G", "GG","G1"],
            avaliacao: 4.3,
            numAvaliacoes: 15,
            comentarios: [
                    { usuario: "João", texto: "Ótima qualidade, recomendo!" },
                    { usuario: "Maria", texto: "Material excelente, muito confortável." }
                ]
            },
        "camisa-dream-on": { 
            nome: "Camisa Dream On", 
            imagens: ["/camisa-dreamon.png", "/camisa-dreamon2.png"], 
            preco: 65.00, 
            descricao: "O vento sopra a favor de quem ousa sonhar. Dream on, para todos que se encorajam a sonhar, pois dreaming is the first act of courage.", 
            tecido: "Algodão 100%",
            tabelaMedidas: [
                    { tamanho: "P", largura: "50cm", altura: "70cm" },
                    { tamanho: "M", largura: "52cm", altura: "72cm" },
                    { tamanho: "G", largura: "54cm", altura: "74cm" },
                    { tamanho: "GG", largura: "56cm", altura: "76cm" }
                ],
            tamanhos: ["P", "M", "G", "GG","G1"],
            avaliacao: 4.3,
            numAvaliacoes: 15,
            comentarios: [
                    { usuario: "João", texto: "Ótima qualidade, recomendo!" },
                    { usuario: "Maria", texto: "Material excelente, muito confortável." }
                ]
            },
        "camisa-justice": { 
            nome: "Camisa Justice", 
            imagens: ["/camisa-justice.jpeg", "/camisa-justice2.jpeg"], 
            preco: 70.00, 
            descricao: "O vento sopra a favor de quem ousa sonhar. Dream on, para todos que se encorajam a sonhar, pois dreaming is the first act of courage.", 
            tecido: "Algodão 100%",
            tabelaMedidas: [
                    { tamanho: "P", largura: "50cm", altura: "70cm" },
                    { tamanho: "M", largura: "52cm", altura: "72cm" },
                    { tamanho: "G", largura: "54cm", altura: "74cm" },
                    { tamanho: "GG", largura: "56cm", altura: "76cm" }
                ],
            tamanhos: ["PP","P", "M", "G", "GG"],
            avaliacao: 4.3,
            numAvaliacoes: 15,
            comentarios: [
                    { usuario: "João", texto: "Ótima qualidade, recomendo!" },
                    { usuario: "Maria", texto: "Material excelente, muito confortável." }
                ]
                
            },
        "camisa-liberty": {
            nome: "Camisa Liberty", 
            imagens: ["/camisa-liberty.jpeg", "/camisa-liberty2.jpeg"], 
            preco: 70.00, 
            descricao: "O vento sopra a favor de quem ousa sonhar. Dream on, para todos que se encorajam a sonhar, pois dreaming is the first act of courage.", 
            tecido: "Algodão 100%",
            tabelaMedidas: [
                    { tamanho: "P", largura: "50cm", altura: "70cm" },
                    { tamanho: "M", largura: "52cm", altura: "72cm" },
                    { tamanho: "G", largura: "54cm", altura: "74cm" },
                    { tamanho: "GG", largura: "56cm", altura: "76cm" }
                ],
            tamanhos: ["PP","P", "M", "G", "GG"],
            avaliacao: 4.3,
            numAvaliacoes: 15,
            comentarios: [
                    { usuario: "João", texto: "Ótima qualidade, recomendo!" },
                    { usuario: "Maria", texto: "Material excelente, muito confortável." }
                ]
        },

}

     useEffect(() => {
    const produtoSelecionado = produtos[slug];
    if (produtoSelecionado) {
      setProduto(produtoSelecionado);
      setImagemPrincipal(produtoSelecionado.imagens[0]);
    }
  }, [slug]);

  if (!produto) return <div>Produto não encontrado</div>;

  const calcularFrete = async () => {
    if (!cep) {
      alert("Digite um CEP válido.");
      return;
    }

    setCarregandoFrete(true);
    setFrete(null);

    try {
      const response = await fetch("/api/melhorenvio/cotar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cep }),
      });

      if (!response.ok) {
        throw new Error("Erro na cotação de frete.");
      }

      const data = await response.json();
      setFrete(data);
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

          {/* Seleção de tamanho */}
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
    />
    <button
      onClick={calcularFrete}
      className="bg-black text-white px-4 py-2 rounded-lg"
      disabled={carregandoFrete}
    >
      {carregandoFrete ? "Calculando..." : "Calcular"}
    </button>
  </div>

  {frete && frete.length > 0 && (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Opções de frete:</h4>
      <ul className="space-y-2">
        {frete.map((opcao, idx) => (
          <li
            key={idx}
            className="border rounded-lg p-3 flex justify-between items-center"
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

  {frete && frete.length === 0 && (
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