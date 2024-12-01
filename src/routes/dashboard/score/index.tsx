import { createFileRoute, Outlet } from '@tanstack/react-router'

export const ScorePage: React.FC = () => {
    return <Outlet />
}

export const Route = createFileRoute('/dashboard/score/')({
    component: ScorePage,
})
