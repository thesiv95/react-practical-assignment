const getCopyrightYear = () => {
    const year = new Date().getFullYear()
    if (year === 2023) return year
    return `2023-${year}`
}

export default getCopyrightYear