import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { checkinsApi } from '../api'
import { queryKeys } from '../queryClient'
import type { Checkin, CheckinInsert, CheckinUpdate } from '../types'

// Query hooks
export const useCheckins = () => {
  return useQuery({
    queryKey: queryKeys.checkins.lists(),
    queryFn: checkinsApi.getAll,
  })
}

export const useCheckin = (id: string) => {
  return useQuery({
    queryKey: queryKeys.checkins.detail(id),
    queryFn: () => checkinsApi.getById(id),
    enabled: !!id,
  })
}

export const useCheckinsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: queryKeys.checkins.byCategory(categoryId),
    queryFn: () => checkinsApi.getByCategory(categoryId),
    enabled: !!categoryId,
  })
}

export const useCheckinsByStatus = (status: 'pending' | 'checked' | 'noshow') => {
  return useQuery({
    queryKey: queryKeys.checkins.byStatus(status),
    queryFn: () => checkinsApi.getByStatus(status),
    enabled: !!status,
  })
}

// Mutation hooks
export const useCreateCheckin = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (checkin: CheckinInsert) => checkinsApi.create(checkin),
    onSuccess: (data) => {
      // Invalidate and refetch checkins queries
      queryClient.invalidateQueries({ queryKey: queryKeys.checkins.all })
      // Invalidate category-specific checkins
      if (data.category_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.checkins.byCategory(data.category_id) })
      }
      // Invalidate status-specific checkins
      if (data.status) {
        queryClient.invalidateQueries({ queryKey: queryKeys.checkins.byStatus(data.status) })
      }
    },
  })
}

export const useUpdateCheckin = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: CheckinUpdate }) =>
      checkinsApi.update(id, updates),
    onSuccess: (data) => {
      // Update the specific checkin in cache
      queryClient.setQueryData(queryKeys.checkins.detail(data.id), data)
      // Invalidate checkins lists
      queryClient.invalidateQueries({ queryKey: queryKeys.checkins.lists() })
      // Invalidate category and status specific queries
      if (data.category_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.checkins.byCategory(data.category_id) })
      }
      if (data.status) {
        queryClient.invalidateQueries({ queryKey: queryKeys.checkins.byStatus(data.status) })
      }
    },
  })
}

export const useUpdateCheckinStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'checked' | 'noshow' }) =>
      checkinsApi.updateStatus(id, status),
    onSuccess: (data) => {
      // Update the specific checkin in cache
      queryClient.setQueryData(queryKeys.checkins.detail(data.id), data)
      // Invalidate all status-based queries since status changed
      queryClient.invalidateQueries({ queryKey: queryKeys.checkins.lists() })
      queryClient.invalidateQueries({ queryKey: [...queryKeys.checkins.all, 'byStatus'] })
    },
  })
}

export const useDeleteCheckin = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => checkinsApi.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.checkins.detail(id) })
      // Invalidate checkins lists
      queryClient.invalidateQueries({ queryKey: queryKeys.checkins.lists() })
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.checkins.all })
    },
  })
}
