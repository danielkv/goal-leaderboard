import type { Database } from '../database.types'

// Base category types from database
export type Category = Database['public']['Tables']['categories']['Row']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type CategoryUpdate = Database['public']['Tables']['categories']['Update']

// Extended types for API responses
export type CategoryWithCounts = Category & {
  members: number
  subscriptions: number
}

// Category filters and search
export type CategoryFilters = {
  gender?: 'male' | 'female' | 'mixed'
  team_size?: number
  name?: string
}

// Category form data
export type CategoryFormData = Omit<CategoryInsert, 'id' | 'created_at'>

// Category status for UI
export type CategoryStatus = 'active' | 'inactive' | 'archived'
