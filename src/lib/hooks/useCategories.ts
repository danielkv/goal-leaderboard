import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoriesApi } from '../api'
import { queryKeys } from '../queryClient'
import type { Category, CategoryInsert, CategoryUpdate } from '../types'

// Query hooks
export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories.lists(),
    queryFn: categoriesApi.getAll,
  })
}

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  })
}

export const useCategoriesWithCounts = () => {
  return useQuery({
    queryKey: queryKeys.categories.list({ withCounts: true }),
    queryFn: categoriesApi.getAllWithCounts,
  })
}

// Mutation hooks
export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (category: CategoryInsert) => categoriesApi.create(category),
    onSuccess: () => {
      // Invalidate and refetch categories queries
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all })
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: CategoryUpdate }) =>
      categoriesApi.update(id, updates),
    onSuccess: (data) => {
      // Update the specific category in cache
      queryClient.setQueryData(queryKeys.categories.detail(data.id), data)
      // Invalidate categories list
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.lists() })
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => categoriesApi.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.categories.detail(id) })
      // Invalidate categories list
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.lists() })
    },
  })
}
