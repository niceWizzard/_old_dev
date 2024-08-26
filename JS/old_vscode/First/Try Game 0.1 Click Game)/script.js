

var game = document.getElementById('game');
var block = document.getElementById('block');
var xCounter = 1;
var yCounter = 1;
var dot = document.createElement('p');
var warning = document.createElement('p');
var animationIsHappening = 2;
var previousXPosition = 250;
var previousYPosition = 250;

game.addEventListener('click', startAnimate);



function startAnimate(e) {
    warning.style.display = 'none';



    var currentXPosition = e.offsetX;
    var currentYPosition = e.offsetY;

    if (animationIsHappening == 2) {
        animationIsHappening -= 2;

        dot.className = 'dot';
        dot.style.top = currentYPosition + 'px';
        dot.style.left = currentXPosition + 'px';
        dot.style.display = 'block';

        game.appendChild(dot);

        // Start Of Animation 

        var xInterval = setInterval(xAnimate, 8);
        var yInterval = setInterval(yAnimate, 8);

        function xAnimate() {
            xCounter += 1;

            if (currentXPosition < previousXPosition) {

                block.style.left = previousXPosition-- + 'px';
            } else if (currentXPosition > previousXPosition) {
                block.style.left = previousXPosition++ + 'px';
            } else {
                xCounter--;
                animationIsHappening++;
                clearInterval(xInterval);
            }


        }

        function yAnimate() {
            yCounter += 1;

            if (currentYPosition < previousYPosition) {

                block.style.top = previousYPosition-- + 'px';
            } else if (currentYPosition > previousYPosition) {
                block.style.top = previousYPosition++ + 'px';
            } else {
                yCounter--;
                animationIsHappening++;
                clearInterval(yInterval);

            }
        }




        // Sets Position 
        if (xCounter < 1 && yCounter < 1) {
            previousXPosition = currentXPosition;
            previousYPosition = currentYPosition;
        }



        // console.log("Current X: " + currentXPosition + 'Previous X: ' + previousXPosition);
        // console.log("Y: " + currentYPosition);

    }
}









