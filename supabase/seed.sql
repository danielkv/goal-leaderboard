-- Dados de exemplo para Goal Leaderboard
-- Este arquivo contém dados de exemplo para desenvolvimento e testes

-- Inserir eventos de exemplo
INSERT INTO events (name, description, start_date, end_date, location, address) VALUES 
    ('CrossFit Open 2024', 'Competição mundial anual de CrossFit', '2024-02-29 00:00:00', '2024-04-08 23:59:59', 'Mundial', 'Várias Localidades'),
    ('Campeonato Regional', 'Evento de campeonato regional de CrossFit', '2024-05-15 08:00:00', '2024-05-17 18:00:00', 'Centro de Convenções São Paulo', 'Rua Funchal, 65 - Vila Olímpia, São Paulo - SP'),
    ('Torneio Local', 'Competição comunitária de CrossFit', '2024-06-22 09:00:00', '2024-06-22 17:00:00', 'CrossFit Central', 'Rua Augusta, 123 - Consolação, São Paulo - SP'),
    ('Jogos de Verão', 'Série de competições de CrossFit de verão', '2024-07-10 08:00:00', '2024-07-12 20:00:00', 'Complexo Esportivo', 'Av. Paulista, 456 - Bela Vista, São Paulo - SP');

-- Inserir categorias de exemplo
INSERT INTO categories (name, team_size, gender) VALUES 
    ('RX Masculino', 1, 'male'::gender_type),
    ('RX Feminino', 1, 'female'::gender_type),
    ('Scaled Masculino', 1, 'male'::gender_type),
    ('Scaled Feminino', 1, 'female'::gender_type),
    ('Masters 40+ Masculino', 1, 'male'::gender_type),
    ('Masters 40+ Feminino', 1, 'female'::gender_type),
    ('Teen Masculino', 1, 'male'::gender_type),
    ('Teen Feminino', 1, 'female'::gender_type),
    ('RX Duplas Misto', 2, 'mixed'::gender_type),
    ('Scaled Equipe', 4, 'mixed'::gender_type),
    ('Elite Equipe Masculino', 3, 'male'::gender_type),
    ('Elite Equipe Feminino', 3, 'female'::gender_type);

-- Inserir equipes de exemplo
INSERT INTO teams (name, gym, event_id)
SELECT 
    'Equipe Alpha',
    'CrossFit Central',
    id
FROM events 
WHERE name = 'CrossFit Open 2024'
LIMIT 1;

INSERT INTO teams (name, gym, event_id)
SELECT 
    'Equipe Beta',
    'CrossFit Vila Madalena',
    id
FROM events 
WHERE name = 'CrossFit Open 2024'
LIMIT 1;

INSERT INTO teams (name, gym, event_id)
SELECT 
    'Equipe Gamma',
    'CrossFit Elite',
    id
FROM events 
WHERE name = 'Campeonato Regional'
LIMIT 1;

INSERT INTO teams (name, gym, event_id)
SELECT 
    'Equipe Delta',
    'CrossFit Zona Norte',
    id
FROM events 
WHERE name = 'Torneio Local'
LIMIT 1;

INSERT INTO teams (name, gym, event_id)
SELECT 
    'Guerreiros do Fogo',
    'CrossFit Inferno',
    id
FROM events 
WHERE name = 'Jogos de Verão'
LIMIT 1;

INSERT INTO teams (name, gym, event_id)
SELECT 
    'Leões de Ferro',
    'CrossFit Steel',
    id
FROM events 
WHERE name = 'Jogos de Verão'
LIMIT 1;

-- Inserir workouts de exemplo
INSERT INTO workouts (name, type, timecap, result, tiebreak, category_id, event_id)
SELECT 
    'Fran',
    'fortime'::workout_type,
    300, -- 5 minutos
    'time'::result_type,
    'time'::result_type,
    c.id,
    e.id
FROM categories c, events e
WHERE c.name = 'RX Masculino' AND e.name = 'CrossFit Open 2024'
LIMIT 1;

