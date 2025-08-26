import type { Database } from '../database.types'
import type { Event } from './events'

// Base team types from database
export type Team = Database['public']['Tables']['teams']['Row']
export type TeamInsert = Database['public']['Tables']['teams']['Insert']
export type TeamUpdate = Database['public']['Tables']['teams']['Update']

// Team user relationship
export type TeamUser = Database['public']['Tables']['team_users']['Row']
export type TeamUserInsert = Database['public']['Tables']['team_users']['Insert']
export type TeamUserUpdate = Database['public']['Tables']['team_users']['Update']

// Extended types for API responses
export type TeamWithEvent = Team & {
  events: Pick<Event, 'id' | 'name' | 'start_date' | 'end_date'> | null
}

export type TeamWithMembers = Team & {
  team_users: Array<{
    id: string
    role: string | null
    user_id: string
  }>
}

export type TeamWithDetails = TeamWithEvent & TeamWithMembers & {
  member_count: number
  tickets_count: number
  scores_count: number
}

// Team filters and search
export type TeamFilters = {
  event_id?: string
  gym?: string
  name?: string
  has_members?: boolean
}

// Team form data
export type TeamFormData = Omit<TeamInsert, 'id' | 'created_at'>

// Team member roles
export type TeamRole = 'captain' | 'member' | 'substitute' | 'coach'

// Team statistics
export type TeamStats = {
  total_scores: number
  average_score: number
  best_score: number
  worst_score: number
  completed_workouts: number
  pending_workouts: number
}
