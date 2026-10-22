```javascript
// Game variables
let goals = 0;
let saves = 0;
let shotsLeft = 5;
let isShooting = false;

const goalsElement = document.getElementById("goals");
const savesElement = document.getElementById("saves");
const shotsLeftElement = document.getElementById("shotsLeft");

const messageElement = document.getElementById("message");
const goalkeeper = document.getElementById("goalkeeper");
const football = document.getElementById("football");

const shootButtons = document.querySelectorAll(".shoot-btn");
const restartBtn = document.getElementById("restartBtn");

// Update scoreboard
function updateScoreboard() {
    goalsElement.textContent = goals;
    savesElement.textContent = saves;
    shotsLeftElement.textContent = shotsLeft;
}

// Shoot the football
function shootBall(direction) {
    if (isShooting || shotsLeft <= 0) {
        return;
    }

    isShooting = true;
    shotsLeft--;

    shootButtons.forEach(button => {
        button.disabled = true;
    });

    // Goalkeeper randomly chooses a direction
    const directions = ["left", "center", "right"];

    const goalkeeperDirection =
        directions[Math.floor(Math.random() * directions.length)];

    // Move goalkeeper
    if (goalkeeperDirection === "left") {
        goalkeeper.style.left = "15%";
    } else if (goalkeeperDirection === "right") {
        goalkeeper.style.left = "85%";
    } else {
        goalkeeper.style.left = "50%";
    }

    // Animate football toward the selected direction
    if (direction === "left") {
        football.style.left = "28%";
        football.style.bottom = "240px";
        football.style.transform = "translateX(-50%) scale(0.6)";
    } else if (direction === "right") {
        football.style.left = "72%";
        football.style.bottom = "240px";
        football.style.transform = "translateX(-50%) scale(0.6)";
    } else {
        football.style.left = "50%";
        football.style.bottom = "240px";
        football.style.transform = "translateX(-50%) scale(0.6)";
    }

    // Decide whether the goalkeeper saves the shot
    const isSaved = direction === goalkeeperDirection;

    setTimeout(() => {
        if (isSaved) {
            saves++;
            messageElement.textContent =
                "🧤 SAVED! The goalkeeper stopped your shot!";
        } else {
            goals++;
            messageElement.textContent =
                "⚽ GOOOAL! What a brilliant finish!";
        }

        updateScoreboard();

        setTimeout(() => {
            resetPositions();

            if (shotsLeft === 0) {
                finishGame();
            } else {
                isShooting = false;

                shootButtons.forEach(button => {
                    button.disabled = false;
                });
            }
        }, 800);

    }, 550);
}

// Reset ball and goalkeeper positions
function resetPositions() {
    football.style.left = "50%";
    football.style.bottom = "45px";
    football.style.transform = "translateX(-50%) scale(1)";

    goalkeeper.style.left = "50%";
}

// Finish the game
function finishGame() {
    isShooting = true;

    shootButtons.forEach(button => {
        button.disabled = true;
    });

    let result;

    if (goals >= 4) {
        result = "🏆 AMAZING! You are a football superstar!";
    } else if (goals >= 2) {
        result = "👏 GOOD GAME! Keep practising!";
    } else {
        result = "😅 Tough match! Try again to improve your score!";
    }

    messageElement.textContent =
        `FULL TIME! You scored ${goals} out of 5 goals. ${result}`;
}

// Connect buttons to shooting function
shootButtons.forEach(button => {
    button.addEventListener("click", () => {
        const direction = button.dataset.direction;
        shootBall(direction);
    });
});

// Restart the game
restartBtn.addEventListener("click", () => {
    goals = 0;
    saves = 0;
    shotsLeft = 5;
    isShooting = false;

    resetPositions();
    updateScoreboard();

    messageElement.textContent =
        "Choose your direction and take the shot!";

    shootButtons.forEach(button => {
        button.disabled = false;
    });
});

// Initialize the game
updateScoreboard();
```
