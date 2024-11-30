import { RouteObject } from 'react-router-dom'
import { SettingsPage } from '@pages/Dashboard/Settings'
import { CategoriesPage } from '@pages/Dashboard/Categories'
import { SubscriptionsPage } from '@pages/Dashboard/Subscriptions'
import { WorkoutsPage } from '@pages/Dashboard/Workouts'
import { AccessTime, AccessTimeFilled } from '@mui/icons-material'
import { CheckinPage } from '@pages/Dashboard/Checkin'
import { ScorePage } from '@pages/Dashboard/Score'
import { ChooseCategoryWorkoutPage } from '@pages/Dashboard/Score/subpages/ChooseCategoryWorkout'
import { WorkoutScorePage } from '@pages/Dashboard/Score/subpages/WorkoutScore'

export const dashboardRoutes: RouteObject[] = [
    {
        path: '/dashboard',
        handle: {
            icon: AccessTime,
            name: 'Geral',
        },
        children: [
            {
                path: '/dashboard/settings',
                Component: SettingsPage,
                handle: {
                    name: 'Configurações',
                },
            },
            {
                path: '/dashboard/categories',
                Component: CategoriesPage,
                handle: { name: 'Categorias' },
            },
            {
                path: '/dashboard/subscriptions',
                Component: SubscriptionsPage,
                handle: { name: 'Inscrições' },
            },
            {
                path: '/dashboard/workouts',
                Component: WorkoutsPage,
                handle: { name: 'Workouts' },
            },
        ],
    },
    {
        path: '/dashboard/event',
        handle: { name: 'Dia do Evento', icon: AccessTimeFilled },
        children: [
            {
                handle: { name: 'Check-in' },
                path: '/dashboard/event/checkin',
                Component: CheckinPage,
            },
            {
                handle: { name: 'Score' },
                path: '/dashboard/event/score',
                Component: ScorePage,
                children: [
                    {
                        handle: { name: 'Choose Category' },
                        path: '/dashboard/event/score',
                        Component: ChooseCategoryWorkoutPage,
                    },
                    {
                        handle: { name: 'Score' },
                        path: '/dashboard/event/score/:categoryId/:workoutId',
                        Component: WorkoutScorePage,
                    },
                ],
            },
            {
                handle: { name: 'Leaderboard' },
                path: '/dashboard/event/leaderboard',
            },
        ],
    },
]

export const DASHBOARD_PATHS = [
    '/dashboard/settings',
    '/dashboard/categories',
    '/dashboard/subscriptions',
    '/dashboard/workouts',
    '/dashboard/event',
    '/dashboard/event/checkin',
    '/dashboard/event/score',
    '/dashboard/event/score/:categoryId/:workoutId',
    '/dashboard/event/leaderboard',
] as const
