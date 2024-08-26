import { NumberSystemType } from "src/app/components/home/ns-selector/ns-selector.component";

export function getDisplayName(v: NumberSystemType) {
    switch(v) {
        case "bin":
            return "Binary";
        case 'dec':
            return "Decimal";
        case 'hex':
            return 'Hexadecimal';
        case 'oct':
            return 'Octal';
    }
}