const startStopButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const breakButton = document.querySelector("#break");
const pomodoroButton = document.querySelector("#pomodoro");
const time = document.querySelector("#pomodoro-time");

let timerId;
let isRunning = false;

function stopTimer() {

    isRunning = false;
    startStopButton.textContent = "start";
    clearTimeout(timerId);
};


function startStopTimer() {

    if (isRunning) {
        stopTimer();
        return;
    };

    timerId = setInterval(() => {
        let [minutes, seconds] = time.textContent.split(":").map(Number);

        if (seconds > 0) {
            seconds -= 1;
        } else if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
        }

        if (seconds >= 0 && minutes >= 0) {
            time.textContent = `${format(minutes)}:${format(seconds)}`
        }

        if (minutes === 0 && seconds === 0) {
            clearInterval(timerId);
            startStopButton.textContent = "start";
            time.textContent = `${format(minutes)}:${format(seconds)}`
        }
    }, 10);

    startStopButton.textContent = "stop";
    isRunning = !isRunning;
}

//добавление незначащих нулей
function format(val) {
    if (val < 10) {
        return `0${val}`
    }
    return val;
}

startStopButton.addEventListener("click", startStopTimer);

breakButton.addEventListener("click", function() {
    stopTimer();
    startStopButton.textContent = "start"
    time.textContent = "05:00";
    pomodoroButton.classList.remove("active");
    breakButton.classList.add("active");

});

pomodoroButton.addEventListener("click", function() {
    stopTimer();
    time.textContent = "25:00";
    pomodoroButton.classList.add("active");
    breakButton.classList.remove("active");
});

resetButton.addEventListener("click", function() {
    stopTimer();
    if (pomodoroButton.classList.contains("active")) {
        time.textContent = "25:00";
    } else {
        time.textContent = "05:00";
    }

});