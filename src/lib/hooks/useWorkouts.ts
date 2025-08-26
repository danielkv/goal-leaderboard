import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { workoutsApi } from '../api'
import { queryKeys } from '../queryClient'
import type { Workout, WorkoutInsert, WorkoutUpdate } from '../types'

// Query hooks
export const useWorkouts = () => {
  return useQuery({
    queryKey: queryKeys.workouts.lists(),
    queryFn: workoutsApi.getAll,
  })
}

export const useWorkout = (id: string) => {
  return useQuery({
    queryKey: queryKeys.workouts.detail(id),
    queryFn: () => workoutsApi.getById(id),
    enabled: !!id,
  })
}

export const useWorkoutsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: queryKeys.workouts.byCategory(categoryId),
    queryFn: () => workoutsApi.getByCategory(categoryId),
    enabled: !!categoryId,
  })
}

// Mutation hooks
export const useCreateWorkout = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (workout: WorkoutInsert) => workoutsApi.create(workout),
    onSuccess: (data) => {
      // Invalidate and refetch workouts queries
      queryClient.invalidateQueries({ queryKey: queryKeys.workouts.all })
      // Invalidate category-specific workouts
      if (data.category_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.workouts.byCategory(data.category_id) })
      }
    },
  })
}

export const useUpdateWorkout = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: WorkoutUpdate }) =>
      workoutsApi.update(id, updates),
    onSuccess: (data) => {
      // Update the specific workout in cache
      queryClient.setQueryData(queryKeys.workouts.detail(data.id), data)
      // Invalidate workouts lists
      queryClient.invalidateQueries({ queryKey: queryKeys.workouts.lists() })
      // Invalidate category-specific workouts
      if (data.category_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.workouts.byCategory(data.category_id) })
      }
      // Also invalidate related scores
      queryClient.invalidateQueries({ queryKey: queryKeys.scores.all })
    },
  })
}

export const useDeleteWorkout = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => workoutsApi.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.workouts.detail(id) })
      // Invalidate workouts lists
      queryClient.invalidateQueries({ queryKey: queryKeys.workouts.lists() })
      // Also invalidate related scores since they depend on workouts
      queryClient.invalidateQueries({ queryKey: queryKeys.scores.all })
    },
  })
}
