const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

const player1NameInput = document.getElementById("player1Name");
const player2NameInput = document.getElementById("player2Name");
const player1ColorInput = document.getElementById('player1Color');
const player2ColorInput = document.getElementById('player2Color');
const warning = document.getElementById('warning');

let player1Y = canvas.height / 2 - 40;
let player2Y = canvas.height / 2 - 40;
let paddleHeight = 80;
let paddleWidth = 10;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;
let ballRadius = 10;

let player1Score = 0;
let player2Score = 0;

let player1Color = '#ff0000';
let player2Color = '#0000ff';

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'w':
            if (player1Y > 0) player1Y -= 20;
            break;
        case 's':
            if (player1Y < canvas.height - paddleHeight) player1Y += 20;
            break;
        case 'ArrowUp':
            if (player2Y > 0) player2Y -= 20;
            break;
        case 'ArrowDown':
            if (player2Y < canvas.height - paddleHeight) player2Y += 20;
            break;
    }
});

function isValidName(name) {
    const regex = /^[A-Za-z]+$/;
    return regex.test(name);
}

function startGame() {
    const player1Name = player1NameInput.value;
    const player2Name = player2NameInput.value;

    if (!isValidName(player1Name) || !isValidName(player2Name)) {
        warning.style.display = 'block';
        return;
    }
    warning.style.display = 'none';

    player1Color = player1ColorInput.value;
    player2Color = player2ColorInput.value;

    requestAnimationFrame(updateGame);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom walls
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - ballRadius < paddleWidth) {
        if (ballY > player1Y && ballY < player1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player2Score++;
            resetBall();
        }
    }

    if (ballX + ballRadius > canvas.width - paddleWidth) {
        if (ballY > player2Y && ballY < player2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player1Score++;
            resetBall();
        }
    }

    // Draw paddles
    ctx.fillStyle = player1Color;
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
    ctx.fillStyle = player2Color;
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    // Draw scores
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Player 1: ${player1Score}`, 50, 50);
    ctx.fillText(`Player 2: ${player2Score}`, canvas.width - 150, 50);

    requestAnimationFrame(updateGame);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}
