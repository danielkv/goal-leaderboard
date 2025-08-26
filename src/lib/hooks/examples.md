# React Query Hooks Usage Examples

## Categories

```tsx
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/lib/hooks'

function CategoriesComponent() {
  // Fetch all categories
  const { data: categories, isLoading, error } = useCategories()
  
  // Create category mutation
  const createCategory = useCreateCategory()
  
  // Update category mutation
  const updateCategory = useUpdateCategory()
  
  // Delete category mutation
  const deleteCategory = useDeleteCategory()
  
  const handleCreate = () => {
    createCategory.mutate({
      name: 'Nova Categoria',
      team_size: 1,
      gender: 'mixed'
    })
  }
  
  const handleUpdate = (id: string) => {
    updateCategory.mutate({
      id,
      updates: { name: 'Categoria Atualizada' }
    })
  }
  
  const handleDelete = (id: string) => {
    deleteCategory.mutate(id)
  }
  
  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error.message}</div>
  
  return (
    <div>
      {categories?.map(category => (
        <div key={category.id}>
          <span>{category.name}</span>
          <button onClick={() => handleUpdate(category.id)}>Editar</button>
          <button onClick={() => handleDelete(category.id)}>Excluir</button>
        </div>
      ))}
      <button onClick={handleCreate}>Criar Nova</button>
    </div>
  )
}
```

## Events

```tsx
import { useEvents, useUpcomingEvents, useCreateEvent } from '@/lib/hooks'

function EventsComponent() {
  // Fetch all events
  const { data: events } = useEvents()
  
  // Fetch only upcoming events
  const { data: upcomingEvents } = useUpcomingEvents()
  
  // Create event mutation
  const createEvent = useCreateEvent()
  
  const handleCreateEvent = () => {
    createEvent.mutate({
      name: 'Novo Evento',
      description: 'Descrição do evento',
      start_date: '2024-12-01T09:00:00',
      end_date: '2024-12-01T18:00:00',
      location: 'São Paulo',
      address: 'Rua das Flores, 123'
    })
  }
  
  return (
    <div>
      <h2>Próximos Eventos</h2>
      {upcomingEvents?.map(event => (
        <div key={event.id}>{event.name}</div>
      ))}
      
      <button onClick={handleCreateEvent}>Criar Evento</button>
    </div>
  )
}
```

## Teams

```tsx
import { useTeams, useTeamsByEvent, useCreateTeam } from '@/lib/hooks'

function TeamsComponent({ eventId }: { eventId: string }) {
  // Fetch teams for specific event
  const { data: teams } = useTeamsByEvent(eventId)
  
  // Create team mutation
  const createTeam = useCreateTeam()
  
  const handleCreateTeam = () => {
    createTeam.mutate({
      name: 'Nova Equipe',
      gym: 'CrossFit Central',
      event_id: eventId
    })
  }
  
  return (
    <div>
      <h2>Equipes do Evento</h2>
      {teams?.map(team => (
        <div key={team.id}>
          {team.name} - {team.gym}
        </div>
      ))}
      
      <button onClick={handleCreateTeam}>Criar Equipe</button>
    </div>
  )
}
```

## Scores & Leaderboard

```tsx
import { useLeaderboard, useCreateScore } from '@/lib/hooks'

function LeaderboardComponent({ workoutId }: { workoutId: string }) {
  // Fetch leaderboard for workout
  const { data: leaderboard, isLoading } = useLeaderboard(workoutId)
  
  // Create score mutation
  const createScore = useCreateScore()
  
  const handleSubmitScore = (teamId: string) => {
    createScore.mutate({
      team_id: teamId,
      workout_id: workoutId,
      result_type: 'time',
      result_value: 180, // 3 minutes in seconds
      status: 'published'
    })
  }
  
  if (isLoading) return <div>Carregando leaderboard...</div>
  
  return (
    <div>
      <h2>Leaderboard</h2>
      {leaderboard?.map((score, index) => (
        <div key={score.id}>
          <span>#{index + 1}</span>
          <span>{score.teams?.name}</span>
          <span>{score.result_value}s</span>
        </div>
      ))}
    </div>
  )
}
```

## Error Handling

```tsx
import { useCategories } from '@/lib/hooks'

function CategoriesWithErrorHandling() {
  const { data, isLoading, error, refetch } = useCategories()
  
  if (isLoading) {
    return <div>Carregando categorias...</div>
  }
  
  if (error) {
    return (
      <div>
        <p>Erro ao carregar categorias: {error.message}</p>
        <button onClick={() => refetch()}>Tentar novamente</button>
      </div>
    )
  }
  
  return (
    <div>
      {data?.map(category => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  )
}
```

## Loading States

```tsx
import { useCreateCategory } from '@/lib/hooks'

function CreateCategoryForm() {
  const createCategory = useCreateCategory()
  
  const handleSubmit = (formData: any) => {
    createCategory.mutate(formData, {
      onSuccess: () => {
        console.log('Categoria criada com sucesso!')
      },
      onError: (error) => {
        console.error('Erro ao criar categoria:', error)
      }
    })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button 
        type="submit" 
        disabled={createCategory.isPending}
      >
        {createCategory.isPending ? 'Criando...' : 'Criar Categoria'}
      </button>
      
      {createCategory.error && (
        <div>Erro: {createCategory.error.message}</div>
      )}
    </form>
  )
}
```

## Workouts

