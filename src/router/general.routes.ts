import { createBrowserRouter } from 'react-router-dom'
import { DASHBOARD_PATHS, dashboardRoutes } from './dashboard.routes'
import { GeneralLayout } from '@components/templates/GeneralLayout'
import { DashboardLayout } from '@components/templates/DashboardLayout'

export const generalRoutes = createBrowserRouter([
    {
        id: 'Home',
        path: '/',
        Component: GeneralLayout,
    },
    {
        id: 'Dashboard',
        path: '/dashboard',
        Component: DashboardLayout,
        children: dashboardRoutes,
    },
])

export const PATHS = ['/', '/dashboard', ...DASHBOARD_PATHS] as const
