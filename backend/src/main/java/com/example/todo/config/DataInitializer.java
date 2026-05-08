package com.example.todo.config;

import com.example.todo.entity.Todo;
import com.example.todo.entity.User;
import com.example.todo.repository.TodoRepository;
import com.example.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class DataInitializer implements CommandLineRunner {
    
    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        logger.info("========== DATA INITIALIZER STARTING ==========");
        
        // Create admin user if not exists
        User admin = userRepository.findByUsername("admin").orElse(null);
        if (admin == null) {
            String encodedPassword = passwordEncoder.encode("password123");
            logger.info("Creating admin user with encoded password: {}", encodedPassword);
            admin = new User("admin", "admin@example.com", encodedPassword);
            admin.setRole("ROLE_ADMIN");
            admin = userRepository.save(admin);
            logger.info("✓ Admin user created with ID: {}, Role: {}", admin.getId(), admin.getRole());
        } else {
            logger.info("Admin user already exists with ID: {}, Role: {}", admin.getId(), admin.getRole());
            // Ensure role is correct
            if (!"ROLE_ADMIN".equals(admin.getRole())) {
                admin.setRole("ROLE_ADMIN");
                userRepository.save(admin);
                logger.info("✓ Admin role updated to ROLE_ADMIN");
            }
        }

        // Create regular users if not exist
        User john = userRepository.findByUsername("john_doe").orElse(null);
        if (john == null) {
            john = new User("john_doe", "john@example.com", 
                passwordEncoder.encode("password123"));
            john.setRole("ROLE_USER");
            john = userRepository.save(john);
            logger.info("✓ User john_doe created");
        }

        User jane = userRepository.findByUsername("jane_smith").orElse(null);
        if (jane == null) {
            jane = new User("jane_smith", "jane@example.com", 
                passwordEncoder.encode("password123"));
            jane.setRole("ROLE_USER");
            jane = userRepository.save(jane);
            logger.info("✓ User jane_smith created");
        }

        // Create todos for admin
        createTodoIfNotExists(1L, "Buy groceries", "Milk, eggs, bread, and vegetables", 
            false, "MEDIUM", admin);
        createTodoIfNotExists(2L, "Complete project report", "Finish the quarterly project report by Friday", 
            false, "HIGH", admin);
        createTodoIfNotExists(3L, "Call dentist", "Schedule appointment for checkup", 
            false, "LOW", admin);
        createTodoIfNotExists(4L, "Workout", "Go to gym for 1 hour", 
            true, "MEDIUM", admin);

        // Create todos for john
        createTodoIfNotExists(5L, "Plan vacation", "Research destinations for summer trip", 
            false, "HIGH", john);
        createTodoIfNotExists(6L, "Buy birthday gift", "Get something for mom's birthday", 
            false, "MEDIUM", john);
        createTodoIfNotExists(7L, "Schedule meeting", "Team sync for next week", 
            true, "LOW", john);
        createTodoIfNotExists(8L, "Grocery shopping", "Weekly grocery run", 
            false, "LOW", john);

        logger.info("========== DATA INITIALIZATION COMPLETE ==========");
        logger.info("Admin login: username=admin, password=password123, role=ROLE_ADMIN");
    }

    private void createTodoIfNotExists(Long id, String title, String description, 
            boolean completed, String priority, User user) {
        if (!todoRepository.existsById(id)) {
            Todo todo = new Todo();
            todo.setId(id);
            todo.setTitle(title);
            todo.setDescription(description);
            todo.setCompleted(completed);
            todo.setPriority(priority);
            todo.setUser(user);
            todoRepository.save(todo);
        }
    }
}
