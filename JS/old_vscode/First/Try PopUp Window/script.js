var removeButton = document.querySelector('.remove-button');
var addButton = document.querySelector('.pop');
var popUpWindow = document.querySelector('.window');

removeButton.addEventListener('click', function () {
    popUpWindow.style.display = 'none';

});

addButton.addEventListener('click', e => {
    if (popUpWindow.style.display == 'none') {
        popUpWindow.style.display = 'block';
        popUpWindow.className = "slide";
    }
});

