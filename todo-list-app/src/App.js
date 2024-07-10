import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import EditTodoForm from './components/EditTodoForm'; // Certifique-se de importar corretamente

function App() {
  return (
    <Router>
      <div className="App container mt-4">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/add" element={<AddTodoForm />} />
          <Route path="/edit/:id/:name" element={<EditTodoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
