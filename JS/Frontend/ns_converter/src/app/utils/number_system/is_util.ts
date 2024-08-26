const HEXA_REGEX = /^-?[0-9a-fA-F]+$/
const BIN_REGEX = /^-?[10]+$/;
const OCT_REGEX = /^-?[0-7]+$/;

export function isHexadecimal(value: string) {
    return HEXA_REGEX.test(value);
}

export function isBinary(value: string) {
    return BIN_REGEX.test(value);
}

export function isOctal(value: string) {
    return OCT_REGEX.test(value)
}

export function isAnyOther(value: string) {
    const asNumber = Number(value)
    return !Number.isNaN(asNumber) && Number.isInteger(asNumber);
}