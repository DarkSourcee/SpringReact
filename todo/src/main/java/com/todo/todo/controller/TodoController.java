package com.todo.todo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todo.entity.Todo;
import com.todo.todo.service.TodoService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/todo")
public class TodoController {
    private TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    List<Todo> created(@RequestBody Todo todo) {
        return todoService.create(todo);
    }

    @PutMapping
    List<Todo> update(@RequestBody Todo todo) {
        return todoService.update(todo);
    }

    @DeleteMapping("{id}")
    List<Todo> delete(@PathVariable("id") Long id) {
        return todoService.delete(id);
    }

    @DeleteMapping
    List<Todo> deleteAll() {
        return todoService.deleteAll();
    }

    @GetMapping
    List<Todo> findAll() {
        return todoService.findAll();
    }

    @GetMapping("/{name}")
    List<Todo> findAllName(@PathVariable("name") String name) {
        return todoService.findAllName(name);
    }    
}
