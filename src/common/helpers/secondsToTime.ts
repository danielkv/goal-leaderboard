import dayjs from 'dayjs'

export function secondsToTime(seconds: number): string {
    return dayjs().startOf('day').add(seconds, 'seconds').format('mm:ss')
}
