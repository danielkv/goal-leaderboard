import type { Database } from '../database.types'
import type { Ticket } from './tickets'

// Base transaction types from database
export type Transaction = Database['public']['Tables']['transactions']['Row']
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert']
export type TransactionUpdate = Database['public']['Tables']['transactions']['Update']

// Transaction enums
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type PaymentMethod = 'pix' | 'card' | 'bank_transfer' | 'cash' | 'boleto'
export type Currency = 'BRL' | 'USD' | 'EUR'

// Extended types for API responses
export type TransactionWithTicket = Transaction & {
  tickets: (Pick<Ticket, 'id' | 'ticket_number' | 'price'> & {
    teams: {
      id: string
      name: string
      gym: string | null
    } | null
  }) | null
}

// Transaction filters and search
export type TransactionFilters = {
  ticket_id?: string
  team_id?: string
  status?: TransactionStatus
  payment_method?: PaymentMethod
  currency?: Currency
  amount_min?: number
  amount_max?: number
  date_from?: string
  date_to?: string
  transaction_reference?: string
}

// Transaction form data
export type TransactionFormData = Omit<TransactionInsert, 'id' | 'created_at'>

// Payment processing types
export type PaymentRequest = {
  ticket_id: string
  amount: number
  currency: Currency
  payment_method: PaymentMethod
  customer_info?: {
    name: string
    email: string
    document: string
  }
}

export type PaymentResponse = {
  transaction_id: string
  status: TransactionStatus
  payment_url?: string
  qr_code?: string
  barcode?: string
  expires_at?: string
}

// Transaction statistics
export type TransactionStats = {
  total_transactions: number
  total_amount: number
  completed_amount: number
  pending_amount: number
  failed_amount: number
  refunded_amount: number
  success_rate: number
  average_amount: number
  payment_method_breakdown: Record<PaymentMethod, {
    count: number
    amount: number
    success_rate: number
  }>
}

// Financial reports
export type FinancialReport = {
  period: {
    start_date: string
    end_date: string
  }
  summary: TransactionStats
  daily_breakdown: Array<{
    date: string
    transactions: number
    amount: number
  }>
  event_breakdown: Array<{
    event_id: string
    event_name: string
    stats: TransactionStats
  }>
}

// Transaction validation
export type TransactionValidation = {
  is_valid: boolean
  can_process: boolean
  can_refund: boolean
  errors: string[]
  warnings: string[]
}
