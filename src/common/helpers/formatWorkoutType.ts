import { WorkoutType } from '@common/types/workout'

export function formatWorkoutType(type: WorkoutType): string {
    switch (type) {
        case 'amrap':
            return 'AMRAP'
        case 'fortime':
            return 'For Time'
        case 'emom':
            return 'EMOM'
    }
}
