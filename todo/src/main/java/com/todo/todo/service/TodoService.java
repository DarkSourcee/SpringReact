package com.todo.todo.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.todo.todo.entity.Todo;
import com.todo.todo.repository.TodoRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> deleteAll() {
        todoRepository.deleteAll();
        return findAll();
    }

    public List<Todo> create(Todo todo) {
        validateTodoForCreateOrUpdate(todo);

        Integer id = (int) todo.getId();

        if (id != null && todo.getId() != 0) {
            throw new IllegalArgumentException("Não é possível criar uma tarefa com ID pré-existente.");
        }

        List<Todo> existingTodosWithName = findAllName(todo.getName());
        if (!existingTodosWithName.isEmpty()) {
            throw new IllegalArgumentException("Tarefa já existe na base de dados.");
        }

        todoRepository.save(todo);
        return findAll();
    }

    public List<Todo> delete(Long id) {
        todoRepository.deleteById(id);
        return findAll();
    }

    public List<Todo> update(Todo todo) {
        validateTodoForCreateOrUpdate(todo);

        Integer id = (int) todo.getId();

        if (id == null || todo.getId() == 0 || !todoRepository.existsById(todo.getId())) {
            throw new IllegalArgumentException("Tarefa não encontrada para atualização.");
        }

        todoRepository.save(todo);
        return findAll();
    }

    public List<Todo> findAll() {
        Sort sort = Sort.by(Sort.Order.desc("priority"), Sort.Order.asc("name"));
        return todoRepository.findAll(sort);
    }

    private void validateTodoForCreateOrUpdate(Todo todo) {
        validateCamposObrigatorios(todo);
        validatePrioridadeInteira(todo);
    }

    private void validateCamposObrigatorios(Todo todo) {
        Integer priority = todo.getPriority();
        if (todo.getName() == null || todo.getDescription() == null || priority == null) {
            throw new IllegalArgumentException("Campos obrigatórios não preenchidos.");
        }
    }

    private void validatePrioridadeInteira(Todo todo) {
        Integer priority = todo.getPriority();
        if (priority != null && priority < 0) {
            throw new IllegalArgumentException("A prioridade deve ser um número inteiro não negativo.");
        }
    }    

    public List<Todo> findAllName(String name) {
        List<Todo> todos = findAll();
        List<Todo> todosWithName = new ArrayList<>();

        for (Todo todo : todos) {
            if (todo.getName().equals(name)) {
                todosWithName.add(todo);
            }
        }

        return todosWithName;
    }
}
