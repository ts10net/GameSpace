var alphabetArray;
var currentIndex = 0;
var hits = 0;
var misses = 0;
var timer;
var startTime;
var gameOver = false;

function updateGame() {
    document.getElementById("alphabet-line").innerText = alphabetArray.join(" ");
    document.getElementById("current-alphabet").innerText = "[" + alphabetArray[currentIndex] + "]";
}

function startTimer() {
    startTime = new Date().getTime();
    var timerBar = document.getElementById("timer-bar");
    var width = 100;

    timer = setInterval(function () {
        var currentTime = new Date().getTime();
        var elapsedTime = (currentTime - startTime) / 1000;
        var remainingTime = Math.max(15 - elapsedTime, 0);

        width = (remainingTime / 15) * 100;
        timerBar.style.width = width + "%";

        updateProgress(elapsedTime);

        if (elapsedTime >= 15) {
            endGame();
        }
    }, 100);
}

function checkInput(event) {
    if (gameOver) {
        return;
    }

    if (!timer) {
        // First input, start the game
        document.getElementById("timer-bar").style.display = "block";
        document.getElementById("game-info").style.display = "block";
        document.getElementById("restartButton").style.display = "none";
        startTimer();
    }

    var userInput = event.key;
    var currentAlphabet = alphabetArray[currentIndex];

    console.log("User Input:", userInput);
    console.log("Expected Alphabet:", currentAlphabet);

    if (userInput === currentAlphabet) {
        // Correct alphabet typed
        currentIndex++;
        hits++;

        if (currentIndex === alphabetArray.length) {
            // End of the line, reset for the next line
            currentIndex = 0;
            alphabetArray = Array.from(
                { length: 10 },
                () => getRandomAlphabet()
            );
            
        }
        updateGame();
        updateProgress(0); // Reset the timer progress
    } else {
        // Incorrect alphabet typed
        misses++;
    }
}

function getRandomAlphabet() {
    var alphabetType = Math.random() < 0.5 ? 'lower' : 'upper';
    var randomCharCode;

    if (alphabetType === 'lower') {
        randomCharCode = Math.floor(Math.random() * 26) + 97; // lowercase ASCII range
    } else {
        randomCharCode = Math.floor(Math.random() * 26) + 65; // uppercase ASCII range
    }

    return String.fromCharCode(randomCharCode);
}

function updateProgress(elapsedTime) {
    var minutes = Math.floor(elapsedTime / 60);
    var seconds = elapsedTime % 60;

    document.getElementById("time").innerText = pad(minutes) + ":" + pad(seconds);
    document.getElementById("hits").innerText = hits;
    document.getElementById("misses").innerText = misses;
}

function endGame() {
    clearInterval(timer);
    document.getElementById("message").innerText =
        "Game Over! You didn't type the alphabet in time.";
    document.getElementById("restartButton").style.display = "block";
    gameOver = true;
}

function restartGame() {
    currentIndex = 0;
    hits = 0;
    gameOver = false;
    document.getElementById("message").innerText = "Keep typing";
    document.getElementById("restartButton").style.display = "none";
    startTimer(); // Start the game by simulating a timer start
}

function pad(number) {
    return (number < 10 ? "0" : "") + number;
}

// Initial setup
document.getElementById("timer-bar").style.display = "block"; // Display the timer-bar initially
document.getElementById("game-info").style.display = "block";

// Initialize alphabet-line
alphabetArray = Array.from(
    { length: 10 },
    () => getRandomAlphabet()
);
updateGame();

// Listen for keyboard events
document.addEventListener("keydown", checkInput);
