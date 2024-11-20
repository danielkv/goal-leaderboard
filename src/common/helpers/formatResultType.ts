import { ResultType } from '@common/types/workout'

export function formatResultType(resultType: ResultType): string {
    switch (resultType) {
        case 'time':
            return 'Tempo'
        case 'reps':
            return 'Repeticões'
        case 'rounds':
            return 'Rounds'
    }
}
