-- Goal Leaderboard Database Schema
-- Initial migration for the goal leaderboard application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE workout_type AS ENUM ('amrap', 'fortime', 'emom');
CREATE TYPE result_type AS ENUM ('time', 'reps', 'weight');
CREATE TYPE score_status AS ENUM ('published', 'non-published', 'pending');
CREATE TYPE checkin_status AS ENUM ('pending', 'checked', 'noshow');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'mixed');

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    team_size INTEGER NOT NULL DEFAULT 1,
    gender gender_type NOT NULL DEFAULT 'mixed',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    end_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    location VARCHAR(255),
    address VARCHAR(255),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Workouts table
CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type workout_type NOT NULL,
    timecap INTEGER NOT NULL, -- in seconds
    result result_type NOT NULL,
    tiebreak result_type NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Teams table
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    gym VARCHAR(255),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Scores table
CREATE TABLE scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    result_type result_type NOT NULL,
    result_value INTEGER NOT NULL, -- stored as seconds for time, or count for reps/rounds
    tiebreak_type result_type,
    tiebreak_value INTEGER,
    status score_status DEFAULT 'pending',
    workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Team Users junction table (many-to-many relationship)
CREATE TABLE team_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(100) DEFAULT 'member', -- member, captain, etc.
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    UNIQUE(team_id, user_id)
);

-- Tickets table
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_number VARCHAR(100) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'active', -- active, used, cancelled
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Transactions table (renamed from payments for clarity)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
    payment_method VARCHAR(50), -- card, bank_transfer, cash, etc.
    transaction_reference VARCHAR(255),
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Checkins table
CREATE TABLE checkins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    category VARCHAR(255) NOT NULL, -- denormalized for easier querying
    status checkin_status DEFAULT 'pending',
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_workouts_category_id ON workouts(category_id);
CREATE INDEX idx_workouts_event_id ON workouts(event_id);
CREATE INDEX idx_scores_workout_id ON scores(workout_id);
CREATE INDEX idx_scores_team_id ON scores(team_id);
CREATE INDEX idx_scores_status ON scores(status);
CREATE INDEX idx_checkins_category_id ON checkins(category_id);
CREATE INDEX idx_checkins_team_id ON checkins(team_id);
CREATE INDEX idx_checkins_status ON checkins(status);

-- Indexes for new tables
CREATE INDEX idx_teams_event_id ON teams(event_id);
CREATE INDEX idx_team_users_team_id ON team_users(team_id);
CREATE INDEX idx_team_users_user_id ON team_users(user_id);
CREATE INDEX idx_tickets_team_id ON tickets(team_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_transactions_ticket_id ON transactions(ticket_id);
CREATE INDEX idx_transactions_status ON transactions(status);


-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;

-- Enable RLS for new tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies (allowing all operations for now - adjust based on your auth requirements)
-- Categories policies
CREATE POLICY "Allow all operations on categories" ON categories
    FOR ALL USING (true);

-- Workouts policies
CREATE POLICY "Allow all operations on workouts" ON workouts
    FOR ALL USING (true);

-- Scores policies
CREATE POLICY "Allow all operations on scores" ON scores
    FOR ALL USING (true);

-- Checkins policies
CREATE POLICY "Allow all operations on checkins" ON checkins
    FOR ALL USING (true);

-- Policies for new tables (allowing all operations for now - adjust based on your auth requirements)
-- Events policies
CREATE POLICY "Allow all operations on events" ON events
    FOR ALL USING (true);

-- Teams policies
CREATE POLICY "Allow all operations on teams" ON teams
    FOR ALL USING (true);

-- Team Users policies
CREATE POLICY "Allow all operations on team_users" ON team_users
    FOR ALL USING (true);

-- Tickets policies
CREATE POLICY "Allow all operations on tickets" ON tickets
    FOR ALL USING (true);

-- Transactions policies
CREATE POLICY "Allow all operations on transactions" ON transactions
    FOR ALL USING (true);
