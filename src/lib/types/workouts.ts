import type { Database } from '../database.types'
import type { Category } from './categories'
import type { Event } from './events'

// Base workout types from database
export type Workout = Database['public']['Tables']['workouts']['Row']
export type WorkoutInsert = Database['public']['Tables']['workouts']['Insert']
export type WorkoutUpdate = Database['public']['Tables']['workouts']['Update']

// Workout enums
export type WorkoutType = 'amrap' | 'fortime' | 'emom'
export type ResultType = 'time' | 'reps' | 'weight'

// Extended types for API responses
export type WorkoutWithCategory = Workout & {
  categories: Pick<Category, 'id' | 'name' | 'gender' | 'team_size'> | null
}

export type WorkoutWithEvent = Workout & {
  events: Pick<Event, 'id' | 'name' | 'start_date' | 'end_date'> | null
}

export type WorkoutWithDetails = WorkoutWithCategory & WorkoutWithEvent & {
  scores_count: number
  average_score: number | null
  best_score: number | null
}

// Workout filters and search
export type WorkoutFilters = {
  category_id?: string
  event_id?: string
  type?: WorkoutType
  result?: ResultType
  name?: string
  timecap_min?: number
  timecap_max?: number
}

// Workout form data
export type WorkoutFormData = Omit<WorkoutInsert, 'id' | 'created_at'>

// Workout statistics
export type WorkoutStats = {
  total_scores: number
  average_result: number | null
  best_result: number | null
  worst_result: number | null
  completion_rate: number
  participants_count: number
}

// Workout leaderboard entry
export type LeaderboardEntry = {
  rank: number
  team_name: string
  team_gym: string | null
  result_value: number
  result_type: ResultType
  tiebreak_value: number | null
  tiebreak_type: ResultType | null
  score_id: string
  team_id: string
}
