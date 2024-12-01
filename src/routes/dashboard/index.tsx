import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
    component: RouteComponent,
    staticData: {
        name: 'Dashboard',
    },
})

function RouteComponent() {
    return <div>Hello "/dashboard/"!</div>
}
