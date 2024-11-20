import { RouteObject } from 'react-router-dom'
import { SettingsPage } from '@pages/Dashboard/Settings'
import { CategoriesPage } from '@pages/Dashboard/Categories'
import { SubscriptionsPage } from '@pages/Dashboard/Subscriptions'
import { WorkoutsPage } from '@pages/Dashboard/Workouts'
import { AccessTime, AccessTimeFilled } from '@mui/icons-material'
import { CheckinPage } from '@pages/Dashboard/Checkin'

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
            },
            {
                handle: { name: 'Leaderboard' },
                path: '/dashboard/event/leaderboard',
            },
        ],
    },
]
