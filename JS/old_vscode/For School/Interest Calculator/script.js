
class Input {
    constructor(_principal, _time, _frequency, _interestRate) {
        this.principal = _principal;
        this.time = _time;
        this.frequency = _frequency;
        this.interestRate = Compute.computeRateM(_interestRate);
    }
}

class UI {
    static addToAnswerBox(_thing) {
        document.querySelector('.answer-box').innerHTML += `<h1>${_thing}</h1>`
        // document.querySelector('.answer-box').innerHTML += '';

    }
}


class Compute {
    static computeRateM(_rate) {
        return _rate / 100;
    }
    static computeCompoundFuture(_) { }
}









document.addEventListener('click', e => {
    let principal = parseFloat(document.querySelector('.principal').value);
    let time = parseFloat(document.querySelector('.time').value);
    let frequency = parseFloat(document.querySelector('.frequency').value);
    let interestRate = parseFloat(document.querySelector('.interest-rate').value);
    let submitButton = parseFloat(document.querySelector('.submit').value);
    e.preventDefault();
    let newInput = new Input(principal, time, frequency, interestRate);

    console.log(newInput.interestRate)

});




