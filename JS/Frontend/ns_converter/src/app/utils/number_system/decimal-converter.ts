import { isAnyOther } from "./is_util";
import { HEX_LETTERS } from "./ns-converter-util-obj";
export class Decimal {
    private constructor() {}

    static toBinary(dec: string | number) {

        const isValidDec =  isAnyOther(dec.toString());
        if( !isValidDec) {
            throw new Error(`'${dec}' not a valid decimal number.`);
        }
        return dqr(dec.toString())
        
    }

    static toOctal(dec: string | number) {
        const isValidDec = isAnyOther(dec.toString() )
        if(!isValidDec) {
            throw new Error(`'${dec}' not a valid decimal number.`);
        }

        return dqr(dec.toString(), 8);
    }

    static toHexadecimal(dec: string | number){
        if(!isAnyOther(dec.toString())) {
            throw new Error(`'${dec}' not a valid decimal number.`);
        }
        const arr = unsignedDqrArray(dec.toString(), 16).map(v => v.toString());
        if(arr.every(v => v == '0')) {
            return '0';
        }
        const h = arr.reduce((prev, cur) => {
            let output = '';
            const current = Number(cur);
            if(current > 9) {
                output = HEX_LETTERS[current - 10];
            } else {
                output = current.toString();
            }

            return prev + output;
        }, '');

        const isNegative = dec.toString().includes('-')
        const prefix = isNegative ? "-" : ''
        return prefix + h;

    }

}



function unsignedDqrArray(dec: string, dividend=2) : number[] {
    const num = Math.abs(Number(dec));
    const r = [num % dividend];
    let quotient = Math.floor(num / dividend);
    while(quotient > 0){
        r.push(quotient % dividend)
        quotient = Math.floor(quotient / dividend);
    }
    return r.reverse();
}

function dqr(dec: string, dividend=2) {
    const isNegative = Math.sign(Number(dec)) < 0;
    const prefix = isNegative ? '-' : ''
    return  prefix + unsignedDqrArray( dec, dividend).join('')
        
}
