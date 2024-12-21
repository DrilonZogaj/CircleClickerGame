const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
let score = 0;
let timer;
let circleColor;
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
let circle = { x: 0, y: 0, radius: 30 };

function startGame() {
    score = 0;
    scoreElement.textContent = score;
    circleColor = colors[Math.floor(Math.random() * colors.length)];
    resetCircle();
    drawCircle();
    startTimer();
}

function startTimer() {
    let timeLeft = 60;
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`Time's up! Your score: ${score}`);
            startGame();
        }
    }, 1000);
}

function resetCircle() {
    circle.x = Math.random() * (canvas.width - circle.radius * 2) + circle.radius;
    circle.y = Math.random() * (canvas.height - circle.radius * 2) + circle.radius;
}

function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = circleColor;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fill();
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const dist = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
    if (dist < circle.radius) {
        score++;
        scoreElement.textContent = score;
        resetCircle();
        drawCircle();
    }
});

startGame();
