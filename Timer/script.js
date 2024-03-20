let interval, intervalBreak;
let counter = 1;
let counterBreak = 1;
let maxCount = 30;
let maxCountBreak = 10;
const intervalTime = 1000; // 1 second
let repeatCount = 0;
let repeatCountBreak = 0;
let maxRepeats = 3;
let maxRepeatBreak = 2;
let progress = document.getElementById("progress")
let progressBreak = document.getElementById("progressBreak") 
let relax = document.getElementById("relax") 
let start = document.getElementById("start") 
let begin = document.getElementById("begin") 
function getTimer() {
    maxCount = +prompt('Timer in seconds.')
    if (Number.isNaN(maxCount)) {
        alert('Please enter only number value')
        getTimer()
    } else {
        progress.max = maxCount
    }

}
function getTimerBreak() {
    maxCountBreak = +prompt('Break Timer in seconds.')
    if (Number.isNaN(maxCountBreak)) {
        alert('Please enter only number value')
        getTimerBreak()
    } else {
        progressBreak.max = maxCountBreak
    }

}
function getRepeatCount() {
    maxRepeats = +prompt('How many time you want to repeat.')
    if (Number.isNaN(maxRepeats)) {
        alert('Please enter only number value')
        getRepeatCount()
    }
    maxRepeatBreak = maxRepeats - 1
}
getTimer()
getTimerBreak()
getRepeatCount()
// Function to run for the first interval
function intervalFunction1() {
    progress.value = counter
    counter++;
    if (counter > maxCount) {
        clearInterval(interval);
        relax.play()
        counter = 1;
        if (repeatCount < maxRepeatBreak) {
            repeatCount++;
            setTimeout(startSecondInterval);
        }
    }
}

// Function to start the first interval
function startFirstInterval() {
    interval = setInterval(intervalFunction1, intervalTime);
}

// Function to run for the second interval
function intervalFunction2() {
    progressBreak.value = counterBreak
    counterBreak++;
    if (counterBreak > maxCountBreak) {
        clearInterval(intervalBreak);
        start.play()
        counterBreak = 1;
        if (repeatCountBreak < maxRepeats) {
            repeatCountBreak++;
            setTimeout(startFirstInterval);
        }
    }
}

// Function to start the second interval
function startSecondInterval() {
    intervalBreak = setInterval(intervalFunction2, intervalTime);
}

// Start the first interval
begin.addEventListener('click', startFirstInterval)
