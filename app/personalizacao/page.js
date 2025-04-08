'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';



export default function Personalizacao() {
  const [texto, setTexto] = useState('');
  const [corTexto, setCorTexto] = useState('#000000');
  const [fonte, setFonte] = useState('Arial');
  const [tamanhoTexto, setTamanhoTexto] = useState(20);
  const [imagem, setImagem] = useState(null);
  const [frente, setFrente] = useState(true);

  const textoRef = useRef(null);
  const imagemRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagem(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const iniciarArraste = (e, ref) => {
    const elem = ref.current;
    const startX = e.clientX || e.touches[0].clientX;
    const startY = e.clientY || e.touches[0].clientY;
    const rect = elem.getBoundingClientRect();

    const offsetX = startX - rect.left;
    const offsetY = startY - rect.top;

    const mover = (eMove) => {
      const x = (eMove.clientX || eMove.touches[0].clientX) - offsetX;
      const y = (eMove.clientY || eMove.touches[0].clientY) - offsetY;
      elem.style.left = `${x}px`;
      elem.style.top = `${y}px`;
    };

    const parar = () => {
      document.removeEventListener('mousemove', mover);
      document.removeEventListener('touchmove', mover);
      document.removeEventListener('mouseup', parar);
      document.removeEventListener('touchend', parar);
    };

    document.addEventListener('mousemove', mover);
    document.addEventListener('touchmove', mover);
    document.addEventListener('mouseup', parar);
    document.addEventListener('touchend', parar);
  };

  const imagemMockup = frente ? '/camiseta-frente.png' : '/camiseta-costas.png';

  return (
    <div className="personalizacao-container">
      <h2>Personalize sua camiseta</h2>

      <button className="toggle-costas" onClick={() => setFrente(!frente)}>
        {frente ? 'Mostrar Costas' : 'Mostrar Frente'}
      </button>

      <div className="opcoes">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite o texto"
        />

        <select onChange={(e) => setFonte(e.target.value)} value={fonte}>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier</option>
          <option value="Georgia">Georgia</option>
        </select>

        <input
          type="color"
          value={corTexto}
          onChange={(e) => setCorTexto(e.target.value)}
        />

        <input
          type="range"
          min="10"
          max="60"
          value={tamanhoTexto}
          onChange={(e) => setTamanhoTexto(parseInt(e.target.value))}
        />

        <div className="upload-imagem">
          <label htmlFor="upload">Enviar imagem</label>
          <input type="file" id="upload" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>

      <div className="mockup-container">
        <div className="mockup">
          <Image
            src={imagemMockup}
            alt="Camiseta"
            width={300}
            height={400}
            className="mockup-image"
          />

          <div className="area-personalizacao">
            {texto && (
              <p
                ref={textoRef}
                onMouseDown={(e) => iniciarArraste(e, textoRef)}
                onTouchStart={(e) => iniciarArraste(e, textoRef)}
                className="texto-mockup"
                style={{
                  fontFamily: fonte,
                  color: corTexto,
                  fontSize: `${tamanhoTexto}px`,
                  position: 'absolute',
                  top: '0px',
                  left: '0px',
                }}
              >
                {texto}
              </p>
            )}

            {imagem && (
              <img
                ref={imagemRef}
                onMouseDown={(e) => iniciarArraste(e, imagemRef)}
                onTouchStart={(e) => iniciarArraste(e, imagemRef)}
                src={imagem}
                alt="Imagem personalizada"
                className="imagem-mockup"
                style={{
                  position: 'absolute',
                  top: '80px',
                  left: '40px',
                  maxWidth: '100px',
                  maxHeight: '100px',
                }}
              />
            )}
          </div>
        </div>
      </div>

      <button className="comprar">Comprar</button>
    </div>
  );
}