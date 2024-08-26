export const showMessage = (msg: string, setMessage: any, time = 2500) => {
    setMessage(msg)
    const output = setTimeout(() => {
        setMessage(null)
    }, time)

    return output
}

export const usernameTest = (username: string) => {
    const specChar = /^[\w\d_@.]+$/
    const min = /^[\w\d_]{5,}/i
    const specTest = (specChar.test(username))
    const minTest = min.test(username);
    const spaceTest = username.includes(' ')

    const errors = [specTest, minTest, !spaceTest]
    if (errors.includes(false)) {
        return true
    }
    return false
}

export function capitalizeFirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function decimalToString(decimalPlaces: number, number: number | string) {
    if (typeof number === 'string') number = parseFloat(number)
    if (number % 1 === 0) return number
    const output = parseFloat(number.toFixed(decimalPlaces).toString())
    return output
}

