import { supabase } from '../supabase'
import type { Ticket, TicketInsert, TicketUpdate } from '../types'

export const ticketsApi = {
  // Get all tickets
  async getAll(): Promise<Ticket[]> {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        teams (
          id,
          name,
          gym,
          events (
            id,
            name
          )
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get tickets by team
  async getByTeam(teamId: string): Promise<Ticket[]> {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        teams (
          id,
          name,
          gym,
          events (
            id,
            name
          )
        )
      `)
      .eq('team_id', teamId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get ticket by ID
  async getById(id: string): Promise<Ticket | null> {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        teams (
          id,
          name,
          gym,
          events (
            id,
            name
          )
        ),
        transactions (
          id,
          amount,
          status,
          payment_method,
          created_at
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new ticket
  async create(ticket: TicketInsert): Promise<Ticket> {
    const { data, error } = await supabase
      .from('tickets')
      .insert(ticket)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update ticket
  async update(id: string, updates: TicketUpdate): Promise<Ticket> {
    const { data, error } = await supabase
      .from('tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete ticket
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Get tickets by status
  async getByStatus(status: 'active' | 'used' | 'cancelled'): Promise<Ticket[]> {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        teams (
          id,
          name,
          gym,
          events (
            id,
            name
          )
        )
      `)
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Update ticket status
  async updateStatus(id: string, status: 'active' | 'used' | 'cancelled'): Promise<Ticket> {
    return this.update(id, { status })
  }
}
