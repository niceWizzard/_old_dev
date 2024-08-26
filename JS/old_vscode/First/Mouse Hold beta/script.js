var block = document.querySelector('.block');
var container = document.querySelector('#container');
var isHeld = false;
var holdText = document.createElement('p');
holdText.className = 'holdText';


block.addEventListener('mousedown', holdTextAppear);
block.addEventListener('mousedown', blockMove);

block.addEventListener('mouseup', holdTextDisappear);

function blockMove(e) {
    isHeld = true;
    container.addEventListener('mousemove', startMove);
    function startMove(e) {

        if (isHeld === true) {

            block.style.left = e.offsetX + 'px';
            block.style.top = e.offsetY + 'px';
            //     setInterval(function () {
            //         console.log(block.style.top);
            //         console.log(block.style.left);
            //     }, 1000);
            // }

        }



    }



    function holdTextAppear() {
        holdText.style.display = 'block';
        holdText.style.top = 90 + 'px';
        holdText.style.left = 25 + 'px';


        if (holdText.innerHTML != 'Holding') {
            holdText.innerHTML = 'Holding';
            block.appendChild(holdText);

        }


    }

    function holdTextDisappear() {
        holdText.style.display = 'none';
        console.log('disappeared');
        isHeld = false;

    }

