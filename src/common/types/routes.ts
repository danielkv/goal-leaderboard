/* eslint-disable @typescript-eslint/no-unused-vars */
import { PATHS } from '@router/general.routes'
import React from 'react'

export interface RouteHandle {
    icon?: React.ElementType
    name?: string
}

type ExtractRouteParams<T> = string extends T
    ? Record<string, string>
    : T extends `${infer _Start}:${infer Param}/${infer Rest}`
      ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
      : T extends `${infer _Start}:${infer Param}`
        ? { [k in Param]: string }
        : never

export type Path<P extends typeof PATHS = typeof PATHS> = P[number]

// Object which has matching parameter keys for a path.
export type PathParams<P extends Path> = ExtractRouteParams<P>
