var snakeHead = document.querySelector('#snake-head');
var snake = document.getElementById('snake');
var snakeLeft = parseInt(window.getComputedStyle(snakeHead).getPropertyValue('left'));
var snakeTop = parseInt(window.getComputedStyle(snakeHead).getPropertyValue('top'));

var snakeBody1 = document.createElement('div');
var snakeBody2 = document.createElement('div');

var previousX = 0;
var previousY = 0;


// var playerX = parseInt(window.getComputedStyle(player).getPropertyValue('left'));


var direction = 'right';




var controller = document.addEventListener('keydown', e => {
    console.log(e.key);
    if (e.key == 'w' || e.key == 'ArrowUp') {
        direction = 'top';
    }
    else if (e.key == 's' || e.key == 'ArrowDown') {
        direction = 'bottom';
    }
    else if (e.key == 'd' || e.key == 'ArrowRight') {
        direction = 'right';
    }
    else if (e.key == 'a' || e.key == 'ArrowLeft') {
        direction = 'left';
    }


});






snakeBody1.className = 'snake-body';
setInterval(function () {
    if (direction == 'top') {
        snakeBody1.style.top = snakeTop + 20 + 'px';

    } else if (direction == 'right' || direction == 'left') {
        snakeBody1.style.top = snakeTop + 'px';

    } else {
        snakeBody1.style.top = snakeTop - 20 + 'px';

    }
    if (direction == 'left') {
        snakeBody1.style.left = snakeLeft + 20 + 'px';
    } else if (direction == 'bottom') {
        snakeBody1.style.left = snakeLeft + 'px';
    } else if (direction == 'top') {
        snakeBody1.style.left = snakeLeft + 'px';

    }
    else {
        snakeBody1.style.left = snakeLeft - 20 + 'px';

    }

}, 20);


snakeBody2.className = 'snake-body';
setInterval(function () {
    if (direction == 'top') {
        snakeBody2.style.top = snakeTop + 20 + 'px';

    } else if (direction == 'right' || direction == 'left') {
        snakeBody2.style.top = snakeTop - 20 + 'px';

    } else {
        snakeBody2.style.top = snakeTop - 60 + 'px';

    }
    if (direction == 'left') {
        snakeBody2.style.left = snakeLeft + 40 + 'px';
    } else if (direction == 'bottom') {
        snakeBody2.style.left = snakeLeft + 'px';
    } else if (direction == 'top') {
        snakeBody2.style.left = snakeLeft + 'px';

    }
    else {
        snakeBody2.style.left = snakeLeft - 40 + 'px';

    }
}, 20);

snake.appendChild(snakeBody1);
snake.appendChild(snakeBody2);



var snakeHeadMove = setInterval(function () {
    if ((snakeLeft < 783 && snakeTop < 483) && (snakeLeft > -3 && snakeTop > -3)) {
        switch (direction) {
            case 'right':
                snakeHead.style.left = snakeLeft++ + 'px';
                break;
            case 'left':
                snakeHead.style.left = snakeLeft-- + 'px';
                break;
            case 'top':
                snakeHead.style.top = snakeTop-- + 'px';
                break;
            case 'bottom':
                snakeHead.style.top = snakeTop++ + 'px';
                break;

        }
    }
}, 13);