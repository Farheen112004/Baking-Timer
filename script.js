let timer;
let totalSeconds = 0;
let isPaused = false;

const timerDisplay = document.getElementById('timer-display');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById('message');

function updateDisplay(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${m}:${s}`;
}

function startTimer() {
    if (timer) return;
    if (isPaused) {
        isPaused = false;
        timer = setInterval(countdown, 1000);
        message.textContent = "Baking in progress...";
        return;
    }
    // Get time from input
    let mins = parseInt(minutesInput.value) || 0;
    let secs = parseInt(secondsInput.value) || 0;
    totalSeconds = mins * 60 + secs;
    if (totalSeconds <= 0) {
        message.textContent = "Set a time first!";
        return;
    }
    minutesInput.disabled = true;
    secondsInput.disabled = true;
    message.textContent = "Baking in progress...";
    updateDisplay(totalSeconds);
    timer = setInterval(countdown, 1000);
}

function countdown() {
    if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay(totalSeconds);
    } else {
        clearInterval(timer);
        timer = null;
        message.textContent = "Ding! Your treat is ready! 🧁";
        minutesInput.disabled = false;
        secondsInput.disabled = false;
        // Optional: Play a cute ding sound
        // new Audio('ding.mp3').play();
    }
}

function pauseTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        isPaused = true;
        message.textContent = "Paused...";
    }
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    isPaused = false;
    totalSeconds = 0;
    updateDisplay(0);
    minutesInput.value = '';
    secondsInput.value = '';
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    message.textContent = "";
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// On page load
updateDisplay(0);