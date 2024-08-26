

class Input {
    constructor(_input, _class) {
        this.inputClass = _class;
        this.inputText = _input;
    }
}



class UI {
    static addToScreen(_screen, _thing, _class, _place) {
        if (_place === 'after') {
            _screen.innerHTML += `<span class="${_class}">${_thing}</span>`;
        } else {
            let value = document.createElement('span');
            value.innerText = _thing;
            value.className = _class;
            _screen.prepend(value);
        }
    }
    static figureOperation(operation, input) {
        let output = 0;
        let inputA = parseFloat(input[0].innerText);
        let inputB = parseFloat(input[1].innerText);
        if (operation === '+') {
            output += inputA + inputB;
        } else if (operation === '-') {
            output += inputA - inputB;
        } else if (operation === '*') {
            output += inputA * inputB;
        } else if (operation === '/') {
            output += inputA / inputB;
        }
        return output;
    }
    static doOperation(_operation, _numbers) {
        let newNumber = UI.figureOperation(_operation, _numbers);
        let newInput = new Input(newNumber, 'number');
        previousDisplay.innerHTML = '';

        UI.addToScreen(previousDisplay, newInput.inputText, newInput.inputClass, 'after');
    }
    static getNumbers(_display) {
        return Array.from(_display.children).filter(child => child.classList.contains('number'));
    }

    static getOperator(_display) {
        return Array.from(_display.children).filter(child => child.classList.contains('operators'));

    }

}




let calculatorBody = document.querySelector('.calculator-body');
let calculatorScreen = document.querySelector('.calculator-screen');
let currentDisplay = document.querySelector('.display-current');
let previousDisplay = document.querySelector('.display-previous');

let operatorIsChanged = false;
let equalIsClicked = false;
let operatorIsClicked = false;
let previousKey;

calculatorBody.addEventListener('click', e => {
    // debugger;
    if (e.target.innerText.toLowerCase() === 'x' && currentDisplay.children.length != 0) {
        currentDisplay.lastChild.remove();
    } else if (e.target.innerText.toLowerCase() === 'ce' || equalIsClicked === true) {
        currentDisplay.innerText = '';
        previousDisplay.innerText = '';
        equalIsClicked = false;
    } else if (e.target.innerText.toLowerCase() === 'c') {
        currentDisplay.innerText = '';
    } else if (e.target.innerText.toLowerCase() === 'x' && currentDisplay.children.length > 0) {
        currentDisplay.lastChild.remove();
    } else if (e.target.innerText.toLowerCase() === '=') {
        if (currentDisplay.lastChild.classList.contains('number')) {
            operatorIsClicked = true;
            UI.addToScreen(previousDisplay, currentDisplay.innerText, 'number', 'after')
            let numbers = UI.getNumbers(previousDisplay);
            let operator = UI.getOperator(previousDisplay);

            if (operator[0] != undefined) {
                // console.log(operator[0].innerText);
                let operation = operator[0].innerText;
                UI.doOperation(operation, numbers);
            }
            // Operator 
            UI.addToScreen(previousDisplay, '=', 'equal', 'before');
            equalIsClicked = true;
        }

    } else if (e.target.innerText === '%') {
        let percentage = parseFloat(currentDisplay.innerText) / 100
        Array.from(currentDisplay.children).forEach(child => child.remove());
        let span = document.createElement('span');
        span.innerText = percentage;
        span.className = 'number';
        currentDisplay.append(span);

    }
    else if (e.target.innerText.toLowerCase() != 'x') {
        // debugger;
        let input = new Input(e.target.innerText, e.target.classList)
        if (operatorIsClicked === true) {
            if (e.target.classList.contains('number')) {
                currentDisplay.innerHTML = '';
                UI.addToScreen(currentDisplay, input.inputText, input.inputClass, 'after')
                operatorIsChanged = false;
            } else {
                previousDisplay.lastChild.remove();
                UI.addToScreen(previousDisplay, input.inputText, input.inputClass, 'after');
                operatorIsChanged = true;
            }
            operatorIsClicked = false;


        } else if (!e.target.classList.contains('operators')) {
            UI.addToScreen(currentDisplay, input.inputText, input.inputClass, 'after')

        } else if (e.target.classList.contains('operators')) {
            if (currentDisplay.lastChild.classList.contains('number') || operatorIsChanged === false) {
                operatorIsClicked = true;
                UI.addToScreen(previousDisplay, currentDisplay.innerText, 'number', 'after')
                let numbers = UI.getNumbers(previousDisplay);
                let operator = UI.getOperator(previousDisplay);

                if (operator[0] != undefined) {
                    // console.log(operator[0].innerText);
                    let operation = operator[0].innerText;
                    UI.doOperation(operation, numbers);
                }
                // Operator 
                UI.addToScreen(previousDisplay, input.inputText, input.inputClass, 'after')
                Array.from(currentDisplay.children).forEach(child => child.innerHTML = '');
                // operatorIsClicked = false;

            } else {
                UI.addToScreen(currentDisplay, input.inputText, input.inputClass, 'after');
            }
        }
    }


});


