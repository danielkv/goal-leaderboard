import { supabase } from '../supabase'
import type { Checkin, CheckinInsert, CheckinUpdate } from '../types'

export const checkinsApi = {
  // Get all checkins
  async getAll(): Promise<Checkin[]> {
    const { data, error } = await supabase
      .from('checkins')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get checkins by category
  async getByCategory(categoryId: string): Promise<Checkin[]> {
    const { data, error } = await supabase
      .from('checkins')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get checkin by ID
  async getById(id: string): Promise<Checkin | null> {
    const { data, error } = await supabase
      .from('checkins')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new checkin
  async create(checkin: CheckinInsert): Promise<Checkin> {
    const { data, error } = await supabase
      .from('checkins')
      .insert(checkin)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update checkin
  async update(id: string, updates: CheckinUpdate): Promise<Checkin> {
    const { data, error } = await supabase
      .from('checkins')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete checkin
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('checkins')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Update checkin status
  async updateStatus(id: string, status: 'pending' | 'checked' | 'noshow'): Promise<Checkin> {
    return this.update(id, { status })
  },

  // Get checkins by status
  async getByStatus(status: 'pending' | 'checked' | 'noshow'): Promise<Checkin[]> {
    const { data, error } = await supabase
      .from('checkins')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }
}
