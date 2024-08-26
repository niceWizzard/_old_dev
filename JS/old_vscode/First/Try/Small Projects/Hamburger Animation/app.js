let hamburger = document.querySelector('.hamburger');
let isActive = false;

hamburger.addEventListener('click', e => {

    if (isActive) {
        debugger;
        hamburger.classList.add('reverse-rotate');
        setTimeout(() => {
            hamburger.classList.toggle('animate');
            hamburger.classList.remove('reverse-rotate');

        }, 490)
        isActive = false;
    }
    else {
        hamburger.classList.toggle('animate');
        hamburger.classList.add('rotate')
        setTimeout(() => {
            hamburger.classList.remove('rotate');
        }, 950)
        isActive = true;
    }
});


