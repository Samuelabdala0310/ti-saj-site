export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      
      {/* Introdução */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-400">Sobre a TI-SAJ</h1>
        <p className="text-lg text-gray-300 max-w-3xl mt-4">
          A TI-SAJ nasceu da paixão por expressão e estilo, trazendo peças únicas que combinam conforto e identidade.
        </p>
      </div>

      {/* Container principal */}
      <div className="max-w-5xl w-full flex flex-col gap-12">
        
        {/* História da marca */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-300">Nossa História</h2>
          <p className="text-gray-300 mt-3">
            Criada com a ideia de unir moda e significado, a TI-SAJ surgiu para oferecer camisas que vão além do básico. Cada peça reflete uma ideia, um pensamento e um estilo de vida.
          </p>
        </div>

        {/* Missão, Visão e Valores */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-300">Missão, Visão e Valores</h2>
          <ul className="mt-3 space-y-2 text-gray-300">
            <li><strong className="text-indigo-400">Missão:</strong> Criar roupas que expressem ideias e personalidades.</li>
            <li><strong className="text-indigo-400">Visão:</strong> Ser referência no segmento de moda com propósito.</li>
            <li><strong className="text-indigo-400">Valores:</strong> Criatividade, autenticidade e qualidade.</li>
          </ul>
        </div>

        {/* Diferenciais */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-300">O que nos torna únicos?</h2>
          <p className="text-gray-300 mt-3">
            Produzimos peças exclusivas, com um design minimalista e frases que inspiram. Cada detalhe é pensado para quem quer vestir mais do que uma simples camisa.
          </p>
        </div>

        {/* Depoimentos */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-indigo-300">O que dizem sobre nós</h2>
          <div className="mt-3">
            <p className="italic text-gray-300">
              "As camisas da TI-SAJ são incríveis! Conforto e estilo em uma peça só." - <span className="text-indigo-400">Cliente satisfeito</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}