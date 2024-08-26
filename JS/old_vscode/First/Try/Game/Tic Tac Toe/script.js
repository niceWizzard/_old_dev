let cells = document.querySelectorAll('.cell');
let ticBox = document.querySelector('.tic-tac-toe');
let players = document.querySelectorAll('.player');



let numberOfCells = 9;
let isPlayerOne = true;
let turn = 0;
let gameIsFinish = false;


const changePlayer = (state) => {
    Array.from(players).forEach((player, index) => {
        player.className = 'player ';
    })
    if (state === true) {
        players[0].className += 'current-player'
    } else {
        players[1].className += 'current-player'
    }
}

const addCell = (id) => {
    let newCell = document.createElement('div');
    newCell.className = 'cell'
    newCell.innerHTML = `
        <span class="content"></span>
    `;
    newCell.id = id;
    ticBox.appendChild(newCell);
}

const getNextElement = (_element, _steps) => {
    if (_steps <= 0) return _element;

    return getNextElement(_element.nextElementSibling, _steps - 1);

}

const getPreviousElement = (_element, _steps) => {
    if (_steps <= 0) return _element;
    return getPreviousElement(_element.previousElementSibling, _steps - 1);

}

const figurePosition = (element) => {
    const position = element.id % 3
    let array;
    let outputs;
    if (position === 0) {
        array = leftBoundary(element);
        outputs = getArrayOfClasses(array)
    } else if (position === 1) {
        array = middleBoundary(element)
        outputs = getArrayOfClasses(array)
    } else if (position === 2) {
        array = rightBoundary(element);
        outputs = getArrayOfClasses(array)
    }
    handleAnswerChecking(outputs)
}



const handleAnswerChecking = (_arrs) => {
    // debugger;
    let player = !isPlayerOne ? 'circle' : 'cross';
    let otherPlayer = !isPlayerOne ? 'cross' : 'circle'

    let hey = _arrs.filter(_arr => {
        return _arr.length != 0
    })

    let array = [];

    let hey2 = hey.forEach((el, index) => {
        let count = 0;
        el.forEach(child => {
            let _class = child.className;
            if (_class.indexOf(player) > -1) count++
        })
        if (count >= 3) {
            array = hey[index]
        }
    })

    array.length > 0 && this.hasWon(array, player);

}

function hasWon(_arr, player) {
    _arr.forEach(child => {
        child.classList.add('won-box')
    })

    gameIsFinish = true;

    setTimeout(() => {
        alert(`${player} has won!`)
        reset();
    }, 800)
}




const moveStraight = (_direction, _element) => {
    const array = [];
    if (_direction.toLowerCase() === 'right') {
        array.push(_element)
        array.push(getNextElement(_element, 1))
        array.push(getNextElement(_element, 2))
    } else if (_direction.toLowerCase() === 'left') {
        // debugger;
        array.push(_element)
        array.push(getPreviousElement(_element, 1))
        array.push(getPreviousElement(_element, 2))
    }

    return array;
}

// Check Array of Classes 
const getArrayOfClasses = (_classes) => {
    let keys = Object.keys(_classes);
    let outputArray = [];

    keys.forEach(key => {
        let secArray = _classes[key].map(element => {
            // return element.classList.contains(!isPlayerOne ? 'circle' : 'cross');
            return element;
        })
        outputArray.push(secArray);
    })
    return (outputArray);
}


const leftBoundary = (_element) => {
    let array = {
        right: [],
        vertical: [],
        diagonal: [],
    };


    array.right = (moveStraight('right', _element));
    if (_element.id == 3) {
        array.vertical = (moveVertically(_element))
    } else {

        array.vertical = (moveVertically(_element))
        array.diagonal = (moveDiagonally(_element))
    }
    return array;
}

const rightBoundary = (_element) => {
    let array = {
        left: [],
        vertical: [],
        diagonal: [],
    };
    array.left = (moveStraight('left', _element));
    if (_element.id == 5) {
        array.vertical = (moveVertically(_element))
    } else {
        array.vertical = (moveVertically(_element))
        array.diagonal = (moveDiagonally(_element))
    }
    return array;
}

const middleBoundary = (_element) => {
    let output = {
        vertical: [],
        horizontal: [],
        firstDiagonal: [],
        secondDiagonal: []
    }
    output.vertical = (moveVertically(_element));
    output.horizontal = (getHorizontal(_element))
    if (_element.id == 4) {
        output.firstDiagonal = (moveMiddleDiagonally(_element, 'first'));
        output.secondDiagonal = (moveMiddleDiagonally(_element, ''))
    }
    return output;
}

const getHorizontal = (_element) => {
    let array = [_element];
    array.push(getNextElement(_element, 1));
    array.push(getPreviousElement(_element, 1));
    return array;
}

const moveMiddleDiagonally = (_element, _direction) => {
    let output = [_element];
    if (_direction.toLowerCase() === 'first') {
        output.push(getNextElement(_element, 4))
        output.push(getPreviousElement(_element, 4))
    } else {
        output.push(getNextElement(_element, 2))
        output.push(getPreviousElement(_element, 2))
    }

    return output;

}

const moveVertically = (_element) => {
    let array = [];
    let id = parseInt(_element.id);
    array.push(_element)
    if (id === 0 || id === 1 || id === 2) {
        array.push(getNextElement(_element, 3))
        array.push(getNextElement(_element, 6))
    } else if (id === 6 || id === 7 || id === 8) {
        array.push(getPreviousElement(_element, 3))
        array.push(getPreviousElement(_element, 6))
    } else if (id === 4) {
        array.push(getPreviousElement(_element, 3))
        array.push(getNextElement(_element, 3))
    } else if (id === 3 || id === 5) {
        array.push(getNextElement(_element, 3))
        array.push(getPreviousElement(_element, 3))
    }

    return array;
}

const moveDiagonally = (_element) => {
    let array = [];
    let id = parseInt(_element.id);
    array.push(_element);
    if (id === 0) {
        array.push(getNextElement(_element, 4))
        array.push(getNextElement(_element, 8))
    } else if (id === 8) {
        array.push(getPreviousElement(_element, 4))
        array.push(getPreviousElement(_element, 8))
    } else if (id === 2) {
        array.push(getNextElement(_element, 2))
        array.push(getNextElement(_element, 4))
    } else if (id === 6) {
        array.push(getPreviousElement(_element, 2))
        array.push(getPreviousElement(_element, 4))
    }
    return array;
}

const showBoxes = () => {
    for (let i = 0; i < numberOfCells; i++) {
        addCell(i);
    }
}

const reset = () => {
    ticBox.innerHTML = '';
    gameIsFinish = false;
    turn = 0;
    isPlayerOne = true;
    Array.from(players).forEach(player => {
        player.className = 'player';
    });
    showBoxes();
}

showBoxes();

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell') && !e.target.classList.contains('circle') && !e.target.classList.contains('cross') && gameIsFinish === false) {
        e.target.classList.add(isPlayerOne ? 'circle' : 'cross')
        isPlayerOne = !isPlayerOne;
        changePlayer(isPlayerOne);
        turn++;
        turn > 4 && figurePosition(e.target);
        if (turn >= 9 && gameIsFinish === false) {
            setTimeout(() => {
                alert('Draw!')
                reset();
            }, 600)
        }
    }
})









