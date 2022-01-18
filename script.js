let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = "#302c2c"

// getting the paintbrush
let ctx = canvas.getContext('2d')

// The DOM of the start and the restart buttons
let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')
let intervalId = 0;
let gameOver = false;
let circleX = 250, circleY = 250, radius = 30;
let incX = 5, incY = 5;
let paddleX = 150, paddleWidth = 200, paddleHeight =20;
let paddleY = canvas.height - paddleHeight;
let isRight = false, isLeft = false; 
let score = 0;

function drawCircle(){
    ctx.beginPath()
    ctx.fillStyle = '#7af8fa'
    ctx.arc(circleX, circleY, radius, 0, 2* Math.PI)
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){
    ctx.beginPath()
    ctx.fillStyle = '#faa20a'
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight)
    ctx.closePath()
}

function collision(){
    // Right collision
    if (circleX + radius > canvas.width) {
        incX = -incX
    }
    //Bottom collision
    if (circleY + radius > canvas.height ) {
        if(circleX > paddleX && circleX < paddleX + paddleWidth) {
            incY = -incY
            score++
        }
        else {
            gameOver = true;
        }
        
    }
    //Left collision
    if (circleX - radius < 0 ) {
        incX = 5
    }
    //Top collision
    if (circleY - radius < 0) {
        incY = 5
    }
}

function showGameOver(){
    canvas.style.display = 'none';
    restartBtn.style.display = 'block'
}

function animation(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCircle()
    drawPaddle()

    circleX = circleX + incX
    circleY = circleY + incY

    if (isRight && paddleX + paddleWidth < canvas.width) {
        paddleX = paddleX + 5
    }
    if (isLeft && paddleX > 0) {
        paddleX = paddleX - 5
    }

    collision()
    ctx.font = '24px Verdana'
    ctx.fillStyle = 'white'
    ctx.fillText(`Score: ${score} `, 10, 20)

    if (gameOver) {
        cancelAnimationFrame(intervalId);
        showGameOver()
    }
    else {
        intervalId = requestAnimationFrame(animation)
    }
}


function handleStart(){
    startBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    canvas.style.display = 'block';
    animation()
}


 //Everything begins here
window.addEventListener('load', () => {
    canvas.style.display = 'none'
    restartBtn.style.display = 'none'
    

    document.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowLeft') {
            isLeft = true;
            isRight = false;
        }
        if (event.key == 'ArrowRight') {
            isRight = true;
            isLeft = false;
        }
    })
    document.addEventListener('keyup', () => {
        isLeft = false;
        isRight = false;
    })
    
    startBtn.addEventListener('click', () => {
        handleStart()
    })

    restartBtn.addEventListener('click', () => {
        // Reset your variables here.
        gameOver = false;
        circleX = 150;
        circleY = 150;
        score = 0;
        handleStart()
    })
})