import { ResultType } from './workout'

export interface ScoreResult {
    type: ResultType
    value: number
}

export enum ScoreStatus {
    PUBLISHED = 'published',
    NON_PUBLISHED = 'non-published',
    PENDING = 'pending',
}

export interface Score {
    id: string
    team: string
    box: string
    result: ScoreResult
    tiebreak: ScoreResult
    status: ScoreStatus
}