```tsx
import { useWorkouts, useWorkoutsByCategory, useCreateWorkout } from '@/lib/hooks'

function WorkoutsComponent({ categoryId }: { categoryId: string }) {
  // Fetch workouts for specific category
  const { data: workouts } = useWorkoutsByCategory(categoryId)
  
  // Create workout mutation
  const createWorkout = useCreateWorkout()
  
  const handleCreateWorkout = () => {
    createWorkout.mutate({
      name: 'Fran',
      type: 'fortime',
      timecap: 300, // 5 minutos
      result: 'time',
      tiebreak: 'time',
      category_id: categoryId,
      event_id: 'event-id-here'
    })
  }
  
  return (
    <div>
      <h2>Workouts da Categoria</h2>
      {workouts?.map(workout => (
        <div key={workout.id}>
          {workout.name} - {workout.type} - {workout.timecap}s
        </div>
      ))}
      
      <button onClick={handleCreateWorkout}>Criar Workout</button>
    </div>
  )
}
```

## Check-ins

```tsx
import { useCheckins, useCheckinsByStatus, useUpdateCheckinStatus } from '@/lib/hooks'

function CheckinsComponent() {
  // Fetch pending check-ins
  const { data: pendingCheckins } = useCheckinsByStatus('pending')
  
  // Update check-in status
  const updateStatus = useUpdateCheckinStatus()
  
  const handleCheckIn = (id: string) => {
    updateStatus.mutate({ id, status: 'checked' })
  }
  
  const handleNoShow = (id: string) => {
    updateStatus.mutate({ id, status: 'noshow' })
  }
  
  return (
    <div>
      <h2>Check-ins Pendentes</h2>
      {pendingCheckins?.map(checkin => (
        <div key={checkin.id}>
          <span>{checkin.name}</span>
          <button onClick={() => handleCheckIn(checkin.id)}>
            ✓ Check-in
          </button>
          <button onClick={() => handleNoShow(checkin.id)}>
            ✗ Faltou
          </button>
        </div>
      ))}
    </div>
  )
}
```

## Tickets & Transactions

```tsx
import { 
  useTicketsByTeam, 
  useTransactionsByTicket, 
  useProcessPayment 
} from '@/lib/hooks'

function TicketPaymentComponent({ teamId, ticketId }: { teamId: string; ticketId: string }) {
  // Fetch team tickets
  const { data: tickets } = useTicketsByTeam(teamId)
  
  // Fetch ticket transactions
  const { data: transactions } = useTransactionsByTicket(ticketId)
  
  // Payment processing utilities
  const { createPayment, completePayment, isProcessing, error } = useProcessPayment()
  
  const handleCreatePayment = () => {
    createPayment({
      amount: 150.00,
      currency: 'BRL',
      status: 'pending',
      payment_method: 'pix',
      ticket_id: ticketId
    })
  }
  
  const handleCompletePayment = (transactionId: string) => {
    completePayment(transactionId)
  }
  
  return (
    <div>
      <h2>Ingressos da Equipe</h2>
      {tickets?.map(ticket => (
        <div key={ticket.id}>
          {ticket.ticket_number} - R$ {ticket.price} - {ticket.status}
        </div>
      ))}
      
      <h3>Transações</h3>
      {transactions?.map(transaction => (
        <div key={transaction.id}>
          R$ {transaction.amount} - {transaction.status}
          {transaction.status === 'pending' && (
            <button onClick={() => handleCompletePayment(transaction.id)}>
              Confirmar Pagamento
            </button>
          )}
        </div>
      ))}
      
      <button 
        onClick={handleCreatePayment}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processando...' : 'Criar Pagamento'}
      </button>
      
      {error && <div>Erro: {error.message}</div>}
    </div>
  )
}
```

## Filtros Avançados

```tsx
import { 
  useTransactionsByStatus, 
  useTransactionsByPaymentMethod,
  useTicketsByStatus 
} from '@/lib/hooks'

function AdminDashboard() {
  // Transações por status
  const { data: pendingTransactions } = useTransactionsByStatus('pending')
  const { data: completedTransactions } = useTransactionsByStatus('completed')
  
  // Transações por método de pagamento
  const { data: pixTransactions } = useTransactionsByPaymentMethod('pix')
  const { data: cardTransactions } = useTransactionsByPaymentMethod('card')
  
  // Tickets ativos
  const { data: activeTickets } = useTicketsByStatus('active')
  
  return (
    <div>
      <h2>Dashboard Administrativo</h2>
      
      <section>
        <h3>Transações Pendentes ({pendingTransactions?.length || 0})</h3>
        <h3>Transações Concluídas ({completedTransactions?.length || 0})</h3>
      </section>
      
      <section>
        <h3>PIX: {pixTransactions?.length || 0}</h3>
        <h3>Cartão: {cardTransactions?.length || 0}</h3>
      </section>
      
      <section>
        <h3>Ingressos Ativos: {activeTickets?.length || 0}</h3>
      </section>
    </div>
  )
}
```

## Key Features

- **Automatic Caching**: Data is cached and reused across components
- **Background Updates**: Data is refetched in the background when stale
- **Optimistic Updates**: UI updates immediately, rolls back on error
- **Error Handling**: Built-in error states and retry logic
- **Loading States**: Easy access to loading and pending states
- **Invalidation**: Smart cache invalidation when data changes
- **DevTools**: React Query DevTools for debugging (available in development)
- **Payment Processing**: Specialized hooks for transaction management
- **Status Management**: Easy status updates for check-ins and tickets
