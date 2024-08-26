let selectionHead = document.querySelector('.selection-head');
let selectionBody = document.querySelector('.selection-body');

selectionHead.addEventListener('click', () => {
    if (selectionBody.classList.length < 2 || selectionBody.classList.contains('slide-up')) {
        selectionBody.classList.remove('slide-up');
        selectionBody.classList.add('slide-down');
        selectionBody.style.transform = 'translateY(0%)';
        selectionBody.style.opacity = 1;

    } else {
        selectionBody.classList.toggle('slide-up');
        selectionBody.style.transform = 'translateY(-110%)';
        setTimeout(() => {
            selectionBody.style.opacity = 0;

        }, 400)
    }

});

selectionBody.addEventListener('click', (e) => {
    let b = e.target.innerHTML;

    if (b != '') {
        if (b.length < 40) {
            selectionHead.children[0].innerHTML = b;
            selectionHead.id = e.target.parentElement.previousElementSibling.id
            selectionBody.classList.toggle('slide-up');
            selectionBody.style.transform = 'translateY(-110%)';
        }
    }
});



