USE pets_db;

-- A senha para todos os usuários cadastrados abaixo é: 123456

INSERT INTO users (name, email, password, role) VALUES
('Administrador', 'admin@email.com', '$2b$10$5cqX1jFtokxVEC2A57KBUeRDeNnAiiQcTs/U3bhcSqOC2.Gqkovu2', 'admin'),
('João Silva', 'joao@email.com', '$2b$10$5cqX1jFtokxVEC2A57KBUeRDeNnAiiQcTs/U3bhcSqOC2.Gqkovu2', 'user'),
('Maria Oliveira', 'maria@email.com', '$2b$10$5cqX1jFtokxVEC2A57KBUeRDeNnAiiQcTs/U3bhcSqOC2.Gqkovu2', 'user');

INSERT INTO pets (name, birth_date, gender, species, breed, color, size, status, description) VALUES
('Rex', '2021-05-10', 'male', 'Cachorro', 'Labrador', 'Caramelo', 'large', 'available', 'Muito dócil e brincalhão, adora crianças e espaço para correr.'),
('Mimi', '2022-08-15', 'female', 'Gato', 'SRD', 'Frajola (Preto e Branco)', 'small', 'available', 'Calma, independente e muito carinhosa quando ganha confiança.'),
('Thor', '2020-01-20', 'male', 'Cachorro', 'Bulldog', 'Preto', 'medium', 'adopted', 'Um pouco preguiçoso, mas um excelente companheiro para apartamentos.'),
('Luna', '2023-02-10', 'female', 'Cachorro', 'Golden Retriever', 'Dourado', 'large', 'available', 'Cheia de energia, precisa de tutores ativos que gostem de longos passeios.');

-- Simulando o histórico de adoção: João (id 2) adotou o Thor (id 3)
INSERT INTO adoptions (user_id, pet_id) VALUES
(2, 3);