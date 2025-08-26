import type { Database } from '../database.types'
import type { Team } from './teams'

// Base ticket types from database
export type Ticket = Database['public']['Tables']['tickets']['Row']
export type TicketInsert = Database['public']['Tables']['tickets']['Insert']
export type TicketUpdate = Database['public']['Tables']['tickets']['Update']

// Ticket enums
export type TicketStatus = 'active' | 'used' | 'cancelled'

// Extended types for API responses
export type TicketWithTeam = Ticket & {
  teams: (Pick<Team, 'id' | 'name' | 'gym'> & {
    events: {
      id: string
      name: string
    } | null
  }) | null
}

export type TicketWithTransactions = Ticket & {
  transactions: Array<{
    id: string
    amount: number
    status: string
    payment_method: string | null
    created_at: string
  }>
}

export type TicketWithDetails = TicketWithTeam & TicketWithTransactions & {
  total_paid: number
  payment_status: 'unpaid' | 'partial' | 'paid' | 'refunded'
}

// Ticket filters and search
export type TicketFilters = {
  team_id?: string
  event_id?: string
  status?: TicketStatus
  payment_status?: 'unpaid' | 'partial' | 'paid' | 'refunded'
  ticket_number?: string
  price_min?: number
  price_max?: number
  date_from?: string
  date_to?: string
}

// Ticket form data
export type TicketFormData = Omit<TicketInsert, 'id' | 'created_at'>

// Bulk ticket operations
export type BulkTicketUpdate = {
  ticket_ids: string[]
  status?: TicketStatus
  price?: number
  notes?: string
}

// Ticket statistics
export type TicketStats = {
  total_tickets: number
  active_count: number
  used_count: number
  cancelled_count: number
  total_revenue: number
  average_price: number
}

// Ticket validation
export type TicketValidation = {
  is_valid: boolean
  can_use: boolean
  can_cancel: boolean
  errors: string[]
  warnings: string[]
}
