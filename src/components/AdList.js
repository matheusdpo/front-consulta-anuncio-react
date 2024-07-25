import React, { useEffect, useState } from 'react';

function AdList() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.13:3500/anuncio/capturaAnuncios')
      .then((response) => response.json())
      .then((data) => setAds(data))
      .catch((error) => console.error('Erro ao carregar anúncios:', error));
  }, []);

  return (
    <div id="adsContainer">
      {ads.map((ad) => (
        <div className="ad" key={ad.id}>
          <img src={`data:image/jpeg;base64,${ad.imagem.split(',')[1]}`} alt={ad.nome} />
          <h2>{ad.nome}</h2>
          <p>{ad.descricao}</p>
          <p className="price">R$ {ad.valor}</p>
        </div>
      ))}
    </div>
  );
}

export default AdList;
