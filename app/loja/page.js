import Image from "next/image";
import Link from "next/link";

export default function Loja() {
    const produtos = [
        { nome: "Camisa Ekleticus", imagem: "/camisa-ekleticus.png", preco: "R$ 35,00" },
        { nome: "Camiseta Emyeges", imagem: "/camisa-emyeges.png", preco: "R$ 40,00" },
        { nome: "Camisa Angyal", imagem: "/camisa-angyal.png", preco: "R$ 60,00" },
        { nome: "Camisa Lihtsus", imagem: "/camisa-lithsus.png", preco: "R$ 50,00" },
        { nome: "Camisa Memento", imagem: "/camisa-memento.png", preco: "R$ 80,00" },
        { nome: "Camisa Royal Fire", imagem: "/camisa-royalfire.png", preco: "R$ 55,00" },
        { nome: "Camisa Dream On", imagem: "/camisa-dreamon.png", preco: "R$ 65,00" },
        { nome: "Camisa Justice", imagem: "/camisa-justice.jpeg", preco: "R$ 70,00" },
        { nome: "Camisa Liberty", imagem: "/camisa-liberty.jpeg", preco: "R$70,00"},
        { nome: "Moletom Ascend", imagem: "/moletom-ascend.jpeg", preco: "R$149,99"}
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {produtos.map((produto, index) => {
                const slug = produto.nome.toLowerCase().replace(/\s+/g, "-");

                return (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <img src={produto.imagem} alt={produto.nome} className="h-full object-contain" />
                        </div>
                        {/* Agora o nome aparecerá em preto */}
                        <h3 className="text-lg font-semibold mt-2 text-black">{produto.nome}</h3>
                        <p className="text-gray-600">{produto.preco}</p>
                        <Link href={`/produto/${slug}`}>
                            <button className="mt-4 bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500">
                                Comprar
                            </button>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}