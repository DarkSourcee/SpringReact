import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTodoForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmMessage, setShowConfirmMessage] = useState(false); // Estado para controlar a exibição da mensagem de confirmação

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/todo', {
        name,
        description,
        completed: false,
        priority: 1,
      });

      console.log('Resposta da API:', response.data);

      setName('');
      setDescription('');

      // Exibir toast de sucesso
      toast.success('Tarefa adicionada com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Exibir mensagem de confirmação para adicionar outra tarefa
      setShowConfirmMessage(true);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);

      // Acessar a mensagem de erro retornada pelo servidor
      const errorMessage = error.response.data.message || 'Erro ao adicionar tarefa. Por favor, tente novamente.';

      // Exibir toast de erro
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleConfirmAddAnother = () => {
    setShowConfirmMessage(false);
    setName('');
    setDescription('');
  };

  const handleCancelAddAnother = () => {
    setShowConfirmMessage(false);
    window.location.href = '/';
  };

  return (
    <div>
      <h2>Adicionar Nova Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar
        </button>
      </form>

      {/* Mensagem de confirmação para adicionar outra tarefa */}
      {showConfirmMessage && (
        <div className="alert alert-info mt-3" role="alert">
          Deseja cadastrar uma nova tarefa?
          <button className="btn btn-success ml-2" onClick={handleConfirmAddAnother}>
            Sim
          </button>
          <button className="btn btn-secondary ml-2" onClick={handleCancelAddAnother}>
            Não
          </button>
        </div>
      )}

      {/* Componente ToastContainer do react-toastify */}
      <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddTodoForm;
