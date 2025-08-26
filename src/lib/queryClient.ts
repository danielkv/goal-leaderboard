import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: how long data is considered fresh (5 minutes)
      staleTime: 5 * 60 * 1000,
      // Cache time: how long data stays in cache when unused (10 minutes)
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 3 times
      retry: 3,
      // Retry delay increases exponentially
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
})

// Query keys factory for consistent key management
export const queryKeys = {
  // Categories
  categories: {
    all: ['categories'] as const,
    lists: () => [...queryKeys.categories.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...queryKeys.categories.lists(), filters] as const,
    details: () => [...queryKeys.categories.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.categories.details(), id] as const,
  },
  
  // Events
  events: {
    all: ['events'] as const,
    lists: () => [...queryKeys.events.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...queryKeys.events.lists(), filters] as const,
    details: () => [...queryKeys.events.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.events.details(), id] as const,
    upcoming: () => [...queryKeys.events.all, 'upcoming'] as const,
  },
  
  // Teams
  teams: {
    all: ['teams'] as const,
    lists: () => [...queryKeys.teams.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...queryKeys.teams.lists(), filters] as const,
    details: () => [...queryKeys.teams.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.teams.details(), id] as const,
    byEvent: (eventId: string) => [...queryKeys.teams.all, 'byEvent', eventId] as const,
    byGym: (gym: string) => [...queryKeys.teams.all, 'byGym', gym] as const,
  },
  
  // Workouts
  workouts: {
    all: ['workouts'] as const,
    lists: () => [...queryKeys.workouts.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...queryKeys.workouts.lists(), filters] as const,
    details: () => [...queryKeys.workouts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.workouts.details(), id] as const,
    byCategory: (categoryId: string) => [...queryKeys.workouts.all, 'byCategory', categoryId] as const,
  },
  
  // Scores
  scores: {
    all: ['scores'] as const,
    lists: () => [...queryKeys.scores.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...queryKeys.scores.lists(), filters] as const,
    details: () => [...queryKeys.scores.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.scores.details(), id] as const,
    byWorkout: (workoutId: string) => [...queryKeys.scores.all, 'byWorkout', workoutId] as const,
    byTeam: (teamId: string) => [...queryKeys.scores.all, 'byTeam', teamId] as const,
    leaderboard: (workoutId: string) => [...queryKeys.scores.all, 'leaderboard', workoutId] as const,
  },
  
  // Checkins
  checkins: {
    all: ['checkins'] as const,
    lists: () => [...queryKeys.checkins.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...queryKeys.checkins.lists(), filters] as const,
    details: () => [...queryKeys.checkins.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.checkins.details(), id] as const,
    byCategory: (categoryId: string) => [...queryKeys.checkins.all, 'byCategory', categoryId] as const,
    byStatus: (status: string) => [...queryKeys.checkins.all, 'byStatus', status] as const,
  },
  
  // Tickets
  tickets: {
    all: ['tickets'] as const,
    lists: () => [...queryKeys.tickets.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...queryKeys.tickets.lists(), filters] as const,
    details: () => [...queryKeys.tickets.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tickets.details(), id] as const,
    byTeam: (teamId: string) => [...queryKeys.tickets.all, 'byTeam', teamId] as const,
    byStatus: (status: string) => [...queryKeys.tickets.all, 'byStatus', status] as const,
  },
  
  // Transactions
  transactions: {
    all: ['transactions'] as const,
    lists: () => [...queryKeys.transactions.all, 'list'] as const,
    list: (filters: Record<string, any> = {}) => [...queryKeys.transactions.lists(), filters] as const,
    details: () => [...queryKeys.transactions.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.transactions.details(), id] as const,
    byTicket: (ticketId: string) => [...queryKeys.transactions.all, 'byTicket', ticketId] as const,
    byStatus: (status: string) => [...queryKeys.transactions.all, 'byStatus', status] as const,
    byPaymentMethod: (method: string) => [...queryKeys.transactions.all, 'byPaymentMethod', method] as const,
  },
} as const
