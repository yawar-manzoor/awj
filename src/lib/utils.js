export const truncateText = (text, wordLimit) => {
    if (!text) return ''

    // Split the text based on spaces but treat hyphenated words as a single unit
    const wordsArray = text.split(/(?<!-)\s+/) // RegEx avoids breaking on hyphens

    // If the number of words is less than or equal to the limit, return the full text
    if (wordsArray.length <= wordLimit) {
        return text
    }

    // Join the first 'n' words and add ellipsis
    return wordsArray.slice(0, wordLimit).join(' ') + '...'
}

// export function gregorianToHijri(dateString) {
//         const date = new Date(dateString)
//         const formatter = new Intl.DateTimeFormat('en-SA-u-ca-islamic', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric',
//         })
//         const parts = formatter.formatToParts(date)

//         let year, month, day
//         for (const part of parts) {
//             if (part.type === 'year') year = part.value
//             if (part.type === 'month') month = part.value
//             if (part.type === 'day') day = part.value
//         }

//         return `${year}-${month}-${day}`
//     }

export function gregorianToHijri(dateString) {
    let formattedDateString

    // Check if the date is in "DD-MM-YYYY" format (assuming dashes are the separator)
    const isDDMMYYYY = /^\d{2}-\d{2}-\d{4}$/.test(dateString)

    if (isDDMMYYYY) {
        // Convert "DD-MM-YYYY" to "YYYY-MM-DD"
        const [day, month, year] = dateString.split('-')
        formattedDateString = `${year}-${month}-${day}`
    } else {
        // Assume the date is already in "YYYY-MM-DD" format
        formattedDateString = dateString
    }

    const date = new Date(formattedDateString)

    // Check if date is valid
    if (isNaN(date)) {
        throw new Error('Invalid date')
    }

    const formatter = new Intl.DateTimeFormat('en-SA-u-ca-islamic', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    const parts = formatter.formatToParts(date)

    let yearHijri, monthHijri, dayHijri
    for (const part of parts) {
        if (part.type === 'year') yearHijri = part.value
        if (part.type === 'month') monthHijri = part.value
        if (part.type === 'day') dayHijri = part.value
    }

    return `${yearHijri}-${monthHijri}-${dayHijri}`
}
export function formatDate(dateString) {
    const date = new Date(dateString)

    if (isNaN(date)) {
        return 'Invalid date'
    }

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day} - ${month} - ${year}`
}
