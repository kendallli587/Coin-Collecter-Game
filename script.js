// Coin Runner

// Setup Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 800;

// Variables for HTML Elements
let modalEl = document.getElementById("modal");
let showModalEl = document.getElementById('show-modal');
let hideModalEl = document.getElementById("hide-modal");
let playerScore = document.getElementById("playerScore");
let playBtnEl = document.getElementById("begin-play")
let highScoreEl = document.getElementById("high-score");
let titleEl = document.getElementById("my-title")
let starImgEl = document.getElementById("starImg");

// Global Variables
let circleX = 400;
let circleY = 400;
let leftKeyIsPressed = false;
let rightKeyIsPressed = false;
let spaceKeyIsPressed = false;
let squareX = 50;
let squareY = 50;
let score = 0;
let textBlank = "black";
let text = "";
let highScore = 0;
let font = "100px Times";
let textX = 330;
let textY = 400;
let triX = 20;
let triY = triX - 2.5;
let starX = 100;
let starY = 700;

// MODAL STUFF
showModalEl.addEventListener("click", showModal);
hideModalEl.addEventListener("click", hideModal)

function showModal() {
    modalEl.style.display = "block";
}
function hideModal() {
    modalEl.style.display = "none";
}

// Flashing Title
let flashInterval;

function changeColor() {
    if (!flashInterval) {
        flashInterval = setInterval(flashText, 750);
    }
}

function flashText() {
    const oElem = titleEl;
    if (oElem.className === "on") {
        oElem.className = "off";
    } else {
        oElem.className = "on"
    }
}
document.addEventListener("click", changeColor);
////////////////////////////////////////////////



playBtnEl.addEventListener("click", resetGame);

function resetGame() {
    // Text "GO!"
    textX = 330;
    textY = 400;
    font = "100px Times"
    textBlank = "rgba(255, 255, 255, 1)";
    text = "Go!"
    // Text Disappears after 3 seconds
    setTimeout(blankText, 3000);
    function blankText() {
        textBlank = "black"
        text = "";
    }
    // Game ends after 30 seconds
    setTimeout(endText, 30000)
    function endText() {
        font = "25px Times"
        textBlank = "rgba(255, 255, 255, 1)";
        text = "30 Seconds are up!  Your score is " + score + "!";
        textX = 225;
        textY = 400;
        
        // Update High Score
        if (score > highScore) {
            highScore = score;
            console.log(highScore);
            highScoreEl.innerHTML = highScore;
        }
    }
    score = 0;
}

requestAnimationFrame(loop);

function loop() {
    // Distance Between Player and Square
    let changeX = ((circleX - squareX) ** 2)
    let changeY = ((circleY - squareY) ** 2)
    let distance = Math.sqrt(changeX + changeY);

    // Redraw Background
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Constant "Gravity"
    circleY += 10; 

    if (leftKeyIsPressed) {
        circleX -= 5;
    }
    if (rightKeyIsPressed) {
        circleX += 5;
    }
    if (spaceKeyIsPressed) {
        circleY -= 20;
    }

    // Movement Restrictions
    if (circleY >= 775) {
        circleY = 775;
    } else if (circleY <= 25) {
        circleY = 25;
    }
    if (circleX >= 775) {
        circleX = 775;
    } else if (circleX <= 25) {
        circleX = 25;
    }

    // Draw Player Circle
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(circleX, circleY, 25, 0, 2 * Math.PI);
    ctx.fill();

    // Move Green-Square when Touched
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    if (distance <= 25) {
        score++;
        squareX = (getRandomInt(790));
        squareY = (getRandomInt(790));
    }

    // Text "GO!"
    ctx.font = font;
    ctx.lineWidth = 3;
    ctx.strokeStyle = textBlank;
    ctx.strokeText(text, textX, textY);

    // Green Square
    ctx.fillStyle = "green";
    ctx.fillRect(squareX, squareY, 10, 10);
    requestAnimationFrame(loop);

    // Star Stuff
    ctx.drawImage(starImgEl, starX, starY, 20, 20);
    let starMove = true;

    if (starMove) {
        starX += 8;
        starY -= 8;
        if (starX >= 790 && starY <= 10) {
            starX = 0;
            starY = 800;
        }
    }
    // Distance Between Player and Star
    let diffStarX = ((circleX - starX) ** 2)
    let diffStarY = ((circleY - starY) ** 2)
    let changeStar = Math.sqrt(diffStarX + diffStarY);
    console.log(changeStar);

    if (changeStar <= 15) {
        score += 3;
        starMove = false;

        setTimeout(starRestart, 5000);
        function starRestart() {
            starMove = true;
        }
    }

    // Update Score
    playerScore.innerHTML = score;

    // // Distance Between Player and Triangle
    // let changeTriX = ((circleX - triX) ** 2)
    // let changeTriY = ((circleY - triY) ** 2)
    // let triDistance = Math.sqrt(changeTriX + changeTriY);

    // // USE CONSTANT INTERVAL TO MOVE PINK TRIANGLE AROUND RANDOMLY
    // let movingTriangle = setInterval(moveTri, 100);

    // function moveTri() {
    //     triX = (getRandomInt(790));
    //     // Pink Triangle
    //     // Location based on variable triX
    //     ctx.fillStyle = "pink";
    //     ctx.beginPath();
    //     ctx.moveTo(triX, triY);
    //     ctx.lineTo((triX - 7.5), (triY + 10));
    //     ctx.lineTo((triX + 7.5), (triY + 10));
    //     ctx.fill();
    // }
}

// Keyboard Events
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
    if (event.code === "ArrowLeft") {
        leftKeyIsPressed = true;
    } else if (event.code === "ArrowRight") {
        rightKeyIsPressed = true;
    } else if (event.code === "Space") {
        spaceKeyIsPressed = true;
    }
}
function keyupHandler(event) {
    if (event.code === "ArrowLeft") {
        leftKeyIsPressed = false;
    } else if (event.code === "ArrowRight") {
        rightKeyIsPressed = false;
    } else if (event.code === "Space") {
        spaceKeyIsPressed = false;
    }
}

