import { buildUrl } from '@common/helpers/router'
import { Path, PathParams } from '@common/types/routes'
import { ComponentType, ReactNode } from 'react'

import { Link as RouterLink } from 'react-router-dom'

type TypedLinkProps<P extends Path> = {
    to: P
    params: PathParams<P>
    replace?: boolean
    component?: ComponentType
    children?: ReactNode
}

/**
 * Type-safe version of `react-router-dom/Link`.
 */
export const Link = <P extends Path>({
    to,
    params,
    replace,
    children,
}: TypedLinkProps<P>) => {
    return (
        <RouterLink to={buildUrl(to, params)} replace={replace}>
            {children}
        </RouterLink>
    )
}
