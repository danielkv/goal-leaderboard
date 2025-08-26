import { supabase } from '../supabase'
import type { Team, TeamInsert, TeamUpdate } from '../types'

export const teamsApi = {
  // Get all teams
  async getAll(): Promise<Team[]> {
    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        events (
          id,
          name,
          start_date,
          end_date
        )
      `)
      .order('name')

    if (error) throw error
    return data || []
  },

  // Get teams by event
  async getByEvent(eventId: string): Promise<Team[]> {
    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        events (
          id,
          name,
          start_date,
          end_date
        )
      `)
      .eq('event_id', eventId)
      .order('name')

    if (error) throw error
    return data || []
  },

  // Get team by ID
  async getById(id: string): Promise<Team | null> {
    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        events (
          id,
          name,
          start_date,
          end_date
        ),
        team_users (
          id,
          role,
          user_id
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new team
  async create(team: TeamInsert): Promise<Team> {
    const { data, error } = await supabase
      .from('teams')
      .insert(team)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update team
  async update(id: string, updates: TeamUpdate): Promise<Team> {
    const { data, error } = await supabase
      .from('teams')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete team
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Get teams by gym
  async getByGym(gym: string): Promise<Team[]> {
    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        events (
          id,
          name,
          start_date,
          end_date
        )
      `)
      .eq('gym', gym)
      .order('name')

    if (error) throw error
    return data || []
  }
}
