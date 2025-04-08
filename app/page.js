import Footer from "../components/Footer";
import Link from "next/link";
import "../components/Footer.css";

export default function HeroSection() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen text-center text-white bg-cover bg-center"
      style={{ backgroundImage: '/bp.jpg', }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      <div className="relative z-20 px-4">
        <h1 className="text-8xl font-extrabold text-white mb-10">TI-SAJ</h1>
        <h2 className="text-2xl font-bold mt-2">
          Vista Sua Ideia. Expresse sua essência.
        </h2>
        <p className="text-lg mt-2 max-w-xl mx-auto">
          Criamos camisetas que vão além do estilo. Nossa missão é transformar ideias em identidade.
        </p>
        <Link href="/loja">
          <button className="mt-6 bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500">
            Ver coleção
          </button>
        </Link>
      </div>
    </div>
  );
}
