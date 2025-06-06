"use client";
import { useRouter } from "next/navigation";

export default function LoginModal({ onClose }) {
    const router = useRouter();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-md relative border border-zinc-700">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                    Entrar na TI-SAJ
                </h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">E-mail</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Senha</label>
                        <input
                            type="password"
                            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700"
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold transition"
                    >
                        Entrar
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-gray-400">
                    Ainda não faz parte da TI-SAJ?{" "}
                    <button
                        onClick={() => {
                            onClose();
                            router.push("/cadastro");
                        }}
                        className="text-purple-400 hover:underline"
                    >
                        Cadastre-se e comece a vestir suas ideias
                    </button>
                </div>
            </div>
        </div>
    );
}