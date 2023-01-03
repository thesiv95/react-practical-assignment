import { DateTime } from 'luxon'

const parseDate = (dateMs = Date.now()) => {
    dateMs = +dateMs
    return DateTime.fromMillis(dateMs).toFormat('yyyy LLL dd HH:mm')
}

export default parseDate