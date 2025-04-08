"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Revisao() {
    const router = useRouter();
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

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Endereço de Entrega</h1>
            
            <form onSubmit={(e) => {
                e.preventDefault();
                localStorage.setItem("endereco", JSON.stringify(endereco)); 
                router.push("/revisao-final");
            }}>
                {/* Rua */}
                <div className="mb-4">
                    <label className="block text-gray-700">Rua:</label>
                    <input 
                        type="text" 
                        value={endereco.rua} 
                        onChange={(e) => setEndereco({...endereco, rua: e.target.value})} 
                        className="w-full p-2 border rounded"
                        required 
                    />
                </div>

                {/* Número e Bairro */}
                <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">Número:</label>
                        <input 
                            type="text" 
                            value={endereco.numero} 
                            onChange={(e) => setEndereco({...endereco, numero: e.target.value})} 
                            className="w-full p-2 border rounded"
                            required 
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700">Bairro:</label>
                        <input 
                            type="text" 
                            value={endereco.bairro} 
                            onChange={(e) => setEndereco({...endereco, bairro: e.target.value})} 
                            className="w-full p-2 border rounded"
                            required 
                        />
                    </div>
                </div>

                {/* Complemento */}
                <div className="mb-4">
                    <label className="block text-gray-700">Complemento (opcional):</label>
                    <input 
                        type="text" 
                        value={endereco.complemento} 
                        onChange={(e) => setEndereco({...endereco, complemento: e.target.value})} 
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Cidade e Estado */}
                <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">Cidade:</label>
                        <input 
                            type="text" 
                            value={endereco.cidade} 
                            onChange={(e) => setEndereco({...endereco, cidade: e.target.value})} 
                            className="w-full p-2 border rounded"
                            required 
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700">Estado:</label>
                        <input 
                            type="text" 
                            value={endereco.estado} 
                            onChange={(e) => setEndereco({...endereco, estado: e.target.value})} 
                            className="w-full p-2 border rounded"
                            required 
                        />
                    </div>
                </div>

                {/* País e CEP */}
                <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">País:</label>
                        <input 
                            type="text" 
                            value={endereco.pais} 
                            onChange={(e) => setEndereco({...endereco, pais: e.target.value})} 
                            className="w-full p-2 border rounded"
                            required 
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700">CEP:</label>
                        <input 
                            type="text" 
                            value={endereco.cep} 
                            onChange={(e) => setEndereco({...endereco, cep: e.target.value})} 
                            className="w-full p-2 border rounded"
                            required 
                        />
                    </div>
                </div>

                {/* Telefone */}
                <div className="mb-4">
                    <label className="block text-gray-700">Telefone:</label>
                    <input 
                        type="text" 
                        value={endereco.telefone} 
                        onChange={(e) => setEndereco({...endereco, telefone: e.target.value})} 
                        className="w-full p-2 border rounded"
                        required 
                    />
                </div>

                {/* Botão de continuar */}
                <div className="mt-6 flex justify-end">
                    <button 
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-600"
                    >
                        Continuar
                    </button>
                </div>
            </form>
        </div>
    );
}