-- Dummy data for Todo application
-- Passwords are encoded: 'password123' using BCrypt
INSERT INTO users (username, email, password, created_at) VALUES 
    ('john_doe', 'john@example.com', '$2a$10$N9zv8sK8vYxYz5QxYxYz5OxYxYz5QxYxYz5QxYxYz5OxYxYz5QxYi', CURRENT_TIMESTAMP),
    ('jane_smith', 'jane@example.com', '$2a$10$N9zv8sK8vYxYz5QxYxYz5OxYxYz5QxYxYz5QxYxYz5OxYxYz5QxYi', CURRENT_TIMESTAMP);

INSERT INTO todo (title, description, completed, priority, created_at, user_id) VALUES 
    ('Buy groceries', 'Milk, eggs, bread, and vegetables', false, 'MEDIUM', CURRENT_TIMESTAMP, 1),
    ('Complete project report', 'Finish the quarterly project report by Friday', false, 'HIGH', CURRENT_TIMESTAMP, 1),
    ('Call dentist', 'Schedule appointment for checkup', false, 'LOW', CURRENT_TIMESTAMP, 1),
    ('Workout', 'Go to gym for 1 hour', true, 'MEDIUM', CURRENT_TIMESTAMP, 1),
    ('Plan vacation', 'Research destinations for summer trip', false, 'HIGH', CURRENT_TIMESTAMP, 2),
    ('Buy birthday gift', 'Get something for mom''s birthday', false, 'MEDIUM', CURRENT_TIMESTAMP, 2),
    ('Schedule meeting', 'Team sync for next week', true, 'LOW', CURRENT_TIMESTAMP, 2),
    ('Grocery shopping', 'Weekly grocery run', false, 'LOW', CURRENT_TIMESTAMP, 2);
