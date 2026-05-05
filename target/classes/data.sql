-- Dummy data for Todo application
INSERT INTO todo (title, description, completed, priority, created_at) VALUES 
    ('Buy groceries', 'Milk, eggs, bread, and vegetables', false, 'MEDIUM', CURRENT_TIMESTAMP),
    ('Complete project report', 'Finish the quarterly project report by Friday', false, 'HIGH', CURRENT_TIMESTAMP),
    ('Call dentist', 'Schedule appointment for checkup', false, 'LOW', CURRENT_TIMESTAMP),
    ('Workout', 'Go to gym for 1 hour', true, 'MEDIUM', CURRENT_TIMESTAMP),
    ('Read book', 'Read 30 pages of Java programming book', false, 'LOW', CURRENT_TIMESTAMP),
    ('Pay electricity bill', 'Pay before due date to avoid late fees', false, 'HIGH', CURRENT_TIMESTAMP),
    ('Clean house', 'Vacuum and dust living room', true, 'LOW', CURRENT_TIMESTAMP),
    ('Learn Spring Boot', 'Complete Spring Boot tutorial', false, 'MEDIUM', CURRENT_TIMESTAMP);
