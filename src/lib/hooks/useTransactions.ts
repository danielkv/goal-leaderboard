import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionsApi } from '../api'
import { queryKeys } from '../queryClient'
import type { Transaction, TransactionInsert, TransactionUpdate } from '../types'

// Query hooks
export const useTransactions = () => {
  return useQuery({
    queryKey: queryKeys.transactions.lists(),
    queryFn: transactionsApi.getAll,
  })
}

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: () => transactionsApi.getById(id),
    enabled: !!id,
  })
}

export const useTransactionsByTicket = (ticketId: string) => {
  return useQuery({
    queryKey: queryKeys.transactions.byTicket(ticketId),
    queryFn: () => transactionsApi.getByTicket(ticketId),
    enabled: !!ticketId,
  })
}

export const useTransactionsByStatus = (status: 'pending' | 'completed' | 'failed' | 'refunded') => {
  return useQuery({
    queryKey: queryKeys.transactions.byStatus(status),
    queryFn: () => transactionsApi.getByStatus(status),
    enabled: !!status,
  })
}

export const useTransactionsByPaymentMethod = (paymentMethod: string) => {
  return useQuery({
    queryKey: queryKeys.transactions.byPaymentMethod(paymentMethod),
    queryFn: () => transactionsApi.getByPaymentMethod(paymentMethod),
    enabled: !!paymentMethod,
  })
}

// Mutation hooks
export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (transaction: TransactionInsert) => transactionsApi.create(transaction),
    onSuccess: (data) => {
      // Invalidate and refetch transactions queries
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all })
      // Invalidate ticket-specific transactions
      if (data.ticket_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions.byTicket(data.ticket_id) })
      }
      // Invalidate status-specific transactions
      if (data.status) {
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions.byStatus(data.status) })
      }
      // Invalidate payment method specific transactions
      if (data.payment_method) {
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions.byPaymentMethod(data.payment_method) })
      }
    },
  })
}

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: TransactionUpdate }) =>
      transactionsApi.update(id, updates),
    onSuccess: (data) => {
      // Update the specific transaction in cache
      queryClient.setQueryData(queryKeys.transactions.detail(data.id), data)
      // Invalidate transactions lists
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.lists() })
      // Invalidate related queries
      if (data.ticket_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions.byTicket(data.ticket_id) })
      }
      if (data.status) {
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions.byStatus(data.status) })
      }
      if (data.payment_method) {
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions.byPaymentMethod(data.payment_method) })
      }
    },
  })
}

export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'completed' | 'failed' | 'refunded' }) =>
      transactionsApi.updateStatus(id, status),
    onSuccess: (data) => {
      // Update the specific transaction in cache
      queryClient.setQueryData(queryKeys.transactions.detail(data.id), data)
      // Invalidate all status-based queries since status changed
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.lists() })
      queryClient.invalidateQueries({ queryKey: [...queryKeys.transactions.all, 'byStatus'] })
      
      // If transaction is completed, might need to update ticket status
      if (data.status === 'completed' && data.ticket_id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.tickets.detail(data.ticket_id) })
        queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all })
      }
    },
  })
}

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => transactionsApi.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.transactions.detail(id) })
      // Invalidate transactions lists
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.lists() })
      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all })
    },
  })
}

// Utility hooks for common transaction operations
export const useProcessPayment = () => {
  const createTransaction = useCreateTransaction()
  const updateTransactionStatus = useUpdateTransactionStatus()
  
  return {
    // Create a new transaction
    createPayment: createTransaction.mutate,
    // Update payment status
    completePayment: (id: string) => updateTransactionStatus.mutate({ id, status: 'completed' }),
    failPayment: (id: string) => updateTransactionStatus.mutate({ id, status: 'failed' }),
    refundPayment: (id: string) => updateTransactionStatus.mutate({ id, status: 'refunded' }),
    // Loading states
    isProcessing: createTransaction.isPending || updateTransactionStatus.isPending,
    error: createTransaction.error || updateTransactionStatus.error,
  }
}
