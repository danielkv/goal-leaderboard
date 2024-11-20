export enum CheckinStatus {
    PENDING = 'pending',
    CHECKED = 'checked',
    NOSHOW = 'noshow',
}

export interface Checkin {
    id: string
    name: string
    team: string
    category: string
    box: string
    status: CheckinStatus
}
