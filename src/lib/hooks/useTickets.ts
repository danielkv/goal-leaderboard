import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ticketsApi } from '../api'
import { queryKeys } from '../queryClient'
import type { Ticket, TicketInsert, TicketUpdate } from '../types'

// Query hooks
export const useTickets = () => {
  return useQuery({
    queryKey: queryKeys.tickets.lists(),
    queryFn: ticketsApi.getAll,
  })
}

export const useTicket = (id: string) => {
  return useQuery({
    queryKey: queryKeys.tickets.detail(id),
    queryFn: () => ticketsApi.getById(id),
    enabled: !!id,
  })
}

export const useTicketsByTeam = (teamId: string) => {
  return useQuery({
    queryKey: queryKeys.tickets.byTeam(teamId),
    queryFn: () => ticketsApi.getByTeam(teamId),
    enabled: !!teamId,
  })
}

export const useTicketsByStatus = (status: 'active' | 'used' | 'cancelled') => {
  return useQuery({
    queryKey: queryKeys.tickets.byStatus(status),
    queryFn: () => ticketsApi.getByStatus(status),
    enabled: !!status,
  })
}

// Mutation hooks
export const useCreateTicket = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (ticket: TicketInsert) => ticketsApi.create(ticket),
    onSuccess: (data) => {
      // Invalidate and refetch tickets queries
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all })
      // Invalidate team-specific tickets
      if (data.team_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.tickets.byTeam(data.team_id) })
      }
      // Invalidate status-specific tickets
      if (data.status) {
        queryClient.invalidateQueries({ queryKey: queryKeys.tickets.byStatus(data.status) })
      }
    },
  })
}

export const useUpdateTicket = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: TicketUpdate }) =>
      ticketsApi.update(id, updates),
    onSuccess: (data) => {
      // Update the specific ticket in cache
      queryClient.setQueryData(queryKeys.tickets.detail(data.id), data)
      // Invalidate tickets lists
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.lists() })
      // Invalidate team and status specific queries
      if (data.team_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.tickets.byTeam(data.team_id) })
      }
      if (data.status) {
        queryClient.invalidateQueries({ queryKey: queryKeys.tickets.byStatus(data.status) })
      }
    },
  })
}

export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'active' | 'used' | 'cancelled' }) =>
      ticketsApi.updateStatus(id, status),
    onSuccess: (data) => {
      // Update the specific ticket in cache
      queryClient.setQueryData(queryKeys.tickets.detail(data.id), data)
      // Invalidate all status-based queries since status changed
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.lists() })
      queryClient.invalidateQueries({ queryKey: [...queryKeys.tickets.all, 'byStatus'] })
    },
  })
}

export const useDeleteTicket = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => ticketsApi.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.tickets.detail(id) })
      // Invalidate tickets lists
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.lists() })
      // Also invalidate related transactions
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all })
    },
  })
}
