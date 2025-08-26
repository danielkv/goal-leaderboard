# Shared Types Documentation

This folder contains all TypeScript types used throughout the application, providing a centralized and reusable type system.

## Structure

```
src/lib/types/
├── index.ts           # Main export file - import all types from here
├── common.ts          # Common/shared types used across entities
├── categories.ts      # Category-related types
├── events.ts          # Event-related types
├── teams.ts           # Team-related types
├── workouts.ts        # Workout-related types
├── scores.ts          # Score-related types
├── checkins.ts        # Check-in-related types
├── tickets.ts         # Ticket-related types
├── transactions.ts    # Transaction-related types
└── README.md          # This documentation
```

## Usage

### Import Types

```typescript
// Import specific types
import type { Category, Event, Team } from '@/lib/types'

// Import all types (not recommended for large applications)
import type * as Types from '@/lib/types'

// Import with aliases
import type { 
  Category as CategoryType,
  CategoryInsert as CreateCategoryData 
} from '@/lib/types'
```

### Type Categories

Each entity file exports several type variants:

#### Base Types (from database)
- `Entity` - Complete database row type
- `EntityInsert` - Type for creating new records
- `EntityUpdate` - Type for updating existing records

#### Extended Types (for API responses)
- `EntityWithRelations` - Entity with related data joined
- `EntityWithDetails` - Entity with computed fields and statistics
- `EntityWithCounts` - Entity with count aggregations

#### Utility Types
- `EntityFilters` - For filtering/searching entities
- `EntityFormData` - For form submissions
- `EntityStats` - For statistics and analytics

### Examples

#### Categories
```typescript
import type { 
  Category, 
  CategoryInsert, 
  CategoryWithCounts,
  CategoryFilters 
} from '@/lib/types'

// Create a new category
const newCategory: CategoryInsert = {
  name: 'RX Masculino',
  team_size: 1,
  gender: 'male'
}

// Filter categories
const filters: CategoryFilters = {
  gender: 'female',
  team_size: 2
}

// Category with additional data
const categoryWithStats: CategoryWithCounts = {
  id: '123',
  name: 'RX Feminino',
  team_size: 1,
  gender: 'female',
  created_at: '2024-01-01T00:00:00Z',
  members: 25,
  subscriptions: 15
}
```

#### Events
```typescript
import type { 
  Event, 
  EventInsert, 
  EventWithTeamsCount,
  EventStatus 
} from '@/lib/types'

// Create event
const newEvent: EventInsert = {
  name: 'CrossFit Open 2024',
  description: 'Competição mundial',
  start_date: '2024-02-29T00:00:00',
  end_date: '2024-04-08T23:59:59',
  location: 'Mundial',
  address: 'Várias Localidades'
}

// Event with team count
const eventWithTeams: EventWithTeamsCount = {
  ...event,
  teams_count: 150
}
```

#### Transactions & Payments
```typescript
import type { 
  Transaction, 
  TransactionInsert, 
  PaymentRequest,
  PaymentMethod 
} from '@/lib/types'

// Create payment
const paymentRequest: PaymentRequest = {
  ticket_id: 'ticket-123',
  amount: 150.00,
  currency: 'BRL',
  payment_method: 'pix',
  customer_info: {
    name: 'João Silva',
    email: 'joao@email.com',
    document: '12345678901'
  }
}

// Transaction data
const transaction: TransactionInsert = {
  amount: 150.00,
  currency: 'BRL',
  status: 'pending',
  payment_method: 'pix',
  ticket_id: 'ticket-123'
}
```

## Common Types

### API Response Types
```typescript
import type { ApiResponse, PaginatedResponse } from '@/lib/types'

// Simple API response
const response: ApiResponse<Category[]> = {
  data: categories,
  success: true,
  message: 'Categorias carregadas com sucesso'
}

// Paginated response
const paginatedResponse: PaginatedResponse<Event> = {
  data: events,
  success: true,
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    total_pages: 10,
    has_next: true,
    has_prev: false
  }
}
```

### Form and UI Types
```typescript
import type { 
  FormState, 
  LoadingState, 
  SelectOption,
  Notification 
} from '@/lib/types'

// Form state management
const formState: FormState = 'submitting'

// Select options for dropdowns
const genderOptions: SelectOption<string>[] = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Feminino' },
  { value: 'mixed', label: 'Misto' }
]

// Notifications
const notification: Notification = {
  id: 'notif-1',
  type: 'success',
  title: 'Sucesso!',
  message: 'Categoria criada com sucesso',
  timestamp: '2024-01-01T12:00:00Z',
  read: false
}
```

## Type Safety Benefits

### 1. Compile-time Validation
```typescript
// TypeScript will catch this error at compile time
const invalidCategory: CategoryInsert = {
  name: 'Test',
  team_size: 'invalid', // ❌ Error: Type 'string' is not assignable to type 'number'
  gender: 'invalid'     // ❌ Error: Type 'invalid' is not assignable to type 'male' | 'female' | 'mixed'
}
```

### 2. IntelliSense Support
- Auto-completion for object properties
- Type hints and documentation
- Refactoring safety

### 3. API Contract Enforcement
```typescript
// API functions are type-safe
const createCategory = async (data: CategoryInsert): Promise<Category> => {
  // TypeScript ensures data matches CategoryInsert structure
  return categoriesApi.create(data)
}
```

## Best Practices

### 1. Use Specific Types
```typescript
// ✅ Good - specific type
const handleCreateEvent = (data: EventInsert) => { ... }

// ❌ Bad - generic type
const handleCreateEvent = (data: any) => { ... }
```

### 2. Leverage Union Types
```typescript
// ✅ Good - type-safe status
const updateStatus = (status: TransactionStatus) => { ... }

// ❌ Bad - string allows any value
const updateStatus = (status: string) => { ... }
```

### 3. Use Type Guards
```typescript
const isCompletedTransaction = (transaction: Transaction): transaction is Transaction & { status: 'completed' } => {
  return transaction.status === 'completed'
}

if (isCompletedTransaction(transaction)) {
  // TypeScript knows transaction.status is 'completed'
  console.log('Transaction completed!')
}
```

### 4. Extend Types When Needed
```typescript
// Extend existing types for specific use cases
type CategoryWithActions = Category & {
  canEdit: boolean
  canDelete: boolean
}
```

## Migration Guide

If you're updating existing code to use these shared types:

### Before
```typescript
// Old way - types defined in each file
import type { Database } from '../database.types'
type Category = Database['public']['Tables']['categories']['Row']
```

### After
```typescript
// New way - import from shared types
import type { Category } from '@/lib/types'
```

### Update Imports
1. Remove local type definitions
2. Import from `@/lib/types`
3. Update any custom extended types to use the new base types

This centralized type system improves maintainability, reduces duplication, and ensures consistency across the entire application.
