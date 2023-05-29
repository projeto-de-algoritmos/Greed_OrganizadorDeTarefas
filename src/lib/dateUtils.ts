import { format, intervalToDuration } from 'date-fns'

export function formatDate(date: Date): string {
    return format(date, 'dd / MM / yyyy')
}

export function intervalFromDates(start: Date, end: Date) {
    const interval = intervalToDuration({ start, end })
    if (interval.years)
        if (interval.years > 0)
            return `${interval.years} anos`
    if (interval.months)
        if (interval.months > 0)
            return `${interval.months} meses`
    if (interval.days)
        if (interval.days > 0)
            return `${interval.days} dias`
    if (interval.hours)
        if (interval.hours > 0)
            return `${interval.hours} horas`
    return 'menos de uma hora'
}