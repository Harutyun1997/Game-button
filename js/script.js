var $body = document.body;
var $clock = document.getElementById('clock');
var $button = document.getElementById('button');
var $startBlock = document.getElementById("start-block");
var $startButton = document.getElementById("start-button");
var $gameTime = document.getElementById("game-times");
var margin = {};
var gameTime;
var positionChangePeriod = 3;
var clockTime;
var clickCount;
var periodicChangeTimer;

(function () {
    var style = window.getComputedStyle($body);
    margin.top = Number((style.getPropertyValue('margin-top')).match(/[0-9]*/)[0]);
    margin.right = Number((style.getPropertyValue('margin-right')).match(/[0-9]*/)[0]);
    margin.bottom = Number((style.getPropertyValue('margin-bottom')).match(/[0-9]*/)[0]);
    margin.left = Number((style.getPropertyValue('margin-left')).match(/[0-9]*/)[0]);
})();

function onClick() {
    if (clickCount === -1) {
        clock();
    }

    soundClick();
    counter();
    $clock.style.display = "inline-block";
    periodicPositionChange();
}

function clock() {
    $clock.innerText = addZero(clockTime);
    $body.style.backgroundColor = "rgba(255, 0, 0, " + Math.round(10 * (1 - clockTime / gameTime)) / 10 + ")";
    clockTime--;
    soundClick();
    if (clockTime >= 0) {
        setTimeout(clock, 1000);
    } else {
        alert("You have clicked " + clickCount + " times");
        reset();
    }
}

function counter() {
    clickCount++;
    $button.innerText = clickCount;
}

function reset() {
    clockTime = gameTime;
    clickCount = -1;
    $button.innerText = "Go!";
    clearTimeout(periodicChangeTimer);
    $startBlock.style.display = "block";
    $button.style.display = "none";
    $clock.style.display = "none";
    $body.style.backgroundColor = "rgba(255,0,0,0)";
}

function randomPosition() {
    var possibleWidth = window.innerWidth - margin.right - margin.left - $button.offsetWidth;
    var possibleHeight = window.innerHeight - margin.top - margin.bottom - $button.offsetHeight;

    $button.style.left = Math.floor(Math.random() * possibleWidth) + "px";
    $button.style.top = Math.floor(Math.random() * possibleHeight) + "px";
}

function periodicPositionChange() {
    randomPosition();
    clearTimeout(periodicChangeTimer);
    periodicChangeTimer = setTimeout(periodicPositionChange, positionChangePeriod * 1000);
}

function addZero(time) {
    if (time < 10) {
        return "0" + time;
    }

    return time.toString();
}

function soundClick() {
    var audio = new Audio();
    audio.preload = 'auto';
    audio.src = 'js/audio.mp3';
    audio.play();

    audio.autoplay = true; // Автоматически запускаем
}

function start() {
    $button.style.display = "block";
    // $clock.style.display = "inline-block";
    $button.style.display = "inline-block";
    $startBlock.style.display = "none";
    gameTime = parseInt($gameTime.value);
    clockTime = gameTime;
}

function validate() {
    $startButton.disabled = ($gameTime.value < 1);
}

reset();