// "2025-04-03T08:24:46.000Z",
export function dateFormat(date: string, separator: string = '-') {
    const reg = /(\d{4})-(\d{2})-(\d{2})T/
    const match = date.match(reg)

    console.log(match, 'match')
    if (match) {
        return `${match[1]}${separator}${match[2]}${separator}${match[3]}`
    }
    return date
}