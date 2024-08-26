import { Binary } from "./binary-converter";
import { Decimal } from "./decimal-converter";
import { Hexadecimal } from "./hexadecimal-converter";
import { Octal } from "./octal-converter";

interface FromTo {
    from: string;
    to: string;
}

function getString(from: string, to: string, fromType: string='dec') {
    return `should turn ${fromType} ${from} to ${to}`;
}

function testAsArray({ func, arr, fromType }: { func: (s: string) => any; arr: FromTo[]; fromType: string; }) {
            arr.concat(defaultTestArr).forEach(v => {
                const {from, to} = v;
                it(getString(from.toString(), to, fromType), () => {
                    expect( func(from.toString()).toString() ).toBe(to);
                });
            })
}

const defaultTestArr = [
    {
        from: '0',
        to: '0'
    },
    {
        from: '00000000',
        to: '0'
    },
    {
        from: '-0',
        to: '0'
    },
    {
        from: '-00000000',
        to: '0'
    },
    {
        from: '-01',
        to: '-1'
    },
]


describe('NS Converter Util Functions', () => {

    describe('Decimal', () => {
            
        function throwErrorTests(func: (d: string | number) => any) {
            it('should throw an error if it has a decimal point', () => {
                expect(() => func(2.55)).toThrowError();
            });
            it('should throw an error if it has a letter', () => {
                expect(() => func('2a9235')).toThrowError();
            });
        }
        const fromType = 'decimal';

        describe('toBinary', () => {
            const func = Decimal.toBinary;
            testAsArray({
                func,
                fromType,
                arr: [
                    {
                        from: '255',
                        to: '11111111'
                    },
                    {
                        from: '-255',
                        to: '-11111111'
                    },
                    {
                        from: '-0000255',
                        to: '-11111111'
                    },
                ]
            })
            

            throwErrorTests(func);

        });

        describe('toOctal', () => {
            const func = Decimal.toOctal;
            testAsArray({
                func,
                fromType,
                arr: [
                    {
                        from: '12',
                        to: '14',
                    },
                    {
                        from: '00012',
                        to: '14',
                    },
                    {
                        from: '-12',
                        to: '-14',
                    },
                ]
            })
            
            throwErrorTests(func);
        });

        describe('toHexadecimal', () => {
            const func = Decimal.toHexadecimal;
            
            const arr: FromTo[] = [
                {
                    from: '21',
                    to: '15'
                },
                {
                    from: '-21',
                    to: '-15'
                },
                {
                    from: '211',
                    to: 'D3'
                },
                {
                    from: '0002',
                    to: '2'
                },
                
                
            ]

            testAsArray({func, arr, fromType})
            
            throwErrorTests(func);
        });

    });

    describe('Binary', () => {
        function throwErrorsCheck(func: (d: string) => any) {
            it('should throw an error if it has a decimal point', () => {
                expect(() => func('2.55')).toThrowError();
            });
            it('should throw an error if it has a letter', () => {
                expect(() => func('2a9235')).toThrowError();
            });
        }
        const fromType = 'Binary:'

        describe('toDecimal', () => {
            const func = Binary.toDecimal;
            const arr: FromTo[] = [
                {
                    from: '11111111',
                    to: '255'
                },
                {
                    from: '-11111111',
                    to: '-255'
                },
                {
                    from: '-000011111111',
                    to: '-255'
                },
            ]
            testAsArray({arr, fromType: 'binary', func, })

            
            it('should get 23412 again', () => {
                const bin = Decimal.toBinary(23412);
                expect(Binary.toDecimal(bin.toString())).toBe(23412)
            })

            throwErrorsCheck(func);

            
        });
        
        describe('toOctal', () => {
            const func = Binary.toOctal;

            const arr: FromTo[] = [
                {
                    from: '110001',
                    to: '61'
                },
                {
                    from: '-110001',
                    to: '-61'
                },
                {
                    from: '0000110',
                    to: '6'
                },
                
                
                
            ]

            testAsArray({arr, fromType, func})
            
            throwErrorsCheck(func);

        });

        describe('toHexadecimal', () => {
            const func = Binary.toHexadecimal;
            const arr: FromTo[] = [
                {
                    from: '11110',
                    to: '1E'
                },
                {
                    from: '-11110',
                    to: '-1E'
                },
            ]
            testAsArray({func, arr, fromType})

            throwErrorsCheck(func);
        });        
    });

    describe('Octal', () => {
        function testThrowError(func: (s: string) => any) {

            it('should throw error when empty', () => {
                expect(() => func('')).toThrowError()
            });
            it('should throw error when includes > 7', () => {
                expect(() => func('008')).toThrow()
            });
            it('should throw error when it has decimal points', () => {
                expect(() => func('1.11')).toThrow()
            });
            it('should throw error when it has letters', () => {
                expect(() => func('1.Z1')).toThrow()
                expect(() => func('1.A1')).toThrow()
            });
            it('should throw error when it has space between', () => {
                expect(() => func('7 1')).toThrow()
            });
        }

        const fromType = 'Octal'

        describe('toDecimal', () => {
            const func = Octal.toDecimal;
            const arr: FromTo[] = [
                {
                    from: '10107',
                    to: '4167'
                },
                {
                    from: '-10107',
                    to: '-4167'
                },
                {
                    from: '-00000000010107',
                    to: '-4167'
                },
            ]

            testAsArray({func, arr, fromType})

            testThrowError(func);

        });

        describe('toHexadecimal', () => {
            const func = Octal.toHexadecimal;
            const arr: FromTo[] = [
                {
                    from: '136',
                    to: '5E'
                },
                {
                    from: '-136',
                    to: '-5E'
                },
                {
                    from: '-0000136',
                    to: '-5E'
                },
                
            ]

            testAsArray({func, arr, fromType})

            testThrowError(func);

        });

        describe('toBinary', () => {
            const func = Octal.toBinary;
            const arr: FromTo[] = [
                {
                    from: '100',
                    to: '1000000'
                },
                {
                    from: '-100',
                    to: '-1000000'
                },
                {
                    from: '-000000000100',
                    to: '-1000000'
                },
            ]

            testAsArray({func, arr, fromType})

            testThrowError(func);

        });



    });

    // 

    describe('Hexadecimal', () => {
        function testThrowError(func: (s: string) => any) {
            it('should throw error when empty', () => {
                expect(() => func('')).toThrowError()
            });
            it('should throw error when it has decimal points', () => {
                expect(() => func('1.11')).toThrow()
            });
            it('should throw error when it has other letters', () => {
                expect(() => func('1.Z1')).toThrow()
                expect(() => func('H1')).toThrow()
            });
            it('should throw error when it has space between', () => {
                expect(() => func('7 1')).toThrow()
            });
        }

        const fromType = 'Hexadecimal: '

        

        describe('toDecimal', () => {
            const func = Hexadecimal.toDecimal;
            const arr: FromTo[] = [
                {
                    from: 'AA',
                    to: '170'
                },
                {
                    from: '-AA',
                    to: '-170'
                },
                {
                    from: '-000000000AA',
                    to: '-170'
                },
                {
                    from: 'AA17F',
                    to: '696703'
                },
            ]

            testAsArray({func, arr, fromType})

            testThrowError(func);

        });

        describe('toBinary', () => {
            const func = Hexadecimal.toBinary;
            const arr: FromTo[] = [
                {
                    from: 'AA',
                    to: '10101010',
                },
                {
                    from: '-AA',
                    to: '-10101010',
                },
                {
                    from: 'AAF5D',
                    to: '10101010111101011101',
                },
                {
                    from: '-00000AA',
                    to: '-10101010',
                },
            ]

            testAsArray({func, arr, fromType})

            testThrowError(func);

        });


        describe('toOctal', () => {
            const func = Hexadecimal.toOctal;
            const arr: FromTo[] = [
                {
                    from: 'AA',
                    to: '252'
                },
                {
                    from: '-AA',
                    to: '-252'
                },
                {
                    from: '-000000000AA',
                    to: '-252'
                },
            ]

            testAsArray({func, arr, fromType})

            testThrowError(func);

        });



    });


    

});