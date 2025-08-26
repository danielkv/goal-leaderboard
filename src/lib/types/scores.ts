import type { Database } from '../database.types'
import type { Team } from './teams'
import type { Workout, ResultType } from './workouts'

// Base score types from database
export type Score = Database['public']['Tables']['scores']['Row']
export type ScoreInsert = Database['public']['Tables']['scores']['Insert']
export type ScoreUpdate = Database['public']['Tables']['scores']['Update']

// Score enums
export type ScoreStatus = 'published' | 'non-published' | 'pending'

// Extended types for API responses
export type ScoreWithTeam = Score & {
  teams: Pick<Team, 'id' | 'name' | 'gym'> | null
}

export type ScoreWithWorkout = Score & {
  workouts: Pick<Workout, 'id' | 'name' | 'type' | 'timecap'> & {
    categories: {
      id: string
      name: string
      gender: string
      team_size: number
    } | null
  } | null
}

export type ScoreWithDetails = ScoreWithTeam & ScoreWithWorkout

// Score filters and search
export type ScoreFilters = {
  workout_id?: string
  team_id?: string
  status?: ScoreStatus
  result_type?: ResultType
  result_min?: number
  result_max?: number
}

// Score form data
export type ScoreFormData = Omit<ScoreInsert, 'id' | 'created_at'>

// Leaderboard types
export type LeaderboardScore = ScoreWithDetails & {
  rank: number
  points?: number
  time_behind_leader?: number
}

export type LeaderboardFilters = {
  category_id?: string
  gender?: 'male' | 'female' | 'mixed'
  team_size?: number
  gym?: string
}

// Score validation
export type ScoreValidation = {
  is_valid: boolean
  errors: string[]
  warnings: string[]
}

// Score statistics
export type ScoreStats = {
  total_scores: number
  average_result: number
  median_result: number
  best_result: number
  worst_result: number
  standard_deviation: number
}
