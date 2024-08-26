




export const createRandomString = (length) => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let output = '';


    for (var i = 0; i < length; i++) {
        output += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return output;
}


export const getFullTime = (_dateA, _dateB) => {

    const dateA = {
        year: new Date().getUTCFullYear(),
        month: new Date().getUTCMonth(),
        day: _dateA.getUTCDate(),
        hours: _dateA.getHours(),
        minutes: _dateA.getUTCMinutes(),
        hour: _dateA.toLocaleTimeString(),
        seconds: _dateA.getUTCSeconds()
    }

    const dateB = {
        year: _dateB.getUTCFullYear(),
        month: _dateB.getUTCMonth(),
        day: _dateB.getUTCDate(),
        dayOfWeek: _dateB.getUTCDay(),
        hours: _dateB.getHours(),
        hour: _dateB.toLocaleTimeString(),
        minutes: _dateB.getUTCMinutes(),
        seconds: _dateB.getUTCSeconds()
    }
    const outputDate = {
        day: dateA.day - dateB.day,
        hours: dateA.minutes < dateB.minutes ? Math.abs(dateA.hours - dateB.hours) - 1 : Math.abs(dateA.hours - dateB.hours),
        minutes: dateA.minutes - dateB.minutes < 0 ? dateA.minutes - dateB.minutes + 60 : dateA.minutes - dateB.minutes,
        seconds: Math.abs(dateA.seconds - dateB.seconds)
    }
    return { outputDate, dateB };
}

export const handleGetTimePosted = (_createdDate) => {

    const { outputDate: datePostedPassed, dateB: exactDatePosted } = getFullTime(new Date(), new Date(_createdDate))

    const { day, hours, minutes, seconds } = datePostedPassed;

    const { year: exactYear, month: exactMonth, day: exactDay, hours: exactHours, minutes: exactMinutes, dayOfWeek } = exactDatePosted;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const reducedHours = exactHours - 12;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let exactDate = (`${days[dayOfWeek]}, ${months[exactMonth]}  ${exactDay}, ${exactYear} at ${exactHours === 0 ? 12 : exactHours <= 12 ? exactHours : reducedHours}:${exactMinutes < 10 ? 0 : ''}${exactMinutes} ${exactHours < 12 ? 'AM' : 'PM'}`)

    if (day < 1) {
        if (day <= 0) {
            if (hours <= 0) {
                if (minutes <= 0) {
                    const returnSeconds = seconds > 0 ? `${seconds} second${seconds > 1 ? 's' : ''}  ago` : '';

                    return returnSeconds;
                }
                const returnMinutes = `${minutes} minute${minutes > 1 ? 's' : ''} ${seconds <= 0 ? '' : seconds + 's'} ago`;
                return returnMinutes;

            }
            const returnHours = `${hours} hour${hours > 1 ? 's' : ''} ${minutes <= 0 ? '' : minutes + 'm'} ago`;

            return returnHours;

        }
    } else if (day === 1) {
        exactDate = (`Yesterday, at ${exactHours === 0 ? 12 : exactHours <= 12 ? exactHours : reducedHours}:${exactMinutes < 10 ? 0 : ''}${exactMinutes} ${exactHours < 12 ? 'AM' : 'PM'}`)
    }
    return exactDate;

}