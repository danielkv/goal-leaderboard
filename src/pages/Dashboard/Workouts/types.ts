import { ResultType, WorkoutType } from '@common/types/workout'

export interface Workout {
    id: string
    name: string
    type: WorkoutType
    timecap: number
    result: ResultType
    tiebreak: ResultType
}
