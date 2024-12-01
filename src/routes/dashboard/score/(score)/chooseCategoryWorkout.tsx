import { Button, Container, MenuItem, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { Category } from '@common/types/category'
import { Workout } from '@common/types/workout'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

const categories: Category[] = [
  {
    id: '1',
    name: 'Categoria 1',
    members: 10,
    subscriptions: 10,
  },
  {
    id: '2',
    name: 'Categoria 2',
    members: 10,
    subscriptions: 10,
  },
  {
    id: '3',
    name: 'Categoria 3',
    members: 10,
    subscriptions: 10,
  },
]

const workouts: Workout[] = [
  {
    id: '1',
    name: 'Elite Masc',
    type: 'amrap',
    timecap: 600,
    result: 'time',
    tiebreak: 'reps',
  },
  {
    id: '2',
    name: 'Beginner Fem',
    type: 'fortime',
    timecap: 900,
    result: 'reps',
    tiebreak: 'time',
  },
  {
    id: '3',
    name: 'Intermediate Masc',
    type: 'emom',
    timecap: 1200,
    result: 'time',
    tiebreak: 'reps',
  },
]

const ChooseCategoryWorkoutPage: React.FC = () => {
  const navigate = useNavigate()
  const [categoryId, setCategoryId] = useState('')
  const [workoutId, setWorkoutId] = useState('')
  return (
    <Container maxWidth="sm">
      <Stack gap={4}>
        <TextField
          select
          label="Categoria"
          onChange={(e) => setCategoryId(e.target.value)}
          value={categoryId}
        >
          {categories.map((item) => (
            <MenuItem value={item.id}>{item.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Workout"
          onChange={(e) => setWorkoutId(e.target.value)}
          value={workoutId}
        >
          {workouts.map((item) => (
            <MenuItem value={item.id}>{item.name}</MenuItem>
          ))}
        </TextField>
        <Button onClick={() => navigate({ to: '/dashboard/score' })}>
          Pontuação
        </Button>
      </Stack>
    </Container>
  )
}

export const Route = createFileRoute(
  '/dashboard/score/(score)/chooseCategoryWorkout',
)({
  component: ChooseCategoryWorkoutPage,
})
