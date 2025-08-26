import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { eventsApi } from '../api'
import { queryKeys } from '../queryClient'
import type { Event, EventInsert, EventUpdate } from '../types'

// Query hooks
export const useEvents = () => {
  return useQuery({
    queryKey: queryKeys.events.lists(),
    queryFn: eventsApi.getAll,
  })
}

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: () => eventsApi.getById(id),
    enabled: !!id,
  })
}

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: queryKeys.events.upcoming(),
    queryFn: eventsApi.getUpcoming,
  })
}

export const useEventsWithTeamsCount = () => {
  return useQuery({
    queryKey: queryKeys.events.list({ withTeamsCount: true }),
    queryFn: eventsApi.getAllWithTeamsCount,
  })
}

// Mutation hooks
export const useCreateEvent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (event: EventInsert) => eventsApi.create(event),
    onSuccess: () => {
      // Invalidate and refetch events queries
      queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
    },
  })
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: EventUpdate }) =>
      eventsApi.update(id, updates),
    onSuccess: (data) => {
      // Update the specific event in cache
      queryClient.setQueryData(queryKeys.events.detail(data.id), data)
      // Invalidate events lists
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.events.upcoming() })
    },
  })
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => eventsApi.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.events.detail(id) })
      // Invalidate events lists
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.events.upcoming() })
      // Also invalidate related teams
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.all })
    },
  })
}
