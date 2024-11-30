import { Path, PathParams } from '@common/types/routes'

/**
 * Build an url with a path and its parameters.
 * @example
 * buildUrl(
 *   '/a/:first/:last',
 *   { first: 'p', last: 'q' },
 * ) // returns '/a/p/q'
 * @param path target path.
 * @param params parameters.
 
*/

export function buildUrl<P extends Path>(
    path: P,
    params?: PathParams<P>
): string {
    let ret: string = path

    // Upcast `params` to be used in string replacement.
    const paramObj: Record<string, string> | undefined = params

    if (!paramObj) return ret

    for (const key of Object.keys(paramObj)) {
        ret = ret.replace(`:${key}`, paramObj[key])
    }

    return ret
}
