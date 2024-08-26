var mainMenu = document.querySelector('#main-menu')
var bottomMenu = document.querySelector('#bottom-menu')

setInterval(function () {
    var bottomMenuTop = parseInt(window.getComputedStyle(bottomMenu).getPropertyValue('top'));
    mainMenu.style.height = bottomMenuTop + 'px';
    var i = bottomMenuTop;

    bottomMenu.addEventListener('click', e => {
        if (bottomMenuTop >= 500) {
            bottomMenu.classList.remove('slide-down');

            bottomMenu.classList.add('slide-up');
            bottomMenu.style.top = 200 + 'px';
        } else {
            bottomMenu.classList.remove('slide-up');
            bottomMenu.classList.add('slide-down');

            bottomMenu.style.top = 500 + 'px';
        }




    });



}, 10);









