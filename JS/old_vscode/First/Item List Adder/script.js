var addButton = document.querySelector('#add-button');
var form = document.querySelector('#add-form');
var itemTable = document.querySelector('#item-table');
var notifaction = document.querySelector('#warning');

form.addEventListener('submit', e => {
    e.preventDefault();
    if (document.querySelector('#input-text').value != '') {
        let newItem = document.createElement('div');
        let outputText = document.createElement('h3');
        var newRemoveButton = document.createElement('BUTTON');
        outputText.innerText = document.querySelector('#input-text').value;
        outputText.className = 'content';
        newItem.className = 'item';
        newRemoveButton.className = 'remove-button';
        newRemoveButton.innerText = 'x';
        newItem.appendChild(outputText)
        newItem.appendChild(newRemoveButton);

        itemTable.appendChild(newItem);
        document.querySelector('#input-text').value = '';
    }

});
setInterval(function () {
    var removeButton = document.querySelectorAll('.remove-button');

    for (let i = 0; i < removeButton.length; i++) {

        removeButton[i].addEventListener('click', e => {
            removeButton[i].parentElement.style.display = 'none';

        });
    }


}, 100)


