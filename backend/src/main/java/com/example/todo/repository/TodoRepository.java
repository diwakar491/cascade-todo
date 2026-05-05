package com.example.todo.repository;

import com.example.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserId(Long userId);
    List<Todo> findByUserIdAndCompleted(Long userId, boolean completed);
    List<Todo> findByUserIdAndPriority(Long userId, String priority);
    List<Todo> findByUserIdAndCompletedAndPriority(Long userId, boolean completed, String priority);
    boolean existsByIdAndUserId(Long id, Long userId);
}
