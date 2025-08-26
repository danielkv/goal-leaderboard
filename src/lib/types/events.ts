import type { Database } from '../database.types'

// Base event types from database
export type Event = Database['public']['Tables']['events']['Row']
export type EventInsert = Database['public']['Tables']['events']['Insert']
export type EventUpdate = Database['public']['Tables']['events']['Update']

// Extended types for API responses
export type EventWithTeamsCount = Event & {
  teams_count: number
}

export type EventWithTeams = Event & {
  teams: Array<{
    id: string
    name: string
    gym: string | null
  }>
}

// Event filters and search
export type EventFilters = {
  status?: 'upcoming' | 'ongoing' | 'completed'
  location?: string
  start_date?: string
  end_date?: string
  name?: string
}

// Event form data
export type EventFormData = Omit<EventInsert, 'id' | 'created_at'>

// Event status for UI (computed from dates)
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

// Event statistics
export type EventStats = {
  total_teams: number
  total_participants: number
  total_revenue: number
  tickets_sold: number
  tickets_available: number
}
