// Re-export database types
export type { Database } from '../database.types'

// Export all entity types
export * from './categories'
export * from './events'
export * from './teams'
export * from './workouts'
export * from './scores'
export * from './checkins'
export * from './tickets'
export * from './transactions'

// Export common types
export * from './common'

// Convenience type unions
export type EntityType = 
  | 'category'
  | 'event'
  | 'team'
  | 'workout'
  | 'score'
  | 'checkin'
  | 'ticket'
  | 'transaction'

// All possible statuses across entities
export type AllStatuses = 
  | 'pending'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'published'
  | 'non-published'
  | 'checked'
  | 'noshow'
  | 'used'
  | 'failed'
  | 'refunded'

// Generic entity with common fields
export type BaseEntity = {
  id: string
  created_at: string
}

// Generic insert type (without id and created_at)
export type BaseInsert<T extends BaseEntity> = Omit<T, 'id' | 'created_at'>

// Generic update type (partial, without id and created_at)
export type BaseUpdate<T extends BaseEntity> = Partial<Omit<T, 'id' | 'created_at'>>

// API operation types
export type ApiOperation = {
  type: 'query' | 'mutation'
  entity: EntityType
  action: 'list' | 'get' | 'create' | 'update' | 'delete'
  id?: string
  data?: any
}

// Query key types for React Query
export type QueryKeyBase = readonly [string, ...any[]]

// Mutation result type
export type MutationResult<T> = {
  data?: T
  error?: Error
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

// Hook return types
export type QueryHookResult<T> = {
  data: T | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
}

export type MutationHookResult<TData, TVariables> = {
  mutate: (variables: TVariables) => void
  mutateAsync: (variables: TVariables) => Promise<TData>
  data: TData | undefined
  error: Error | null
  isLoading: boolean
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  reset: () => void
}
