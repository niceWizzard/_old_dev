var clickMenu = document.querySelector('.click-menu');
var hiddenMenu = document.querySelector('.hidden-menu');
var icon = document.querySelector('#icon');


clickMenu.addEventListener('click', function () {
    if (parseInt(window.getComputedStyle(hiddenMenu).getPropertyValue('top')) == -250) {
        hiddenMenu.classList.remove('slide-up')

        hiddenMenu.classList.add('slide-down');
        hiddenMenu.style.top = 0 + 'px';
        icon.classList.add('rotate');
    } else {
        hiddenMenu.classList.remove('slide-down')
        icon.classList.remove('rotate');

        hiddenMenu.classList.add('slide-up')
        hiddenMenu.style.top = -250 + 'px';

    }
})


