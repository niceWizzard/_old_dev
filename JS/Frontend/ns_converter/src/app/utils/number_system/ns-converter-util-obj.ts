
export const HEX_LETTERS  = ['A', 'B', 'C', 'D', 'E','F',]


export const BITS = [
    '000',
    '001',
    '010',
    '011',
    '100',
    '101',
    '110',
    '111',
    '1000',
    '1001',
    '1010',
    '1011',
    '1100',
    '1101',
    '1110',
    '1111',
];

export const OCTAL_BINARY_EQUIVALENT: {[key:string]: any}= BITS.reduce((prev:{[key:string]: any} , cur, index) => {
    if(index > 8) {return prev}
    prev[cur] = index;
    return prev;
}, {})

export const HEX_BINARY_EQUIVALENT: {[key:string]: any} = 
    BITS.reduce((prev:{[key:string]: any} , cur, index) => {
        const value = index < 10 ? index : HEX_LETTERS[index - 10]
        const key = index < 10 ? `0${cur}`: cur;
        prev[key] = value;
        return prev;
    }, {})
