(function () {
    // define canvas
    let myCanvas = document.getElementById("myCanvas");
    let canvas = myCanvas.getContext("2d");

    // define buttons and clicks
    let calcBTN = document.getElementById("calcBTN");
    calcBTN.addEventListener("click", onDrawValidSquareClicked);

    let drawBTN = document.getElementById("drawBTN");
    drawBTN.addEventListener("click", onDrawValidSquareClicked);

    let clearCanvas = document.getElementById("clearCanvas");
    clearCanvas.addEventListener("click", onClearCanvasClicked);

    myCanvas.addEventListener("click", getPoint, false);

    // define values
    let squareWidth = document.getElementById("squareWidth");
    let squareHeight = document.getElementById("squareHeight");
    let xPoint = document.getElementById("xPoint");
    let yPoint = document.getElementById("yPoint");
    let squareSizeCalculation = document.getElementById("sizeCalculation");

    // >> balagan starts here! <<
    function onDrawValidSquareClicked() {
        //all my validations limit the square drawing to be INSIDE the canvas without covering the frame itself
        //as someone once said ... IT'S NOT A BUG, IT'S A FEATURE!
        //validation #1
        let areFieldsValid = checkIfValidFields();
        if (!areFieldsValid) {
            alert("please fill all the fields correctly");
            return;
        }

        //validation #2
        let arePointsValid = checkIfValidPoints();
        if (!arePointsValid){
            alert("the point you chose is out of the canvas limits");
            return;
        }

        //validation #3
        let validSquarePosition = checkIfValidSquare();
        if (!validSquarePosition) {
            alert("you can't draw outside the canvas!");
            return;
        }

        //I sent the parameters to the func even though they are global, because of the Draw button,
        //which in it I update the relevant values straight to the input fields
        drawSquare(xPoint.value, yPoint.value, squareWidth.value, squareHeight.value);
        squareSizeCalculation.innerHTML = "Square space is: " + squareWidth.value * squareHeight.value;

        initInputValues();
    }

    function drawSquare(xPoint, yPoint, squareWidth, squareHeight) {
        canvas.beginPath();
        canvas.rect(xPoint, yPoint, squareWidth, squareHeight);
        canvas.strokeStyle = "blue";
        canvas.stroke();

        enableCalcBTN();
    }

    function checkIfValidFields() {
        initInputStyle();

        if (squareWidth.value == "" || squareWidth.value <= 0) {
            squareWidth.style.border = "2px solid red";
            return false;
        }
        if (squareHeight.value == "" || squareHeight.value <= 0) {
            squareHeight.style.border = "2px solid red";
            return false;
        }
        if (xPoint.value == "") {
            xPoint.style.border = "2px solid red";
            return false;
        }
        if (yPoint.value == "") {
            yPoint.style.border = "2px solid red";
            return false;
        }
        return true;
    }

    function checkIfValidSquare() {
        initInputStyle();

        let minSideWidth = myCanvas.width - xPoint.value;
        let minSideHeight = myCanvas.height - yPoint.value;

        if (squareWidth.value >= minSideWidth) {
            squareWidth.style.border = "2px solid red";
            return false;
        }
        if (squareHeight.value >= minSideHeight) {
            squareHeight.style.border = "2px solid red";
            return false;
        }
        return true;
    }

    function checkIfValidPoints(){
        initInputStyle();

        if (xPoint.value <= 0 || xPoint.value >= myCanvas.width) {
            xPoint.style.border = "2px solid red";
            return false;
        }
        if (yPoint.value <= 0 || yPoint.value >= myCanvas.height) {
            yPoint.style.border = "2px solid red";
            return false;
        }

        return true;
    }

    function onClearCanvasClicked() {
        canvas.clearRect(0, 0, myCanvas.width, myCanvas.height);
        initInputValues();
        squareSizeCalculation.innerHTML = "";
        //in case that I init the inputs after using the Draw button incorrectly
        enableCalcBTN();
    }

    function initInputStyle(){
        squareWidth.style.border = "";
        squareHeight.style.border = "";
        xPoint.style.border = "";
        yPoint.style.border = "";
    }

    function initInputValues() {
        squareWidth.value = "";
        squareHeight.value = "";
        xPoint.value = "";
        yPoint.value = "";
    }

    function getPoint() {
        let x = event.offsetX;
        let y = event.offsetY;

        squareWidth.value = 20;
        squareHeight.value = 30;
        xPoint.value = x;
        yPoint.value = y;

        enableDrawBTN();
    }

    // INIT BUTTONS
    function enableCalcBTN() {
        //I want the ״draw״ button to be disabled UNLESS I clicked the canvas, so I INIT it after drawing
        drawBTN.disabled = true;
        drawBTN.style.backgroundColor = "gray";
        calcBTN.disabled = false;
        calcBTN.style.backgroundColor = "darkslateblue";
    }

    function enableDrawBTN() {
        //I want the calc button to be disables AS LONG AS the draw button is enabled
        //(when the user clicks on the canvas to get points...)
        drawBTN.disabled = false;
        drawBTN.style.backgroundColor = "darkslateblue";
        calcBTN.disabled = true;
        calcBTN.style.backgroundColor = "gray";
    }

    // >> BONUS TIME <<

    // define the tirlul
    let randomSquares = setInterval(drawRandomSquares, 800);

    // define button
    let stopRandomDrawing = document.getElementById("stopRandomDrawing");
    stopRandomDrawing.addEventListener("click", stopInterval);

    // the origin of the tirlul is here
    function drawRandomSquares() {
        let randomSquareWidth = Math.trunc(Math.random() * (myCanvas.width - 1) + 10);
        let randomSquareHeight = Math.trunc(Math.random() * (myCanvas.height - 1) + 10);
        // I want all the squares inside the canvas FOR SURE
        let minRandomSide = Math.min(randomSquareWidth, randomSquareHeight);
        let randomXPoint = myCanvas.width - randomSquareWidth;
        let randomYPoint = myCanvas.height - randomSquareHeight;

        drawSquare(randomXPoint, randomYPoint, minRandomSide, minRandomSide);
    }

    function stopInterval() {
        clearInterval(randomSquares);
    }
})();