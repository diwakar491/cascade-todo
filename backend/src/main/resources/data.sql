-- Dummy data for Todo application
-- Password for all users: 'password123'
-- BCrypt hash: $2a$10$X7oMy0LjdB.bhQGnCXiLyO.ymuI3vZZ4nZ8Yy7gkS.fQ7s5JvQh5C
-- Using DELETE + INSERT to avoid duplicate key errors on restart

-- Clear existing data first (to avoid constraint violations)
DELETE FROM todo;
DELETE FROM users;

-- Reset identity columns
ALTER TABLE todo ALTER COLUMN id RESTART WITH 1;
ALTER TABLE users ALTER COLUMN id RESTART WITH 1;

-- Insert users
INSERT INTO users (id, username, email, password, role, created_at) VALUES
    (1, 'admin', 'admin@example.com', '$2a$10$X7oMy0LjdB.bhQGnCXiLyO.ymuI3vZZ4nZ8Yy7gkS.fQ7s5JvQh5C', 'ROLE_ADMIN', CURRENT_TIMESTAMP),
    (2, 'john_doe', 'john@example.com', '$2a$10$X7oMy0LjdB.bhQGnCXiLyO.ymuI3vZZ4nZ8Yy7gkS.fQ7s5JvQh5C', 'ROLE_USER', CURRENT_TIMESTAMP),
    (3, 'jane_smith', 'jane@example.com', '$2a$10$X7oMy0LjdB.bhQGnCXiLyO.ymuI3vZZ4nZ8Yy7gkS.fQ7s5JvQh5C', 'ROLE_USER', CURRENT_TIMESTAMP);

-- Insert todos
INSERT INTO todo (id, title, description, completed, priority, created_at, user_id) VALUES 
    (1, 'Buy groceries', 'Milk, eggs, bread, and vegetables', false, 'MEDIUM', CURRENT_TIMESTAMP, 1),
    (2, 'Complete project report', 'Finish the quarterly project report by Friday', false, 'HIGH', CURRENT_TIMESTAMP, 1),
    (3, 'Call dentist', 'Schedule appointment for checkup', false, 'LOW', CURRENT_TIMESTAMP, 1),
    (4, 'Workout', 'Go to gym for 1 hour', true, 'MEDIUM', CURRENT_TIMESTAMP, 1),
    (5, 'Plan vacation', 'Research destinations for summer trip', false, 'HIGH', CURRENT_TIMESTAMP, 2),
    (6, 'Buy birthday gift', 'Get something for mom''s birthday', false, 'MEDIUM', CURRENT_TIMESTAMP, 2),
    (7, 'Schedule meeting', 'Team sync for next week', true, 'LOW', CURRENT_TIMESTAMP, 2),
    (8, 'Grocery shopping', 'Weekly grocery run', false, 'LOW', CURRENT_TIMESTAMP, 2);
