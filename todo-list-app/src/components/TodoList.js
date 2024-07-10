import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate(); // Utilize useNavigate para navegação

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/todo');
                setTodos(response.data);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
                toast.error('Erro ao carregar tarefas.');
            }
        };

        fetchTodos();
    }, []);

    const handleDelete = async (id) => {
        try {
            // Mostra um toast de confirmação
            toast.warn('Tem certeza que deseja excluir esta tarefa?', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: 'confirm-delete-toast'
            });

            // Aguarda a confirmação do usuário
            const confirmDelete = await new Promise((resolve) => {
                toast.update('confirm-delete-toast', {
                    render: 'Deseja confirmar a exclusão?',
                    autoClose: 3000,
                    closeButton: false,
                    onClick: () => {
                        // Caso o usuário clique no toast, exclui a tarefa
                        resolve(true);
                    },
                });
            });

            if (confirmDelete) {
                await axios.delete(`http://localhost:8080/todo/${id}`);
                setTodos(todos.filter(todo => todo.id !== id));
                console.log('Tarefa excluída com sucesso!');
                toast.success('Tarefa excluída com sucesso!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                // Cancela a exclusão se o usuário não confirmar
                toast.info('Exclusão cancelada.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
            toast.error('Erro ao excluir tarefa.');
        }
    };

    const handleEdit = (id, name) => {
        // Use navigate para redirecionar para a página de edição
        // O parâmetro ":id" e ":name" serão passados na URL
        navigate(`/edit/${id}/${encodeURIComponent(name)}`);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <Link to="/add" className="btn btn-primary mt-3">
                Adicionar Tarefa
            </Link>
            <ul className="list-group">
                {todos.map(todo => (
                    <li key={todo.id} className="list-group-item">
                        <div>
                            <h5 className="card-title">Nome: {todo.name}</h5>
                            <p className="card-text">Descrição: {todo.description}</p>
                            <div className="btn-group" role="group" aria-label="Ações">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(todo.id)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} /> Excluir
                                </button>
                                <button
                                    className="btn btn-primary btn-sm ml-2"
                                    onClick={() => handleEdit(todo.id, todo.name)}
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Editar
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

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

export default TodoList;
