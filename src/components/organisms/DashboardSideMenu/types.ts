import { LinkProps, ReactNode } from '@tanstack/react-router'

export interface DashboardNavigation {
    label: string
    path?: LinkProps['to']
    icon?: ReactNode
    children?: DashboardNavigation[]
}
