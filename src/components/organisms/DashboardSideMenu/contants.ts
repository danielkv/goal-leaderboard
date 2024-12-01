import { AccessTime, AccessTimeFilled } from '@mui/icons-material'
import { DashboardNavigation } from './types'

export const dashboardNavigation: DashboardNavigation[] = [
    {
        label: 'Geral',
        icon: AccessTime,
        children: [
            {
                path: '/dashboard/settings',
                label: 'Configurações',
            },
            {
                path: '/dashboard/categories',
                label: 'Categorias',
            },
            {
                path: '/dashboard/subscriptions',
                label: 'Inscrições',
            },
            {
                path: '/dashboard/workouts',
                label: 'Workouts',
            },
        ],
    },
    {
        label: 'Dia do Evento',
        icon: AccessTimeFilled,
        children: [
            {
                path: '/dashboard/checkin',
                label: 'Check-in',
            },
            {
                path: '/dashboard/score/chooseCategoryWorkout',
                label: 'Score',
            },
            {
                path: '/dashboard/workouts',
                label: 'Leaderboard',
            },
        ],
    },
]
