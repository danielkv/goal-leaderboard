// Common types used across the application

// API Response types
export type ApiResponse<T> = {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
}

// Common filters
export type BaseFilters = {
  search?: string
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export type DateRangeFilter = {
  date_from?: string
  date_to?: string
}

// Form states
export type FormState = 'idle' | 'submitting' | 'success' | 'error'

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Generic CRUD operations
export type CrudOperation = 'create' | 'read' | 'update' | 'delete'

// Permission types
export type Permission = 
  | 'admin'
  | 'event_manager'
  | 'judge'
  | 'team_captain'
  | 'participant'
  | 'viewer'

// User roles
export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'event_organizer'
  | 'judge'
  | 'team_captain'
  | 'athlete'
  | 'spectator'

// Notification types
export type NotificationType = 
  | 'success'
  | 'error'
  | 'warning'
  | 'info'

export type Notification = {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  action_url?: string
}

// File upload types
export type FileUpload = {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  url?: string
  error?: string
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system'

// Language types
export type Language = 'pt-BR' | 'en-US' | 'es-ES'

// Currency formatting
export type CurrencyFormat = {
  currency: string
  locale: string
  symbol: string
}

// Time zone
export type TimeZone = string // e.g., 'America/Sao_Paulo'

// Application settings
export type AppSettings = {
  theme: ThemeMode
  language: Language
  currency: CurrencyFormat
  timezone: TimeZone
  notifications_enabled: boolean
  auto_refresh_enabled: boolean
  refresh_interval: number // in seconds
}

// Error types
export type AppError = {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
}

// Validation result
export type ValidationResult = {
  is_valid: boolean
  errors: Record<string, string[]>
  warnings?: Record<string, string[]>
}

// Select option (for dropdowns, etc.)
export type SelectOption<T = string> = {
  value: T
  label: string
  disabled?: boolean
  group?: string
}

// Table column definition
export type TableColumn<T = any> = {
  key: keyof T
  label: string
  sortable?: boolean
  filterable?: boolean
  width?: number | string
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: T) => React.ReactNode
}

// Chart data types
export type ChartDataPoint = {
  label: string
  value: number
  color?: string
}

export type ChartData = {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
  }>
}
