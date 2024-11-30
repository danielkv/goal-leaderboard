export type ResultType = 'time' | 'reps' | 'rounds'
export type WorkoutType = 'amrap' | 'fortime' | 'emom'

export interface Workout {
    id: string
    name: string
    type: WorkoutType
    timecap: number
    result: ResultType
    tiebreak: ResultType
}
