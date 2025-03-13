let score = 0;
let timeLeft = 10;
let timerId;
let highScore = localStorage.getItem('highScore') || 0;
let isGameRunning = false;

const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const highScoreDisplay = document.getElementById('highScore');
const countdownDisplay = document.getElementById('countdown');
const restartButton = document.getElementById('restartButton');
const confettiContainer = document.getElementById('confetti-container');

// Display high score
highScoreDisplay.textContent = highScore;

// Move button randomly within screen bounds
function moveButton() {
    const buttonWidth = clickButton.offsetWidth;
    const buttonHeight = clickButton.offsetHeight;

    // Calculate maximum allowed positions
    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    // Generate random positions within the screen bounds
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    // Set the button's position
    clickButton.style.left = `${x}px`;
    clickButton.style.top = `${y}px`;
}

// Handle button click
clickButton.addEventListener('click', () => {
    if (isGameRunning) {
        score++;
        scoreDisplay.textContent = score;
        moveButton();
        clickButton.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            clickButton.style.transform = 'rotate(0deg)';
        }, 200);
    }
});

// Start the game
function startGame() {
    score = 0;
    timeLeft = 10;
    isGameRunning = false;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    clickButton.disabled = true;
    countdownDisplay.textContent = "3";

    // Countdown before game starts
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = countdown;

        if (countdown === 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = "";
            clickButton.disabled = false;
            isGameRunning = true;
            startTimer();
        }
    }, 1000);
}

// Start the timer
function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerId);
            isGameRunning = false;
            clickButton.disabled = true;

            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                highScoreDisplay.textContent = highScore;
                celebrateHighScore();
            }

            explodeConfetti();
            alert(`Game Over! Your score is ${score}`);
            restartButton.style.display = "block";
        }
    }, 1000);
}

// Restart the game
restartButton.addEventListener('click', () => {
    restartButton.style.display = "none";
    confettiContainer.innerHTML = "";
    startGame();
});

// Start the game initially
startGame();

// Confetti Explosion
function explodeConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * 100}vh`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        confettiContainer.appendChild(confetti);
    }
}

// Celebrate High Score
function celebrateHighScore() {
    explodeConfetti();
    alert("New High Score! 🎉");
}

// Theme Selector
document.getElementById('themeDefault').addEventListener('click', () => {
    document.body.className = "";
});

document.getElementById('themeSpace').addEventListener('click', () => {
    document.body.className = "space";
});

document.getElementById('themeJungle').addEventListener('click', () => {
    document.body.className = "jungle";
});

document.getElementById('themeUnderwater').addEventListener('click', () => {
    document.body.className = "underwater";
});
