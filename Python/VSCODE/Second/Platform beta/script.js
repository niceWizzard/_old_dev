var game = document.getElementById('game');
var block = document.querySelector('.block');
var player = document.querySelector('#player');
var playerSpeed = 4;
var both = 0;
var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left')) - 30;
var blockRight = parseInt(window.getComputedStyle(block).getPropertyValue('left')) + 270;
var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue('top')) - 30;
var playerX = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
var playerY = parseInt(window.getComputedStyle(player).getPropertyValue('top'));



var movingLeft = false;
var movingRight = false;


// Gravity interval



var gravity = setInterval(function () {
    playerY = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    if ((playerY < blockTop && playerY < 520)) {
        player.style.top = (playerY + 2) + 'px';
        // console.log(playerY);

    }


    // console.log(player.style.top);

}, 6);



var i = 0;

// function run() {
//     var isTouched = setInterval(function () {
//         // console.log('player ' + playerY);
//         console.log(blockTop);
//         if ((playerX > blockLeft && playerX < blockRight) && (playerY == blockTop)) {
//             console.log('touched');

//         } else {
//             console.log('untouched');

//         }
//         i++;

//         if (i == 130) {
//             // console.log(playerX > blockLeft);
//             // console.log(playerX < blockRight);
//             // console.log(playerX);
//             // console.log(blockLeft);
//             // console.log(blockRight);
//             clearInterval(isTouched);

//         }
//     }, 10);






// console.log(playerY);
// console.log('block top: ' + blockTop);

// console.log(blockTop)

document.addEventListener('keydown', e => {
    if (both == 0) {
        both++;

        if (e.key === 'd') {
            movingRight = true;
            interval = setInterval(moveRight, 10);
        }
        if (e.key === 'a') {
            movingLeft = true;
            interval = setInterval(moveLeft, 10);

        }
    }

});

document.addEventListener('keyup', e => {
    console.log('both: ' + both);
    both = 0;
    clearInterval(interval);
    movingLeft = false;
    movingRight = false;

});










// moving functions

function moveRight() {
    playerX = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    if (playerX < 1270) {
        player.style.left = (playerX + playerSpeed) + 'px';
        console.log('moving right');
    }

}

function moveLeft() {

    playerX = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    if (playerX > 0) {
        player.style.left = (playerX - playerSpeed) + 'px';
        console.log('moving left');

    }

}




// console.log('player Top: ' + playerY);
