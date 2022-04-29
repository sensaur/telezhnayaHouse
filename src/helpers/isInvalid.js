const isInvalid = (date) => (date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))
const isInvalidInterval = (startDate, endDate) => {
    return(startDate.setHours(0, 0, 0, 0) > endDate.setHours(0, 0, 0, 0))
}

const isInvalidPhone = (phone) => {
    const regExp = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/g
    return !regExp.test(phone)
}

export {isInvalid, isInvalidInterval, isInvalidPhone}
