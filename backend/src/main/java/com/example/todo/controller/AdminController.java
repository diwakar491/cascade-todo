package com.example.todo.controller;

import com.example.todo.entity.Todo;
import com.example.todo.entity.User;
import com.example.todo.repository.TodoRepository;
import com.example.todo.repository.UserRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{userId}/todos")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Todo>> getUserTodos(@PathVariable Long userId) {
        List<Todo> todos = todoRepository.findByUserId(userId);
        return ResponseEntity.ok(todos);
    }

    @DeleteMapping("/todos/{todoId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAnyTodo(@PathVariable Long todoId) {
        if (todoRepository.existsById(todoId)) {
            todoRepository.deleteById(todoId);
            return ResponseEntity.ok("Todo deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/todos/{todoId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateAnyTodo(@PathVariable Long todoId, @RequestBody Todo todoDetails) {
        Todo todo = todoRepository.findById(todoId)
                .orElse(null);

        if (todo == null) {
            return ResponseEntity.notFound().build();
        }

        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setCompleted(todoDetails.isCompleted());
        todo.setPriority(todoDetails.getPriority());

        Todo updatedTodo = todoRepository.save(todo);
        return ResponseEntity.ok(updatedTodo);
    }
}
