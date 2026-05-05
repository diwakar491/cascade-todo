package com.example.todo.service;

import com.example.todo.entity.Todo;
import com.example.todo.entity.User;
import com.example.todo.repository.TodoRepository;
import com.example.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    
    @Autowired
    private TodoRepository todoRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Todo> getAllTodosByUser(Long userId) {
        return todoRepository.findByUserId(userId);
    }
    
    public Optional<Todo> getTodoByIdAndUser(Long id, Long userId) {
        if (todoRepository.existsByIdAndUserId(id, userId)) {
            return todoRepository.findById(id);
        }
        return Optional.empty();
    }
    
    public Todo createTodo(Todo todo, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        todo.setUser(user);
        return todoRepository.save(todo);
    }
    
    public Todo updateTodo(Long id, Long userId, Todo todoDetails) {
        Optional<Todo> todo = getTodoByIdAndUser(id, userId);
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
    
    public boolean deleteTodo(Long id, Long userId) {
        if (todoRepository.existsByIdAndUserId(id, userId)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Todo> getTodosByUserAndCompleted(Long userId, boolean completed) {
        return todoRepository.findByUserIdAndCompleted(userId, completed);
    }
    
    public List<Todo> getTodosByUserAndPriority(Long userId, String priority) {
        return todoRepository.findByUserIdAndPriority(userId, priority);
    }
    
    public Todo toggleTodoStatus(Long id, Long userId) {
        Optional<Todo> todo = getTodoByIdAndUser(id, userId);
        if (todo.isPresent()) {
            Todo existingTodo = todo.get();
            existingTodo.setCompleted(!existingTodo.isCompleted());
            return todoRepository.save(existingTodo);
        }
        return null;
    }
}
