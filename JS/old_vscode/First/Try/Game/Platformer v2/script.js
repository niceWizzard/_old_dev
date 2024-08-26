var player = document.querySelector('#player');
var block = document.querySelector('.block');
var game = document.querySelector('.game');

class Movements {
    static fallDown(_thing) {
        setInterval(function () {

            let thingBottom = parseInt(getComputedStyle(_thing).getPropertyValue('top'));
            // console.log(thingBottom);
            if (thingBottom < parseInt(getComputedStyle(game).getPropertyValue('height')) - 50) {
                _thing.style.top = thingBottom + 1 + 'px';
                console.log(thingBottom);
            }
        }, 10);
    }

    static moveHorizontally(_thing) {
        document.addEventListener('keydown', e => {
            let speed = 3;
            let _thingWidth = parseInt(getComputedStyle(_thing).getPropertyValue('width'));
            let _thingHeight = parseInt(getComputedStyle(_thing).getPropertyValue('height'));
            if (e.key === 'd') {
                var moveLeft = setInterval(function () {
                    var _thingRight = parseInt(window.getComputedStyle(_thing).getPropertyValue('left'));
                    if (_thingRight + _thingWidth < parseInt(getComputedStyle(game).getPropertyValue('width'))) {
                        console.log(_thingRight + 1);
                        _thing.style.left = (_thingRight + 1) + 'px';
                    }
                }, 100)
            }
        });
    }

}

// Movements.fallDown(player);
Movements.moveHorizontally(player);

