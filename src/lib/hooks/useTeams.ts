import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { teamsApi } from '../api'
import { queryKeys } from '../queryClient'
import type { Team, TeamInsert, TeamUpdate } from '../types'

// Query hooks
export const useTeams = () => {
  return useQuery({
    queryKey: queryKeys.teams.lists(),
    queryFn: teamsApi.getAll,
  })
}

export const useTeam = (id: string) => {
  return useQuery({
    queryKey: queryKeys.teams.detail(id),
    queryFn: () => teamsApi.getById(id),
    enabled: !!id,
  })
}

export const useTeamsByEvent = (eventId: string) => {
  return useQuery({
    queryKey: queryKeys.teams.byEvent(eventId),
    queryFn: () => teamsApi.getByEvent(eventId),
    enabled: !!eventId,
  })
}

export const useTeamsByGym = (gym: string) => {
  return useQuery({
    queryKey: queryKeys.teams.byGym(gym),
    queryFn: () => teamsApi.getByGym(gym),
    enabled: !!gym,
  })
}

// Mutation hooks
export const useCreateTeam = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (team: TeamInsert) => teamsApi.create(team),
    onSuccess: (data) => {
      // Invalidate and refetch teams queries
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.all })
      // Also invalidate event teams count
      if (data.event_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.events.all })
      }
    },
  })
}

export const useUpdateTeam = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: TeamUpdate }) =>
      teamsApi.update(id, updates),
    onSuccess: (data) => {
      // Update the specific team in cache
      queryClient.setQueryData(queryKeys.teams.detail(data.id), data)
      // Invalidate teams lists
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() })
      // Invalidate event-specific teams
      if (data.event_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.teams.byEvent(data.event_id) })
      }
    },
  })
}

export const useDeleteTeam = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => teamsApi.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.teams.detail(id) })
      // Invalidate teams lists
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() })
      // Also invalidate related data
      queryClient.invalidateQueries({ queryKey: queryKeys.scores.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.checkins.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all })
    },
  })
}
