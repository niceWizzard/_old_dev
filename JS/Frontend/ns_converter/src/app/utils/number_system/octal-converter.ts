import { Binary } from "./binary-converter";
import { Decimal } from "./decimal-converter";
import { isAnyOther, isOctal } from "./is_util"

export class Octal {
    private constructor() {}

    private static isValidOctal(oct: string) {
        if(!isOctal(oct)) {
            throw new Error(`'${oct}' is not a valid octal number.`)
        }
    }
    private static unsign(oct: string) {
        return oct.replace('-', '')
    }

    private static isNegative(oct: string) {
        return oct.includes('-');
    }

    private static removeInsignificantZeroes(oct: string) {
        const unsigned = Octal.unsign(oct);
        const indexOfFirst1 = unsigned.split('').findIndex((v) => v != '0');
        return unsigned.substring(indexOfFirst1)
    }

    static toDecimal(oct: string): number  { 
        Octal.isValidOctal(oct)

        const isNegative = Octal.isNegative(oct);

        const unsigned = Octal.unsign(oct);
        const octalArray = Octal.removeInsignificantZeroes(unsigned)
            .split('')
            .map(v => Number(v))


            const sum = octalArray.reduceRight((output, item, index) => {
            const power = octalArray.length -1 -index;
            const h = item * Math.pow(8, power)
            return output + h;
        }, 0)

        return sum * (isNegative ? -1 : 1);
    }

    static toBinary(oct: string): string {
        return Decimal.toBinary(Octal.toDecimal(oct))
    }
    
    static toHexadecimal(oct: string): string {
        return Decimal.toHexadecimal(Octal.toDecimal(oct))
    }


}