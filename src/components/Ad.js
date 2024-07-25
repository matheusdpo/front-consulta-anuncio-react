import React from 'react';

function Ad({ anuncio }) {
  return (
    <div className="ad">
      <img src={anuncio.imagem} alt={anuncio.nome} />
      <h2>{anuncio.nome}</h2>
      <p>{anuncio.descricao}</p>
      <p className="price">R$ {anuncio.valor}</p>
    </div>
  );
}

export default Ad;
