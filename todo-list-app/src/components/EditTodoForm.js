import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  const [todo, setTodo] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/todo/${id}`);
        setTodo(response.data);
      } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleUpdateName = async () => {
    try {
      await axios.put(`http://localhost:8080/todo/${id}/updateName`, { name: todo.name });
      console.log('Nome da tarefa atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar nome da tarefa:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/todo/${id}`, todo);
      console.log('Tarefa atualizada com sucesso!');
      navigate('/'); // Redireciona para a lista de tarefas após a atualização
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prevTodo => ({
      ...prevTodo,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Editar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={todo.name}
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={handleUpdateName}
          >
            Atualizar Nome
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={todo.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Atualizar Tarefa
        </button>
      </form>
    </div>
  );
};

export default EditTodoForm;
