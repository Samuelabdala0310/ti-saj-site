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
    const [avaliacaoUsuario, setAvaliacaoUsuario] = useState(0);
    const [abaAtiva, setAbaAtiva] = useState("descricao");
    const [frete, setFrete] = useState(null);
    const [cep, setCep] = useState("");
    

    useEffect(() => {
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
            tamanhos: ["P", "M", "G", "GG"],
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
            tamanhos: ["P", "M", "G", "GG"],
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
            tamanhos: ["P", "M", "G", "GG"],
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
            tamanhos: ["P", "M", "G", "GG"],
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
            tamanhos: ["P", "M", "G", "GG"],
            avaliacao: 4.3,
            numAvaliacoes: 15,
            comentarios: [
                    { usuario: "João", texto: "Ótima qualidade, recomendo!" },
                    { usuario: "Maria", texto: "Material excelente, muito confortável." }
                ]
    },
}

    if (slug && produtos[slug]) {
        setProduto(produtos[slug]);
        setImagemPrincipal(produtos[slug].imagens[0]);
    }
}, [slug]);

function handleAdicionarAoCarrinho() {
    if (!tamanhoSelecionado) {
        alert("Por favor, selecione um tamanho antes de adicionar ao carrinho!");
        return;
    }
    adicionarAoCarrinho({ ...produto, quantidade, tamanho: tamanhoSelecionado });
    alert(`${produto.nome} (${tamanhoSelecionado}) foi adicionado ao carrinho!`);
}

function calcularFrete() {
    if (!cep) {
        alert("Digite um CEP válido!");
        return;
    }
    setFrete(`Frete estimado: R$ ${(Math.random() * 20 + 5).toFixed(2)}`);
}

function handleAvaliacao(novaAvaliacao) {
    setAvaliacaoUsuario(novaAvaliacao);
    alert(`Você avaliou com ${novaAvaliacao} estrelas!`);
}

if (!produto) {
    return <p className="text-center text-red-500 mt-10">Carregando produto...</p>;
}

return (
    <div className="container mx-auto p-6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Imagens */}
        <div className="flex flex-col items-center">
            <Image src={imagemPrincipal} alt={produto.nome} width={500} height={500} className="rounded-lg shadow-lg" />
            <div className="mt-4 flex space-x-2">
                {produto.imagens.map((img, index) => (
                    <Image
                        key={index}
                        src={img}
                        alt={`Imagem ${index + 1}`}
                        width={80}
                        height={80}
                        className="border rounded-md cursor-pointer hover:opacity-75 transition"
                        onClick={() => setImagemPrincipal(img)}
                    />
                ))}
            </div>
        </div>

        {/* Informações do Produto */}
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{produto.nome}</h1>
            <p className="text-3xl text-green-600 font-bold mt-2">R$ {produto.preco.toFixed(2)}</p>

            {/* Avaliação */}
            <div className="flex items-center mt-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(produto.avaliacao) ? "text-yellow-500" : "text-gray-300"} />
                ))}
                <span className="ml-2 text-gray-700 text-lg">{Number(produto.avaliacao).toFixed(1)} / 5</span>
            </div>

            {/* Avaliação do usuário */}
            <div className="mt-4">
                <p className="font-semibold">Avalie este produto:</p>
                <div className="flex space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`cursor-pointer ${i < avaliacaoUsuario ? "text-yellow-500" : "text-gray-300"}`}
                            onClick={() => handleAvaliacao(i + 1)}
                        />
                    ))}
                </div>
            </div>

            {/* Seleção de tamanho */}
            <div className="mt-4">
                <label className="font-semibold">Escolha o tamanho:</label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                    {produto.tamanhos.map((tamanho) => (
                        <button
                            key={tamanho}
                            className={`px-4 py-2 border rounded-md transition ${
                                tamanhoSelecionado === tamanho ? "bg-blue-500 text-white border-blue-700" : "border-gray-500"
                            }`}
                            onClick={() => setTamanhoSelecionado(tamanho)}
                        >
                            {tamanho}
                        </button>
                    ))}
                </div>
            </div>

            {/* Botão de adicionar ao carrinho */}
            <button
                onClick={handleAdicionarAoCarrinho}
                className="mt-6 flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition"
            >
                <FaShoppingCart className="mr-2" /> Adicionar ao Carrinho
            </button>

            {/* Cálculo de Frete */}
            <div className="mt-6">
                <label className="font-semibold flex items-center">
                    <FaTruck className="mr-2" /> Calcular Frete:
                </label>
                <div className="flex mt-2">
                    <input
                        type="text"
                        placeholder="Digite seu CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        className="border border-gray-500 p-2 rounded-l-md w-full"
                    />
                    <button
                        onClick={calcularFrete}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
                    >
                        Calcular
                    </button>
                </div>
                {frete && <p className="text-gray-700 mt-2">{frete}</p>}
            </div>

            {/* Descrição e Comentários */}
            <div className="mt-6">
                <div className="flex border-b">
                    <button className={`py-2 px-4 ${abaAtiva === "descricao" ? "border-b-2 border-blue-500" : ""}`} onClick={() => setAbaAtiva("descricao")}>
                        Descrição
                    </button>
                    <button className={`py-2 px-4 ${abaAtiva === "comentarios" ? "border-b-2 border-blue-500" : ""}`} onClick={() => setAbaAtiva("comentarios")}>
                        Comentários
                    </button>
                </div>
                {abaAtiva === "descricao" && (
                    <div className="text-gray-700 mt-2">
                        <p><strong>Tecido:</strong> {produto.tecido}</p>
                        <table className="border mt-2 w-full text-left">
                            <thead>
                                <tr className="border-b bg-gray-100">
                                    <th className="p-2">Tamanho</th>
                                    <th className="p-2">Largura</th>
                                    <th className="p-2">Altura</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produto.tabelaMedidas.map((medida, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">{medida.tamanho}</td>
                                        <td className="p-2">{medida.largura}</td>
                                        <td className="p-2">{medida.altura}</td>
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