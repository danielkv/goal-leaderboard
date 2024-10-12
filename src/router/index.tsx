import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { generalRoutes } from './general.routes'

export const GeneralRouter: React.FC = () => {
    return <RouterProvider router={generalRoutes} />
}
