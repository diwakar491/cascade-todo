package com.example.todo.service;

import com.example.todo.entity.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    
    @Autowired
    private TodoRepository todoRepository;
    
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }
    
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }
    
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }
    
    public Todo updateTodo(Long id, Todo todoDetails) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isPresent()) {
            Todo existingTodo = todo.get();
            existingTodo.setTitle(todoDetails.getTitle());
            existingTodo.setDescription(todoDetails.getDescription());
            existingTodo.setCompleted(todoDetails.isCompleted());
            existingTodo.setPriority(todoDetails.getPriority());
            return todoRepository.save(existingTodo);
        }
        return null;
    }
    
    public boolean deleteTodo(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Todo> getTodosByCompleted(boolean completed) {
        return todoRepository.findByCompleted(completed);
    }
    
    public List<Todo> getTodosByPriority(String priority) {
        return todoRepository.findByPriority(priority);
    }
    
    public Todo toggleTodoStatus(Long id) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isPresent()) {
            Todo existingTodo = todo.get();
            existingTodo.setCompleted(!existingTodo.isCompleted());
            return todoRepository.save(existingTodo);
        }
        return null;
    }
}
