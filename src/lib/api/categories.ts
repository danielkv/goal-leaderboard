import { supabase } from '../supabase'
import type { Category, CategoryInsert, CategoryUpdate, CategoryWithCounts } from '../types'

export const categoriesApi = {
  // Get all categories
  async getAll(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []
  },

  // Get category by ID
  async getById(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new category
  async create(category: CategoryInsert): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update category
  async update(id: string, updates: CategoryUpdate): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete category
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Get categories with member and subscription counts
  async getAllWithCounts(): Promise<CategoryWithCounts[]> {
    // This would require additional queries or views to get actual counts
    // For now, returning basic categories with placeholder counts
    const categories = await this.getAll()
    return categories.map(category => ({
      ...category,
      members: 0, // TODO: Implement actual count from related tables
      subscriptions: 0 // TODO: Implement actual count from related tables
    }))
  }
}