INSERT INTO workouts (name, type, timecap, result, tiebreak, category_id, event_id)
SELECT 
    'Grace',
    'fortime'::workout_type,
    600, -- 10 minutos
    'time'::result_type,
    'time'::result_type,
    c.id,
    e.id
FROM categories c, events e
WHERE c.name = 'RX Feminino' AND e.name = 'CrossFit Open 2024'
LIMIT 1;

INSERT INTO workouts (name, type, timecap, result, tiebreak, category_id, event_id)
SELECT 
    'Annie',
    'fortime'::workout_type,
    1200, -- 20 minutos
    'time'::result_type,
    'time'::result_type,
    c.id,
    e.id
FROM categories c, events e
WHERE c.name = 'Scaled Masculino' AND e.name = 'Campeonato Regional'
LIMIT 1;

INSERT INTO workouts (name, type, timecap, result, tiebreak, category_id, event_id)
SELECT 
    'Morte por Burpees',
    'amrap'::workout_type,
    1200, -- 20 minutos
    'reps'::result_type,
    'reps'::result_type,
    c.id,
    e.id
FROM categories c, events e
WHERE c.name = 'Scaled Feminino' AND e.name = 'Torneio Local'
LIMIT 1;

INSERT INTO workouts (name, type, timecap, result, tiebreak, category_id, event_id)
SELECT 
    'Murph',
    'fortime'::workout_type,
    3600, -- 60 minutos
    'time'::result_type,
    'time'::result_type,
    c.id,
    e.id
FROM categories c, events e
WHERE c.name = 'RX Masculino' AND e.name = 'Jogos de Verão'
LIMIT 1;

-- Inserir pontuações de exemplo
INSERT INTO scores (team_id, result_type, result_value, tiebreak_type, tiebreak_value, status, workout_id)
SELECT 
    t.id,
    'time'::result_type,
    180, -- 3 minutos
    'time'::result_type,
    180,
    'published'::score_status,
    w.id
FROM workouts w, teams t
WHERE w.name = 'Fran' AND t.name = 'Equipe Alpha'
LIMIT 1;

INSERT INTO scores (team_id, result_type, result_value, tiebreak_type, tiebreak_value, status, workout_id)
SELECT 
    t.id,
    'time'::result_type,
    195, -- 3:15
    'time'::result_type,
    195,
    'published'::score_status,
    w.id
FROM workouts w, teams t
WHERE w.name = 'Fran' AND t.name = 'Equipe Beta'
LIMIT 1;

INSERT INTO scores (team_id, result_type, result_value, tiebreak_type, tiebreak_value, status, workout_id)
SELECT 
    t.id,
    'time'::result_type,
    210, -- 3:30
    'time'::result_type,
    210,
    'pending'::score_status,
    w.id
FROM workouts w, teams t
WHERE w.name = 'Grace' AND t.name = 'Equipe Beta'
LIMIT 1;

INSERT INTO scores (team_id, result_type, result_value, status, workout_id)
SELECT 
    t.id,
    'reps'::result_type,
    450, -- 450 repetições
    'published'::score_status,
    w.id
FROM workouts w, teams t
WHERE w.name = 'Morte por Burpees' AND t.name = 'Equipe Delta'
LIMIT 1;

-- Inserir check-ins de exemplo
INSERT INTO checkins (name, team_id, category, status, category_id)
SELECT 
    'João Silva',
    t.id,
    'RX Masculino',
    'checked'::checkin_status,
    c.id
FROM categories c, teams t
WHERE c.name = 'RX Masculino' AND t.name = 'Equipe Alpha'
LIMIT 1;

INSERT INTO checkins (name, team_id, category, status, category_id)
SELECT 
    'Maria Santos',
    t.id,
    'RX Feminino',
    'pending'::checkin_status,
    c.id
FROM categories c, teams t
WHERE c.name = 'RX Feminino' AND t.name = 'Equipe Beta'
LIMIT 1;

INSERT INTO checkins (name, team_id, category, status, category_id)
SELECT 
    'Carlos Oliveira',
    t.id,
    'Scaled Masculino',
    'checked'::checkin_status,
    c.id
