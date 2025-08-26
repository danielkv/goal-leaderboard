import { supabase } from '../supabase'
import type { Workout, WorkoutInsert, WorkoutUpdate } from '../types'

export const workoutsApi = {
  // Get all workouts
  async getAll(): Promise<Workout[]> {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []
  },

  // Get workouts by category
  async getByCategory(categoryId: string): Promise<Workout[]> {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('category_id', categoryId)
      .order('name')

    if (error) throw error
    return data || []
  },

  // Get workout by ID
  async getById(id: string): Promise<Workout | null> {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new workout
  async create(workout: WorkoutInsert): Promise<Workout> {
    const { data, error } = await supabase
      .from('workouts')
      .insert(workout)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update workout
  async update(id: string, updates: WorkoutUpdate): Promise<Workout> {
    const { data, error } = await supabase
      .from('workouts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete workout
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
