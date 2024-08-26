
class Input {
    constructor(_amount, _length) {
        this.amount = _amount;
        this.length = _length;
    }
}

class Output extends Input {

}

class UI {


    static returnArray(arr) {
        let array = [];
        Array.from(arr).forEach((ar) => array.push(ar));
        return array;
    }

    static figureFormula(_input, _output) {
        let output;
        let inputAmount = _input.amount;
        if (_input.length === _output.length) {
            output = _input.amount;
        } else if (_input.length === 'meter') {
            if (_output.length === 'kilometer') {
                output = Convert.meterToKilometer(inputAmount);
            } else if (_output.length === 'inch') {
                output = Convert.meterToInch(inputAmount);
            } else if (_output.length === 'feet') {
                output = Convert.meterToFoot(inputAmount);
            }
        } else if (_input.length === 'kilometer') {
            if (_output.length === 'meter') {
                output = Convert.kilometerToMeter(inputAmount);
            } else if (_output.length === 'inch') {
                output = Convert.kilometerToInch(inputAmount);
            } else if (_output.length === 'feet') {
                output = Convert.kilometerToFoot(inputAmount);
            }
        } else if (_input.length === 'inch') {
            if (_output.length === 'meter') {
                output = Convert.inchToMeter(inputAmount);
            } else if (_output.length === 'kilometer') {
                output = Convert.inchToKilometer(inputAmount);
            } else if (_output.length === 'feet') {
                output = Convert.inchToFoot(inputAmount);
            }
        } else if (_input.length === 'feet') {
            if (_output.length === 'meter') {
                output = Convert.footToMeter(inputAmount);
            } else if (_output.length === 'kilometer') {
                output = Convert.footToKilometer(inputAmount);
            } else if (_output.length === 'inch') {
                output = Convert.footToInch(inputAmount);
            }
        }
        parseFloat(output)
        output = +output.toFixed(9);
        return output;
    }

    static displayOutput(_answer, _html) {
        _html.children[0].value = _answer;
    }

}

class Convert {
    static meterToKilometer(length) {
        return length / 1000;
    }
    static meterToInch(length) {
        return length * 39.3701;
    }
    static meterToFoot(length) {
        return length * 3.281;
    }

    static kilometerToMeter(length) {
        return length * 1000;
    }
    static kilometerToInch(length) {
        return (length * 39.3701) * 1000;
    }
    static kilometerToFoot(length) {
        return (length * 3.281) * 1000;
    }

    static inchToMeter(length) {
        return length / 39.3701;
    }
    static inchToKilometer(length) {
        return length / (39.3701 * 1000);
    }
    static inchToFoot(length) {
        return length / 12;
    }

    static footToMeter(length) {
        return (length / 3.281);
    }
    static footToKilometer(length) {
        return length / (3.281 * 1000);
    }
    static footToInch(length) {
        return length * 12;
    }
}



var inputForm = document.querySelector('.input-submit');
var outputForm = document.querySelector('.output-submit');


document.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.classList.contains('input-submit')) {
        let inputAmount = parseFloat(e.target.children[0].value);
        let inputLength = e.target.children[1].value
        let outputAmount = parseFloat(outputForm.children[0].value);
        let outputLength = outputForm.children[1].value;

        // Create Instance 
        let newInput = new Input(inputAmount, inputLength);
        let newOutput = new Output(outputAmount, outputLength);


        // Figure The Formula 
        let answer = UI.figureFormula(newInput, newOutput);
        console.log(answer);

        // console.log(answer);
        UI.displayOutput(answer, outputForm);
        outputForm.previousElementSibling.innerText = 'Output';
        e.target.previousElementSibling.innerText = 'Input';

    } else {
        let inputAmount = parseFloat(e.target.children[0].value);
        let inputLength = e.target.children[1].value
        let outputAmount = parseFloat(inputForm.children[0].value);
        let outputLength = inputForm.children[1].value;

        // Create Instance 
        let newInput = new Input(inputAmount, inputLength);
        let newOutput = new Output(outputAmount, outputLength);


        // Figure The Formula 
        let answer = UI.figureFormula(newInput, newOutput);
        console.log(answer);

        // console.log(answer);
        UI.displayOutput(answer, inputForm);

        inputForm.previousElementSibling.innerText = 'Output';
        e.target.previousElementSibling.innerText = 'Input';


    }

});




