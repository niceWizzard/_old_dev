var hamburgerIcon = document.querySelector('#hamburger');
var hamburgerMenu = document.querySelector('#hamburger-menu');
var removeHamburgerMenuButton = document.querySelector('#x-button');
var blur = document.querySelector('.blur');

hamburgerIcon.addEventListener('click', e => {
    hamburgerMenu.classList.add('slide');
    hamburgerMenu.classList.remove('unslide');
    hamburgerMenu.style.display = 'block';
    blur.style.display = 'block';
    blur.style.opacity = 0.5;
    blur.classList.add('blur-animation');



});

removeHamburgerMenuButton.addEventListener('click', e => {
    if (hamburgerMenu.classList.contains('slide')) {
        hamburgerMenu.classList.add('unslide');
        hamburgerMenu.classList.remove('slide');
        setTimeout(function () {
            hamburgerMenu.style.display = 'none';

        }, 500)
        blur.style.display = 'none';

    }




});
