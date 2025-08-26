import { supabase } from '../supabase'
import type { Event, EventInsert, EventUpdate, EventWithTeamsCount } from '../types'

export const eventsApi = {
  // Get all events
  async getAll(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get event by ID
  async getById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new event
  async create(event: EventInsert): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update event
  async update(id: string, updates: EventUpdate): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete event
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Get upcoming events
  async getUpcoming(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('end_date', new Date().toISOString())
      .order('start_date')

    if (error) throw error
    return data || []
  },

  // Get events with teams count
  async getAllWithTeamsCount(): Promise<EventWithTeamsCount[]> {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        teams (count)
      `)
      .order('start_date', { ascending: false })

    if (error) throw error
    return (data || []).map(event => ({
      ...event,
      teams_count: event.teams?.[0]?.count || 0
    }))
  }
}
