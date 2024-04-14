const startStopButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");

const setTimer = document.querySelector("#pomodoro-time").textContent;

const time = document.querySelector("#pomodoro-time");



let timerId;
let timerStoped = true;

function startStopTimer() {

    if (timerStoped) {
        timerStoped = false;

        startStopButton.textContent == "start"

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
                time.textContent = setTimer;


            }
        }, 10);

        startStopButton.textContent = "stop"

    } else {
        timerStoped = true;
        startStopButton.textContent = "start";
        clearInterval(timerId);

    }

}


//добавление незначащих нулей
function format(val) {
    if (val < 10) {
        return `0${val}`
    }
    return val;
}

startStopButton.addEventListener("click", startStopTimer);