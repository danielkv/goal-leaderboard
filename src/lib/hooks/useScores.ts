import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { scoresApi } from '../api'
import { queryKeys } from '../queryClient'
import type { Score, ScoreInsert, ScoreUpdate } from '../types'

// Query hooks
export const useScores = () => {
  return useQuery({
    queryKey: queryKeys.scores.lists(),
    queryFn: scoresApi.getAll,
  })
}

export const useScore = (id: string) => {
  return useQuery({
    queryKey: queryKeys.scores.detail(id),
    queryFn: () => scoresApi.getById(id),
    enabled: !!id,
  })
}

export const useScoresByWorkout = (workoutId: string) => {
  return useQuery({
    queryKey: queryKeys.scores.byWorkout(workoutId),
    queryFn: () => scoresApi.getByWorkout(workoutId),
    enabled: !!workoutId,
  })
}

export const useScoresByTeam = (teamId: string) => {
  return useQuery({
    queryKey: queryKeys.scores.byTeam(teamId),
    queryFn: () => scoresApi.getByTeam(teamId),
    enabled: !!teamId,
  })
}

export const useLeaderboard = (workoutId: string) => {
  return useQuery({
    queryKey: queryKeys.scores.leaderboard(workoutId),
    queryFn: () => scoresApi.getLeaderboard(workoutId),
    enabled: !!workoutId,
  })
}

// Mutation hooks
export const useCreateScore = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (score: ScoreInsert) => scoresApi.create(score),
    onSuccess: (data) => {
      // Invalidate and refetch scores queries
      queryClient.invalidateQueries({ queryKey: queryKeys.scores.all })
      // Invalidate specific workout and team queries
      if (data.workout_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.scores.byWorkout(data.workout_id) })
        queryClient.invalidateQueries({ queryKey: queryKeys.scores.leaderboard(data.workout_id) })
      }
      if (data.team_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.scores.byTeam(data.team_id) })
      }
    },
  })
}

export const useUpdateScore = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: ScoreUpdate }) =>
      scoresApi.update(id, updates),
    onSuccess: (data) => {
      // Update the specific score in cache
      queryClient.setQueryData(queryKeys.scores.detail(data.id), data)
      // Invalidate scores lists
      queryClient.invalidateQueries({ queryKey: queryKeys.scores.lists() })
      // Invalidate specific workout and team queries
      if (data.workout_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.scores.byWorkout(data.workout_id) })
        queryClient.invalidateQueries({ queryKey: queryKeys.scores.leaderboard(data.workout_id) })
      }
      if (data.team_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.scores.byTeam(data.team_id) })
      }
    },
  })
}

export const useDeleteScore = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => scoresApi.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.scores.detail(id) })
      // Invalidate scores lists
      queryClient.invalidateQueries({ queryKey: queryKeys.scores.lists() })
      // Invalidate all related queries since we don't have the score data anymore
      queryClient.invalidateQueries({ queryKey: queryKeys.scores.all })
    },
  })
}
