export interface Subscription {
    id: string
    name: string
    category: string
    amount: number
    paymentMethod: string
    status: SubscriptionStatus
}

export type SubscriptionStatus = 'paid' | 'pending' | 'canceled'
