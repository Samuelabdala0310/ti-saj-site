"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./revisao.css";

export default function Revisao() {
  const router = useRouter();

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    cidade: "",
    estado: "",
    pais: "",
    cep: "",
    telefone: "",
  });

  const [carregado, setCarregado] = useState(false); // Para garantir que estamos no cliente

  useEffect(() => {
  const carregarDados = async () => {
    try {
      const res = await fetch("/estados-cidades.json");
      const dados = await res.json();
      setEstados(dados.estados); // <-- Aqui é a correção

      if (typeof window !== "undefined") {
        const dadosSalvos = localStorage.getItem("endereco");
        if (dadosSalvos) {
          const enderecoSalvo = JSON.parse(dadosSalvos);
          setEndereco(enderecoSalvo);

          const estadoSelecionado = dados.estados.find( // <-- Aqui também
            (estado) => estado.sigla === enderecoSalvo.estado
          );
          if (estadoSelecionado) {
            setCidades(estadoSelecionado.cidades);
          }
        }
      }

      setCarregado(true);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  carregarDados();
}, []);

  const handleEstadoChange = (siglaEstado) => {
    const estadoSelecionado = estados.find(
      (estado) => estado.sigla === siglaEstado
    );

    setEndereco((prev) => ({
      ...prev,
      estado: siglaEstado,
      cidade: "",
    }));

    setCidades(estadoSelecionado ? estadoSelecionado.cidades : []);
  };

  const inputStyle =
    "w-full p-3 border rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500";

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    if (numeros.length < 3) return numeros;
    if (numeros.length < 7)
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  };

  const formatarCEP = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 8);
    if (numeros.length <= 5) return numeros;
    return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cepNumeros = endereco.cep.replace(/\D/g, "");
    const telefoneNumeros = endereco.telefone.replace(/\D/g, "");

    if (cepNumeros.length !== 8) {
      alert("CEP inválido. Deve conter 8 dígitos.");
      return;
    }

    if (telefoneNumeros.length !== 11) {
      alert("Telefone inválido. Deve conter 11 dígitos.");
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("endereco", JSON.stringify(endereco));
    }

    alert("Endereço salvo com sucesso!");
    router.push("/revisao-final");
  };

  // Evita renderizar no SSR antes de carregar o estado no client
  if (!carregado) return null;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Revisão de Endereço</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rua */}
        <div>
          <label className="block mb-1">Rua</label>
          <input
            type="text"
            className={inputStyle}
            value={endereco.rua}
            onChange={(e) =>
              setEndereco({ ...endereco, rua: e.target.value })
            }
            required
          />
        </div>

        {/* Número */}
        <div>
          <label className="block mb-1">Número</label>
          <input
            type="text"
            className={inputStyle}
            value={endereco.numero}
            onChange={(e) =>
              setEndereco({ ...endereco, numero: e.target.value })
            }
            required
          />
        </div>

        {/* Bairro */}
        <div>
          <label className="block mb-1">Bairro</label>
          <input
            type="text"
            className={inputStyle}
            value={endereco.bairro}
            onChange={(e) =>
              setEndereco({ ...endereco, bairro: e.target.value })
            }
            required
          />
        </div>

        {/* Complemento */}
        <div>
          <label className="block mb-1">Complemento</label>
          <input
            type="text"
            className={inputStyle}
            value={endereco.complemento}
            onChange={(e) =>
              setEndereco({ ...endereco, complemento: e.target.value })
            }
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block mb-1">Estado</label>
          <select
            className={inputStyle}
            value={endereco.estado}
            onChange={(e) => handleEstadoChange(e.target.value)}
            required
          >
            <option value="">Selecione o estado</option>
            {estados.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Cidade */}
        <div>
          <label className="block mb-1">Cidade</label>
          <select
            className={inputStyle}
            value={endereco.cidade}
            onChange={(e) =>
              setEndereco({ ...endereco, cidade: e.target.value })
            }
            required
            disabled={!endereco.estado}
          >
            <option value="">Selecione a cidade</option>
            {cidades.map((cidade, index) => (
              <option key={index} value={cidade}>
                {cidade}
              </option>
            ))}
          </select>
        </div>

        {/* País */}
        <div>
          <label className="block mb-1">País</label>
          <input
            type="text"
            className={inputStyle}
            value={endereco.pais}
            onChange={(e) =>
              setEndereco({ ...endereco, pais: e.target.value })
            }
            required
          />
        </div>

        {/* CEP */}
        <div>
          <label className="block mb-1">CEP</label>
          <input
            type="text"
            className={inputStyle}
            value={formatarCEP(endereco.cep)}
            onChange={(e) =>
              setEndereco({ ...endereco, cep: e.target.value })
            }
            inputMode="numeric"
            placeholder="Digite 8 números"
            required
          />
        </div>

        {/* Telefone */}
        <div>
          <label className="block mb-1">Telefone</label>
          <input
            type="text"
            className={inputStyle}
            value={formatarTelefone(endereco.telefone)}
            onChange={(e) =>
              setEndereco({ ...endereco, telefone: e.target.value })
            }
            inputMode="numeric"
            placeholder="Digite 11 números"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Confirmar Endereço
        </button>
      </form>
    </div>
  );
}