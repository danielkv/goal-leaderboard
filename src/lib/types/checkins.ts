import type { Database } from '../database.types'
import type { Team } from './teams'
import type { Category } from './categories'

// Base checkin types from database
export type Checkin = Database['public']['Tables']['checkins']['Row']
export type CheckinInsert = Database['public']['Tables']['checkins']['Insert']
export type CheckinUpdate = Database['public']['Tables']['checkins']['Update']

// Checkin enums
export type CheckinStatus = 'pending' | 'checked' | 'noshow'

// Extended types for API responses
export type CheckinWithTeam = Checkin & {
  teams: Pick<Team, 'id' | 'name' | 'gym'> | null
}

export type CheckinWithCategory = Checkin & {
  categories: Pick<Category, 'id' | 'name' | 'gender' | 'team_size'> | null
}

export type CheckinWithDetails = CheckinWithTeam & CheckinWithCategory

// Checkin filters and search
export type CheckinFilters = {
  team_id?: string
  category_id?: string
  status?: CheckinStatus
  name?: string
  date_from?: string
  date_to?: string
}

// Checkin form data
export type CheckinFormData = Omit<CheckinInsert, 'id' | 'created_at'>

// Bulk checkin operations
export type BulkCheckinUpdate = {
  checkin_ids: string[]
  status: CheckinStatus
  notes?: string
}

// Checkin statistics
export type CheckinStats = {
  total_checkins: number
  checked_count: number
  pending_count: number
  noshow_count: number
  attendance_rate: number
}

// Checkin report
export type CheckinReport = {
  event_id: string
  event_name: string
  category_breakdown: Array<{
    category_id: string
    category_name: string
    stats: CheckinStats
  }>
  overall_stats: CheckinStats
}