FROM categories c, teams t
WHERE c.name = 'Scaled Masculino' AND t.name = 'Equipe Gamma'
LIMIT 1;

INSERT INTO checkins (name, team_id, category, status, category_id)
SELECT 
    'Ana Costa',
    t.id,
    'Scaled Feminino',
    'noshow'::checkin_status,
    c.id
FROM categories c, teams t
WHERE c.name = 'Scaled Feminino' AND t.name = 'Equipe Delta'
LIMIT 1;

-- Inserir team_users de exemplo (Nota: Em um cenário real, você precisaria de IDs reais de usuários do auth.users)
-- Para fins de demonstração, criaremos algumas entradas de exemplo
-- Normalmente você inseriria IDs reais de usuários do seu sistema de autenticação

-- Inserir ingressos de exemplo
INSERT INTO tickets (ticket_number, price, status, team_id)
SELECT 
    'ING-2024-001',
    150.00,
    'active',
    id
FROM teams 
WHERE name = 'Equipe Alpha'
LIMIT 1;

INSERT INTO tickets (ticket_number, price, status, team_id)
SELECT 
    'ING-2024-002',
    150.00,
    'active',
    id
FROM teams 
WHERE name = 'Equipe Beta'
LIMIT 1;

INSERT INTO tickets (ticket_number, price, status, team_id)
SELECT 
    'ING-2024-003',
    200.00,
    'active',
    id
FROM teams 
WHERE name = 'Equipe Gamma'
LIMIT 1;

INSERT INTO tickets (ticket_number, price, status, team_id)
SELECT 
    'ING-2024-004',
    100.00,
    'used',
    id
FROM teams 
WHERE name = 'Equipe Delta'
LIMIT 1;

INSERT INTO tickets (ticket_number, price, status, team_id)
SELECT 
    'ING-2024-005',
    250.00,
    'active',
    id
FROM teams 
WHERE name = 'Guerreiros do Fogo'
LIMIT 1;

INSERT INTO tickets (ticket_number, price, status, team_id)
SELECT 
    'ING-2024-006',
    250.00,
    'active',
    id
FROM teams 
WHERE name = 'Leões de Ferro'
LIMIT 1;

-- Inserir transações de exemplo
INSERT INTO transactions (amount, currency, status, payment_method, transaction_reference, ticket_id)
SELECT 
    150.00,
    'BRL',
    'completed',
    'card',
    'pix_1234567890abcdef',
    id
FROM tickets 
WHERE ticket_number = 'ING-2024-001'
LIMIT 1;

INSERT INTO transactions (amount, currency, status, payment_method, transaction_reference, ticket_id)
SELECT 
    150.00,
    'BRL',
    'completed',
    'bank_transfer',
    'ted_0987654321fedcba',
    id
FROM tickets 
WHERE ticket_number = 'ING-2024-002'
LIMIT 1;

INSERT INTO transactions (amount, currency, status, payment_method, transaction_reference, ticket_id)
SELECT 
    200.00,
    'BRL',
    'completed',
    'card',
    'cartao_abcdef1234567890',
    id
FROM tickets 
WHERE ticket_number = 'ING-2024-003'
LIMIT 1;

INSERT INTO transactions (amount, currency, status, payment_method, transaction_reference, ticket_id)
SELECT 
    100.00,
    'BRL',
    'completed',
    'cash',
    'dinheiro_pagamento_001',
    id
FROM tickets 
WHERE ticket_number = 'ING-2024-004'
LIMIT 1;

INSERT INTO transactions (amount, currency, status, payment_method, transaction_reference, ticket_id)
SELECT 
    250.00,
    'BRL',
    'pending',
    'card',
    'pix_pendente_123456',
    id
FROM tickets 
WHERE ticket_number = 'ING-2024-005'
LIMIT 1;

INSERT INTO transactions (amount, currency, status, payment_method, transaction_reference, ticket_id)
SELECT 
    250.00,
    'BRL',
    'failed',
    'card',
    'cartao_falhou_789012',
    id
FROM tickets 
WHERE ticket_number = 'ING-2024-006'
LIMIT 1;
