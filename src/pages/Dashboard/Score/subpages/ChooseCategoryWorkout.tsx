import { Button, Container, MenuItem, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { Category } from '@common/types/category'
import { Workout } from '@common/types/workout'
import { useNavigate } from 'react-router-dom'
import { buildUrl } from '@common/helpers/router'

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

export const ChooseCategoryWorkoutPage: React.FC = () => {
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
                <Button
                    onClick={() =>
                        navigate(
                            buildUrl(
                                '/dashboard/event/score/:categoryId/:workoutId',
                                { categoryId, workoutId }
                            )
                        )
                    }
                >
                    Pontuação
                </Button>
            </Stack>
        </Container>
    )
}
