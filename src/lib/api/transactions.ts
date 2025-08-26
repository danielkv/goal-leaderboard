import { supabase } from '../supabase'
import type { Transaction, TransactionInsert, TransactionUpdate } from '../types'

export const transactionsApi = {
  // Get all transactions
  async getAll(): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        tickets (
          id,
          ticket_number,
          price,
          teams (
            id,
            name,
            gym
          )
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get transactions by ticket
  async getByTicket(ticketId: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        tickets (
          id,
          ticket_number,
          price,
          teams (
            id,
            name,
            gym
          )
        )
      `)
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get transaction by ID
  async getById(id: string): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        tickets (
          id,
          ticket_number,
          price,
          teams (
            id,
            name,
            gym
          )
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new transaction
  async create(transaction: TransactionInsert): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update transaction
  async update(id: string, updates: TransactionUpdate): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete transaction
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Get transactions by status
  async getByStatus(status: 'pending' | 'completed' | 'failed' | 'refunded'): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        tickets (
          id,
          ticket_number,
          price,
          teams (
            id,
            name,
            gym
          )
        )
      `)
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Update transaction status
  async updateStatus(id: string, status: 'pending' | 'completed' | 'failed' | 'refunded'): Promise<Transaction> {
    return this.update(id, { status })
  },

  // Get transactions by payment method
  async getByPaymentMethod(paymentMethod: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        tickets (
          id,
          ticket_number,
          price,
          teams (
            id,
            name,
            gym
          )
        )
      `)
      .eq('payment_method', paymentMethod)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }
}
