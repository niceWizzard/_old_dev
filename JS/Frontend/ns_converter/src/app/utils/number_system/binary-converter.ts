import { ɵɵsetComponentScope } from "@angular/core";
import { BITS, HEX_BINARY_EQUIVALENT, OCTAL_BINARY_EQUIVALENT } from "./ns-converter-util-obj";
import { isAnyOther, isBinary } from "./is_util";




export class Binary {
    private constructor() {}

    private static checkIsBinary(bin: string) {
        if(!isBinary(bin)) {
            throw new Error(`'${bin}' not a valid binary number.`);
        }
    }

    static getSignIndex(bin: string ) {
        return bin.indexOf('-');
    }

    static unsign(bin: string) {
        return bin.replace('-', '');
    }

    static removeInsignifacantZeroes(bin: string ) {
        const unsignedBin = Binary.unsign(bin);
        
        const first1DigitIndex = unsignedBin.indexOf('1');
        return unsignedBin.substring(first1DigitIndex);

    }

    private static isNegative(bin: string) {
        return this.getSignIndex(bin) > -1;
    }

    static toDecimal(bin: string) {
        Binary.checkIsBinary(bin);
        const isNegative = Binary.isNegative(bin);
        const binaryWithoutInsignificantZeros = Binary.removeInsignifacantZeroes(bin);

        const binaryAsArray = binaryWithoutInsignificantZeros
            .split('')
            .map(v => Number(v))
        let output = 0;

        binaryAsArray.forEach((v, i) => {
            output +=  v * Math.pow(2, binaryAsArray.length-1-i)
        })
        
        if(output == 0) {return 0}

        return output * (isNegative ? -1 : 1);
    }

    private static splitIntoChunks(bin: string, chunkSize: number) {
        const binaryAsArray = Binary.removeInsignifacantZeroes(bin)
            .split('')
            .map(v => Number(v))
            const remainder = binaryAsArray.length % chunkSize;
            const toAdd = chunkSize - remainder
            remainder != 0 && binaryAsArray.unshift(...new Array(toAdd).fill(0));
            const canBeChunkedArray = [...binaryAsArray]
    
            const chunkedArray = [];
    
            for(let i = 0; i < canBeChunkedArray.length; i += chunkSize) {
                const chunk = canBeChunkedArray.slice(i, i + chunkSize);
                chunkedArray.push(chunk.join(''))
            }
            return chunkedArray;
    }
    

    static toOctal(bin: string) {
        Binary.checkIsBinary(bin);
        const isNegative = Binary.isNegative(bin);
        const output = Binary.splitIntoChunks(bin, 3).reduce((prev, cur) => {
            return prev + OCTAL_BINARY_EQUIVALENT[cur];
        }, '')

        return Number(output) * (isNegative ? -1 : 1);        
    }

    static toHexadecimal(bin: string){ 
        Binary.checkIsBinary(bin)
        const isNegative = Binary.isNegative(bin);

        if(bin.replace('-','').split('').every((v) => v == '0')) {
            return '0';
        }

        const binChunks = Binary.splitIntoChunks(bin, 4)
        
        const h = binChunks.reduce((prev: string[], cur) => {
            prev.push(HEX_BINARY_EQUIVALENT[cur]);
            return prev;
        }, []);
        const prefix = isNegative ? '-' : '';
        return prefix + h.join('')
    }

}