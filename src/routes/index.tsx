import { createFileRoute } from '@tanstack/react-router'

const HomePage: React.FC = () => {
    return <div>home</div>
}

export const Route = createFileRoute('/')({ component: HomePage })
