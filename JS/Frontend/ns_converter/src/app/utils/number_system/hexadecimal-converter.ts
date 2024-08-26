import { Binary } from "./binary-converter";
import {HEX_LETTERS} from './ns-converter-util-obj'
import { Decimal } from "./decimal-converter";
import { isHexadecimal } from "./is_util"

export class Hexadecimal {
    private constructor() {}

    private static isValidHex(hex: string) {
        if(!isHexadecimal(hex)) {
            throw new Error(`'${hex}' is not a valid hexadecimal number.`)
        }
    }
    private static unsign(hex: string) {
        return hex.replace('-', '')
    }

    private static isNegative(hex: string) {
        return hex.includes('-');
    }

    private static removeInsignificantZeroes(hex: string) {
        const unsigned = Hexadecimal.unsign(hex);
        const indexOfFirst1 = unsigned.split('').findIndex((v) => v != '0');
        return unsigned.substring(indexOfFirst1)
    }

    private static getEquivalent(char: string) {
        if(!Number.isNaN(Number(char))) {return char}
        return HEX_LETTERS.indexOf(char) + 10;
    }

    static toDecimal(hex: string): number  { 
        Hexadecimal.isValidHex(hex)

        const isNegative = Hexadecimal.isNegative(hex);

        const unsigned = Hexadecimal.unsign(hex);
        const hexAsNumberArray = Hexadecimal.removeInsignificantZeroes(unsigned)
            .split('')
            .map(v => Number(Hexadecimal.getEquivalent(v) ))
        
        const sum = hexAsNumberArray.reduceRight((output, item, index) => {
            const power = hexAsNumberArray.length -1 -index;
            const h = item * Math.pow(16, power)
            return output + h;
        }, 0)
        return sum * (isNegative ? -1 : 1);
    }

    static toBinary(hex: string): string {
        return Decimal.toBinary(Hexadecimal.toDecimal(hex))
    }
    
    static toOctal(hex: string): string {
        return Decimal.toOctal(Hexadecimal.toDecimal(hex))
    }


}