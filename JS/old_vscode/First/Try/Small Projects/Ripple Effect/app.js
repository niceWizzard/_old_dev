let button = document.querySelector('.button');
let toRipple = document.querySelector('.after');

button.addEventListener('click', e => {
    // console.log(toRipple);
    toRipple.style.left = e.offsetX - 35 + 'px';
    toRipple.style.top = e.offsetY - 35 + 'px';
    console.log(e.offsetX)
    toRipple.classList.add('add-ripple-effect');
    setTimeout(() => {
        toRipple.classList.remove('add-ripple-effect');

    }, 500)
});






