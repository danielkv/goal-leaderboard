import { supabase } from '../supabase'
import type { Score, ScoreInsert, ScoreUpdate } from '../types'

export const scoresApi = {
  // Get all scores
  async getAll(): Promise<Score[]> {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get scores by workout
  async getByWorkout(workoutId: string): Promise<Score[]> {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('workout_id', workoutId)
      .order('result_value')

    if (error) throw error
    return data || []
  },

  // Get scores by team
  async getByTeam(teamId: string): Promise<Score[]> {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get score by ID
  async getById(id: string): Promise<Score | null> {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new score
  async create(score: ScoreInsert): Promise<Score> {
    const { data, error } = await supabase
      .from('scores')
      .insert(score)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update score
  async update(id: string, updates: ScoreUpdate): Promise<Score> {
    const { data, error } = await supabase
      .from('scores')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete score
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('scores')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Get leaderboard for a workout
  async getLeaderboard(workoutId: string): Promise<Score[]> {
    const { data, error } = await supabase
      .from('scores')
      .select(`
        *,
        teams (
          id,
          name,
          gym
        ),
        workouts (
          id,
          name,
          categories (
            id,
            name,
            gender,
            team_size
          )
        )
      `)
      .eq('workout_id', workoutId)
      .eq('status', 'published')
      .order('result_value')

    if (error) throw error
    return data || []
  }
}
