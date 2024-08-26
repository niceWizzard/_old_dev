let player = document.querySelector('.player');
let playerInfo = document.querySelector('.player-info')
let playerWidth = 50;
let playerHearts = 3;
let playerSpeed = 10;

let blockContainer = document.querySelector('.collision-blocks')
let blockHeight = 100;
let maxBlocks = 2;


const showHeart = () => {
    playerInfo.innerHTML = '';
    for (let i = 0; i < playerHearts; i++) {
        let heart = document.createElement('span');
        heart.className = 'heart'
        playerInfo.appendChild(heart);
    }
}

const playerWasHit = () => {
    updateHeart();
    player.classList.add('hit');
    setTimeout(() => {
        player.classList.remove('hit')
    }, 3000)

}

const updateHeart = () => {
    playerHearts -= 1;
    showHeart();
}

const playerIsInsideBlockRadius = (_player, _block) => {
    let output = false;
    const { top: pTop, bottom: pBottom, left: pLeft, right: pRight } = _player;
    const { top: bTop, bottom: bBottom, left: bLeft, right: bRight } = _block;
    // console.log(pLeft, bRight)
    if ((bLeft <= pRight && bRight >= pLeft) && (pTop >= bTop && pBottom <= bBottom || pTop <= bTop && (pBottom <= bBottom && pBottom >= bTop) ||
        pBottom >= bBottom && (pTop <= bBottom))
    ) {
        if (!player.classList.contains('hit')) output = true;
    }

    return output;
}

const randomizeBlock = () => {
    let previousLeft = 0;
    let top, left, width;
    for (let i = 0; i < maxBlocks; i++) {
        top = Math.floor(Math.random() * 499) + 1;
        left = Math.floor(Math.random() * 799) + 801;
        width = Math.floor(Math.random() * 99 + 201)

        let block = document.createElement('div')
        block.classList = 'block';
        block.style.top = top + 'px'
        block.style.left = left + 'px'
        block.style.width = width + 'px'
        blockContainer.appendChild(block);
        previousLeft = left;
    }
}

function showGame() {
    let blockMove = setInterval(() => {
        const playerObject = {
            left: parseInt(getComputedStyle(player).getPropertyValue('left')),
            top: parseInt(getComputedStyle(player).getPropertyValue('top')),
            right: parseInt(getComputedStyle(player).getPropertyValue('left')) + playerWidth,
            bottom: parseInt(getComputedStyle(player).getPropertyValue('top')) + playerWidth,
        }
        blocks.forEach(block => {

            const blockObject = {
                left: parseInt(getComputedStyle(block).getPropertyValue('left')),
                right: parseInt(getComputedStyle(block).getPropertyValue('left')) + 400,
                top: parseInt(getComputedStyle(block).getPropertyValue('top')),
                bottom: parseInt(getComputedStyle(block).getPropertyValue('top')) + blockHeight,
            };

            const playerIsWithin = playerIsInsideBlockRadius(playerObject, blockObject);

            console.log(playerIsWithin)
            // console.log(playerObject.right, blockObject.left)
            if (playerIsWithin) {
                playerWasHit();
            }
            if (blockObject.left <= -300) {
                clearInterval(blockMove)
                blockContainer.innerHTML = '';
            }
        })

    }, 1000 / 60)
}


// Game 
randomizeBlock();
showGame();

setInterval(() => {
    if (blockContainer.innerHTML === '') {
        randomizeBlock();
        showGame()
    }
}, 1000 / 60)

document.addEventListener('keypress', (e) => {
    if (e.key === 'w') {
        player.style.top = (parseInt(getComputedStyle(player).getPropertyValue('top')) - playerSpeed) + 'px'
    } else if (e.key === 's') {
        player.style.top = (parseInt(getComputedStyle(player).getPropertyValue('top')) + playerSpeed) + 'px'
    }
})




let blocks = document.querySelectorAll('.block');







showHeart();

