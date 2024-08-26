let checkmarkButton = document.querySelector('.checkmark-container');
let check = document.querySelector('.check');
let loading = document.querySelector('.loading');
let checkPassed = document.querySelector('.check-passed');
let popupBox = document.querySelector('.pop-up-box');
let box = document.querySelectorAll('.box')
let boxes = document.querySelector('.boxes')
let indexes = [];

let hasClicked = false;

class UI {
    static figureBox(_toInsert) {
        indexes = UI.randomIndexes(9, 3);
        console.log(indexes)

        Array.from(box).forEach((_box) => {
            if (indexes.includes(parseInt(_box.id))) {
                console.log(_box);
                _box.innerHTML = `<img src="./tick.svg">`;
            } else {
                _box.innerHTML = `<img src="./wrong.png">`;
            }

        })
        UI.removeClassOnArray(box, 'selected')

        // console.log(answers)

    }



    static randomIndexes(_upto, amount) {
        var output = [];
        for (var i = 0; i < amount; i++) {
            var index = Math.floor(Math.random() * _upto + 1);
            if (output.indexOf(index) < 0) {
                output.push(index);
            } else {
                i--;
            }
        }
        return output;
    }

    static removeClassOnArray(_classes, _toRemove) {
        Array.from(_classes).forEach(_class => _class.classList.remove(_toRemove))

    }

    static addImage(_imgSrc, _width, _height, _opacity, _toAppend, _class) {
        let img = document.createElement('img');
        img.src = _imgSrc;
        img.width = _width + 'px';
        img.height = _height + 'px';
        img.style.opacity = _opacity;
        img.className = _class;
        _toAppend.appendChild(img);
    }
}

class Effects {
    static fade(_type, _target, _style) {
        if (_type === 'in') {
            _target.classList.add(`fade-${_type}`)
            if (_style === 'display') {
                _target.style.display = 'block'
            } else {
                _target.style.opacity = 1;
            }
        } else {
            _target.classList.add(`fade-${_type}`)
            _target.style.opacity = 0;
            if (_style === 'display') {
                setTimeout(() => {
                    _target.style.display = 'none';
                }, 1000)
            }
        }
    }
    static scale(_amount, _target) {
        _target.style.transform = `scale(${_amount})`
    }
}






checkmarkButton.addEventListener('click', e => {

    if (hasClicked === false) {
        // popupBox.classList.remove('fade-out')
        debugger;
        checkmarkButton.classList.add('clicked');
        loading.style.opacity = 1;



        // Set opacity of Loading to 0 
        setTimeout(() => {
            loading.style.opacity = 0;
        }, 450)


        // Create the box randomness 
        UI.figureBox();

        // Show Pop Up Box
        setTimeout(() => {
            Effects.fade('in', popupBox, 'display');
        }, 600)

        setTimeout(() => {
            checkmarkButton.classList.remove('clicked');
        }, 1000)

        // Add Image 


        hasClicked = true;
    }

});


// Toggle Selected 
boxes.addEventListener('click', e => {
    if (e.target.classList.contains('box')) {
        e.target.classList.toggle('selected')
    }
});

// Pop Up Box Buttons
popupBox.addEventListener('click', e => {
    e.preventDefault();

    // When Buttons are Clcicked
    if (e.target.classList.contains('btn-retry')) {
        UI.figureBox();
    } else if (e.target.classList.contains('btn-verify')) {
        let answers = Array.from(box).filter(_box => _box.classList.contains('selected'));

        let boolAnswers = answers.map(answer => indexes.includes(parseInt(answer.id)));


        if (boolAnswers.includes(false)) {
            UI.figureBox();
        } else {
            // Correct Answer 

            Effects.fade('out', popupBox, 'opacity')

            Effects.fade('out', check, 'display')

            popupBox.remove();

            Effects.scale(0.2, check);
            UI.addImage('./tick.svg', 20, 20, 0, checkPassed, 'check-image');

            setTimeout(() => {
                document.querySelector('.check-image').style.opacity = 1;
                checkmarkButton.style.pointerEvents = 'none';
            }, 300)



        }
    }
});



document.addEventListener('click', e => {
    if (hasClicked) {
        if (!e.target.parentElement.classList.contains('checkmark-container') && !e.target.classList.contains('captcha-box') &&
            !e.target.parentElement.classList.contains('pop-up-box') && !e.target.parentElement.classList.contains('boxes') &&
            !e.target.parentElement.classList.contains('head') && !e.target.classList.contains('pop-up-box')
            && !e.target.parentElement.classList.contains('box') && !e.target.classList.contains('btn')) {
            hasClicked = false;

            UI.removeClassOnArray(box, 'selected')

            popupBox.classList.remove('fade-in')

            popupBox.style.display = 'none';


        }
    }
});






