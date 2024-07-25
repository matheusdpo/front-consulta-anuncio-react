import React, { useState } from 'react';
import Modal from 'react-modal';

// Configura o elemento raiz para o Modal
Modal.setAppElement('#root');

function PublishForm() {
  // Estado para armazenar os valores dos campos do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [imagem, setImagem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Função chamada ao submeter o formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Cria um objeto FormData para enviar os dados do formulário
    const formData = new FormData();
    formData.append('titulo', nome);
    formData.append('descricao', descricao);
    formData.append('valor', valor);
    if (imagem) {
      formData.append('file', imagem);
    }

    try {
      // Faz a requisição POST para o servidor
      const response = await fetch('http://192.168.1.13:3500/anuncio/insereAnuncio', {
        method: 'POST',
        body: formData,
        // Não defina o Content-Type, o navegador faz isso automaticamente
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      // Atualiza o estado para exibir a mensagem de sucesso no modal
      setModalMessage('Anúncio publicado com sucesso!');
      setModalIsOpen(true);

      // Limpa os campos do formulário
      setNome('');
      setDescricao('');
      setValor('');
      setImagem(null);
    } catch (error) {
      // Atualiza o estado para exibir a mensagem de erro no modal
      setModalMessage(`Erro ao publicar anúncio: ${error.message}`);
      setModalIsOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Formulário de publicação */}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>
        <label>
          Valor:
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </label>
        <label>
          Imagem:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files[0])}
            required
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Publicando...' : 'Publicar Anúncio'}
        </button>
      </form>

      {/* Modal para mostrar mensagens */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mensagem"
      >
        <h2>{modalMessage}</h2>
        <button onClick={() => setModalIsOpen(false)}>Fechar</button>
      </Modal>
    </>
  );
}

export default PublishForm;
