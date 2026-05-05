package com.example.todo.controller;

import com.example.todo.entity.Todo;
import com.example.todo.security.services.UserDetailsImpl;
import com.example.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "*")
public class TodoController {
    
    @Autowired
    private TodoService todoService;
    
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(todoService.getAllTodosByUser(userDetails.getId()));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return todoService.getTodoByIdAndUser(id, userDetails.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Todo createdTodo = todoService.createTodo(todo, userDetails.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTodo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Todo updatedTodo = todoService.updateTodo(id, userDetails.getId(), todo);
        if (updatedTodo != null) {
            return ResponseEntity.ok(updatedTodo);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (todoService.deleteTodo(id, userDetails.getId())) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/completed/{completed}")
    public ResponseEntity<List<Todo>> getTodosByCompleted(@PathVariable boolean completed, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(todoService.getTodosByUserAndCompleted(userDetails.getId(), completed));
    }
    
    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Todo>> getTodosByPriority(@PathVariable String priority, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(todoService.getTodosByUserAndPriority(userDetails.getId(), priority));
    }
    
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggleTodoStatus(@PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Todo updatedTodo = todoService.toggleTodoStatus(id, userDetails.getId());
        if (updatedTodo != null) {
            return ResponseEntity.ok(updatedTodo);
        }
        return ResponseEntity.notFound().build();
    }
}
