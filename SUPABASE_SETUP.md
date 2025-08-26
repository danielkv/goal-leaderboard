# Supabase Setup Guide

This guide will help you set up Supabase as the backend for your Goal Leaderboard application using the Supabase CLI for proper local development.

## Prerequisites

1. Docker installed and running
2. Node.js and Yarn installed
3. Supabase CLI (already installed via Homebrew)

## Local Development Setup

### 1. Start Supabase Locally

```bash
# Start all Supabase services locally
yarn supabase:start
```

This will:
- Start PostgreSQL database
- Start Supabase Studio (web interface)
- Apply all migrations
- Seed the database with sample data
- Generate local API keys

### 2. Access Local Services

After starting, you'll have access to:
- **API URL**: `http://127.0.0.1:54321`
- **Studio URL**: `http://127.0.0.1:54323`
- **Database URL**: `postgresql://postgres:postgres@127.0.0.1:54322/postgres`

### 3. Environment Configuration

Your `.env.local` is already configured for local development:

```bash
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

## Database Management

### Migrations

```bash
# Create a new migration
supabase migration new migration_name

# Apply migrations
yarn db:migrate

# Reset database (applies all migrations + seeds)
yarn supabase:reset
```

### TypeScript Types

```bash
# Generate types from your database schema
yarn supabase:types
```

### Useful Commands

```bash
# Check Supabase status
yarn supabase:status

# Stop Supabase
yarn supabase:stop

# Seed database only
yarn db:seed
```

### 4. Configure Row Level Security (Optional)

The schema includes basic RLS policies that allow all operations. You may want to customize these based on your authentication requirements:

- **Public Access**: Current setup allows all operations
- **Authenticated Users Only**: Modify policies to require authentication
- **Role-Based Access**: Add user roles and restrict operations accordingly

### 5. Test the Connection

1. Start your development server:
```bash
yarn dev
```

2. Check the browser console for any connection errors
3. The Supabase client will automatically validate your credentials

## API Usage

The application includes a complete API layer in `src/lib/api/`:

### Categories API
```typescript
import { categoriesApi } from '@/lib/api'

// Get all categories
const categories = await categoriesApi.getAll()

// Create a new category
const newCategory = await categoriesApi.create({ name: 'New Category' })
```

### Workouts API
```typescript
import { workoutsApi } from '@/lib/api'

// Get workouts by category
const workouts = await workoutsApi.getByCategory(categoryId)

// Create a new workout
const newWorkout = await workoutsApi.create({
  name: 'Fran',
  type: 'fortime',
  timecap: 300,
  result: 'time',
  tiebreak: 'time',
  category_id: categoryId
})
```

### Scores API
```typescript
import { scoresApi } from '@/lib/api'

// Get leaderboard for a workout
const leaderboard = await scoresApi.getLeaderboard(workoutId, categoryId)

// Submit a new score
const newScore = await scoresApi.create({
  team: 'Team Name',
  box: 'Box Name',
  result_type: 'time',
  result_value: 180, // 3 minutes in seconds
  tiebreak_type: 'time',
  tiebreak_value: 180,
  workout_id: workoutId,
  category_id: categoryId
})
```

### Checkins API
```typescript
import { checkinsApi } from '@/lib/api'

// Get all checkins
const checkins = await checkinsApi.getAll()

// Update checkin status
await checkinsApi.updateStatus(checkinId, 'checked')
```

## Database Schema Overview

### Tables

1. **categories**: Competition categories (RX Male, RX Female, etc.)
2. **workouts**: Individual workouts with type, timecap, and scoring info
3. **scores**: Team scores for workouts with results and tiebreakers
4. **checkins**: Team check-ins for events

### Relationships

- Workouts belong to categories
- Scores belong to both workouts and categories
- Checkins belong to categories

## Next Steps

1. **Authentication**: Add Supabase Auth for user management
2. **Real-time Updates**: Use Supabase real-time subscriptions for live leaderboards
3. **File Storage**: Use Supabase Storage for team photos or documents
4. **Edge Functions**: Add server-side logic for complex calculations

## Troubleshooting

### Connection Issues
- Verify your environment variables are correct
- Check that your Supabase project is active
- Ensure your API keys haven't expired

### Database Errors
- Check the Supabase logs in your dashboard
- Verify your RLS policies allow the operations you're trying to perform
- Make sure your schema is properly set up

### Type Issues
- The `database.types.ts` file should match your actual database schema
- You can regenerate types using the Supabase CLI if needed

For more help, check the [Supabase documentation](https://supabase.com/docs) or the project's GitHub issues.
